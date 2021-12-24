"use strict";

import game from "./game/game.js";

var elapsedMs = 0.0;
var lastFrameMs = 0.0;
const MaxElapsedMs = 50;

function gameLoop() {

    if (!game.initialized) {
        game.init();
    }

    if (lastFrameMs == 0) {
        lastFrameMs = Date.now();
    }
    else {
        let curMs = Date.now();
        elapsedMs = curMs - lastFrameMs;
        lastFrameMs = curMs;

        elapsedMs = Math.min(elapsedMs, MaxElapsedMs);
    }

    game.preUpdate(elapsedMs);
    game.preDraw();

    game.update(elapsedMs);
    game.draw();

    game.postUpdate(elapsedMs);
    game.postDraw();
    
    requestAnimationFrame(gameLoop);
}

gameLoop();