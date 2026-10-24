/* === Reusable module lessons. Every rendered module resolves to a real lesson. === */
(function(){
const M={};
function add(id,title,short,plain,input,output,train,infer,caution,formula,related){M[id]={id,title,short,plain,input,output,train,infer,caution,formula,related:related||[]};}
add('observation','观测与状态','模型从相机、传感器或状态序列取得当前信息。','一张照片只告诉你此刻看到了什么，历史和传感器还能帮助判断速度、遮挡与接触。','图像、视频、本体状态；以具体实验为准。','可交给编码器的观测序列。','真实轨迹保留时间和动作对齐，避免把未来信息泄漏到过去。','执行后用新观测校正模型的预测。','观测 o 不等于环境真实状态 s；很多任务是部分可观测的。','o_t ← environment(s_t)',['encoder','memory','feedback']);
add('encoder','编码器','把高维观测变为模型可使用的特征。','把画面整理成一份可计算的摘要；摘要也可能是保留空间布局的一张特征网格。','图像或视频块；某些模型还融合本体状态。','向量、patch tokens 或视频 latent。','可以与动态模型联合训练，也可以冻结预训练编码器；两者不要混为一谈。','将当前观测与目标图编码到相应的表示空间。','表征相似不必然意味着控制上等价。','z_t = E(o_t)',['latent','freeze','predictor']);
add('vae','VAE · 视觉压缩','学习可以重建观测的潜变量。','先把图像压缩，再尝试从压缩结果画回来，重建误差提供学习信号。','观测图像。','潜变量分布及其采样。','典型目标包含重建项和 KL 正则；不同论文的实现不同。','编码当前观测，必要时再解码预测。','VAE 压缩空间与 JEPA 特征空间的训练目标不同。','L = L_reconstruction + β KL(q(z|o) ∥ p(z))',['decoder','latent','loss']);
add('latent','隐状态与空间特征','用紧凑状态承载预测所需的信息。','可以是一串数字，也可以是一张格子图；不是某个数天然就代表杯子的重量。','编码后的当前与历史观测。','供动态预测或策略使用的内部状态。','状态是否保留任务相关信息，取决于学习目标和训练数据。','在潜空间进行预测、搜索或行为学习。','不要直接赋予未验证的物理语义。','z_t ∈ representation space',['encoder','predictor','memory']);
add('memory','记忆与缓存','保存单帧观测不足以表达的历史。','看到球移动过两次，才能推测它往哪走；缓存也要分清存的是真实观测还是模型想象。','历史特征、动作与新的观测。','递归状态 h 或 Transformer 的 KV cache。','递归网络和因果注意力分别通过自己的训练过程学习利用历史。','根据真实反馈更新历史；是否截断由具体架构决定。','缓存长度、刷新策略和指令切换都会影响长期任务。','h_t = F(h_{t−1}, z_t, a_{t−1})',['rssm','feedback','causal']);
add('predictor','动力学预测器','给定状态和动作，预测未来状态。','模型要回答：如果现在这样做，接下来会怎样？','当前或历史表示、动作，有时还有随机变量。','未来表示或未来观测的分布。','用交互轨迹中对齐的状态转移监督预测。','可以递归预测未来，用于搜索或作为策略学习的训练环境。','单步准确不能保证长时 rollout 可靠。','ẑ_{t+1} = F(z_{≤t}, a_{≤t})',['action','rollout','loss']);
add('decoder','解码器','把潜状态还原成可见的观测。','负责把内部摘要重新画成图，方便重建监督或人查看。','潜变量或预测特征。','图像、视频或其他观测。','是否参与主训练，需要按当前论文区分。','潜空间规划可以完全跳过图像解码。','V-JEPA 2 的可视化解码器不能被误认为规划必需模块。','ô_t = D(z_t)',['vae','latent','evaluation']);
add('action','动作接口','规定模型如何表示并输出控制指令。','“向左一点”最后必须变成控制器理解的数字；关节位置和末端位姿是不同接口。','观测、指令或动作条件。','动作 token、动作向量或动作块。','要处理单位、坐标、归一化、频率与本体差异。','将模型输出转换为控制器实际执行的指令。','不同论文的动作维度与控制频率不能直接混用。','a_{t:t+H−1} ∈ ℝ^(H×d_action)',['policy','chunk','feedback']);
add('policy','策略 / Actor','从当前信息直接给出动作。','已经练好的行动习惯，不需要每一步都重新枚举所有未来。','当前状态、历史；语言是否可用由模型决定。','一个动作或动作块。','Dreamer 在想象中优化 actor；模仿策略则学习示教动作。','执行策略前向计算，再由控制器执行动作。','策略与世界模型职责不同，即使共享同一个网络。','a_t ~ π(a|z_t, goal)',['value','imagination','action']);
add('reward','奖励与目标','定义什么结果更符合任务。','任务需要一个判分规则，也可以用目标图像的距离代替显式奖励。','状态、动作、任务目标。','奖励、代价或目标距离。','奖励可能由环境给出，奖励预测头再拟合它。','规划或策略优化使用目标信号评价动作后果。','手写奖励和安全约束的贡献应在真机结果中交代。','r_t = R(s_t,a_t) 或 cost(z,z_goal)',['value','goal','evaluation']);
add('value','价值函数 / Critic','估计某个状态或动作的后续收益。','只想十几步还不够时，价值函数帮助估计后面还有多少收益。','状态，或状态与动作。','未来回报的估计。','用轨迹回报或 bootstrap 目标训练；具体估计器依论文而变。','可以辅助策略训练，或对候选动作后果打分。','价值误差也会误导规划，不能把分数当成真实成功率。','V(z_t) ≈ E[Σ_k γ^k r_{t+k}]',['reward','cem','policy']);
add('rssm','RSSM · 确定性与随机状态','把确定性历史和随机状态结合起来建模。','一条通道记住发生过什么，另一条通道表达下一步可能有不同结果。','历史 h、随机潜状态、动作；训练时再引入真实观测。','下一步先验状态与观测校正后的后验状态。','通过观测重建、奖励预测与分布正则等目标联合学习。','用先验向未来想象，用真实观测校正状态。','h 与随机变量的符号在不同论文中可能不同。','h_{t+1}=f(h_t,z_t,a_t); z_{t+1}~p(z|h_{t+1})',['memory','latent','imagination']);
add('imagination','潜空间想象','在学到的模型中展开未来轨迹。','先在脑中试走几步，但试走的规则来自数据，可能会错。','真实轨迹提供的初始状态、策略动作。','想象状态、奖励及价值估计。','Dreamer 用想象轨迹训练行为策略。','是否在部署时继续想象，取决于决策接口。','模型漏洞和误差累积会让想象收益失真。','z_t → a_t → ẑ_{t+1} → a_{t+1}',['predictor','policy','rollout']);
add('feedback','真实反馈闭环','把执行后的真实观测重新接入系统。','想象手到了杯子上方，但相机发现偏了两厘米，下一块动作应据此修正。','执行完成后的新观测和状态。','更新后的历史或规划起点。','在线训练可以继续更新模型；仅推理闭环则不必更新权重。','动作块执行 → 新观测 → 更新记忆 → 再决策。','闭环推理与在线学习不是同一件事。','observe → predict → act → observe',['chunk','memory','rollout']);
add('data','数据与采样','训练效果首先受数据分布和采样方式影响。','模型见过什么、每种情况见过多少，会影响它能预测和执行什么。','视频、机器人轨迹、人类视频或合成数据。','清洗、对齐、划分后的训练与评测集。','需要区分有动作标签、无动作标签，以及训练与测试是否重叠。','新环境与训练分布不同，模型可能失效。','规模、质量、多样性和可公开复现性要分开讨论。','dataset = {(o_t,a_t,o_{t+1})} 或 unlabeled video',['evaluation','latentaction','generalization']);
add('mask','掩码与可见信息','控制模型能看到哪些内容、需要预测哪些内容。','给学生留下一部分线索，让它补出另一部分；测试的是结构理解还是偷看邻帧，取决于怎么遮。','图像块、视频时空块或多模态序列。','上下文与预测目标的划分。','JEPA 遮挡目标区域；生成模型也用条件与噪声槽位区分任务。','掩码预训练与动作条件预测是不同阶段。','掩码补全不必然等于只能看过去预测未来。','context = mask(x); target = withheld tokens',['target','causal','loss']);
add('target','目标编码与教师分支','为预测器提供需要匹配的表示目标。','老师看到完整材料，学生只能看部分线索；学生不能通过梯度直接修改答案。','完整图像或完整视频；取出对应目标块。','目标表征。','常见 JEPA 使用 stop-gradient 与 EMA 教师；冻结特征模型则不同。','动作模型通常比较预测表征和目标图像表征。','EMA、冻结编码器与防坍缩正则属于不同设计选择。','target = stopgrad(E_target(x))',['freeze','ema','loss']);
add('ema','EMA 与防坍缩','防止所有输入都被编码成同一个无信息向量。','如果所有摘要都写成同一句话，预测很容易，但没有学到任何东西。','在线编码器参数及特征分布。','缓慢更新的目标网络或非退化表示。','EMA、stop-gradient、特征正则各有作用；不能把某一个单独当成充分保证。','推理使用训练好的表征，而非继续计算教师损失。','具体防坍缩机制应以相应论文训练配置为准。','θ_target ← m θ_target + (1−m) θ_online',['target','loss','encoder']);
add('freeze','冻结编码器','只训练动态预测部分，保持视觉表示不变。','先用现成的视觉知识，再学习动作怎样改变它。','预训练编码器及机器人交互数据。','固定视觉特征与可训练的预测器。','梯度更新预测器，不更新冻结编码器。','编码器仍需计算前向，冻结不代表不占计算。','冻结可能限制任务适配；不是所有 JEPA 工作都冻结编码器。','∇θ_encoder L = 0',['encoder','predictor','loss']);
add('teacher','真实历史监督','每一步都基于真实历史预测下一步。','做练习时，每题都给正确的前文；这样能并行训练，但还没学会承受自己的错误。','真实编码的历史和动作。','一步预测及其误差。','多位置可并行计算；每步条件仍是真实历史。','部署递归预测时，条件可能包含模型自己的输出。','需要留意训练和递归推理条件的差异。','L_TF = Σ_t ‖F(z_≤t,a_≤t) − z_{t+1}‖',['rollout','loss','freeze']);
add('rollout','递归 Rollout','把自己预测的状态继续用作下一步输入。','不再每题给正确前文，而是让模型接着自己写出的结果往下推。','起始真实状态、动作序列、已有预测。','多步预测轨迹。','rollout 损失能暴露递归误差；并不保证任意长时稳定。','规划时常需比较多步动作后果。','单步误差小，递归结果仍可能偏离真实分布。','ẑ_{t+2} = F(ẑ_{t+1},a_{t+1})',['teacher','predictor','loss']);
add('loss','损失与梯度更新','把预测和监督之间的差异转成参数更新信号。','模型哪里猜错了，要通过损失明确告诉它；哪些参数能被更新同样关键。','预测值、监督目标与各项权重。','训练损失及对应梯度。','区分重建、表征预测、动作监督和价值目标；检查梯度流到哪里。','通常训练损失不直接在部署时优化参数。','相同的低损失未必对应相同的闭环成功率。','L = Σ_i λ_i L_i ; θ ← θ − η∇θL',['teacher','rollout','freeze']);
add('goal','图像目标与能量','用目标表征定义动作搜索的代价。','告诉模型想要哪张画面，再寻找能让预测接近目标的动作。','当前表示、目标图像表示和候选动作。','距离或能量。','代价定义与表示学习的目标可能不同。','通过搜索减少预测表征与目标表征之间的距离。','目标相机、背景与任务无关特征可能影响整幅特征距离。','E(a) = ‖F(z_t,a) − E(o_goal)‖',['cem','encoder','predictor']);
add('cem','CEM / MPC 动作搜索','通过候选采样和反复筛选寻找动作。','先试很多方案，保留较好的，再围绕它们继续试；最后只执行第一步或一个动作块。','动作分布、预测模型和代价函数。','选出的动作或动作序列。','这是规划算法，不等于对网络参数做梯度训练。','采样 → 预测 → 打分 → 更新采样分布 → 执行并重规划。','样本数、迭代次数、时域与硬件共同决定耗时。','a* = argmin_a E(F(z,a), z_goal)',['goal','value','feedback']);
add('diffusion','扩散 / 流匹配生成','从噪声逐步生成未来视觉或动作。','不是一次猜完所有数字，而是多次修正一团噪声。','噪声、时间或噪声等级、文本及观测条件。','视频 latent、动作等目标模态。','扩散去噪和流匹配的具体目标不同；查看当前模型的参数化。','反复运行生成器或采用蒸馏后的少步推理。','生成速度和物理正确性需要分别衡量。','x_σ = (1−σ)x₀ + σε',['tokenizer','joint','latency']);
add('tokenizer','视觉 Tokenizer','把图像或视频转为生成模型处理的 token。','把很大的画面序列变成较短的内部序列，减少生成器的负担。','像素图像或视频。','离散代码或连续 latent。','可用重建目标学习，也可能使用独立预训练的 VAE。','编码条件帧，生成后再解码需要展示的画面。','不同 tokenizer 的时间压缩、空间压缩和 token 数不可混用。','video → tokens / latent → video',['vae','diffusion','latent']);
add('idm','逆动力学模型','从状态变化反推造成变化的动作。','知道起点和终点，再问中间该怎样动。','当前观测与未来观测或表示。','动作或动作分布。','通常需要可对齐的动作轨迹，或在联合生成中学习对应关系。','把视觉计划转换为可执行动作。','同一个视觉变化可能由多个动作造成，映射不一定唯一。','p(a_t | o_t,o_{t+1})',['action','joint','diffusion']);
add('latentaction','隐动作','从视频变化中学习未标注的动作代码。','没有关节标签时，先学习一套能控制画面变化的内部按钮。','相邻帧或视频片段。','离散或连续的隐动作代码。','瓶颈代码解释状态转移；具体编码器可见哪些帧很关键。','隐动作可作为生成条件，再与机器人动作对齐。','隐动作不自动等于真实电机命令。','u_t = A(o_t,o_{t+1})',['action','predictor','data']);
add('joint','视频—动作联合生成','在一个生成过程中同时预测未来视觉和动作。','不仅想象会看到什么，还把要怎么动一起算出来。','真实历史、任务、状态，以及目标模态的噪声。','未来视频 / 表征与动作块。','不同架构用共享或独立噪声等级、注意力与动作分支耦合。','可以联合去噪后执行动作，画面是否完整解码按模型而定。','联合预测不等于已经证明物理因果；需要受控消融。','p(video_future, actions | history, instruction)',['diffusion','chunk','feedback']);
add('injection','Latent 帧注入','把非图像数值放进视频模型的 latent 槽位。','借用视频模型已有的输入输出位置，存动作和价值这些数字。','归一化、拉平的动作或状态数值。','填入 latent 帧槽位的非图像表示。','固定编码和读出规则，再后训练视频生成骨干。','生成槽位后读出数值，不需要先 VAE 解码成图片。','这种数值表示不是自然图像，也不等于学习的视觉 tokenizer。','action block → flatten / repeat → latent slot',['action','joint','value']);
add('attention','联合注意力 / MoT','让不同模态交换信息，同时保留各自的计算分支。','视频和动作在共享的会议室交换信息，会后仍用各自的处理器。','视频、语言或动作 token。','跨模态上下文化后的表示。','检查 QKV、FFN、归一化是共享还是独立。','可通过缓存减少重复上下文计算。','不同论文都叫多模态注意力，并不意味着结构相同。','Attention(Q,K,V) = softmax(QKᵀ/√d)V',['causal','memory','joint']);
add('causal','因果时序掩码','约束哪些时间块可以互相看见。','不能偷看还没发生的真实未来；同一块内部是否双向则由架构决定。','按时间和模态排列的 token。','受掩码约束的注意力。','训练可见性必须与部署可得信息对齐。','历史缓存被复用，新块按规定访问过去。','teacher forcing、块内双向和跨块因果要分别说明。','attention(i,j)=0 when j is unavailable to i',['mask','teacher','memory']);
add('chunk','动作块与异步执行','一次预测一段动作，再分时执行。','大脑算一小段计划，控制器连续执行；下一段要在上一段用完前准备好。','动作序列、控制频率、最新观测。','一段实际控制轨迹。','训练动作块的时长和采样间隔应与推理对应。','同步会等待模型；异步可重叠计算与执行，但引入观测滞后。','吞吐、单次延迟与动作频率不是同一指标。','chunk duration = number of actions / control Hz',['feedback','latency','memory']);
add('latency','推理效率与延迟','区分模型计算耗时和真实控制周期。','模型每秒算几次，不等于机械臂每秒只动几次。','模型、硬件、采样数、去噪步数与并行方案。','单次延迟、吞吐和控制周期。','蒸馏、缓存与量化可能改变质量，需要同时评估。','比较同步等待与异步动作块的实际效果。','脱离硬件和协议比较毫秒数会误导。','T_compute < T_chunk（异步的一项必要预算）',['chunk','diffusion','evaluation']);
add('evaluation','实验设置与结果','把结论放回数据、预算和任务协议中。','一个百分比需要交代在哪测、测了几次、算的是完成度还是成功率。','评测任务、基线、种子、样本数与指标。','在相应协议下的结果和误差。','训练与测试划分、对照设置要一致。','用闭环任务指标补充预测质量指标。','不同论文、硬件或任务协议的数值不能直接拼成排行榜。','result = metric(model, data, protocol, budget)',['ablation','generalization','boundary']);
add('ablation','受控消融','只改变一个因素，检查收益来自哪里。','把一个零件拿掉再比较，前提是其余条件尽量一样。','完整模型与控制变量后的变体。','特定因素对结果的影响。','数据、训练预算、骨干和评测协议要对齐。','分开检验训练目标的收益和推理时想象的收益。','跨论文分数比较不能代替同设置消融。','Δ = score(full) − score(controlled variant)',['evaluation','loss','boundary']);
add('generalization','泛化与迁移','区分新场景、新物体、新任务和新本体。','换杯子、换厨房和换机器人不是同一种难度。','训练分布与明确划分的未见条件。','各类迁移条件下的任务表现。','适配数据量、是否微调和是否使用目标示例都要说明。','只在没有任务专属训练时才按相应定义称零样本。','分布内高分不意味着开放世界可靠。','train distribution ≠ evaluation conditions',['data','evaluation','boundary']);
add('boundary','局限与证据边界','指出模型在哪些条件下还不能可靠工作。','介绍能力时，也要说明它什么时候会猜错、执行失败或需要人工帮助。','论文局限、失败样例及实验覆盖范围。','可支持的结论和仍待验证的问题。','用失败样例补充数据或改进目标，但新方案要再验证。','必要时重新观测、重规划或交给外部控制规则。','没有实验覆盖不能写成已解决，也不要把趋势当成定论。','claim strength ≤ evidence strength',['evaluation','ablation','feedback']);

/* === Paper-level modules preserve the actual names on source timelines === */
const papers=[
['worldmodels','World Models','把 VAE、循环动态模型和控制器组合起来，在学习到的环境中训练行为。','vae','predictor','policy'],
['planet','PlaNet','用 RSSM 表示状态，并在潜空间中搜索动作。','rssm','loss','cem'],
['dreamer1','Dreamer v1','在潜空间想象轨迹中训练 actor 与 critic。','imagination','value','policy'],
['dreamer2','Dreamer v2','引入离散潜状态等改进，扩展视觉强化学习。','rssm','loss','policy'],
['dreamer3','Dreamer v3','通过稳定的训练配方支持多领域、多任务。','rssm','loss','policy'],
['daydreamer','DayDreamer','把想象中学习行为的框架应用于真实机器人。','observation','imagination','feedback'],
['lecun','LeCun 立场文','提出以表征预测和目标驱动规划为核心的系统构想。','encoder','target','goal'],
['ijepa','I-JEPA','从可见图像上下文预测目标区域的表征。','mask','target','encoder'],
['vjepa','V-JEPA','通过视频时空块的表征预测学习视觉表示。','mask','target','encoder'],
['dinowm','DINO-WM','冻结视觉特征，学习动作条件动态并用目标图规划。','freeze','predictor','cem'],
['vjepa2','V-JEPA 2-AC','结合预训练视频编码器与动作条件预测器做目标图规划。','freeze','predictor','cem'],
['lewm','LeWorldModel','探索端到端学习用于预测与规划的世界模型。','encoder','predictor','goal'],
['unipi','UniPi','先生成语言条件的视频计划，再用逆动力学转换成动作。','diffusion','idm','action'],
['genie','Genie','从无真实动作标签的视频中学习逐帧可控制的生成环境。','tokenizer','latentaction','predictor'],
['cosmos1','Cosmos 1','先进行大规模视频预训练，再后训练适配物理 AI 场景。','tokenizer','diffusion','predictor'],
['predict25','Predict 2.5','在统一的条件视频生成接口下学习未来视觉。','tokenizer','diffusion','decoder'],
['cosmospolicy','Cosmos Policy','通过 latent 帧注入，将视频模型后训练为策略、动态与价值模型。','injection','joint','policy'],
['cosmos3','Cosmos 3','用语言与生成分支支持多种输入输出任务和动作接口。','attention','diffusion','joint'],
['gr1','GR-1','使用视频预测作为机器人行为学习的辅助目标。','encoder','loss','policy'],
['vpp','VPP','利用视频模型的中间特征支持动作生成。','diffusion','latent','policy'],
['uwm','UWM','用视频与动作的联合生成目标连接多个预测接口。','mask','joint','action'],
['dreamzero','DreamZero','通过联合未来视觉与动作建模，研究视频预训练到行为的迁移。','diffusion','joint','feedback'],
['lingbot','LingBot-VA','通过因果视频动作建模和历史记忆支持机器人控制。','attention','causal','joint'],
['lingbot2','LingBot-VA 2.0','原生视频动作预训练，结合隐动作与分层规划。','latentaction','joint','policy']
];
for(const [id,title,short,a,b,c] of papers){const A=M[a],B=M[b],C=M[c];add(id,title,short,'这篇工作的核心主张：'+short,A.input,C.output,'先理解它使用的基础机制：'+B.title+'。'+B.train,'部署接口重点是'+C.title+'。'+C.infer,C.caution,'核心连接：'+A.title+' → '+B.title+' → '+C.title,[a,b,c]);}
function paperId(label){if(/DayDreamer/i.test(label))return'daydreamer';if(/Dreamer.*[vV]?\s*1/.test(label))return'dreamer1';if(/Dreamer.*[vV]?\s*2/.test(label))return'dreamer2';if(/Dreamer.*[vV]?\s*3/.test(label))return'dreamer3';if(/World Models/.test(label))return'worldmodels';if(/PlaNet/.test(label))return'planet';if(/LeCun/.test(label))return'lecun';if(/I-JEPA/.test(label))return'ijepa';if(/V-JEPA 2/.test(label))return'vjepa2';if(/V-JEPA/.test(label))return'vjepa';if(/DINO-WM/.test(label))return'dinowm';if(/LeWorldModel/.test(label))return'lewm';if(/UniPi/.test(label))return'unipi';if(/Genie/.test(label))return'genie';if(/Cosmos Policy/.test(label))return'cosmospolicy';if(/Cosmos 3/.test(label))return'cosmos3';if(/Cosmos 1/.test(label))return'cosmos1';if(/Predict/.test(label))return'predict25';if(/GR-1/.test(label))return'gr1';if(/VPP/.test(label))return'vpp';if(/UWM/.test(label))return'uwm';if(/DreamZero/.test(label))return'dreamzero';if(/VA 2.0/.test(label))return'lingbot2';if(/LingBot/.test(label))return'lingbot';return null;}
// Each entry is a deliberate, page-specific teaching sequence. Commas denote
// explanatory order, not an assertion that experimental comparison is causal.
const pages=[
[
'observation,vae,predictor,policy,feedback','vae,rssm,imagination,feedback,evaluation','observation,memory,predictor,action','vae,memory,predictor,policy','data,vae,predictor,policy,evaluation','latent,memory,policy,evaluation','predictor,imagination,policy,feedback','imagination,policy,boundary,evaluation','encoder,memory,rssm,reward','memory,latent,rssm,ablation','rssm,imagination,value,policy','data,rssm,imagination,policy,feedback','latent,rssm,loss,ablation','loss,data,generalization,evaluation','data,observation,policy,feedback','observation,data,loss,policy,feedback','observation,encoder,rssm,reward,imagination,policy','observation,reward,imagination,policy,evaluation','feedback,reward,policy,ablation','observation,reward,policy,evaluation','observation,data,feedback,generalization','boundary,reward,data,generalization','vae,rssm,imagination,policy,feedback'
],
[
'encoder,target,predictor,goal,cem','encoder,mask,target,freeze,predictor','encoder,target,predictor','observation,encoder,predictor,target,loss','mask,encoder,target,ema,loss','mask,target,evaluation,ablation','mask,encoder,target,ema,loss','mask,evaluation,ablation,boundary','encoder,freeze,action,predictor,goal,cem','data,goal,cem,evaluation','encoder,latent,cem,ablation,evaluation','encoder,freeze,action,predictor','data,mask,encoder,freeze,predictor','data,encoder,evaluation,ablation','encoder,freeze,teacher,rollout,loss','observation,encoder,teacher,rollout,loss','goal,predictor,cem,action,feedback','action,goal,cem,evaluation','data,action,evaluation,generalization','goal,cem,action,feedback','diffusion,goal,cem,latency,evaluation','predictor,action,decoder,boundary','goal,latency,generalization,boundary','encoder,predictor,policy,generalization','encoder,freeze,predictor,goal,cem'
],
[
'diffusion,idm,latentaction,joint,policy','idm,latentaction,diffusion,injection,joint','observation,diffusion,idm,action,joint','observation,goal,diffusion,idm','observation,diffusion,idm,action','diffusion,action,feedback,evaluation','idm,goal,encoder,joint,ablation','data,latentaction,predictor,evaluation','tokenizer,latentaction,predictor','observation,latentaction,predictor,loss','latentaction,action,predictor,boundary','latentaction,data,joint,generalization','data,tokenizer,diffusion,generalization','tokenizer,latent,diffusion,decoder','data,mask,encoder,evaluation','observation,action,diffusion,decoder','tokenizer,diffusion,encoder,latency','injection,policy,predictor,value','action,injection,joint','action,injection,diffusion,action','mask,policy,predictor,value','observation,policy,predictor,value,action,feedback','data,loss,chunk,latency','evaluation,data,generalization','observation,action,feedback,evaluation','evaluation,ablation,boundary','loss,joint,ablation,evaluation','policy,predictor,value,ablation,evaluation','observation,attention,joint,policy','attention,causal,diffusion,joint','observation,mask,attention,joint','observation,action,joint','data,attention,freeze,diffusion,loss','data,action,generalization','attention,memory,diffusion,action,feedback','evaluation,generalization,boundary','action,predictor,evaluation,ablation','data,policy,generalization,evaluation','policy,evaluation,boundary','latency,predictor,generalization,boundary','idm,latentaction,injection,joint','data,diffusion,action,joint'
],
[
'predictor,policy,joint,action','predictor,policy,joint','predictor,policy,joint','cem,policy,joint,latency','idm,encoder,joint,feedback','observation,diffusion,idm,policy,joint','idm,loss,encoder,joint','observation,diffusion,idm,action','data,encoder,loss,policy','diffusion,latent,policy,latency','action,diffusion,joint','mask,action,diffusion,predictor','idm,loss,joint,boundary','data,diffusion,joint,policy','joint,data,evaluation,boundary','data,diffusion,joint,generalization','diffusion,idm,joint','observation,tokenizer,joint,action,feedback','teacher,causal,memory,feedback','rollout,action,feedback,memory','observation,memory,diffusion,chunk,feedback','memory,observation,feedback,boundary','diffusion,memory,latency,ablation','diffusion,joint,latency,ablation','data,generalization,evaluation','data,generalization,boundary','data,generalization,evaluation','data,policy,generalization,evaluation','data,joint,generalization,evaluation','data,ablation,evaluation,boundary','data,loss,generalization,evaluation','predictor,joint,action,boundary','attention,causal,memory,joint','tokenizer,action,causal,joint','tokenizer,attention,action,joint','mask,causal,memory','chunk,feedback,memory,boundary','chunk,feedback,ablation,evaluation','memory,action,evaluation','data,action,memory,latency','data,tokenizer,latentaction,joint','tokenizer,attention,joint','tokenizer,latentaction,data,loss','rollout,joint,loss,ablation','goal,policy,chunk,feedback','data,latentaction,action,generalization','data,generalization,evaluation,boundary','joint,generalization,evaluation,boundary','loss,joint,latency,ablation','diffusion,latent,policy,latency','diffusion,loss,latency,boundary','latency,memory,generalization,boundary','diffusion,idm,policy,joint','joint,feedback,loss,boundary'
]
];
function scene(c,p){const s=window.WM_DATA[c].slides[p];const raw=pages[c]?.[p];if(!raw)throw Error(`Missing scene ${c+1}/${p+1}`);let ids=raw.split(',');const evidence=/实验|结果|消融|对照|vs|数据：|规模因素|技能分布|38 倍|加速|人类视频/.test(s.title);const limits=/局限|代价|悬案|失败/.test(s.title);const timeline=/篇论文|收尾|封面|过渡|之后|小结/.test(s.title);
 const section=[...window.WM_DATA[c].html.matchAll(/<section\b[^>]*>[\s\S]*?<\/section>/g)][p]?.[0]||'';
 if(timeline){const paperNames=[...section.matchAll(/<div class="tl(?: key)?">[\s\S]*?<div class="n">([\s\S]*?)<\/div>/g)].map(m=>m[1].replace(/<[^>]+>/g,' ').trim());const mapped=paperNames.map(paperId).filter(Boolean);if(mapped.length>1)ids=mapped.slice(0,8);}
 let nodes=ids.map((id,n)=>({key:id+'-'+n,id,title:M[id].title,short:M[id].short}));
 // This page is an explicit two-loss training graph, not a simple chain.
 let edges=nodes.slice(1).map((_,i)=>[i,i+1]);
 if(c===1&&(p===14||p===15))edges=[[0,1],[1,2],[1,3],[2,4],[3,4]];
 const captions=(s.caption||s.headline||s.title).match(/.{1,85}(?:[。；]|$)/g)||[s.headline];
 return {c,p,title:s.title,headline:s.headline,caption:s.caption,kind:evidence?'evidence':limits?'limits':timeline?'overview':'mechanism',kindLabel:evidence?'逐项读实验':limits?'逐项看边界':timeline?'研究脉络':'逐步拆机制',nodes,edges,source:s.text,profile:s.profile};
}
window.WM_LESSONS={modules:M,pages,scene};
})();
