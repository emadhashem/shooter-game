import { Game } from "./Game";
import { GameActor } from "./GameActor";

export class Projectile implements GameActor {
    width  :number
    height : number
    speed : number
    markForDeletion : boolean
    constructor(public game : Game , public x : number , public y : number, public fire : boolean = false) {
        this.width = 10
        this.height = 3
        this.speed = 3
        this.markForDeletion = false
    }
    update() {
        this.x += this.speed
        if(this.x > this.game.width * 0.8) this.markForDeletion = true  
    }
    draw(ctx : CanvasRenderingContext2D) {
        if(this.fire) {
            ctx.fillStyle = 'orange'
            ctx.fillRect(this.x , this.y , this.width * 3 , this.height * 3)
        } else {
            ctx.fillStyle = 'yellow'
            ctx.fillRect(this.x , this.y , this.width , this.height)
        }
            
    }
}