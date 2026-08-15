const state={data:null,category:'Tutte',query:''};
const content=document.querySelector('#menu-content');
const nav=document.querySelector('#category-nav');
const search=document.querySelector('#search');
function renderNav(){const categories=['Tutte',...(state.data?.categorie||[]).map(c=>c.nome)];nav.innerHTML=categories.map(c=>`<button class="${state.category===c?'active':''}" type="button" data-category="${c}">${c}</button>`).join('');nav.querySelectorAll('button').forEach(b=>b.addEventListener('click',()=>{state.category=b.dataset.category;render()}));}
function render(){renderNav();const q=state.query.toLocaleLowerCase('it-IT');const categories=(state.data?.categorie||[]).map(c=>({...c,prodotti:c.prodotti.filter(p=>(state.category==='Tutte'||state.category===c.nome)&&(!q||`${p.nome} ${p.descrizione||''}`.toLocaleLowerCase('it-IT').includes(q)))})).filter(c=>c.prodotti.length);if(!categories.length){content.innerHTML='<p class="empty-state">Nessun risultato nel menu.</p>';return}content.innerHTML=categories.map(c=>`<article class="category-card"><h3>${c.nome}</h3>${c.prodotti.map(p=>`<div class="menu-item"><div><span class="item-name">${p.nome}</span>${p.descrizione?`<span class="item-description">${p.descrizione}</span>`:''}</div><span class="item-price">${p.prezzo||''}</span></div>`).join('')}</article>`).join('');}
search.addEventListener('input',e=>{state.query=e.target.value;render()});
fetch('menu.json').then(r=>r.json()).then(data=>{state.data=data;render()}).catch(()=>{content.innerHTML='<p class="empty-state">Menu temporaneamente non disponibile.</p>';});
