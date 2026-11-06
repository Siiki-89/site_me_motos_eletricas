import fs from 'node:fs';
const html=fs.readFileSync('reference-scooters/www.lafbrasil.com.br/scooters.html','utf8');
const paths=[...new Set([...html.matchAll(/src="\/_next\/image\?url=([^&"]+)/g)].map(m=>decodeURIComponent(m[1])).filter(p=>p.startsWith('/modelos/scooters/')))];
fs.mkdirSync('scooter-assets',{recursive:true});
for(let i=0;i<paths.length;i+=4)await Promise.all(paths.slice(i,i+4).map(async p=>{const name=p.split('/').pop();if(fs.existsSync('scooter-assets/'+name))return;const r=await fetch('https://www.lafbrasil.com.br'+p);if(!r.ok||!r.headers.get('content-type')?.startsWith('image/'))throw Error(`${p}: ${r.status}`);fs.writeFileSync('scooter-assets/'+name,Buffer.from(await r.arrayBuffer()));console.log(name)}));
console.log(`${paths.length} fotos disponíveis`);
