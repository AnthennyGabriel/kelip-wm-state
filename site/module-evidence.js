/* Evidence view: preserve provenance and surface matching note paragraphs.
   Retrieved author notes are secondary material, never presented as verified paper text. */
(function(){
const q=new URLSearchParams(location.search),id=q.get('id')||'encoder',M=WM_LESSONS.modules,K=WM_KNOWLEDGE,m=M[id],E=s=>String(s??'').replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));if(!m)return;
const names={worldmodels:'World-Models',planet:'PlaNet',dreamer1:'Dreamer-v1',dreamer2:'Dreamer-v2',dreamer3:'Dreamer-v3',daydreamer:'DayDreamer',lecun:'LeCun-2022-立场文',vjepa:'V-JEPA',dinowm:'DINO-WM',vjepa2:'V-JEPA-2',lewm:'LeWorldModel',unipi:'UniPi',genie:'Genie',cosmos1:'Cosmos-1',predict25:'Cosmos-Predict2.5',cosmospolicy:'Cosmos-Policy',cosmos3:'Cosmos-3',gr1:'GR-1',vpp:'VPP',uwm:'UWM',dreamzero:'DreamZero',lingbot:'LingBot-VA'};
const terms={observation:['观测','像素','proprio','输入'],encoder:['encoder','编码器','冻结'],vae:['vae','重建','elbo'],latent:['latent','潜变量','离散'],memory:['记忆','缓存','memory','kv'],predictor:['predictor','预测器','dynamics'],decoder:['decoder','解码'],action:['动作','action'],policy:['policy','actor','策略'],reward:['reward','奖励'],value:['critic','value','价值'],rssm:['rssm','确定性','随机状态'],imagination:['想象','imagination'],feedback:['闭环','反馈','执行'],data:['数据','dataset','采样'],mask:['mask','掩码','遮'],target:['target','teacher','目标编码'],ema:['ema','坍缩','塌缩','stop-gradient'],freeze:['冻结','freeze','stop-gradient'],teacher:['teacher forcing','真实历史'],rollout:['rollout','递归','多步'],loss:['损失','loss','梯度'],goal:['目标图像','goal','能量'],cem:['cem','候选','cross-entropy'],diffusion:['扩散','diffusion','去噪'],tokenizer:['tokenizer','压缩','vq'],idm:['idm','逆动力学'],latentaction:['latent action','隐动作','lam'],joint:['联合','joint','耦合'],injection:['注入','槽位','injection'],attention:['attention','注意力'],causal:['因果','causal','mask'],chunk:['chunk','动作块','分块'],latency:['延迟','latency','实时','ms'],evaluation:['评测','benchmark','成功率'],ablation:['消融','ablation'],generalization:['泛化','zero-shot','分布外'],boundary:['边界','终止','episode'],mpc:['mpc','规划','cem'],diffusionpolicy:['diffusion policy','去噪','动作头'],mdnrnn:['mdn','混合高斯','rnn'],reparam:['重参数','reparameter','高斯'],kl:['kl','free nats','balancing'],posterior:['后验','posterior','推断'],prior:['先验','prior','转移'],mixture:['混合','mixture','温度'],replay:['replay','回放','buffer'],noise:['噪声','noise','加噪'],denoiser:['去噪','denois'],horizon:['horizon','时域','前缀'],textencoder:['文本','text encoder','t5'],crossattn:['cross-attention','交叉注意力'],ffn:['ffn','mlp','前馈'],patch:['patch','tubelet','图像块'],vq:['vq','量化','码本'],flowmatching:['flow matching','流匹配','速度场'],actiondecoder:['动作头','action decoder','动作解码'],hierarchy:['分层','高层','子任务'],semvae:['semvae','语义对齐'],moe:['moe','专家'],mcp:['mcp','multi-chunk']};
const reach=(root,target,seen=new Set())=>{if(root===target)return true;if(seen.has(root))return false;seen.add(root);return K.children(root).some(k=>reach(k,target,seen));};
const d=window.WM_SCHOLAR[id],figs=window.WM_SCHOLAR_FIGURES;
const article=document.createElement('section');article.id='literature';article.className='scholar';
article.innerHTML='<div class="section-number">LITERATURE / 文献与机制</div><h2>把概念放回具体论文</h2><p class="evidence-status">'+(d?'本页含专门撰写的机制讲解、基础文献与逐图说明。':'本页先提供原有概念说明与对应工作的文献摘录；专门的推导和逐图解读尚待补充。')+' 配套笔记为二手阅读材料，研究结论请回到原文核对。</p>';
if(d){
 article.innerHTML+='<div class="scholar-reading">'+d.sections.map(([title,text])=>'<section class="scholar-prose"><h3>'+E(title)+'</h3><p>'+E(text).replace(/\[(\d+)\]/g,(_,n)=>'<a class="cite" href="#reference-'+n+'">['+n+']</a>')+'</p></section>').join('')+'</div><pre class="scholar-equation">'+E(d.formula)+'</pre><h3>基础文献与定位</h3><ol class="references">'+d.refs.map(([title,url,where],i)=>'<li id="reference-'+(i+1)+'"><a href="'+E(url)+'" target="_blank" rel="noopener">'+E(title)+' ↗</a><span>'+E(where)+'</span></li>').join('')+'</ol>';
 article.innerHTML+='<div class="figure-readings">'+d.figures.map((key,i)=>{const f=figs[key];return '<figure class="evidence-figure" data-figure="'+key+'"><a href="'+E(f.src)+'" target="_blank" rel="noopener" title="打开大图"><img src="'+E(f.src)+'" alt="'+E(f.title)+'" loading="lazy"></a><figcaption><b>'+E(f.title)+'</b><span>'+E(f.kind)+' · <a href="'+E(f.source)+'" target="_blank" rel="noopener">论文入口 ↗</a> · 点击图片放大</span></figcaption><div class="figure-controls">'+f.steps.map(([t],j)=>'<button type="button" data-step="'+j+'" aria-pressed="'+(j===0)+'">'+(j+1)+' · '+E(t)+'</button>').join('')+'</div><p class="figure-explanation">'+E(f.steps[0][1])+'</p></figure>';}).join('')+'</div>';
 article.innerHTML+='<h3>用问题检查理解</h3>'+d.questions.map(([a,b])=>'<details><summary>'+E(a)+'</summary><p>'+E(b)+'</p></details>').join('');
}
document.querySelector('#principle').before(article);
article.addEventListener('click',e=>{const b=e.target.closest('button[data-step]');if(!b)return;const f=b.closest('[data-figure]'),spec=figs[f.dataset.figure];f.querySelector('.figure-explanation').textContent=spec.steps[+b.dataset.step][1];f.querySelectorAll('[data-step]').forEach(x=>x.setAttribute('aria-pressed',String(x===b)));});
const tab=document.createElement('a');tab.href='#literature';tab.textContent='文献与图解';document.querySelector('.tabs').prepend(tab);
const trail=(q.get('trail')||'').split(','),active=K.papers.find(p=>p.id===id)||K.papers.find(p=>trail.includes(p.id));
let papers=K.papers.filter(p=>reach(p.id,id));
if(['observation','encoder','posterior','prior','latent','vae'].includes(id))papers=K.papers.filter(p=>papers.includes(p)||['worldmodels','planet','vjepa2','genie','dreamzero'].includes(p.id));
if(!papers.length&&active)papers=[active];
const c=(+q.get('c')||1)-1,p=(+q.get('p')||1)-1;
papers.sort((a,b)=>Number(b.id===active?.id||b.group===c&&b.page===p+1)-Number(a.id===active?.id||a.group===c&&a.page===p+1));
const context=document.createElement('section');context.id='paper-evidence';context.innerHTML='<div class="section-number">CROSS-PAPER / 跨论文对照</div><h2>这个小点在不同工作中怎样实现</h2><p>选择工作，阅读与本模块关键词对应的笔记段落。原文、二手笔记和本站图解分别标注；不把同名模块的实现视为相同。</p><label class="paper-select">对照工作 <select id="evidencePaper" aria-label="选择文献对照工作">'+papers.map(p=>'<option value="'+p.id+'">'+E(p.title)+'</option>').join('')+'</select></label><div id="paperEvidenceBody"></div>';
article.after(context);
function showPaper(key){
 const paper=papers.find(p=>p.id===key),body=document.querySelector('#paperEvidenceBody');if(!paper){body.innerHTML='<p>尚未建立对应工作的模块证据条目。</p>';return;}
 const note=WM_DATA[paper.group].notes.find(n=>n.title===names[paper.id]),params=new URLSearchParams(q);params.set('id',paper.id);params.set('trail','');
 const deck='index.html?v=20261026-scholar&mode=full#'+(paper.group+1)+'/'+paper.page;
 let html='<div class="evidence-paper-head"><h3>'+E(paper.title)+'</h3><a href="'+E(deck)+'">回到这篇工作的架构页 ↗</a></div>';
 if(!note){body.innerHTML=html+'<p>当前来源未附这项工作的独立笔记。请先核对原始展示及对应原文；此处不以其他版本的论文替代证据。</p>';return;}
 const original=note.body.match(/论文：\[([^\]]+)\]\((https:\/\/[^)]+)\)/);
 if(original)html+='<p><a href="'+E(original[2])+'" target="_blank" rel="noopener">'+E(original[1])+' · 对应论文原文 ↗</a></p>';
 const words=terms[id]||[m.title.split(' · ')[0]],blocks=[];let heading='概述';
 for(const line of note.body.split(/\r?\n/)){
  if(/^##? /.test(line)){heading=line.replace(/^#+ /,'');continue;}
  if(!line.trim()||line.startsWith('>')||/^[-| ]*$/.test(line))continue;
  const count=words.reduce((sum,w)=>sum+Number(line.toLowerCase().includes(w.toLowerCase())),0);
  if(count>0)blocks.push({line,heading,count,order:blocks.length});
 }
 const selected=blocks.sort((a,b)=>b.count-a.count||a.order-b.order).slice(0,8).sort((a,b)=>a.order-b.order);
 html+='<p class="evidence-status">资料层级：原作者调研笔记摘录。筛选词：'+E(words.join('、'))+'。保留笔记原有措辞和不确定性标记；不自动认定摘录中的图号和实验数字已复核。</p>';
 html+=selected.length?selected.map((b,i)=>'<details class="paper-excerpt" '+(i===0?'open':'')+'><summary>'+E(b.heading)+' · 相关段落 '+(i+1)+'</summary><div class="note">'+E(b.line)+'</div></details>').join(''):'<p>未找到直接对应的笔记段落；此模块的具体实现与基础来源仍需专项核查。</p>';
 const notePath='chapters/'+(paper.group+1)+'/notes/'+encodeURIComponent(note.title+'-调研笔记.md');
 html+='<p><a href="'+notePath+'" target="_blank" rel="noopener">查看完整来源笔记 ↗</a></p>';body.innerHTML=html;
}
document.querySelector('#evidencePaper').onchange=e=>showPaper(e.target.value);showPaper(papers[0]?.id);
// Replace the indiscriminate chapter-wide notebook dump with the source for the
// selected paper; the original slide remains available for returning to a talk.
document.querySelector('#sourceNotes').innerHTML='<p>模块相关段落已移至上方“跨论文对照”，可逐项追溯对应论文与完整笔记。</p><a href="#paper-evidence">查看本模块的文献证据 ↑</a>';
})();
