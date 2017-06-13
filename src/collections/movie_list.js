import Movie from 'app/models/movie';

var MovieList = Backbone.Collection.extend({
  model: Movie,
  url: 'localhost:3000/movies',

  // parse: function(data) {
  //   return data;
  // }

});

export default MovieList;
