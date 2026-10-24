# 参考文献与来源索引

[← 返回项目介绍](../README.md)

先沿研究脉络建立概念，再用原文核对具体训练目标、数据和评测条件。下表将论文入口与来源笔记分开，便于追溯。

**覆盖说明：** 本索引基于可lip公开资料库所附笔记整理，不等于系统性文献检索。分组沿用本站教学路线，方法可能跨组；I-JEPA、V-JEPA 等表征方法在此作为基础脉络，不都具备动作条件或闭环控制能力。

**版本说明：** 原文链接通常指向最新版，来源笔记可能对应较早版本。标题、数据与结论以所引用版本为准；Dreamer V3 的早期稿标题与后来的正式发表标题不同。此次整理核对了核心入门链接与部分新增工作的题名，没有重新逐项复核所有笔记中的实验数字。

## 01 · 潜在动力学与模型式强化学习

| 工作 / 原文题名 | 原文 | 来源笔记 |
| --- | --- | --- |
| **World-Models**<br>World Models（Ha & Schmidhuber 2018；NeurIPS 版题为 Recurrent World Models Facilitate Policy Evolution） | [arXiv:1803.10122](https://arxiv.org/abs/1803.10122) | [阅读笔记](../site/chapters/1/notes/World-Models-%E8%B0%83%E7%A0%94%E7%AC%94%E8%AE%B0.md) |
| **PlaNet**<br>Learning Latent Dynamics for Planning from Pixels（PlaNet） | [arXiv:1811.04551](https://arxiv.org/abs/1811.04551) | [阅读笔记](../site/chapters/1/notes/PlaNet-%E8%B0%83%E7%A0%94%E7%AC%94%E8%AE%B0.md) |
| **Dreamer-v1**<br>Dream to Control: Learning Behaviors by Latent Imagination（Dreamer，即 DreamerV1） | [arXiv:1912.01603](https://arxiv.org/abs/1912.01603) | [阅读笔记](../site/chapters/1/notes/Dreamer-v1-%E8%B0%83%E7%A0%94%E7%AC%94%E8%AE%B0.md) |
| **Dreamer-v2**<br>Mastering Atari with Discrete World Models（DreamerV2） | [arXiv:2010.02193](https://arxiv.org/abs/2010.02193) | [阅读笔记](../site/chapters/1/notes/Dreamer-v2-%E8%B0%83%E7%A0%94%E7%AC%94%E8%AE%B0.md) |
| **Dreamer-v3**<br>Mastering Diverse Domains through World Models（DreamerV3） | [arXiv:2301.04104](https://arxiv.org/abs/2301.04104) | [阅读笔记](../site/chapters/1/notes/Dreamer-v3-%E8%B0%83%E7%A0%94%E7%AC%94%E8%AE%B0.md) |
| **DayDreamer**<br>DayDreamer: World Models for Physical Robot Learning（DayDreamer） | [arXiv:2206.14176](https://arxiv.org/abs/2206.14176) | [阅读笔记](../site/chapters/1/notes/DayDreamer-%E8%B0%83%E7%A0%94%E7%AC%94%E8%AE%B0.md) |

## 02 · 表征预测与目标图规划

| 工作 / 原文题名 | 原文 | 来源笔记 |
| --- | --- | --- |
| I-JEPA · Self-Supervised Learning from Images with a Joint-Embedding Predictive Architecture | [arXiv:2301.08243](https://arxiv.org/abs/2301.08243) | [第二章展示](../site/chapters/2/deck.html)；本次补充原文入口 |
| **LeCun-2022-立场文**<br>A Path Towards Autonomous Machine Intelligence（LeCun 2022 立场文，Version 0.9.2） | [OpenReview](https://openreview.net/forum?id=BZ5a1r-kVsf) | [阅读笔记](../site/chapters/2/notes/LeCun-2022-%E7%AB%8B%E5%9C%BA%E6%96%87-%E8%B0%83%E7%A0%94%E7%AC%94%E8%AE%B0.md) |
| **V-JEPA**<br>Revisiting Feature Prediction for Learning Visual Representations from Video（V-JEPA） | [arXiv:2404.08471](https://arxiv.org/abs/2404.08471) | [阅读笔记](../site/chapters/2/notes/V-JEPA-%E8%B0%83%E7%A0%94%E7%AC%94%E8%AE%B0.md) |
| **DINO-WM**<br>DINO-WM: World Models on Pre-trained Visual Features enable Zero-shot Planning | [arXiv:2411.04983](https://arxiv.org/abs/2411.04983) | [阅读笔记](../site/chapters/2/notes/DINO-WM-%E8%B0%83%E7%A0%94%E7%AC%94%E8%AE%B0.md) |
| **V-JEPA-2**<br>V-JEPA 2: Self-Supervised Video Models Enable Understanding, Prediction and Planning | [arXiv:2506.09985](https://arxiv.org/abs/2506.09985) | [阅读笔记](../site/chapters/2/notes/V-JEPA-2-%E8%B0%83%E7%A0%94%E7%AC%94%E8%AE%B0.md) |
| **LeWorldModel**<br>LeWorldModel: Stable End-to-End Joint-Embedding Predictive Architecture from Pixels（LeWM） | [arXiv:2603.19312](https://arxiv.org/abs/2603.19312) | [阅读笔记](../site/chapters/2/notes/LeWorldModel-%E8%B0%83%E7%A0%94%E7%AC%94%E8%AE%B0.md) |

## 03 · 生成式世界模型

| 工作 / 原文题名 | 原文 | 来源笔记 |
| --- | --- | --- |
| **UniPi**<br>Learning Universal Policies via Text-Guided Video Generation（UniPi） | [arXiv:2302.00111](https://arxiv.org/abs/2302.00111) | [阅读笔记](../site/chapters/3/notes/UniPi-%E8%B0%83%E7%A0%94%E7%AC%94%E8%AE%B0.md) |
| **Genie**<br>Genie: Generative Interactive Environments (Genie) | [arXiv:2402.15391](https://arxiv.org/abs/2402.15391) | [阅读笔记](../site/chapters/3/notes/Genie-%E8%B0%83%E7%A0%94%E7%AC%94%E8%AE%B0.md) |
| **Cosmos-1**<br>Cosmos World Foundation Model Platform for Physical AI | [arXiv:2501.03575](https://arxiv.org/abs/2501.03575) | [阅读笔记](../site/chapters/3/notes/Cosmos-1-%E8%B0%83%E7%A0%94%E7%AC%94%E8%AE%B0.md) |
| **Cosmos-Predict2.5**<br>World Simulation with Video Foundation Models for Physical AI（Cosmos-Predict2.5 / Cosmos-Transfer2.5） | [arXiv:2511.00062](https://arxiv.org/abs/2511.00062) | [阅读笔记](../site/chapters/3/notes/Cosmos-Predict2.5-%E8%B0%83%E7%A0%94%E7%AC%94%E8%AE%B0.md) |
| **Cosmos-Policy**<br>Cosmos Policy: Fine-Tuning Video Models for Visuomotor Control and Planning | [arXiv:2601.16163](https://arxiv.org/abs/2601.16163) | [阅读笔记](../site/chapters/3/notes/Cosmos-Policy-%E8%B0%83%E7%A0%94%E7%AC%94%E8%AE%B0.md) |
| **Cosmos-3**<br>Cosmos 3: Omnimodal World Models for Physical AI（Cosmos 3） | [arXiv:2606.02800](https://arxiv.org/abs/2606.02800) | [阅读笔记](../site/chapters/3/notes/Cosmos-3-%E8%B0%83%E7%A0%94%E7%AC%94%E8%AE%B0.md) |

## 04 · 世界动作模型

| 工作 / 原文题名 | 原文 | 来源笔记 |
| --- | --- | --- |
| **GR-1**<br>Unleashing Large-Scale Video Generative Pre-training for Visual Robot Manipulation（GR-1） | [arXiv:2312.13139](https://arxiv.org/abs/2312.13139) | [阅读笔记](../site/chapters/4/notes/GR-1-%E8%B0%83%E7%A0%94%E7%AC%94%E8%AE%B0.md) |
| **VPP**<br>Video Prediction Policy: A Generalist Robot Policy with Predictive Visual Representations（VPP） | [arXiv:2412.14803](https://arxiv.org/abs/2412.14803) | [阅读笔记](../site/chapters/4/notes/VPP-%E8%B0%83%E7%A0%94%E7%AC%94%E8%AE%B0.md) |
| **UWM**<br>Unified World Models: Coupling Video and Action Diffusion for Pretraining on Large Robotic Datasets (UWM) | [arXiv:2504.02792](https://arxiv.org/abs/2504.02792) | [阅读笔记](../site/chapters/4/notes/UWM-%E8%B0%83%E7%A0%94%E7%AC%94%E8%AE%B0.md) |
| **DreamZero**<br>World Action Models are Zero-shot Policies (DreamZero) | [arXiv:2602.15922](https://arxiv.org/abs/2602.15922) | [阅读笔记](../site/chapters/4/notes/DreamZero-%E8%B0%83%E7%A0%94%E7%AC%94%E8%AE%B0.md) |
| **LingBot-VA**<br>Causal World Modeling for Robot Control (LingBot-VA) | [arXiv:2601.21998](https://arxiv.org/abs/2601.21998) | [阅读笔记](../site/chapters/4/notes/LingBot-VA-%E8%B0%83%E7%A0%94%E7%AC%94%E8%AE%B0.md) |
| **LingBot-VA 2.0** | 当前来源未附独立论文链接，待补充 | [第四章原始展示](../site/chapters/4/deck.html)；勿用 LingBot-VA 的论文替代 2.0 的证据 |

## 补充阅读

| 工作 / 原文题名 | 原文 | 来源笔记 |
| --- | --- | --- |
| **VLA-JEPA**<br>VLA-JEPA: Enhancing Vision-Language-Action Model with Latent World Model | [arXiv:2602.10098](https://arxiv.org/abs/2602.10098) | [阅读笔记](../site/chapters/2/notes/VLA-JEPA-%E8%B0%83%E7%A0%94%E7%AC%94%E8%AE%B0.md) |

## 补充阅读 · 机器人教程与推理效率

| 工作 / 原文题名 | 原文 | 来源笔记 |
| --- | --- | --- |
| **Fast-WAM**<br>Fast-WAM: Do World Action Models Need Test-time Future Imagination?（Fast-WAM） | [arXiv:2603.16666](https://arxiv.org/abs/2603.16666) | [阅读笔记](../site/chapters/4/notes/Fast-WAM-%E8%B0%83%E7%A0%94%E7%AC%94%E8%AE%B0.md) |
| **WM-to-WAM-教程**<br>From World Models to World Action Models: A Concise Tutorial for Robotics | [arXiv:2607.00836](https://arxiv.org/abs/2607.00836) | [阅读笔记](../site/chapters/4/notes/WM-to-WAM-%E6%95%99%E7%A8%8B-%E8%B0%83%E7%A0%94%E7%AC%94%E8%AE%B0.md) |

## 先修模块与基础原文

| 模块 | 原文 / 官方入口 | 阅读重点 |
| --- | --- | --- |
| VAE | [Auto-Encoding Variational Bayes](https://arxiv.org/abs/1312.6114) | 变分后验、重参数化与下界 |
| Diffusion Policy | [Diffusion Policy: Visuomotor Policy Learning via Action Diffusion](https://diffusion-policy.cs.columbia.edu/) | 观测条件、动作序列与滚动执行 |
| Flow Matching | [Flow Matching for Generative Modeling](https://arxiv.org/abs/2210.02747) | 概率路径、速度场与连续生成 |
| MPC / CEM 在世界模型中的使用 | [PlaNet](https://arxiv.org/abs/1811.04551) | 候选动作、模型预测、代价与重规划；此文是应用实例，不是 MPC 的起源文献 |

## 引用与材料来源

- **研究结论**：引用对应论文，并注明版本；数据、评价协议与限制应一并说明。
- **原始展示与调研笔记**：[可lip公开资料库](https://github.com/skJack/-lip-)，本站固定来源提交为 `fc02c1e70c15f677fc752373363eedda43d247dd`。笔记中的第一人称来自原作者。
- **本站新增内容**：学习导航、模块小窗、独立专题、原图交互与教学实验。实验用于解释概念，不构成相应论文结果的复现。
- **第三方素材**：论文图、演示视频和原始课件保留其作者权利；本项目不重新授予使用许可。

后续补充新论文时，至少记录：原文链接、版本日期、预测对象、动作条件、训练目标、决策接口、数据来源、评测协议与适用边界。
