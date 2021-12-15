"use strict";

import {Sprite} from './primitives.js';
import gfx from './graphics.js';

/**
 * @class Player's character
 */
export default class Player {
    constructor(playerData, playerPos) {

        this.data = playerData;
        this.sprite = new Sprite(playerData.ImageFileName, playerData.frames, 10);

        // TODO: Gets set by the level data since it will vary by level
        this.sprite.x = playerPos.x;
        this.sprite.y = playerPos.y;

        this.sprite.curAnim = playerData.PlayerAnimStopped;

        // TODO: Load the bounding circles and rectangles
    }

    update(secElapsed) {
        this.sprite.update(secElapsed);
    }

    draw() {
        gfx.drawSprite(this.sprite);
    }

    walkAway() {
        this.sprite.anim = this.data.PlayerAnimAway;
    }

    walkToward() {
        this.sprite.anim = this.data.PlayerAnimToward;
    }

    walkLeft() {
        this.sprite.anim = this.data.PlayerAnimLeft;
    }

    walkRight() {
        this.sprite.anim = this.data.PlayerAnimRight;        
    }

    stop() {
        this.sprite.anim = this.data.PlayerAnimStopped;
    }
}