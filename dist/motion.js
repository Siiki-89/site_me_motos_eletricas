// Progressive enhancement: content stays readable if this file cannot load.
(() => {
 const preference=matchMedia('(prefers-reduced-motion: reduce)');
 const film=document.querySelector('#filme video');
 if(film){
  const holder=film.parentElement;
  holder.style.maskImage='none';holder.style.webkitMaskImage='none';
  holder.classList.add('video-lettering');
  const mask='<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 400"><g fill="white" font-family="Arial Black, Arial, sans-serif" font-weight="900" font-size="180"><text x="30" y="180" textLength="1140" lengthAdjust="spacingAndGlyphs">A ESCOLHA</text><text x="30" y="370" textLength="1140" lengthAdjust="spacingAndGlyphs">INTELIGENTE</text></g></svg>';
  const maskUrl='url("data:image/svg+xml,'+encodeURIComponent(mask)+'")';
  holder.style.maskImage=maskUrl;holder.style.webkitMaskImage=maskUrl;
 }
 const nodes=new Set(document.querySelectorAll('.tantour-reveal'));
 document.querySelectorAll('#conceito>div:first-child>* ,#conceito .grid>div,#catalogo>div.relative.z-10,#diferenciais>div.relative.z-10,#perguntas>div:first-child,#lifestyle>div:first-child,#lifestyle>div:last-child>div,.model-layout>*,footer>div>div').forEach(el=>{
  if(!el.closest('.tantour-reveal'))nodes.add(el);
 });
 let observer;
 const running=new Set();
 function stop(){
  observer?.disconnect();
  nodes.forEach(el=>el.classList.remove('motion-pending'));
  running.forEach(a=>a.cancel());running.clear();
 }
 function start(){
  if(preference.matches||!('IntersectionObserver' in window))return;
  observer=new IntersectionObserver(entries=>entries.forEach(entry=>{
   if(!entry.isIntersecting)return;
   const el=entry.target;
   observer.unobserve(el);
   el.classList.remove('motion-pending');
   const a=el.animate([{opacity:0,transform:'translateY(24px)'},{opacity:1,transform:'translateY(0)'}],{
    duration:850,easing:'cubic-bezier(.22,1,.36,1)'
   });
   running.add(a);a.finished.catch(()=>{}).finally(()=>running.delete(a));
  }),{threshold:0,rootMargin:'0px 0px 60px 0px'});
  // Never hide content already painted in the viewport. Avoid nested animations.
  nodes.forEach(el=>{
   if([...nodes].some(parent=>parent!==el&&parent.contains(el)))return;
   if(el.getBoundingClientRect().top<innerHeight+60)return;
   el.classList.add('motion-pending');observer.observe(el);
  });
 }
 start();preference.addEventListener('change',()=>{if(preference.matches)stop();});
 document.addEventListener('focusin',e=>{
  const el=e.target.closest('.motion-pending');
  if(el){observer?.unobserve(el);el.classList.remove('motion-pending');}
 });
 addEventListener('pageshow',e=>{if(e.persisted)stop()});
 // Play videos only while visible, and expose controls if autoplay is unavailable.
 const videos=document.querySelectorAll('video');
 if('IntersectionObserver' in window){
  const videoObserver=new IntersectionObserver(entries=>entries.forEach(({target,isIntersecting})=>{
   if(preference.matches){target.pause();target.controls=true;return;}
   if(isIntersecting){target.muted=true;target.play().catch(()=>{target.controls=true})}else target.pause();
  }),{threshold:0.01});videos.forEach(v=>videoObserver.observe(v));
 }
 preference.addEventListener('change',()=>{if(preference.matches)videos.forEach(v=>{v.pause();v.controls=true})});
 // The original glass cards have a soft light that follows the pointer.
 if(matchMedia('(hover:hover) and (pointer:fine)').matches){
  document.querySelectorAll('#conceito .grid>div').forEach(card=>{
   const light=card.querySelector('[style*="mix-blend-mode"]');if(!light)return;
   card.addEventListener('pointermove',event=>{if(preference.matches)return;const r=card.getBoundingClientRect();light.style.transform=`translate(${event.clientX-r.left}px,${event.clientY-r.top}px) translate(-50%,-50%)`;light.style.opacity='0.45'});
   card.addEventListener('pointerleave',()=>light.style.opacity='0');
  });
 }
 const faq=document.querySelector('#perguntas');
 faq?.addEventListener('click',event=>{
  if(preference.matches||!event.target.closest('button'))return;
  const panel=faq.querySelector('h3')?.closest('.pr-16');if(!panel)return;
  const a=panel.animate([{opacity:0,transform:'translateY(12px)'},{opacity:1,transform:'translateY(0)'}],{duration:350,easing:'cubic-bezier(.22,1,.36,1)'});
  running.add(a);a.finished.catch(()=>{}).finally(()=>running.delete(a));
 });
})();
