"use strict;"

import gfx from '../engine/graphics';
import { Sprite } from '../engine/primitives';

/**
 * @class Paralax scrolling background layer
 */
 class BackLayer {
    constructor(layerData, backWidth) {

        let frame = [{"x": 0, "y": 0, "w": backWidth, "h": layerData.h, "numFrames": 1}];
        this.sprite = new Sprite(layerData.fileName, frame, 0);
        this.sprite.x = 0;
        this.sprite.y = layerData.y;
        this.sprite.width = backWidth;
        this.data = layerData;
    }

    update(dx, secElapsed) {
        this.sprite.animFrame.x -= dx * secElapsed * this.data.scrollRatio;

        if (this.sprite.animFrame.x >= this.sprite.img.width) {
            this.sprite.animFrame.x -= this.sprite.img.width;
        }
        else if (this.sprite.animFrame.x <= -this.sprite.img.width) {
            this.sprite.animFrame.x += this.sprite.img.width;
        }

        this.sprite.update(secElapsed);
    }

    draw() {

        if (this.sprite.animFrame.x < 0) {

            if (this.sprite.animFrame.x > -this.sprite.width) {
                gfx.drawSprite(this.sprite);
            }

            let oldX = this.sprite.animFrame.x;
            let oldW = this.sprite.width;

            this.sprite.animFrame.x += this.sprite.img.width;
            this.sprite.width = Math.min(-oldX, oldW);
            this.sprite.animFrame.width = this.sprite.width;

            gfx.drawSprite(this.sprite);

            this.sprite.animFrame.x = oldX;
            this.sprite.animFrame.width = oldW;
            this.sprite.width = oldW;

        }
        else {
            if (this.sprite.animFrame.x < this.sprite.img.width) {
                gfx.drawSprite(this.sprite);
            }

            let oldX = this.sprite.animFrame.x;
            let oldW = this.sprite.width;

            // TODO: Not working but too tired to think about it right now...
            this.sprite.animFrame.x -= this.sprite.img.width;
            this.sprite.width = Math.min(oldX, oldW);
            this.sprite.animFrame.width = this.sprite.width;

            gfx.drawSprite(this.sprite);

            this.sprite.animFrame.x = oldX;
            this.sprite.animFrame.width = oldW;
            this.sprite.width = oldW;
        }
    }
}

/**
 * @class Paralax scrolling background (collection of layers)
 */
export default class Background {
    constructor(backgroundData) {
        this.layers = [];

        for (let layer of backgroundData.layers) {
            this.layers.push(new BackLayer(layer, backgroundData.Width));
        }

        this.data = backgroundData;
        this.dx = 0;
    }

    update(secElapsed) {
        for (let layer of this.layers) {
            layer.update(this.dx, secElapsed);
        }
    }

    draw() {

        for (let layer of this.layers) {
            layer.draw();
        }

        gfx.color = "#ffffffff";
        gfx.drawText("Pos: " + this.layers[this.layers.length - 1].sprite.animFrame.x, 10, 60);
}

    walkLeft() {
        this.dx = this.data.WalkRate;
    }

    walkRight() {
        this.dx = -this.data.WalkRate;
    }

    walkToward() {
        this.dx = 0;
    }

    walkAway() {
        this.dx = 0;
    }

    stop() {
        this.dx = 0;
    }
}

