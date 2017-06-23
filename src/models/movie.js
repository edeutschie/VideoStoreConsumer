import Backbone from 'backbone';

var  Movie = Backbone.Model.extend({
  defaults: {
    type : "rental",
    inventory: 0,
    url:'http://localhost:3000/movies',
  },
  initialize: function(options) {
    
  }

});


export default Movie;
