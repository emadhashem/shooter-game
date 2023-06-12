import { Game } from "./Game";

export class UI {
    fontSize : number
    fontFamily : string
    color : string
    constructor(public game : Game) {
        this.fontFamily = 'Helvetica'
        this.fontSize = 25
        this.color = 'red'
    }

    draw(ctx : CanvasRenderingContext2D) {
        // timer 
        ctx.fillStyle = 'white'
        ctx.fillText('Timer ' + `${this.game.gameTime}`, 20 , 90)
        ctx.fillStyle = this.color
        for(let i = 0; i < this.game.ammo; i++) {
            ctx.fillRect(20 + 5 * i , 50 , 3 , 20);
        }
    }
}