import { Sprite } from "./sprite.js";

let canvas;
let ctx;

let sprite;

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

    sprite = new Sprite(
        princessAnimationsSrc, // Image source.
        200 - 128, 200 - 128, // X and Y.
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
    requestAnimationFrame(gameLoop);

    let idleBtn = document.getElementById("idleBtn");
    let walkBtn = document.getElementById("walkBtn");
    let approveBtn = document.getElementById("approveBtn");
    let declineBtn = document.getElementById("declineBtn");
    let blinkBtn = document.getElementById("blinkBtn");
    let cryBtn = document.getElementById("cryBtn");
    let downBtn = document.getElementById("downBtn");
    let hitBtn = document.getElementById("hitBtn");
    let rollBtn = document.getElementById("rollBtn");
    let slashBtn = document.getElementById("slashBtn");
    let slash2Btn = document.getElementById("slash2Btn");
    let throwBtn = document.getElementById("throwBtn");

    let idle = 0;
    let walk = 0;
    let approve = 0;
    let decline = 0;
    let blink = 0;
    let cry = 0;
    let down = 0;
    let hit = 0;
    let roll = 0;
    let slash = 0;
    let slash2 = 0;
    let tthrow = 0;

    idleBtn.addEventListener("click", (e) => {

        if (idle === 0) sprite.switchAnimation("idleFront");
        if (idle === 1) sprite.switchAnimation("idle34");
        if (idle === 2) sprite.switchAnimation("idleSide");
        if (idle === 3) sprite.switchAnimation("idle34Back");
        if (idle === 4) sprite.switchAnimation("idleBack");

        idle++;
        if (idle >= 5) idle = 0;
    });

    walkBtn.addEventListener("click", (e) => {

        if (walk === 0) sprite.switchAnimation("walkFront");
        if (walk === 1) sprite.switchAnimation("walk34");
        if (walk === 2) sprite.switchAnimation("walkSide");
        if (walk === 3) sprite.switchAnimation("walk34Back");
        if (walk === 4) sprite.switchAnimation("walkBack");

        walk++;
        if (walk >= 5) walk = 0;
    });

    approveBtn.addEventListener("click", (e) => {

        if (approve === 0) sprite.switchAnimation("approveFront");
        if (approve === 1) sprite.switchAnimation("approve34");
        if (approve === 2) sprite.switchAnimation("approveSide");

        approve++;
        if (approve >= 3) approve = 0;
    });

    declineBtn.addEventListener("click", (e) => {

        if (decline === 0) sprite.switchAnimation("declineFront");
        if (decline === 1) sprite.switchAnimation("decline34");
        if (decline === 2) sprite.switchAnimation("declineSide");

        decline++;
        if (decline >= 3) decline = 0;
    });

    blinkBtn.addEventListener("click", (e) => {

        if (blink === 0) sprite.switchAnimation("blinkFront");
        if (blink === 1) sprite.switchAnimation("blink34");
        if (blink === 2) sprite.switchAnimation("blinkSide");

        blink++;
        if (blink >= 3) blink = 0;
    });

    cryBtn.addEventListener("click", (e) => {

        if (cry === 0) sprite.switchAnimation("cryFront");
        if (cry === 1) sprite.switchAnimation("cry34");
        if (cry === 2) sprite.switchAnimation("crySide");

        cry++;
        if (cry >= 3) cry = 0;
    });

    downBtn.addEventListener("click", (e) => {

        if (down === 0) sprite.switchAnimation("downFront");
        if (down === 1) sprite.switchAnimation("down34");
        if (down === 2) sprite.switchAnimation("downSide");

        down++;
        if (down >= 3) down = 0;
    });

    hitBtn.addEventListener("click", (e) => {

        if (hit === 0) sprite.switchAnimation("hitFront");
        if (hit === 1) sprite.switchAnimation("hit34");
        if (hit === 2) sprite.switchAnimation("hitSide");
        if (hit === 3) sprite.switchAnimation("hit34Back");
        if (hit === 4) sprite.switchAnimation("hitBack");

        hit++;
        if (hit >= 5) hit = 0;
    });

    rollBtn.addEventListener("click", (e) => {

        if (roll === 0) sprite.switchAnimation("rollFront");
        if (roll === 1) sprite.switchAnimation("roll34");
        if (roll === 2) sprite.switchAnimation("rollSide");
        if (roll === 3) sprite.switchAnimation("roll34Back");
        if (roll === 4) sprite.switchAnimation("rollBack");

        roll++;
        if (roll >= 5) roll = 0;
    });

    slashBtn.addEventListener("click", (e) => {

        if (slash === 0) sprite.switchAnimation("slashFront");
        if (slash === 1) sprite.switchAnimation("slash34");
        if (slash === 2) sprite.switchAnimation("slashSide");
        if (slash === 3) sprite.switchAnimation("slash34Back");
        if (slash === 4) sprite.switchAnimation("slashBack");

        slash++;
        if (slash >= 5) slash = 0;
    });

    slash2Btn.addEventListener("click", (e) => {

        if (slash2 === 0) sprite.switchAnimation("slash2Front");
        if (slash2 === 1) sprite.switchAnimation("slash234");
        if (slash2 === 2) sprite.switchAnimation("slash2Side");
        if (slash2 === 3) sprite.switchAnimation("slash234Back");
        if (slash2 === 4) sprite.switchAnimation("slash2Back");

        slash2++;
        if (slash2 >= 5) slash2 = 0;
    });

    throwBtn.addEventListener("click", (e) => {

        if (tthrow === 0) sprite.switchAnimation("throwFront");
        if (tthrow === 1) sprite.switchAnimation("throw34");
        if (tthrow === 2) sprite.switchAnimation("throwSide");
        if (tthrow === 3) sprite.switchAnimation("throw34Back");
        if (tthrow === 4) sprite.switchAnimation("throwBack");

        tthrow++;
        if (tthrow >= 5) tthrow = 0;
    });
});

function gameLoop() {

    // Clear canvas.
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    sprite.drawFrame(ctx);

    // Call next frame.
    requestAnimationFrame(gameLoop);
}