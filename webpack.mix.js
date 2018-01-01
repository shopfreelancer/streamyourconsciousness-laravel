let mix = require('laravel-mix');

/*
 |--------------------------------------------------------------------------
 | Mix Asset Management
 |--------------------------------------------------------------------------
 |
 | Mix provides a clean, fluent API for defining some Webpack build steps
 | for your Laravel application. By default, we are compiling the Sass
 | file for the application as well as bundling up all the JS files.
 |
 */

mix.js('resources/assets/js/app.js', 'public/js');
mix.webpackConfig({
    devtool: "inline-source-map"
});

mix.styles([
    'public/css/vendor/FontAwesome/font-awesome.min.css',
    'public/css/vendor/animate.css',
    'public/css/vendor/bootswatch-slate.min.css',
], 'public/css/app.css');
