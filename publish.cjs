// Publish the static website. Tokens stay in ignored .publish/, never in Git or logs.
'use strict';
const fs=require('node:fs'),path=require('node:path');
const {spawnSync}=require('node:child_process');
process.chdir(__dirname);
const repository=process.argv.find(arg=>arg.startsWith('--repository='))?.slice(13)||'kuala-lumpur-travel-map';
const clientId='178c6fc778ccc68e1d6a'; // Public GitHub CLI OAuth application ID.
const privateDir=path.join(__dirname,'.publish');
const tokenFile=path.join(privateDir,'github-token'),deviceFile=path.join(privateDir,'github-device.json');
const files=['.gitignore','.gitattributes','.nojekyll','index.html','styles.css','map.js','places.js','basemap-style.js','travel-places.geojson','server.cjs','README.md','publish.ps1','publish.cjs'];
const sleep=ms=>new Promise(resolve=>setTimeout(resolve,ms));
function git(args,env={},allowFailure=false){
  const r=spawnSync('git',args,{encoding:'utf8',env:{...process.env,...env},windowsHide:true});
  if(r.error)throw r.error;
  if(r.status&&!allowFailure)throw Error(`Git failed: ${r.stderr.trim()}`);
  return r;
}
async function oauth(endpoint,params){
  const r=await fetch(`https://github.com/login/${endpoint}`,{method:'POST',headers:{Accept:'application/json','Content-Type':'application/x-www-form-urlencoded'},body:new URLSearchParams(params),signal:AbortSignal.timeout(30000)});
  if(!r.ok)throw Error(`GitHub login HTTP ${r.status}`);
  return r.json();
}
async function authenticate(){
  if(process.env.GH_TOKEN||process.env.GITHUB_TOKEN)return process.env.GH_TOKEN||process.env.GITHUB_TOKEN;
  fs.mkdirSync(privateDir,{recursive:true});
  if(!process.argv.includes('--login')&&fs.existsSync(tokenFile))return fs.readFileSync(tokenFile,'utf8').trim();
  let device;
  if(process.argv.includes('--complete-login')&&fs.existsSync(deviceFile))device=JSON.parse(fs.readFileSync(deviceFile,'utf8'));
  else{
    device=await oauth('device/code',{client_id:clientId,scope:'public_repo'});
    if(device.error)throw Error(device.error_description||device.error);
    device.created_at=Date.now();fs.writeFileSync(deviceFile,JSON.stringify(device));
    console.log(`Open ${device.verification_uri} and enter ${device.user_code} to authorize publishing.`);
  }
  let interval=device.interval*1000;
  while(Date.now()<device.created_at+device.expires_in*1000){
    await sleep(interval);
    const r=await oauth('oauth/access_token',{client_id:clientId,device_code:device.device_code,grant_type:'urn:ietf:params:oauth:grant-type:device_code'});
    if(r.access_token){fs.writeFileSync(tokenFile,r.access_token,{mode:0o600});fs.unlinkSync(deviceFile);console.log('GitHub authentication complete.');return r.access_token;}
    if(r.error==='slow_down')interval+=5000;
    else if(r.error!=='authorization_pending')throw Error(r.error_description||r.error);
  }
  throw Error('Login code expired. Run again with --login.');
}
async function publish(){
  if(!/^[A-Za-z0-9_.-]+$/.test(repository))throw Error('Invalid repository name.');
  for(const file of ['map.js','places.js','basemap-style.js','server.cjs','publish.cjs']){
    const r=spawnSync(process.execPath,['--check',file],{encoding:'utf8',windowsHide:true});if(r.status)throw Error(r.stderr);
  }
  const token=await authenticate();
  async function api(endpoint,method='GET',body,allow404=false){
    const r=await fetch(`https://api.github.com/${endpoint}`,{method,headers:{Authorization:`Bearer ${token}`,Accept:'application/vnd.github+json','X-GitHub-Api-Version':'2022-11-28','Content-Type':'application/json'},body:body?JSON.stringify(body):undefined,signal:AbortSignal.timeout(30000)});
    if(r.status===404&&allow404)return null;
    const data=r.status===204?{}:await r.json();
    if(!r.ok)throw Error(`GitHub API ${r.status}: ${data.message||endpoint}`);return data;
  }
  const user=await api('user'),fullName=`${user.login}/${repository}`,remoteUrl=`https://github.com/${fullName}.git`;
  console.log(`Publishing ${fullName}`);
  if(!fs.existsSync('.git'))git(['init','-b','main']);
  const origin=git(['remote','get-url','origin'],{},true);
  if(!origin.status&&origin.stdout.trim()!==remoteUrl)throw Error('Existing origin differs from the requested repository.');
  let repo=await api(`repos/${fullName}`,'GET',undefined,true);
  if(repo&&origin.status)throw Error(`Repository ${fullName} already exists; choose another name or attach the intended origin explicitly.`);
  if(!repo)repo=await api('user/repos','POST',{name:repository,description:'Kuala Lumpur four-day travel map and itinerary',private:false,auto_init:false});
  if(origin.status)git(['remote','add','origin',remoteUrl]);
  git(['config','user.name',user.login]);git(['config','user.email',`${user.id}+${user.login}@users.noreply.github.com`]);
  if(git(['ls-files']).stdout.trim().split('\n').filter(Boolean).some(file=>!files.includes(file)))throw Error('Repository contains files outside the website publish list.');
  git(['add','--',...files]);
  const changes=git(['diff','--cached','--quiet'],{},true);
  if(changes.status===1)git(['commit','-m','Publish four-day Kuala Lumpur travel map']);
  else if(changes.status)throw Error('Unable to inspect staged files.');
  // Git obtains the token from an environment variable, not a URL or command argument.
  const askpass=path.join(privateDir,'askpass.cjs'),askpassCmd=path.join(privateDir,'askpass.cmd');
  fs.writeFileSync(askpass,"process.stdout.write(/username/i.test(process.argv[2]||'') ? process.env.GH_USER : process.env.GH_TOKEN);\n");
  fs.writeFileSync(askpassCmd,`@echo off\r\n"${process.execPath}" "${askpass}" %*\r\n`);
  const pushed=git(['-c','credential.helper=','push','-u','origin','main'],{GIT_ASKPASS:askpassCmd,GH_USER:user.login,GH_TOKEN:token,GIT_TERMINAL_PROMPT:'0'});
  console.log(pushed.stdout.trim()||'Website source pushed to GitHub.');
  const pages=await api(`repos/${fullName}/pages`,'GET',undefined,true);
  await api(`repos/${fullName}/pages`,pages?'PUT':'POST',{build_type:'legacy',source:{branch:'main',path:'/'}});
  const live=await api(`repos/${fullName}/pages`);
  const deployment={repository:repo.html_url,website:live.html_url,configuredAt:new Date().toISOString()};
  fs.writeFileSync(path.join(privateDir,'deployment.json'),JSON.stringify(deployment,null,2));console.log(JSON.stringify(deployment,null,2));
  console.log('GitHub Pages may need a few minutes to finish deploying.');
}
publish().catch(e=>{console.error(e.message);process.exitCode=1;});
