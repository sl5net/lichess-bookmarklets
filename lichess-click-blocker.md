pseudo prevent unwanted missclick:

# ctrl+left+PLUS

```js
javascript:(function(){var e=document.querySelector("cg-board");if(!e){console.error("Lichess game board element not found.");return}var clicked=false, lastX, lastY;e.addEventListener("mousedown", function(e){if(e.button===0&&!e.ctrlKey){if(!clicked){clicked=true;lastX=e.clientX;lastY=e.clientY;}else{if(Math.abs(e.clientX-lastX)<10&&Math.abs(e.clientY-lastY)<10){clicked=false;}else{e.preventDefault();e.stopPropagation();clicked=false;}}}}, true);})()
```
verhindert den zweiten Linksklick nur dann verhindert, wenn die Maus mehr als 10 Pixel bewegt wurde und nicht CTRL geklickt gedrückt ist. Wenn die Maus nicht bewegt wurde, wird der zweite Linksklick zugelassen.


1. Der Code sucht nach dem `cg-board`-Element auf der Seite und setzt einen Event-Listener auf das `mousedown`-Event.
2. Wenn ein Linksklick auf dem `cg-board`-Element erfolgt und die CTRL-Taste nicht gedrückt ist, wird die Variable `clicked` auf `true` gesetzt.
3. Wenn ein weiterer Linksklick auf dem `cg-board`-Element erfolgt und die CTRL-Taste nicht gedrückt ist, wird die Position der Maus (x- und y-Koordinaten) mit der Position des ersten Klicks verglichen.
4. Wenn die Mausposition sich um weniger als 10 Pixel von der Position des ersten Klicks unterscheidet, wird der zweite Klick zugelassen und die Variable `clicked` auf `false` gesetzt.
5. Wenn die Mausposition sich um mehr als 10 Pixel von der Position des ersten Klicks unterscheidet, wird der zweite Klick verhindert, indem die Methoden `preventDefault()` und `stopPropagation()` aufgerufen werden. Die Variable `clicked` wird auf `false` gesetzt.

Insgesamt versucht dieser Code den zweiten Linksklick auf dem `cg-board`-Element, 
wenn die Maus mehr als 10 Pixel bewegt wurde zu verhindern wenn es versehntlich passiert, 
und lässt den zweiten Klick zu, wenn die Maus nicht bewegt wurde oder CTRL gleichzeitig gedrückt wurde.

# ctrl+left

```js
javascript:(function(){var e=document.querySelector("cg-board");if(!e){console.error("Lichess game board element not found.");return}e.addEventListener("mousedown", function(e){if(e.button===0&&!e.ctrlKey){e.preventDefault();e.stopPropagation()}}, true);})()
```
Ctrl muss immer gedrück sein für links-klick
