(function(){
  const chillerMarkup=`
    <defs>
      <linearGradient id="cgBody" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="currentColor" stop-opacity=".10"/><stop offset="1" stop-color="currentColor" stop-opacity=".28"/></linearGradient>
      <linearGradient id="cgTop" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="currentColor" stop-opacity=".34"/><stop offset="1" stop-color="currentColor" stop-opacity=".12"/></linearGradient>
    </defs>
    <rect x="18" y="35" width="110" height="30" rx="14" fill="url(#cgBody)"/>
    <ellipse cx="38" cy="50" rx="13" ry="13" fill="none"/>
    <ellipse cx="105" cy="50" rx="13" ry="13" fill="none"/>
    <circle cx="38" cy="50" r="5" fill="none"/>
    <circle cx="105" cy="50" r="5" fill="none"/>
    <rect x="38" y="24" width="58" height="14" rx="4" fill="url(#cgTop)"/>
    <rect x="47" y="16" width="16" height="10" rx="2" fill="none"/>
    <rect x="69" y="14" width="18" height="12" rx="2" fill="none"/>
    <path d="M128 41h14v18h-14M10 41h9v18h-9M28 66v7M116 66v7M24 73h97M56 35v30M78 35v30"/>
    <path d="M91 18h18l8 9v9H96" fill="none"/>
    <path d="M22 31h18M122 31h9"/>
  `;
  const towerMarkup=`
    <path d="M24 10h28l5 9-5 43H24l-5-43 5-9Z"/>
    <path d="M22 19h32M23 28h30M24 38h28M25 48h26M27 58h22M18 62h40"/>
    <path d="M28 10V4h20v6M32 4V1h12v3"/>
  `;
  const pumpMarkup=`
    <circle cx="34" cy="36" r="17"/>
    <circle cx="34" cy="36" r="7"/>
    <path d="M34 19c7 3 11 8 13 16M17 36h-8v11h11M51 31h13v10H51M28 54v8h19v-8"/>
    <path d="M25 29 43 43M43 29 25 43"/>
  `;
  function enhanceVisuals(){
    const root=document.getElementById('pageRoot'); if(!root)return;
    const page=root.querySelector('.ca-page');
    document.body.classList.toggle('product-plant',!!page && !page.classList.contains('analyst'));
    document.body.classList.toggle('product-analyst',!!page && page.classList.contains('analyst'));

    root.querySelectorAll('svg.ca-machine').forEach(svg=>{
      if(svg.dataset.enhanced)return;
      svg.dataset.enhanced='1'; svg.setAttribute('viewBox','0 0 150 82'); svg.innerHTML=chillerMarkup;
    });
    root.querySelectorAll('.flow-wrap svg.ca-flow-icon').forEach((svg,i)=>{
      if(svg.dataset.enhanced)return;
      svg.dataset.enhanced='1'; svg.setAttribute('viewBox','0 0 74 72'); svg.innerHTML=i===0?towerMarkup:pumpMarkup;
    });
    root.querySelectorAll('.flow-wrap>div').forEach((node,i)=>{
      const labels=['CT 冷卻水塔','CWP 冷卻水泵','CH 冰水主機','CHWP-1 一次泵','CHWP-2 二次泵'];
      const b=node.querySelector('b'); if(b && labels[i])b.textContent=labels[i];
    });
    const title=root.querySelector('.ca-hero h1');
    if(title && !title.dataset.calibrated){
      title.dataset.calibrated='1';
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
