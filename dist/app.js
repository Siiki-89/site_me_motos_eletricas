const header=document.querySelector('header');
function scrollHeader(){header.classList.toggle('scrolled',window.scrollY>30)}
addEventListener('scroll',scrollHeader,{passive:true});scrollHeader();
const menuButton=document.querySelector('[aria-label="Abrir menu"]');
const menu=document.createElement('nav');menu.className='mobile-menu';menu.id='mobile-navigation';menu.setAttribute('aria-label','Navegação principal');menu.hidden=true;
menu.innerHTML=header.querySelector('nav ul').innerHTML.replace(/<\/?li>/g,'');header.append(menu);
menuButton.removeAttribute('aria-haspopup');menuButton.setAttribute('aria-controls',menu.id);
function closeMenu(){menu.hidden=true;menuButton.setAttribute('aria-expanded','false');menuButton.setAttribute('aria-label','Abrir menu')}
menuButton.addEventListener('click',()=>{menu.hidden=!menu.hidden;menuButton.setAttribute('aria-expanded',String(!menu.hidden));menuButton.setAttribute('aria-label',menu.hidden?'Abrir menu':'Fechar menu')});
menu.addEventListener('click',e=>{if(e.target.closest('a'))closeMenu()});addEventListener('keydown',e=>{if(e.key==='Escape'){closeMenu();menuButton.focus()}});
for(const [i,button] of [...document.querySelectorAll('#diferenciais button,#perguntas button')].entries()){
 const panel=button.nextElementSibling;if(!panel?.style.maxHeight)continue;
 panel.id=`answer-${i}`;button.setAttribute('aria-controls',panel.id);button.setAttribute('aria-expanded',String(panel.style.maxHeight!=='0px'));
 button.addEventListener('click',()=>{const open=button.getAttribute('aria-expanded')!=='true';panel.style.maxHeight=open?`${panel.scrollHeight+20}px`:'0px';panel.style.opacity=open?'1':'0';button.setAttribute('aria-expanded',String(open))});
}
const faq=document.querySelector('#perguntas');
const answerPanels=[...(faq?.querySelectorAll('[style*="max-height"]')||[])];
const desktopButtons=[...(faq?.querySelectorAll('button')||[])].filter(b=>!b.nextElementSibling?.style.maxHeight);
const title=faq?.querySelector('h3');const description=title?.parentElement.nextElementSibling?.querySelector('p');
desktopButtons.forEach((button,i)=>button.addEventListener('click',()=>{title.textContent=button.querySelectorAll('span')[1].textContent;description.textContent=answerPanels[i].textContent;const number=title.parentElement.previousElementSibling?.querySelector('span');if(number)number.textContent=String(i+1).padStart(2,'0');desktopButtons.forEach(b=>{b.classList.remove('faq-active');b.setAttribute('aria-pressed','false');for(const span of b.querySelectorAll('span'))span.style.color=''});button.classList.add('faq-active');button.setAttribute('aria-pressed','true')}));
const whatsapp='https://wa.me/5527997618799';
const chat=document.querySelector('[aria-label="Falar no WhatsApp"]');chat.removeAttribute('aria-expanded');chat.removeAttribute('aria-controls');chat.addEventListener('click',()=>window.open(whatsapp,'_blank','noopener,noreferrer'));
document.querySelectorAll('.product-image').forEach((image,i)=>{const card=image.parentElement.parentElement;card.id=i?'bikes':'scooters';const link=card.querySelector('a');link.href=`${whatsapp}?text=${encodeURIComponent('Olá! Gostaria de conhecer '+(i?'as bikes':'as scooters')+' LAF.')}`;link.target='_blank';link.rel='noopener noreferrer';link.setAttribute('aria-label',i?'Consultar bikes no WhatsApp':'Consultar scooters no WhatsApp');const cta=link.cloneNode(false);cta.className='product-contact';cta.textContent='Consultar modelos ↗';card.append(cta)});
document.querySelectorAll('header nav a').forEach(a=>{if(a.textContent.trim()==='Bikes')a.href='/bikes.html';if(a.textContent.trim()==='Scooters')a.href='/scooters.html'});
document.querySelectorAll('a[target="_blank"]').forEach(a=>a.rel='noopener noreferrer');
if(matchMedia('(prefers-reduced-motion: reduce)').matches)document.querySelectorAll('video').forEach(v=>{v.pause();v.controls=true});
document.querySelectorAll('header nav a').forEach(a=>{if(a.textContent.trim()==='Contato')a.href='/contato.html'});
const contactForm=document.querySelector('#contact-form');
if(contactForm)contactForm.addEventListener('submit',event=>{
 event.preventDefault();
 const name=contactForm.elements.nome;const message=contactForm.elements.mensagem;
 name.setCustomValidity(name.value.trim()?'':'Informe seu nome.');
 message.setCustomValidity(message.value.trim()?'':'Escreva sua mensagem.');
 if(!contactForm.reportValidity())return;
 const values=new FormData(contactForm);
 const text=['Olá, LAF!','Nome: '+values.get('nome').trim(),values.get('telefone').trim()?'Telefone: '+values.get('telefone').trim():'',values.get('email').trim()?'Email: '+values.get('email').trim():'','',values.get('mensagem').trim()].filter((line,i)=>line||i===4).join('\n');
 const url='https://wa.me/5527997618799?text='+encodeURIComponent(text);
 window.open(url,'_blank','noopener,noreferrer');
 const status=contactForm.querySelector('.contact-status');status.replaceChildren(document.createTextNode('Mensagem preparada. Confirme o envio no WhatsApp. Se a janela não abriu, '));
 const link=document.createElement('a');link.href=url;link.target='_blank';link.rel='noopener noreferrer';link.textContent='clique aqui para abrir';status.append(link);
});
contactForm?.addEventListener('input',event=>event.target.setCustomValidity?.(''));

// A link to the current page must not reload the document or replay its motion.
const pagePath=path=>path.replace(/\/index\.html$/, '/').replace(/\.html$/, '').replace(/\/$/, '')||'/';
document.querySelectorAll('header nav a').forEach(link=>{
 const url=new URL(link.href,location.href);
 if(url.origin===location.origin&&pagePath(url.pathname)===pagePath(location.pathname))link.setAttribute('aria-current','page');
});
document.addEventListener('click',event=>{
 if(event.defaultPrevented||event.button!==0||event.ctrlKey||event.metaKey||event.shiftKey||event.altKey)return;
 const link=event.target.closest('a[href]');
 if(!link||link.hasAttribute('download')||(link.target&&link.target!=='_self'))return;
 const url=new URL(link.href,location.href);
 if(url.origin!==location.origin||pagePath(url.pathname)!==pagePath(location.pathname)||url.search!==location.search||url.hash)return;
 event.preventDefault();closeMenu();
 window.scrollTo({top:0,behavior:matchMedia('(prefers-reduced-motion: reduce)').matches?'instant':'smooth'});
});


document.querySelectorAll('#catalogo #scooters a').forEach(a=>{a.href='/scooters.html';a.removeAttribute('target');a.setAttribute('aria-label','Explorar scooters LAF');if(a.classList.contains('product-contact'))a.textContent='Explorar modelos ↗'});


document.querySelectorAll('#catalogo #bikes a').forEach(a=>{a.href='/bikes.html';a.removeAttribute('target');a.setAttribute('aria-label','Explorar bikes LAF');if(a.classList.contains('product-contact'))a.textContent='Explorar modelos ↗'});

