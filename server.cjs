// Optional local preview server, no dependencies. Binds only to this computer.
const http = require('node:http');
const fs = require('node:fs');
const path = require('node:path');
const allowed = new Set(['index.html','styles.css','map.js','places.js','basemap-style.js','travel-places.geojson']);
const mime = {'.html':'text/html; charset=utf-8','.css':'text/css; charset=utf-8','.js':'text/javascript; charset=utf-8','.geojson':'application/geo+json'};
http.createServer((req,res)=>{const name=(req.url||'/').split('?')[0].slice(1)||'index.html';if(!allowed.has(name)){res.writeHead(404);res.end('Not found');return;}fs.readFile(path.join(__dirname,name),(err,data)=>{if(err){res.writeHead(404);res.end('Not found');return;}res.writeHead(200,{'Content-Type':mime[path.extname(name)]});res.end(data);});}).listen(8080,'127.0.0.1',()=>console.log('Travel map: http://localhost:8080'));
