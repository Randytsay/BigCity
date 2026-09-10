/* Homepage wording correction requested from annotated review */
function applyHomepageUiFixes(){
  if(typeof state!=='undefined' && state.page==='home'){
    const h1=document.querySelector('.page-hero h1');
    if(h1) h1.textContent='AI 智慧能源管理系統';
  }
  document.title='遠東巨城 × 台達能源｜AI 智慧能源管理系統';
}
const uiFixRenderBase=render;
render=function(){
  uiFixRenderBase();
  applyHomepageUiFixes();
};
applyHomepageUiFixes();
