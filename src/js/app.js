import { Player } from "./player.js";
import { VCam } from "./vCam.js";
import { princessSRC, redSRC, loadPrincessSRC, loadElfSRC } from "./assetsLoader.js";

let canvas;
let ctx;

// Game loop variables.
let fps = 60;
let interval = 1000 / fps;
let lastTime = 0;
let scale = 1;

let player;
let vCam;

window.addEventListener("DOMContentLoaded", () => {

    // Get HTML access.
    canvas = document.getElementById("game-canvas");
    ctx = canvas.getContext("2d");

    // Set canvas initial size.
    canvas.width = 400;
    canvas.height = 400;

    loadPrincessSRC();
    loadElfSRC();

    player = new Player(
        princessSRC, // Object with all images source.
        200 - 128, 200 - 128, // X and Y coordinates on canvas.
        64, 64 // Width and Height.
    );

    vCam = new VCam(12, canvas, player);

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

    vCam.track(ctx, canvas, scale);

    ctx.fillStyle = "blue";
    ctx.fillRect(canvas.width / 2 - 120, canvas.height / 2 - 120, 120, 120);

    player.playerController(ctx);
}