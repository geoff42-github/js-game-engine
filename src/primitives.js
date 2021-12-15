"use strict";

/**
 * @class Animated Sprite
 */
    export class Sprite {

    /**
     * @param {string} fileName - Path and name of image file to load
     * @param {number} framesPerSecond - Animation rate
     */
    constructor(imageFileName, frameData, framesPerSecond) {

        this.secPerFrame = 1.0 / framesPerSecond;
        this.curSeconds = 0.0;
        this.curFrame = 0;
        this.curAnim = 0;

        this.frames = null;

        if (frameData != null) {
            this.frames = new Array(frameData.length);
    
            for (let i = 0; i < frameData.length; i++) {
                this.frames[i] = new Array(frameData[i].numFrames);
                for (let j = 0; j < frameData[i].numFrames; j++) {
                    this.frames[i][j] = new Rectangle(frameData[i].x + j * frameData[i].w, frameData[i].y, frameData[i].w, frameData[i].h);
                }
            }
        }

        this.x = 0;
        this.y = 0;

        this.width = 0;
        this.height = 0;

        this.img = new Image();
        this.img.src = imageFileName;
    }

    /**
     * @public
     * @retruns {Rectangle} - The current source frame of the animation
     */
     get animFrame() {
        if (this.frames == null) {
            return new Rectangle(0, 0, 0, 0);
        }
        else {
            return this.frames[this.curAnim][this.curFrame];
        }
    }

    /**
     * @public
     * @params {number} - Index of the new animation
     */
     set anim(animIndex) {
        this.curFrame = 0;
        this.curAnim = animIndex;
    }

    /**
     * @public
     * @param {number} secElapsed - Seconds elapsed since last update
     */
    update(secElapsed) {
        
        if (this.frames == null || this.frames[this.curAnim].length == 0) {
            return;
        }

        this.curSeconds += secElapsed;
        if (this.curSeconds >= this.secPerFrame) {
            this.curFrame++;
            this.curSeconds = 0.0;
            if (this.curFrame >= this.frames[this.curAnim].length) {
                this.curFrame = 0;
            }
        }        
    }
}

/**
 * @class 2-Dimensional vector
 */
export class Vector2d {

    /**
     * @param {number} x - x location of vector (from 0)
     * @param {number} y - y location of vector (from 0)
     */
    constructor(x, y) {
        this.x = x;
        this.y = y;
    }

    /**
     * @public
     * @returns {number} - Magnitude of the vector
     */
    get magnitude() {
        return Math.sqrt(this.x * this.x + this.y * this.y);
    }

    /**
     * @public
     * @returns {number} - Sqaured magnitude of the vector
     */
    get magnitudeSquared() {
        return this.x * this.x + this.y * this.y;
    }

    /**
     * @public
     * @param {number} m - New magnitude
     */
    set magnitude(m) {
        let ratio = m / this.magnitude;
        this.x = ratio * this.x;
        this.y = ratio * this.y;
    }
}

/**
 * @class Circle
 */
export class Circle {

    /**
     * @param {number} x - x location of circle center
     * @param {number} y - y location of circle center
     * @param {number} r - radius of circle
     */
    constructor(x, y, r) {
        this.x = x;
        this.y = y;
        this.radius = r;
    }

    /**
     * @public
     * @returns {number} - Left edge of the circle
     */
    get left() {
        return this.x - this.radius;
    }

    /**
     * @public
     * @returns {number} - Right edge of the circle
     */
    get right() {
        return this.x + this.radius;
    }

    /**
     * @public
     * @returns {number} - Top edge of the circle
     */
    get top() {
        return this.y - this.radius;
    }

    /**
     * @public
     * @returns {number} - Bottom edge of the circle
     */
    get bottom() {
        return this.y + this.radius;
    }

    /**
     * @public
     * @returns {number} - Area of the circle
     */
    get area() {
        return Math.PI * this.radius * this.radius;
    }

    /**
     * @public
     * @returns {number} - Circumference of the circle
     */
    get circumference() {
        return 2 * this.radius * Math.PI;
    }
}

/**
 * @class Rectangle
 */
export class Rectangle {

    /**
     * @param {number} x - x location of rectangle's upper left corner
     * @param {number} y - y location of rectangle's upper left corner
     * @param {number} w - Width of rectangle
     * @param {number} h - Height of rectangle
     */
    constructor(x, y, w, h) {
        this.x = x;
        this.y = y;
        this.width = w;
        this.height = h;
    }

    /**
     * @public
     * @returns {number} - Left edge of the rectangle
     */
    get left() {
        return this.x;
    }

    /**
     * @public
     * @returns {number} - Right edge of the rectangle
     */
    get right() {
        return this.x + this.width;
    }

    /**
     * @public
     * @returns {number} - Top edge of the rectangle
     */
    get top() {
        return this.y;
    }

    /**
     * @public
     * @returns {number} - Bottom edge of the rectangle
     */
    get bottom() {
        return this.y + this.height;
    }

    /**
     * @public
     * @returns {number} - Area of the rectangle
     */
    get area() {
        return this.width * this.height;
    }

    /**
     * @public
     * @returns {number} - Circumference of the rectangle
     */
    get circumference() {
        return this.width + this.width + this.height + this.height;
    }
}