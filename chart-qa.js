/* Global chart QA: units, legends, mixed-axis fixes and presentation semantics */
function qaLegendHtml(items=[]){return items.map(i=>`<span class="qa-legend-item"><i class="${i.type==='box'?'qa-legend-box':'qa-legend-line'} ${i.dash?'dashed':''}" style="--qa-color:${i.color}"></i>${i.label}</span>`).join('');}
function qaMetaHtml(unit,x='時間 / 日期',items=[],note=''){return `<div class="qa-chart-meta"><div class="qa-axis-info"><span class="qa-unit-badge">Y 軸：${unit}</span><span class="qa-x-label">X 軸：${x}</span>${note?`<span class="qa-note">${note}</span>`:''}</div><div class="qa-legend">${qaLegendHtml(items)}</div></div>`;}
function qaFindCard(text){return $$('.card').find(c=>{const t=$('.card-title',c);return t&&t.textContent.replace(/\s+/g,' ').includes(text);});}
function qaAddMeta(title,unit,x,items,note=''){
  const c=qaFindCard(title); if(!c||$('.qa-chart-meta',c))return;
  const target=$('.chart-box,.ahu-waterfall',c); if(!target)return;
  target.insertAdjacentHTML('beforebegin',qaMetaHtml(unit,x,items,note));
}
function qaReplaceAhuUnitMixed(){
  const c=qaFindCard('運轉參數與環境趨勢'); if(!c||$('.qa-split-charts',c))return;
  const box=$('.chart-box',c); if(!box)return;
  const u=(typeof ahuUnits!=='undefined'&&ahuUnits[state.ahuUnit])?ahuUnits[state.ahuUnit]:{fan:68,valve:28,temp:23.8};
  const labels=['4/01','4/03','4/05','4/07','4/09','4/11','4/13','4/15','4/17','4/19','4/21','4/23','4/25','4/27','4/29','4/30'];
  const fanBase=[66,68,70,67,65,62,60,59,58,60,61,59,57,58,60,56], valveBase=[42,39,35,33,34,31,29,28,26,27,29,25,24,27,28,26], tempBase=[23.9,24.0,24.2,24.1,23.8,24.0,24.1,23.9,23.8,23.7,23.9,24.0,23.8,23.9,24.1,23.8];
  const fan=fanBase.map(v=>Math.max(0,Math.min(100,v+(u.fan-68))));
  const valve=valveBase.map(v=>Math.max(0,Math.min(100,v+(u.valve-28))));
  const temp=tempBase.map(v=>+(v+(u.temp-23.8)).toFixed(1));
  box.outerHTML=`<div class="qa-split-charts">
    <div class="qa-subchart"><div class="qa-subtitle">風機頻率與冰水閥開度</div>${qaMetaHtml('%','日期',[{color:'#735ce8',label:'Fan Speed 風機頻率'},{color:'#1597f5',label:'CHW Valve 冰水閥開度'}])}<div class="chart-box">${svgLine([{name:'Fan Speed (%)',data:fan,color:'#735ce8'},{name:'CHW Valve (%)',data:valve,color:'#1597f5'}],labels,{min:0,max:100,decimals:0,labelEvery:2})}</div></div>
    <div class="qa-subchart"><div class="qa-subtitle">Zone 溫度趨勢</div>${qaMetaHtml('°C','日期',[{color:'#f5aa1e',label:'Zone Temp'},{color:'#18b987',label:'舒適設定 24°C',dash:true}])}<div class="chart-box">${svgLine([{name:'Zone Temp (°C)',data:temp,color:'#f5aa1e'},{name:'Setpoint 24°C',data:labels.map(()=>24),color:'#18b987',dash:true}],labels,{min:22,max:26,decimals:1,labelEvery:2})}</div></div>
  </div>`;
}
function qaReplacePlantMixed(){
  const c=qaFindCard('二次泵與低 ΔT 診斷'); if(!c||$('.qa-split-charts',c))return;
  const box=$('.chart-box',c); if(!box)return;
  const labels=['00','02','04','06','08','10','12','14','16','18'];
  const dt=[4.2,4.1,3.8,3.5,3.2,3.1,3.4,3.2,3.0,2.9],hz=[51,52,54,55,52,51,50,52,54,53];
  box.outerHTML=`<div class="qa-split-charts">
    <div class="qa-subchart"><div class="qa-subtitle">系統 ΔT</div>${qaMetaHtml('°C','時間',[{color:'#1597f5',label:'ΔT'}])}<div class="chart-box">${svgLine([{name:'ΔT (°C)',data:dt,color:'#1597f5'}],labels,{min:2,max:5,decimals:1,labelEvery:2})}</div></div>
    <div class="qa-subchart"><div class="qa-subtitle">二次泵 VFD 頻率</div>${qaMetaHtml('Hz','時間',[{color:'#f5aa1e',label:'Secondary Pump Frequency'}])}<div class="chart-box">${svgLine([{name:'Pump Frequency (Hz)',data:hz,color:'#f5aa1e'}],labels,{min:35,max:60,decimals:0,labelEvery:2})}</div></div>
  </div>`;
}
function applyChartQA(){
  qaReplaceAhuUnitMixed(); qaReplacePlantMixed();
  const rules=[
    ['整體冷源效率趨勢','kW/RT','時間',[{color:'#1597f5',label:'即時效率'},{color:'#8ea9c0',label:'昨日效率',dash:true}]],
    ['Plant kW/RT 趨勢','kW/RT','期間',[{color:'#1597f5',label:'2026 本期'},{color:'#8ea9c0',label:'比較期',dash:true}]],
    ['各場域 Plant kW/RT 比較','kW/RT','場域',[{type:'box',color:'#9eb3c7',label:'2025'},{type:'box',color:'#1597f5',label:'2026'}]],
    ['系統能耗結構比較','kW/RT','場域',[{type:'box',color:'#1597f5',label:'冰水主機'},{type:'box',color:'#36bfe0',label:'一次泵'},{type:'box',color:'#18b987',label:'二次泵'},{type:'box',color:'#f5aa1e',label:'冷卻水泵'},{type:'box',color:'#735ce8',label:'冷卻水塔'}]],
    ['月度節電成效','MWh/月','月份',[{type:'box',color:'#4bd7a0',label:'月節電量'}]],
    ['主機效率趨勢','kW/RT','時間',[{color:'#1597f5',label:'Plant'},{color:'#18b987',label:'CH-02'},{color:'#f5aa1e',label:'CH-03'}]],
    ['冷卻水側 / 水塔運轉狀態','°C','時間',[{color:'#f5aa1e',label:'CWR 冷卻水回水'},{color:'#1597f5',label:'CWS 冷卻水出水'},{color:'#18b987',label:'Outdoor Wet Bulb 濕球'}]],
    ['能源使用趨勢與 AI Forecast','GWh（累計）','月份',[{color:'#1597f5',label:'2026 Actual'},{color:'#9eb3c7',label:'Baseline'},{color:'#18b987',label:'AI Forecast',dash:true}]],
    ['EC FAN vs VFD 改善成效比較','kWh/月','設備類型',[{type:'box',color:'#a8b9c9',label:'改善前'},{type:'box',color:'#1597f5',label:'改善後'}]],
    ['月度節電趨勢','MWh/月','月份',[{type:'box',color:'#a7b8c7',label:'2025'},{type:'box',color:'#1597f5',label:'2026'}]],
    ['用電量趨勢（Normalized Baseline vs Actual）','kWh/日','日期',[{color:'#1597f5',label:'Normalized Baseline'},{color:'#18b987',label:'Actual 改善後'}]],
    ['用電趨勢比較','kWh/日','時間 / 日期',[{color:'#9eb3c7',label:'Baseline',dash:true},{color:'#1597f5',label:'Actual 實際用電'},{color:'#18b987',label:'AI Shadow 建議用電',dash:true}]],
    ['風機頻率比較','%','時間',[{color:'#1597f5',label:'Actual Fan Speed'},{color:'#18b987',label:'AI Recommended Fan Speed',dash:true}]],
    ['節能貢獻組成 Waterfall','kWh/年','改善階段',[],'各柱為年度節電貢獻或目前耗能'],
    ['Verified AI-assisted Saving','MWh/月','月份',[{type:'box',color:'#18b987',label:'月度已驗證節電'}]],
    ['室內舒適度趨勢','°C','時間',[{color:'#1597f5',label:'Zone Temp'},{color:'#9eb3c7',label:'Outdoor Temp',dash:true}]],
    ['CO₂ 濃度','ppm','時間',[{color:'#1597f5',label:'Zone CO₂'},{color:'#18b987',label:'合規上限 800 ppm',dash:true}]]
  ];
  rules.forEach(r=>qaAddMeta(...r));
}
const qaRenderBase=render;
render=function(){qaRenderBase();applyChartQA();};
applyChartQA();
