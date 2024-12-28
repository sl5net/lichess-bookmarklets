
![Screenshot_20241228_021322](https://github.com/user-attachments/assets/57659015-1f0d-470d-adad-cc08b83678ce)


```js

javascript:(function(){let rmp=true,rop=true;if(window.location.href.includes('chess.com')){const s=document.createElement('style');s.innerHTML='.highlight{background-color:red!important;opacity:1!important}';document.head.appendChild(s)}else{if(document.querySelector('cg-board')){function a(e,t,c){if(!e||!e.classList.contains(c))return;e.classList.remove('black','white',c);e.style.background=t;e.style.backgroundSize='cover';const b=e.style.backgroundImage;if(b&&b.includes('https://lichess1.org/assets/_KA7qyN/piece/')){console.log(`Piece loaded for ${e.classList.value} with ${t}`)}else{console.log(`Piece fail ${e.classList.value} with ${t}`);setTimeout(()=>a(e,t,c),100)}}function p(e,c,t){if(!e)return;e.forEach((el,i)=>{const s=i%t.length;const u=`url(https://lichess1.org/assets/_KA7qyN/piece/${t[s]}/${c[0]}P.svg)`;a(el,u,c)})}function f(){let m,pcs={black:{pawns:[],king:null,queen:null},white:{pawns:[],king:null,queen:null}},ki='url(https://static-cdn.jtvnw.net/jtv_user_pictures/67dcc3a8-669c-4670-96d1-0ad3728c3adb-profile_image-70x70.png)',qu='url(https://i.imgur.com/FhwFGbb.jpg)';let l=document.querySelector('.puzzle__feedback.play');if(l){let i=l.querySelector('.instruction em');if(i){if(i.textContent.includes('black'))m='black';else if(i.textContent.includes('white'))m='white'}if(m){pcs[m].king=document.querySelector(`.${m}.king`);pcs[m].queen=document.querySelector(`.${m}.queen`)}}if(!m){let b=document.querySelector('.cg-wrap');if(b){m=b.classList.contains('orientation-black')?'black':'white';console.log("Player:",m);pcs[m].king=document.querySelector(`.${m}.king`);pcs[m].queen=document.querySelector(`.${m}.queen`)}}if(m){pcs[m].pawns=document.querySelectorAll(`.${m}.pawn`);const om=m==='black'?'white':'black';pcs[om].pawns=document.querySelectorAll(`.${om}.pawn`);if(pcs[m].king){a(pcs[m].king,ki,m)}if(pcs[m].queen){a(pcs[m].queen,qu,m)}const sty=["cburnett","merida","alpha","chessnut","chess7","reillycraig","companion","riohacha","kosal","le%20Zigzag","fantasy","spatial","celtic","california","caliente","pixel","maestro","fresca","cardinal","gioco","tatiana","staunty","cooke","monarchy","governor","dubrovny","icpieces","mpchess","kiwen-suwi","horsey","anarcandy","shapes","letter","disguised"];if(rmp){p(Array.from(pcs[m].pawns),m,sty)}if(rop){p(Array.from(pcs[om].pawns),om,sty)}}}function b(){const p=document.querySelector('.puzzle__side__user__rating'),g=document.querySelector('.game__meta__infos');if((p&&p.querySelector('strong'))||(g&&g.querySelector('.setup')&&g.querySelector('.setup').textContent.includes('Rated'))){if(p&&p.querySelector('strong'))document.querySelector('.puzzle__side__user').style.backgroundColor='#0B3B0B';else document.querySelector('main.round').style.backgroundColor='#0B3B0B'}}function h(){const l=document.querySelectorAll('.last-move');l.forEach(el=>{if(el&&!el.style.cssText.includes('box-shadow')){el.style.cssText+='box-shadow:0 0 15px rgba(0,0,0,0.7);outline:5px solid black;background-image:linear-gradient(to bottom,rgba(255,255,0,0.5),rgba(255,255,0,0.2))'}})}f();b();const t=setInterval(function(){h();f();b()},2000);const an=document.querySelectorAll('#puzzle-toggle-autonext,label[for="puzzle-toggle-autonext"]');an.forEach(el=>el.remove())}else window.location.href='https://lichess.org/training'}})()

```


## Lichess Enhancement Bookmarklet

This bookmarklet is designed to enhance your experience on Lichess by applying custom styles to the chessboard and its pieces. It modifies the appearance of the king, queen, and pawns, as well as highlighting the last move, and adding a background to rated games.

**Functionality:**

*   **Custom King and Queen Images:** The bookmarklet replaces the default king and queen images with custom images. The king image is set to a Twitch profile icon and the queen image is set to an oil painting of the queen.
*   **Unique Pawn Styles:**  The bookmarklet replaces the pawns of both players with unique styles, cycling through a list of 35+ different chess piece styles from Lichess.
*  **Pawn Replacement Control:** You can toggle the pawns replacement for both your side and your opponent using flags at the top of the bookmarklet.
*   **Last Move Highlighting:** The bookmarklet highlights the last move on the board.
*   **Rated Game Background:** When playing a rated game, the bookmarklet changes the background of the main game area to a dark green color.
*   **Autonext Button Removal:** The bookmarklet removes the autonext button on the puzzle pages.
*  **Chess.com compatibility:** The bookmarklet adds a red highlighting to last moves when the user is on chess.com.
* **Training Redirect:** When used on any other site it will redirect the user to the Lichess training site.

**Key Features:**

*   **Dynamic Color Detection:** The bookmarklet automatically detects your color (white or black) by using the `orientation-black` class on the Lichess board.
*   **Image Replacement:** Uses CSS styling to change the appearance of the pieces.
*   **Dynamic Highlights:** It uses a set interval to highlight the last move every two seconds.
*  **Customizable:** You can change the king and queen urls easily at the beginning of the `q()` function, and the pawns can be toggled using flags at the beginning of the code.

**Technical Details:**

*   **JavaScript:** The bookmarklet is written in plain JavaScript.
*   **CSS Styling:** The bookmarklet uses inline CSS to modify the appearance of the chess pieces.
*   **Asynchronous updates:** The pawn replacement is done using loops that are executed inside the `q()` function, and the highlighting of last moves is done using an interval that runs every 2 seconds.

**Important Note:**
The bookmarklet is not persistent, meaning that you will need to activate it every time you reload a Lichess page.

**How to Use:**

1.  Copy the entire bookmarklet code.
2.  Create a new bookmark in your browser.
3.  Paste the copied code into the URL/Location field of the bookmark.
4.  Click the bookmark when you are on a Lichess game page.

