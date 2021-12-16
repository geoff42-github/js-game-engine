"use strict";

import gfx, { GfxDrawModeFill, GfxDrawModeStroke } from "./graphics.js";
import inputSys from "./input.js";
import Player from "./player.js";
import Background from './background.js';

// TODO: Move to S3/Cloudfront?
import PlayerData from './data/player-anim-frames.json';
import BackgroundData from './data/background.json';

/**
 * @class General game functions
 */
class GameMain {
    constructor() {
        this.initialized = false;
        this.player = null;
        this.background = null;
    }

    /**
     * @public
     */
    init() {

        this.curFrames = 0;
        this.lastFrames = 0;
        this.curSec = 0.0;

        this.background = new Background(BackgroundData);
        this.player = new Player(PlayerData, BackgroundData.PlayerPosition);

        this.debug = false;

        gfx.drawMode = GfxDrawModeStroke;
        gfx.lineDashes = [4, 2];

        inputSys.registerEvent = "ArrowLeft";
        inputSys.registerEvent = "ArrowRight";
        inputSys.registerEvent = "ArrowUp";
        inputSys.registerEvent = "ArrowDown";
        inputSys.registerEvent = 'd';

        gfx.color = "#0095DD";
        
        this.initialized = true;
    }

    /**
     * @public
     * @param {number} elapsedMs - Milliseconds elapsed since last update
     */
    preUpdate(elapsedMs) {
        inputSys.update();
    }

    /**
     * @public
     * @param {number} elapsedMs - Milliseconds elapsed since last update
     */
    postUpdate(elapsedMs) {

    }

    /**
     * @public
     * @param {number} msElapsed - Milliseconds elapsed since last update
     */
    update(msElapsed) {
        
        let secElapsed = msElapsed / 1000.0;

        if (inputSys.keyJustPressed("ArrowLeft")) {
            this.player.walkLeft();
            this.background.walkLeft();
        } else if (inputSys.keyJustReleased("ArrowLeft")) {
            this.player.stop();
            this.background.stop();
        } else if (inputSys.keyJustPressed("ArrowRight")) {
            this.player.walkRight();
            this.background.walkRight();
        } else if (inputSys.keyJustReleased("ArrowRight")) {
            this.player.stop();
            this.background.stop();
        } else if (inputSys.keyJustPressed("ArrowUp")) {
            this.player.walkAway();
            this.background.walkAway();
        } else if (inputSys.keyJustReleased("ArrowUp")) {
            this.player.stop();
            this.background.stop();
        } else if (inputSys.keyJustPressed("ArrowDown")) {
            this.player.walkToward();
            this.background.walkToward();
        } else if (inputSys.keyJustReleased("ArrowDown")) {
            this.player.stop();
            this.background.stop();
        }

        if (inputSys.keyJustPressed('d')) {
            this.debug = !this.debug;
        }

        this.curFrames++;
        this.curSec += secElapsed;
        if (this.curSec > 1.0) {
            this.curSec = 0.0;
            this.lastFrames = this.curFrames;
            this.curFrames = 0;
        }

        this.background.update(secElapsed);
        this.player.update(secElapsed);
    }

    /**
     * @public
     */
    preDraw() {
        gfx.beginDraw();
    }

    /**
     * @public
     */
    postDraw() {
        gfx.endDraw();
    }

    /**
     * @public
     */
    draw() {

        this.background.draw();
        this.player.draw();

        if (this.debug) {
            gfx.drawMode = GfxDrawModeFill;

            gfx.color = "#ffffffff";
            gfx.drawText("FPS: " + this.lastFrames, 10, 20);
            gfx.drawText("Anim[" + this.player.sprite.curAnim + "][" + this.player.sprite.curFrame + "]", 10, 40);
        }
    }
}

let game = new GameMain();
export default game;