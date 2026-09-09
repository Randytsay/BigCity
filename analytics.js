function performanceData(){
  const f=periodFactor[state.period];
  const d=siteData[state.site];
  return {...d,rth:Math.round(d.rth*f),kwh:Math.round(d.kwh*f),saving:Math.round(d.saving*f),cost:Math.round(d.cost*f),co2:Math.round(d.co2*f)};
}
function renderPerformance(){
  const d=performanceData();
  const months=state.period==='year'?['1月','2月','3月','4月','5月','6月','7月','8月','9月','10月','11月','12月']:state.period==='quarter'?['第1月','第2月','第3月']:['W1','W2','W3','W4'];
  const trend=state.period==='year'?[.76,.73,.74,.78,.82,.86,.89,.88,.84,.82,.80,.79]:state.period==='quarter'?[.82,.86,.84]:[.80,.83,.86,.82];
  return hero('能源績效分析中心','跨場域能源績效比較・長期趨勢分析・驅動持續節能。')+
  `<div class="page-controls">
    <div class="control-group">場域：<div class="seg" data-control="site">${[['all','全部'],['main','巨城本館'],['creative','創藝大樓'],['cinema','威秀影城']].map(([v,t])=>`<button data-value="${v}" class="${state.site===v?'active':''}">${t}</button>`).join('')}</div></div>
    <div class="control-group">期間：<div class="seg" data-control="period">${[['year','年'],['quarter','季'],['month','月']].map(([v,t])=>`<button data-value="${v}" class="${state.period===v?'active':''}">${t}</button>`).join('')}</div></div>
    <div class="control-group">比較：<div class="seg" data-control="compare">${[['yoy','同期比較'],['prev','上期比較'],['last','去年同期'],['base','Baseline']].map(([v,t])=>`<button data-value="${v}" class="${state.compare===v?'active':''}">${t}</button>`).join('')}</div></div>
    <span class="control-btn">2026 年 ⌄</span>
  </div>
  <div class="kpi-grid">
    ${kpi('❄','累計 RTh<br>(冷凍噸時)',fmt(d.rth),'RTh','▼ 8%　較去年','good')}
    ${kpi('ϟ','累計 kWh<br>(用電量)',fmt(d.kwh),'kWh','▼ 6%　較去年','good')}
    ${kpi('▥','Plant kW/RT<br>(營運績效)',d.plant.toFixed(2),'','▼ 7%　較去年','good')}
    ${kpi('◒','節電量<br>(kWh)',fmt(d.saving),'kWh','▲ 12%','good','green')}
    ${kpi('◉','節省電費<br>(NT$)',fmt(d.cost),'NT$','▲ 12%','good','green')}
    ${kpi('CO₂','減碳量<br>(kg-CO₂e)',fmt(d.co2),'kg','▲ 12%','good','green')}
  </div>
  <div class="grid-2">
    <section class="card">
      <div class="card-head"><div class="card-title"><span class="spark">↯</span>各場域能源績效比較</div><span class="card-sub">${state.period==='year'?'2026/01–2026/12':state.period==='quarter'?'本季':'本月'}</span></div>
      <div class="table-wrap"><table><thead><tr><th>場域</th><th>累計 RTh</th><th>累計 kWh</th><th>Plant kW/RT</th><th>冰水一次泵</th><th>冰水二次泵</th><th>冷卻水泵</th><th>冷卻水塔</th></tr></thead><tbody>
        <tr><td>巨城本館 (iFIX)</td><td>${fmt(Math.round(642380*periodFactor[state.period]))}</td><td>${fmt(Math.round(2248550*periodFactor[state.period]))}</td><td class="good"><b>0.82</b></td><td>0.041</td><td>0.112</td><td>0.071</td><td>0.029</td></tr>
        <tr><td>創藝大樓 (WebCTRL)</td><td>${fmt(Math.round(321420*periodFactor[state.period]))}</td><td>${fmt(Math.round(1120480*periodFactor[state.period]))}</td><td class="good"><b>0.85</b></td><td>0.054</td><td>0.083</td><td>0.078</td><td>0.033</td></tr>
        <tr><td>威秀影城 (WebCTRL)</td><td>${fmt(Math.round(321520*periodFactor[state.period]))}</td><td>${fmt(Math.round(951520*periodFactor[state.period]))}</td><td class="bad"><b>0.96</b></td><td>0.061</td><td>0.096</td><td>0.074</td><td>0.038</td></tr>
      </tbody></table></div>
    </section>
    <section class="card">
      <div class="card-head"><div class="card-title"><span class="spark">✦</span>AI 趨勢解讀</div><span class="more">更多 ›</span></div>
      <div class="mini-list">
        <div class="mini-row"><span class="rank-dot">1</span><div><b>整體能效下降主因</b><small>近三個月 Plant kW/RT 的惡化主要來自二次泵與冷卻水側，而非主機本體。</small></div></div>
        <div class="mini-row"><span class="rank-dot">2</span><div><b>次級系統優化空間大</b><small>二次泵 kW/RT 上升約 18%，建議檢視 DP Reset、末端閥位與流量。</small></div></div>
        <div class="mini-row"><span class="rank-dot">3</span><div><b>冰水主機表現穩定</b><small>Chiller kW/RT 與去年相當，維持目前主機運轉策略。</small></div></div>
        <div class="mini-row"><span class="rank-dot">4</span><div><b>建議行動</b><small>優先處理二次泵 VFD 與冷卻水側，預估仍有 6–12% 系統改善空間。</small></div></div>
      </div>
    </section>
  </div>
  <div class="grid-3">
    ${card('<span class="spark">⌁</span>Plant kW/RT 趨勢',`<div class="card-head" style="margin-top:-2px"><span class="card-sub">${state.compare==='yoy'?'2026 vs 2025':'比較模式'}</span><div class="seg" data-control="chart"><button data-value="line" class="${state.chart==='line'?'active':''}">折線</button><button data-value="bar" class="${state.chart==='bar'?'active':''}">柱圖</button></div></div><div class="chart-box small">${state.chart==='line'?svgLine([{name:'本期',data:trend},{name:'比較期',data:trend.map(v=>v+.07),dash:true}],months,{min:.65,max:1.05,decimals:2,labelEvery:1}):svgBars([{name:'本期',data:trend},{name:'比較期',data:trend.map(v=>v+.07)}],months,{max:1.2})}</div>`)}
    ${card('<span class="spark">▥</span>各場域 Plant kW/RT 比較',`<div class="chart-box small">${svgBars([{name:'2025',data:[.88,.94,1.08],color:'#9eb3c7'},{name:'2026',data:[.82,.85,.96],color:'#1597f5'}],['巨城本館','創藝大樓','威秀影城'],{max:1.2})}</div>`)}
    ${card('<span class="spark">▥</span>能源結構分析（整體）',`<div class="donut-wrap"><div class="donut"><div class="donut-center">4,320,550<br>kWh</div></div><div class="legend"><span><i style="background:#249df7"></i>冰水主機 42%</span><span><i style="background:#36bfe0"></i>一次泵 12%</span><span><i style="background:#28b981"></i>二次泵 20%</span><span><i style="background:#f5a524"></i>冷卻水泵 16%</span><span><i style="background:#8b6be8"></i>冷卻水塔 10%</span></div></div>`)}
  </div>
  <div class="grid-3">
    ${card('<span class="spark">▥</span>系統能耗結構比較 (kW/RT)',`<div class="chart-box small">${svgStacked([[.57,.041,.112,.071,.029],[.624,.054,.083,.078,.033],[.691,.061,.096,.074,.038]],['巨城本館','創藝大樓','威秀影城'])}</div>`)}
    ${card('<span class="spark">≋</span>場域能效指標排名',`<div class="mini-list"><div class="mini-row"><span class="rank-dot">1</span><div><b>巨城本館</b><small>Plant 0.82 · 較去年 ▼7%</small></div>${pill('A','good')}</div><div class="mini-row"><span class="rank-dot">2</span><div><b>創藝大樓</b><small>Plant 0.85 · 較去年 ▼9%</small></div>${pill('A','good')}</div><div class="mini-row"><span class="rank-dot">3</span><div><b>威秀影城</b><small>Plant 0.96 · 較去年 ▼4%</small></div>${pill('B','warn')}</div></div>`)}
    ${card('<span class="spark">◷</span>月度節電成效',`<div class="chart-box small">${svgBars([{name:'節電量',data:[16,20,28,32,38,29,31,35,28,26,27,29],color:'#4bd7a0'}],['1','2','3','4','5','6','7','8','9','10','11','12'],{max:50})}</div><div class="card-sub" style="text-align:right">累計節電量 <b style="color:var(--ink)">288,430 kWh</b>　達成率 <b class="good">118%</b></div>`)}
  </div>`;
}

const chillers=[
  {id:'CH-01',status:'待機',rt:0,load:0,eff:null,lwt:'--',rwt:'--',hrs:12430,ai:'待觀察',cls:'warn'},
  {id:'CH-02',status:'運轉',rt:1020,load:85,eff:.55,lwt:'6.1',rwt:'11.6',hrs:18240,ai:'最佳',cls:'good'},
  {id:'CH-03',status:'運轉',rt:980,load:82,eff:.60,lwt:'6.2',rwt:'11.8',hrs:16580,ai:'正常',cls:'blue'},
  {id:'CH-04',status:'待機',rt:0,load:0,eff:null,lwt:'--',rwt:'--',hrs:10560,ai:'備用',cls:'blue'},
];
function renderPlant(){
  const selected=chillers.find(x=>x.id===state.plantSelected)||chillers[1];
  return hero('冷源系統診斷','診斷冰水主機、一次／二次泵、冷卻水塔與水側系統之運轉效率，找出影響能效的關鍵因素。')+
  `<div class="kpi-grid">
    ${kpi('❄','Plant Load<br>總冷量負載','2,480','RT','▼ 8%　較昨日','good')}
    ${kpi('▰','Plant kW/RT<br>整體能效','0.82','','▼ 12%　較昨日','good')}
    ${kpi('❄','主機 kW/RT<br>Chiller','0.58','','▼ 7%　較昨日','good')}
    ${kpi('▰','一次泵 kW/RT<br>Primary Pump','0.12','','▲ 9%　較昨日','bad')}
    ${kpi('▰','二次泵 kW/RT<br>Secondary Pump','0.08','','▲ 14%　較昨日','bad')}
    ${kpi('♜','冷卻水側效率<br>CT 效能指標','0.78','','▼ 6%　較昨日','good','teal')}
  </div>
  <div class="grid-2">
    <section class="card"><div class="card-head"><div class="card-title"><span class="spark">♧</span>主機群運轉狀態</div><span class="card-sub">即時更新：2026-09-09 22:55</span></div>
      <div class="table-wrap"><table><thead><tr><th>主機編號</th><th>運轉狀態</th><th>冷量 RT</th><th>負載率</th><th>kW/RT</th><th>LWT °C</th><th>RWT °C</th><th>運轉時數</th><th>AI 判斷</th></tr></thead><tbody>${chillers.map(c=>`<tr class="plant-row" data-chiller="${c.id}" style="${c.id===state.plantSelected?'background:color-mix(in srgb,var(--blue) 6%,var(--surface))':''}"><td><b>${c.id}</b></td><td>${pill(c.status,c.status==='運轉'?'good':'blue')}</td><td>${fmt(c.rt)}</td><td>${c.load}%</td><td>${c.eff??'--'}</td><td>${c.lwt}</td><td>${c.rwt}</td><td>${fmt(c.hrs)} h</td><td class="${c.cls}"><b>${c.ai}</b></td></tr>`).join('')}</tbody></table></div>
    </section>
    <section class="card">
      <div class="card-head"><div class="card-title"><span class="spark">✦</span>AI 技術建議</div><span class="more">更多 ›</span></div>
      <div class="mini-list">
        <div class="mini-row"><span class="rank-dot good">1</span><div><b>以 CH-02 與 CH-03 作為主力機組</b><small>兩台主機 kW/RT 0.55 / 0.60，效率良好；CH-01 暫維持待機。</small></div>${pill('建議','good')}</div>
        <div class="mini-row"><span class="rank-dot bad">2</span><div><b>優先針對二次側系統進行優化</b><small>二次泵 kW/RT 0.08，較昨日上升 14%，且低 ΔT 持續。</small></div>${pill('重點','bad')}</div>
        <div class="mini-row"><span class="rank-dot">3</span><div><b>降低水側壓差前，先驗證最不利端</b><small>確認末端 ΔT、流量與閥門開度，再人工調整 DP。</small></div>${pill('提醒','blue')}</div>
        <div class="mini-row"><span class="rank-dot good">4</span><div><b>持續關注冷卻水塔散熱能力</b><small>目前 Approach 尚可，夏季高濕球時段應持續追蹤。</small></div>${pill('追蹤','good')}</div>
      </div>
    </section>
  </div>
  <div class="grid-2">
    ${card('<span class="spark">▥</span>主機效率趨勢',`<div class="chart-box small">${svgLine([{name:'Plant',data:[.79,.81,.80,.83,.82,.84,.82,.81,.80,.82]},{name:'CH-02',data:[.54,.55,.55,.56,.55,.55,.54,.55,.55,.55],color:'#18b987'},{name:'CH-03',data:[.60,.60,.61,.60,.59,.60,.61,.60,.60,.60],color:'#f5aa1e'}],['00','02','04','06','08','10','12','14','16','18'],{min:.45,max:.95,decimals:2,labelEvery:1})}</div>`)}
    ${card('<span class="spark">?</span>目前選取主機：'+selected.id,`<div class="detail-block" style="min-height:auto"><h4 class="${selected.cls}">${selected.ai}</h4><p>${selected.id==='CH-02'?'目前同負載效率最佳，建議維持主力運轉並作為同型機比較基準。':selected.id==='CH-03'?'效率穩定，可與 CH-02 共同作為主力機組。':'目前非優先投入機組；待負載上升或輪值需求再評估投入。'}</p></div>`)}
  </div>
  <div class="grid-3">
    ${card('<span class="spark">♧</span>二次泵與低 ΔT 診斷',`<div class="chart-box small">${svgLine([{name:'ΔT °C',data:[4.2,4.1,3.8,3.5,3.2,3.1,3.4,3.2,3.0,2.9],color:'#1597f5'},{name:'Pump x0.1',data:[5.1,5.2,5.4,5.5,5.2,5.1,5.0,5.2,5.4,5.3],color:'#f5aa1e'}],['00','02','04','06','08','10','12','14','16','18'],{min:2,max:6,decimals:1})}</div><div class="card-sub">目前 ΔT 2.9°C｜二次泵約 53 Hz｜閥位中位數 34%</div>`)}
    ${card('<span class="spark">♜</span>冷卻水側 / 水塔運轉狀態',`<div class="chart-box small">${svgLine([{name:'CWR',data:[31.6,31.8,32.0,31.9,32.1,32.2,32.0,32.1],color:'#f5aa1e'},{name:'CWS',data:[27.2,27.3,27.4,27.3,27.5,27.4,27.4,27.4],color:'#1597f5'},{name:'Wet Bulb',data:[25.8,25.9,26.1,26.0,26.2,26.1,26.1,26.1],color:'#18b987'}],['10','11','12','13','14','15','16','17'],{min:24,max:34,decimals:1})}</div>`)}
    <section class="card"><div class="card-head"><div class="card-title"><span class="spark">⌕</span>為什麼效率不好？</div></div><div class="mini-list">
      <div class="mini-row"><span class="rank-dot">1</span><div><b>二次側 ΔT 偏低</b><small>流量過大，泵浦耗能增加，且可能降低整體機房效率。</small></div></div>
      <div class="mini-row"><span class="rank-dot">2</span><div><b>末端閥位普遍偏低</b><small>需求不高但水量仍高，支持 DP 設定偏高的判斷。</small></div></div>
      <div class="mini-row"><span class="rank-dot">3</span><div><b>部分主機部分負載效率較差</b><small>低負載時應優先由高效率主機承擔。</small></div></div>
      <div class="mini-row"><span class="rank-dot">4</span><div><b>冷卻水條件影響</b><small>高濕球時段需用 Approach 與主機效率一起判斷。</small></div></div>
    </div></section>
  </div>`;
}
