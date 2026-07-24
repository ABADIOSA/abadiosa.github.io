import{c as e}from"./anime-detect--eOB2BTu.js";import{n as t}from"./client-BVM0hoqE.js";var n=`query ($id: Int) {
  Media(id: $id, type: ANIME) {
    relations {
      edges {
        relationType(version: 2)
        node {
          id
          format
          episodes
          status
          averageScore
          seasonYear
          title { english romaji userPreferred }
          coverImage { large }
          bannerImage
          startDate { year month day }
        }
      }
    }
  }
}`,r=new Set([`SEQUEL`,`PREQUEL`,`PARENT`,`SIDE_STORY`]),i=6,a=40,o=new Map;async function s(e){let r=o.get(e);if(r)return r;try{let r=(await t(n,{id:e},void 0,!0))?.Media?.relations?.edges??[];return o.set(e,r),r}catch{return o.set(e,[]),[]}}function c(e){if(!e?.year)return;let t=String(e.month??1).padStart(2,`0`),n=String(e.day??1).padStart(2,`0`);return`${e.year}-${t}-${n}`}function l(e){return{id:e.id,name:(e.title.english??e.title.romaji??e.title.userPreferred??``).trim(),type:e.format===`MOVIE`?`movie`:`series`,format:e.format??void 0,poster:e.coverImage?.large??void 0,banner:e.bannerImage??void 0,episodes:e.episodes??void 0,year:e.seasonYear??e.startDate?.year??void 0,startDate:c(e.startDate),rating:typeof e.averageScore==`number`&&e.averageScore>0?(e.averageScore/10).toFixed(1):void 0,upcoming:e.status===`NOT_YET_RELEASED`}}async function u(t){let n=await e(t).catch(()=>null);if(!n)return[];let o=new Map,c=new Set([n]),u=[n],d=0;for(;u.length>0&&d<i&&o.size<a;){let e=await Promise.all(u.map(e=>s(e))),t=[];for(let n of e)for(let e of n){if(!e.relationType||!r.has(e.relationType))continue;let n=e.node;if(!n||n.id==null||c.has(n.id))continue;c.add(n.id);let i=l(n);i.name&&o.set(n.id,i),t.push(n.id)}u=t,d++}return[...o.values()]}export{u as t};