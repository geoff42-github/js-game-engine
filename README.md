# js-game-engine
Javascript-based game engine and demo.

How to install and run the demo...  
1. Install npm and cli from: https://nodejs.org/en/download/  
2. Make sure you are in the project's directory and have the src and dist subdirectories
3. Install node  
      `npm install node`  
4. Install webpack and it's cli  
      `npm install --save-dev webpack`  
      `npm install --save-dev webpack-cli`  
5. Install JSON loader  
      `npm install json-loader --save-dev`  
6. Build the code  
      `npx webpack --config webpack.config.js`  
7. Run the program  
      load index.html in a browser from the dist folder  
  
The game and demo consist of the following files in src directory:  
- game.js - The game demo related classes (the meat of the game)
- graphics.js - Graphics class for managing rendering functionality
- index.js - Generalized main game loop that calls the game methods
- input.js - Input system for managing keyboard and mouse inputs
- physics.js - Physics-related functionality such as collisions
- primitives.js - Basic primitives used in rendering and physics
