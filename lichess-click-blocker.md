pseudo prevent unwanted missclick:


# Lichess Deselect on Move

```js
javascript:(function(){var e=document.querySelector("cg-board");if(!e){console.error("Lichess game board element not found.");return}var lastX=null;var lastY=null;const tolerance=10;var mousemoveListener=null;e.addEventListener("mousedown",function(event){console.log("mousedown event:",event.button,"ctrlKey:",event.ctrlKey);if(event.button===0&&!event.ctrlKey){console.log("Left mouse button is down, activating mousemove listener");if(mousemoveListener)document.removeEventListener("mousemove",mousemoveListener,true);mousemoveListener=function(event){console.log("mousemove event:",event.clientX,",",event.clientY);if(!event.ctrlKey&&(lastX===null||lastY===null||Math.abs(event.clientX-lastX)>tolerance||Math.abs(event.clientY-lastY)>tolerance)){console.log("Mouse moved beyond tolerance without CTRL pressed, simulating right click and removing listener");if(mousemoveListener){document.removeEventListener("mousemove",mousemoveListener,true);mousemoveListener=null;lastX=null;lastY=null}var rect=e.getBoundingClientRect();var x=rect.left+rect.width/2;var y=rect.top+rect.height/2;var mousedownEvent=new MouseEvent('mousedown',{bubbles:true,cancelable:true,view:window,button:2,clientX:x,clientY:y,screenX:x,screenY:y});e.dispatchEvent(mousedownEvent);var mouseupEvent=new MouseEvent('mouseup',{bubbles:true,cancelable:true,view:window,button:2,clientX:x,clientY:y,screenX:x,screenY:y});e.dispatchEvent(mouseupEvent);console.log("mouseup dispatched with position");lastX=event.clientX;lastY=event.clientY}else if(lastX===null||lastY===null||Math.abs(event.clientX-lastX)>tolerance||Math.abs(event.clientY-lastY)>tolerance){console.log("Mouse moved beyond tolerance but ctrl is pressed");lastX=event.clientX;lastY=event.clientY}};document.addEventListener("mousemove",mousemoveListener,true)}},true)})()
```

How to Use:

    Copy: Copy the entire line of code above.

    Bookmarklet: Update your bookmarklet with this code.

    Lichess: Go to a game on lichess.org and activate the bookmarklet.

    Test:

        Click on a piece (left mouse button), then move the mouse by more than 10 pixels without holding the Ctrl key to trigger the simulated right-click(its for deselecting the selection) and stop tracking.

        After the right-click simulated, you should move the mouse without any further events.

        Click on a piece (left mouse button), and move the mouse while holding the Ctrl key to verify it will not trigger the right click.

        Try moving the mouse before selecting a piece (without left clicking). It will not trigger the right click (its for deselecting the selection).

        Try right clicking and it will behave normally.




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
