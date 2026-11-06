import fs from 'node:fs';
const source='reference/www.lafbrasil.com.br';
fs.mkdirSync('dist',{recursive:true});
for(const name of fs.readdirSync(source)) if(/\.(png|webp|mp4)$/.test(name)) fs.copyFileSync(`${source}/${name}`,`dist/${name}`);
fs.cpSync(`${source}/_next/static/media`,'dist/fonts',{recursive:true});
fs.copyFileSync(`${source}/_next/image (1).webp`,'dist/logo.webp');
let css=fs.readFileSync(`${source}/_next/static/chunks/02of3-6k.yyxb.css`,'utf8').replace(/url\((?:"|')?(?:\.\.\/media\/|\/_next\/static\/media\/)([^)"']+)(?:"|')?\)/g,(_,name)=>`url(/fonts/${name.replaceAll('~','')})`);
css=css.replace(/@font-face\{[^}]+\}/g,rule=>{const url=rule.match(/url\(\/fonts\/([^)]*)\)/);return url&&!fs.existsSync(`dist/fonts/${url[1]}`)?'':rule});
fs.writeFileSync('dist/original.css',css);
let html=fs.readFileSync(`${source}/index.html`,'utf8');
html=html.replace(/<script\b[^>]*>[\s\S]*?<\/script>/gi,'').replace(/<noscript>[\s\S]*?<\/noscript>/gi,'').replace(/<link\b[^>]*>/gi,tag=>tag.includes('stylesheet')?'<link rel="stylesheet" href="/original.css"><link rel="stylesheet" href="/restored.css">':'').replace(/\s+srcSet="[^"]*"/gi,'').replace(/src="\/_next\/image\?[^\"]*laf_logo[^\"]*"/g,'src="/logo.webp"').replace(/src="\/_next\/image\?[^\"]*ico-whatsapp[^\"]*"/g,'src="/whatsapp.svg"');
html=html.replace(/<div aria-hidden="false" class="absolute inset-0 z-30[\s\S]*?<\/span><\/div><\/div>/g,'');
let model=0;
html=html.replace(/<!--\$!--><template[^>]*><\/template><div class="relative w-full h-\[350px\] md:h-\[400px\]"><\/div><!--\/\$-->/g,()=>{const scooter=model++===0;return `<img class="product-image" src="/${scooter?'scooter-dark.webp':'bg-bikes.png'}" alt="${scooter?'Scooter':'Bicicleta elétrica'} LAF"/>`;});
html=html.replace(/<img[^>]*src="\/360-graus.png"[^>]*>/g,'').replace('Rotacionar 360°','Encontre sua próxima LAF');
const ids=['inicio','conceito','catalogo','diferenciais','perguntas','filme','lifestyle'];let section=0;
html=html.replace(/<section /g,()=>`<section id="${ids[section++]}" `).replace('<footer ','<footer id="contato" ');
html=html.replace(/href="\/quem-somos"/g,'href="/quem-somos.html"').replace(/href="\/conceito"/g,'href="/conceito.html"').replace(/href="\/contato"/g,'href="#contato"').replace(/href="\/(scooters|bikes)"/g,'href="#catalogo"');
html=html.replace('© 6 LAF','© 2026 LAF').replace('Assitência Premium','Assistência Premium');
html=html.replace('</body>','<script src="/app.js" defer></script></body>');
fs.writeFileSync('dist/index.html',html.replace(/></g,'>\n<'));
const conceptRoot='reference-concept/www.lafbrasil.com.br';
if(fs.existsSync(conceptRoot)){
 fs.copyFileSync(`${conceptRoot}/_next/image (2).webp`,'dist/life-freedom.webp');
 fs.copyFileSync(`${conceptRoot}/_next/image (3).webp`,'dist/life-freedom-transparent.webp');
}
if(fs.existsSync('scooter-assets'))fs.cpSync('scooter-assets','dist/scooter-assets',{recursive:true});
if(fs.existsSync('bike-assets'))fs.cpSync('bike-assets','dist/bike-assets',{recursive:true});
for(const [page,folder] of [['quem-somos','reference-about'],['conceito','reference-concept'],['scooters','reference-scooters'],['bikes','reference-bikes'],['contato','reference-contact']]){
const aboutSource=`${folder}/www.lafbrasil.com.br/${page}.html`;
if(fs.existsSync(aboutSource)){
 let about=fs.readFileSync(aboutSource,'utf8')
 .replace(/<script\b[^>]*>[\s\S]*?<\/script>/gi,'')
 .replace(/<noscript>[\s\S]*?<\/noscript>/gi,'')
 .replace(/<link\b[^>]*>/gi,tag=>tag.includes('stylesheet')?'<link rel="stylesheet" href="/original.css"><link rel="stylesheet" href="/restored.css">':'')
 .replace(/\s+srcSet="[^"]*"/gi,'')
 .replace(/src="\/_next\/image\?[^\"]*laf_logo[^\"]*"/g,'src="/logo.webp"')
 .replace(/src="\/_next\/image\?[^\"]*ico-whatsapp[^\"]*"/g,'src="/whatsapp.svg"')
 .replace(/src="\/_next\/image\?[^\"]*fachada[^\"]*"/g,'src="/fachada.png"')
 .replace(/src="\/_next\/image\?[^\"]*scooter-orange-effect[^\"]*"/g,'src="/scooter-orange-effect.png"')
 .replace(/src="\/_next\/image\?[^\"]*LIFE-FREEDOM-TRANSPARENTE[^\"]*"/g,'src="/life-freedom-transparent.webp"')
 .replace(/src="\/_next\/image\?[^\"]*LIFE-FREEDOM.png[^\"]*"/g,'src="/life-freedom.webp"')
 .replace(/src="\/_next\/image\?[^\"]*bg-scooter.png[^\"]*"/g,'src="/scooter-dark.webp"')
 .replace(/src="\/_next\/image\?url=([^&"]+)[^"]*"/g,(tag,url)=>{const decoded=decodeURIComponent(url);return decoded.startsWith('/modelos/')?`src="/${page==='bikes'?'bike':'scooter'}-assets/${decoded.split('/').pop()}"`:tag})
 .replace(/href="\/(quem-somos|conceito|scooters|bikes|contato)"/g,(_,slug)=>`href="/${slug}.html"${slug===page?' aria-current="page"':''}`)
 .replace('<main class="',`<main id="${page==='conceito'?'conceito-page':page}" class="`)
 .replace('© 6 LAF','© 2026 LAF')
 .replace('</body>','<script src="/app.js" defer></script></body>');
 if(page==='contato'){
  const address=encodeURIComponent('Alça da Terceira Ponte, 245, Praia da Costa, Vila Velha, ES, 29101-440');
  about=about.replace(/https:\/\/(?:maps.google.com\/|www.google.com\/maps)\?q=[^"<]+/g,url=>`https://www.google.com/maps?q=${address}${url.includes('output=embed')?'&amp;output=embed':''}`)
   .replace('<form class=', '<form id="contact-form" class=')
   .replace('Enviar mensagem<svg','Preparar no WhatsApp<svg')
   .replace('Preencha o formulário ou fale com a gente pelo WhatsApp. Nossa equipe responde em horário comercial.','Preencha o formulário para preparar sua mensagem no WhatsApp. Você poderá revisar e confirmar o envio por lá. Nossa equipe responde em horário comercial.')
   .replace(/<input id="nome"/,'<input required maxlength="120" autocomplete="name" id="nome"')
   .replace(/<input id="telefone"/,'<input maxlength="25" autocomplete="tel" id="telefone"')
   .replace(/<input id="email"/,'<input maxlength="200" autocomplete="email" id="email"')
   .replace(/<textarea id="mensagem"/,'<textarea required maxlength="2000" id="mensagem"')
   .replace('</form>','<p class="contact-status md:col-span-2" role="status" aria-live="polite"></p></form>');
 }
 if(['conceito','scooters','bikes'].includes(page))about=about.replace('Fale com um especialista LAF agora mesmo.</p>','Fale com um especialista LAF agora mesmo.</p><a class="concept-cta" href="https://wa.me/5527997618799" target="_blank" rel="noopener noreferrer">Falar com um especialista ↗</a>');
 if(page==='scooters'||page==='bikes'){
  fs.mkdirSync(`dist/${page}`,{recursive:true});
  for(const match of about.matchAll(/<a\b[^>]*href="\/(?:scooters|bikes)\/([^\"]+)"[^>]*>([\s\S]*?)<\/a>/g)){
   const [,slug,card]=match;
   const name=card.match(/<h3[^>]*>(.*?)<\/h3>/s)[1];
   const photo=card.match(/<img[^>]*src="([^\"]+)"/)[1];
   const badges=[...card.matchAll(/<span class="inline-flex[^\"]*"[^>]*>(.*?)<\/span>/g)].map(m=>m[1]);
   const specs=card.match(/<p[^>]*>(.*?)<\/p>/s)[1].replace(/<!--.*?-->/g,'');
   const content=`<main class="model-detail"><a class="back-catalog" href="/scooters.html">← Todas as scooters</a><div class="model-layout"><img src="${photo}" alt="Scooter LAF ${name}"><div><p class="model-eyebrow">LAF · Mobilidade elétrica</p><h1>${name}</h1><div class="model-badges">${badges.map(b=>`<span>${b}</span>`).join('')}</div><p class="model-specs">${specs}</p><p class="model-note">Consulte cores, disponibilidade e condições com um especialista LAF.</p><a class="concept-cta" href="https://wa.me/5527997618799?text=${encodeURIComponent('Olá! Gostaria de saber mais sobre a scooter LAF '+name+'.')}" target="_blank" rel="noopener noreferrer">Consultar este modelo ↗</a></div></div></main>`;
   const finalContent=page==='bikes'?content.replaceAll('/scooters.html','/bikes.html').replaceAll('Todas as scooters','Todas as bikes').replaceAll('Scooter LAF','Bike LAF').replaceAll('a%20scooter%20LAF','a%20bike%20LAF'):content;
   const detail=about.replace(/<title>.*?<\/title>/s,`<title>${name} — ${page==='bikes'?'Bike':'Scooter'} LAF</title>`).replace(/<main\b[^>]*>[\s\S]*?<\/main>/,finalContent);
   fs.writeFileSync(`dist/${page}/${slug}.html`,detail.replace(/></g,'>\n<'));
  }
  about=about.replace(/href="\/(scooters|bikes)\/([^\"]+)"/g,'href="/$1/$2.html"');
 }
 fs.writeFileSync(`dist/${page}.html`,about.replace(/></g,'>\n<'));
}
}
const home=fs.readFileSync('dist/index.html','utf8').replace(/href="#catalogo"/g,'href="/scooters.html"');
fs.writeFileSync('dist/index.html',home);
for(const f of ['app.js','restored.css','whatsapp.svg','motion.js','motion.css'])fs.copyFileSync(f,`dist/${f}`);
for(const file of fs.readdirSync('dist',{recursive:true}).filter(f=>f.endsWith('.html'))){
 const path=`dist/${file}`;
 const markup=fs.readFileSync(path,'utf8').replace('</head>','<link rel="stylesheet" href="/motion.css"></head>').replace('</body>','<script src="/motion.js" defer></script></body>');
 fs.writeFileSync(path,markup);
}
let manifest=JSON.parse(fs.readFileSync('.openai/hosting.json','utf8'));manifest.static={directory:'dist'};fs.writeFileSync('.openai/hosting.json',JSON.stringify(manifest,null,2));
console.log('Site reconstruído em dist/');
