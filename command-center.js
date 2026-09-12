(function(){
  const ccIcon=(name)=>{
    const icons={
      bolt:'<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M13 2 4.5 13H11l-1 9 8.5-12H12l1-8Z"/></svg>',
      snow:'<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M12 2v20M4.2 6.5l15.6 11M4.2 17.5l15.6-11M8.5 4.5 12 7l3.5-2.5M8.5 19.5 12 17l3.5 2.5M3.5 10.2 7.5 12l-4 1.8M20.5 10.2 16.5 12l4 1.8"/></svg>',
      leaf:'<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M20.5 3.5C12 4 6 7.5 5.2 13.2c-.5 3.6 2 6.3 5.5 5.8 5.7-.8 9.2-6.8 9.8-15.5Z"/><path d="M5 21c2.1-5.4 5.5-9 11-11.5"/></svg>',
      coin:'<svg viewBox="0 0 24 24" aria-hidden="true"><ellipse cx="12" cy="6" rx="7" ry="3"/><path d="M5 6v4c0 1.7 3.1 3 7 3s7-1.3 7-3V6M5 10v4c0 1.7 3.1 3 7 3s7-1.3 7-3v-4M5 14v4c0 1.7 3.1 3 7 3s7-1.3 7-3v-4"/></svg>',
      shield:'<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M12 3 20 6v6c0 5-3.2 8-8 10-4.8-2-8-5-8-10V6l8-3Z"/><path d="m8.5 12 2.2 2.2 4.8-5"/></svg>',
      brain:'<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M9 4.5A3 3 0 0 0 4.8 8 3.4 3.4 0 0 0 5 14.4 3 3 0 0 0 9 18.5V4.5ZM15 4.5A3 3 0 0 1 19.2 8a3.4 3.4 0 0 1-.2 6.4 3 3 0 0 1-4 4.1V4.5Z"/><path d="M9 8.5h2M13 8.5h2M9 13h2M13 13h2M12 4v16"/></svg>',
      trend:'<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M4 19V5M4 19h16M7 15l4-4 3 2 5-7"/></svg>',
      gear:'<svg viewBox="0 0 24 24" aria-hidden="true"><circle cx="12" cy="12" r="3"/><path d="M12 2v3M12 19v3M2 12h3M19 12h3M4.9 4.9 7 7M17 17l2.1 2.1M19.1 4.9 17 7M7 17l-2.1 2.1"/></svg>'
    };
    return `<span class="cc-svg-icon cc-${name}">${icons[name]||icons.gear}</span>`;
  };

  const trendValues=[1280,1420,1600,1780,1960,2210,2440,2690,2920,3180,3510,3890,4070,3960,3520,3260,3180,3060,2980,2910,2770,2510,2190,1960];
  const y=(v)=>154-(v-1000)/(4300-1000)*118;
  const linePoints=trendValues.map((v,i)=>`${38+i*(542/23)},${y(v)}`).join(' ');
  const areaPoints=`38,154 ${linePoints} 580,154`;
  const bars=[32,39,55,66,52,61,44,33,29];

  function renderCommandCenter(){
    return `<div class="command-center">
      <section class="cc-titlebar">
        <div>
          <div class="cc-eyebrow">DELTA ENERGY × BIG CITY</div>
          <h1>遠東巨城 AI 能源指揮中心</h1>
          <p>Big City AI Energy Command Center</p>
        </div>
        <div class="cc-title-meta">
          <span class="cc-live"><i></i>AI 持續監測中</span>
          <span>Advisory Mode｜AI 建議模式</span>
          <span id="ccClock">--/--/--　--:--</span>
        </div>
      </section>

      <section class="cc-kpi-row">
        <article class="cc-kpi cc-kpi-blue">
          <div class="cc-kpi-label">${ccIcon('bolt')}<span>即時用電需量</span></div>
          <div class="cc-kpi-value">3,520 <small>kW</small></div>
          <div class="cc-kpi-foot good">↓ 8.7% <span>較昨日同時段</span></div>
        </article>
        <article class="cc-kpi cc-kpi-cyan">
          <div class="cc-kpi-label">${ccIcon('snow')}<span>總冷氣負載</span></div>
          <div class="cc-kpi-value">4,280 <small>RT</small></div>
          <div class="cc-progress"><i style="width:78%"></i></div>
          <div class="cc-kpi-foot"><span>系統運轉率</span><b>78%</b></div>
        </article>
        <article class="cc-efficiency">
          <div class="cc-gauge"><div class="cc-gauge-core"><span>冷源主機效率</span><strong>0.68</strong><small>kW/RT</small></div></div>
          <div class="cc-benchmark">${ccIcon('leaf')} 優於基準 12%</div>
        </article>
        <article class="cc-kpi cc-kpi-green">
          <div class="cc-kpi-label">${ccIcon('leaf')}<span>今日節電量</span></div>
          <div class="cc-kpi-value">12,480 <small>kWh</small></div>
          <div class="cc-kpi-foot good"><span>相當於減碳</span><b>6.2 公噸 CO₂e</b></div>
        </article>
        <article class="cc-kpi cc-kpi-amber">
          <div class="cc-kpi-label">${ccIcon('coin')}<span>本月預估節省</span></div>
          <div class="cc-kpi-value"><small>NT$</small> 421,000</div>
          <div class="cc-kpi-foot good">↑ 18% <span>較上月同期</span></div>
        </article>
        <article class="cc-kpi cc-kpi-green">
          <div class="cc-kpi-label">${ccIcon('shield')}<span>系統運行狀態</span></div>
          <div class="cc-status-main">正常運行</div>
          <div class="cc-progress"><i style="width:96%"></i></div>
          <div class="cc-kpi-foot"><span>設備健康度</span><b>96%</b></div>
        </article>
      </section>

      <section class="cc-main-grid">
        <article class="cc-panel cc-trend-panel">
          <div class="cc-panel-head"><div class="cc-panel-title">${ccIcon('trend')} 全館用電趨勢</div><div class="cc-tabs"><button class="active">今日</button><button>本週</button><button>本月</button></div><span>單位：kW</span></div>
          <div class="cc-chart-wrap">
            <svg viewBox="0 0 620 180" preserveAspectRatio="none" aria-label="全館用電趨勢示意圖">
              <defs><linearGradient id="ccArea" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#21c7ff" stop-opacity=".34"/><stop offset="1" stop-color="#21c7ff" stop-opacity="0"/></linearGradient></defs>
              <g class="cc-grid-lines"><line x1="38" y1="36" x2="580" y2="36"/><line x1="38" y1="75" x2="580" y2="75"/><line x1="38" y1="114" x2="580" y2="114"/><line x1="38" y1="154" x2="580" y2="154"/></g>
              <polygon points="${areaPoints}" fill="url(#ccArea)"/>
              <polyline points="${linePoints}" class="cc-chart-line"/>
              <polyline points="38,126 86,120 134,114 182,109 230,102 278,96 326,90 374,85 422,89 470,94 518,101 566,108" class="cc-chart-compare"/>
              <circle cx="${38+14*(542/23)}" cy="${y(3520)}" r="5" class="cc-focus-dot"/>
              <g class="cc-chart-labels"><text x="4" y="40">4,000</text><text x="4" y="79">3,000</text><text x="4" y="118">2,000</text><text x="4" y="158">1,000</text><text x="38" y="174">00:00</text><text x="145" y="174">04:00</text><text x="252" y="174">08:00</text><text x="359" y="174">12:00</text><text x="466" y="174">16:00</text><text x="556" y="174">20:00</text></g>
            </svg>
            <div class="cc-tooltip"><small>14:00</small><b>3,520 kW</b></div>
          </div>
          <div class="cc-legend"><span><i class="now"></i>今日用電</span><span><i class="compare"></i>昨日同時段</span></div>
        </article>

        <article class="cc-panel cc-ai-panel">
          <div class="cc-panel-head"><div class="cc-panel-title">${ccIcon('brain')} AI 節能洞察</div><span class="cc-more">查看全部 ›</span></div>
          <div class="cc-ai-list">
            <div class="cc-ai-item"><span class="cc-rank blue">1</span><div><b>建議冰水機最佳運轉組合</b><p>依目前負載，建議優先啟用高效率主機組合，降低低負載併機造成的效率損失。</p><small>預估系統能效可改善約 8%</small></div><button class="cc-action">採用建議</button></div>
            <div class="cc-ai-item"><span class="cc-rank green">2</span><div><b>二次側泵變頻調整建議</b><p>目前流量偏高且 ΔT 偏低；建議先確認最不利端，再人工試降設定值。</p><small>估計泵浦用電可降低 6–8%</small></div><button class="cc-action">採用建議</button></div>
            <div class="cc-ai-item"><span class="cc-rank amber">3</span><div><b>空調箱運轉時段優化</b><p>部分 AHU 於非尖峰時段仍維持偏高頻率，可由排程與閥位共同檢視。</p><small>每日可減少無效運轉時數</small></div><button class="cc-action secondary">查看排程</button></div>
          </div>
        </article>
      </section>

      <section class="cc-bottom-grid">
        <article class="cc-panel cc-donut-panel">
          <div class="cc-panel-head"><div class="cc-panel-title">用電結構分析（今日）</div></div>
          <div class="cc-donut-content"><div class="cc-donut"><div><strong>3,520</strong><small>kW</small></div></div><div class="cc-donut-legend"><span><i class="c1"></i>空調系統 <b>58%</b></span><span><i class="c2"></i>照明系統 <b>18%</b></span><span><i class="c3"></i>商業設備 <b>14%</b></span><span><i class="c4"></i>電梯／其他 <b>10%</b></span></div></div>
        </article>

        <article class="cc-panel cc-bar-panel">
          <div class="cc-panel-head"><div class="cc-panel-title">區域能耗比較</div><div class="cc-legend"><span><i class="now"></i>本日</span><span><i class="compare"></i>上週同日</span></div></div>
          <div class="cc-bars">${bars.map((v,i)=>`<div class="cc-bar-group"><div class="cc-bar back" style="height:${Math.max(18,v-8)}%"></div><div class="cc-bar front" style="height:${v}%"></div><span>${i===0?'B1':i+'F'}</span></div>`).join('')}</div>
        </article>

        <article class="cc-panel cc-equipment-panel">
          <div class="cc-panel-head"><div class="cc-panel-title">${ccIcon('gear')} 重要設備運行狀態</div><span class="cc-more">查看全部 ›</span></div>
          <div class="cc-table"><div class="cc-tr cc-th"><span>設備名稱</span><span>運行狀態</span><span>負載率</span><span>能效表現</span></div>
            <div class="cc-tr"><span>冰水機 CH-01</span><span class="run">● 運行中</span><span>72%</span><span class="good">0.66 kW/RT</span></div>
            <div class="cc-tr"><span>冰水機 CH-02</span><span class="run">● 運行中</span><span>68%</span><span class="good">0.70 kW/RT</span></div>
            <div class="cc-tr"><span>冰水機 CH-03</span><span class="standby">● 待機</span><span>0%</span><span>—</span></div>
            <div class="cc-tr"><span>二次泵 P-01</span><span class="run">● 運行中</span><span>65%</span><span class="good">高效</span></div>
            <div class="cc-tr"><span>冷卻水泵 CWP-01</span><span class="run">● 運行中</span><span>58%</span><span class="good">高效</span></div>
            <div class="cc-tr"><span>空調箱 AHU-3F-01</span><span class="run">● 運行中</span><span>76%</span><span class="good">良好</span></div>
          </div>
        </article>
      </section>
      <div class="cc-demo-note">資料來源｜BMS／EMS、設備量測與 M&amp;V 驗證資料　｜　AI 建議目前採 Advisory Mode。</div>
    </div>`;
  }

  if(typeof renderers!=='undefined' && typeof render==='function'){
    renderers.home=renderCommandCenter;
    const legacyRender=render;
    render=function(){
      legacyRender();
      document.body.classList.toggle('command-mode',state.page==='home');
      if(state.page==='home'){
        const clock=document.getElementById('ccClock');
        if(clock){const d=new Date(); clock.textContent=new Intl.DateTimeFormat('zh-TW',{year:'numeric',month:'2-digit',day:'2-digit',hour:'2-digit',minute:'2-digit',hour12:false}).format(d);}
        document.querySelectorAll('.cc-action').forEach(btn=>btn.addEventListener('click',()=>{btn.classList.add('accepted');btn.textContent='已加入建議';}));
      }
    };
    render();
  }
})();
