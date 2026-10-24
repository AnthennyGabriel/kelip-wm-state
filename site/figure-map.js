/* Original figure annotations. Coordinates are percentages of the actual image,
   NOT of its object-fit box. Equal stage numbers mean parallel branches. */
(function(){
const figures={};
function fig(name,rows,paths=[]){figures[name]={regions:rows.map(([id,label,x,y,w,h,step,note])=>({id,label,box:[x,y,w,h],step,note})),paths};}
fig('wm_world_model_schematic-1.png',[
 ['observation','环境观测',0,22,25,34,0,'从环境得到当前图像。'],['vae','V · VAE',36,22,34,34,1,'VAE 把图像编码为潜变量 z。'],['mdnrnn','M · MDN-RNN',36,66,34,23,2,'根据潜变量和动作更新记忆，并预测下一时刻潜变量的分布。'],['policy','C · Controller',85,55,11,29,3,'控制器同时读取 z 与 h；不是只接在 RNN 后面。'],['feedback','environment · 闭环',36,0,34,11,4,'执行动作改变环境，下一次观测重新进入 V。']
],[[1,'M25 39 L36 39'],[2,'M53 45 L53 66'],[3,'M53 45 L53 61 L85 61'],[3,'M70 78 L85 78'],[4,'M96 69 L99 69 L99 6 L70 6']]);
fig('planet_fig2_rssm.png',[
 ['memory','确定性 RNN',7,21,25,72,0,'左图仅以递归状态保存历史。'],['latent','随机状态 SSM',39,21,23,72,1,'中图引入随机状态，表达不同可能的未来。'],['action','RSSM 动作条件',71,1,12,15,2,'看右图：动作和旧状态一起决定下一时刻。'],['memory','确定性状态 h',71,25,19,15,3,'上层递归状态承载可持续的记忆。'],['rssm','随机状态 s',71,48,19,14,4,'下层随机状态与 h 结合；虚线表示观测推断路径。'],['decoder','观测与奖励读出',71,72,19,18,5,'从状态读出观测和奖励，用于模型训练。']]);
fig('dv1_imagination-1.png',[
 ['observation','真实观测 o₁',7,71,15,27,0],['encoder','视觉编码器',7,52,15,16,1],['imagination','想象状态',10,33,8,11,2],['policy','Actor：预测动作',20,1,9,23,3],['value','Critic：预测价值',0,0,10,24,3,'价值与动作从同一状态分支读出。'],['reward','奖励预测',10,0,10,24,3],['rollout','后续想象状态',45,33,43,12,4,'动作经动态模型推动下一个状态，不需要真实未来图像。']]);
fig('dd_wmtrain-1.png',[
 ['observation','图像与本体状态',0,74,15,25,0],['encoder','多模态编码器 enc',0,55,15,14,1],['posterior','观测后验 z₁',10,37,10,13,2],['memory','确定性历史 h₁',10,18,10,14,2],['decoder','解码重建 dec',16,55,15,14,3],['action','真实轨迹动作 a₁',21,0,14,13,4],['rssm','下一时刻状态',44,18,11,32,5]]);
fig('dd_pitrain-1.png',[
 ['encoder','用真实观测初始化',3,56,19,37,0],['rssm','当前潜在状态 h₁,z₁',5,19,13,31,1],['policy','Actor 动作 a₁',20,0,17,15,2],['value','价值 v₁',7,0,10,18,2],['imagination','模型内的下一状态',46,19,13,32,3],['reward','想象奖励',39,0,11,18,4],['rollout','继续展开',87,19,13,32,5]]);
fig('v2_vjepa2-ac-detail.png',[
 ['observation','机器人真实视频',1,83,88,14,0],['freeze','冻结帧编码器',1,70,88,11,1],['teacher','真实历史 token',0,38,71,11,2,'每个时间位置使用真实历史特征与动作、本体状态。'],['predictor','时间因果预测器',1,26,88,11,3],['latent','预测表征',4,13,67,12,4],['loss','L1 教师强制损失',91,41,9,5,5,'预测结果与下一时刻真实编码对齐。']
],[[1,'M45 83 L45 81'],[3,'M45 38 L45 37'],[4,'M45 26 L45 25'],[5,'M72 19 L95 19 L95 41']]);
fig('v2_vjepa2-ac-detail-ar.png',[
 ['freeze','冻结帧编码器',1,70,88,11,0],['latent','真实初始状态 z₀',4,58,12,11,1],['predictor','共享因果预测器',1,26,88,11,2],['rollout','预测值回填输入',22,38,49,11,3,'紫色 token 来自预测结果；后续预测不能一直依赖真实历史。'],['latent','远期预测 ẑ₄',59,13,12,11,4],['loss','Rollout L1 损失',91,40,9,6,5,'将递归预测的末端状态与真实目标表示比较。']
],[[3,'M11 19 L26 41'],[3,'M29 19 L44 41'],[3,'M47 19 L63 41'],[5,'M72 19 L95 19 L95 40']]);
fig('v2_vjepa2-mpc.png',[
 ['encoder','当前图像编码 Eθ',0,24,20,35,0],['goal','目标图像编码',72,24,28,35,0,'目标分支与当前分支分别编码，再在特征空间比较。'],['cem','CEM 候选动作',28,67,20,31,1],['predictor','动作条件预测 Pφ',28,30,20,24,2],['rollout','预测末端表征',48,28,8,27,3],['goal','目标距离 L1',61,35,5,12,4,'这是规划代价，不是在此时更新视觉编码器。'],['mpc','MPC：执行后重规划',0,64,11,16,5,'图中展示一次候选评估。闭环控制执行所选动作后，以新观测重复搜索。']
],[[2,'M32 66 L32 53'],[2,'M44 66 L44 53'],[3,'M35 41 L40 41'],[4,'M56 41 L61 41'],[4,'M71 41 L66 41']]);
fig('unipi_fig2.png',[
 ['observation','首帧与文本条件',2,8,13,21,0],['diffusion','Video Diffusion',30,30,25,9,1],['decoder','视频计划与时间插帧',29,63,26,15,2,'逐层视频生成得到更密集的计划。'],['idm','Inverse Dynamics',63,85,31,10,3],['action','Robot Actions',63,58,31,20,4]]);
fig('genie_fig3.png',[
 ['observation','无动作标签视频',5,19,25,64,0],['tokenizer','Video tokenizer',34,9,12,34,1],['latentaction','Latent action model',34,54,12,34,1,'训练时从相邻画面推断隐动作，与视觉 token 分支并行。'],['predictor','Dynamics model',61,30,12,35,2],['decoder','预测未来视频',75,19,25,64,3]]);
fig('genie_fig5.png',[
 ['observation','历史与下一帧',0,20,29,56,0],['latentaction','LAM Encoder',32,30,21,39,1,'训练时可看下一帧，提取造成变化的隐动作。'],['vq','离散隐动作瓶颈',56,44,4,12,2],['decoder','LAM Decoder',62,30,21,39,3,'用历史与离散隐动作重建下一帧。']]);
fig('c1_diff.png',[
 ['tokenizer','视频编码器',7,62,18,23,0],['textencoder','T5 文本条件',53,1,18,10,0],['noise','带噪视频 token',11,29,9,15,1],['patch','3D Patchify',23,30,9,14,2],['attention','Self Attention',45,32,10,10,3],['crossattn','Cross Attention',57,32,10,10,4],['ffn','MLP',69,32,10,10,5],['decoder','视频解码器',80,62,18,23,6]]);
fig('cp_fig2.jpg',[
 ['vae','视频 → 潜在帧',16,10,27,25,0],['injection','本体状态注入',8,47,7,19,1],['chunk','动作块注入',46,47,8,19,1],['value','价值注入',91,47,8,19,1],['diffusion','对目标子序列加噪',46,71,53,20,2],['joint','按任务生成目标',46,47,53,19,3,'策略、动态和价值模式由条件/目标槽位划分。']]);
fig('c3_mot.png',[
 ['encoder','视觉理解编码器 ViT',6,1,9,8,0],['textencoder','语言 tokenizer',15,1,16,8,0],['vae','生成侧视觉 VAE',33,1,9,8,0],['action','动作编码器',51,1,9,8,0],['attention','共享多模态注意力',7,36,51,15,1],['causal','非对称注意力 mask',76,23,23,53,2,'AR 分支因果可见；生成分支可读取条件以及生成槽位。'],['ffn','两套 MLP',12,64,41,6,3],['joint','理解与生成输出',17,74,43,5,4]]);
fig('vpp_fig3_v5.png',[
 ['observation','视频和语言输入',3,9,43,25,0],['diffusion','视频预测骨干',23,36,23,35,1,'先适配操作域视频；策略使用预测中间特征。'],['latent','Predictive Visual Representations',53,75,11,8,2],['attention','Video Former · 时空注意力',57,41,15,25,3],['ffn','FFN',68,41,4,25,3],['diffusionpolicy','DiT Diffusion Policy',80,36,14,35,4,'动作网络接收聚合后的视觉特征，对带噪动作序列去噪。'],['action','Action Denoise / 轨迹',83,14,14,19,5]]);
fig('dz_model.png',[
 ['vae','训练 · VAE Encoder',10.8,23,5.2,18,0],['action','训练 · Action Encoder',10.8,46,5.2,18,0],['textencoder','状态 / 文本条件',10.8,68,6,22,0],['noise','视频和动作加噪',21,34,3,24,1],['joint','Joint Video-Action DiT',25,17,11,49,2],['flowmatching','Joint flow matching',40,40,8,16,3],['vae','推理 · VAE Encoder',61,23,5.5,18,4],['memory','KV Cache',71,51,10,15,4],['joint','因果联合生成',71,17,10,34,5],['decoder','VAE Decoder',85,23,5.5,18,6],['actiondecoder','Action Decoder',85,46,5.5,18,6],['chunk','未来动作块',91,46,8,17,7],['feedback','异步执行与真实反馈',90,65,9,23,8]
],[[1,'M20 38 L21 38'],[2,'M23 39 L25 39'],[3,'M39 38 L40 42'],[5,'M68 36 L70 36'],[6,'M81 35 L85 35'],[6,'M81 56 L85 56'],[8,'M94 88 L94 91 L50.5 91 L50.5 38 L52 38']]);
fig('lva_framework.png',[
 ['textencoder','Language Model',2,31,17,35,0],['observation','真实初始观测',29,75,7,15,0],['joint','Video Model',21,31,23,35,1],['joint','Action Model',44,31,14,35,1,'视频与动作是交错序列中的双流模块，共同建模。'],['chunk','生成动作块',44,9,14,9,2],['feedback','写入真实观测',40,75,22,15,3],['memory','下一组历史与动作',63,75,37,15,4]]);
fig('lva2_planner.png',[
 ['goal','Task Goal',32,5,36,11,0],['observation','Observation',9,5,17,67,0],['hierarchy','High-Level Planner / VLM',32,23,36,21,1],['goal','Sub-Task Context',32,51,36,17,2],['policy','Low-Level Executor / VA',32,74,36,21,3],['action','Robot Action',74,77,20,19,4],['feedback','New Observation',80,16,5,46,5]
],[[1,'M26 34 L32 34'],[2,'M50 44 L50 51'],[3,'M50 68 L50 74'],[4,'M68 85 L74 85'],[5,'M84 77 L84 1 L17 1 L17 5']]);
fig('dv2_model-1.png',[
 ['observation','真实观测 x₁',12,82,9,17,0],['encoder','观测编码',12,69,9,9,1],['posterior','离散后验 z₁',13,54,6,9,2],['prior','动态先验 ẑ₁',0,54,5,9,2],['kl','先验 / 后验 KL',5,56,8,10,3],['decoder','重建头',12,24,9,9,4],['reward','奖励头',8,24,3,9,4],['memory','递归状态 h₂',30,41,5,9,5],['latent','32 个分类变量',72,41,22,36,6,'这里是分类潜变量，不能直接当作 VQ-VAE 码本。']]);
fig('dd_setup-1.png',[
 ['feedback','真实世界交互',13,11,30,36,0],['replay','Replay Buffer',64,15,21,29,1],['rssm','World Model',63,58,24,29,2],['policy','Actor-Critic',17,54,24,31,3]]);
fig('v2_vjepa2-abstract-new.png',[
 ['mask','视频掩码',45,72,13,10,0],['encoder','在线编码器',10,38,27,22,1],['target','EMA 编码器',72,38,27,22,1],['predictor','表征预测器',38,13,27,13,2],['loss','L1 与 stop-gradient',74,15,24,21,3],['ema','EMA 参数更新',37,47,36,8,4]]);
fig('v2_vjepa2-ac-abstract-new.png',[
 ['observation','历史视频',11,65,29,23,0],['freeze','冻结编码器',11,37,27,22,1],['freeze','冻结目标编码',72,37,27,22,1],['action','动作与本体状态',46,30,27,12,2],['predictor','动作条件预测器',39,13,26,12,3],['loss','预测 / 目标 L1',74,15,23,8,4]]);
fig('v2_flowchart.png',[
 ['data','互联网视频与图像',4,13,15,23,0],['mask','视频表征预训练',23,19,18,16,1],['textencoder','语言对齐分支',54,3,18,16,2],['evaluation','视觉探针分支',54,40,18,16,2],['data','机器人状态与动作数据',35,74,15,21,3],['predictor','动作条件后训练',54,77,18,20,4],['mpc','规划与机器人操作',77,76,23,22,5]]);
fig('cp_fig1.jpg',[
 ['observation','当前图像与本体状态',0,19,29,46,0],['textencoder','任务描述',0,70,29,18,0],['noise','带噪 token',43,86,13,8,1],['attention','Self-attention',42,72,14,10,2],['crossattn','Cross-attention',42,62,14,9,3],['ffn','Feedforward',42,51,14,9,4],['action','动作输出',71,6,29,17,5],['predictor','未来状态输出',71,29,29,46,5],['value','价值输出',71,80,29,19,5,'三类输出接口是不同用途；具体条件模式见后续 mask 页。']]);
fig('gr1_overview.png',[
 ['data','大规模视频预训练数据',0,70,36,29,0],['encoder','语言与图像输入',2,57,9,4,1],['predictor','GR-1 视频预训练',2,45,32,9,2],['loss','OBS token 预测图像',10,38,25,5,3],['data','机器人微调数据',42,70,28,29,4],['causal','共享 Transformer 骨干',45,45,51,9,5],['policy','ACT token / 动作头',62,38,4,5,6],['decoder','OBS token / 未来图像头',58,38,4,5,6,'两个输出分支共享上下文；不能画成视频头输出再送给动作头。']]);
fig('uwm_method.png',[
 ['encoder','训练 · 当前观测编码',7.5,22,2.5,26,0],['noise','动作与观测噪声时间',4,58,6,17,1,'t_a 与 t_o 分别控制动作与未来观测的噪声。'],['joint','UWM 联合骨干',13.5,47,17.5,14,2],['actiondecoder','动作输出解码',13.5,35,8,9,3],['patch','未来观测恢复',23,35,8,9,3],['policy','边缘推理 / Policy',46.8,47,18,14,4,'不把未来观测作为干净条件，迭代生成动作。'],['idm','条件推理 / IDM',79.5,47,18,14,5,'提供干净未来观测作为条件，再反推动作。']]);
fig('dz_attn.png',[
 ['teacher','训练：真实上下文',2.5,5,5,88,0],['causal','训练：块间因果可见',7.5,15,40,78,1],['memory','推理：历史 KV Cache',55.5,5,5,19,2],['joint','推理：当前块联合注意力',60.5,5,10,19,3],['feedback','写入下一段真实上下文',70.5,24,5,20,4],['causal','再生成下一块',75.5,24,10,20,5]]);
fig('lva2_framework.png',[
 ['hierarchy','Planner',14,65,17,8,0],['textencoder','Language Model',2,30,29,32,1],['semvae','SemVAE',32,65,27,8,1],['moe','MoE',33,32,6,29,2],['joint','Video Model',40,38,30,23,3],['joint','Action Model',72,30,26,32,3],['mcp','MCP · 多块预测',70,21,12,8,4,'MCP 在这里指 multi-chunk prediction，不是 MPC。'],['action','机器人动作输出',78,4,20,10,5]]);
fig('lva2_tokenizer.png',[
 ['observation','输入视频',0,4,19,91,0],['encoder','视觉基础模型',23,7,10,74,1],['semvae','Visual Tokenizer Encoder',37,7,30,22,1],['latent','语义视觉 token',37,39,30,10,2],['decoder','Visual Tokenizer Decoder',37,58,30,22,3],['latentaction','隐动作 tokenizer / 逆动力学',70,7,30,22,4],['predictor','隐动作 tokenizer / 前向动力学',70,58,30,22,5],['loss','重建、前向与一致性目标',37,86,62,13,6]]);
fig('lva2_mcp.png',[
 ['joint','主模型 Transformer',2,24,15,45,0],['ffn','多层特征融合 MLP',25,28,7,38,1],['mcp','MCP Module 1',36,24,18,53,2],['mcp','MCP Module 2',59,24,18,53,3],['mcp','MCP Module 3',82,24,18,53,4],['flowmatching','各块的流匹配损失',37,14,63,7,5,'每个未来块都有监督；MCP 与在线滚动优化 MPC 是不同概念。']]);
fig('lva_mask.png',[
 ['causal','干净视频历史的因果可见性',14,20,12,12,0],['joint','同一动作块内部双向',26,32,12,11,1],['memory','后续块读取过去',14,44,43,17,2],['mask','带噪目标槽位',57,62,38,35,3],['causal','屏蔽未来 / 无关槽位',57,20,38,41,4]]);
fig('c3_overview.png',[
 ['textencoder','模式一 · 视觉语言理解',0,52,16,44,0],['diffusion','模式二 · 图像生成',17,52,16,44,1],['joint','模式三 · 音视频生成',33.5,52,16,44,2],['policy','模式四 · Policy / WAM',50.3,52,16,44,3],['predictor','模式五 · 前向动力学',67,52,16,44,4],['idm','模式六 · 逆动力学',83.7,52,16,44,5,'这些是不同任务模式，不是六个串联网络层。']]);
fig('cp_fig12.jpg',[
 ['policy','Policy · 给定观测，预测动作及后续槽位',0,25,100,20,0],['predictor','World Model · 给定动作，预测未来',0,52,100,20,1],['value','Value · 给定轨迹，预测价值',0,79,100,20,2,'三行分别改变条件与预测区域，表示三种调用方式。']]);
fig('uwm_teaser.png',[
 ['observation','当前观测条件',28,67,45,15,0],['action','带噪动作 token',35,58,18,7,1],['latent','带噪未来观测 token',54,58,19,7,1],['noise','动作与观测的独立噪声时间',27,43,7,16,2],['joint','联合 DiT 骨干',35,47,38,9,3],['predictor','前向动力学模式',7.3,22,16,7,4],['policy','策略模式',76.5,20.5,16,7,4],['idm','逆动力学模式',7.3,73,16,7,4],['diffusion','视频预测模式',76.5,76,16,7,4]]);
fig('lva_async.png',[
 ['latency','同步推理的等待',0,0,30,100,0],['chunk','异步动作块',31,0,20,100,1],['memory','直接沿用旧缓存',53,36,14,21,2],['memory','当前缓存',77,22,12,21,3],['predictor','FDM 预测更新',90,25,6,11,4],['feedback','更新后的缓存',77,51,15,21,5]]);
figures['unipi_method.png']=figures['unipi_fig2.png'];
window.WM_FIGURES=figures;
})();

