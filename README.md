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
  
`/src` Source code directory
- graphics.js - Graphics class for managing rendering functionality
- input.js - Input system for managing keyboard and mouse inputs
- physics.js - Physics-related functionality such as collisions
- primitives.js - Basic primitives used in rendering and physics
- index.js - Generalized main game loop that calls the game methods
- game.js - The game demo related classes (the meat of the game)
- background.js - Manages the parallax scrolling background layers
- player.js - The player's avatar  
  
`/dst` Distributable directory (old school bin) - everything needed to run the game  
- index.html - Very basic html used to instantiate the game demo  
- main.js - Created only after running webpack
- PNG files - Images used in the demo
