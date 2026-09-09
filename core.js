const $=(s,r=document)=>r.querySelector(s), $$=(s,r=document)=>[...r.querySelectorAll(s)];
let savedTheme='light'; try{savedTheme=localStorage.getItem('bigcity-theme')||'light'}catch(e){}
const state={
  page:'home', theme:savedTheme,
  site:'all', period:'year', compare:'yoy', chart:'line', insight:0,
  feedback:{}, plantSelected:'CH-02'
};

const siteData={
  all:{name:'全部場域',rth:1285320,kwh:4320550,plant:.86,saving:288430,cost:1009505,co2:142375},
  main:{name:'巨城本館',rth:642380,kwh:2248550,plant:.82,saving:166420,cost:582470,co2:82150},
  creative:{name:'創藝大樓',rth:321420,kwh:1120480,plant:.85,saving:71420,cost:249970,co2:35190},
  cinema:{name:'威秀影城',rth:321520,kwh:951520,plant:.96,saving:50590,cost:177065,co2:25035}
};

const periodFactor={year:1,quarter:.26,month:.086};
const siteImages={main:'site-main',creative:'site-creative',cinema:'site-cinema'};
const fmt=n=>Number(n).toLocaleString('en-US');
const pct=(v,d=0)=>`${v>0?'▲':'▼'} ${Math.abs(v).toFixed(d)}%`;
const pill=(txt,cls='blue')=>`<span class="pill-chip ${cls}">${txt}</span>`;
const hero=(title,sub)=>`<section class="page-hero"><h1>${title}</h1><p>${sub}</p><div class="hero-tagline">PEOPLE<br>SHOPPING<br>A BRIGHTER<br>TOMORROW</div></section>`;

function kpi(icon,label,value,unit='',change='',cls='good',iconCls=''){
  return `<div class="kpi-card"><div class="kpi-icon ${iconCls}">${icon}</div><div><div class="label">${label}</div><div class="kpi-value">${value}${unit?` <small>${unit}</small>`:''}</div>${change?`<div class="change ${cls}">${change}</div>`:''}</div></div>`;
}
function card(title,body,extra=''){
  return `<section class="card ${extra}"><div class="card-head"><div class="card-title">${title}</div></div>${body}</section>`;
}
function svgLine(series,labels,opt={}){
  const W=620,H=190,pL=38,pR=16,pT=12,pB=28;
  const vals=series.flatMap(s=>s.data);
  let min=opt.min??Math.min(...vals), max=opt.max??Math.max(...vals);
  if(max===min){max+=1;min-=1}
  const y=v=>pT+(H-pT-pB)*(1-(v-min)/(max-min));
  const x=i=>pL+(W-pL-pR)*(i/(labels.length-1||1));
  const colors=['#1597f5','#8ea9c0','#18b987','#ef5466','#f5aa1e','#735ce8'];
  let out=`<svg viewBox="0 0 ${W} ${H}" preserveAspectRatio="none" role="img">`;
  for(let i=0;i<5;i++){const yy=pT+(H-pT-pB)*i/4;out+=`<line class="grid-line" x1="${pL}" y1="${yy}" x2="${W-pR}" y2="${yy}"/><text class="axis-label" x="2" y="${yy+3}">${(max-(max-min)*i/4).toFixed(opt.decimals??2)}</text>`}
  labels.forEach((l,i)=>{if(i%(opt.labelEvery||1)===0)out+=`<text class="axis-label" text-anchor="middle" x="${x(i)}" y="${H-7}">${l}</text>`});
  series.forEach((s,si)=>{
    const pts=s.data.map((v,i)=>`${x(i)},${y(v)}`).join(' ');
    out+=`<polyline class="chart-line" stroke="${s.color||colors[si]}" points="${pts}" ${s.dash?'stroke-dasharray="7 5"':''}/>`;
    s.data.forEach((v,i)=>out+=`<circle class="chart-dot" fill="${s.color||colors[si]}" cx="${x(i)}" cy="${y(v)}" r="3"><title>${s.name||''} ${labels[i]}: ${v}</title></circle>`);
  });
  return out+'</svg>';
}
function svgBars(groups,labels,opt={}){
  const W=620,H=190,pL=36,pR=12,pT=12,pB=28;
  const max=opt.max??Math.max(...groups.flatMap(s=>s.data))*1.18;
  const y=v=>pT+(H-pT-pB)*(1-v/max);
  const xGroup=i=>pL+(W-pL-pR)*(i/labels.length);
  const groupW=(W-pL-pR)/labels.length, colors=['#1597f5','#9bb4c8','#18b987','#f5aa1e','#735ce8'];
  let out=`<svg viewBox="0 0 ${W} ${H}" preserveAspectRatio="none">`;
  for(let i=0;i<5;i++){const yy=pT+(H-pT-pB)*i/4;out+=`<line class="grid-line" x1="${pL}" y1="${yy}" x2="${W-pR}" y2="${yy}"/>`}
  labels.forEach((l,i)=>out+=`<text class="axis-label" text-anchor="middle" x="${xGroup(i)+groupW/2}" y="${H-7}">${l}</text>`);
  groups.forEach((s,si)=>{
    const bw=Math.min(28,groupW/(groups.length+1));
    s.data.forEach((v,i)=>{
      const xx=xGroup(i)+groupW/2+(si-(groups.length-1)/2)*bw-bw*.36, yy=y(v), hh=H-pB-yy;
      out+=`<rect x="${xx}" y="${yy}" width="${bw*.72}" height="${hh}" rx="2" fill="${s.color||colors[si]}"><title>${s.name||''} ${labels[i]}: ${v}</title></rect>`;
    });
  });
  return out+'</svg>';
}
function svgStacked(rows,labels){
  const W=620,H=190,pL=35,pR=12,pT=12,pB=28,max=1.12;
  const colors=['#1597f5','#36bfe0','#18b987','#f5aa1e','#735ce8'];
  const groupW=(W-pL-pR)/labels.length,bw=Math.min(72,groupW*.48);
  let out=`<svg viewBox="0 0 ${W} ${H}" preserveAspectRatio="none">`;
  for(let i=0;i<5;i++){let yy=pT+(H-pT-pB)*i/4;out+=`<line class="grid-line" x1="${pL}" y1="${yy}" x2="${W-pR}" y2="${yy}"/>`}
  rows.forEach((r,ri)=>{
    let accum=0,x=pL+ri*groupW+(groupW-bw)/2;
    r.forEach((v,si)=>{let h=(H-pT-pB)*v/max,y=H-pB-(accum*(H-pT-pB)/max)-h;out+=`<rect x="${x}" y="${y}" width="${bw}" height="${h}" fill="${colors[si]}"><title>${labels[ri]} ${(v).toFixed(3)} kW/RT</title></rect>`;accum+=v});
    out+=`<text class="axis-label" text-anchor="middle" x="${x+bw/2}" y="${H-7}">${labels[ri]}</text><text class="axis-label" text-anchor="middle" x="${x+bw/2}" y="${H-pB-(accum*(H-pT-pB)/max)-5}">${accum.toFixed(2)}</text>`;
  });
  return out+'</svg>';
}
function siteCard(id,title,bms,load,kw,eff,status,statusCls){
  return `<section class="card site-card" data-site="${id}"><div class="site-photo ${siteImages[id]}"></div><div><div class="site-head"><h3>${title} <small>(${bms})</small></h3><span class="status-chip ${statusCls}">${status}</span></div><div class="site-metrics"><div><span>冷房負載</span><b>${fmt(load)} <small>RT</small></b></div><div><span>即時用電</span><b>${fmt(kw)} <small>kW</small></b></div><div><span>效率</span><b>${eff.toFixed(2)} <small>kW/RT</small></b></div><div><span>健康狀態</span><b class="${statusCls}">${statusCls==='good'?'● 良好':'● 需關注'}</b></div></div></div></section>`;
}

function renderHome(){
  return hero('AI 智慧能源營運總管','整合既有 BMS / EMS 數據，透過 AI 轉化為可行的洞察、可能原因、風險與下一步建議。')+
  `<div class="kpi-grid">
    ${kpi('❄','整體冷源效率<br>kW/RT','0.82','', '▼ 12%　(較昨日)','good')}
    ${kpi('▰','即時冷房負載<br>RT','4,320','', '▲ 3%　(較昨日)','bad')}
    ${kpi('ϟ','空調即時用電<br>kW','3,542','', '▼ 8%　(較昨日)','good')}
    ${kpi('♨','系統 ΔT<br>°C','4.8','', '▼ 1.7°C　(較昨日)','bad')}
    ${kpi('◉','AI 今日洞察<br>項','5','', '▲ 2　(較昨日)','bad')}
    ${kpi('◒','今日預估節能機會<br>kWh','8,600','', '≈ 12%　約 NT$34,400','good','green')}
  </div>
  <div class="grid-3">
    ${siteCard('main','巨城本館','iFIX',2480,1980,.80,'運轉正常','good')}
    ${siteCard('creative','創藝大樓','WebCTRL',1120,940,.84,'注意觀察','warn')}
    ${siteCard('cinema','威秀影城','WebCTRL',720,622,.86,'運轉正常','good')}
  </div>
  <div class="grid-2">
    <section class="card">
      <div class="card-head"><div class="card-title"><span class="spark">✦</span>AI 首要建議</div><span class="pill-chip blue">Recommendation 87%</span></div>
      <div class="ai-chain">
        <div class="ai-step find"><div class="step-head"><span class="step-num">1</span>AI 發現</div><p>目前系統同時存在「ΔT 偏低、二次泵高頻運轉、末端閥位偏低」現象。</p><div>${pill('ΔT 偏低','bad')} ${pill('泵浦高頻','bad')} ${pill('閥位偏低','bad')}</div></div>
        <div class="ai-step"><div class="step-head"><span class="step-num">2</span>判斷證據</div><ul><li>近 24 小時 ΔT 多數落在 4–5°C</li><li>二次泵 VFD 長時間 &gt; 50 Hz</li><li>AHU 冰水閥中位數 10–25%</li><li>回水溫度偏低，疑似過度送水</li></ul></div>
        <div class="ai-step"><div class="step-head"><span class="step-num">3</span>可能原因</div><ul><li>二次側過度送水 Over-pumping</li><li>系統 ΔP 設定偏高</li><li>部分區域低負載仍維持高水量</li><li>可能存在不必要旁通耗能</li></ul></div>
        <div class="ai-step rec"><div class="step-head"><span class="step-num">4</span>AI 建議</div><p><b>先確認最不利端供冷是否足夠。</b></p><p>若舒適度與末端閥位仍有裕度，人工試降二次側 DP <b>5 kPa</b>，觀察 15 分鐘的 ΔT、泵浦頻率與最不利端閥位。</p></div>
      </div>
    </section>
    <section class="card">
      <div class="card-head"><div class="card-title"><span class="spark">⌕</span>AI 正在幫你關注</div><span class="more">更多 ›</span></div>
      <div class="watch-list">
        <div class="watch-item"><div class="watch-ico bad">△</div><div><b>低 ΔT 是否集中在特定分區</b><p>近 1 小時，B2 與 3F 區域 ΔT 持續偏低。</p></div></div>
        <div class="watch-item"><div class="watch-ico warn">!</div><div><b>AHU 高頻但閥位偏低</b><p>共 6 台 AHU &gt;50 Hz，但閥位 &lt;20%。</p></div></div>
        <div class="watch-item"><div class="watch-ico">❄</div><div><b>威秀晚場前負載上升</b><p>預估 18:00 後冷房負載上升 15–20%。</p></div></div>
        <div class="watch-item"><div class="watch-ico">▥</div><div><b>供回水感測器一致性</b><p>1 組回水溫度感測器與鄰近測點偏差擴大。</p></div></div>
      </div>
    </section>
  </div>
  <div class="grid-2">
    ${card('<span class="spark">▥</span>過去 24 小時　整體冷源效率趨勢',`<div class="chart-box small">${svgLine([{name:'即時效率',data:[.76,.75,.78,.81,.84,.87,.89,.88,.83,.81,.80,.82]},{name:'昨日效率',data:[.83,.82,.84,.86,.89,.91,.92,.90,.88,.86,.85,.84],dash:true}],['00','02','04','06','08','10','12','14','16','18','20','22'],{min:.65,max:1,decimals:2,labelEvery:2})}</div>`)}
    ${card('<span class="spark">▰</span>最近 AI 分析紀錄',`<div class="table-wrap"><table><thead><tr><th>時間</th><th>主題</th><th>重點摘要</th><th>狀態</th></tr></thead><tbody>
      <tr><td>2026-09-09 21:32</td><td>二次泵運轉效率</td><td>偵測低 ΔT 與高頻，建議試降 DP 5 kPa</td><td>${pill('待確認','warn')}</td></tr>
      <tr><td>2026-09-09 19:20</td><td>威秀負載預測</td><td>晚場前負載上升，預估增加 15–20%</td><td>${pill('觀察中','blue')}</td></tr>
      <tr><td>2026-09-09 16:15</td><td>冰機效率分析</td><td>CH-02 部分負載表現穩定</td><td>${pill('已驗證','good')}</td></tr>
      <tr><td>2026-09-08 16:40</td><td>末端閥位異常</td><td>3F 多台 AHU 閥位偏低，建議檢查平衡</td><td>${pill('已處理','good')}</td></tr>
    </tbody></table></div>`)}
  </div>
  <div class="demo-note">DEMO 模擬數據｜正式系統將由 iFIX / WebCTRL / 電錶與現場感測資料驅動；AI 為建議模式，不直接下控設備。</div>`;
}

const insightEvents=[
  {time:'2026-09-09 21:32',site:'巨城本館',title:'B1F AHU-3 供回水 ΔT 偏低',summary:'ΔT 2.1°C、泵浦 52 Hz、末端閥位中位數 18%。',status:'待確認',sc:'warn',system:'空調系統',evidence:['供水 6.2°C / 回水 8.3°C','ΔT 2.1°C（建議 4–7°C）','泵浦頻率 52 Hz','冰水閥中位數 18%'],cause:['二次側流量過大','DP 設定偏高','旁通或控制閥異常'],rec:['檢查 AHU-3 閥位回授','確認最不利端後，人工試降 DP 5 kPa','持續追蹤 15 分鐘 ΔT 與閥位']},
  {time:'2026-09-09 19:20',site:'威秀影城',title:'晚場前冷房負載快速上升',summary:'開演前 35 分鐘 RT 上升 18%，符合歷史模式。',status:'已驗證',sc:'good',system:'營運模式',evidence:['18:00 前負載 +18%','場次密度高於平日','室溫仍維持 24.2°C'],cause:['觀眾進場集中','照明與影廳設備同步啟動','屬可預測營運負載'],rec:['持續累積場次資料','未來可用票務/場次做前饋預測','目前僅提供建議，不自動下控']},
  {time:'2026-09-09 16:15',site:'創藝大樓',title:'ZP-3 / ZP-4 低 ΔT 聚集',summary:'連續 2 小時 ΔT < 3°C，且二次泵頻率偏高。',status:'觀察中',sc:'blue',system:'水側',evidence:['ZP-3 ΔT 2.6°C','ZP-4 ΔT 2.8°C','DP 128 kPa','多數閥位 < 30%'],cause:['局部過流','水力失衡','DP Reset 尚未最佳化'],rec:['先查最不利端','分區盤點閥位與流量','低負載時試降 DP']},
  {time:'2026-09-08 14:05',site:'巨城本館',title:'CH-01 部分負載效率偏高',summary:'同負載 kW/RT 比 30 日基準高 6%。',status:'已改善',sc:'good',system:'冷源',evidence:['負載 31%','kW/RT 0.82','CWS 31.1°C','其他主機同負載約 0.72'],cause:['部分負載效率較差','冷凝器進水條件較差','運轉組合可調整'],rec:['負載低時避免優先投入 CH-01','安排冷凝器水側檢查','持續比較同負載曲線']}
];

function renderInsights(){
  const e=insightEvents[state.insight];
  return hero('AI 洞察中心','AI 持續分析商場各系統運行數據，累積事件證據、根因分析、建議方案、操作員回饋與驗證結果。')+
  `<div class="kpi-grid">
    ${kpi('▤','本日 AI 事件','12','', '▲ 33%　較昨日','bad')}
    ${kpi('✓','已驗證事件','8','', '▲ 60%　較昨日','good','green')}
    ${kpi('◷','平均定位時間','18','分鐘','▼ 42%　較上週','good')}
    ${kpi('☷','待追蹤項目','6','', '▲ 20%　較昨日','bad')}
    ${kpi('◒','已採納建議','15','', '▲ 36%　本月累計','good','green')}
    ${kpi('✦','AI 持續學習中','24/7','', '事件 → 驗證 → 知識','good','green')}
  </div>
  <div class="event-layout">
    <section class="card">
      <div class="card-head"><div class="card-title"><span class="spark">◷</span>AI 歷史分析事件</div><span class="more">共 42 筆</span></div>
      <div class="page-controls" style="box-shadow:none;margin:0 0 8px;padding:6px"><div class="control-group"><select id="eventSite"><option>全部場域</option><option>巨城本館</option><option>創藝大樓</option><option>威秀影城</option></select><select><option>全部系統</option><option>冷源</option><option>水側</option><option>AHU</option></select><input id="eventSearch" placeholder="搜尋 AHU、ΔT、主機…" style="border:1px solid var(--line);background:var(--surface);color:var(--text);border-radius:6px;padding:7px 9px;min-width:160px"></div></div>
      <div class="event-list" id="eventList">${insightEvents.map((x,i)=>`<button class="event-row ${i===state.insight?'active':''}" data-insight="${i}"><time>${x.time.replace(' ','<br>')}</time><div><b>${x.title}</b><p>${x.site} · ${x.system}<br>${x.summary}</p></div>${pill(x.status,x.sc)}</button>`).join('')}</div>
    </section>
    <section class="card" id="insightDetail">
      ${renderInsightDetail(e)}
    </section>
  </div>
  <section class="card" style="margin-top:9px">
    <div class="card-head"><div class="card-title"><span class="spark">♧</span>AI 最近學到的營運模式</div><span class="more">查看更多 ›</span></div>
    <div class="learn-grid">
      <div class="learn-card"><b>威秀晚場負載模式　${pill('已學習','good')}</b><p>晚場開演前 30–45 分鐘，空調與照明負載平均上升 15–25%。</p></div>
      <div class="learn-card"><b>ZP-3 / ZP-4 低 ΔT 聚集　${pill('已學習','good')}</b><p>部分負載時容易出現 ΔT < 3°C，AI 已建立異常偵測規則。</p></div>
      <div class="learn-card"><b>感測器一致性特徵　${pill('已學習','good')}</b><p>溫度、流量與閥位在穩定運行時具有可辨識的關聯模式。</p></div>
      <div class="learn-card"><b>假日與活動日特徵　${pill('已學習','good')}</b><p>大型活動日可提前 1–2 小時建立負載預測與營運提醒。</p></div>
    </div>
  </section>`;
}
function renderInsightDetail(e){
  const fb=state.feedback[state.insight]||'尚未回覆';
  return `<div class="card-head"><div><div class="card-title"><span class="spark">▤</span>AI 判讀詳情</div><div class="card-sub">${e.time} · ${e.site} · ${e.system}</div></div>${pill(e.status,e.sc)}</div>
  <h2 style="font-size:18px;margin:5px 0 10px;color:var(--ink)">${e.title}</h2>
  <div class="detail-grid">
    <div class="detail-block"><h4 class="bad">① AI 發現</h4><p>${e.summary}</p></div>
    <div class="detail-block"><h4 class="blue">② 判斷證據</h4><ul>${e.evidence.map(x=>`<li>${x}</li>`).join('')}</ul></div>
    <div class="detail-block"><h4 class="warn">③ 可能原因</h4><ul>${e.cause.map(x=>`<li>${x}</li>`).join('')}</ul></div>
    <div class="detail-block"><h4 class="good">④ AI 建議</h4><ul>${e.rec.map(x=>`<li>${x}</li>`).join('')}</ul></div>
    <div class="detail-block"><h4>⑤ 操作員回饋</h4><p id="fbText">${fb}</p></div>
    <div class="detail-block"><h4 class="good">⑥ 後續驗證結果</h4><p>${e.status==='已改善'?'調整後 kW/RT 已回到歷史正常帶，改善約 6%。':'持續追蹤 24 小時，確認調整後 ΔT、閥位與能效是否同步改善。'}</p></div>
  </div>
  <div class="feedback-actions"><button class="soft-btn" data-feedback="加入巡檢">加入巡檢</button><button class="soft-btn" data-feedback="先觀察，不調整">先觀察</button><button class="soft-btn green" data-feedback="已確認，進入後續驗證">✓ 已確認</button><span class="card-sub" style="margin-left:auto;align-self:center">ⓘ 此為 AI 建議，非直接設備控制指令</span></div>`;
}
