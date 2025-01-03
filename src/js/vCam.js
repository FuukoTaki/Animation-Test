export class VCam {

    constructor(delay, canvas, target) {

        this.delay = delay; // Tracking speed. 1 = no delay.
        this.x = canvas.width / 2 - target.x - target.width; // Starting X position.
        this.y = canvas.height / 2 - target.y - target.height; // Starting Y position.
        this.target = target;
        this.targetX = target.x; // Target X position.
        this.targetY = target.y; // Target Y position.
    }

    track(ctx, canvas) {

        this.targetX = canvas.width / 2 - this.target.x - this.target.width;
        this.targetY = canvas.height / 2 - this.target.y - this.target.height;

        this.x += (this.targetX - this.x) / this.delay;
        this.y += (this.targetY - this.y) / this.delay;

        ctx.translate(this.x, this.y);
    }
}