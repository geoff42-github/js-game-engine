"use strict;"

import gfx from './graphics';
import { Sprite } from './primitives';

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
        this.sprite.update(secElapsed);
    }

    draw() {
        gfx.drawSprite(this.sprite);
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

