import { Sprite } from "./sprite.js";

export class Player extends Sprite {

    constructor(animationsSrc, x, y, width, height) {

        super(animationsSrc, x, y, width, height);

        this.direction = "right";
        this.animationDirection = "Front";

        this.isAttacking = false;
        this.isRolling = false;
        this.secondSlashTimer = 10;

        this.wPressed = false;
        this.sPressed = false;
        this.aPressed = false;
        this.dPressed = false;
        this.enterPressed = false;
        this.spacePressed = false;
    }

    setPlayerDirection() {

        // Player direction.
        if (this.aPressed) this.direction = "left";
        if (this.dPressed) this.direction = "right";

        // Player animation direction.
        if (this.wPressed) this.animationDirection = "Back";
        if (this.sPressed) this.animationDirection = "Front";
        if (this.aPressed || this.dPressed) this.animationDirection = "Side";
        if (this.wPressed && this.aPressed || this.wPressed && this.dPressed)
            this.animationDirection = "34Back";
        if (this.sPressed && this.aPressed || this.sPressed && this.dPressed)
            this.animationDirection = "34";
    }

    playerController(ctx) {

        this.playerAttack(ctx);
        if (this.isAttacking) return;
        this.playerRoll(ctx);
        if (this.isRolling) return;
        this.playerMovement(ctx);
    }

    playerAttack(ctx) {

        if (this.enterPressed && !this.isAttacking) {
            this.isAttacking = true;
            this.isRolling = false;
            this.setPlayerDirection();
            this.switchAnimation("slash" + this.animationDirection);
        }

        if (this.isAttacking) {

            if (this.currentAnimation.name === "slash" + this.animationDirection) {

                if (this.currentAnimation.animationFinished) {

                    this.secondSlashTimer--;

                    if (this.secondSlashTimer > 0 && this.enterPressed) {
                        this.setPlayerDirection();
                        this.switchAnimation("slash2" + this.animationDirection);
                        this.secondSlashTimer = 10;

                    } else if (this.secondSlashTimer > 0 && this.spacePressed) {
                        this.setPlayerDirection();
                        switchAnimation("roll" + this.animationDirection);
                        this.secondSlashTimer = 10;
                        this.isAttacking = false;

                    } else if (this.secondSlashTimer <= 0) {
                        this.setPlayerDirection();
                        this.switchAnimation("idle" + this.animationDirection);
                        this.secondSlashTimer = 10;
                        this.isAttacking = false;
                    }
                }

            } else if (this.currentAnimation.name === "slash2" + this.animationDirection) {

                if (this.currentAnimation.animationFinished) {

                    if (this.secondSlashTimer > 0 && this.enterPressed) {
                        this.setPlayerDirection();
                        this.switchAnimation("slash" + this.animationDirection);

                    } else {
                        this.setPlayerDirection();
                        this.switchAnimation("idle" + this.animationDirection);
                        this.isAttacking = false;
                    }
                }
            }

            this.drawFrame(ctx, this.direction);
        }
    }

    playerRoll(ctx) {

        if (this.spacePressed && !this.isRolling) {
            this.isRolling = true;
            this.setPlayerDirection();
            this.switchAnimation("roll" + this.animationDirection);
        }

        if (this.isRolling) {

            let rollSpeed = 6;
            let rollSpeedDiagonal = Math.sqrt(rollSpeed * rollSpeed * 2) / 2;

            // Cardinal.
            if (this.animationDirection === "Back") this.y -= rollSpeed;
            if (this.animationDirection === "Front") this.y += rollSpeed;
            if (this.animationDirection === "Side" && this.direction === "right") this.x += rollSpeed;
            if (this.animationDirection === "Side" && this.direction === "left") this.x -= rollSpeed;

            // Diagonal.
            if (this.animationDirection === "34" && this.direction === "right") {
                this.y += rollSpeedDiagonal;
                this.x += rollSpeedDiagonal;
            }
            if (this.animationDirection === "34" && this.direction === "left") {
                this.y += rollSpeedDiagonal;
                this.x -= rollSpeedDiagonal;
            }
            if (this.animationDirection === "34Back" && this.direction === "right") {
                this.y -= rollSpeedDiagonal;
                this.x += rollSpeedDiagonal;
            }
            if (this.animationDirection === "34Back" && this.direction === "left") {
                this.y -= rollSpeedDiagonal;
                this.x -= rollSpeedDiagonal;
            }

            if (this.currentAnimation.animationFinished) {
                this.switchAnimation("idle" + this.animationDirection);
                this.isRolling = false;
            }

            this.drawFrame(ctx, this.direction);
        }
    }

    playerMovement(ctx) {

        this.setPlayerDirection();

        let movementSpeed = 3;
        let movementSpeedDiagonal = Math.sqrt(movementSpeed * movementSpeed * 2) / 2;

        if (this.wPressed && this.aPressed) {
            this.y -= movementSpeedDiagonal;
            this.x -= movementSpeedDiagonal;
        } else if (this.wPressed && this.dPressed) {
            this.y -= movementSpeedDiagonal;
            this.x += movementSpeedDiagonal;
        } else if (this.sPressed && this.aPressed) {
            this.y += movementSpeedDiagonal;
            this.x -= movementSpeedDiagonal;
        } else if (this.sPressed && this.dPressed) {
            this.y += movementSpeedDiagonal;
            this.x += movementSpeedDiagonal;
        } else if (this.wPressed) {
            this.y -= movementSpeed;
        } else if (this.sPressed) {
            this.y += movementSpeed;
        } else if (this.aPressed) {
            this.x -= movementSpeed;
        } else if (this.dPressed) {
            this.x += movementSpeed;
        }

        // A or D.
        if (this.aPressed && !this.wPressed && !this.sPressed && !this.dPressed ||
            this.dPressed && !this.wPressed && !this.sPressed && !this.aPressed) {
            if (this.currentAnimation.name !== "walkSide")
                this.switchAnimation("walkSide");
        }

        // W an A
        if (this.wPressed && this.aPressed) {
            if (this.currentAnimation.name !== "walk34Back")
                this.switchAnimation("walk34Back");

            // W and D
        } else if (this.wPressed && this.dPressed) {
            if (this.currentAnimation.name !== "walk34Back")
                this.switchAnimation("walk34Back");

            // W
        } else if (this.wPressed) {
            if (this.currentAnimation.name !== "walkBack")
                this.switchAnimation("walkBack");
        }

        // S and A
        if (this.sPressed && this.aPressed) {
            if (this.currentAnimation.name !== "walk34")
                this.switchAnimation("walk34");

            // S and D
        } else if (this.sPressed && this.dPressed) {
            if (this.currentAnimation.name !== "walk34")
                this.switchAnimation("walk34");

            // S
        } else if (this.sPressed) {
            if (this.currentAnimation.name !== "walkFront")
                this.switchAnimation("walkFront");
        }

        // Idle animation.
        if (!this.wPressed && !this.sPressed && !this.aPressed && !this.dPressed) {
            if (this.currentAnimation.name !== "idle" + this.animationDirection) {
                this.switchAnimation("idle" + this.animationDirection);
            }
        }

        this.drawFrame(ctx, this.direction);
    }
}