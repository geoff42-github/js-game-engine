"use strict;"

import gfx from './graphics';
import { Sprite } from './primitives';

/**
 * @class Paralax scrolling background layer
 */
 class BackLayer {
    constructor(layerData) {

        this.sprite = new Sprite(layerData.fileName, null, 0);
        this.sprite.x = 0;
        this.sprite.y = layerData.y;
        this.data = layerData;
    }

    update(dx, secElapsed) {
        this.sprite.x += dx * secElapsed * this.data.scrollRatio;
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
            this.layers.push(new BackLayer(layer));
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

