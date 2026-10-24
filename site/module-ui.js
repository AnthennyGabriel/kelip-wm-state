/* === Host coordinator: popup → dedicated lesson → exact return position === */
(function(){
const L=window.WM_LESSONS;D.forEach(c=>c.slides.forEach(s=>s.animated=true));
const dialog=document.createElement('dialog');dialog.id='modulePopup';dialog.className='module-popup';dialog.setAttribute('aria-labelledby','popupTitle');document.body.appendChild(dialog);
let previousFocus=null,lastState={phase:0,total:0,playing:true,reference:false},popupData=null;
const controls=document.querySelector('.toolbar');
const autoplay=document.createElement('button');autoplay.id='autoplayBtn';autoplay.className='live-control';autoplay.textContent='▶ 播放';autoplay.title='播放或暂停本页分步动画（P）';
const replay=document.createElement('button');replay.id='replayBtn';replay.textContent='↻ 重播';
const ref=document.createElement('button');ref.id='referenceBtn';ref.textContent='隐藏标注';
const count=document.createElement('span');count.id='liveCount';count.className='live-count';
controls.insertBefore(autoplay,$('#stepBack'));controls.insertBefore(count,$('#stepBack'));controls.insertBefore(replay,$('#detailBtn'));controls.insertBefore(ref,$('#detailBtn'));
$('#stepBack').textContent='‹ 上一步';$('#stepNext').textContent='下一步 ›';
$('#deck').title='原始论文图 · 交互讲解';
document.querySelector('.bottom .hint').textContent='J / K 分步　P 播放　R 重播　点击模块讲解　← → 翻页';
const bar=document.createElement('div');bar.className='teaching-bar';bar.innerHTML='<span class="teaching-kind">原图导览</span><strong id="teachingLabel"></strong><span id="teachingNote"></span><a id="paperLibrary" href="library.html">本论文的模块目录 ↗</a>';document.querySelector('#framewrap').after(bar);
const live=()=>$('#deck').contentWindow?.wmLive;
const mobileModules=document.createElement('section');mobileModules.id='mobileModules';bar.after(mobileModules);let mobileKey='';
function mobileIndex(d){const key=d.c+'/'+d.p;if(key===mobileKey)return;mobileKey=key;const rows=live()?.inspect()||[];mobileModules.innerHTML=rows.length?'<small>本页模块 · 点击查看讲解</small><div>'+rows.map((r,i)=>'<button data-region="'+i+'">'+esc(r.label)+' <span>＋</span></button>').join('')+'</div>':'<p>使用上方播放与分步按钮，沿原页逐步讲解。</p>';}
mobileModules.onclick=e=>{const b=e.target.closest('[data-region]');if(b)live()?.openModule(+b.dataset.region);};
function currentBack(){return 'index.html?'+new URLSearchParams({v:'20261024-nav6',mode,phase:String(live()?.state().phase||0),playing:'0'})+'#'+(current.c+1)+'/'+(current.p+1);}
document.querySelector('#appHeader a[href^="library"]').onclick=function(){this.href='library.html?'+new URLSearchParams({v:'20261024-nav6',back:currentBack()});live()?.pause();};
autoplay.onclick=()=>live()?.toggle();replay.onclick=()=>live()?.replay();ref.onclick=()=>live()?.reference();
function close(){if(dialog.open)dialog.close();previousFocus?.focus();}
function showModule(d){const m=L.modules[d.id];if(!m)return;live()?.pause();popupData=d;previousFocus=document.activeElement;
 const s=D[d.c].slides[d.p];
 const back=new URLSearchParams({v:'20261024-nav6',mode,phase:String(d.phase),playing:'0'});const returnPath='index.html?'+back.toString()+'#'+(d.c+1)+'/'+(d.p+1);
 const target='module.html?'+new URLSearchParams({v:'20261024-nav6',id:d.id,c:String(d.c+1),p:String(d.p+1),back:returnPath});
 dialog.innerHTML=`<div class="popup-head"><div><small>模块讲解 · ${d.c+1}/${d.p+1}</small><h2 id="popupTitle">${esc(m.title)}</h2></div><button id="popupClose" aria-label="关闭模块讲解">×</button></div><div class="popup-body"><p>${esc(d.note||m.short)}</p><p class="plain">${esc(m.plain)}</p><dl><dt>输入</dt><dd>${esc(m.input)}</dd><dt>输出</dt><dd>${esc(m.output)}</dd></dl><p class="popup-source">当前页：${esc(s.title)}<br>${esc(d.label&&d.label!==m.title?'所选原图内容：'+d.label:'点“深入讲解”查看原理、训练、推理与证据。')}</p></div><div class="popup-footer"><button id="popupContinue">留在本页</button><a class="primary" href="${esc(target)}" id="popupDeep">深入讲解这个模块 →</a></div>`;
 if(!dialog.open)dialog.showModal();$('#popupClose').onclick=close;$('#popupContinue').onclick=close;$('#popupDeep').onclick=()=>history.replaceState(null,'',returnPath);
}
dialog.addEventListener('click',e=>{if(e.target===dialog){const r=dialog.getBoundingClientRect();if(e.clientX<r.left||e.clientX>r.right||e.clientY<r.top||e.clientY>r.bottom)close();}});
window.wmHandleKey=key=>{if(dialog.open){if(key==='Escape')close();return true;}if(!document.body.classList.contains('presenting'))return false;if(key==='p'||key==='P'){live()?.toggle();return true;}if(key==='r'||key==='R'){live()?.replay();return true;}return false;};
window.wmHandleMessage=d=>{if(d?.type==='wm-slide')return true;if(d?.type==='wm-live-state'){if(d.c!==current.c||d.p!==current.p)return true;lastState=d;mobileIndex(d);autoplay.textContent=d.playing?'Ⅱ 暂停':'▶ 播放';autoplay.setAttribute('aria-pressed',String(d.playing));count.textContent=(d.phase+1)+' / '+d.total;document.querySelector('#teachingLabel').textContent=d.label;document.querySelector('#teachingNote').textContent=d.note;document.querySelector('.teaching-kind').textContent=d.kind||'原图导览';const paper=WM_KNOWLEDGE.papers.filter(x=>x.group===d.c&&x.page<=d.p+1&&!x.supplement).at(-1)||WM_KNOWLEDGE.papers.find(x=>x.group===d.c);document.querySelector('#paperLibrary').href='library.html?paper='+paper.id+'&back='+encodeURIComponent(currentBack());ref.textContent=d.reference?'显示交互标注':'隐藏标注';$('#stepBack').disabled=d.phase===0;$('#stepNext').disabled=d.phase===d.total-1;return true;}if(d?.type==='wm-module-open'){if(d.c===current.c&&d.p===current.p)showModule(d);return true;}return false;};
// Returning from the dedicated lesson restores the source page and animation step.
const q=new URLSearchParams(location.search);let restoreDone=false;
function restore(){if(restoreDone||!live())return;if(q.has('phase')){live().seek(+q.get('phase')||0);if(q.get('playing')!=='1')live().pause();}restoreDone=true;}
$('#deck').addEventListener('load',()=>setTimeout(restore,80));
if(q.get('mode')==='tour'&&/^#[1-4]\/\d+$/.test(location.hash)){const [c,p]=location.hash.slice(1).split('/').map(Number);start('tour',c-1,p-1);}
// The old app may already have loaded a frame before this enhancement script.
if(document.body.classList.contains('presenting')){const pos={...current};$('#deck').srcdoc='';load(pos);}
document.addEventListener('visibilitychange',()=>{if(document.hidden)live()?.pause();});
})();



