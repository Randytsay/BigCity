function execKpi({icon,title,status,value,unit='',meta='',detail='',progress=null,iconClass='',gauge=false,spark=false}){
  return `<section class="exec-kpi">
    <div class="exec-kpi-head"><div class="exec-kpi-icon ${iconClass}">${icon}</div><div class="exec-kpi-title">${title}</div></div>
    <span class="exec-kpi-status">● ${status}</span>
    <div class="exec-kpi-value">${value}${unit?` <small>${unit}</small>`:''}</div>
    ${meta?`<div class="exec-kpi-meta">${meta}</div>`:''}
    ${progress!==null?`<div class="exec-progress"><i style="width:${progress}%">${progress}%</i></div>`:''}
    ${gauge?`<div class="exec-gauge"></div><div class="exec-gauge-labels"><span><b>0.82</b>現況</span><span><b>0.85</b>目標</span><span><b>0.93</b>基準</span></div>`:''}
    ${detail?`<div class="exec-kpi-good">${detail}</div>`:''}
    ${spark?`<div class="exec-kpi-spark"><i style="height:20%"></i><i style="height:30%"></i><i style="height:42%"></i><i style="height:55%"></i><i style="height:68%"></i><i style="height:82%"></i><i style="height:100%"></i></div>`:''}
  </section>`;
}
function execSite(name,bms,img,value,target,status,statusCls,note){
  return `<article class="exec-site">
    <div class="exec-site-photo ${siteImages[img]}"></div>
    <div><h3>${name} <small>(${bms})</small></h3><div class="exec-site-value">${value} <small>kW/RT</small></div><div class="exec-site-target">目標 ≤ ${target}</div><span class="exec-status ${statusCls}"><i></i>${status}</span><div class="exec-site-note">${note}</div></div>
  </article>`;
}
function execListRows(rows,benefit=false){return `<div class="exec-list">${rows.map((r,i)=>`<div class="exec-list-row"><span class="exec-rank">${i+1}</span><div><b>${r[0]}</b>${r[1]?`<small class="${benefit?'exec-benefit':''}">${r[1]}</small>`:''}</div></div>`).join('')}</div>`;}
function renderExecutive(){
  return `<div class="exec-snapshot">
    <section class="exec-hero">
      <h1>Executive Snapshot <span>2026</span></h1>
      <p>管理層總覽 — 一頁掌握整體營運、節能績效與關鍵決策</p>
      <div class="exec-hero-logo" aria-hidden="true"></div>
      <div class="exec-hero-tagline">PEOPLE<br>SHOPPING<br>A BRIGHTER<br>TOMORROW</div>
    </section>

    <div class="exec-summary-strip"><span class="ico">▥</span><span>整體系統穩定，2026 年累計績效優於目標，巨城本館水側仍有最佳化空間。</span></div>

    <div class="exec-kpi-grid">
      ${execKpi({icon:'ϟ',title:'今日空調用電',status:'正常',value:'3,542',unit:'kW',meta:'AI 預期　<b>3,820 kW</b>',detail:'▼ 優於預期 7.3%',spark:true})}
      ${execKpi({icon:'🍃',iconClass:'green',title:'2026 累計節電',status:'進度超前',value:'1.28',unit:'GWh',meta:'年度目標　<b>1.75 GWh</b><br>達成率　<b class="good">73%</b>',progress:73})}
      ${execKpi({icon:'◉',title:'2026 累計節費',status:'全年預估達標',value:'NT$ 6.3 M',meta:'年度目標　<b>NT$ 8.2 M</b><br>達成率　<b class="good">77%</b>',progress:77})}
      ${execKpi({icon:'❄',title:'整體冷源效率',status:'達標',value:'0.82',unit:'kW/RT',meta:'目標　<b>≤ 0.85</b><br>Baseline　<b>0.93</b>',detail:'▼ 達標｜優於基準 11.8%',gauge:true})}
    </div>

    <div class="exec-mid-grid">
      <section class="exec-card">
        <div class="exec-card-head"><div class="exec-card-title"><span class="ico">◎</span>三大場域即時狀態</div><span class="exec-more">查看全部場域 ›</span></div>
        <div class="exec-sites">
          ${execSite('巨城本館','iFIX','main','0.86','0.83','未達標 3.6%','warn','水側效率仍有提升空間。')}
          ${execSite('創藝大樓','WebCTRL','creative','0.84','0.87','達標','good','系統運轉穩定。')}
          ${execSite('威秀影城','WebCTRL','cinema','0.86','0.90','達標','good','運轉狀況良好。')}
        </div>
      </section>

      <section class="exec-card">
        <div class="exec-card-head"><div class="exec-card-title"><span class="ico">▣</span>2026 累計績效（截至 12/31）</div><span class="exec-more">2026 ›</span></div>
        <div class="exec-ytd">
          <div class="exec-ytd-item"><span>節電</span><b>1.28</b><span>GWh</span><small>▲ 18% 較去年同期</small></div>
          <div class="exec-ytd-item"><span>節費</span><b>NT$ 6.3 M</b><small>▲ 22% 較去年同期</small></div>
          <div class="exec-ytd-item"><span>減碳</span><b>608</b><span>tCO₂e</span><small>▲ 20% 較去年同期</small></div>
          <div class="exec-ytd-item"><span>年度目標達成率</span><div class="exec-ytd-ring"><b>73%</b></div><span style="text-align:center">目標 1.75 GWh</span></div>
        </div>
        <div class="exec-ai-forecast"><span class="ico">▥</span><div><b>AI 預測全年績效將超越目標 9%</b><p>依目前趨勢推估，2026 年節電量可達 1.91 GWh，優於年度目標 9%。</p></div></div>
      </section>
    </div>

    <div class="exec-bottom-grid">
      <section class="exec-card">
        <div class="exec-card-head"><div class="exec-card-title"><span class="ico">✦</span>AI Executive Summary</div><span class="exec-more">更多 ›</span></div>
        ${execListRows([
          ['整體系統運轉穩定，2026 年累計節電 1.28 GWh，達成率 73%，AI 預測全年將超越目標 9%。',''],
          ['巨城本館水側效率仍有最佳化空間，建議優先推動 ΔT 提升與泵浦運轉優化。',''],
          ['建議啟動 AI 優化第二階段，擴大 AHU 覆蓋並導入低 ΔT 改善計畫。','']
        ])}
      </section>

      <section class="exec-card">
        <div class="exec-card-head"><div class="exec-card-title"><span class="ico" style="color:var(--green)">🍃</span>Top Opportunities</div></div>
        ${execListRows([
          ['巨城系統水側效率優化','預估年效益 NT$ 2.1 M'],
          ['擴大 AHU AI 控制覆蓋','預估年效益 NT$ 1.8 M'],
          ['低 ΔT 改善計畫','預估年效益 NT$ 1.2 M']
        ],true)}
      </section>

      <section class="exec-card">
        <div class="exec-card-head"><div class="exec-card-title exec-risk-title"><span class="ico" style="color:var(--amber)">⚠</span>Top Risks</div></div>
        ${execListRows([
          ['夏季尖峰負載高於預期','可能影響節電目標達成'],
          ['設備老化導致效率下降','冰水主機、泵浦、AHU'],
          ['外部氣候異常（高溫熱浪）','增加空調負載與營運風險']
        ])}
      </section>

      <section class="exec-card">
        <div class="exec-card-head"><div class="exec-card-title"><span class="ico">▥</span>專案投資與 ROI</div><span class="exec-more">更多 ›</span></div>
        <div class="exec-roi-grid">
          <div class="exec-roi-item"><span>專案投資</span><b>NT$ 8.5 M</b></div>
          <div class="exec-roi-item"><span>累計回收</span><b>NT$ 4.2 M</b></div>
          <div class="exec-roi-item"><span>預估回收期</span><b>4.8 年</b></div>
          <div class="exec-roi-item"><span>AI 額外潛力</span><b>NT$ 1.7 M/年</b></div>
        </div>
        <div class="exec-roi-progress"><i></i></div><div class="exec-roi-caption">回收進度 49%</div>
        <div class="exec-decision-card"><div class="exec-card-head" style="margin-bottom:6px"><div class="exec-card-title"><span class="ico">▤</span>待決策事項</div><span class="exec-more">更多 ›</span></div><div class="exec-decisions">
          <div class="exec-decision"><span class="n">1</span><div><b>是否啟動 AI 優化第二階段？</b><small>擴大應用至更多場域與系統</small></div></div>
          <div class="exec-decision"><span class="n">2</span><div><b>是否擴大 AHU AI 控制覆蓋？</b><small>納入 B2–3F 及影城區 AHU</small></div></div>
          <div class="exec-decision"><span class="n">3</span><div><b>是否啟動低 ΔT 改善計畫？</b><small>提升水側效率，預估年效益 NT$ 1.2M</small></div></div>
        </div></div>
      </section>
    </div>
    <div class="exec-demo-note">Demo Data｜本頁數值為展示用途，正式系統應依現場 BMS / EMS、財務資料及 M&amp;V 結果呈現。</div>
  </div>`;
}

const renderers={home:renderHome,insights:renderInsights,performance:renderPerformance,plant:renderPlant,executive:renderExecutive};
function render(){
  document.body.classList.toggle('theme-dark',state.theme==='dark');
  document.body.classList.toggle('theme-light',state.theme!=='dark');
  document.body.classList.toggle('exec-mode',state.page==='executive');
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
