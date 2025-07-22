import{a as m,i as u,S as $}from"./assets/vendor-Dy2ZTtfi.js";(function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const e of document.querySelectorAll('link[rel="modulepreload"]'))a(e);new MutationObserver(e=>{for(const o of e)if(o.type==="childList")for(const n of o.addedNodes)n.tagName==="LINK"&&n.rel==="modulepreload"&&a(n)}).observe(document,{childList:!0,subtree:!0});function s(e){const o={};return e.integrity&&(o.integrity=e.integrity),e.referrerPolicy&&(o.referrerPolicy=e.referrerPolicy),e.crossOrigin==="use-credentials"?o.credentials="include":e.crossOrigin==="anonymous"?o.credentials="omit":o.credentials="same-origin",o}function a(e){if(e.ep)return;e.ep=!0;const o=s(e);fetch(e.href,o)}})();m.defaults.baseURL="https://pixabay.com/api";const f=async(r,t)=>{try{const s=await m.get("/",{params:{key:"51392413-3a9fe7039391cca55c3ec30ee",q:r.trim().toLowerCase(),image_type:"photo",orientation:"horizontal",safesearch:!0,page:t,per_page:15}});return s.data.hits.length===0&&u.info({message:"Sorry, there are no images matching your search query. Please try again!",position:"topRight"}),s.data}catch(s){console.error(s)}},d=document.querySelector(".gallery"),p=document.querySelector(".loader"),y=document.querySelector(".load-more-btn"),h=new $(".gallery a",{captionsData:"alt",captionDelay:250}),g=r=>r.map(({webformatURL:t,largeImageURL:s,tags:a,likes:e,views:o,comments:n,downloads:P})=>`
    <li class="gallery-item">
	<a class="gallery-link" href="${s}">
		<img 
		  class="gallery-image" 
		  src="${t}"
		   alt="${a}"
       loading="lazy"
		/>
	</a>
  <ul class="statistic-list">
  <li>Likes
  <p>${e}
  </p>
  </li>
  <li>Views
  <p>${o}
  </p>
  </li>
  <li>Comments
  <p>${n}
  </p>
  </li>
  <li>Downloads
  <p>${P}
  </p>
  </li>
  </ul>
</li>
  `).join(""),H=r=>{const t=g(r);d.innerHTML=t,h.refresh()},O=r=>{const t=g(r);d.insertAdjacentHTML("beforeend",t),h.refresh()},x=()=>{d.innerHTML=""},L=()=>!p.classList.contains("visually-hidden"),v=()=>{L()||p.classList.remove("visually-hidden")},b=()=>{L()&&p.classList.add("visually-hidden")},M=()=>!y.classList.contains("visually-hidden"),w=()=>{M()||y.classList.remove("visually-hidden")},C=()=>{M&&y.classList.add("visually-hidden")},E=()=>{const r=d.querySelector(".gallery-item");return r===null?0:r.getBoundingClientRect().height},R=document.querySelector(".form"),q=document.querySelector(".load-more-btn"),T=15;let i=1,l="",c=null,S=null;R.addEventListener("submit",async r=>{if(r.preventDefault(),i=1,l=r.currentTarget.elements["search-text"].value.trim(),l.length===0)u.warning({message:"Please enter data",position:"topRight"});else{x(),v();try{const t=await f(l,i),{hits:s,total:a,totalHits:e}=t;c=Math.ceil(e/T),H(s),S=E(),i<c&&(w(),q.addEventListener("click",B))}catch(t){console.error(t)}finally{b()}}});const B=async r=>{r.target.blur(),i+=1;try{C(),v();const t=await f(l,i),{hits:s,total:a,totalHits:e}=t;O(s)}catch(t){console.error(t)}finally{b(),scrollBy({top:S*2,behavior:"smooth"}),i<c&&w(),i===c&&(u.info({message:"We're sorry, but you've reached the end of search results.",position:"topRight"}),q.removeEventListener("click",B))}};
//# sourceMappingURL=index.js.map
