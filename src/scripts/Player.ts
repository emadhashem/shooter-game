import { Game } from "./Game";
import { GameActor } from "./GameActor";
import { Projectile } from "./Projectile";

export class Player implements GameActor {
    game: Game
    width: number
    height: number
    x: number
    y: number
    speedY: number
    maxSpeed: number
    projectiles: Projectile[]
    constructor(game: Game) {
        this.game = game
        this.width = 120
        this.height = 190
        this.x = 20
        this.y = 100
        this.speedY = 0
        this.maxSpeed = 5
        this.projectiles = []
    }
    update() {
        if (this.game.keys.includes('ArrowUp')) this.speedY = -this.maxSpeed
        else if (this.game.keys.includes('ArrowDown')) this.speedY = this.maxSpeed
        else this.speedY = 0;
        this.y += this.speedY
        if (this.y < 0) this.y = 0;
        if (this.y + this.height > this.game.height) this.y = this.game.height - this.height;
        this.projectiles.forEach(projectile => {
            projectile.update()
            for (let enemy of this.game.enemies) {
                if (this.game.checkCollision(this, enemy)) {
                    enemy.markedForDelete = true
                    break
                }
                if (this.game.checkCollision(enemy, projectile)) {
                    projectile.markForDeletion = true
                    enemy.lives--;
                    if (enemy.lives <= 0) {
                        this.game.playerScore += enemy.score
                        enemy.markedForDelete = true
                        if(this.game.playerScore > this.game.winnigScore) {
                            this.game.gameOver = true
                        }
                    }
                    break
                }
            }

        })
        this.projectiles = this.projectiles.filter(item => !item.markForDeletion)
    }
    draw(ctx: CanvasRenderingContext2D) {
        ctx.fillStyle = 'red'
        ctx.fillRect(this.x, this.y, this.width, this.height)
        this.projectiles.forEach(projectile => {
            projectile.draw(ctx)
        })
    }
    shootTop() {
        if (this.game.ammo > 0) {
            this.projectiles.push(new Projectile(this.game, this.width / 2 + this.width / 4, this.y + 30))
        }
        this.game.ammo--
    }
    shootFire() {
        if (this.game.ammo >= 15) {
            this.projectiles.push(new Projectile(this.game, this.width / 2 + this.width / 4, this.y + 30, true))
        }
        this.game.ammo -= 15;
    }
}