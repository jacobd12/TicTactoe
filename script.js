//Make sure SW are supported
if ('serviceWorker' in navigator){
    window.addEventListener('load', function () {
        navigator.serviceWorker.register('sw.js').then(function (registration) {
            //Registration was successful
            console.log('Service Worker: Registered', registration.scope);
        }, function (err) {
            //Registration failed
            console.log('Service Worker: Error', err);
        });
        });
    }

const reset = "  ";
//define winning combinations:
// check for empty qElements for possible AI turn choice.
const winningCombos = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [2, 4, 6],
        [0, 4, 8]
    ];

// Replacing 'q' class with an empty string to get only q value.
    const grid = () => Array.from(document.getElementsByClassName('q'));
    const qNumId = (qEl) => Number.parseInt(qEl.id.replace('q', ''));
    const emptyQs = () => grid().filter(_qEl => _qEl.innerText === '');
    const allSame = (arr) => arr.every(_qEl => _qEl.innerText === arr[0].innerText && _qEl.innerText !== '');


    const takeTurn = (index, letter) => grid()[index].innerText = letter;
    const opponentChoice = () => qNumId(emptyQs()[Math.floor(Math.random() * emptyQs().length)]); //random quadrant picked for AI turn.


    const endGame = (winningSequence) => {
        winningSequence.forEach(_qEl => _qEl.classList.add('winner'));
        disableListeners();

    };
    const resetBoard = (winningCombos) => {
        winningCombos.forEach(_qEl => _qEl.innerText = reset);
        resetBoard();
    };
    const checkForVictory = () => {
        let victory = false;
        winningCombos.forEach(_c => {
            const _grid = grid();
            const sequence = [_grid[_c[0]], _grid[_c[1]], _grid[_c[2]]];
            if (allSame(sequence)) {
                victory = true;
                endGame(sequence);
            }
        });
        return victory;
    };

        const opponentTurn = () => {
        disableListeners();
        setTimeout (() => {
        takeTurn(opponentChoice(), 'o');
        if (!checkForVictory())
            enableListeners();
    }, 1000);
};
        const clickFn = ($event) => {
            takeTurn(qNumId($event.target), 'x');
            if (!checkForVictory())
                opponentTurn();
        };



     const enableListeners = () => grid().forEach(_qElement => _qElement.addEventListener('click', clickFn));
     const disableListeners = () => grid().forEach(_qElement => _qElement.removeEventListener('click', clickFn));

        enableListeners();
