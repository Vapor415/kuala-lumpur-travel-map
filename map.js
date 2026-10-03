(() => {
'use strict';
const status=document.getElementById('status');
if(!window.L){status.hidden=false;status.textContent='地图库未能加载，请检查网络后刷新。此地图需要联网加载地图库和底图。';return;}
const cats={stay:['住宿','#326453','宿'],sight:['景点','#467896','景'],shop:['购物','#927052','购'],transport:['交通','#687a8b','站'],event:['演唱会','#a85271','演'],area:['区域','#8a8d60','区']};
const regions={kl:'吉隆坡',putrajaya:'布城',airport:'机场'};
const state={category:'all',day:'all',region:'all',search:'',alternatives:true,terminal:'klia1'};
// Detailed route steps and consolidated, food-free daily overview stages.
const plans={
  "1": {
    "title": "抵达 → 入住 → KLCC 夜景",
    "ids": [
      "klia1",
      "royce",
      "petronas",
      "klcc-park",
      "symphony",
      "royce"
    ],
    "times": [
      "抵达后 · 入境与取行李",
      "17:00–18:00 · 入住与休息",
      "夜间 · 双塔外观",
      "夜间 · 公园散步",
      "按开放及天气安排",
      "夜间 · 回公寓休息"
    ],
    "note": "首晚以 KLCC 周边夜景为主；延误时减少户外安排。机场可乘 Grab 直达，高峰时比较机场快线与接驳。"
  },
  "2": {
    "title": "上午老城 → 休息 → 下午布城 → 伴手礼采购",
    "ids": [
      "royce",
      "merdeka",
      "sultan",
      "central-market",
      "petaling",
      "royce",
      "putra",
      "putra-square",
      "putrajaya-lake",
      "perdana",
      "royce",
      "suria",
      "royce"
    ],
    "times": [
      "09:00 左右 · 出发",
      "09:20–10:00 · 拍照",
      "09:20–10:00 · 大厦外观",
      "10:00–10:45 · 工艺品与伴手礼",
      "10:45–11:45 · 街区漫步",
      "11:45–13:00 · 返回与休息；13:00 出发",
      "14:15–15:15 · 登记、换装与参观",
      "15:15–16:15 · 广场漫步",
      "15:15–16:15 · 湖边散步",
      "15:15–16:15 · 首相署外观",
      "16:15–17:45 · 返回；抵达后休息",
      "晚间 · 按需采购伴手礼",
      "夜间 · 回公寓"
    ],
    "note": "老城小景点合并为一条区域步行线，布城清真寺、广场、湖边及首相署合并为一段。起晚可省去独立广场；雷雨时提前返回。跨区优先比较 Grab 与铁路接驳。"
  },
  "3": {
    "title": "KLCC 室内活动 → 休息 → 演唱会 → 返回",
    "ids": [
      "royce",
      "aquaria",
      "suria",
      "royce",
      "klcc-station",
      "jamek",
      "bukit-jalil",
      "stadium",
      "royce"
    ],
    "times": [
      "09:30 · 出发",
      "10:00–12:00 · 按预约时段入场",
      "水族馆后 · 按需补购伴手礼",
      "13:00–15:30 · 休息、准备电子票",
      "15:30 出发 · KLCC 站",
      "去程 · 换乘 Sri Petaling 线",
      "目标 17:00 左右 · 前往入口",
      "晚间 · 演出时间以官方通知为准",
      "散场后 · 回程预留 90–120 分钟"
    ],
    "note": "水族馆与 KLCC 购物合并为区域活动，地铁候车、换乘与步行入场合并为到场通勤。午后回公寓休息，15:30 出发；散场需确认末班及换乘保障。"
  },
  "4": {
    "title": "休息 → 收拾退房 → 机场",
    "ids": [
      "royce",
      "klia1"
    ],
    "times": [
      "上午 · 休息、收拾行李与退房",
      "起飞前 3 小时 · 到达正确航站楼"
    ],
    "note": "11/6 两人分别返程南京与西安，不新增景点。起飞前约 4 小时 45 分从公寓出发，雨天与高峰增加余量；按订单切换 T1/T2，不同航站楼分别安排下车。"
  }
};
const itineraryDetails = {
  "1": {
    "stops": [
      [
        "入境、取行李",
        "预留 60–90 分钟"
      ],
      [
        "领取钥匙、入住与休息",
        "约 30–60 分钟 · 建议"
      ],
      [
        "双塔外观与夜景拍照",
        "约 20–30 分钟 · 建议"
      ],
      [
        "公园散步与拍照",
        "约 20–30 分钟 · 建议"
      ],
      [
        "喷泉夜景",
        "约 15–20 分钟 · 建议"
      ],
      [
        "回公寓休息",
        "当晚住宿"
      ]
    ],
    "legs": [
      [
        "Grab",
        "约 55–75 分钟",
        "高峰或雨天可能超过 90 分钟；机场快线＋接驳约 55–80 分钟。"
      ],
      [
        "步行",
        "约 10–15 分钟",
        "前往 KLCC 周边夜景区域。"
      ],
      [
        "步行",
        "约 5–10 分钟 · 估算",
        "区域内部移动，合并进 KLCC 夜景段。"
      ],
      [
        "步行",
        "约 3–5 分钟 · 估算",
        "按现场开放选择湖区。"
      ],
      [
        "步行",
        "约 10–15 分钟",
        "返回公寓，合并进 KLCC 区域活动。"
      ]
    ]
  },
  "2": {
    "stops": [
      [
        "准备出发",
        "09:00 左右出发"
      ],
      [
        "独立广场拍照",
        "与大厦外观合计 40 分钟"
      ],
      [
        "大厦外观",
        "包含在 09:20–10:00 内"
      ],
      [
        "工艺品与伴手礼",
        "计划停留 45 分钟"
      ],
      [
        "街区漫步",
        "按体力安排"
      ],
      [
        "返回与休息、整理参观衣物",
        "回程与休息窗口 75 分钟"
      ],
      [
        "清真寺登记、换装与参观",
        "计划停留 60 分钟"
      ],
      [
        "太子广场漫步",
        "广场、湖边与首相署共 60 分钟"
      ],
      [
        "湖边散步",
        "包含在 15:15–16:15 内"
      ],
      [
        "首相署外观",
        "包含在 15:15–16:15 内"
      ],
      [
        "返回公寓休息",
        "回程窗口 16:15–17:45；抵达后休息"
      ],
      [
        "伴手礼采购",
        "按需要安排"
      ],
      [
        "回公寓休息",
        "当晚住宿"
      ]
    ],
    "legs": [
      [
        "Grab",
        "约 15–25 分钟",
        "拥堵时比较 LRT 至 Masjid Jamek＋步行，约 30–40 分钟。"
      ],
      [
        "步行",
        "约 2–5 分钟 · 估算",
        "同一老城区域内移动。"
      ],
      [
        "步行",
        "约 10–15 分钟",
        "包含在老城步行线内。"
      ],
      [
        "步行",
        "约 5–10 分钟",
        "包含在老城步行线内。"
      ],
      [
        "Grab",
        "约 20–30 分钟",
        "包含在 11:45–13:00 的返回与休息窗口内。"
      ],
      [
        "Grab",
        "约 45–65 分钟",
        "13:00 出发，参观前留余量；铁路接驳约 60–90 分钟。"
      ],
      [
        "步行",
        "约 3–5 分钟 · 估算",
        "同一布城湖畔区域内移动。"
      ],
      [
        "步行",
        "约 5–10 分钟 · 估算",
        "湖区代表点，按实际路径调整。"
      ],
      [
        "步行 / Grab",
        "约 10–15 分钟 · 估算",
        "区域内小景点合并展示，依天气取舍。"
      ],
      [
        "Grab",
        "约 50–80 分钟",
        "16:15 起返程；雷雨时提前返回。"
      ],
      [
        "步行",
        "约 10–15 分钟",
        "KLCC 周边购物，合并为区域活动。"
      ],
      [
        "步行",
        "约 10–15 分钟",
        "KLCC 区域内返回公寓。"
      ]
    ]
  },
  "3": {
    "stops": [
      [
        "准备出发",
        "09:30 出发"
      ],
      [
        "水族馆海底隧道与室内展区",
        "计划游览 2 小时"
      ],
      [
        "按需补购伴手礼",
        "按需要安排"
      ],
      [
        "休息、准备电子票",
        "计划休息 2.5 小时"
      ],
      [
        "进入 KLCC 站",
        "计入到场总通勤"
      ],
      [
        "地铁换乘",
        "计入到场总通勤"
      ],
      [
        "出站、步行入场",
        "计入到场总通勤"
      ],
      [
        "The Weeknd 演唱会",
        "时长以官方通知为准"
      ],
      [
        "回公寓休息",
        "当晚住宿"
      ]
    ],
    "legs": [
      [
        "Grab / 步行",
        "约 10–20 / 20–25 分钟",
        "09:30 出发，按预约时段入场。"
      ],
      [
        "步行",
        "约 10–15 分钟",
        "KLCC 区域内移动，合并展示。"
      ],
      [
        "步行",
        "约 10–15 分钟",
        "返回公寓休息，合并进 KLCC 区域活动。"
      ],
      [
        "步行＋LRT",
        "到场全程约 60–90 分钟",
        "15:30 出发，步行、候车、换乘与入场合计，不逐段累加。"
      ],
      [
        "LRT",
        "包含在到场 60–90 分钟内",
        "KLCC 至 Masjid Jamek。"
      ],
      [
        "LRT 换乘",
        "包含在到场 60–90 分钟内",
        "换乘 Sri Petaling 线，前往 Bukit Jalil。"
      ],
      [
        "步行入场",
        "包含在到场 60–90 分钟内",
        "目标 17:00 左右到场。"
      ],
      [
        "LRT / 预约接送",
        "预留 90–120 分钟",
        "确认末班与换乘保障；必要时预约合法上车点。"
      ]
    ]
  },
  "4": {
    "stops": [
      [
        "休息、收拾行李与退房",
        "收拾约 60 分钟；按公寓时间退房"
      ],
      [
        "值机、托运与出境",
        "起飞前 3 小时到机场"
      ]
    ],
    "legs": [
      [
        "Grab / 机场快线",
        "约 55–75 分钟",
        "起飞前约 4 小时 45 分出发；雨天、高峰增加余量。机场快线＋接驳约 55–80 分钟。"
      ]
    ]
  }
};
const overviewStages={
  "1": [
    {
      "name": "机场抵达",
      "kind": "stay",
      "steps": [
        1
      ],
      "time": "抵达后",
      "duration": "入境、取行李 60–90 分钟"
    },
    {
      "name": "机场 → KLCC 公寓",
      "kind": "travel",
      "steps": [
        2
      ],
      "time": "抵达后",
      "duration": "Grab 55–75 分钟"
    },
    {
      "name": "入住与休息",
      "kind": "stay",
      "steps": [
        2
      ],
      "time": "17:00–18:00",
      "duration": "建议 30–60 分钟"
    },
    {
      "name": "KLCC 夜景",
      "kind": "stay",
      "steps": [
        3,
        4,
        5,
        6
      ],
      "time": "夜间",
      "duration": "约 1–1.5 小时 · 建议，含区域内步行"
    }
  ],
  "2": [
    {
      "name": "公寓 → 老城",
      "kind": "travel",
      "steps": [
        2
      ],
      "time": "09:00 左右",
      "duration": "Grab 15–25 分钟"
    },
    {
      "name": "老城步行线",
      "kind": "stay",
      "steps": [
        2,
        3,
        4,
        5
      ],
      "time": "09:20–11:45",
      "duration": "独立广场、大厦、艺术坊与茨厂街"
    },
    {
      "name": "老城 → 公寓",
      "kind": "travel",
      "steps": [
        6
      ],
      "time": "11:45 起",
      "duration": "Grab 20–30 分钟"
    },
    {
      "name": "公寓休息",
      "kind": "stay",
      "steps": [
        6
      ],
      "time": "返回后–13:00",
      "duration": "返回与休息共 75 分钟"
    },
    {
      "name": "公寓 → 布城",
      "kind": "travel",
      "steps": [
        7
      ],
      "time": "13:00 出发",
      "duration": "Grab 45–65 分钟"
    },
    {
      "name": "布城湖畔游览",
      "kind": "stay",
      "steps": [
        7,
        8,
        9,
        10
      ],
      "time": "14:15–16:15",
      "duration": "约 2 小时，含区域内移动"
    },
    {
      "name": "布城 → 公寓",
      "kind": "travel",
      "steps": [
        11
      ],
      "time": "16:15 起",
      "duration": "Grab 50–80 分钟"
    },
    {
      "name": "公寓休息",
      "kind": "stay",
      "steps": [
        11
      ],
      "time": "返回后",
      "duration": "按到达时间安排"
    },
    {
      "name": "KLCC 伴手礼采购",
      "kind": "stay",
      "steps": [
        12,
        13
      ],
      "time": "晚间",
      "duration": "按需安排，含往返步行"
    }
  ],
  "3": [
    {
      "name": "公寓 → 水族馆",
      "kind": "travel",
      "steps": [
        2
      ],
      "time": "09:30 出发",
      "duration": "Grab 10–20 / 步行 20–25 分钟"
    },
    {
      "name": "KLCC 室内活动",
      "kind": "stay",
      "steps": [
        2,
        3
      ],
      "time": "10:00 起",
      "duration": "水族馆 2 小时；购物按需，含区域内步行"
    },
    {
      "name": "公寓休息",
      "kind": "stay",
      "steps": [
        4
      ],
      "time": "13:00–15:30",
      "duration": "约 2.5 小时，准备电子票"
    },
    {
      "name": "公寓 → 演唱会场馆",
      "kind": "travel",
      "steps": [
        5,
        6,
        7,
        8
      ],
      "time": "15:30 出发",
      "duration": "步行＋LRT 合计 60–90 分钟"
    },
    {
      "name": "The Weeknd 演唱会",
      "kind": "stay",
      "steps": [
        8
      ],
      "time": "晚间",
      "duration": "入场及演出时长以官方通知为准"
    },
    {
      "name": "场馆 → 公寓",
      "kind": "travel",
      "steps": [
        9
      ],
      "time": "散场后",
      "duration": "LRT / 接送预留 90–120 分钟"
    },
    {
      "name": "公寓休息",
      "kind": "stay",
      "steps": [
        9
      ],
      "time": "返回后",
      "duration": "当晚住宿"
    }
  ],
  "4": [
    {
      "name": "休息、收拾与退房",
      "kind": "stay",
      "steps": [
        1
      ],
      "time": "上午",
      "duration": "按公寓退房时间安排"
    },
    {
      "name": "公寓 → 机场",
      "kind": "travel",
      "steps": [
        2
      ],
      "time": "起飞前约 4 小时 45 分",
      "duration": "Grab / 机场快线 55–75 分钟"
    },
    {
      "name": "机场值机与出境",
      "kind": "stay",
      "steps": [
        2
      ],
      "time": "起飞前 3 小时抵达",
      "duration": "按航班与航站楼安排"
    }
  ]
};

const byId=new Map(TRIP_PLACES.map(p=>[p.id,p]));
const areaDefinitions=[
  ['hotel','酒店区域 · KLCC','kl',['royce','petronas','suria','klcc-park','symphony','klcc-station','aquaria']],
  ['old-town','老城区域','kl',['jamek','petaling','central-market','merdeka','sultan']],
  ['sentral-area','中央车站区域','kl',['sentral']],
  ['concert','演唱会区域','kl',['stadium','bukit-jalil']],
  ['putra-area','布城湖畔区域','putrajaya',['putra','putra-square','perdana','putrajaya-lake']],
  ['putrajaya-transit','布城交通区域','putrajaya',['putrajaya-station']],
  ['airport-area','机场区域','airport',['klia1','klia2']]
];
const placeTree={id:'trip',name:'旅行全域',children:[]},paths=new Map();
Object.entries(regions).forEach(([region,name])=>{
  const regionNode={id:region,name:`${name}区域`,children:[]};placeTree.children.push(regionNode);
  areaDefinitions.filter(a=>a[2]===region).forEach(([id,name,,ids])=>{
    const area={id,name,children:[]};regionNode.children.push(area);
    ids.filter(id=>byId.has(id)).forEach(id=>{const leaf={id,name:byId.get(id).name};area.children.push(leaf);paths.set(id,[placeTree,regionNode,area,leaf]);});
  });
  // Future places without an assigned neighbourhood remain under their known region.
  TRIP_PLACES.filter(p=>p.region===region&&!paths.has(p.id)).forEach(p=>{const leaf={id:p.id,name:p.name};regionNode.children.push(leaf);paths.set(p.id,[placeTree,regionNode,leaf]);});
});
function commonNode(ids){
  const branches=ids.map(id=>paths.get(id)).filter(Boolean);
  if(!branches.length)return placeTree;
  let node=placeTree;
  for(let i=1;i<branches[0].length;i++){if(!branches.every(path=>path[i]?.id===branches[0][i].id))break;node=branches[0][i];}
  return node;
}
function clusterInfo(cluster){
  const ids=[...new Set(cluster.getAllChildMarkers().flatMap(marker=>marker.tripIds||[]))];
  return {ids,node:commonNode(ids)};
}
const getPlan=()=>{
  if(state.day==='all')return null;
  const details=itineraryDetails[state.day],plan={...plans[state.day],stops:details.stops,legs:details.legs,stages:overviewStages[state.day].map(s=>({...s}))};
  if(state.day==='4'){
    plan.ids=['royce',state.terminal];
    if(state.terminal==='klia2'){
      plan.legs=[['Grab / 机场快线','约 60–85 分钟','起飞前约 4 小时 45 分出发；直达 Grab 或机场快线＋接驳约 60–85 分钟，雨天、高峰增加余量。']];
      plan.stages[1].duration='Grab / 机场快线 60–85 分钟';
    }
  }
  return plan;
};
const map=L.map('map',{zoomControl:false,minZoom:2,maxZoom:19,maxBounds:[[-85,-180],[85,180]],maxBoundsViscosity:1}).setView([3.147,101.704],13);
L.control.zoom({position:'topright'}).addTo(map);
L.control.scale({imperial:false,position:'bottomright'}).addTo(map);
let basemap=null;
if(window.maplibregl&&L.maplibreGL&&window.TRIP_BASEMAP_STYLE){
  try{
    // Adapter 0.1.3 uses MapLibre 5's transform setters to keep the camera in sync during panning.
    basemap=L.maplibreGL({style:window.TRIP_BASEMAP_STYLE,updateInterval:16,attributionControl:{customAttribution:'<a href="https://openfreemap.org/">OpenFreeMap</a> · <a href="https://openmaptiles.org/">OpenMapTiles</a> · &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'}}).addTo(map);
    const gl=basemap.getMaplibreMap();
    gl.on('error',()=>{status.hidden=false;status.textContent='简洁底图暂未完整加载，请检查网络或浏览器 WebGL 支持；行程地点与路线仍可查看。';});
    gl.on('idle',()=>{if(gl.isStyleLoaded()&&gl.areTilesLoaded())status.hidden=true;});
  }catch(error){status.hidden=false;status.textContent='简洁底图初始化失败，请检查浏览器 WebGL 支持；行程地点与路线仍可查看。';}
}else{status.hidden=false;status.textContent='简洁底图库未能加载，请检查网络后刷新；行程地点与路线仍可查看。';}
const layer=L.markerClusterGroup?L.markerClusterGroup({maxClusterRadius:64,showCoverageOnHover:false,spiderfyOnMaxZoom:true,iconCreateFunction:cluster=>{
  const {ids,node}=clusterInfo(cluster);
  return L.divIcon({className:'region-cluster',html:`<strong>${escape(node.name)}</strong><span>${ids.length} 个地点</span>`,iconSize:[118,48],iconAnchor:[59,24]});
}}):L.layerGroup();layer.addTo(map);
const routeLayer=L.layerGroup().addTo(map);
const routeFocus=document.createElement('section');routeFocus.className='day-gantt';routeFocus.hidden=true;routeFocus.setAttribute('aria-label','每日行程甘特时间轴');document.body.prepend(routeFocus);
// Keep the legend anchored to the map when the top chart changes the page layout.
document.querySelector('main').append(document.getElementById('map-legend'));
const markers=new Map();let visible=[],displayedMarkers=[];
const escape=s=>String(s).replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
const days=p=>p.days.length?p.days.map(d=>`11/${d+2}`).join(' · '):'补充地点';
const searchLink=p=>'https://www.google.com/maps/search/?api=1&query='+encodeURIComponent(p.english+' '+(p.region==='putrajaya'?'Putrajaya':'Kuala Lumpur'));
TRIP_PLACES.forEach(p=>{const [label,color,symbol]=cats[p.category];const marker=L.marker([p.lat,p.lng],{title:p.name,icon:L.divIcon({className:'pin',html:symbol,iconSize:[29,29],iconAnchor:[14,14],popupAnchor:[0,-15]})});marker.tripIds=[p.id];marker.on('add',()=>marker.getElement()?.style.setProperty('--color',color));marker.bindTooltip(p.name,{direction:'top',offset:[0,-15]});marker.bindPopup(`<div class="popup"><div class="meta">${escape(regions[p.region])} / ${label}${p.alternative?' / 备选':''}</div><h3>${escape(p.name)}</h3><div class="english">${escape(p.english)}</div><p>${escape(p.note)}</p><div class="meta">${days(p)} · ${p.precision}<br>WGS84 ${p.lat.toFixed(5)}, ${p.lng.toFixed(5)}</div><p><a href="${searchLink(p)}" target="_blank" rel="noopener noreferrer">打开地图搜索，确认入口 ↗</a></p></div>`);marker.on('popupopen',()=>{document.querySelectorAll('.place').forEach(el=>el.classList.toggle('selected',el.dataset.id===p.id));});markers.set(p.id,marker);});
const categories=document.getElementById('categories');
[['all',['全部',null]],...Object.entries(cats)].forEach(([id,[label,color]])=>{const b=document.createElement('button');b.type='button';b.className='chip'+(id==='all'?' active':'');b.textContent=label;b.setAttribute('aria-pressed',String(id==='all'));if(color){const dot=document.createElement('span');dot.className='dot';dot.style.setProperty('--color',color);b.prepend(dot);}b.onclick=()=>{state.category=id;categories.querySelectorAll('button').forEach(el=>{el.classList.toggle('active',el===b);el.setAttribute('aria-pressed',String(el===b));});render();};categories.append(b);});
function render(){
  const plan=getPlan();
  document.body.classList.toggle('itinerary-view',Boolean(plan));
  document.getElementById('route-choice').hidden=state.day!=='4';
  visible=TRIP_PLACES.filter(p=>(state.category==='all'||p.category===state.category)&&(state.day==='all'||p.days.includes(Number(state.day)))&&(state.day!=='4'||!['klia1','klia2'].includes(p.id)||p.id===state.terminal)&&(state.region==='all'||p.region===state.region)&&(state.alternatives||!p.alternative)&&(`${p.name} ${p.english} ${regions[p.region]}`.toLowerCase().includes(state.search)));
  const visibleIds=new Set(visible.map(p=>p.id));
  const stops=plan?plan.ids.map((id,i)=>({place:byId.get(id),number:i+1})).filter(s=>visibleIds.has(s.place.id)):[];
  const stages=plan?plan.stages.map((s,index)=>({...s,index,steps:s.steps.filter(n=>stops.some(stop=>stop.number===n))})).filter(s=>s.steps.length&&(s.kind!=='travel'||s.steps.every(n=>n>1&&visibleIds.has(plan.ids[n-2])))):[];
  const numbers=new Map();
  stops.forEach(s=>{if(!numbers.has(s.place.id))numbers.set(s.place.id,[]);numbers.get(s.place.id).push(s.number);});
  layer.clearLayers();routeLayer.clearLayers();
  const extra=visible.filter(p=>!numbers.has(p.id));
  displayedMarkers=extra.map(p=>markers.get(p.id));
  const routeMarkers=new Map();
  const routeLegs=new Map();let activeStep=stops[0]?.number,activeStage=null;
  const legColor=leg=>leg[0].includes('LRT')?'#467896':leg[0].includes('Grab')?'#bf7344':'#326453';
  function selectStep(number,focus=false,travel=false,stageIndex=null){
    activeStep=number;
    const current=stops.find(s=>s.number===number);if(!current)return;
    const stage=stages.find(s=>s.index===stageIndex)||stages.find(s=>s.steps.includes(number)&&s.kind===(travel?'travel':'stay'))||stages.find(s=>s.steps.includes(number))||stages[0];
    if(!stage)return;
    activeStage=stage.index;
    const selectedLegs=new Set(stage.steps.filter(n=>stage.kind==='travel'||stage.steps.includes(n-1)));
    list.querySelectorAll('.place[data-step]').forEach(el=>el.classList.toggle('selected',Number(el.dataset.step)===number));
    list.querySelectorAll('.transit').forEach(el=>{const active=Number(el.dataset.step)===number;el.classList.toggle('selected',active);el.setAttribute('aria-pressed',String(active));});
    routeLegs.forEach((entry,n)=>{
      const active=selectedLegs.has(n);
      entry.line?.setStyle({color:active?entry.color:'#81978d',weight:active?6:3,opacity:active?.95:.45});
      if(active)entry.line?.bringToFront();
      entry.arrow?.setZIndexOffset(active?1000:0);
      entry.arrow?.getElement()?.classList.toggle('active',active);
      if(!active)entry.line?.closeTooltip();
    });
    const index=stages.indexOf(stage);
    routeFocus.hidden=false;
    const currentText=`阶段 ${index+1}/${stages.length} · ${stage.name} ｜ ${stage.time} ｜ ${stage.duration}`;
    routeFocus.querySelector('.gantt-current').textContent=currentText;
    routeFocus.querySelector('.gantt-current').title=currentText;
    routeFocus.querySelector('.step-prev').disabled=index===0;
    routeFocus.querySelector('.step-next').disabled=index===stages.length-1;
    routeFocus.querySelectorAll('.gantt-bar').forEach(el=>{
      const active=Number(el.dataset.stage)===activeStage;
      el.classList.toggle('selected',active);el.setAttribute('aria-pressed',String(active));
    });
    const focusStage=s=>selectStep(s.steps[0],true,s.kind==='travel',s.index);
    routeFocus.querySelector('.step-prev').onclick=()=>focusStage(stages[index-1]);
    routeFocus.querySelector('.step-next').onclick=()=>focusStage(stages[index+1]);
    // Scroll only the horizontal strip, never the page or map, to keep the selected segment visible.
    const selectedBar=routeFocus.querySelector('.gantt-bar.selected'),scroller=routeFocus.querySelector('.gantt-scroll');
    if(selectedBar){const barRect=selectedBar.getBoundingClientRect(),view=scroller.getBoundingClientRect();if(barRect.left<view.left+12||barRect.right>view.right-12)scroller.scrollTo({left:scroller.scrollLeft+barRect.left-view.left-24,behavior:focus?'smooth':'auto'});}
    if(focus){
      map.stop();
      map.closePopup();
      const row=list.querySelector(`.place[data-step="${number}"]`);
      if(row){const rect=row.getBoundingClientRect(),view=list.getBoundingClientRect();if(rect.top<view.top||rect.bottom>view.bottom)list.scrollTo({top:list.scrollTop+rect.top-view.top-12,behavior:'smooth'});}
      const points=stage.steps.map(n=>byId.get(plan.ids[n-1]));
      if(stage.kind==='travel')points.unshift(byId.get(plan.ids[stage.steps[0]-2]));
      if(new Set(points.map(p=>`${p.lat},${p.lng}`)).size>1){map.fitBounds(L.latLngBounds(points.map(p=>[p.lat,p.lng])),{padding:[70,100],maxZoom:16});}
      else focusPoint(routeMarkers.get(current.place.id));
    }
  }
  if(plan){
    // Only connect adjacent original steps: filtering must not invent a direct leg across hidden stops.
    for(let i=1;i<stops.length;i++)if(stops[i].number===stops[i-1].number+1){
      const a=stops[i-1].place,b=stops[i].place;
      const number=stops[i].number,leg=plan.legs[number-2],color=legColor(leg);
      if(a.lat===b.lat&&a.lng===b.lng)continue;
      const line=L.polyline([[a.lat,a.lng],[b.lat,b.lng]],{color:'#81978d',weight:3,opacity:.45}).addTo(routeLayer);
      line.bindTooltip(`<strong>${number-1} → ${number}</strong> · ${escape(leg[0])}<br>${escape(leg[1])}`,{className:'leg-tooltip',sticky:true});
      line.on('click',()=>selectStep(number,true,true));
      const bearing=Math.atan2((b.lng-a.lng)*Math.cos((a.lat+b.lat)*Math.PI/360),b.lat-a.lat)*180/Math.PI;
      const arrow=L.marker([(a.lat+b.lat)/2,(a.lng+b.lng)/2],{keyboard:false,interactive:false,icon:L.divIcon({className:'route-arrow',html:`<span style="transform:rotate(${bearing}deg);--leg-color:${color}">↑</span>`,iconSize:[26,26],iconAnchor:[13,13]})}).addTo(routeLayer);
      routeLegs.set(number,{line,arrow,color});
    }
    // Shops inside a mall can share coordinates; one badge exposes every visit number.
    const groups=new Map();
    numbers.forEach((order,id)=>{const p=byId.get(id),key=`${p.lat},${p.lng}`;if(!groups.has(key))groups.set(key,[]);groups.get(key).push({p,order});});
    groups.forEach(entries=>{
      const p=entries[0].p,order=entries.flatMap(e=>e.order).sort((a,b)=>a-b),names=entries.map(e=>e.p.name).join(' / '),width=Math.max(32,order.join('/').length*8+16);
      const m=L.marker([p.lat,p.lng],{title:`第 ${order.join('、')} 站 · ${names}`,zIndexOffset:1000,icon:L.divIcon({className:'route-pin',html:order.join('/'),iconSize:[width,32],iconAnchor:[width/2,16],popupAnchor:[0,-18]})});
      m.tripIds=entries.map(e=>e.p.id);m.tripOrders=Object.fromEntries(entries.map(e=>[e.p.id,e.order]));
      m.bindTooltip(`第 ${order.join('、')} 站 · ${names}`,{direction:'top',offset:[0,-18]});
      m.bindPopup(`<div class="popup">${entries.map(e=>`<div class="meta">11/${Number(state.day)+2} · 第 ${e.order.join('、')} 站</div><h3>${escape(e.p.name)}</h3><p>${e.order.map(n=>`第 ${n} 站：${escape(plan.times[n-1])}<br>${escape(plan.stops[n-1][0])} · ${escape(plan.stops[n-1][1])}`).join('<br><br>')}</p><p><a href="${searchLink(e.p)}" target="_blank" rel="noopener noreferrer">打开地图搜索，确认入口 ↗</a></p>`).join('')}</div>`);
      m.on('popupopen',()=>selectStep(order.includes(activeStep)?activeStep:order[0]));
      displayedMarkers.push(m);entries.forEach(e=>routeMarkers.set(e.p.id,m));
    });
  }
  layer.addLayers?layer.addLayers(displayedMarkers):displayedMarkers.forEach(m=>layer.addLayer(m));
  document.getElementById('count').textContent=`${visible.length} 个地点 / 共 ${TRIP_PLACES.length} 个`;
  const list=document.getElementById('places');list.replaceChildren();
  routeFocus.replaceChildren();
  if(plan&&stages.length){
    routeFocus.innerHTML=`<div class="gantt-heading"><strong>11/${Number(state.day)+2} · ${escape(plan.title)}</strong><span>区域 / 休息 <i class="gantt-key-stay"></i> 跨区通勤 <i class="gantt-key-travel"></i></span><div><button type="button" class="step-prev" aria-label="上一阶段">←</button><button type="button" class="step-next" aria-label="下一阶段">→</button></div></div><p class="gantt-current" aria-live="polite"></p><div class="gantt-layout"><div class="gantt-lanes"><span>顺序 →</span><span>游览 / 休息</span><span>通勤</span></div><div class="gantt-scroll" tabindex="0" aria-label="横向滚动查看全天主要流程"><div class="gantt-track"></div></div></div><small class="gantt-help">仅展示主要流程，区域内小景点与短途移动已合并 · 分段宽度非严格时间比例${stops.length<plan.ids.length?' · 根据筛选展示阶段，时段为原计划':''}。</small>`;
    const track=routeFocus.querySelector('.gantt-track');
    function segmentWidth(duration){
      if(/包含|共用|合计|当晚|通知|无需/.test(duration))return 170;
      const match=duration.match(/(\d+(?:\.\d+)?)(?:[–—-](\d+(?:\.\d+)?))?\s*(分钟|小时)/);
      if(!match)return 170;
      const minutes=(Number(match[1])+Number(match[2]||match[1]))/2*(match[3]==='小时'?60:1);
      return Math.max(170,Math.min(300,minutes*2));
    }
    function addSegment(s,i){
      const column=document.createElement('div');column.className='gantt-column';column.style.width=`${segmentWidth(s.duration)}px`;
      const label=document.createElement('span');label.className='gantt-tick';label.textContent=`${i+1} · ${s.time}`;label.title=s.time;column.append(label);
      const button=document.createElement('button');button.type='button';button.className=`gantt-bar gantt-${s.kind}`;button.dataset.stage=s.index;button.dataset.kind=s.kind;button.setAttribute('aria-pressed','false');
      const places=[...new Set(s.steps.map(n=>byId.get(plan.ids[n-1]).name))].join(' → ');
      button.title=`${s.name}\n${s.time} · ${s.duration}\n${places}`;
      button.innerHTML=`<strong>${escape(s.name)}</strong><small>${escape(s.duration)}</small>`;
      if(s.kind==='travel')button.style.setProperty('--leg-color',legColor([s.duration]));
      button.onclick=()=>selectStep(s.steps[0],true,s.kind==='travel',s.index);column.append(button);track.append(column);
    }
    stages.forEach(addSegment);
  }
  if(plan){
    const summary=document.createElement('section');summary.className='route-summary';
    summary.innerHTML=`<strong>11/${Number(state.day)+2} · ${escape(plan.title)}</strong><small>顶部查看全天主要流程，左侧查看具体景点与通勤。点击区域或详细站点可定位地图；箭头表示前进方向。</small><details><summary>当天安排与时间说明</summary><p>${escape(plan.note)}</p><small>时间来自行程计划；标为“建议 / 估算”的内容为展示补充，共享时段不重复累加。地图连线为顺序示意。${stops.length<plan.ids.length?' 当前筛选隐藏了部分站点，保留原编号，不跨隐藏站点连接。':''}</small></details>`;
    list.append(summary);
  }
  function addPlace(p,number){
    const [label,color,symbol]=cats[p.category],b=document.createElement('button');b.type='button';b.className='place';b.dataset.id=p.id;
    if(number){b.classList.add('timeline-stop');b.dataset.step=number;}
    b.innerHTML=`<span class="place-icon" style="--color:${number?'#326453':color}">${number||symbol}</span><span class="stop-content">${number?`<span class="stop-time">${escape(plan.times[number-1])}</span>`:''}<strong>${escape(p.name)}</strong>${number?`<span class="stop-activity">${escape(plan.stops[number-1][0])}</span><span class="stay-time">停留 · ${escape(plan.stops[number-1][1])}</span>`:`<small>${regions[p.region]} · ${label} · ${days(p)}${p.alternative?' · 备选':''}</small>`}</span>`;
    b.onclick=()=>number?selectStep(number,true):focusPoint(routeMarkers.get(p.id)||markers.get(p.id));list.append(b);
  }
  stops.forEach((s,i)=>{
    if(i&&s.number===stops[i-1].number+1){
      const leg=plan.legs[s.number-2],b=document.createElement('button');b.type='button';b.className='transit';b.dataset.step=s.number;b.setAttribute('aria-pressed','false');b.style.setProperty('--leg-color',legColor(leg));
      b.innerHTML=`<span class="transit-arrow">↓</span><span><strong>${escape(leg[0])} <span>${escape(leg[1])}</span></strong><small>${escape(leg[2])}</small></span>`;
      b.setAttribute('aria-label',`查看第 ${s.number-1} 到 ${s.number} 站通勤：${leg[0]}，${leg[1]}`);b.onclick=()=>selectStep(s.number,true,true);list.append(b);
    }else if(i){const gap=document.createElement('p');gap.className='timeline-gap';gap.textContent='部分中间站点已被筛选隐藏';list.append(gap);}
    addPlace(s.place,s.number);
  });
  if(plan&&extra.length){const title=document.createElement('div');title.className='extra-heading';title.textContent='当日其他地点 · 可替换或补充';list.append(title);}
  extra.forEach(p=>addPlace(p));
  if(!visible.length){const p=document.createElement('p');p.className='empty';p.textContent='没有匹配地点，试试调整日期、类型或搜索词。';list.append(p);}
  routeFocus.hidden=true;
  if(plan&&stages.length)selectStep(stages[0].steps[0],false,stages[0].kind==='travel',stages[0].index);
  requestAnimationFrame(()=>map.invalidateSize({pan:false}));
  updateLegend();
}
function focusPoint(marker){
  if(layer.zoomToShowLayer)layer.zoomToShowLayer(marker,()=>marker.openPopup());
  else{map.setView(marker.getLatLng(),16);marker.openPopup();}
}
function treeBranch(node,ids){
  if(!node.children){
    if(!ids.has(node.id))return null;
    const p=byId.get(node.id),marker=displayedMarkers.find(m=>m.tripIds.includes(node.id)),order=marker?.tripOrders?.[node.id];
    const button=document.createElement('button');button.type='button';button.className='legend-place';button.dataset.treeId=node.id;
    button.innerHTML=`<span class="legend-badge" style="--color:${order?'#326453':cats[p.category][1]}">${order?order.join('/'):cats[p.category][2]}</span><span>${escape(p.name)}</span>`;
    button.onclick=()=>focusPoint(marker);return button;
  }
  const children=node.children.map(child=>treeBranch(child,ids)).filter(Boolean);
  if(!children.length)return null;
  const details=document.createElement('details');details.className='legend-branch';details.dataset.treeId=node.id;details.open=true;
  const summary=document.createElement('summary');summary.textContent=node.name;details.append(summary);
  const body=document.createElement('div');body.className='legend-children';children.forEach(child=>body.append(child));details.append(body);return details;
}
function updateLegend(){
  const body=document.getElementById('legend-items');if(!body)return;
  const expanded=new Set([...body.querySelectorAll('details[open][data-entry]')].map(el=>el.dataset.entry));
  body.replaceChildren();
  const parents=new Set();displayedMarkers.forEach(marker=>{
    const parent=layer.getVisibleParent?layer.getVisibleParent(marker):marker;
    if(parent&&parent.getElement()&&map.getBounds().contains(parent.getLatLng()))parents.add(parent);
  });
  let total=0;
  [...parents].sort((a,b)=>a.getLatLng().lat===b.getLatLng().lat?a.getLatLng().lng-b.getLatLng().lng:b.getLatLng().lat-a.getLatLng().lat).forEach(parent=>{
    const isCluster=typeof parent.getAllChildMarkers==='function';
    const ids=isCluster?clusterInfo(parent).ids:parent.tripIds,node=commonNode(ids);total+=ids.length;
    const key=[...ids].sort().join('|'),path=paths.get(ids[0])||[placeTree],label=isCluster?node.name:ids.map(id=>byId.get(id).name).join(' / ');
    const wrapper=document.createElement('details');wrapper.className='legend-entry';wrapper.dataset.entry=key;wrapper.dataset.treeId=node.id;wrapper.open=expanded.has(key);
    const summary=document.createElement('summary'),p=byId.get(ids[0]),orders=parent.tripOrders?Object.values(parent.tripOrders).flat().sort((a,b)=>a-b):null;
    summary.innerHTML=`<span class="legend-badge${isCluster?' legend-group':''}" style="--color:${isCluster||orders?'#326453':cats[p.category][1]}">${isCluster?ids.length:orders?orders.join('/'):cats[p.category][2]}</span><span><strong>${escape(label)}</strong><small>${escape(isCluster?`${ids.length} 个地点 · 点击展开树结构`:path.slice(1,-1).map(n=>n.name).join(' / '))}</small></span>`;
    wrapper.append(summary);
    const branch=treeBranch(placeTree,new Set(ids));if(branch)wrapper.append(branch);
    body.append(wrapper);
  });
  if(!parents.size){const empty=document.createElement('p');empty.className='legend-empty';empty.textContent='当前视野没有行程标注，移动地图或调整筛选。';body.append(empty);}
  const scale=document.querySelector('.leaflet-control-scale-line')?.textContent||'';
  document.getElementById('legend-scale').textContent=`${scale?`比例尺 ${scale} · `:''}${parents.size} 个标注 / ${total} 个地点`;
}
let legendFrame;
function scheduleLegend(){cancelAnimationFrame(legendFrame);legendFrame=requestAnimationFrame(updateLegend);}
map.on('zoomend moveend resize',scheduleLegend);
layer.on('animationend spiderfied unspiderfied',scheduleLegend);
document.getElementById('legend-toggle').onclick=()=>{
  const body=document.getElementById('legend-items'),button=document.getElementById('legend-toggle');body.hidden=!body.hidden;button.setAttribute('aria-expanded',String(!body.hidden));button.textContent=body.hidden?'展开':'收起';
};
const fit=()=>{if(visible.length)map.fitBounds(L.latLngBounds(visible.map(p=>[p.lat,p.lng])),{padding:[45,85],maxZoom:16});};
['day','region'].forEach(id=>document.getElementById(id).addEventListener('change',e=>{state[id]=e.target.value;render();fit();}));
document.getElementById('search').addEventListener('input',e=>{state.search=e.target.value.trim().toLowerCase();render();});
document.getElementById('alternatives').addEventListener('change',e=>{state.alternatives=e.target.checked;render();});
document.getElementById('terminal').addEventListener('change',e=>{state.terminal=e.target.value;render();fit();});
document.getElementById('fit').onclick=fit;
document.getElementById('city').onclick=()=>map.setView([3.147,101.704],13);
document.getElementById('overview').onclick=()=>map.fitBounds(L.latLngBounds(TRIP_PLACES.map(p=>[p.lat,p.lng])),{padding:[45,85]});
document.getElementById('export').onclick=()=>{const data={type:'FeatureCollection',features:visible.map(({lat,lng,...properties})=>({type:'Feature',geometry:{type:'Point',coordinates:[lng,lat]},properties}))};const url=URL.createObjectURL(new Blob([JSON.stringify(data,null,2)],{type:'application/geo+json'}));const a=document.createElement('a');a.href=url;a.download='travel-places.geojson';a.click();setTimeout(()=>URL.revokeObjectURL(url),1000);};
render();window.TRIP_MAP={map,places:TRIP_PLACES,markers,plans,routeLayer,basemap,tree:placeTree,clusterLayer:layer};
})();
