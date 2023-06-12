import { Game } from "./scripts/Game"

window.addEventListener('load' , () => {
    const canvas = document.getElementById('canvas1') as HTMLCanvasElement
    canvas.width = 500
    canvas.height = 500
    const ctx = canvas.getContext('2d')
    if(!ctx) {
        return
    }
    const game = new Game(canvas.width , canvas.height)
    let lastTime = 0;
    function animate(timeStamp : DOMHighResTimeStamp) {
        const deltaTime = timeStamp - lastTime
        if(!ctx) return
        ctx.clearRect(0 , 0 , canvas.width , canvas.height)
        game.update(deltaTime)
        game.draw(ctx)
        requestAnimationFrame(animate)
    }
    animate(0)
})