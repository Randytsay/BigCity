function renderExecutive(){
  return hero('Executive Energy Brief','能源創造價值・數據驅動決策・邁向更永續、更具競爭力的商業營運。')+
  `<div class="grid-4" style="margin-bottom:9px">
    ${kpi('◒','年累計空調節電量','1,280,500','kWh','▲ 12%　較去年同期','good','green')}
    ${kpi('◉','節省電費','NT$ 3,456,000','','▲ 15%　較去年同期','good','green')}
    ${kpi('CO₂','減碳量','635','公噸 CO₂e','▲ 12%','good','green')}
    ${kpi('▥','AI 預測全年節電','1,680,000','kWh','預測達成率 92%','good')}
  </div>
  <div class="grid-3">
    ${execScore('巨城本館','iFIX','main',88,'A','表現優異','能源使用效率優異，持續優化可創造更多節能效益。')}
    ${execScore('創藝大樓','WebCTRL','creative',82,'A-','持續精進','整體表現良好，仍有水側與時程優化空間。')}
    ${execScore('威秀影城','WebCTRL','cinema',76,'B+','重點關注','營運負載型態特殊，建議以場次資料強化預測。')}
  </div>
  <div class="grid-3">
    <section class="card"><div class="card-head"><div class="card-title"><span class="spark">✦</span>AI Executive Summary</div></div><div class="mini-list">
      <div class="mini-row"><span class="rank-dot good">1</span><div><b>本月整體能源績效改善</b><small>三場域空調耗能較去年同期下降 8.7%，本館貢獻最大。</small></div></div>
      <div class="mini-row"><span class="rank-dot">2</span><div><b>最大節能機會仍在水側</b><small>AI 估計可改善機會主要來自二次泵與低 ΔT。</small></div></div>
      <div class="mini-row"><span class="rank-dot">3</span><div><b>本週無重大舒適度風險</b><small>各場域環境條件維持可接受範圍。</small></div></div>
    </div></section>
    <section class="card"><div class="card-head"><div class="card-title"><span class="spark">◉</span>投資與回報成效</div></div><div class="roi-grid"><div class="roi-item"><b>NT$12.8M</b><span>專案投資</span></div><div class="roi-item"><b>NT$8.96M</b><span>累積節省</span></div><div class="roi-item"><b>1.8 年</b><span>預估回收期</span></div></div><div class="progress"><i style="width:70%"></i></div><div class="card-sub" style="margin-top:8px">回收進度 70%｜投資效益優於原估 2.5 年</div></section>
    ${card('<span class="spark">▥</span>能源使用趨勢與 AI Forecast',`<div class="chart-box small">${svgLine([{name:'2025實際',data:[.2,.32,.47,.63,.79,.96,.99,.98,.96]},{name:'Baseline',data:[.25,.38,.55,.72,.91,1.1,1.18,1.27,1.38],color:'#9eb3c7'},{name:'AI Forecast',data:[.2,.32,.47,.63,.79,.96,1.12,1.3,1.48,1.62,1.76,1.91],color:'#18b987',dash:true}],['1','2','3','4','5','6','7','8','9','10','11','12'],{min:0,max:2,decimals:1})}</div>`)}
  </div>
  <div class="grid-3">
    ${execList('Top 3 節能機會',[['水側差壓最佳化','預估 +210 MWh/yr','高優先','good'],['AHU 運轉時程最佳化','預估 +92 MWh/yr','中優先','blue'],['冷卻水塔策略最佳化','預估 +60 MWh/yr','中優先','blue']])}
    ${execList('Top 3 風險與關注',[['CH-01 效率衰退趨勢','建議排入停機檢查','高風險','bad'],['夏季尖峰需量風險','7–8月負載上升','中風險','warn'],['威秀營運負載壓力','暑期場次密度增加','低風險','blue']])}
    ${execList('主管待決策事項',[['核准水側最佳化試運轉','預計 4 週｜先人工調整','待核准','warn'],['排入 CH-01 停機檢查','非營運時段執行','待決策','blue'],['評估威秀場次資料 PoC','3 個月資料驗證','待討論','warn']])}
  </div>`;
}
function execScore(name,bms,img,score,grade,tag,desc){
  return `<section class="card"><div class="scorecard"><div class="site-photo ${siteImages[img]}"></div><div class="score-meta"><h3>${name} <small>(${bms})</small></h3><div style="display:flex;align-items:center;gap:12px;margin-top:8px"><div class="score-ring" style="background:conic-gradient(var(--teal) 0 ${score}%,var(--surface3) ${score}%)"><b>${score}</b></div><div><div class="grade">${grade}</div>${pill(tag,grade==='B+'?'warn':'good')}</div></div><p>${desc}</p></div></div></section>`;
}
function execList(title,rows){
  return `<section class="card"><div class="card-head"><div class="card-title">${title}</div><span class="more">更多 ›</span></div><div class="mini-list">${rows.map((r,i)=>`<div class="mini-row"><span class="rank-dot">${i+1}</span><div><b>${r[0]}</b><small>${r[1]}</small></div>${pill(r[2],r[3])}</div>`).join('')}</div></section>`;
}

const renderers={home:renderHome,insights:renderInsights,performance:renderPerformance,plant:renderPlant,executive:renderExecutive};
function render(){
  document.body.classList.toggle('theme-dark',state.theme==='dark');
  document.body.classList.toggle('theme-light',state.theme!=='dark');
  $('#pageRoot').innerHTML=renderers[state.page]();
  $$('.nav-item').forEach(b=>b.classList.toggle('active',b.dataset.page===state.page));
  bindPage();
}
function bindPage(){
  $$('[data-control]').forEach(group=>{
    $$('button',group).forEach(btn=>btn.addEventListener('click',()=>{
      const k=group.dataset.control,v=btn.dataset.value;
      state[k]=v; render();
    }));
  });
  $$('[data-insight]').forEach(btn=>btn.addEventListener('click',()=>{state.insight=+btn.dataset.insight;render();}));
  $$('[data-feedback]').forEach(btn=>btn.addEventListener('click',()=>{state.feedback[state.insight]=btn.dataset.feedback;$('#fbText').textContent=btn.dataset.feedback;}));
  $$('.plant-row').forEach(row=>row.addEventListener('click',()=>{state.plantSelected=row.dataset.chiller;render();}));
  const search=$('#eventSearch');
  if(search) search.addEventListener('input',e=>{
    const q=e.target.value.trim().toLowerCase();
    $$('.event-row').forEach(r=>r.style.display=r.innerText.toLowerCase().includes(q)?'grid':'none');
  });
}

$('#mainNav').addEventListener('click',e=>{
  const b=e.target.closest('[data-page]'); if(!b)return;
  state.page=b.dataset.page; render(); window.scrollTo({top:0,behavior:'smooth'});
});
$('#themeToggle').addEventListener('click',()=>{
  state.theme=state.theme==='dark'?'light':'dark';
  try{localStorage.setItem('bigcity-theme',state.theme)}catch(e){} render();
});
render();
