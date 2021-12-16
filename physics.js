"use strict";

import { 
    Rectangle, 
    Circle
} from "./primitives.js";

/**
 * @class Collection of physics functions
 */
 export default class Physics {
 }

/**
 * @class Collection of Collision functions
 */
export class Collide {

    /**
     * @public
     * @param {Object} inner - Circle or Rectangle to be checked if contained in the outer object
     * @param {Object} outer - Circle or Rectangle to be checked if contains the inner object 
     * @returns {Ojbect} - Returns the extents the circle is out of bounds as {dx, dy} in pixels
     */
    static contains(inner, outer) {
        let dx = 0;
        let dy = 0;

        if (inner.left < outer.left) {
            dx = inner.left - outer.left;
        } else if (inner.right >= outer.right) {
            dx = inner.right - outer.right;
        }

        if (inner.top < outer.top) {
            dy = inner.top - outer.top;
        } else if (inner.bottom >= outer.bottom) {
            dy = inner.bottom - outer.bottom;
        }

        return { "dx": dx, "dy": dy };
    }

    /**
    * @public
    * @param {Circle} c1
    * @param {Circle} c2
    * @returns {boolean} - True if the circles are colliding
    */
    static circleCircle(c1, c2) {

        let dx = c2.x - c1.x;
        let dy = c2.y - c1.y;

        let dr = c1.radius + c2.radius;

        return ((dx * dx + dy * dy) < (dr * dr));
    }

    /**
    * @public
    * @param {Rectangle} r1
    * @param {Rectangle} r2
    * @returns {boolean} - True if the rectangles are colliding
    */
    static rectRect(r1, r2) {

        return (
            r1.right >= r2.left &&
            r1.left <= r2.right &&
            r1.bottom >= r2.top &&
            r1.top <= r2.bottom
        );
    }

    /**
    * @public
    * @param {Circle} c
    * @param {Rectangle} r
    * @returns {boolean} - True if the circle and rectangle are colliding
    */
    static circleRect(c, r) {
        
        // Find the distance between the nearest point on the rect and the circle
        let dx = Math.max(r.left, Math.min(c.x, r.right)) - c.x;
        let dy = Math.max(r.top, Math.min(c.y, r.bottom)) - c.y;

        return (dx * dx + dy * dy) <= c.radius * c.radius;
    }
}
