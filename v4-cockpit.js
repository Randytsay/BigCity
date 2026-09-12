(function(){
  const icon=(name)=>{
    const paths={
      bars:'<path d="M4 18V10h3v8H4Zm6 0V5h3v13h-3Zm6 0V2h3v16h-3Z"/>',
      server:'<rect x="3" y="4" width="18" height="6" rx="2"/><rect x="3" y="14" width="18" height="6" rx="2"/><circle cx="7" cy="7" r="1"/><circle cx="7" cy="17" r="1"/>',
      snow:'<path d="M12 2v20M4.2 6.4l15.6 11.2M4.2 17.6 19.8 6.4M8.5 4.5 12 7l3.5-2.5M8.5 19.5 12 17l3.5 2.5M3.6 10.2 7.5 12l-3.9 1.8M20.4 10.2 16.5 12l3.9 1.8"/>',
      thermo:'<path d="M9 4a3 3 0 0 1 6 0v8.3a5 5 0 1 1-6 0V4Z"/><path d="M12 6v9"/>',
      pulse:'<path d="M3 12h4l2-5 3 10 2-6 2 1h5"/>',
      flow:'<circle cx="6" cy="12" r="2"/><circle cx="18" cy="6" r="2"/><circle cx="18" cy="18" r="2"/><path d="M8 12h5M14 11l2-3M14 13l2 3"/>',
      trend:'<path d="M3 18V5M3 18h18M6 15l5-5 3 2 6-7"/>'
    };
    return `<svg viewBox="0 0 24 24" aria-hidden="true">${paths[name]||paths.bars}</svg>`;
  };

  function chillerSvg(key,state){
    const isOn=state==='on', isFault=state==='fault';
    const metalA=isOn?'#78efe0':isFault?'#ffd0d4':'#e8f1f7';
    const metalB=isOn?'#16b9ae':isFault?'#d96a73':'#92adc1';
    const metalC=isOn?'#0a817b':isFault?'#8f3c45':'#56778e';
    const accent=isOn?'#0ec1a8':isFault?'#ef6672':'#7d9db4';
    return `<svg viewBox="0 0 260 130" class="v4-chiller-svg" role="img" aria-label="冰水主機">
      <defs>
        <linearGradient id="body_${key}" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="${metalA}"/><stop offset=".5" stop-color="${metalB}"/><stop offset="1" stop-color="${metalC}"/></linearGradient>
        <linearGradient id="top_${key}" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#f7fbfe" stop-opacity=".92"/><stop offset="1" stop-color="${metalB}" stop-opacity=".9"/></linearGradient>
        <linearGradient id="panel_${key}" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#f9fcff"/><stop offset="1" stop-color="#b9cad5"/></linearGradient>
        <radialGradient id="cap_${key}"><stop offset="0" stop-color="#f7fbff"/><stop offset=".62" stop-color="${metalA}"/><stop offset="1" stop-color="${metalC}"/></radialGradient>
        <filter id="shadow_${key}" x="-20%" y="-30%" width="140%" height="170%"><feDropShadow dx="0" dy="7" stdDeviation="5" flood-color="#2d5b78" flood-opacity=".18"/></filter>
      </defs>
      <ellipse cx="128" cy="116" rx="94" ry="8" fill="#476f86" opacity=".14"/>
      <g filter="url(#shadow_${key})">
        <rect x="30" y="103" width="184" height="9" rx="2" fill="#8197a6"/>
        <rect x="42" y="110" width="25" height="7" rx="2" fill="#698293"/><rect x="177" y="110" width="25" height="7" rx="2" fill="#698293"/>
        <rect x="28" y="60" width="166" height="40" rx="20" fill="url(#body_${key})" stroke="${accent}" stroke-opacity=".55"/>
        <ellipse cx="40" cy="80" rx="20" ry="20" fill="url(#cap_${key})" stroke="${accent}" stroke-opacity=".65"/>
        <ellipse cx="182" cy="80" rx="20" ry="20" fill="url(#cap_${key})" stroke="${accent}" stroke-opacity=".65"/>
        <circle cx="40" cy="80" r="8.5" fill="#d8e8f1" stroke="${metalC}"/><circle cx="182" cy="80" r="8.5" fill="#d8e8f1" stroke="${metalC}"/>
        <path d="M65 61v38M96 61v38M127 61v38M158 61v38" stroke="#fff" stroke-opacity=".36"/>
        <rect x="53" y="34" width="136" height="29" rx="14" fill="url(#body_${key})" stroke="${accent}" stroke-opacity=".5"/>
        <ellipse cx="62" cy="48.5" rx="14.5" ry="14.5" fill="url(#cap_${key})" stroke="${accent}" stroke-opacity=".55"/>
        <ellipse cx="178" cy="48.5" rx="14.5" ry="14.5" fill="url(#cap_${key})" stroke="${accent}" stroke-opacity=".55"/>
        <path d="M79 35v27M105 35v27M132 35v27M157 35v27" stroke="#fff" stroke-opacity=".32"/>
        <path d="M91 34V22h43l18 12" fill="url(#top_${key})" stroke="${metalC}" stroke-width="1.2"/>
        <rect x="100" y="15" width="31" height="11" rx="3" fill="url(#top_${key})" stroke="${metalC}"/>
        <rect x="151" y="18" width="45" height="23" rx="10" fill="url(#top_${key})" stroke="${metalC}"/>
        <path d="M158 20v19M166 20v19M174 20v19M182 20v19M190 22v15" stroke="${metalC}" opacity=".65"/>
        <path d="M58 34V21h17M151 62V52h22" fill="none" stroke="${metalC}" stroke-width="2.3"/>
        <rect x="53" y="17" width="12" height="9" rx="2" fill="#dfeaf1" stroke="${metalC}"/>
        <rect x="198" y="46" width="36" height="54" rx="4" fill="url(#panel_${key})" stroke="${metalC}"/>
        <rect x="204" y="53" width="24" height="15" rx="2" fill="${isOn?'#d7fff3':'#e8f2f7'}" stroke="${isOn?'#16a879':'#7898ad'}"/>
        <circle cx="208" cy="77" r="2.4" fill="${isOn?'#12b77e':'#8ba2b2'}"/><circle cx="216" cy="77" r="2.4" fill="#f0b33d"/><circle cx="224" cy="77" r="2.4" fill="${isFault?'#ee5c69':'#93a8b6'}"/>
        <path d="M205 84h22M205 90h22" stroke="#7f98a8" stroke-width="1.5"/>
      </g>
    </svg>`;
  }

  const towerSvg=()=>`<svg viewBox="0 0 130 120" class="v4-flow-svg" aria-hidden="true"><defs><linearGradient id="ctg" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#f8fcff"/><stop offset=".55" stop-color="#b9d6e7"/><stop offset="1" stop-color="#7499b0"/></linearGradient><filter id="cts"><feDropShadow dx="0" dy="6" stdDeviation="4" flood-color="#265d7e" flood-opacity=".18"/></filter></defs><ellipse cx="64" cy="108" rx="45" ry="7" fill="#6f91a5" opacity=".14"/><g filter="url(#cts)"><path d="M28 27h72l8 15-10 56H30L20 42l8-15Z" fill="url(#ctg)" stroke="#5b8aa7"/><path d="M25 42h78M29 55h70M31 69h66M33 84h62" stroke="#fff" opacity=".65"/><path d="M40 30l45 62M88 30 43 92" stroke="#6296b5" opacity=".55"/><rect x="47" y="16" width="35" height="12" rx="3" fill="#a8c5d6" stroke="#5b8aa7"/><rect x="55" y="10" width="19" height="7" rx="2" fill="#d8e7ef" stroke="#5b8aa7"/><rect x="24" y="98" width="80" height="8" rx="2" fill="#849fb0"/></g></svg>`;
  const pumpSvg=(key)=>`<svg viewBox="0 0 130 120" class="v4-flow-svg" aria-hidden="true"><defs><linearGradient id="pg_${key}" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#42b8ff"/><stop offset=".52" stop-color="#147ed7"/><stop offset="1" stop-color="#07599f"/></linearGradient><filter id="ps_${key}"><feDropShadow dx="0" dy="6" stdDeviation="4" flood-color="#145b8f" flood-opacity=".22"/></filter></defs><ellipse cx="64" cy="103" rx="42" ry="7" fill="#276489" opacity=".16"/><g filter="url(#ps_${key})"><circle cx="53" cy="59" r="29" fill="url(#pg_${key})" stroke="#075a9c"/><circle cx="53" cy="59" r="14" fill="#b9e7ff" stroke="#075a9c"/><path d="M53 32c13 5 22 15 26 27M26 59H12v17h18M80 48h29v23H80" fill="url(#pg_${key})" stroke="#075a9c"/><rect x="74" y="42" width="21" height="11" rx="3" fill="#9fd7f6" stroke="#075a9c"/><rect x="31" y="88" width="65" height="9" rx="2" fill="#759bb4"/></g></svg>`;

  const metricIcon=(type)=>`<span class="v4-metric-icon">${icon(type)}</span>`;
  const titleIcon=(type)=>`<span class="v4-title-icon">${icon(type)}</span>`;
  const kpi=(iconText,label,val,meta,cls='')=>`<article class="ca-kpi ${cls}"><div class="ca-kpi-label"><span>${iconText}</span>${label}</div><b>${val}</b><small>${meta}</small></article>`;

  function trendSvg(){return `<svg viewBox="0 0 650 280" class="v4-trend" role="img" aria-label="近 24 小時趨勢圖">
    <g class="v4-grid"><line x1="62" y1="32" x2="620" y2="32"/><line x1="62" y1="78" x2="620" y2="78"/><line x1="62" y1="124" x2="620" y2="124"/><line x1="62" y1="170" x2="620" y2="170"/><line x1="62" y1="216" x2="620" y2="216"/><line x1="62" y1="250" x2="620" y2="250"/><line x1="62" y1="32" x2="62" y2="250"/><line x1="155" y1="32" x2="155" y2="250"/><line x1="248" y1="32" x2="248" y2="250"/><line x1="341" y1="32" x2="341" y2="250"/><line x1="434" y1="32" x2="434" y2="250"/><line x1="527" y1="32" x2="527" y2="250"/><line x1="620" y1="32" x2="620" y2="250"/></g>
    <g class="v4-ylabels"><text x="20" y="37">1.2</text><text x="20" y="83">1.0</text><text x="20" y="129">0.8</text><text x="20" y="175">0.6</text><text x="20" y="221">0.4</text><text x="20" y="255">0.2</text></g>
    <polyline class="v4-line teal" points="62,221 108,208 155,190 201,166 248,130 294,115 341,88 388,75 434,95 480,116 527,132 573,145 620,154"/>
    <polyline class="v4-line blue" points="62,232 108,220 155,205 201,190 248,172 294,151 341,130 388,108 434,100 480,103 527,109 573,119 620,128"/>
    <line x1="480" y1="25" x2="480" y2="250" class="v4-focus"/><circle cx="480" cy="103" r="8" class="v4-focus-dot"/>
    <g class="v4-xlabels"><text x="62" y="274">00:00</text><text x="155" y="274">04:00</text><text x="248" y="274">08:00</text><text x="341" y="274">12:00</text><text x="434" y="274">16:00</text><text x="527" y="274">20:00</text><text x="590" y="274">24:00</text></g>
  </svg>`}

  function renderPlantV4(){
    const chillers=[
      ['CH-01','待機',0,'—','standby'],['CH-02','待機',0,'—','standby'],['CH-03','運轉中',85,'0.66','on'],['CH-04','停機',0,'—','fault'],['CH-05','運轉中',78,'0.70','on'],['CH-06','運轉中',76,'0.69','on']
    ];
    return `<div class="ca-page v4-cockpit">
      <section class="ca-hero"><div><span>BIG CITY × DELTA ENERGY</span><h1>冰水機房智慧駕駛艙</h1><p>Chiller Plant Smart Cockpit｜即時監測主機、泵浦、水側效率與 AI 最佳化建議</p></div><div class="ca-mode-note">深／淺模式同步切換</div></section>
      <div class="ca-kpis">${kpi('◔','冷源主機效率','0.68 kW/RT','優於基準 12%','good')}${kpi('❄','即時冷量','3,080 RT','較昨日同期 +5.2%')}${kpi('ϟ','主機總功率','2,094 kW','較昨日同期 -6.8%','good')}${kpi('♨','系統 ΔT','5.1°C','目標 5.0°C','good')}${kpi('◉','二次泵頻率','43 Hz','最佳區間 40–50 Hz','good')}${kpi('AI','AI 今日建議','4 項','預估節能 6–8%','warn')}</div>

      <div class="v4-top-grid">
        <section class="v4-card v4-eff-card">
          <div class="v4-card-title">${titleIcon('bars')}<strong>冷源主機效率</strong><small>Chiller Plant Efficiency</small></div>
          <div class="v4-eff-body">
            <div class="v4-gauge"><div class="v4-gauge-center"><span>冷源主機效率</span><b>0.68</b><em>kW/RT</em></div></div>
            <div class="v4-metrics">
              <div>${metricIcon('snow')}<span>CHWS</span><b>7.0°C</b></div>
              <div>${metricIcon('snow')}<span>CHWR</span><b>12.1°C</b></div>
              <div>${metricIcon('thermo')}<span>CWS</span><b>28.6°C</b></div>
              <div>${metricIcon('thermo')}<span>CWR</span><b>32.4°C</b></div>
              <div>${metricIcon('pulse')}<span>系統負載</span><b>67%</b></div>
            </div>
          </div>
        </section>

        <section class="v4-card v4-chiller-panel">
          <div class="v4-panel-head"><div class="v4-card-title">${titleIcon('server')}<strong>主機運轉狀態</strong></div><div class="v4-ai-badge"><span>AI</span>最佳組合　<b>CH-03 + CH-05 + CH-06</b></div></div>
          <div class="v4-chiller-row">${chillers.map((c,i)=>`<article class="v4-chiller-card ${c[4]}">${chillerSvg('c'+i,c[4])}<h3>${c[0]}</h3><div class="v4-status"><i></i>${c[1]}</div><div class="v4-load"><span style="width:${c[2]}%"></span></div><strong>${c[2]}%</strong><small>${c[3]} kW/RT</small></article>`).join('')}</div>
        </section>
      </div>

      <div class="v4-mid-grid">
        <section class="v4-card v4-flow-panel">
          <div class="v4-card-title">${titleIcon('flow')}<strong>系統流程圖</strong><small>System Flow Diagram</small></div>
          <div class="v4-flow-row">
            <div class="v4-eq">${towerSvg()}<b>CT 冷卻水塔</b></div><div class="v4-arrow green">➜</div>
            <div class="v4-eq">${pumpSvg('cwp')}<b>CWP 冷卻水泵</b></div><div class="v4-arrow green">➜</div>
            <div class="v4-eq ch">${chillerSvg('flow','standby')}<b>CH 冰水主機</b></div><div class="v4-arrow blue">➜</div>
            <div class="v4-eq">${pumpSvg('p1')}<b>CHWP-1 一次泵</b></div><div class="v4-arrow blue">➜</div>
            <div class="v4-eq">${pumpSvg('p2')}<b>CHWP-2 二次泵</b></div>
          </div>
        </section>

        <section class="v4-card v4-trend-panel">
          <div class="v4-panel-head"><div class="v4-card-title">${titleIcon('trend')}<strong>近 24 小時趨勢</strong></div><div class="v4-tabs"><b>今日</b><span>本週</span><span>本月</span></div></div>
          ${trendSvg()}
        </section>
      </div>

      <div class="ca-grid plant-bottom"><section class="ca-card"><div class="ca-card-title">AI 診斷與優化建議</div><div class="recommend-list">${[['3F 局部低 ΔT','3F–5F 區域 ΔT 3.2°C，局部輸送效率偏低。','先確認最不利端，再人工試降二次側 DP 5 kPa。','6–8%'],['二次側過度送水','二次泵長時間高頻，部分時段負載偏低。','建議人工試降頻率並監看最不利端。','3–5%'],['部分 AHU 閥位偏低','3F 區域部分閥位低於 20%。','檢查盤管控制與末端需求。','2–4%'],['冷卻水塔效率可優化','CWR 32.4°C，仍有優化空間。','調整風扇台數與轉速策略。','3–6%']].map((r,i)=>`<div class="rec"><span>${i+1}</span><b>${r[0]}</b><p>${r[1]}</p><em>${r[2]}</em><strong>${r[3]}</strong></div>`).join('')}</div></section><section class="ca-card"><div class="ca-card-title">即時警示／關注事項</div><div class="alert-list"><div class="alert fault">● CH-04 主機故障停機 <b>待處理</b></div><div class="alert warn">▲ 2F 回水溫度偏高 <b>監測中</b></div><div class="alert warn">▲ CT-03 出水溫度偏高 <b>監測中</b></div><div class="alert good">● P-02 頻率波動已改善 <b>已改善</b></div></div></section></div>
      <div class="ca-note">控制狀態｜Advisory Mode，不直接下控設備；效益依現場量測與 M&amp;V 驗證結果更新。</div>
    </div>`;
  }

  if(typeof renderers!=='undefined') renderers.plant=renderPlantV4;
})();
