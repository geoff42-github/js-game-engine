"use strict";

import gfx, { GfxDrawModeStroke } from "./graphics.js";
import inputSys from "./input.js";
import {Collide} from "./physics.js";
import {
    Rectangle, 
    Circle,
    Sprite,
    Vector2d
} from "./primitives.js";

import PlayerSprite from './images/player-small.png';
import PlayerData from './data/player-anim-frames.json';

/**
 * @class Bouncing ball
 */
class Ball {
    /**
     * @param {number} x - Center x location of ball
     * @param {number} y - Center y location of ball
     * @param {number} r - Radius of ball
     */
    constructor(x, y, r) {
        this.c = new Circle(x, y, r);
        this.velocity = new Vector2d(0, 0);
        this.color = "#00ff00";
    }

    /**
     * @public
     * @param {number} secElapsed - Seconds elapsed since last update
     */
    update(secElapsed) {
        this.c.x += this.velocity.x * secElapsed;
        this.c.y += this.velocity.y * secElapsed;
    }

    /**
     * @public
     */
    draw() {
        gfx.color = this.color;
        gfx.drawCircle(this.c);
    }

    /**
     * @public
     * @returns {number} - Mass of the ball
     */
    get mass() {
        return this.c.area;
    }
}

/**
 * @class Bouncing block
 */
 class Block {
    /**
     * @param {number} x - x location of block
     * @param {number} y - y location of block
     * @param {number} w - width of block
     * @param {number} h - height of block
     */
    constructor(x, y, w, h) {
        this.r = new Rectangle(x, y, w, h);
        this.velocity = new Vector2d(0, 0);
        this.color = "#0000ff";
    }

    /**
     * @public
     * @param {number} secElapsed - Seconds elapsed since last update
     */
    update(secElapsed) {
        this.r.x += this.velocity.x * secElapsed;
        this.r.y += this.velocity.y * secElapsed;
    }

    /**
     * @public
     */
    draw() {
        gfx.color = this.color;
        gfx.drawRect(this.r);
    }

    /**
     * @public
     * @returns {number} - Mass of the ball
     */
    get mass() {
        return this.r.area;
    }
}

/**
 * @class Player's character
 */
 class Player {
    constructor() {
        this.sprite = new Sprite(PlayerSprite, PlayerData.frames, 10);

        this.sprite.x = 390;
        this.sprite.y = 500;

        this.sprite.curAnim = PlayerData.PlayerAnimStopped;
    }

    update(secElapsed) {
        this.sprite.update(secElapsed);
    }

    draw() {
        gfx.drawSprite(this.sprite);
    }

    walkAway() {
        this.sprite.anim = PlayerData.PlayerAnimAway;
    }

    walkToward() {
        this.sprite.anim = PlayerData.PlayerAnimToward;
    }

    walkLeft() {
        this.sprite.anim = PlayerData.PlayerAnimLeft;
    }

    walkRight() {
        this.sprite.anim = PlayerData.PlayerAnimRight;        
    }

    stop() {
        this.sprite.anim = PlayerData.PlayerAnimStopped;
    }

}

/**
 * @class General game functions
 */
class GameMain {
    constructor() {
        this.balls = [];
        this.blocks = [];
        this.initialized = false;
    }

    /**
     * @public
     */
    init() {

        this.curFrames = 0;
        this.lastFrames = 0;
        this.curSec = 0.0;

        this.player = new Player();

        gfx.drawMode = GfxDrawModeStroke;
        gfx.lineDashes = [4, 2];

        inputSys.registerEvent = "ArrowLeft";
        inputSys.registerEvent = "ArrowRight";
        inputSys.registerEvent = "ArrowUp";
        inputSys.registerEvent = "ArrowDown";

        gfx.color = "#0095DD";
        
        for (let i = 0; i < 10; i++) {
            let b = new Ball(1 + i * 35, 1 + i * 35, 10 + i);
            b.velocity.x = 80.0 + Math.random() * 200.0;
            b.velocity.y = 80.0 + Math.random() * 200.0;
            if (Math.random < 0.5) {
                b.velocity.x = -b.velocity.x;
            }
            if (Math.random < 0.5) {
                b.velocity.y = -b.velocity.y;
            }
        
            this.balls.push(b);

            b = new Block(800 - i * 35, 1 + i * 35, 25 + i, 20 + i);
            b.velocity.x = 60.0 + Math.random() * 150.0;
            b.velocity.y = 60.0 + Math.random() * 150.0;
            if (Math.random < 0.5) {
                b.velocity.x = -b.velocity.x;
            }
            if (Math.random < 0.5) {
                b.velocity.y = -b.velocity.y;
            }
        
            this.blocks.push(b);
        }
        
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
        
        if (inputSys.isKeyPressed("ArrowLeft") && !inputSys.wasKeyPressed("ArrowLeft")) {
            this.player.walkLeft();
        } else if (!inputSys.isKeyPressed("ArrowLeft") && inputSys.wasKeyPressed("ArrowLeft")) {
            this.player.stop();
        } else if (inputSys.isKeyPressed("ArrowRight") && !inputSys.wasKeyPressed("ArrowRight")) {
            this.player.walkRight();
        } else if (!inputSys.isKeyPressed("ArrowRight") && inputSys.wasKeyPressed("ArrowRight")) {
            this.player.stop();
        } else if (inputSys.isKeyPressed("ArrowUp") && !inputSys.wasKeyPressed("ArrowUp")) {
            this.player.walkAway();
        } else if (!inputSys.isKeyPressed("ArrowUp") && inputSys.wasKeyPressed("ArrowUp")) {
            this.player.stop();
        } else if (inputSys.isKeyPressed("ArrowDown") && !inputSys.wasKeyPressed("ArrowDown")) {
            this.player.walkToward();
        } else if (!inputSys.isKeyPressed("ArrowDown") && inputSys.wasKeyPressed("ArrowDown")) {
            this.player.stop();
        }

        let secElapsed = msElapsed / 1000.0;

        this.curFrames++;
        this.curSec += secElapsed;
        if (this.curSec > 1.0) {
            this.curSec = 0.0;
            this.lastFrames = this.curFrames;
            this.curFrames = 0;
        }

        this.player.update(secElapsed);

        // Move the balls based on their velocity
        for (let i = 0; i < this.balls.length; i++) {
            let b = this.balls[i];
            b.update(secElapsed);
            b.color = "#00ff00";
    
            let d = Collide.contains(b.c, new Rectangle(0, 0, gfx.screenWidth, gfx.screenHeight));
    
            if (d.dx != 0) {
                b.c.x -= d.dx;
                b.velocity.x = -b.velocity.x;
            }
            if (d.dy != 0) {
                b.c.y -= d.dy;
                b.velocity.y = -b.velocity.y;
            }
        }

        // Move the blocks based on their velocity
        for (let i = 0; i < this.blocks.length; i++) {
            let b = this.blocks[i];
            b.update(secElapsed);
            b.color = "#0000ff";
    
            let d = Collide.contains(b.r, new Rectangle(0, 0, gfx.screenWidth, gfx.screenHeight));
    
            if (d.dx != 0) {
                b.r.x -= d.dx;
                b.velocity.x = -b.velocity.x;
            }
            if (d.dy != 0) {
                b.r.y -= d.dy;
                b.velocity.y = -b.velocity.y;
            }
        }

        // Check for ball/ball and ball/block collisions
        for (let i = 0; i < this.balls.length; i++) {

            // Collided with another ball?
            let b1 = this.balls[i];
            for (let j = i + 1; j < this.balls.length; j++) {
                let b2 = this.balls[j];
                if (Collide.circleCircle(b1.c, b2.c)) {
                    b1.color = "#ff0000";
                    b2.color = "#ff0000";
                }
            }

            // Collided with a block?
            for (let j = 0; j < this.blocks.length; j++) {
                let b2 = this.blocks[j];
                if (Collide.circleRect(b1.c, b2.r)) {
                    b1.color = "#ff0000";
                    b2.color = "#ff0000";
                }
            }
        }        

        // Check for block/block collisions
        for (let i = 0; i < this.blocks.length; i++) {
            let b1 = this.blocks[i];
            for (let j = i + 1; j < this.blocks.length; j++) {
                let b2 = this.blocks[j];
                if (Collide.rectRect(b1.r, b2.r)) {
                    b1.color = "#ff0000";
                    b2.color = "#ff0000";
                }
            }
        }
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

        this.player.draw();

        // Draw the balls
        for (let i = 0; i < this.balls.length; i++) {
            this.balls[i].draw();
        }

        // Draw the blocks
        for (let i = 0; i < this.blocks.length; i++) {
            this.blocks[i].draw();
        }

        gfx.color = "#000000";
        gfx.drawText("FPS: " + this.lastFrames, 10, 20);
        gfx.drawText("Anim[" + this.player.sprite.curAnim + "][" + this.player.sprite.curFrame + "]", 400, 590);
    }
}

let game = new GameMain();
export default game;
