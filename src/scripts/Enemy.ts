import { Game } from "./Game";
import { GameActor } from "./GameActor";

export class Enemy implements GameActor{
    x: number
    y: number
    speedX: number
    markedForDelete: boolean
    width: number
    height: number
    score : number
    lives : number
    constructor(public game: Game) {
        this.x = this.game.width
        this.y = Math.random() * this.game.player.height
        this.speedX = Math.random() * -1.5 - .5
        this.markedForDelete = false
        this.width = 15
        this.height = 15
        this.lives = 5
        this.score = this.lives
    }
    update() {
        this.x += this.speedX
        if (this.x + this.game.width < 0) this.markedForDelete = true
    }

    draw(ctx: CanvasRenderingContext2D) {
        ctx.fillStyle = 'black'
        ctx.fillRect(this.x, this.y, this.width, this.height)
        ctx.fillStyle = 'yellow'
        ctx.fillText(`${this.lives}` , this.x , this.y)
    }
}
export class Angler extends Enemy {
    constructor(game: Game) {
        super(game)
        this.width = 228 * .2
        this.height = 169 * .2
        this.y = rangeRandomNumber(60 , this.game.height * .9 - this.height)
    }

}

function rangeRandomNumber(a: number, b: number) {
    let x = Math.random() * (b - a) + a
    //console.log(x);
    return x
}