/* Customer-demo layer. It replaces only the manager snapshot and keeps the
 * existing technical pages available through the original navigation. */
(function(){
  const demoScopes={
    mall:{label:'商場 AHU ＋ 水側',title:'全館能源績效',sub:'聚焦29台 AHU、27台區域泵浦與低 ΔT 改善。',primary:'0.82',baseline:'0.93',target:'≤ 0.85',saving:'301,300',savingUnit:'kWh／年',cost:'NT$ 1.01M',scopeNote:'分析範圍｜AHU 與水側效益分項計算'},
    esco:{label:'Super ESCO 冷源',title:'冷源系統績效',sub:'聚焦9台冰水主機的COP、kW/RT與一分鐘資料品質。',primary:'0.68',baseline:'0.78',target:'≤ 0.72',saving:'—',savingUnit:'由專案M&V驗證',cost:'資料驗證中',scopeNote:'分析範圍｜主機效率與汰換後 M&V 分項計算'},
    cinema:{label:'影城智慧冷卻',title:'影城營運績效',sub:'把場次、入場高峰與空調負載連成可預測的冷卻節奏。',primary:'0.86',baseline:'0.96',target:'≤ 0.90',saving:'611,000',savingUnit:'kWh／年',cost:'NT$ 2.21M／年',scopeNote:'分析範圍｜場次前饋、預冷與散場卸載'}
  };
  const escapeHtml=s=>String(s).replace(/[&<>"']/g,m=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[m]));
  function proofChart(scope){
    const values=scope==='cinema'?{base:[.95,.96,.97,.98,.97,.96,.95,.94,.95,.96,.97,.96],actual:[.91,.89,.88,.86,.87,.88,.86,.84,.85,.86,.87,.86],forecast:[.86,.85,.84,.84,.83,.82,.82,.81,.82,.82,.83,.82],optimized:[.88,.86,.85,.84,.84,.83,.82,.81,.81,.80,.81,.80]}:scope==='esco'?{base:[.78,.79,.8,.81,.8,.79,.78,.77,.78,.79,.8,.79],actual:[.73,.71,.7,.69,.68,.67,.68,.67,.68,.69,.7,.68],forecast:[.69,.68,.68,.67,.67,.66,.66,.66,.67,.67,.68,.67],optimized:[.7,.69,.68,.67,.66,.66,.65,.65,.66,.66,.67,.66]}:{base:[.91,.92,.93,.94,.93,.92,.91,.9,.91,.92,.93,.92],actual:[.88,.86,.85,.84,.83,.82,.82,.81,.82,.83,.82,.82],forecast:[.83,.82,.82,.81,.81,.8,.8,.8,.81,.8,.81,.8],optimized:[.84,.83,.82,.81,.8,.8,.79,.79,.8,.79,.8,.79]};
    const W=820,H=292,L=46,R=20,T=18,B=37,min=Math.min(...values.optimized)-.035,max=Math.max(...values.base)+.035;
    const x=i=>L+(W-L-R)*(i/11), y=v=>T+(H-T-B)*(1-(v-min)/(max-min));
    const line=arr=>arr.map((v,i)=>`${x(i).toFixed(1)},${y(v).toFixed(1)}`).join(' ');
    let svg=`<svg class="demo-proof-chart" viewBox="0 0 ${W} ${H}" role="img" aria-label="基準線、現況、AI預測與最佳化預期趨勢圖">`;
    for(let i=0;i<5;i++){const yy=T+(H-T-B)*i/4;svg+=`<line class="grid" x1="${L}" y1="${yy}" x2="${W-R}" y2="${yy}"/><text x="7" y="${yy+4}">${(max-(max-min)*i/4).toFixed(2)}</text>`;}
    ['00','04','08','12','16','20','24'].forEach((label,i)=>{const xx=L+(W-L-R)*(i/6);svg+=`<text x="${xx}" y="${H-10}" text-anchor="middle">${label}</text>`});
    const ix=x(6);svg+=`<line class="intervention" x1="${ix}" y1="${T}" x2="${ix}" y2="${H-B}"/><text x="${ix+8}" y="${T+14}" fill="var(--demo-amber)">AI介入</text>`;
    svg+=`<polyline class="baseline" points="${line(values.base)}"/><polyline class="actual" points="${line(values.actual)}"/><polyline class="forecast" points="${line(values.forecast)}"/><polyline class="optimized" points="${line(values.optimized)}"/>`;
    values.actual.forEach((v,i)=>{if(i%2===0)svg+=`<circle cx="${x(i)}" cy="${y(v)}" r="4" fill="var(--demo-blue)"/>`;});
    return svg+'</svg>';
  }
  function demoKpi(icon,label,value,note){return `<div class="demo-kpi"><div class="demo-kpi-icon">${icon}</div><div><span>${label}</span><b>${value}</b><small>${note}</small></div></div>`;}
  function renderExecutiveDemo(){
    const key=state.demoScope||'mall',s=demoScopes[key];
    const insight=key==='cinema'?{
      title:'AI 今日首要建議：晚場前負載預測',
      sub:'將「發現」一路連到「驗證」，目前仍在Advisory Mode，不會直接下控設備。',
      steps:[['發現','18:00晚場前冷房負載預計上升18%。'],['證據','場次密度高｜進場高峰｜室溫24.2°C。'],['建議','提前35分鐘預冷，散場後分段卸載。'],['效益','降低尖峰需量；通過M&V後才算已驗證。']]
    }:key==='esco'?{
      title:'AI 今日首要建議：主機群運轉組合',
      sub:'將「發現」一路連到「驗證」，目前仍在Advisory Mode，不會直接下控設備。',
      steps:[['發現','CH-03在部分負載下效率偏離同工況基準。'],['證據','負載31%｜0.82 kW/RT｜冷凝水31.1°C。'],['建議','先比較9台主機，再確認最佳啟停組合。'],['效益','降低冷源用電；以1分鐘資料完成M&V。']]
    }:{
      title:'AI 今日首要建議：低ΔT輸送效率',
      sub:'將「發現」一路連到「驗證」，目前仍在Advisory Mode，不會直接下控設備。',
      steps:[['發現','3F–5F低ΔT持續，二次泵頻率偏高。'],['證據','ΔT 3.2°C｜泵浦52Hz｜閥位中位數18%。'],['建議','先確認最不利端，再人工試降DP 5 kPa。'],['效益','預估降低輸送用電；通過M&V後才算已驗證。']]
    };
    return `<div class="demo-executive">
      <div class="demo-title-row"><div><span class="demo-kicker"><i></i> BigCity × Delta Energy · ENERGY OPERATIONS</span><h1>把每一度電，轉成可以決策的答案</h1><p>整合能源績效、營運狀態與 AI 建議，讓每一項節能行動都有數據依據。</p></div><div class="demo-context"><span class="demo-chip live">● AI持續監測中</span><span class="demo-chip">最後同步｜2026/09/12 18:00</span><span class="demo-chip">Advisory Mode</span></div></div>
      <div class="demo-scope"><span class="demo-scope-label">分析範圍</span>${Object.entries(demoScopes).map(([id,x])=>`<button type="button" data-demo-scope="${id}" class="${id===key?'active':''}">${x.label}</button>`).join('')}</div>
      <div class="demo-hero-grid">
        <section class="demo-card demo-primary"><span class="demo-card-eyebrow">${s.title} · 系統效率</span><h2>現在是否達標？</h2><div class="demo-primary-sub">${s.sub}</div><div class="demo-main-metric"><strong>${s.primary}</strong><span>kW/RT</span></div><span class="demo-status"><i></i>優於目標 · 可持續觀察</span><div class="demo-gauge" aria-hidden="true"></div><div class="demo-gauge-labels"><span>高耗能</span><span>目標 <b>${s.target}</b></span><span>最佳化</span></div><div class="demo-proof"><div><span>AI預期</span><b>${key==='esco'?'.67':'.79'}</b><small>kW/RT</small></div><div><span>改善前基準</span><b>${s.baseline}</b><small>kW/RT</small></div><div><span>舒適度</span><b>98.6%</b><small>目前合格</small></div></div></section>
        <section class="demo-card demo-chart-card"><div class="demo-card-head"><div><h2>基準、現況與AI預期</h2><p>${s.scopeNote}</p></div><div class="demo-legend"><span><i class="baseline"></i>Baseline</span><span><i class="actual"></i>Actual</span><span><i class="forecast"></i>AI Forecast</span><span><i class="optimized"></i>Optimized</span></div></div>${proofChart(key)}<div class="demo-chart-note"><i></i>垂直線代表AI建議介入時段；Actual低於Baseline才列入後續M&amp;V驗證。</div></section>
      </div>
      <div class="demo-kpi-grid">${demoKpi('ϟ','本期節電潛力',key==='esco'?'M&V驗證中':(key==='cinema'?'611 MWh':'301 MWh'),'依 M&V 驗證，不與其他方案重複計算')}${demoKpi('◉','年度節費',key==='mall'?'NT$ 1.01M':(key==='cinema'?'NT$ 2.21M':'待驗證'),'依現場電價與 M&V 計算')}${demoKpi('♧','資料可信度','99.2%','低可信資料不產生節能結論')}${demoKpi('🛡','舒適度保護','啟用','22–26°C／CO₂ ≤ 800 ppm') }</div>
      <div class="demo-lower-grid">
        <section class="demo-card demo-ai-card"><div class="demo-card-head"><div><h2>${insight.title}</h2><p>${insight.sub}</p></div><span class="demo-chip">Confidence 87%</span></div><div class="demo-ai-chain">${insight.steps.map((step,i)=>`<div class="demo-ai-step"><b><i>${i+1}</i>${step[0]}</b><p>${step[1].replace('DP 5 kPa','DP <strong>5 kPa</strong>')}</p></div>`).join('')}</div><div class="demo-action-row"><button class="demo-action primary" type="button" data-demo-action="evidence">查看證據</button><button class="demo-action" type="button" data-demo-action="adopt">建立改善建議</button><span class="demo-action-note" id="demoActionNote" aria-live="polite">操作員尚未回覆，設備維持原控制。</span></div><div class="demo-evidence-panel" id="demoEvidencePanel" hidden><strong>Evidence snapshot</strong><span>${insight.steps[1][1]}</span><span>資料可信度99.2%｜舒適度Guardrail啟用｜未通過M&amp;V不列入已驗證節能</span></div></section>
        <section class="demo-card demo-rollout"><div class="demo-card-head"><div><h2>從建議走向自動化</h2><p>安全邊界先於節能幅度，保留人工接管與回退。</p></div><span class="demo-chip live">Safety first</span></div><div class="demo-rollout-track"><div class="demo-rollout-item active"><i>✓</i><b>Advisory</b><span>現在<br>AI分析與建議</span></div><div class="demo-rollout-item"><i>2</i><b>Shadow</b><span>下一步<br>不下控、先驗證</span></div><div class="demo-rollout-item"><i>3</i><b>限幅自控</b><span>目標<br>超限即回退</span></div></div><div class="demo-safety"><div><b>舒適度</b><span>溫度／CO₂越界停止調整</span></div><div><b>設備安全</b><span>沿用原BMS連鎖保護</span></div><div><b>人工接管</b><span>每次採納保留稽核紀錄</span></div></div></section>
      </div>
      <div class="demo-card"><div class="demo-card-head"><div><h2>跨場域節能專案</h2><p>依不同場域聚焦關鍵指標與改善策略。</p></div><span class="demo-chip">專案範圍</span></div><div class="demo-projects"><article class="demo-project"><div class="demo-project-head"><h3>商場 AHU ＋ 水側</h3><span class="demo-chip live">29 AHU</span></div><p>追蹤低ΔT、水側輸送與 AHU 舒適度，支援 Shadow 到分階段控制。</p><div class="demo-project-metrics"><div><span>區域泵浦</span><b>27 台</b></div><div><span>AI＋水側目標</span><b>301 MWh</b></div></div></article><article class="demo-project"><div class="demo-project-head"><h3>Super ESCO 冷源</h3><span class="demo-chip">9 Chillers</span></div><p>追蹤個別主機 COP、kW/RT、資料品質與汰換後 M&amp;V。</p><div class="demo-project-metrics"><div><span>資料頻率</span><b>1 分鐘</b></div><div><span>驗證狀態</span><b>待 M&amp;V</b></div></div></article><article class="demo-project"><div class="demo-project-head"><h3>影城智慧冷卻</h3><span class="demo-chip live">Showtime AI</span></div><p>追蹤場次前饋、預冷、散場卸載與尖峰需量管理。</p><div class="demo-project-metrics"><div><span>年度效益</span><b>611 MWh</b></div><div><span>營運資料</span><b>場次排程</b></div></div></article></div></div>
      <div class="demo-footnote">資料來源｜iFIX、WebCTRL、電錶、場次排程與現場感測；節能效益依 M&amp;V 模型持續更新。</div>
    </div>`;
  }
  function bindDemo(){
    document.querySelectorAll('[data-demo-scope]').forEach(btn=>btn.addEventListener('click',()=>{state.demoScope=btn.dataset.demoScope;render();}));
    document.querySelectorAll('[data-demo-action]').forEach(btn=>btn.addEventListener('click',()=>{const note=document.getElementById('demoActionNote');if(!note)return;if(btn.dataset.demoAction==='evidence'){const panel=document.getElementById('demoEvidencePanel');if(panel)panel.hidden=false;note.textContent='證據已展開；目前仍不會直接改變設備設定。';}else{note.textContent='已建立改善建議，等待操作員確認後進入Shadow驗證。';const next=document.querySelector('.demo-rollout-item:nth-child(2)');if(next)next.classList.add('active');}}));
  }
  if(typeof renderers!=='undefined'&&typeof render==='function'){
    renderers.executive=renderExecutiveDemo;
    const oldRender=render;
    window.render=()=>{oldRender();if(state.page==='executive')bindDemo();};
    if(state.page==='executive')window.render();
  }
})();
