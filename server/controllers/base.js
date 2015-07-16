// This is the base controller. Used for base routes, such as the default index/root path, 404 error pages, and others.
require('dotenv').load();
var swig = require('swig');

module.exports = {
    index: {
        handler: function(request, reply) {
            reply.view('index', {

                title: 'Resize your images on the fly'
            });

        },
        app: {
            name: 'index'
        }
    }
};
