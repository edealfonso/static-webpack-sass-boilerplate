# Webpack SASS Boilerplate for static HTML

by Elsa de Alfonso
elsa.de.alfonso@gmail.com

## Features
- SASS
- Source Maps in development
- Minimize HTML, JS, CSS in production

## Instructions

Write your static page in `src/index.html`,  your SASS code in `src/sass`, and your Javascript code in `src/js/index.js`.

You should put all other static files like images in `src/static` folder. In the HTML file, you should reference your static files with relative paths.

CSS and Javascript is already loaded in the HTML file. All files to which your SASS/Javascript point will be automatically copied and its name codified.

In the development phase, bundle with `npm run dev` and see your page using a Live Server in `src/index.html`.

In order to bundle for production, execute  `npm run prod` and copy the contents of the `dist` directory to your server.