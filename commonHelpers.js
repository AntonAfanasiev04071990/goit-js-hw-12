import{a as h,i as l,S as b}from"./assets/vendor-015f4caf.js";(function(){const o=document.createElement("link").relList;if(o&&o.supports&&o.supports("modulepreload"))return;for(const t of document.querySelectorAll('link[rel="modulepreload"]'))e(t);new MutationObserver(t=>{for(const a of t)if(a.type==="childList")for(const p of a.addedNodes)p.tagName==="LINK"&&p.rel==="modulepreload"&&e(p)}).observe(document,{childList:!0,subtree:!0});function r(t){const a={};return t.integrity&&(a.integrity=t.integrity),t.referrerPolicy&&(a.referrerPolicy=t.referrerPolicy),t.crossOrigin==="use-credentials"?a.credentials="include":t.crossOrigin==="anonymous"?a.credentials="omit":a.credentials="same-origin",a}function e(t){if(t.ep)return;t.ep=!0;const a=r(t);fetch(t.href,a)}})();const w="45291031-b2314e04d4a4ac01a9efb8f44",L="https://pixabay.com/api/";async function d(s){const o=`${L}?key=${w}&q=${encodeURIComponent(s.query)}&image_type=photo&orientation=horizontal&safesearch=true&page=${s.page}&per_page=15`;try{const r=await h.get(o);if(r.status!==200)throw new Error("Failed to fetch images");return r.data}catch(r){return console.error(r),[]}}function S(){const s=document.querySelector(".gallery");s.innerHTML=""}function y(s){const o=document.querySelector(".gallery"),r=s.map(e=>`
            <a href="${e.largeImageURL}" class="photo-card">
                <img src="${e.webformatURL}" alt="${e.tags}" loading="lazy" />
                <div class="info">
                    <p class="info-item">
                        <b>Likes:</b> ${e.likes}
                    </p>
                    <p class="info-item">
                        <b>Views:</b> ${e.views}
                    </p>
                    <p class="info-item">
                        <b>Comments:</b> ${e.comments}
                    </p>
                    <p class="info-item">
                        <b>Downloads:</b> ${e.downloads}
                    </p>
                </div>
            </a>
        `).join("");o.insertAdjacentHTML("beforeend",r)}function q(){l.warning({title:"Warning",message:"Sorry, there are no images matching your search query. Please try again!",position:"topRight"})}let n={},u=new b(".gallery a",{captionsData:"alt",captionDelay:250});const $=document.querySelector(".search-form"),g=document.querySelector(".loader"),i=document.querySelector(".btn-load"),c=document.querySelector(".end-loader");i.addEventListener("click",async s=>{s.preventDefault(),f(),n.page=n.page+1;try{const o=await d(n);n.page*15>=o.totalHits?(i.style.display="none",c.style.display="block"):(i.style.display="block",c.style.display="none");const r=o.hits;y(r),u.refresh();const e=document.querySelector(".photo-card").getBoundingClientRect().height;window.scrollBy({top:e*2,behavior:"smooth"})}catch{l.error({title:"Error",message:"Something went wrong. Please try again later.",position:"topRight"})}finally{m()}});$.addEventListener("submit",async s=>{s.preventDefault();const o=s.target.elements.searchQuery.value.trim();if(o==="")return l.error({title:"Error",message:"Please enter a search query!",position:"topRight"});S(),f(),n={query:o,page:1};try{const r=await d(n);n.page*15>=r.totalHits?(i.style.display="none",c.style.display="block"):(i.style.display="block",c.style.display="none");const e=r.hits;e.length===0?q():(y(e),u.refresh())}catch{l.error({title:"Error",message:"Something went wrong. Please try again later.",position:"topRight"})}finally{m()}});function f(){g.style.display="block"}function m(){g.style.display="none"}
//# sourceMappingURL=commonHelpers.js.map
