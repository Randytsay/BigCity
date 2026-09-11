(function(){
  const icon=(name)=>{
    const p={
      trend:'<path d="M3 18V5M3 18h18M6 15l5-5 3 2 6-7"/>',
      donut:'<circle cx="12" cy="12" r="8"/><path d="M12 4v8l6 4"/>',
      star:'<path d="m12 3 2.6 5.3 5.9.9-4.3 4.2 1 5.9-5.2-2.8-5.2 2.8 1-5.9-4.3-4.2 5.9-.9L12 3Z"/>',
      shield:'<path d="M12 3 20 6v6c0 5-3.2 8-8 10-4.8-2-8-5-8-10V6l8-3Z"/><path d="M12 8v5M12 17h.01"/>',
      bot:'<rect x="4" y="6" width="16" height="13" rx="4"/><path d="M9 6V3h6v3M8 12h.01M16 12h.01M8 16h8"/>'
    };
    return `<svg viewBox="0 0 24 24" aria-hidden="true">${p[name]||p.trend}</svg>`;
  };
  const title=(ico,text,sub='')=>`<div class="v6-card-title"><span class="v6-title-icon">${icon(ico)}</span><span>${text}${sub?` <small class="v6-subtitle">${sub}</small>`:''}</span></div>`;
  const kpi=(ico,label,val,meta,cls='')=>`<article class="ca-kpi ${cls}"><div class="ca-kpi-label"><span>${ico}</span>${label}</div><b>${val}</b><small>${meta}</small></article>`;

  function trendSvg(){
    return `<svg viewBox="0 0 760 300" class="v6-analyst-trend" role="img" aria-label="冰水系統效率趨勢圖，單位 kW/RT">
      <g class="v6-grid">
        <line x1="76" y1="34" x2="724" y2="34"/><line x1="76" y1="86" x2="724" y2="86"/><line x1="76" y1="138" x2="724" y2="138"/><line x1="76" y1="190" x2="724" y2="190"/><line x1="76" y1="242" x2="724" y2="242"/>
        <line x1="76" y1="34" x2="76" y2="242"/><line x1="184" y1="34" x2="184" y2="242"/><line x1="292" y1="34" x2="292" y2="242"/><line x1="400" y1="34" x2="400" y2="242"/><line x1="508" y1="34" x2="508" y2="242"/><line x1="616" y1="34" x2="616" y2="242"/><line x1="724" y1="34" x2="724" y2="242"/>
      </g>
      <rect x="440" y="24" width="120" height="228" rx="8" class="v6-highlight"/>
      <text x="18" y="26" class="v6-axis-unit">kW/RT</text>
      <g class="v6-ylabels"><text x="30" y="39">0.90</text><text x="30" y="91">0.80</text><text x="30" y="143">0.70</text><text x="30" y="195">0.60</text><text x="30" y="247">0.50</text></g>
      <g class="v6-xlabels"><text x="76" y="278">00:00</text><text x="174" y="278">04:00</text><text x="282" y="278">08:00</text><text x="390" y="278">12:00</text><text x="498" y="278">16:00</text><text x="606" y="278">20:00</text><text x="690" y="278">24:00</text></g>
      <polyline class="v6-chart-line goal" points="76,96 130,103 184,119 238,114 292,101 346,85 400,76 454,70 508,76 562,90 616,96 670,98 724,96"/>
      <polyline class="v6-chart-line actual" points="76,112 130,124 184,156 238,141 292,124 346,112 400,106 454,96 508,104 562,114 616,124 670,116 724,126"/>
      <polyline class="v6-chart-line baseline" points="76,176 130,174 184,166 238,154 292,144 346,134 400,122 454,118 508,134 562,148 616,156 670,162 724,166"/>
      <line x1="508" y1="24" x2="508" y2="242" class="v6-focus-line"/><circle cx="508" cy="104" r="7" class="v6-focus-dot"/>
      <text x="452" y="52" class="v6-annotation">AI 建議介入時段</text>
    </svg>`;
  }

  function renderInsightsV6(){
    const opportunities=[
      ['優化二次側水閥開度','低 ΔT 時段優先調整末端閥位與 DP 設定','NT$ 1.0M / 年','280,000 kWh/年'],
      ['AHU 變頻器策略優化','依閥位、送風溫度與負載聯動降低風機頻率','NT$ 320K / 年','92,000 kWh/年'],
      ['冰水泵變頻控制優化','最不利端滿足後逐步降低壓差與泵浦頻率','NT$ 280K / 年','81,000 kWh/年'],
      ['需量反應排程優化','尖峰時段整合啟停排程與需量預測','NT$ 180K / 年','52,000 kWh/年']
    ];
    const risks=[
      ['熱浪高負載','外氣高溫可能推升主機與冷卻水塔負載','高風險','high'],
      ['感測器數據偏移','部分溫度／流量點位需進一步校驗','中風險','medium'],
      ['低 ΔT 持續','若持續將造成流量增加與輸送效率下降','中風險','medium'],
      ['排程設定異常','非營業時段仍有設備延後停機','低風險','low']
    ];
    return `<div class="ca-page analyst analyst-v6">
      <section class="ca-hero"><div><span>BIG CITY × DELTA ENERGY</span><h1>AI 能源分析師</h1><p>AI Energy Analyst｜從 Data 到 Insight，從 Insight 到 Action</p></div><div class="ca-mode-note">Explainable AI</div></section>
      <div class="ca-kpis analyst-kpis">${kpi('AI','今日 AI 洞察','7 項','較昨日 +2','purple')}${kpi('🍃','已確認節能機會','NT$ 1.2M / 年','預估年減碳 420 噸 CO₂e','good')}${kpi('⚠','異常風險','3 項','較昨日 -1','warn')}${kpi('◈','分析可信度','87%','基於歷史數據與 AI 模型')}${kpi('◎','持續分析','24/7','讓每一度電創造更大價值')}</div>

      <div class="ca-grid analyst-main">
        <section class="ca-card issue"><div class="ca-card-head"><div class="ca-card-title">今日首要議題：低 ΔT 導致輸送效率下降</div><span class="risk-chip">影響重大</span></div><p class="issue-sub">3F–5F 區域 14:00–16:00 冰水 ΔT 顯著下降，導致流量上升、用電增加與整體輸送效率下降。</p><div class="reason-chain">${[['現象','冰水 ΔT 5.8→3.2°C\n冰水泵用電 +28%'],['證據','3F–5F 溫差偏低\n流量增加 32%'],['可能原因','二次側流量過大\n部分 AHU 控制不佳'],['建議動作','調整水閥與泵浦\n檢查 AHU 盤管'],['預估效益','280,000 kWh/年\n約 NT$1.0M/年']].map((x,i)=>`<div class="reason r${i}"><b>${x[0]}</b><p>${x[1].replace('\n','<br>')}</p></div>`).join('<span class="arrow">→</span>')}</div></section>
        <section class="ca-card timeline"><div class="ca-card-title">AI 事件解讀 <small>AI Analysis Timeline</small></div><div class="timeline-list">${[['14:40','3F–5F 冰水 ΔT 降至 3.2°C'],['14:05','冰水泵流量上升 32%'],['13:10','外氣溫度快速上升 +3.8°C'],['11:20','AHU-3 回風溫度偏高'],['08:30','系統運行正常']].map((x,i)=>`<div><time>${x[0]}</time><span class="t-dot t${i}"></span><p>${x[1]}</p></div>`).join('')}</div></section>
      </div>

      <div class="v6-mid-grid">
        <section class="v6-card v6-trend-card"><div class="v6-card-head">${title('trend','冰水系統效率趨勢','Chiller Plant Efficiency')}<div class="v6-chart-legend"><span><i class="goal"></i>最佳化目標</span><span><i class="actual"></i>實際效率</span><span><i class="baseline"></i>參考基準</span></div></div>${trendSvg()}</section>
        <section class="v6-card v6-opportunity-card"><div class="v6-card-head">${title('donut','節能機會分布','Opportunity Breakdown')}</div><div class="v6-donut-layout"><div class="v6-donut"><div class="v6-donut-center"><div class="v6-donut-value">NT$1.2M</div><div class="v6-donut-unit">/ 年</div><div class="v6-donut-label">預估節省效益</div></div></div><div class="v6-donut-legend"><div><i class="d1"></i><span>冰水主機</span><b>38%</b></div><div><i class="d2"></i><span>冰水泵浦</span><b>27%</b></div><div><i class="d3"></i><span>AHU 空調箱</span><b>18%</b></div><div><i class="d4"></i><span>需量管理</span><b>10%</b></div><div><i class="d5"></i><span>其他</span><b>7%</b></div></div></div></section>
      </div>

      <div class="v6-bottom-grid">
        <section class="v6-card"><div class="v6-card-head">${title('star','Top Opportunities','AI Ranked Opportunities')}</div><div class="v6-list">${opportunities.map((x,i)=>`<div class="v6-list-item"><span class="v6-rank">${i+1}</span><div class="v6-item-copy"><b>${x[0]}</b><small>${x[1]}</small></div><div class="v6-benefit"><strong>${x[2]}</strong><span>${x[3]}</span></div></div>`).join('')}</div></section>
        <section class="v6-card"><div class="v6-card-head">${title('shield','Top Risks','Operational Risks')}</div><div class="v6-list">${risks.map((x,i)=>`<div class="v6-list-item risk"><span class="v6-rank">${i+1}</span><div class="v6-item-copy"><b>${x[0]}</b><small>${x[1]}</small></div><span class="v6-severity ${x[3]}">${x[2]}</span></div>`).join('')}</div></section>
        <section class="v6-card v6-copilot"><div class="v6-card-head">${title('bot','AI Copilot 智慧助理','Energy Copilot')}<span class="v6-ai-status"><i></i>在線</span></div><div class="v6-prompts"><button class="v6-prompt" type="button">為什麼昨日 14:00–16:00 用電上升？</button><button class="v6-prompt" type="button">如何進一步改善低 ΔT？</button></div><div class="v6-chat"><div class="v6-bubble user">為什麼昨日 14:00–16:00 用電上升？</div><div class="v6-bubble ai"><span class="v6-ai-label">AI 分析</span>主要原因為外氣溫度上升，同時二次側流量增加 32%，造成冰水 ΔT 降低與輸送效率下降。建議先確認最不利端閥位，再逐步降低 DP 設定並觀察 15 分鐘。<div class="v6-copilot-actions"><button class="v6-mini-action" type="button">查看證據</button><button class="v6-mini-action" type="button">建立改善建議</button></div></div></div><div class="v6-input-row"><input aria-label="輸入您的問題" placeholder="輸入您的問題，例如：本週哪個時段最耗能？"><button class="v6-send" type="button" aria-label="送出">➜</button></div></section>
      </div>
      <div class="v6-demo-note">Demo Data｜本頁為 AI 能源分析展示資料；正式系統應以現場 EMS／BMS、感測器與 M&amp;V 驗證資料為準。</div>
    </div>`;
  }

  function wireCopilot(){
    const root=document.getElementById('pageRoot'); if(!root || !root.querySelector('.analyst-v6'))return;
    const input=root.querySelector('.v6-input-row input');
    root.querySelectorAll('.v6-prompt').forEach(btn=>btn.addEventListener('click',()=>{if(input){input.value=btn.textContent.trim();input.focus();}}));
    const send=root.querySelector('.v6-send');
    if(send && input)send.addEventListener('click',()=>{if(!input.value.trim())return; const chat=root.querySelector('.v6-chat'); chat.insertAdjacentHTML('beforeend',`<div class="v6-bubble user">${input.value.replace(/[<>]/g,'')}</div><div class="v6-bubble ai"><span class="v6-ai-label">AI Demo</span>已收到問題。正式版本可串接即時 EMS／BMS 歷史資料、設備運轉事件與 AI 分析服務產生可追溯回答。</div>`); input.value='';});
  }

  if(typeof renderers!=='undefined'){
    renderers.insights=renderInsightsV6;
    const rerender=()=>{if(typeof state!=='undefined'&&state.page==='insights'&&typeof render==='function'){render();setTimeout(wireCopilot,0)}};
    // only redraw immediately when current page is insights
    if(typeof state!=='undefined'&&state.page==='insights'&&typeof render==='function')rerender();
    document.addEventListener('click',e=>{const b=e.target.closest&&e.target.closest('[data-page="insights"]');if(b)setTimeout(wireCopilot,20)});
  }
})();
