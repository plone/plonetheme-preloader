# plonetheme-preloader

## Purpose

The `plonetheme-preloader` is a [Webpack preloader](http://webpack.github.io/docs/using-loaders.html) allows to override the default Plone theme with a custom theme.

Files (HTML, CSS) are overrided according their path (if the custom theme provides `css/style.css` it will override `css/style.css` from the default theme).

## Usage

``` console
npm install https://github.com/pyrenees/plonetheme-preloader.git
```

In webpack.config.js:

``` javascript
    ...
    module: {
        preLoaders: [{
          test: /\.(html|css)$/,
          loader: "plonetheme-preloader?themepath=src/my-theme"
        }],
    ...
```

The theme path is relative to the app root.

## License

BSD (http://opensource.org/licenses/BSD-3-Clause)
