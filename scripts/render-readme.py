"""Compose real browser screenshots into README stills and looping GIF demos.
Requires Pillow; source frames are produced by capture-readme.playwright.js.
"""
from pathlib import Path
from PIL import Image, ImageDraw, ImageFont, ImageOps
import os

ROOT=Path(__file__).resolve().parents[1]
FRAMES=ROOT/'.readme-frames'
OUT=ROOT/'docs'/'media'
OUT.mkdir(parents=True,exist_ok=True)
FONT=os.environ.get('README_FONT',r'C:\Windows\Fonts\msyh.ttc')
def font(n): return ImageFont.truetype(FONT,n)
def compose(src,kicker,title,step='',width=1120):
    shot=Image.open(src).convert('RGB')
    shot=ImageOps.contain(shot,(width-64,780))
    canvas=Image.new('RGB',(width,shot.height+180),'#eef1f6')
    draw=ImageDraw.Draw(canvas)
    draw.text((32,20),kicker,font=font(12),fill='#0071e3')
    draw.text((32,44),title,font=font(26),fill='#18233a')
    y=102
    draw.rounded_rectangle((24,y-12,width-24,y+shot.height+12),radius=15,fill='#dfe5ef')
    canvas.paste(shot,((width-shot.width)//2,y))
    draw.text((32,canvas.height-40),step or 'WORLD MODEL ATLAS   /   真实网页截图',font=font(13),fill='#53627a')
    return canvas

compose(FRAMES/'home.png','WORLD MODEL ATLAS / 世界模型可视化学习地图','先看见全貌，再深入每一个模块。','144 页原始展示    ·    24 项代表工作    ·    85 个专题').save(OUT/'overview.png',optimize=True)
compose(FRAMES/'library.png','02 / KNOWLEDGE LIBRARY','同一个模块，连接不同论文。','一级模块 → 二级知识点 → 原理、训练、推理与边界').save(OUT/'library.png',optimize=True)
compose(FRAMES/'mobile.png','MOBILE / 随时回看','原图之上，轻触即可深入。',width=520).save(OUT/'mobile.png',optimize=True)
specs={
'flow':('01 / FOLLOW THE ORIGINAL FIGURE','沿论文原图，逐步理解信息如何流动。',[
'并行输入：视频、动作、状态与文本','训练：为视频与动作加噪','联合生成：Video–Action DiT','学习目标：Joint flow matching','推理：真实观测编码与历史缓存','推理：条件生成与去噪','解码：未来视觉与动作输出','输出：生成未来动作块','反馈：用真实观测进入下一轮']),
'depth':('02 / GO ONE LEVEL DEEPER','从一个问题，走向真正理解。',[
'起点：在原图中找到 VAE','第一层：打开简短讲解小窗','第二层：进入 VAE 独立专题','看结构：均值、标准差与重参数化','继续拆解：找到下层知识点','第三层：进入重参数化专题','动手理解：改变均值，观察潜变量','回到原图：保留原来的页码与步骤']),
'mpc':('03 / LEARN BY INTERACTING','让规划过程，成为看得见的选择。',[
'当前状态：从真实位置开始','搜索：比较未来四步的候选计划','执行：只执行计划的第一步','再规划：从新的真实位置重新搜索','再执行：动作与真实反馈交替','第三轮：重新评估候选未来','继续执行：逐步接近目标','加入扰动：旧计划不能直接沿用','闭环纠偏：根据新状态重新规划','执行新计划：继续向目标移动'])}
for group,(kicker,title,labels) in specs.items():
    files=sorted(FRAMES.glob(group+'_*.png'))
    assert len(files)==len(labels),(group,len(files),len(labels))
    images=[compose(p,kicker,title,label).quantize(colors=192,method=Image.Quantize.MEDIANCUT) for p,label in zip(files,labels)]
    durations=[1400]*len(images)
    if group=='depth': durations=[1200,2100,1400,1900,1700,1600,1800,1600]
    images[0].save(OUT/(group+'.gif'),save_all=True,append_images=images[1:],duration=durations,loop=0,optimize=True,disposal=2)
    print(group,len(images),(OUT/(group+'.gif')).stat().st_size)
