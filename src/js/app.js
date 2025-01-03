import { Player } from "./player.js";

let canvas;
let ctx;

// Game loop variables.
let fps = 60;
let interval = 1000 / fps;
let lastTime = 0;
let scale = 1;

let player;

window.addEventListener("DOMContentLoaded", () => {

    // Get HTML access.
    canvas = document.getElementById("game-canvas");
    ctx = canvas.getContext("2d");

    // Set canvas initial size.
    canvas.width = 400;
    canvas.height = 400;

    let princessIdle = new Image();
    princessIdle.src = "./src/img/princess-idle.png";

    let princessWalk = new Image();
    princessWalk.src = "./src/img/princess-walk.png";

    let princessSlash = new Image();
    princessSlash.src = "./src/img/princess-slash.png";

    let princessSlash2 = new Image();
    princessSlash2.src = "./src/img/princess-slash2.png";

    let princessRoll = new Image();
    princessRoll.src = "./src/img/princess-roll.png";

    let princessCry = new Image();
    princessCry.src = "./src/img/princess-cry.png";

    let princessBlink = new Image();
    princessBlink.src = "./src/img/princess-blink.png";

    let princessDecline = new Image();
    princessDecline.src = "./src/img/princess-decline.png";

    let princessApprove = new Image();
    princessApprove.src = "./src/img/princess-approve.png";

    let princessDown = new Image();
    princessDown.src = "./src/img/princess-down.png";

    let princessHit = new Image();
    princessHit.src = "./src/img/princess-hit.png";

    let princessThrow = new Image();
    princessThrow.src = "./src/img/princess-throw.png";

    let princessAnimationsSrc = {
        idle: princessIdle,
        walk: princessWalk,
        slash: princessSlash,
        slash2: princessSlash2,
        roll: princessRoll,
        cry: princessCry,
        blink: princessBlink,
        decline: princessDecline,
        approve: princessApprove,
        down: princessDown,
        hit: princessHit,
        throw: princessThrow
    }

    player = new Player(
        princessAnimationsSrc, // Object with all images source.
        200 - 128, 200 - 128, // X and Y coordinates on canvas.
        64, 64 // Width and Height.
    );

    // Start game loop.
    requestAnimationFrame(gameLoopController);
    enablePlayerControllers();
});

function enablePlayerControllers() {

    window.addEventListener("keydown", (e) => {

        if (e.key === "w") player.wPressed = true;
        if (e.key === "s") player.sPressed = true;
        if (e.key === "a") player.aPressed = true;
        if (e.key === "d") player.dPressed = true;
        if (e.key === " ") player.spacePressed = true;
        if (e.key === "Enter") player.enterPressed = true;
    });

    window.addEventListener("keyup", (e) => {

        if (e.key === "w") player.wPressed = false;
        if (e.key === "s") player.sPressed = false;
        if (e.key === "a") player.aPressed = false;
        if (e.key === "d") player.dPressed = false;
        if (e.key === " ") player.spacePressed = false;
        if (e.key === "Enter") player.enterPressed = false;
    });
}

// This function is used to control the frame rate.
function gameLoopController(time) {

    // Check ellapsed time since last frame.
    const deltaTime = time - lastTime;
    if (deltaTime > interval) {
        lastTime = time - (deltaTime % interval); // Reset time.
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        ctx.scale(scale, scale);
        gameLoop(); // Call the real game loop.
        ctx.setTransform(1, 0, 0, 1, 0, 0);
    }

    // Call next frame.
    requestAnimationFrame(gameLoopController);
}

function gameLoop() {

    player.playerController(ctx);
}