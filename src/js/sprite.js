export class Sprite {

    constructor(animationsSrc, x, y, width, height) {

        // Set initial values.
        this.animationsSrc = animationsSrc;
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;

        this.animations = {
            // -- IDLE --
            idleFront: new Animation(this.animationsSrc["idle"], "idleFront", 0, 6, 10),
            idle34: new Animation(this.animationsSrc["idle"], "idle34", 64, 6, 10),
            idleSide: new Animation(this.animationsSrc["idle"], "idleSide", 128, 6, 10),
            idle34Back: new Animation(this.animationsSrc["idle"], "idle34Back", 192, 6, 10),
            idleBack: new Animation(this.animationsSrc["idle"], "idleBack", 256, 6, 10),

            // -- WALK --
            walkFront: new Animation(this.animationsSrc["walk"], "walkFront", 0, 6, 10),
            walk34: new Animation(this.animationsSrc["walk"], "walk34", 64, 6, 10),
            walkSide: new Animation(this.animationsSrc["walk"], "walkSide", 128, 6, 10),
            walk34Back: new Animation(this.animationsSrc["walk"], "walk34Back", 192, 6, 10),
            walkBack: new Animation(this.animationsSrc["walk"], "walkBack", 256, 6, 10),

            // -- SLASH --
            slashFront: new Animation(animationsSrc["slash"], "slashFront", 0, 6, 10),
            slash34: new Animation(animationsSrc["slash"], "slash34", 64, 6, 10),
            slashSide: new Animation(animationsSrc["slash"], "slashSide", 128, 6, 10),
            slash34Back: new Animation(animationsSrc["slash"], "slash34Back", 192, 6, 10),
            slashBack: new Animation(animationsSrc["slash"], "slashBack", 256, 6, 10),

            // -- SLASH 2 --
            slash2Front: new Animation(animationsSrc["slash2"], "slash2Front", 0, 6, 10),
            slash234: new Animation(animationsSrc["slash2"], "slash234", 64, 6, 10),
            slash2Side: new Animation(animationsSrc["slash2"], "slash2Side", 128, 6, 10),
            slash234Back: new Animation(animationsSrc["slash2"], "slash234Back", 192, 6, 10),
            slash2Back: new Animation(animationsSrc["slash2"], "slash2Back", 256, 6, 10),

            // -- ROLL --
            rollFront: new Animation(animationsSrc["roll"], "rollFront", 0, 11, 10),
            roll34: new Animation(animationsSrc["roll"], "roll34", 64, 11, 10),
            rollSide: new Animation(animationsSrc["roll"], "rollSide", 128, 11, 10),
            roll34Back: new Animation(animationsSrc["roll"], "roll34Back", 192, 11, 10),
            rollBack: new Animation(animationsSrc["roll"], "rollBack", 256, 11, 10),

            // -- CRY --
            cryFront: new Animation(animationsSrc["cry"], "cryFront", 0, 5, 10),
            cry34: new Animation(animationsSrc["cry"], "cry34", 64, 5, 10),
            crySide: new Animation(animationsSrc["cry"], "crySide", 128, 5, 10),

            // -- BLINK --
            blinkFront: new Animation(animationsSrc["blink"], "blinkFront", 0, 2, 10),
            blink34: new Animation(animationsSrc["blink"], "blink34", 64, 2, 10),
            blinkSide: new Animation(animationsSrc["blink"], "blinkSide", 128, 2, 10),

            // -- DECLINE --
            declineFront: new Animation(animationsSrc["decline"], "declineFront", 0, 4, 10),
            decline34: new Animation(animationsSrc["decline"], "decline34", 64, 4, 10),
            declineSide: new Animation(animationsSrc["decline"], "declineSide", 128, 4, 10),

            // -- APPROVE --
            approveFront: new Animation(animationsSrc["approve"], "approveFront", 0, 4, 10),
            approve34: new Animation(animationsSrc["approve"], "approve34", 64, 4, 10),
            approveSide: new Animation(animationsSrc["approve"], "approveSide", 128, 4, 10),

            // -- DOWN --
            downFront: new Animation(animationsSrc["down"], "downFront", 0, 4, 10),
            down34: new Animation(animationsSrc["down"], "down34", 64, 4, 10),
            downSide: new Animation(animationsSrc["down"], "downSide", 128, 4, 10),

            // -- HIT --
            hitFront: new Animation(animationsSrc["hit"], "hitFront", 0, 4, 10),
            hit34: new Animation(animationsSrc["hit"], "hit34", 64, 4, 10),
            hitSide: new Animation(animationsSrc["hit"], "hitSide", 128, 4, 10),
            hit34Back: new Animation(animationsSrc["hit"], "hit34Back", 192, 4, 10),
            hitBack: new Animation(animationsSrc["hit"], "hitBack", 256, 4, 10),

            // -- THROW --
            throwFront: new Animation(animationsSrc["throw"], "throwFront", 0, 12, 10),
            throw34: new Animation(animationsSrc["throw"], "throw34", 64, 12, 10),
            throwSide: new Animation(animationsSrc["throw"], "throwSide", 128, 12, 10),
            throw34Back: new Animation(animationsSrc["throw"], "throw34Back", 192, 12, 10),
            throwBack: new Animation(animationsSrc["throw"], "throwBack", 256, 12, 10),
        }

        // Set initial animation.
        this.currentAnimation = this.animations.walkFront;
    }

    switchAnimation(name) {
        this.currentAnimation.animationFrameCurrent = 0;
        this.currentAnimation.delayBetweenFramesCurrent = 0;
        this.currentAnimation = this.animations[name];
    }

    drawFrame(ctx) {

        ctx.drawImage(
            this.currentAnimation.animationSrc, // Image source.
            0 + this.currentAnimation.animationFrameCurrent * this.width, this.currentAnimation.position, // X and Y coordinates on src.
            this.width, this.height, // Width and Height on src.
            this.x, this.y, // X and Y on canvas.
            this.width * 4, this.height * 4 // Width and height on canvas.
        )

        this.currentAnimation.delayBetweenFramesCurrent--;
        if (this.currentAnimation.delayBetweenFramesCurrent <= 0) {
            this.currentAnimation.delayBetweenFramesCurrent = this.currentAnimation.delayBetweenFrames;
            this.currentAnimation.animationFrameCurrent++;
            if (this.currentAnimation.animationFrameCurrent >= this.currentAnimation.animationFrames)
                this.currentAnimation.animationFrameCurrent = 0;
        }
    }
}

class Animation {

    constructor(animationSrc, name, position, animationFrames, delayBetweenFrames) {

        this.animationSrc = animationSrc;
        this.name = name;
        this.position = position;

        this.animationFrameCurrent = 0;
        this.animationFrames = animationFrames;

        this.delayBetweenFramesCurrent = 0;
        this.delayBetweenFrames = delayBetweenFrames;
    }
}