import { Angler } from "./Enemy";
import { GameActor } from "./GameActor";
import { InputHandler } from "./InputHandler";
import { Player } from "./Player";
import { UI } from "./UI";

export class Game {
    width: number
    height: number
    player: Player
    input: InputHandler
    keys: string[]
    ammo: number
    ammoTimer: number
    ammoInterval: number
    maxAmmo: number
    ui: UI
    enemies: Angler[]
    anglerEnemyTimer: number
    anglerEnemyInterval: number
    gameOver: boolean
    playerScore : number
    winnigScore : number
    gameTime : number
    timeLimit : number
    constructor(width: number, height: number) {
        this.width = width;
        this.height = height;
        this.player = new Player(this)
        this.input = new InputHandler(this)
        this.keys = []
        this.ammo = 20
        this.ammoInterval = 500
        this.maxAmmo = 50
        this.ammoTimer = 0;
        this.ui = new UI(this)
        this.enemies = []
        this.gameOver = false
        this.anglerEnemyInterval = 1500
        this.anglerEnemyTimer = 0
        this.playerScore = 0
        this.winnigScore = 10
        this.gameTime = 0
        this.timeLimit = 5000
    }
    update(deltaTime: number) {
        deltaTime /= 100;
        deltaTime = Math.floor(deltaTime)
        if(!this.gameOver) this.gameTime += deltaTime
        if(this.gameTime > this.timeLimit) this.gameOver = true
        this.player.update()
        if (this.ammoTimer > this.ammoInterval) {
            if (this.ammo < this.maxAmmo) this.ammo++;
            this.ammoTimer = 0;
        } else {
            this.ammoTimer += deltaTime
        }
        this.enemies.forEach(enemy => {
            enemy.update()
        })
        this.enemies = this.enemies.filter(enemy => !enemy.markedForDelete)
        if (this.anglerEnemyTimer > this.anglerEnemyInterval && !this.gameOver) {
            this.anglerEnemyTimer = 0;
            this.addAnglerEnemy()
        } else {
            this.anglerEnemyTimer += deltaTime
        }
    }
    draw(ctx: CanvasRenderingContext2D) {
        ctx.fillStyle = 'orange'
        ctx.fillText(`${this.playerScore}` , 20 , 40)
        this.player.draw(ctx)
        this.ui.draw(ctx)
        this.enemies.forEach(enemy => {
            enemy.draw(ctx)
        })
    }
    addAnglerEnemy() {
        this.enemies.push(new Angler(this))
    }
    checkCollision(rect1: GameActor, rect2: GameActor): boolean {
        if(rect1.x > rect2.x + rect2.width || rect2.x > rect1.x + rect1.width) return false
        if(rect1.y > rect2.y + rect2.height || rect2.y > rect1.y + rect1.height) return false
        return true
    }

}