(function(){
  const chillerMarkup=`
    <g class="ch-real">
      <path class="ch-shadow" d="M21 89h178c10 0 15 3 15 6H10c0-3 4-6 11-6Z"/>
      <rect class="ch-base" x="23" y="79" width="174" height="8" rx="2"/>
      <path class="ch-foot" d="M35 87v8h21v-8M163 87v8h21v-8"/>
      <g class="ch-vessel ch-vessel-low">
        <rect x="25" y="49" width="154" height="30" rx="15"/>
        <ellipse cx="35" cy="64" rx="15" ry="15"/>
        <ellipse cx="169" cy="64" rx="15" ry="15"/>
        <circle cx="35" cy="64" r="7"/>
        <circle cx="169" cy="64" r="7"/>
        <path d="M56 50v28M86 50v28M116 50v28M146 50v28"/>
      </g>
      <g class="ch-vessel ch-vessel-high">
        <rect x="39" y="28" width="132" height="24" rx="12"/>
        <ellipse cx="48" cy="40" rx="12" ry="12"/>
        <ellipse cx="163" cy="40" rx="12" ry="12"/>
        <path d="M67 29v22M94 29v22M121 29v22M148 29v22"/>
      </g>
      <g class="ch-compressor">
        <path d="M74 27V16h44l12 11Z"/>
        <rect x="84" y="10" width="27" height="9" rx="2"/>
        <path d="M111 14h18l12 10v8h-23"/>
        <circle cx="101" cy="20" r="5"/>
      </g>
      <g class="ch-motor">
        <rect x="133" y="16" width="42" height="18" rx="8"/>
        <path d="M140 18v14M147 18v14M154 18v14M161 18v14M168 18v14"/>
        <circle cx="175" cy="25" r="5"/>
      </g>
      <g class="ch-panel">
        <rect x="181" y="34" width="26" height="37" rx="3"/>
        <rect x="185" y="39" width="18" height="12" rx="1.5"/>
        <circle cx="188" cy="58" r="1.8"/><circle cx="195" cy="58" r="1.8"/><circle cx="202" cy="58" r="1.8"/>
        <path d="M186 64h17M186 68h17"/>
      </g>
      <g class="ch-pipes">
        <path d="M58 28V13h18M151 48V39h18M57 79v7M151 79v7"/>
        <rect x="53" y="9" width="10" height="8" rx="2"/>
        <rect x="165" y="35" width="10" height="8" rx="2"/>
      </g>
      <g class="ch-bolts">
        <circle cx="35" cy="54" r="1.4"/><circle cx="35" cy="74" r="1.4"/><circle cx="169" cy="54" r="1.4"/><circle cx="169" cy="74" r="1.4"/>
      </g>
    </g>`;

  const towerMarkup=`
    <g class="eq-real">
      <path class="eq-fill" d="M23 12h30l6 9-6 42H23l-6-42 6-9Z"/>
      <path d="M22 21h32M23 31h30M24 42h28M25 53h26M18 63h40"/>
      <path d="M29 12V6h18v6M33 6V2h10v4"/>
      <path d="M30 23l18 28M48 23 30 51" opacity=".55"/>
    </g>`;
  const pumpMarkup=`
    <g class="eq-real">
      <circle class="eq-fill" cx="34" cy="36" r="18"/>
      <circle cx="34" cy="36" r="7"/>
      <path d="M34 18c8 3 13 9 15 18M16 36H8v12h12M52 30h14v12H52M27 54v8h20v-8"/>
      <path d="M25 29 43 43M43 29 25 43" opacity=".6"/>
    </g>`;

  function enhanceVisuals(){
    const root=document.getElementById('pageRoot'); if(!root)return;
    const page=root.querySelector('.ca-page');
    document.body.classList.toggle('product-plant',!!page && !page.classList.contains('analyst'));
    document.body.classList.toggle('product-analyst',!!page && page.classList.contains('analyst'));

    root.querySelectorAll('svg.ca-machine').forEach(svg=>{
      if(svg.dataset.v2enhanced)return;
      svg.dataset.v2enhanced='1';
      svg.setAttribute('viewBox','0 0 220 105');
      svg.setAttribute('preserveAspectRatio','xMidYMid meet');
      svg.innerHTML=chillerMarkup;
    });

    root.querySelectorAll('.flow-wrap svg.ca-flow-icon').forEach((svg,i)=>{
      if(svg.dataset.v2enhanced)return;
      svg.dataset.v2enhanced='1';
      svg.setAttribute('viewBox','0 0 74 72');
      svg.innerHTML=i===0?towerMarkup:pumpMarkup;
    });

    root.querySelectorAll('.flow-wrap>div').forEach((node,i)=>{
      const labels=['CT 冷卻水塔','CWP 冷卻水泵','CH 冰水主機','CHWP-1 一次泵','CHWP-2 二次泵'];
      const b=node.querySelector('b'); if(b && labels[i])b.textContent=labels[i];
    });

    root.querySelectorAll('.donut-center').forEach(center=>{
      center.dataset.centered='1';
    });

    const title=root.querySelector('.ca-hero h1');
    if(title){
      const p=title.parentElement.querySelector('p');
      if(p && title.textContent.includes('冰水機房'))p.innerHTML='Chiller Plant Smart Cockpit｜即時監測主機、泵浦、水側效率與 AI 最佳化建議';
      if(p && title.textContent.includes('AI 能源分析師'))p.innerHTML='AI Energy Analyst｜從 Data 到 Insight，從 Insight 到 Action';
    }
  }

  const observer=new MutationObserver(()=>requestAnimationFrame(enhanceVisuals));
  observer.observe(document.documentElement,{subtree:true,childList:true});
  window.addEventListener('load',enhanceVisuals);
  document.addEventListener('click',()=>setTimeout(enhanceVisuals,0));
  enhanceVisuals();
})();
