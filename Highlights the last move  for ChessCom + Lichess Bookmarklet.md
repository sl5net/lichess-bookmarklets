

+ Highlights the last move in Chess.com and Lichess
+ Replaces the queen image with a custom image
+ Sets a rated game background color in Lichess
+ Removes the "Autonext" button in Lichess
+ Redirects to the Lichess training page if not on a puzzle or game page or chessCom

**How to use:**

1. Create a new bookmark in your browser
2. Copy the bookmarklet code and paste it into the URL field
3. Click on the bookmarklet to activate it (maybe click a sconond time)
4. The bookmarklet will automatically detect whether you are on Chess.com or Lichess.org and apply the corresponding features

**Note:**

* The custom queen image used in this bookmarklet is hosted on a third-party server and may not be available at all times.
* This bookmarklet is provided as-is and may not be supported or updated in the future.

```js

javascript:(function(){if(window.location.href.indexOf('chess.com')!==-1){const style=document.createElement('style');style.innerHTML='.highlight{background-color:red!important;opacity:1!important;}';document.head.appendChild(style);}else{if(document.querySelector('cg-board')){function replaceWithInlineCss(elements,cssStyle){elements.forEach((element)=>{if(element){element.classList.remove('black','white');element.style.background=cssStyle;element.style.backgroundSize='cover';}});}function replaceQueenImage(){const feedbackElement=document.querySelector('.puzzle__feedback.play');let myColor;const myUrl='url(https://sl5.de/wp-content/uploads/2021/04/sl5net_r8_c04_16col_trans_w100_oil.gif)';if(feedbackElement){const instructionElement=feedbackElement.querySelector('.instruction em');if(instructionElement){if(instructionElement.textContent.includes('black')){myColor='black';}else if(instructionElement.textContent.includes('white')){myColor='white';}}const myQueen=document.querySelector(`.${myColor}.queen`);if(myQueen){replaceWithInlineCss([myQueen],myUrl);}}if(!myColor){const playerNameElement=document.querySelector('.player.color-icon.is.text a.user-link[href="/@/seeh"]');if(playerNameElement){myColor=playerNameElement.parentNode.classList.contains('black')?'black':'white';const myQueen=document.querySelector(`.${myColor}.queen`);if(myQueen){replaceWithInlineCss([myQueen],myUrl);}}}}function setRatedGameBackground(){const puzzleRatedElement=document.querySelector('.puzzle__side__user__rating');const gameMetaInfosElement=document.querySelector('.game__meta__infos');if((puzzleRatedElement&&puzzleRatedElement.querySelector('strong'))||(gameMetaInfosElement&&gameMetaInfosElement.querySelector('.setup')&&gameMetaInfosElement.querySelector('.setup').textContent.includes('Rated'))){if(puzzleRatedElement&&puzzleRatedElement.querySelector('strong')){document.querySelector('.puzzle__side__user').style.backgroundColor='#0B3B0B';}else{document.querySelector('main.round').style.backgroundColor='#0B3B0B';}}}replaceQueenImage();setRatedGameBackground();let%20clickCount=0;function%20addHighlightStyle(elements){elements.forEach(function(element){if(element){element.style.cssText+='box-shadow:0%200%2015px%20rgba(0,0,0,0.7);outline:5px%20solid%20black;background-image:linear-gradient(to%20bottom,rgba(255,255,0,0.5),rgba(255,255,0,0.2));'}});}const%20lastMoveSquares=document.querySelectorAll('.last-move');const%20intervalId=setInterval(function(){lastMoveSquares.forEach(function(square){if(!square.style.cssText.includes('box-shadow')){addHighlightStyle([square]);}});replaceQueenImage();setRatedGameBackground();},2000);const%20autonextElements=document.querySelectorAll('#puzzle-toggle-autonext,label[for="puzzle-toggle-autonext"]');autonextElements.forEach((element)=>{element.remove();});}else{window.location.href='https://lichess.org/training';}}})();

```
