const memoryGame = {
    tileCount: 20,
    tileOnRow: 5,
    divBoard: null,
    tiles: [],
    tilesChecked: [],
    tilesImg: [
        'img/1.png',
        'img/2.png',
        'img/3.png',
        'img/4.png',
        'img/5.png',
        'img/6.png',
        'img/7.png',
        'img/8.png',
        'img/9.png',
        'img/10.png',

    ],
    canGet: true,
    tilePairs: 0,
    time: 0,
    startTime: false,
    int: '',


    tileClick(e) {
        if (this.canGet) {
            if (!this.tilesChecked[0] || (this.tilesChecked[0].dataset.index !== e.target.dataset.index)) {
                this.tilesChecked.push(e.target);
                e.target.style.backgroundImage = 'url(' + this.tilesImg[e.target.dataset.cardType] + ')';
            }

            if (this.tilesChecked.length === 2) {
                this.canGet = false;

                if (this.tilesChecked[0].dataset.cardType === this.tilesChecked[1].dataset.cardType) {
                    setTimeout(this.deleteTiles.bind(this), 500);
                } else {
                    setTimeout(this.resetTiles.bind(this), 500);
                }
            }
        }
    },

    deleteTiles() {
        this.tilesChecked[0].remove();
        this.tilesChecked[1].remove();

        this.canGet = true;
        this.tilesChecked = [];

        this.tilePairs++;
        if (this.tilePairs >= this.tileCount / 2) {
            clearInterval(this.int);
            time = 0;
            alert('Udało ci się odgadnąć wszystkie obrazki');
        }
    },

    resetTiles() {
        this.tilesChecked[0].style.backgroundImage = null;
        this.tilesChecked[1].style.backgroundImage = null;

        this.tilesChecked = [];
        this.canGet = true;
    },


    getTime() {
        this.time++;
        const result = document.querySelector('.stopwatch');
        result.textContent = (this.time / 100).toFixed(2) +
            "s";


    },

    stopWatch() {
        if (this.startTime) {
            this.startTime = !this.startTime;
            this.int = setInterval(this.getTime.bind(this), 10)
        } else {
            this.startTime = !this.startTime;
            clearInterval(this.int);
        }
    },



    startGame() {

        this.divBoard = document.querySelector('.table');
        this.divBoard.innerHTML = '';



        this.tiles = [];
        this.tilesChecked = [];
        this.canGet = true;
        this.tilePairs = 0;
        this.time = 0;
        this.startTime = false;


        for (let i = 0; i < this.tileCount; i++) {
            this.tiles.push(Math.floor(i / 2));
        }


        for (let i = this.tileCount - 1; i > 0; i--) {
            const swap = Math.floor(Math.random() * i);
            const tmp = this.tiles[i];
            this.tiles[i] = this.tiles[swap];
            this.tiles[swap] = tmp;
        }

        for (let i = 0; i < this.tileCount; i++) {
            const tile = document.createElement('div');
            tile.classList.add("tile");
            this.divBoard.appendChild(tile);

            tile.dataset.cardType = this.tiles[i];
            tile.dataset.index = i;

            tile.style.left = 5 + (tile.offsetWidth + 10) * (i % this.tileOnRow) + 'px'
            tile.style.top = 5 + (tile.offsetHeight + 10) * (Math.floor(i / this.tileOnRow)) + 'px';

            tile.addEventListener('click', this.tileClick.bind(this));
            this.stopWatch();
        }
    }
}

document.addEventListener('DOMContentLoaded', () => {
    const startBtn = document.querySelector('.game-start');
    startBtn.addEventListener('click', () => memoryGame.startGame());
});