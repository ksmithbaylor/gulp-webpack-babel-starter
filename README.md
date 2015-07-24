# gulp-webpack-babel-starter

This is a starter template for a blank frontend JavaScript project. It uses:

* Webpack to compile all frontend modules and dependencies to a bundle
* Babel so you can write awesome ES6 goodness
* Sass for awesome preprocessed styles
* Gulp as a build tool. Tasks include:
    * `build-js` - Compiles all JS to a bundle using Webpack. Webpack is
      configured in `webpack.config.js`. It uses `./src/app.js` as its entry
      point and `./dist/main.js` as its output path by default.
    * `compile-sass` - Compiles sass to plain css
    * `copy-static` - Copies non-compiled resources like css and html
    * `build` - Executes all of the above once
    * `dev` - Runs `build` and then watches files for changes, running the
      relevant tasks when needed. It also starts a dev server (found in
      `./server.js`) and live-reloads the page whenever anything changes.

By default, it includes a minimalistic React "hello world" example, but this can
be replaced by anything. React is not needed.

## Usage:

First, install dependencies:

    $ npm install

Normal development:

    $ gulp

Single build:

    $ gulp build

Single production build:

    NODE_ENV=production gulp build
