import http from 'node:http';
import fs from 'node:fs';
import path from 'node:path';
import { root } from './check.mjs';

const dist=path.join(root,'dist');
if(!fs.existsSync(path.join(dist,'index.html')))throw new Error('Run npm run build first.');
const baseArg=process.argv.find(a=>a.startsWith('--base='))?.slice(7)||'/';
const base='/'+baseArg.replace(/^\/+|\/+$/g,'')+(baseArg==='/'?'':'/');
const port=Number(process.env.PORT||process.env.WM_PORT)||8766;
const mime={'.html':'text/html; charset=utf-8','.js':'text/javascript; charset=utf-8','.css':'text/css; charset=utf-8','.svg':'image/svg+xml','.png':'image/png','.jpg':'image/jpeg','.jpeg':'image/jpeg','.webp':'image/webp','.gif':'image/gif','.mp4':'video/mp4','.md':'text/plain; charset=utf-8','.json':'application/json; charset=utf-8'};
http.createServer((req,res)=>{
  try{
    const pathname=decodeURIComponent(new URL(req.url,'http://localhost').pathname);
    if(base!=='/'&&pathname===base.slice(0,-1)){res.writeHead(302,{Location:base});return res.end();}
    if(!pathname.startsWith(base)){res.writeHead(404);return res.end('Not found');}
    const relative=pathname.slice(base.length)||'index.html';
    const filename=path.resolve(dist,relative);
    if(!filename.startsWith(dist+path.sep)){res.writeHead(403);return res.end();}
    const stat=fs.statSync(filename);if(!stat.isFile()){res.writeHead(404);return res.end('Not found');}
    res.setHeader('Content-Type',mime[path.extname(filename)]||'application/octet-stream');
    res.setHeader('Cache-Control','no-store');res.setHeader('Accept-Ranges','bytes');
    const range=req.headers.range?.match(/^bytes=(\d+)-(\d*)$/);
    let start=0,end=stat.size-1;
    if(range){start=Number(range[1]);end=range[2]?Math.min(Number(range[2]),end):end;if(start>end){res.writeHead(416,{'Content-Range':`bytes */${stat.size}`});return res.end();}res.statusCode=206;res.setHeader('Content-Range',`bytes ${start}-${end}/${stat.size}`);}
    res.setHeader('Content-Length',end-start+1);
    if(req.method==='HEAD')return res.end();
    fs.createReadStream(filename,{start,end}).pipe(res);
  }catch{res.writeHead(404);res.end('Not found');}
}).listen(port,'127.0.0.1',()=>console.log(`http://127.0.0.1:${port}${base}`));
