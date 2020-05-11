class Field{
    constructor(canvas, mines = 10, width = 700, height = 700, resolution = 70){
        this.canvas = canvas;
        this.width = width;
        this.height = height;
        this.resolution = resolution;
        this.mines = mines;
        this.cols = Math.ceil(this.width / this.resolution);
        this.rows = Math.ceil(this.height / this.resolution); 
        this.ctx = this.canvas.getContext('2d');
        this.canvas.height = this.height;
        this.canvas.width = this.width;

        this.bombValue = "bomb";
        this.fontSize = 15;
    }

    generateMap(){
        return new Array(this.cols).fill(null)
            .map(() => new Array(this.rows).fill(null)
                .map(() => 0));
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
                    if( placeMineRandom < 0.00001 && minePlaced == false ){
                        field[col][row] = this.bombValue;
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
                if( field[col][row] !== this.bombValue ){
                    let hints = 0;
                    if( col !== this.cols ){
                        // TOP
                        if( field[col][row + 1] == this.bombValue ){
                            hints += 1;
                        }
                    }
                    if( row !== 0 ){
                        // DOWN
                        if( field[col][row - 1] == this.bombValue ){
                            hints += 1;
                        }
                    }
                    if( col !== 0 ){
                        // LEFT
                        if( field[col - 1][row] == this.bombValue ){
                            hints += 1;
                        }
                    }
                    if( col !== this.cols - 1 ){
                        // RIGHT
                        if( field[col + 1][row] == this.bombValue ){
                            hints += 1;
                        }
                    }
                    if( col !== this.cols - 1 && row !== this.rows - 1 ){
                        // TOP LEFT
                        if( field[col + 1][row + 1] == this.bombValue ){
                            hints += 1;
                        }
                    }
                    if( col !== 0 && row !== this.rows - 1 ){
                        // TOP RIGHT
                        if( field[col - 1][row + 1] == this.bombValue ){
                            hints += 1;
                        }
                    }
                    if( col !== 0 && row !== 0 ){
                        // DOWN RIGHT
                        if( field[col - 1][row - 1] == this.bombValue ){
                            hints += 1;
                        }
                    }
                    if( col !== this.cols - 1 && row !== 0 ){
                        // DOWN LEFT
                        if( field[col + 1][row - 1] == this.bombValue ){
                            hints += 1;
                        }
                    }

                    if( hints == 0 ){
                        hints = " ";
                    }
    
                    field[col][row] = hints;
                }
            }
        }

        return field;
    }

    draw(table){
        for (let col = 0; col < table.length; col++) {
            for (let row = 0; row < table[col].length; row++) {
                const cell = table[col][row];
                
                this.ctx.beginPath();
                this.ctx.font = this.fontSize + 'px Arial';
                this.ctx.textAlign = "center";
                if( cell == this.bombValue ){
                    this.ctx.fillStyle = 'black';
                }else{
                    this.ctx.fillStyle = 'white';
                }
                this.ctx.strokeRect(col * this.resolution, row * this.resolution, this.resolution, this.resolution);
                this.ctx.strokeText(cell, Math.ceil( ((col * this.resolution) + (this.resolution / 2) ) ) , Math.ceil( ((row * this.resolution) + ((this.resolution / 2) + (this.fontSize / 2))) ) );
            }
        }
    }

}