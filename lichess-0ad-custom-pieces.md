

```js

javascript:(function(){let rmp=true,rop=true;if(window.location.href.includes('chess.com')){const s=document.createElement('style');s.innerHTML='.highlight{background-color:red!important;opacity:1!important}';document.head.appendChild(s)}else{if(document.querySelector('cg-board')){function a(e,t,c){if(!e||!e.classList.contains(c))return;e.classList.remove('black','white',c);e.style.background=t;e.style.backgroundSize='cover';const b=e.style.backgroundImage;if(b&&b.includes('https://lichess1.org/assets/_KA7qyN/piece/')){console.log(`Piece loaded for ${e.classList.value} with ${t}`)}else{console.log(`Piece fail ${e.classList.value} with ${t}`);setTimeout(()=>a(e,t,c),100)}}function p(e,c,t){if(!e)return;e.forEach((el,i)=>{const s=i%t.length;const u=`url(https://lichess1.org/assets/_KA7qyN/piece/${t[s]}/${c[0]}P.svg)`;a(el,u,c)})}function f(){let m,pcs={black:{pawns:[],king:null,queen:null},white:{pawns:[],king:null,queen:null}},ki='url(https://github.com/0ad-matters/0ad-counter-unit-guide/blob/trunk/app/src/main/res/drawable/rome_hero_scipio.png?raw=true)',qu='url(https://github.com/0ad-matters/0ad-counter-unit-guide/blob/trunk/app/src/main/res/drawable/maur_champion_maiden_archer.png?raw=true)',ram='url(https://github.com/0ad-matters/0ad-counter-unit-guide/blob/trunk/app/src/main/res/drawable/athen_siege_ram.png?raw=true)';let l=document.querySelector('.puzzle__feedback.play');if(l){let i=l.querySelector('.instruction em');if(i){if(i.textContent.includes('black'))m='black';else if(i.textContent.includes('white'))m='white'}if(m){pcs[m].king=document.querySelector(`.${m}.king`);pcs[m].queen=document.querySelector(`.${m}.queen`)}}if(!m){let b=document.querySelector('.cg-wrap');if(b){m=b.classList.contains('orientation-black')?'black':'white';console.log("Player:",m);pcs[m].king=document.querySelector(`.${m}.king`);pcs[m].queen=document.querySelector(`.${m}.queen`)}}if(m){pcs[m].pawns=document.querySelectorAll(`.${m}.pawn`);const om=m==='black'?'white':'black';pcs[om].pawns=document.querySelectorAll(`.${om}.pawn`);if(pcs[m].king){a(pcs[m].king,ki,m)}if(pcs[m].queen){a(pcs[m].queen,qu,m)}const sty=["cburnett","merida","alpha","chessnut","chess7","reillycraig","companion","riohacha","kosal","le%20Zigzag","fantasy","spatial","celtic","california","caliente","pixel","maestro","fresca","cardinal","gioco","tatiana","staunty","cooke","monarchy","governor","dubrovny","icpieces","mpchess","kiwen-suwi","horsey","anarcandy","shapes","letter","disguised"];if(rmp){const firstPawn=Array.from(pcs[m].pawns)[0];if(firstPawn){a(firstPawn,ram,m)};p(Array.from(pcs[m].pawns).slice(1),m,sty)}if(rop){p(Array.from(pcs[om].pawns),om,sty)}}}function b(){const p=document.querySelector('.puzzle__side__user__rating'),g=document.querySelector('.game__meta__infos');if((p&&p.querySelector('strong'))||(g&&g.querySelector('.setup')&&g.querySelector('.setup').textContent.includes('Rated'))){if(p&&p.querySelector('strong'))document.querySelector('.puzzle__side__user').style.backgroundColor='#0B3B0B';else%20document.querySelector('main.round').style.backgroundColor='#0B3B0B'}}function%20h(){const%20l=document.querySelectorAll('.last-move');l.forEach(el=>{if(el&&!el.style.cssText.includes('box-shadow')){el.style.cssText+='box-shadow:0%200%2015px%20rgba(0,0,0,0.7);outline:5px%20solid%20black;background-image:linear-gradient(to%20bottom,rgba(255,255,0,0.5),rgba(255,255,0,0.2))'}})}f();b();const%20t=setInterval(function(){h();f();b()},2000);const%20an=document.querySelectorAll('#puzzle-toggle-autonext,label[for="puzzle-toggle-autonext"]');an.forEach(el=>el.remove())}else%20window.location.href='https://lichess.org/training'}})()

```

Key Changes:

    Updated ki and qu Variables:

        ki now uses the URL: https://github.com/0ad-matters/0ad-counter-unit-guide/blob/trunk/app/src/main/res/drawable/rome_hero_scipio.png?raw=true for the king.

        qu now uses the URL: https://github.com/0ad-matters/0ad-counter-unit-guide/blob/trunk/app/src/main/res/drawable/maur_champion_maiden_archer.png?raw=true for the queen.

        Important: added ?raw=true to the URL to get the raw image content directly.

How to Use:

    Copy the updated code into your browser's address bar (after removing the javascript: prefix).

king should now have the Scipio image, the queen should have the maiden archer image and the first pawn should have the siege ram image. Other pawns should be themed.
