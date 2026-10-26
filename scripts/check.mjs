import fs from 'node:fs';
import path from 'node:path';
import vm from 'node:vm';
import { fileURLToPath } from 'node:url';
import { spawnSync } from 'node:child_process';

export const root=path.resolve(path.dirname(fileURLToPath(import.meta.url)),'..');
export const site=path.join(root,'site');
const problems=[];
function existsExact(filename){
  const relative=path.relative(site,filename);
  if(relative.startsWith('..')||path.isAbsolute(relative))return false;
  let dir=site;
  for(const part of relative.split(path.sep)){
    if(!fs.existsSync(dir)||!fs.statSync(dir).isDirectory()||!fs.readdirSync(dir).includes(part))return false;
    dir=path.join(dir,part);
  }
  return true;
}
export function check(){
  problems.length=0;
  const pages=['index.html','library.html','module.html'];
  for(const name of pages){
    const html=fs.readFileSync(path.join(site,name),'utf8');
    for(const match of html.matchAll(/(?:src|href)=["']([^"']+)["']/g)){
      const url=match[1];
      if(/^(?:https?:|mailto:|data:|#)/.test(url))continue;
      if(url.startsWith('/'))problems.push(`${name}: absolute site path ${url}`);
      const relative=decodeURIComponent(url.split(/[?#]/)[0]);
      if(relative&&!existsExact(path.join(site,relative)))problems.push(`${name}: missing or incorrectly capitalized ${relative}`);
    }
  }
  for(const name of fs.readdirSync(site).filter(n=>n.endsWith('.js'))){
    const result=spawnSync(process.execPath,['--check',path.join(site,name)],{encoding:'utf8'});
    if(result.status!==0)problems.push(`${name}: ${result.stderr}`);
  }
  const context=vm.createContext({window:{}});
  for(const name of ['data.js','lesson-models.js'])vm.runInContext(fs.readFileSync(path.join(site,name),'utf8'),context,{filename:name});
  Object.assign(context,context.window);
  for(const name of ['knowledge.js','figure-map.js'])vm.runInContext(fs.readFileSync(path.join(site,name),'utf8'),context,{filename:name});
  const data=context.window.WM_DATA,modules=context.window.WM_LESSONS.modules,knowledge=context.window.WM_KNOWLEDGE,figures=context.window.WM_FIGURES;
  vm.runInContext(fs.readFileSync(path.join(site,'module-scholar.js'),'utf8'),context,{filename:'module-scholar.js'});
  const readings=context.window.WM_SCHOLAR,readingFigures=context.window.WM_SCHOLAR_FIGURES;
  for(const [id,reading] of Object.entries(readings)){
    if(!modules[id])problems.push('Unknown scholarly topic '+id);
    for(const key of reading.figures)if(!readingFigures[key])problems.push('Missing scholarly figure '+key);
    for(const [,url] of reading.refs)if(!/^https:\/\//.test(url))problems.push('Invalid scholarly reference '+id);
    for(const match of JSON.stringify(reading.sections).matchAll(/\[(\d+)\]/g))if(+match[1]>reading.refs.length)problems.push('Unresolved citation in '+id);
  }
  for(const [key,figure] of Object.entries(readingFigures))if(!existsExact(path.join(site,figure.src)))problems.push('Missing scholarly figure asset '+key);
  if(data.length!==4||data.reduce((sum,c)=>sum+c.slides.length,0)!==144)problems.push('Expected four chapters and 144 slides');
  let mediaCount=0;
  data.forEach((chapter,i)=>{
    const refs=new Set([...chapter.html.matchAll(/["'(](media\/[^"'<>\s)]+)/g)].map(m=>m[1]));
    for(const ref of refs){mediaCount++;const name=decodeURIComponent(ref.split(/[?#]/)[0]);if(!existsExact(path.join(site,'chapters',String(i+1),name)))problems.push(`Chapter ${i+1}: missing or incorrectly capitalized ${ref}`);}
  });
  const walk=(id,trail=[])=>{
    if(!modules[id]){problems.push('Unknown module '+id);return;}
    if(trail.includes(id)){problems.push('Cyclic module hierarchy: '+[...trail,id].join(' → '));return;}
    for(const child of knowledge.children(id))walk(child,[...trail,id]);
  };
  Object.keys(modules).forEach(id=>walk(id));
  for(const [filename,figure] of Object.entries(figures)){
    if(!data.some((_,i)=>fs.existsSync(path.join(site,'chapters',String(i+1),'media',filename))))problems.push('Missing annotated figure '+filename);
    for(const region of figure.regions)if(!modules[region.id])problems.push('Unknown figure module '+region.id);
  }
  let bytes=0,files=0;
  function scan(dir){for(const item of fs.readdirSync(dir,{withFileTypes:true})){const name=path.join(dir,item.name);if(item.isSymbolicLink())problems.push('Unexpected symbolic link '+name);else if(item.isDirectory())scan(name);else{const size=fs.statSync(name).size;bytes+=size;files++;if(size>=100*1024*1024)problems.push('File exceeds GitHub file limit: '+name);}}}
  scan(site);
  if(problems.length)throw new Error(problems.join('\n'));
  console.log(`Checked 144 slides, ${Object.keys(modules).length} topics, ${mediaCount} media references, ${files} files (${(bytes/1024/1024).toFixed(1)} MiB).`);
}
if(process.argv[1]&&path.resolve(process.argv[1])===fileURLToPath(import.meta.url))check();
