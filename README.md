# plonetheme-preloader

## Purpose

The `plonetheme-preloader` is a [Webpack preloader](http://webpack.github.io/docs/using-loaders.html) allows to override the default Plone theme with a custom theme.

Files (HTML, CSS) are overrided according their path (if the custom theme provides `css/style.css` it will override `css/style.css` from the default theme).

The custom theme can be provided as a local folder, or as a remote Plone backend.

## Usage

``` console
npm install https://github.com/pyrenees/plonetheme-preloader.git
```

### Local folder
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

### Plone backend

In webpack.config.js:

``` javascript
    ...
    module: {
        preLoaders: [{
          test: /\.(html|css)$/,
          loader: "plonetheme-preloader?backend=http://plone"
        }],
    ...
```

## License

BSD (http://opensource.org/licenses/BSD-3-Clause)
