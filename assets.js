// assets to be used by the 'hapi-assets' module based on process.env.NODE_ENV
module.exports = {
  development: {
    js: ['js/jquery.min.js',
      'js/TweenMax.min.js',
      'js/ScrollToPlugin.min.js',
      'js/bootstrap.min.js',
      'js/flexslider.min.js',
      'js/smooth-scroll.min.js',
      'js/placeholders.min.js',
      'js/twitterfetcher.min.js',
      'js/spectragram.min.js',
      'js/parallax.js',
      'js/scripts.js',
      'js/angular.min.js',
      'js/main.js'
    ],

    css: ['css/bootstrap.min.css',
      'css/icons.min.css',
      'css/flexslider.min.css',
      'css/theme.css',
      'css/custom.css'
    ]
  },
  production: {
    js: ['js/scripts.min.js'],
    css: ['css/app.min.css']
  }
};