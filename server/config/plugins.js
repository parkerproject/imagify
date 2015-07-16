module.exports = function(server) {
    // The Assets Configuaration Options
    var assetOptions = require('../../assets');

    server.pack.register([
        {
            plugin: require("hapi-assets"),
            options: assetOptions
        },
        {
            plugin: require("hapi-named-routes")
        },
        {
            plugin: require("hapi-cache-buster")
        }
    ], function(err) {
        if (err) throw err;
    });
};
