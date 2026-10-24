/* === Deep module lessons: meaningful interactive examples, exact return route === */
(function(){
const q=new URLSearchParams(location.search),API=window.WM_LESSONS,id=q.get('id')||'encoder',m=API.modules[id],$=s=>document.querySelector(s),esc=s=>String(s??'').replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
if(!m){document.querySelector('main').textContent='没有找到这个模块。请返回目录选择。';return;}
const c=Math.max(0,Math.min(3,(+q.get('c')||1)-1)),p=Math.max(0,Math.min(WM_DATA[c].slides.length-1,(+q.get('p')||1)-1)),s=WM_DATA[c].slides[p];
let back=q.get('back')||`index.html#${c+1}/${p+1}`;if(!/^index\.html(?:\?[^#]*)?(?:#[1-4]\/\d+)?$/.test(back))back=`index.html#${c+1}/${p+1}`;
$('#returnLink').href=back;$('#bottomReturn').href=back;document.title=m.title+' · 深入讲解';$('#moduleKicker').textContent='MODULE / '+id.toUpperCase();$('#moduleTitle').textContent=m.title;$('#moduleLead').textContent=m.short;$('#plain').textContent=m.plain;$('#inputLabel').textContent=m.input;$('#centerLabel').textContent=m.title;$('#outputLabel').textContent=m.output;$('#formula').textContent=m.formula;$('#train').textContent=m.train;$('#infer').textContent=m.infer;$('#caution').textContent=m.caution;
const steps=id==='teacher'?['给出真实历史与动作。','预测下一时刻的表示，和真实目标比较。','各训练位置可并行求损失，再更新可训练参数。']:id==='rollout'?['从真实起始状态开始。','预测下一步，再把预测值写回模型输入。','继续向前展开，并检查误差是否随时域累积。']:id==='freeze'?['加载预训练编码器并关闭其参数更新。','用编码器对训练观测与目标观测提取特征。','计算预测误差，梯度只更新允许训练的预测器。']:['对齐本页所需输入、监督及时间索引。','按模型定义计算预测，并构造对应损失。','检查哪些参数更新、哪些目标分支停止梯度。'];
$('#trainSteps').innerHTML=steps.map(t=>'<li>'+esc(t)+'</li>').join('');$('#inferSteps').innerHTML=['接入当前可获得的信息；不能使用未来真值。','按当前模块的接口完成前向计算或动作搜索。','需要时执行动作，并接收新的真实反馈。'].map(t=>'<li>'+t+'</li>').join('');
$('#sourceTitle').textContent=`第 ${c+1} 章 · 第 ${p+1} 页：${s.title}`;$('#sourceCaption').textContent=s.caption||s.headline;$('#sourceText').textContent=s.text;
const notes=WM_DATA[c].notes;$('#sourceNotes').innerHTML=notes.map(n=>'<details><summary>'+esc(n.title)+'</summary><div class="note">'+esc(n.body)+'</div></details>').join('');
$('#related').innerHTML=m.related.filter(x=>API.modules[x]).map(x=>{const r=API.modules[x],params=new URLSearchParams({id:x,c:String(c+1),p:String(p+1),back});return '<a href="module.html?'+esc(params.toString())+'"><strong>'+esc(r.title)+' ↗</strong><span>'+esc(r.short)+'</span></a>';}).join('');
const lab=$('#lab');
if(['teacher','rollout','loss','predictor','imagination','feedback','rssm','memory','boundary','causal'].includes(id)){
lab.innerHTML='<div class="lab-tag">可操作的教学实验 / 非论文结果</div><h3>为什么递归预测更容易积累误差？</h3><p>示意系统每步真实值增加 1。让同一个预测器额外偏高一点，对比“每次给真实历史”和“接着自己的结果预测”。</p><label>每步预测偏差 <input id="bias" type="range" min="0" max="0.5" step="0.05" value="0.1"><output id="biasOut"></output></label><table><thead><tr><th>步数</th><th>真实状态</th><th>真实历史预测</th><th>递归预测</th></tr></thead><tbody id="rows"></tbody></table>';
const update=()=>{const b=+$('#bias').value;$('#biasOut').textContent=b.toFixed(2);$('#rows').innerHTML=Array.from({length:5},(_,i)=>{const t=i+1;return '<tr><td>'+t+'</td><td>'+t.toFixed(2)+'</td><td>'+(t+b).toFixed(2)+'</td><td class="lab-error">'+(t*(1+b)).toFixed(2)+'</td></tr>';}).join('');};$('#bias').oninput=update;update();
}else if(['cem','goal','value','reward','evaluation','ablation'].includes(id)){
lab.innerHTML='<div class="lab-tag">可操作的教学实验 / 非真实机器人能量地形</div><h3>候选动作与目标代价</h3><p>点击网格选择不同动作，比较它与示意目标的距离。真实模型的能量地形可能多峰、不平滑，不保证像这个例子一样简单。</p><div class="gridlab" id="candidateGrid"></div><p id="costText"></p>';
$('#candidateGrid').innerHTML=Array.from({length:49},(_,i)=>{const x=i%7-3,y=Math.floor(i/7)-3,cost=(x-1)**2+(y+1)**2;return '<button data-i="'+i+'" aria-label="候选动作 '+x+','+y+'" style="background:rgba(0,113,227,'+(.08+.75*(1-cost/32))+')">'+(cost===0?'◎':'')+'</button>';}).join('');$('#candidateGrid').onclick=e=>{const b=e.target.closest('button');if(!b)return;const i=+b.dataset.i,x=i%7-3,y=Math.floor(i/7)-3;$('#costText').textContent='选择动作 ('+x+', '+y+')；示意代价 = '+((x-1)**2+(y+1)**2)+'。目标在 (1, −1)。';};
}else{
lab.innerHTML='<div class="lab-tag">可操作的教学实验 / 概念示意</div><h3>沿着接口一步一步看</h3><p>点击阶段，分清这个模块拿到什么、做什么、产出什么。</p><div id="stageButtons"><button data-phase="0">1 输入</button> <button data-phase="1">2 模块计算</button> <button data-phase="2">3 输出</button></div><p id="stageExplanation"></p><div class="pixels" id="tokens" aria-hidden="true"></div>';
const update=k=>{const text=[m.input,m.train,m.output][k];$('#stageExplanation').textContent=text;$('#tokens').innerHTML=Array.from({length:[24,12,8][k]},(_,i)=>'<span style="animation-delay:'+(i*.025)+'s;opacity:'+(.35+.65*(i%4)/3)+'"></span>').join('');document.querySelectorAll('#stageButtons button').forEach((b,i)=>b.classList.toggle('active',i===k));};$('#stageButtons').onclick=e=>{if(e.target.dataset.phase!==undefined)update(+e.target.dataset.phase);};update(0);
}
})();

