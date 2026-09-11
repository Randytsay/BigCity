(function(){
  const chillerMarkup=(i)=>`
    <defs>
      <linearGradient id="ch-body-${i}" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="currentColor" stop-opacity=".18"/><stop offset=".48" stop-color="currentColor" stop-opacity=".46"/><stop offset="1" stop-color="currentColor" stop-opacity=".18"/></linearGradient>
      <linearGradient id="ch-metal-${i}" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#fff" stop-opacity=".76"/><stop offset=".45" stop-color="currentColor" stop-opacity=".32"/><stop offset="1" stop-color="#071c35" stop-opacity=".16"/></linearGradient>
      <linearGradient id="ch-panel-${i}" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#f7fcff"/><stop offset="1" stop-color="currentColor" stop-opacity=".16"/></linearGradient>
      <filter id="ch-shadow-${i}" x="-20%" y="-30%" width="150%" height="180%"><feDropShadow dx="0" dy="6" stdDeviation="5" flood-color="#16466a" flood-opacity=".20"/></filter>
    </defs>
    <g class="ch-real" filter="url(#ch-shadow-${i})">
      <ellipse class="ch-shadow" cx="112" cy="96" rx="94" ry="6"/>
      <rect class="ch-base" x="21" y="82" width="180" height="8" rx="2"/>
      <path class="ch-foot" d="M34 90v6h24v-6M164 90v6h24v-6"/>
      <g class="ch-vessel ch-vessel-low" fill="url(#ch-body-${i})">
        <rect x="23" y="53" width="158" height="31" rx="15.5"/>
        <ellipse cx="35" cy="68.5" rx="15.5" ry="15.5"/>
        <ellipse cx="169" cy="68.5" rx="15.5" ry="15.5"/>
        <circle cx="35" cy="68.5" r="7"/>
        <circle cx="169" cy="68.5" r="7"/>
        <path d="M56 54v29M87 54v29M118 54v29M149 54v29"/>
      </g>
      <g class="ch-vessel ch-vessel-high" fill="url(#ch-metal-${i})">
        <rect x="40" y="31" width="133" height="25" rx="12.5"/>
        <ellipse cx="49" cy="43.5" rx="12.5" ry="12.5"/>
        <ellipse cx="164" cy="43.5" rx="12.5" ry="12.5"/>
        <path d="M68 32v23M95 32v23M122 32v23M149 32v23"/>
      </g>
      <g class="ch-compressor" fill="url(#ch-metal-${i})">
        <path d="M73 30V18h46l13 12Z"/>
        <rect x="84" y="11" width="28" height="10" rx="2.5"/>
        <circle cx="101" cy="22" r="5"/>
      </g>
      <g class="ch-motor" fill="url(#ch-body-${i})">
        <rect x="135" y="18" width="43" height="19" rx="8.5"/>
        <path d="M142 20v15M149 20v15M156 20v15M163 20v15M170 20v15"/>
        <circle cx="177" cy="27.5" r="5"/>
      </g>
      <g class="ch-panel" fill="url(#ch-panel-${i})">
        <rect x="183" y="37" width="27" height="39" rx="3"/>
        <rect x="187" y="42" width="19" height="13" rx="2"/>
        <rect x="190" y="45" width="13" height="7" rx="1.5" class="ch-screen"/>
        <circle cx="189.5" cy="62" r="1.7"/><circle cx="196.5" cy="62" r="1.7"/><circle cx="203.5" cy="62" r="1.7"/>
        <path d="M188 68h17M188 72h17"/>
      </g>
      <g class="ch-pipes">
        <path d="M59 31V15h20M152 53V43h18M58 84v5M153 84v5"/>
        <rect x="53.5" y="10" width="11" height="9" rx="2"/>
        <rect x="166" y="39" width="11" height="9" rx="2"/>
      </g>
      <g class="ch-bolts">
        <circle cx="35" cy="58" r="1.4"/><circle cx="35" cy="79" r="1.4"/><circle cx="169" cy="58" r="1.4"/><circle cx="169" cy="79" r="1.4"/>
      </g>
    </g>`;

  const towerMarkup=(i)=>`
    <defs>
      <linearGradient id="tw-${i}" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#fff" stop-opacity=".75"/><stop offset=".55" stop-color="currentColor" stop-opacity=".18"/><stop offset="1" stop-color="currentColor" stop-opacity=".38"/></linearGradient>
      <filter id="tw-sh-${i}"><feDropShadow dx="0" dy="5" stdDeviation="4" flood-color="#2878ac" flood-opacity=".17"/></filter>
    </defs><g class="eq-real" filter="url(#tw-sh-${i})"><ellipse cx="37" cy="67" rx="27" ry="4" class="eq-shadow"/><path class="eq-fill" fill="url(#tw-${i})" d="M22 13h30l7 10-6 40H21l-6-40 7-10Z"/><path d="M20 23h34M21.5 33h31M23 43h28M25 53h24M17 63h42"/><path d="M28 13V7h18v6M32 7V3h10v4"/><path d="M28 24l18 28M46 24 28 52" opacity=".5"/><path d="M22 64v5M52 64v5"/></g>`;

  const pumpMarkup=(i)=>`
    <defs>
      <radialGradient id="pu-${i}" cx="35%" cy="28%" r="75%"><stop offset="0" stop-color="#fff" stop-opacity=".78"/><stop offset=".35" stop-color="currentColor" stop-opacity=".24"/><stop offset="1" stop-color="currentColor" stop-opacity=".58"/></radialGradient>
      <filter id="pu-sh-${i}"><feDropShadow dx="0" dy="5" stdDeviation="4" flood-color="#2878ac" flood-opacity=".18"/></filter>
    </defs><g class="eq-real" filter="url(#pu-sh-${i})"><ellipse cx="37" cy="64" rx="27" ry="4" class="eq-shadow"/><circle class="eq-fill" fill="url(#pu-${i})" cx="34" cy="35" r="18"/><circle cx="34" cy="35" r="7"/><path d="M34 17c8 3 13 9 15 18M16 35H8v12h12M52 29h14v12H52M27 53v8h20v-8"/><path d="M25 28 43 42M43 28 25 42" opacity=".55"/><rect x="46" y="19" width="18" height="12" rx="2" class="eq-motor"/><path d="M49 21v8M54 21v8M59 21v8"/></g>`;

  function addPlantDecorations(root){
    root.querySelectorAll('.plant-eff .ca-card-title,.chillers .ca-card-title,.plant-mid .ca-card-title').forEach(title=>{
      if(title.querySelector('.v3-title-icon'))return;
      const t=title.textContent.trim();
      let icon='▦';
      if(t.includes('整體機房'))icon='▥';
      else if(t.includes('主機運轉'))icon='▤';
      else if(t.includes('系統流程'))icon='⌘';
      else if(t.includes('24 小時'))icon='↗';
      title.insertAdjacentHTML('afterbegin',`<span class="v3-title-icon">${icon}</span>`);
    });

    const metrics=root.querySelectorAll('.plant-eff .plant-metrics>div');
    ['❄','❄','♨','♨','∿'].forEach((ico,i)=>{
      const box=metrics[i]; if(!box || box.querySelector('.v3-metric-icon'))return;
      box.insertAdjacentHTML('afterbegin',`<span class="v3-metric-icon">${ico}</span>`);
    });

    const badge=root.querySelector('.chillers .ai-badge');
    if(badge && !badge.querySelector('.v3-ai-chip')) badge.innerHTML=`<span class="v3-ai-chip">AI</span>${badge.textContent.replace(/^AI\s*/,'')}`;

    const trend=root.querySelector('.plant-mid .trend-svg');
    if(trend && !trend.dataset.v3axes){
      trend.dataset.v3axes='1';
      trend.setAttribute('viewBox','0 0 560 210');
      trend.insertAdjacentHTML('beforeend',`
        <g class="v3-axis-labels">
          <text x="7" y="29">1.2</text><text x="7" y="59">1.0</text><text x="7" y="89">0.8</text><text x="7" y="119">0.6</text><text x="7" y="149">0.4</text><text x="7" y="179">0.2</text>
          <text x="30" y="204">00:00</text><text x="118" y="204">04:00</text><text x="206" y="204">08:00</text><text x="294" y="204">12:00</text><text x="382" y="204">16:00</text><text x="470" y="204">20:00</text><text x="525" y="204">24:00</text>
        </g>`);
    }
  }

  function enhanceVisuals(){
    const root=document.getElementById('pageRoot'); if(!root)return;
    const page=root.querySelector('.ca-page');
    document.body.classList.toggle('product-plant',!!page && !page.classList.contains('analyst'));
    document.body.classList.toggle('product-analyst',!!page && page.classList.contains('analyst'));

    root.querySelectorAll('svg.ca-machine').forEach((svg,i)=>{
      if(svg.dataset.v3enhanced)return;
      svg.dataset.v3enhanced='1';
      svg.setAttribute('viewBox','0 0 220 105');
      svg.setAttribute('preserveAspectRatio','xMidYMid meet');
      svg.innerHTML=chillerMarkup(i);
    });

    root.querySelectorAll('.flow-wrap svg.ca-flow-icon').forEach((svg,i)=>{
      if(svg.dataset.v3enhanced)return;
      svg.dataset.v3enhanced='1';
      svg.setAttribute('viewBox','0 0 74 72');
      svg.innerHTML=i===0?towerMarkup(i):pumpMarkup(i);
    });

    root.querySelectorAll('.flow-wrap>div').forEach((node,i)=>{
      const labels=['CT 冷卻水塔','CWP 冷卻水泵','CH 冰水主機','CHWP-1 一次泵','CHWP-2 二次泵'];
      const b=node.querySelector('b'); if(b && labels[i])b.textContent=labels[i];
    });

    root.querySelectorAll('.donut-center').forEach(center=>center.dataset.centered='1');

    const title=root.querySelector('.ca-hero h1');
    if(title){
      const p=title.parentElement.querySelector('p');
      if(p && title.textContent.includes('冰水機房'))p.innerHTML='Chiller Plant Smart Cockpit｜即時監測主機、泵浦、水側效率與 AI 最佳化建議';
      if(p && title.textContent.includes('AI 能源分析師'))p.innerHTML='AI Energy Analyst｜從 Data 到 Insight，從 Insight 到 Action';
    }

    if(document.body.classList.contains('product-plant')) addPlantDecorations(root);
  }

  const observer=new MutationObserver(()=>requestAnimationFrame(enhanceVisuals));
  observer.observe(document.documentElement,{subtree:true,childList:true});
  window.addEventListener('load',enhanceVisuals);
  document.addEventListener('click',()=>setTimeout(enhanceVisuals,0));
  enhanceVisuals();
})();
