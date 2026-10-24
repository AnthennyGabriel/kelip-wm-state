import fs from 'node:fs';
import path from 'node:path';
import { check, root, site } from './check.mjs';

check();
const dist=path.resolve(root,'dist');
// Only this repository's generated dist directory may be replaced.
if(path.dirname(dist)!==root||path.basename(dist)!=='dist')throw new Error('Invalid output directory');
fs.rmSync(dist,{recursive:true,force:true});
fs.cpSync(site,dist,{recursive:true});
if(!fs.existsSync(path.join(dist,'.nojekyll')))fs.writeFileSync(path.join(dist,'.nojekyll'),'');
console.log('Static deployment files are ready in dist/.');
