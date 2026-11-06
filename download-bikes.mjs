import fs from 'node:fs';
const html=fs.readFileSync('reference-bikes/www.lafbrasil.com.br/bikes.html','utf8');
const paths=[...new Set([...html.matchAll(/src="\/_next\/image\?url=([^&"]+)/g)].map(m=>decodeURIComponent(m[1])).filter(p=>p.startsWith('/modelos/')))];
fs.mkdirSync('bike-assets',{recursive:true});
await Promise.all(paths.map(async p=>{const name=p.split('/').pop();const r=await fetch('https://www.lafbrasil.com.br'+p);if(!r.ok||!r.headers.get('content-type')?.startsWith('image/'))throw Error(`${p}: ${r.status}`);fs.writeFileSync('bike-assets/'+name,Buffer.from(await r.arrayBuffer()));console.log(name)}));
