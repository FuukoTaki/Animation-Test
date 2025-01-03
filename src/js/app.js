import { Sprite } from "./sprite.js";

let canvas;
let ctx;

// Game loop variables.
let fps = 60;
let interval = 1000 / fps;
let lastTime = 0;
let scale = 1;

let sprite;
let direction = "right";
let animationDirection = "Front";
let wPressed = false;
let sPressed = false;
let aPressed = false;
let dPressed = false;
let isRolling = false;
let isAttacking = false;

window.addEventListener("DOMContentLoaded", () => {

    // Get HTML access.
    canvas = document.getElementById("game-canvas");
    ctx = canvas.getContext("2d");
    ctx.imageRendering = "crisp-edges";
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

    sprite = new Sprite(
        princessAnimationsSrc, // Object with all images source.
        200 - 128, 200 - 128, // X and Y coordinates on canvas.
        64, 64 // Width and Height.
    );

    canvas.addEventListener("click", (e) => {

        if (sprite.currentAnimation.name === "walkFront") {
            sprite.switchAnimation("rollFront");
        } else {
            sprite.switchAnimation("walkFront");
        }
    });

    // Start game loop.
    requestAnimationFrame(gameLoopController);
    enablePlayerControllers();
});

function enablePlayerControllers() {

    window.addEventListener("keydown", (e) => {

        if (e.key === "w") wPressed = true;
        if (e.key === "s") sPressed = true;
        if (e.key === "a") aPressed = true;
        if (e.key === "d") dPressed = true;
        if (e.key === " ") isRolling = true;
        if (e.key === "Enter") isAttacking = true;
    });

    window.addEventListener("keyup", (e) => {

        if (e.key === "w") wPressed = false;
        if (e.key === "s") sPressed = false;
        if (e.key === "a") aPressed = false;
        if (e.key === "d") dPressed = false;
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

    requestAnimationFrame(gameLoopController);
}

function gameLoop() {

    playerController();
}

function playerController() {

    if (isAttacking) {

        // Set the right animation.
        if (sprite.currentAnimation.name !== ("slash" + animationDirection)) {
            setPlayerDirection(); // Check player direction.
            sprite.switchAnimation("slash" + animationDirection);
        }

        // Check if animation is finished.
        if (sprite.currentAnimation.animationFinished) {
            sprite.switchAnimation("idle" + animationDirection);
            isAttacking = false;
        }

        sprite.drawFrame(ctx, direction);

        return;
    }

    if (isRolling) {

        let speed = Math.sqrt(6 * 6 + 6 * 6) / 2;

        if (animationDirection === "Back") sprite.y -= 6;
        if (animationDirection === "Front") sprite.y += 6;
        if (animationDirection === "Side" && direction === "right") sprite.x += 6;
        if (animationDirection === "Side" && direction === "left") sprite.x -= 6;
        if (animationDirection === "34" && direction === "right") {
            sprite.y += speed;
            sprite.x += speed;
        }
        if (animationDirection === "34" && direction === "left") {
            sprite.y += speed;
            sprite.x -= speed;
        }
        if (animationDirection === "34Back" && direction === "right") {
            sprite.y -= speed;
            sprite.x += speed;
        }
        if (animationDirection === "34Back" && direction === "left") {
            sprite.y -= speed;
            sprite.x -= speed;
        }

        if (sprite.currentAnimation.name !== ("roll" + animationDirection)) {
            setPlayerDirection();
            sprite.switchAnimation("roll" + animationDirection);
        }

        if (sprite.currentAnimation.animationFinished) {
            sprite.switchAnimation("idle" + animationDirection);
            isRolling = false;
        }

        sprite.drawFrame(ctx, direction);

        return;
    }

    setPlayerDirection();

    // Player movement.
    let speed = Math.sqrt(3 * 3 + 3 * 3) / 2;
    if (wPressed && aPressed) {
        sprite.y -= speed;
        sprite.x -= speed;
    } else if (wPressed && dPressed) {
        sprite.y -= speed;
        sprite.x += speed;
    } else if (sPressed && aPressed) {
        sprite.y += speed;
        sprite.x -= speed;
    } else if (sPressed && dPressed) {
        sprite.y += speed;
        sprite.x += speed;
    } else if (wPressed) {
        sprite.y -= 3;
    } else if (sPressed) {
        sprite.y += 3;
    } else if (aPressed) {
        sprite.x -= 3;
    } else if (dPressed) {
        sprite.x += 3;
    }

    // A
    if (aPressed && !wPressed && !sPressed && !dPressed) {
        if (sprite.currentAnimation.name !== "walkSide")
            sprite.switchAnimation("walkSide");
    }

    // D
    if (dPressed && !wPressed && !sPressed && !aPressed) {
        if (sprite.currentAnimation.name !== "walkSide")
            sprite.switchAnimation("walkSide");
    }

    // W an A
    if (wPressed && aPressed) {
        if (sprite.currentAnimation.name !== "walk34Back")
            sprite.switchAnimation("walk34Back");

        // W and D
    } else if (wPressed && dPressed) {
        if (sprite.currentAnimation.name !== "walk34Back")
            sprite.switchAnimation("walk34Back");

        // W
    } else if (wPressed) {
        if (sprite.currentAnimation.name !== "walkBack")
            sprite.switchAnimation("walkBack");
    }

    // S and A
    if (sPressed && aPressed) {
        if (sprite.currentAnimation.name !== "walk34")
            sprite.switchAnimation("walk34");

        // S and D
    } else if (sPressed && dPressed) {
        if (sprite.currentAnimation.name !== "walk34")
            sprite.switchAnimation("walk34");

        // S
    } else if (sPressed) {
        if (sprite.currentAnimation.name !== "walkFront")
            sprite.switchAnimation("walkFront");
    }

    // Idle animation.
    if (!wPressed && !sPressed && !aPressed && !dPressed) {

        if (sprite.currentAnimation.name !== ("idle" + animationDirection)) {
            sprite.switchAnimation("idle" + animationDirection);
        }

        if (sprite.currentAnimation.animationFinished) {
            sprite.switchAnimation("roll" + animationDirection);
        }
    }

    sprite.drawFrame(ctx, direction);
}

function setPlayerDirection() {

    // Player direction.
    if (aPressed) direction = "left";
    if (dPressed) direction = "right";

    // Player animation direction.
    if (wPressed) animationDirection = "Back";
    if (sPressed) animationDirection = "Front";
    if (aPressed) animationDirection = "Side";
    if (dPressed) animationDirection = "Side";
    if (wPressed && aPressed) animationDirection = "34Back";
    if (wPressed && dPressed) animationDirection = "34Back";
    if (sPressed && aPressed) animationDirection = "34";
    if (sPressed && dPressed) animationDirection = "34";
}