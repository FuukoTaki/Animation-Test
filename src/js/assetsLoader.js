export let princessSRC = {};
export let redSRC = {};

export function loadElfSRC() {

    let redIdle = new Image();
    redIdle.src = "./src/img/red/red-idle.png";
    let redWalk = new Image();
    redWalk.src = "./src/img/red/red-walk.png";
    let redSlash = new Image();
    redSlash.src = "./src/img/red/red-slash.png";
    let redSlash2 = new Image();
    redSlash2.src = "./src/img/red/red-slash2.png";
    let redRoll = new Image();
    redRoll.src = "./src/img/red/red-roll.png";
    let redCry = new Image();
    redCry.src = "./src/img/red/red-cry.png";
    let redBlink = new Image();
    redBlink.src = "./src/img/red/red-blink.png";
    let redDecline = new Image();
    redDecline.src = "./src/img/red/red-decline.png";
    let redApprove = new Image();
    redApprove.src = "./src/img/red/red-approve.png";
    let redDown = new Image();
    redDown.src = "./src/img/red/red-down.png";
    let redHit = new Image();
    redHit.src = "./src/img/red/red-hit.png";
    let redThrow = new Image();
    redThrow.src = "./src/img/red/red-throw.png";

    redSRC = {
        idle: redIdle,
        walk: redWalk,
        slash: redSlash,
        slash2: redSlash2,
        roll: redRoll,
        cry: redCry,
        blink: redBlink,
        decline: redDecline,
        approve: redApprove,
        down: redDown,
        hit: redHit,
        throw: redThrow
    }
}

export function loadPrincessSRC() {

    let princessIdle = new Image();
    princessIdle.src = "./src/img/princess/princess-idle.png";
    let princessWalk = new Image();
    princessWalk.src = "./src/img/princess/princess-walk.png";
    let princessSlash = new Image();
    princessSlash.src = "./src/img/princess/princess-slash.png";
    let princessSlash2 = new Image();
    princessSlash2.src = "./src/img/princess/princess-slash2.png";
    let princessRoll = new Image();
    princessRoll.src = "./src/img/princess/princess-roll.png";
    let princessCry = new Image();
    princessCry.src = "./src/img/princess/princess-cry.png";
    let princessBlink = new Image();
    princessBlink.src = "./src/img/princess/princess-blink.png";
    let princessDecline = new Image();
    princessDecline.src = "./src/img/princess/princess-decline.png";
    let princessApprove = new Image();
    princessApprove.src = "./src/img/princess/princess-approve.png";
    let princessDown = new Image();
    princessDown.src = "./src/img/princess/princess-down.png";
    let princessHit = new Image();
    princessHit.src = "./src/img/princess/princess-hit.png";
    let princessThrow = new Image();
    princessThrow.src = "./src/img/princess/princess-throw.png";

    princessSRC = {
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
}