// This is the base controller. Used for base routes, such as the default index/root path, 404 error pages, and others.
var swig = require('swig');


module.exports = {
  index: {
    handler: function (request, reply) {

      reply.view('index', {

        title: 'Manipulate images on the fly'
      });

    }
  },

  awesome: {
    handler: function (request, reply) {

      reply.view('awesome', {

        title: 'Manipulate images on the fly',
        id: 'docs'
      });

    }
  }
};