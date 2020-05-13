class Field{
    constructor(element, mines = 10, width = 700, height = 700, resolution = 70){
        this.element = element;
        this.width = width;
        this.height = height;
        this.resolution = resolution;
        this.mines = mines;
        this.cols = Math.ceil(this.width / this.resolution);
        this.rows = Math.ceil(this.height / this.resolution); 
        this.element.style.height = this.height + "px";
        this.element.style.width = this.width + "px";

        this.minesweeper;
        this.minesPlaced = [];

        this.bombValue = "bomb";
        this.fontSize = 15;
        this.grassClossedColorHover = "#1F6D04";
        this.grassClossedColor = "#79bf00";
        this.grassOpenedColor = "#b6ff38";
    }

    build(){
		const field = this.generateMap()
		const fieldMined = this.placeMines(field);
		const fieldHints = this.placeHints(fieldMined);

        this.minesweeper = fieldHints;

        fields.draw(fieldHints);
    }

    defeat(){
        alert("You lose!");
        this.reset();
    }

    generateMap(){
        return new Array(this.cols).fill(null)
            .map(() => new Array(this.rows).fill(null)
                .map(function(){
                    return {
                        value: "0",
                        state: "closed"
                    };
                }));
    }

    placeMines(field){
        let mines = this.mines;
        let placed = 0;
        while(placed < mines){
            let minePlaced = false;
            for (let col = 0; col < field.length; col++) {
                if( minePlaced ){ break; }
                for (let row = 0; row < field[col].length; row++) {
                    if( minePlaced ){ break; }
                    let placeMineRandom = Math.random();
                    if( placeMineRandom < 0.00001 && minePlaced == false && field[col][row].value !== this.bombValue ){
                        field[col][row].value = this.bombValue;
                        this.minesPlaced.push({
                            i: col,
                            j: row
                        });
                        placed++;
                        minePlaced = true;
                    }
                }
            }
        }

        return field;
    }

    placeHints(field){
        for (let col = 0; col < field.length; col++) {
            for (let row = 0; row < field[col].length; row++) {
                if( field[col][row].value !== this.bombValue ){
                    let hints = 0;
                    if( row < this.rows - 1 ){
                        // TOP
                        if( field[col][row + 1].value == this.bombValue ){
                            hints += 1;
                        }
                    }
                    if( row > 0 ){
                        // DOWN
                        if( field[col][row - 1].value == this.bombValue ){
                            hints += 1;
                        }
                    }
                    if( col > 0 ){
                        // LEFT
                        if( field[col - 1][row].value == this.bombValue ){
                            hints += 1;
                        }
                    }
                    if( col < this.cols - 1 ){
                        // RIGHT
                        if( field[col + 1][row].value == this.bombValue ){
                            hints += 1;
                        }
                    }
                    if( row < this.rows - 1 && col < this.cols - 1 ){
                        // TOP LEFT
                        if( field[col + 1][row + 1].value == this.bombValue ){
                            hints += 1;
                        }
                    }
                    if( col > 0  && row < this.rows - 1  ){
                        // TOP RIGHT
                        if( field[col - 1][row + 1].value == this.bombValue ){
                            hints += 1;
                        }
                    }
                    if( row > 0 && col > 0  ){
                        // DOWN RIGHT
                        if( field[col - 1][row - 1].value == this.bombValue ){
                            hints += 1;
                        }
                    }
                    if( row > 0 && col < this.cols - 1 ){
                        // DOWN LEFT
                        if( field[col + 1][row - 1].value == this.bombValue ){
                            hints += 1;
                        }
                    }

                    if( hints == 0 ){
                        hints = " ";
                    }
    
                    field[col][row].value = hints;
                }
            }
        }

        return field;
    }

    openTile(i, j, element){
        const cell = this.minesweeper[i][j];
        
        if( cell.state == "open" ){
            return;
        }

        this.minesweeper[i][j].state = "open";

        if( cell.value == this.bombValue ){
            this.openAllTiles();
            this.defeat();
            return;
        }

        element.innerText = cell.value;
        element.style.backgroundColor = this.grassOpenedColor;

        if( cell.value == " " ){
            this.openEmptyNeighbors(i, j);
        }
    }

    openEmptyNeighbors(col, row){
        if( row < this.rows - 1 ){
            // TOP
            if( this.minesweeper[col][row + 1].value !== this.bombValue && this.minesweeper[col][row + 1].state !== "open" ){
                this.displayTile(this.minesweeper[col][row + 1], col, row + 1);
                if( this.minesweeper[col][row + 1].value == " " ){
                    this.openEmptyNeighbors(col, row + 1);
                }
            }
        }
        if( row > 0 ){
            // DOWN
            if( this.minesweeper[col][row - 1].value !== this.bombValue && this.minesweeper[col][row - 1].state !== "open" ){
                this.displayTile(this.minesweeper[col][row - 1], col, row - 1);
                if( this.minesweeper[col][row - 1].value == " " ){
                    this.openEmptyNeighbors(col, row - 1);
                }
            }
        }
        if( col > 0 ){
            // LEFT
            if( this.minesweeper[col - 1][row].value !== this.bombValue && this.minesweeper[col - 1][row].state !== "open" ){
                this.displayTile(this.minesweeper[col - 1][row], col - 1, row);
                if( this.minesweeper[col - 1][row].value == " " ){
                    this.openEmptyNeighbors(col - 1, row);
                }
            }
        }
        if( col < this.cols - 1 ){
            // RIGHT
            if( this.minesweeper[col + 1][row].value !== this.bombValue && this.minesweeper[col + 1][row].state !== "open" ){
                this.displayTile(this.minesweeper[col + 1][row], col + 1, row);
                if( this.minesweeper[col + 1][row].value == " " ){
                    this.openEmptyNeighbors(col + 1, row);
                }
            }
        }
        if( row < this.rows - 1 && col < this.cols - 1 ){
            //TOP LEFT
            if( this.minesweeper[col + 1][row + 1].value !== this.bombValue && this.minesweeper[col + 1][row + 1].state !== "open" ){
                this.displayTile(this.minesweeper[col + 1][row + 1], col + 1, row + 1);
                if( this.minesweeper[col + 1][row + 1].value == " " ){
                    this.openEmptyNeighbors(col + 1, row + 1);
                }
            }
        }
        if( col > 0  && row < this.rows - 1  ){
            // TOP RIGHT
            if( this.minesweeper[col - 1][row + 1].value !== this.bombValue && this.minesweeper[col - 1][row + 1].state !== "open" ){
                this.displayTile(this.minesweeper[col - 1][row + 1], col - 1, row + 1);
                if( this.minesweeper[col - 1][row + 1].value == " " ){
                    this.openEmptyNeighbors(col - 1, row + 1);
                }
            }
        }
        if( row > 0 && col > 0  ){
            //DOWN RIGHT
            if( this.minesweeper[col - 1][row - 1].value !== this.bombValue && this.minesweeper[col - 1][row - 1].state !== "open" ){
                this.displayTile(this.minesweeper[col - 1][row - 1], col - 1, row - 1);
                if( this.minesweeper[col - 1][row - 1].value == " " ){
                    this.openEmptyNeighbors(col - 1, row - 1);
                }
            }
        }
        if( row > 0 && col < this.cols - 1 ){
            //DOWN LEFT
            if( this.minesweeper[col + 1][row - 1].value !== this.bombValue && this.minesweeper[col + 1][row - 1].state !== "open" ){
                this.displayTile(this.minesweeper[col + 1][row - 1], col + 1, row - 1);
                if( this.minesweeper[col + 1][row - 1].value == " " ){
                    this.openEmptyNeighbors(col + 1, row - 1);
                }
            }
        }
    }

    openAllTiles(){
        const tiles = this.minesweeper;

        for (let col = 0; col < tiles.length; col++) {
            for (let row = 0; row < tiles[col].length; row++) {
                const tile = tiles[col][row];
                
                if( tile.value == this.bombValue ){
                    this.displayBomb(tile, col, row);
                }else{
                    this.displayTile(tile, col, row);
                }
            }
        }
    }

    displayTile(tile, i, j){
        this.minesweeper[i][j].state = "open";
        const element = document.getElementById("tile_" + i + "_" + j);
        element.innerText = tile.value;
        element.style.backgroundColor = this.grassOpenedColor;
    }

    displayBomb(bomb, i, j){
        const element = document.getElementById("tile_" + i + "_" + j);
        element.style.backgroundColor = this.grassOpenedColor;
        element.style.paddingTop = (( this.resolution - ( this.resolution / 2 )) / 2) + "px";
        element.innerHTML = "<img src='./images/bomb.png' style='width: " + this.resolution / 2 + "px'>";
    }

    displayAlert(i, j){
        const element = document.getElementById("tile_" + i + "_" + j);
        const tile = this.minesweeper[i][j];

        if( tile.state == "alert" ){
            tile.state = "blocked";

            element.style.paddingTop = (( this.resolution / 2 ) - this.fontSize + 5) + "px";
            element.innerHTML = " ";
        }else{
            tile.state = "alert";

            element.style.paddingTop = (( this.resolution - ( this.resolution / 2 )) / 2) + "px";
            element.innerHTML = "<img src='./images/alert.png' style='width: " + this.resolution / 2 + "px'>";
        }

        this.verifyWinning();
    }

    verifyWinning(){
        const mines = this.minesPlaced;
        const size = mines.length;
        let found = 0;

        for( var i = 0; i < size; i++ ){
            const mine = mines[i];

            if( this.minesweeper[mine.i][mine.j].state == "alert" && this.minesweeper[mine.i][mine.j].value == this.bombValue ){
                found++;
            }
        }

        if( found == size ){
            alert("You win!");
            this.reset();
        }
    }

    draw(table){
        for (let col = 0; col < table.length; col++) {
            for (let row = 0; row < table[col].length; row++) {
                const cell = table[col][row];
                
                let tile = new Tile(this.resolution, col, row).build();

                tile.addEventListener("click", (el, ev) => {
                    open(col, row, el.target);
                }, false);

                tile.addEventListener('contextmenu', function(ev) {
                    ev.preventDefault();
                    displayAlert(col, row);
                    return false;
                }, false);

                this.element.appendChild(tile);
            }
        }
    }

    reset(){
        this.minesweeper = null;
        this.minesPlaced = [];
        this.element.innerHTML = "";

        this.build();
    }
}

class Tile{
    constructor(resolution, i, j){
        this.resolution = resolution;
        this.i = i;
        this.j = j;
        this.fontSize = 15;

        this.grassClossedColorHover = "#1F6D04";
        this.grassClossedColor = "#79bf00";
        this.grassOpenedColor = "#b6ff38";
    }

    build(){
        
        let element = document.createElement("div");

        element.id = "tile_" + this.i + "_" + this.j;
        element.style.backgroundColor = this.grassClossedColor;
        element.style.float = "left";
        element.style.width = this.resolution + "px";
        element.style.height = this.resolution + "px";
        element.style.border = "1px solid";
        element.style.textAlign = "center";
        element.style.fontSize = this.fontSize;
        element.style.cursor = "pointer";
        element.style.paddingTop = (( this.resolution / 2 ) - this.fontSize + 5) + "px";

        return element;
    }
}