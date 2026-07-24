import{n as e}from"./client-BVM0hoqE.js";function t(e){return e.replace(/<br\s*\/?>/gi,` `).replace(/<[^>]+>/g,``).replace(/\s+/g,` `).trim()}function n(e){let n=e.title.english||e.title.userPreferred||e.title.romaji;return n?{id:e.idMal==null?`anilist:${e.id}`:`mal:${e.idMal}`,type:e.format===`MOVIE`?`movie`:`series`,name:n,poster:e.coverImage.extraLarge??e.coverImage.large??void 0,background:e.bannerImage??void 0,description:e.description?t(e.description):void 0,releaseInfo:e.seasonYear==null?void 0:String(e.seasonYear),imdbRating:e.averageScore==null?void 0:(e.averageScore/10).toFixed(1),country:e.countryOfOrigin??void 0,animeFormat:e.format??void 0}:null}function r(e){return n(e.media)}var i=`query ($page: Int, $perPage: Int, $sort: [MediaSort], $isAdult: Boolean) {
  Page(page: $page, perPage: $perPage) {
    media(type: ANIME, sort: $sort, isAdult: $isAdult) {
      id
      idMal
      title { romaji english native userPreferred }
      coverImage { extraLarge large medium }
      bannerImage
      format
      episodes
      averageScore
      seasonYear
      countryOfOrigin
      description
    }
  }
}`,a=`query ($ids: [Int]) {
  Page(perPage: 50) {
    media(idMal_in: $ids, type: ANIME) { idMal countryOfOrigin }
  }
}`,o=new Map;async function s(t){let n=new Map,r=[];for(let e of new Set(t)){if(!Number.isFinite(e))continue;let t=o.get(e);t?n.set(e,t):r.push(e)}for(let t=0;t<r.length;t+=50){let i=r.slice(t,t+50);try{let t=await e(a,{ids:i},void 0,!0);for(let e of t?.Page?.media??[])e.idMal!=null&&e.countryOfOrigin&&(o.set(e.idMal,e.countryOfOrigin),n.set(e.idMal,e.countryOfOrigin))}catch{}}return n}var c=`query ($q: String, $perPage: Int) {
  Page(perPage: $perPage) {
    media(search: $q, type: ANIME, sort: SEARCH_MATCH) {
      id
      idMal
      title { romaji english }
      coverImage { extraLarge large }
      bannerImage
      seasonYear
      averageScore
      description
      countryOfOrigin
    }
  }
}`;async function l(t,n=8){let r=t.trim();if(r.length<2)return[];try{return((await e(c,{q:r,perPage:n},void 0,!0))?.Page?.media??[]).map(e=>({anilistId:e.id,malId:e.idMal??null,name:e.title.english?.trim()||e.title.romaji?.trim()||`Untitled`,year:e.seasonYear?String(e.seasonYear):null,poster:e.coverImage?.extraLarge??e.coverImage?.large??null,background:e.bannerImage??null,overview:(e.description??``).replace(/<[^>]+>/g,``).trim(),score:e.averageScore?e.averageScore/10:0}))}catch{return[]}}async function u(t,r){let a=Math.min(50,r),o=Math.ceil(r/a),s=await Promise.all(Array.from({length:o},(n,r)=>e(i,{page:r+1,perPage:a,sort:[t],isAdult:!1},void 0,!1).catch(()=>null))),c=[],l=new Set;for(let e of s)for(let t of e?.Page?.media??[]){let e=n(t);!e||l.has(e.id)||(l.add(e.id),c.push(e))}return c.slice(0,r)}var d=`query ($id: Int) {
  Media(id: $id, type: ANIME) {
    bannerImage
    coverImage { extraLarge }
  }
}`,f=new Map;async function p(t){let n=f.get(t);if(n)return n;try{let n=await e(d,{id:t},void 0,!0),r={banner:n?.Media?.bannerImage??void 0,cover:n?.Media?.coverImage?.extraLarge??void 0};return f.set(t,r),r}catch{let e={};return f.set(t,e),e}}var m=`query ($mal: Int) {
  Media(idMal: $mal, type: ANIME) {
    id
    bannerImage
    coverImage { extraLarge }
  }
}`,h=new Map;async function g(t){let n=h.get(t);if(n)return n;try{let n=await e(m,{mal:t},void 0,!0),r={id:n?.Media?.id??void 0,banner:n?.Media?.bannerImage??void 0,cover:n?.Media?.coverImage?.extraLarge??void 0};return h.set(t,r),r}catch{let e={};return h.set(t,e),e}}var _=`query ($id: Int) {
  Media(id: $id, type: ANIME) {
    recommendations(sort: RATING_DESC, perPage: 24) {
      nodes {
        mediaRecommendation {
          id
          idMal
          title { romaji english native userPreferred }
          coverImage { extraLarge large medium }
          bannerImage
          format
          episodes
          averageScore
          seasonYear
          countryOfOrigin
          description
        }
      }
    }
  }
}`,v=new Map;async function y(t){if(!t)return[];let r=v.get(t);if(r)return r;try{let r=await e(_,{id:t},void 0,!0),i=[],a=new Set;for(let e of r?.Media?.recommendations?.nodes??[]){if(!e.mediaRecommendation)continue;let t=n(e.mediaRecommendation);!t||a.has(t.id)||(a.add(t.id),i.push(t))}return v.set(t,i),i}catch{return[]}}function b(e=100){return u(`SCORE_DESC`,e)}function x(e=40){return u(`TRENDING_DESC`,e)}export{y as a,r as c,s as i,n as l,p as n,b as o,g as r,x as s,l as t};