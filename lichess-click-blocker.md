pseudo prevent unwanted missclick:

# motivation
at 2:41:21 https://www.youtube.com/watch?v=LezA67JandM&t=9681s

# use default when time is less than 1m50s (or CTRL pressed).

```js
javascript:(function(){const board=document.querySelector("cg-board");if(!board){console.error("Board not found");return;}function playSound(t){const a=new(window.AudioContext||window.webkitAudioContext);const o=a.createOscillator();const g=a.createGain();o.connect(g);g.connect(a.destination);o.type='sine';o.frequency.value=440;g.gain.value=0.1;o.start();setTimeout(()=>o.stop(),t);}let lx=null,ly=null,px=null,py=null,tol=14,ml=null,lct=0,dct=500,tid=null,cr=true,mtmid=null,nps=true;board.addEventListener("mousedown",function(e){let m=null,p=document.querySelector('.puzzle__feedback.play');if(p){let i=p.querySelector('.instruction em');if(i){if(i.textContent.includes('black'))m='black';else if(i.textContent.includes('white'))m='white';}}if(!m){const b=document.querySelector('.cg-wrap');if(b)m=b.classList.contains('orientation-black')?'black':'white';}if(!m){console.error("Could not determine the player's color.");return;}let c=`.rclock-${m}`,clockElement=document.querySelector(c);let totalSeconds = 9999;if(clockElement){let timeDiv=clockElement.querySelector('.time');let mi=timeDiv?parseInt(timeDiv.childNodes[0].textContent,10)||0:NaN,se=timeDiv?parseInt(timeDiv.childNodes[2].textContent,10)||0:NaN,te=timeDiv?clockElement.querySelector('tenths'):null,ten=te?parseInt(te.childNodes[0].textContent,10)||0:NaN;totalSeconds = isNaN(mi) ? 9999 : mi * 60 + se + (isNaN(ten) ? 0 : ten / 10);}if (e.button===0){if((Number.isInteger(totalSeconds) && totalSeconds > 1 && totalSeconds < 110) || e.ctrlKey) return;const ct=new Date().getTime();const td=ct-lct;const dx=Math.abs(e.clientX-px);const dy=Math.abs(e.clientY-py);if(nps===null&&td<dct&&dx<=tol&&dy<=tol&&px!==null&&py!==null){playSound(600);console.log("Double click");if(ml)board.removeEventListener("mousemove",ml,true);clearTimeout(tid);clearTimeout(mtmid);lct=0;lx=null;ly=null;px=null;py=null;nps=true;return;}else{lct=ct;}px=lx;py=ly;lx=e.clientX;ly=e.clientY;nps=null;console.log("nps:",nps);console.log("Left button down, activating mm listener");if(ml)board.removeEventListener("mousemove",ml,true);mtmid=setTimeout(function(){ml=function(e){const cc=cr?!e.ctrlKey:true,dx=lx===null?0:Math.abs(e.clientX-lx),dy=ly===null?0:Math.abs(e.clientY-ly);if(nps===null&&cc&&(lx!==null&&ly!==null&&(dx>tol||dy>tol))){console.log("Mouse moved beyond tolerance"+(cr?" without CTRL":"")+", simulating right click");nps=true;console.log("nps:",nps);tid=setTimeout(function(){if(ml){board.removeEventListener("mousemove",ml,true);ml=null;lx=null;ly=null;px=null;py=null;}const r=board.getBoundingClientRect();const x=r.left+r.width/2;const y=r.top+r.height/2;const mde=new MouseEvent('mousedown',{bubbles:true,cancelable:true,view:window,button:2,clientX:x,clientY:y,screenX:x,screenY:y});board.dispatchEvent(mde);const mue=new MouseEvent('mouseup',{bubbles:true,cancelable:true,view:window,button:2,clientX:x,clientY:y,screenX:x,screenY:y});board.dispatchEvent(mue);console.log("mouseup dispatched");},50);}else if(lx===null||ly===null||dx>tol||dy>tol){console.log("Mouse moved beyond tolerance, but ctrl condition is not met");lx=e.clientX;ly=e.clientY;}};board.addEventListener("mousemove",ml,true);},20);}},true);})();
```

Variables and their purpose:

    board: reference to the chessboard element.

    playSound: function to create an audio tone.

    lx, ly, px, py: variables to store the mouse position for mouse move calculations.

    tol: pixel tolerance to check if mouse has moved.

    ml: variable which points to the mousemove event listener function.

    lct: last click time (for double click detection).

    dct: double click time tolerance.

    tid: settimeout ID.

    cr: variable which determines if CTRL key is required to activate the custom behavior (set to true by default which means CTRL key is not required).

    mtmid: settimeout ID for double click detection

    nps: variable used for double click detection.

    m: player color ('black' or 'white').

    p: variable to select the puzzle feedback element.

    i: variable to select the instruction element.

    b: variable to select the cg-wrap element.

    c: a string used to create the clock element selector (e.g. .rclock-black or .rclock-white).

    clockElement: the element containing the clock.

    timeDiv: The element containing the time.

    mi: minutes remaining.

    se: seconds remaining.

    te: tenths element.

    ten: tenths remaining.

    totalSeconds: the total seconds remaining.


# when time is < 1m50s works normal again
```js
javascript:(function(){const board=document.querySelector("cg-board");if(!board){console.error("Board not found");return;}function playSound(t){const a=new(window.AudioContext||window.webkitAudioContext);const o=a.createOscillator();const g=a.createGain();o.connect(g);g.connect(a.destination);o.type='sine';o.frequency.value=440;g.gain.value=0.1;o.start();setTimeout(()=>o.stop(),t);}let lx=null,ly=null,px=null,py=null,tol=14,ml=null,lct=0,dct=500,tid=null,cr=true,mtmid=null,nps=true;board.addEventListener("mousedown",function(e){let m=null,p=document.querySelector('.puzzle__feedback.play');if(p){let i=p.querySelector('.instruction em');if(i){if(i.textContent.includes('black'))m='black';else if(i.textContent.includes('white'))m='white';}}if(!m){const b=document.querySelector('.cg-wrap');if(b)m=b.classList.contains('orientation-black')?'black':'white';}if(!m){console.error("Could not determine the player's color.");return;}let c=`.rclock-${m}`,clockElement=document.querySelector(c);if(!clockElement){console.error(`Could not find clock element for ${m} player.`);return;}let timeDiv=clockElement.querySelector('.time');if(!timeDiv){console.error("Could not find time div within the clock element.");return;}let mi=parseInt(timeDiv.childNodes[0].textContent,10)||0,se=parseInt(timeDiv.childNodes[2].textContent,10)||0,te=clockElement.querySelector('tenths'),ten=te?parseInt(te.childNodes[0].textContent,10)||0:0;let totalSeconds = mi * 60 + se + ten / 10;if (e.button===0){if(totalSeconds < 110 || e.ctrlKey) return;const ct=new Date().getTime();const td=ct-lct;const dx=Math.abs(e.clientX-px);const dy=Math.abs(e.clientY-py);if(nps===null&&td<dct&&dx<=tol&&dy<=tol&&px!==null&&py!==null){playSound(600);console.log("Double click");if(ml)board.removeEventListener("mousemove",ml,true);clearTimeout(tid);clearTimeout(mtmid);lct=0;lx=null;ly=null;px=null;py=null;nps=true;return;}else{lct=ct;}px=lx;py=ly;lx=e.clientX;ly=e.clientY;nps=null;console.log("nps:",nps);console.log("Left button down, activating mm listener");if(ml)board.removeEventListener("mousemove",ml,true);mtmid=setTimeout(function(){ml=function(e){const cc=cr?!e.ctrlKey:true,dx=lx===null?0:Math.abs(e.clientX-lx),dy=ly===null?0:Math.abs(e.clientY-ly);if(nps===null&&cc&&(lx!==null&&ly!==null&&(dx>tol||dy>tol))){console.log("Mouse moved beyond tolerance"+(cr?" without CTRL":"")+", simulating right click");nps=true;console.log("nps:",nps);tid=setTimeout(function(){if(ml){board.removeEventListener("mousemove",ml,true);ml=null;lx=null;ly=null;px=null;py=null;}const r=board.getBoundingClientRect();const x=r.left+r.width/2;const y=r.top+r.height/2;const mde=new MouseEvent('mousedown',{bubbles:true,cancelable:true,view:window,button:2,clientX:x,clientY:y,screenX:x,screenY:y});board.dispatchEvent(mde);const mue=new MouseEvent('mouseup',{bubbles:true,cancelable:true,view:window,button:2,clientX:x,clientY:y,screenX:x,screenY:y});board.dispatchEvent(mue);console.log("mouseup dispatched");},50);}else if(lx===null||ly===null||dx>tol||dy>tol){console.log("Mouse moved beyond tolerance, but ctrl condition is not met");lx=e.clientX;ly=e.clientY;}};board.addEventListener("mousemove",ml,true);},20);}},true);})();
```


# Deselect on Move (ctrl or doubleClick v5) and beep when doubleClick detected

## very short names
```js
javascript:(function(){const b=document.querySelector("cg-board");if(!b){console.error("Board not found");return;}function p(t){const a=new(window.AudioContext||window.webkitAudioContext);const o=a.createOscillator();const g=a.createGain();o.connect(g);g.connect(a.destination);o.type='sine';o.frequency.value=440;g.gain.value=0.1;o.start();setTimeout(()=>o.stop(),t);}let lx=null,ly=null,px=null,py=null,tol=14,ml=null,lct=0,dct=500,tid=null,cr=true,mtmid=null,nps=true;b.addEventListener("mousedown",function(e){if(e.button===0){const ct=new Date().getTime();const td=ct-lct;const dx=Math.abs(e.clientX-px);const dy=Math.abs(e.clientY-py);if(nps===null&&td<dct&&dx<=tol&&dy<=tol&&px!==null&&py!==null){p(600);console.log("Double click");if(ml)b.removeEventListener("mousemove",ml,true);clearTimeout(tid);clearTimeout(mtmid);lct=0;lx=null;ly=null;px=null;py=null;nps=true;return;}else{lct=ct;}px=lx;py=ly;lx=e.clientX;ly=e.clientY;nps=null;console.log("nps:",nps);console.log("Left button down, activating mm listener");if(ml)b.removeEventListener("mousemove",ml,true);mtmid=setTimeout(function(){ml=function(e){const cc=cr?!e.ctrlKey:true,dx=lx===null?0:Math.abs(e.clientX-lx),dy=ly===null?0:Math.abs(e.clientY-ly);if(nps===null&&cc&&(lx!==null&&ly!==null&&(dx>tol||dy>tol))){console.log("Mouse moved beyond tolerance"+(cr?" without CTRL":"")+", simulating right click");nps=true;console.log("nps:",nps);tid=setTimeout(function(){if(ml){b.removeEventListener("mousemove",ml,true);ml=null;lx=null;ly=null;px=null;py=null;}const r=b.getBoundingClientRect();const x=r.left+r.width/2;const y=r.top+r.height/2;const mde=new MouseEvent('mousedown',{bubbles:true,cancelable:true,view:window,button:2,clientX:x,clientY:y,screenX:x,screenY:y});b.dispatchEvent(mde);const mue=new MouseEvent('mouseup',{bubbles:true,cancelable:true,view:window,button:2,clientX:x,clientY:y,screenX:x,screenY:y});b.dispatchEvent(mue);console.log("mouseup dispatched");},50);}else if(lx===null||ly===null||dx>tol||dy>tol){console.log("Mouse moved beyond tolerance, but ctrl condition is not met");lx=e.clientX;ly=e.clientY;}};b.addEventListener("mousemove",ml,true);},20);}},true);})();
```
## readable names
```js
javascript:(function(){var e=document.querySelector("cg-board");if(!e){console.error("Lichess game board element not found.");return;}function beep(s){const audioCtx=new(window.AudioContext||window.webkitAudioContext)();const oscillator=audioCtx.createOscillator();const gainNode=audioCtx.createGain();oscillator.connect(gainNode);gainNode.connect(audioCtx.destination);oscillator.type='sine';oscillator.frequency.value=440;gainNode.gain.value=0.1;oscillator.start();setTimeout(()=>oscillator.stop(),s);}var lastX=null;var lastY=null;var prevX=null;var prevY=null;const tolerance=14;var mousemoveListener=null;var lastClickTime=0;const doubleClickTime=500;var timeoutId;const ctrlRequired=true;var mousemoveTimeoutId;var noPieceSelected=true;e.addEventListener("mousedown",function(event){if(event.button===0){const currentTime=new Date().getTime();const timeDiff=currentTime-lastClickTime;const distX=Math.abs(event.clientX-prevX);const distY=Math.abs(event.clientY-prevY);if(noPieceSelected===null&&timeDiff<doubleClickTime&&distX<=tolerance&&distY<=tolerance&&prevX!==null&&prevY!==null){beep(600);console.log("Double click detected");if(mousemoveListener)document.removeEventListener("mousemove",mousemoveListener,true);clearTimeout(timeoutId);clearTimeout(mousemoveTimeoutId);lastClickTime=0;lastX=null;lastY=null;prevX=null;prevY=null;noPieceSelected=true;return;}else{lastClickTime=currentTime;}prevX=lastX;prevY=lastY;lastX=event.clientX;lastY=event.clientY;noPieceSelected=null;console.log("noPieceSelected:",noPieceSelected);console.log("Left mouse button is down, activating mousemove listener after timeout");if(mousemoveListener)document.removeEventListener("mousemove",mousemoveListener,true);mousemoveTimeoutId=setTimeout(function(){mousemoveListener=function(event){const ctrlCheck=ctrlRequired?!event.ctrlKey:true;const distX=lastX===null?0:Math.abs(event.clientX-lastX);const distY=lastY===null?0:Math.abs(event.clientY-lastY);if(noPieceSelected===null&&ctrlCheck&&(lastX!==null&&lastY!==null&&(distX>tolerance||distY>tolerance))){console.log("Mouse moved beyond tolerance"+(ctrlRequired?" without CTRL":"")+",simulating right click and removing listener after timeout");noPieceSelected=true;console.log("noPieceSelected:",noPieceSelected);timeoutId=setTimeout(function(){if(mousemoveListener){document.removeEventListener("mousemove",mousemoveListener,true);mousemoveListener=null;lastX=null;lastY=null;prevX=null;prevY=null;}var rect=e.getBoundingClientRect();var x=rect.left+rect.width/2;var y=rect.top+rect.height/2;var mousedownEvent=new MouseEvent('mousedown',{bubbles:true,cancelable:true,view:window,button:2,clientX:x,clientY:y,screenX:x,screenY:y});e.dispatchEvent(mousedownEvent);var mouseupEvent=new MouseEvent('mouseup',{bubbles:true,cancelable:true,view:window,button:2,clientX:x,clientY:y,screenX:x,screenY:y});e.dispatchEvent(mouseupEvent);console.log("mouseup dispatched");},50);}else if(lastX===null||lastY===null||distX>tolerance||distY>tolerance){console.log("Mouse moved beyond tolerance, but ctrl condition is not meet");lastX=event.clientX;lastY=event.clientY;}};document.addEventListener("mousemove",mousemoveListener,true);},20);}},true);})();
```

1.  **Simulated Right-Click:** After a left-click on a piece, if the mouse is moved beyond a certain tolerance, a simulated right-click is triggered.
2.  **Double-Click Detection:** If two clicks occur within a short time and within a small pixel distance to a already clicked place, a beep sound is played, indicating a double-click. This is useful for allow a leftClick.
3. Correct Doubleclick detection: The script uses the `noPieceSelected` flag to determine if a move has begun. Doubleclicks are only registered if a move has begun.

**Problems and Solutions (History of the Code):**

*   **Problem 2:** Double-clicks were detected even when they shouldn't have been (e.g., two quick clicks on an empty board).
*   **Solution 2 (noPieceSelected Flag):** A `noPieceSelected` flag was added to track whether a piece had been selected (left-clicked). Double-clicks are only registered if a piece has been selected.
*   **Problem 3:** Double-clicks were still sometimes detected incorrectly because the time of the previous click was not reset correctly.
*   **Solution 3 (Resetting lastClickTime):** The time of the last click is now reset under certain conditions to ensure correct double-click detection.
*   **Problem 4:** It was possible to "cheat" and trigger a click by moving the mouse very quickly, bypassing the mousemove detection.
*   **Solution 4:** The timeout for the mousemove listener was set to 20miliseconds.
*   **Problem 5:** The pixel tolerance value was too high, causing unwanted right-clicks.
*   **Solution 5 (Reduced pixel Tolerance):** The tolerance value was reduced to 14 pixels (you can adjust this value as needed).
*   **Problem 6:** Doubleclicks where detected without a first click.
*   **Solution 6 (prevX and prevY) :** The script remembers the previous click position and only registers a double click if the previous click position exists and is within the tolerance.

**Well-Formatted and Commented Code:**


```js
javascript: (function () {
    // Select the chessboard element.
    const boardElement = document.querySelector("cg-board");
    if (!boardElement) {
        console.error("Lichess game board element not found.");
        return;
    }

    // Function to play a beep sound.
    function beep(duration) {
        const audioCtx = new (window.AudioContext || window.webkitAudioContext)();
        const oscillator = audioCtx.createOscillator();
        const gainNode = audioCtx.createGain();
        oscillator.connect(gainNode);
        gainNode.connect(audioCtx.destination);
        oscillator.type = 'sine';
        oscillator.frequency.value = 440;
        gainNode.gain.value = 0.1;
        oscillator.start();
        setTimeout(() => oscillator.stop(), duration);
    }

    // Variables to track mouse position and click times.
    let lastX = null;        // X-coordinate of the last mouse click.
    let lastY = null;        // Y-coordinate of the last mouse click.
    let prevX = null;       // X-coordinate of the previous mouse click.
    let prevY = null;       // Y-coordinate of the previous mouse click.
    const tolerance = 14;     // Tolerance for mouse movement (pixels).
    let mousemoveListener = null; // Mousemove event listener.
    let lastClickTime = 0;   // Time of the last click.
    const doubleClickTime = 500; // Time window for double-click (milliseconds).
    let timeoutId;          // Timeout ID for simulated right-click.
    const ctrlRequired = true; // Whether CTRL key must be pressed for right-click.
    let noPieceSelected = true; // Flag to indicate if a piece has been selected.

    // Add mousedown event listener to the chessboard.
    boardElement.addEventListener("mousedown", function (event) {
        console.log("mousedown event:", event.button, "ctrlKey:", event.ctrlKey);

        // Check if it's the left mouse button.
        if (event.button === 0) {
            const currentTime = new Date().getTime();
            const timeDiff = currentTime - lastClickTime;
            const distX = Math.abs(event.clientX - prevX);
            const distY = Math.abs(event.clientY - prevY);

            // Check for double-click.
            if (noPieceSelected === null && timeDiff < doubleClickTime && distX <= tolerance && distY <= tolerance && prevX !== null && prevY !== null) {
                beep(600);
                console.log("Double click detected");

                // Clean up event listeners and timeouts.
                if (mousemoveListener) document.removeEventListener("mousemove", mousemoveListener, true);
                clearTimeout(timeoutId);
                clearTimeout(mousemoveTimeoutId);

                // Reset variables.
                lastClickTime = 0;
                lastX = null;
                lastY = null;
                prevX = null;
                prevY = null;
                noPieceSelected = true;
                return; // Prevent further processing of this mousedown event.
            } else {
                lastClickTime = currentTime;
            }

            // Set flag, store click coordinates.
            prevX = lastX;
            prevY = lastY;
            lastX = event.clientX;
            lastY = event.clientY;
            noPieceSelected = null;
            console.log("noPieceSelected:", noPieceSelected);
            console.log("Left mouse button is down, activating mousemove listener");

            // Remove existing listener (if any) and attach a new one.
            if (mousemoveListener) document.removeEventListener("mousemove", mousemoveListener, true);
            mousemoveListener = function (event) {
                const ctrlCheck = ctrlRequired ? !event.ctrlKey : true;
                const distX = lastX === null ? 0 : Math.abs(event.clientX - lastX);
                const distY = lastY === null ? 0 : Math.abs(event.clientY - lastY);

                // Check if mouse moved beyond tolerance (and CTRL condition).
                if (noPieceSelected === null && ctrlCheck && (lastX !== null && lastY !== null && (distX > tolerance || distY > tolerance))) {
                    console.log("Mouse moved beyond tolerance" + (ctrlRequired ? " without CTRL" : "") + ", simulating right click and removing listener");
                    noPieceSelected = true;
                    console.log("noPieceSelected:", noPieceSelected);

                    timeoutId = setTimeout(function () {
                        if (mousemoveListener) {
                            document.removeEventListener("mousemove", mousemoveListener, true);
                            mousemoveListener = null;
                            lastX = null;
                            lastY = null;
                            prevX = null;
                            prevY = null;
                        }

                        // Simulate right-click at the center of the board.
                        const rect = boardElement.getBoundingClientRect();
                        const x = rect.left + rect.width / 2;
                        const y = rect.top + rect.height / 2;
                        const mousedownEvent = new MouseEvent('mousedown', { bubbles: true, cancelable: true, view: window, button: 2, clientX: x, clientY: y, screenX: x, screenY: y });
                        boardElement.dispatchEvent(mousedownEvent);
                        const mouseupEvent = new MouseEvent('mouseup', { bubbles: true, cancelable: true, view: window, button: 2, clientX: x, clientY: y, screenX: x, screenY: y });
                        boardElement.dispatchEvent(mouseupEvent);
                        console.log("mouseup dispatched");
                    }, 50);
                } else if (lastX === null || lastY === null || distX > tolerance || distY > tolerance) {
                    console.log("
.....
.....
.....

```



# Lichess Deselect on Move (ctrl or doubleClick v4) and beep when doubleClick detected
```js

javascript:(function(){var e=document.querySelector("cg-board");if(!e){console.error("Lichess game board element not found.");return}function beep(s) {const audioCtx = new (window.AudioContext || window.webkitAudioContext)();const oscillator = audioCtx.createOscillator();const gainNode = audioCtx.createGain();oscillator.connect(gainNode);gainNode.connect(audioCtx.destination);oscillator.type = 'sine';oscillator.frequency.value = 440;gainNode.gain.value = 0.1;oscillator.start();setTimeout(() => oscillator.stop(), s);}var lastX=null;var lastY=null;const tolerance=30;var mousemoveListener=null;var lastClickTime=0;const doubleClickTime=500;var timeoutId;const ctrlRequired=true;var mousemoveTimeoutId;e.addEventListener("mousedown",function(event){console.log("mousedown event:",event.button,"ctrlKey:",event.ctrlKey);if(event.button===0){const currentTime=new Date().getTime();const timeDiff=currentTime-lastClickTime;if(timeDiff<doubleClickTime){beep(600);console.log("Double click detected");if(mousemoveListener)document.removeEventListener("mousemove",mousemoveListener,true);clearTimeout(timeoutId);clearTimeout(mousemoveTimeoutId);lastClickTime=0;return}console.log("Left mouse button is down, activating mousemove listener after timeout");if(mousemoveListener)document.removeEventListener("mousemove",mousemoveListener,true);mousemoveTimeoutId=setTimeout(function(){mousemoveListener=function(event){console.log("mousemove event:",event.clientX,",",event.clientY);const ctrlCheck=ctrlRequired?!event.ctrlKey:true;const distX=lastX===null?0:Math.abs(event.clientX-lastX);const distY=lastY===null?0:Math.abs(event.clientY-lastY);if(ctrlCheck&&(lastX!==null&&lastY!==null&&(distX>tolerance||distY>tolerance))){console.log("Mouse moved beyond tolerance"+(ctrlRequired?" without CTRL":"")+", simulating right click and removing listener after timeout");timeoutId=setTimeout(function(){if(mousemoveListener){document.removeEventListener("mousemove",mousemoveListener,true);mousemoveListener=null;lastX=null;lastY=null;}var rect=e.getBoundingClientRect();var x=rect.left+rect.width/2;var y=rect.top+rect.height/2;var mousedownEvent=new MouseEvent('mousedown',{bubbles:true,cancelable:true,view:window,button:2,clientX:x,clientY:y,screenX:x,screenY:y});e.dispatchEvent(mousedownEvent);var mouseupEvent=new MouseEvent('mouseup',{bubbles:true,cancelable:true,view:window,button:2,clientX:x,clientY:y,screenX:x,screenY:y});e.dispatchEvent(mouseupEvent);console.log("mouseup dispatched with position, distX:",distX,", distY:",distY);lastX=event.clientX;lastY=event.clientY},50)}else if(lastX===null||lastY===null||distX>tolerance||distY>tolerance){console.log("Mouse moved beyond tolerance, but ctrl condition is not meet, distX:",distX,", distY:",distY);lastX=event.clientX;lastY=event.clientY}};document.addEventListener("mousemove",mousemoveListener,true)},100);lastClickTime=currentTime;lastX=event.clientX;lastY=event.clientY}},true)})()
```

# Lichess Deselect on Move (ctrl or doubleClick v3)
```js
javascript:(function(){var e=document.querySelector("cg-board");if(!e){console.error("Lichess game board element not found.");return}var lastX=null;var lastY=null;const tolerance=30;var mousemoveListener=null;var lastClickTime=0;const doubleClickTime=500;var timeoutId;const ctrlRequired=true;var mousemoveTimeoutId;e.addEventListener("mousedown",function(event){console.log("mousedown event:",event.button,"ctrlKey:",event.ctrlKey);if(event.button===0){const currentTime=new Date().getTime();const timeDiff=currentTime-lastClickTime;if(timeDiff<doubleClickTime){console.log("Double click detected");if(mousemoveListener)document.removeEventListener("mousemove",mousemoveListener,true);clearTimeout(timeoutId);clearTimeout(mousemoveTimeoutId);lastClickTime=0;return}console.log("Left mouse button is down, activating mousemove listener after timeout");if(mousemoveListener)document.removeEventListener("mousemove",mousemoveListener,true);mousemoveTimeoutId=setTimeout(function(){mousemoveListener=function(event){console.log("mousemove event:",event.clientX,",",event.clientY);const ctrlCheck=ctrlRequired?!event.ctrlKey:true;const distX=lastX===null?0:Math.abs(event.clientX-lastX);const distY=lastY===null?0:Math.abs(event.clientY-lastY);if(ctrlCheck&&(lastX!==null&&lastY!==null&&(distX>tolerance||distY>tolerance))){console.log("Mouse moved beyond tolerance"+(ctrlRequired?" without CTRL":"")+", simulating right click and removing listener after timeout");timeoutId=setTimeout(function(){if(mousemoveListener){document.removeEventListener("mousemove",mousemoveListener,true);mousemoveListener=null;lastX=null;lastY=null}var rect=e.getBoundingClientRect();var x=rect.left+rect.width/2;var y=rect.top+rect.height/2;var mousedownEvent=new MouseEvent('mousedown',{bubbles:true,cancelable:true,view:window,button:2,clientX:x,clientY:y,screenX:x,screenY:y});e.dispatchEvent(mousedownEvent);var mouseupEvent=new MouseEvent('mouseup',{bubbles:true,cancelable:true,view:window,button:2,clientX:x,clientY:y,screenX:x,screenY:y});e.dispatchEvent(mouseupEvent);console.log("mouseup dispatched with position, distX:",distX,", distY:",distY);lastX=event.clientX;lastY=event.clientY},50)}else if(lastX===null||lastY===null||distX>tolerance||distY>tolerance){console.log("Mouse moved beyond tolerance, but ctrl condition is not meet, distX:",distX,", distY:",distY);lastX=event.clientX;lastY=event.clientY}};document.addEventListener("mousemove",mousemoveListener,true)},100);lastClickTime=currentTime;lastX=event.clientX;lastY=event.clientY}},true)})()
```

# Lichess Deselect on Move (ctrl or doubleClick v2)
```js
javascript:(function(){var e=document.querySelector("cg-board");if(!e){console.error("Lichess game board element not found.");return}var lastX=null;var lastY=null;const tolerance=15;var mousemoveListener=null;var lastClickTime=0;const doubleClickTime=500;var timeoutId;const ctrlRequired=true;var mousemoveTimeoutId;e.addEventListener("mousedown",function(event){console.log("mousedown event:",event.button,"ctrlKey:",event.ctrlKey);if(event.button===0){const currentTime=new Date().getTime();const timeDiff=currentTime-lastClickTime;if(timeDiff<doubleClickTime){console.log("Double click detected");if(mousemoveListener)document.removeEventListener("mousemove",mousemoveListener,true);clearTimeout(timeoutId);clearTimeout(mousemoveTimeoutId);lastClickTime=0;return}console.log("Left mouse button is down, activating mousemove listener after timeout");if(mousemoveListener)document.removeEventListener("mousemove",mousemoveListener,true);mousemoveTimeoutId=setTimeout(function(){mousemoveListener=function(event){console.log("mousemove event:",event.clientX,",",event.clientY);const ctrlCheck=ctrlRequired?!event.ctrlKey:true;if(ctrlCheck&&(lastX===null||lastY===null||Math.abs(event.clientX-lastX)>tolerance||Math.abs(event.clientY-lastY)>tolerance)){console.log("Mouse moved beyond tolerance"+(ctrlRequired?" without CTRL":"")+", simulating right click and removing listener after timeout");timeoutId=setTimeout(function(){if(mousemoveListener){document.removeEventListener("mousemove",mousemoveListener,true);mousemoveListener=null;lastX=null;lastY=null}var rect=e.getBoundingClientRect();var x=rect.left+rect.width/2;var y=rect.top+rect.height/2;var mousedownEvent=new MouseEvent('mousedown',{bubbles:true,cancelable:true,view:window,button:2,clientX:x,clientY:y,screenX:x,screenY:y});e.dispatchEvent(mousedownEvent);var mouseupEvent=new MouseEvent('mouseup',{bubbles:true,cancelable:true,view:window,button:2,clientX:x,clientY:y,screenX:x,screenY:y});e.dispatchEvent(mouseupEvent);console.log("mouseup dispatched with position");lastX=event.clientX;lastY=event.clientY},50)}else if(lastX===null||lastY===null||Math.abs(event.clientX-lastX)>tolerance||Math.abs(event.clientY-lastY)>tolerance){console.log("Mouse moved beyond tolerance, but ctrl condition is not meet");lastX=event.clientX;lastY=event.clientY}};document.addEventListener("mousemove",mousemoveListener,true)},100);lastClickTime=currentTime}},true)})()
```

# Lichess Deselect on Move (ctrl or doubleClick v1)

```js
javascript:(function(){var e=document.querySelector("cg-board");if(!e){console.error("Lichess game board element not found.");return}var lastX=null;var lastY=null;const tolerance=15;var mousemoveListener=null;var lastClickTime=0;const doubleClickTime=500;var timeoutId;const ctrlRequired=true;e.addEventListener("mousedown",function(event){console.log("mousedown event:",event.button,"ctrlKey:",event.ctrlKey);if(event.button===0){const currentTime=new Date().getTime();const timeDiff=currentTime-lastClickTime;if(timeDiff<doubleClickTime){console.log("Double click detected");if(mousemoveListener)document.removeEventListener("mousemove",mousemoveListener,true);clearTimeout(timeoutId);lastClickTime=0;return}console.log("Left mouse button is down, activating mousemove listener");if(mousemoveListener)document.removeEventListener("mousemove",mousemoveListener,true);mousemoveListener=function(event){console.log("mousemove event:",event.clientX,",",event.clientY);const ctrlCheck=ctrlRequired?!event.ctrlKey:true;if(ctrlCheck&&(lastX===null||lastY===null||Math.abs(event.clientX-lastX)>tolerance||Math.abs(event.clientY-lastY)>tolerance)){console.log("Mouse moved beyond tolerance"+(ctrlRequired?" without CTRL":"")+", simulating right click and removing listener after timeout");timeoutId=setTimeout(function(){if(mousemoveListener){document.removeEventListener("mousemove",mousemoveListener,true);mousemoveListener=null;lastX=null;lastY=null}var rect=e.getBoundingClientRect();var x=rect.left+rect.width/2;var y=rect.top+rect.height/2;var mousedownEvent=new MouseEvent('mousedown',{bubbles:true,cancelable:true,view:window,button:2,clientX:x,clientY:y,screenX:x,screenY:y});e.dispatchEvent(mousedownEvent);var mouseupEvent=new MouseEvent('mouseup',{bubbles:true,cancelable:true,view:window,button:2,clientX:x,clientY:y,screenX:x,screenY:y});e.dispatchEvent(mouseupEvent);console.log("mouseup dispatched with position");lastX=event.clientX;lastY=event.clientY},50)}else if(lastX===null||lastY===null||Math.abs(event.clientX-lastX)>tolerance||Math.abs(event.clientY-lastY)>tolerance){console.log("Mouse moved beyond tolerance, but ctrl condition is not meet");lastX=event.clientX;lastY=event.clientY}};document.addEventListener("mousemove",mousemoveListener,true);lastClickTime=currentTime}},true)})()
```



# Lichess Deselect on Move (move by CTRL+LeftClick)

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
