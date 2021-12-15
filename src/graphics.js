"use strict";

import {
    Circle, 
    Rectangle,
    Sprite
} from "./primitives.js";

export const GfxDrawModeFill = 0;
export const GfxDrawModeStroke = 1;

/**
 * @class Collection of graphics functions
 */
class GraphicsEngine {
    /**
     * @param {HTMLElement} canvasName - Name of the canvas to be used as the destination
     */
    constructor(canvasName) {
        this.canvas = document.getElementById(canvasName);
        this.ctx = this.canvas.getContext("2d");

        this.clearScreen = true;

        this.font = "16px Arial";
        this.color = "#000000";
        this.drawMode = GfxDrawModeFill;
    }

    /**
     * @public
     * @retruns {number} Width in pixels of the rendering area
     */
    get screenWidth() {
        return this.canvas.width;
    }

    /**
     * @public
     * @retruns {number} Height in pixels of the rendering area
     */
    get screenHeight() {
        return this.canvas.height;
    }

    /**
     * @public
     * @retruns {number} Left offset in pixels of the rendering area from the client left edge
     */
    get offsetLeft() {
        return this.canvas.offsetLeft;
    }

    /**
     * @public
     * @param {string} f - String that defines the font to use
     */
    set font(f) {
        this.ctx.font = f;
    }

    /**
     * @public
     * @param {string} c - String that defines the fill style
     */
    set color(c) {
        switch (this.drawMode) {
            case GfxDrawModeStroke:
                this.ctx.strokeStyle = c;
                break;
            case GfxDrawModeFill:
                this.ctx.fillStyle = c;
                break;
            default:
                this.ctx.fillStyle = c;
                this.ctx.strokeStyle = c;
                break;
        }
    }

    /**
     * @public
     * @param {string} r - red 0-255
     * @param {string} g - green 0-255
     * @param {string} b - blue 0-255
     * @param {string} a - alpha 0-1
     */
    setColorRGBA(r,g,b,a) {
        this.color = "rgba(" + r + ", " + g + ", " + b + ", " + a + ")";
    }

    /**
     * @public
     * @param {string} r - red 0-255
     * @param {string} g - green 0-255
     * @param {string} b - blue 0-255
     */
    setColorRGB(r,g,b) {
        this.color = "rgb(" + r + ", " + g + ", " + b + ")";
    }

    /**
     * @public
     * @param {number} w - Pixel width of the lines to be drawn
     */
    set lineWidth(w) {
        this.ctx.lineWidth = w;
    }
    
    /**
     * @public
     * @param {array} dashes - [line pixel length, gap pixel length]
     */
    set lineDashes(dashes) {
        this.ctx.setLineDash(dashes);
    }

    /**
     * @public
     */
    beginDraw() {

        if (this.clearScreen) {
            this.ctx.clearRect(0, 0, this.screenWidth, this.screenHeight);
        }
    }

    /**
     * @public
     */
    endDraw() {

    }

    /**
     * @public
     * @param {Circle} c - Circle to be drawn
     */
    drawCircle(c) {
        this.ctx.beginPath();
        this.ctx.arc(c.x, c.y, c.radius, 0, Math.PI * 2);
        switch (this.drawMode) {
            case GfxDrawModeStroke:
                this.ctx.stroke();
                break;
            default:
                this.ctx.fill();
                break;
        }
        this.ctx.closePath();
    }

    /**
     * @public
     * @param {Rectangle} r - Rectangle to be drawn
     */
    drawRect(r) {
        this.ctx.beginPath();
        this.ctx.rect(r.x, r.y, r.width, r.height);
        switch (this.drawMode) {
            case GfxDrawModeStroke:
                this.ctx.stroke();
                break;
            default:
                this.ctx.fill();
                break;
        }
        this.ctx.closePath();
    }

    /**
     * @public
     * @param {Sprite} s - Animated Sprite to be drawn
     */
    drawSprite(s) {
        if (s.img.complete) {
            if (s.frames == null) {
                if (s.width == 0 || s.height == 0) {
                    this.ctx.drawImage(s.img, s.x, s.y);
                }
                else {
                    this.ctx.drawImage(s.img, s.x, s.y, s.width, s.height);
                }
            }
            else {
                if (s.width == 0 || s.height == 0) {
                    this.ctx.drawImage(s.img, s.animFrame.x, s.animFrame.y, s.animFrame.width, s.animFrame.height, s.x, s.y, s.animFrame.width, s.animFrame.height);
                }
                else {
                    this.ctx.drawImage(s.img, s.animFrame.x, s.animFrame.y, s.animFrame.width, s.animFrame.height, s.x, s.y, s.width, s.height);
                }
            }
        }
    }

    /**
     * @public
     * @param {String} txt - Text to be displayed
     * @param {Number} x - X location of the text
     * @param {Number} y - y location of the text
     */
    drawText(txt, x, y) {
        this.ctx.fillText(txt, x, y);
    }
}

let gfx = new GraphicsEngine("myCanvas");
export default gfx;
