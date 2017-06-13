import Movie from 'app/models/movie';

var MovieList = Backbone.Collection.extend({
  model: Movie,
  url: 'http://petdibs.herokuapp.com/pets',

  // parse: function(data) {
  //   return data;
  // }

});

export default MovieList;
