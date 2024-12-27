
    function replaceWithInlineCss(elements, cssStyle) {
        elements.forEach((element) => {
            if (element) {
                element.classList.remove('black', 'white'); // Remove current color class
                element.style.background = cssStyle;
                element.style.backgroundSize = 'cover';
            }
        });
    }

    function replaceQueenImage() {
        const feedbackElement = document.querySelector('.puzzle__feedback.play');
        let myColor;
        const myUrl = 'url(https://static-cdn.jtvnw.net/jtv_user_pictures/67dcc3a8-669c-4670-96d1-0ad3728c3adb-profile_image-70x70.png)';

        if (feedbackElement) {
            const instructionElement = feedbackElement.querySelector('.instruction em');
            if (instructionElement) {
                if (instructionElement.textContent.includes('black')) {
                    myColor = 'black';
                } else if (instructionElement.textContent.includes('white')) {
                    myColor = 'white';
                }
            }
        }

        const myQueen = document.querySelector(`.${myColor}.queen`);
        if (myQueen) {
            replaceWithInlineCss([myQueen], myUrl);

            // Select all pawns of the same color and replace their images
            const myPawns = document.querySelectorAll(`.${myColor}.pawn`);
            replaceWithInlineCss(myPawns, myUrl);
        }

        if (!myColor) {
            const playerNameElement = document.querySelector('.player.color-icon.is.text a.user-link[href="/@/seeh"]');
            if (playerNameElement) {
                myColor = playerNameElement.parentNode.classList.contains('black') ? 'black' : 'white';
                const myQueen = document.querySelector(`.${myColor}.queen`);
                if (myQueen) {
                    replaceWithInlineCss([myQueen], myUrl);

                    // Select all pawns of the same color and replace their images
                    const myPawns = document.querySelectorAll(`.${myColor}.pawn`);
                    replaceWithInlineCss(myPawns, myUrl);
                }
            }
        }
    }

    function setRatedGameBackground() {
        const puzzleRatedElement = document.querySelector('.puzzle__side__user__rating');
        const gameMetaInfosElement = document.querySelector('.game__meta__infos');

        if ((puzzleRatedElement && puzzleRatedElement.querySelector('strong')) || 
            (gameMetaInfosElement && gameMetaInfosElement.querySelector('.setup') && 
             gameMetaInfosElement.querySelector('.setup').textContent.includes('Rated'))) {
            if (puzzleRatedElement && puzzleRatedElement.querySelector('strong')) {
                document.querySelector('.puzzle__side__user').style.backgroundColor = '#0B3B0B';
            } else {
                document.querySelector('main.round').style.backgroundColor = '#0B3B0B';
            }
        }
    }

    function addHighlightStyle(elements) {
        elements.forEach(function(element) {
            if (element) {
                element.style.cssText += 'box-shadow: 0 0 15px rgba(0,0,0,0.7); outline: 5px solid black; background-image: linear-gradient(to bottom, rgba(255,255,0,0.5), rgba(255,255,0,0.2));';
            }
        });
    }

    if (window.location.href.indexOf('chess.com') !== -1) {
        const style = document.createElement('style');
        style.innerHTML = '.highlight{background-color:red!important; opacity:1!important;}';
        document.head.appendChild(style);
    } else {
        if (document.querySelector('cg-board')) {
            replaceQueenImage();
            setRatedGameBackground();
            let clickCount = 0;
            const lastMoveSquares = document.querySelectorAll('.last-move');
            const intervalId = setInterval(function() {
                lastMoveSquares.forEach(function(square) {
                    if (!square.style.cssText.includes('box-shadow')) {
                        addHighlightStyle([square]);
                    }
                });

                // Replace the queen image again in case the page updates
                replaceQueenImage();
                setRatedGameBackground();

                // Stop the interval after a certain number of clicks or if the queen is found
                clickCount++;
                if (clickCount >= 10 || document.querySelector(`.queen`)) {
                    clearInterval(intervalId);
                }
            }, 2000);

            // Remove autonext elements
            const autonextElements = document.querySelectorAll('#puzzle-toggle-autonext, label[for="puzzle-toggle-autonext"]');
            autonextElements.forEach((element) => {
                element.remove();
            });
        } else {
            window.location.href = 'https://lichess.org/training';
        }
    }

