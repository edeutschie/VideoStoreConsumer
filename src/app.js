// /src/app.js

// Import jQuery & Underscore
import $ from 'jquery';
import _ from 'underscore';
import MovieList from 'app/collections/movie_list';
import MovieListView from 'app/views/movie_list_view';

var petList = new PetList();
// ready to go
$(document).ready(function() {

  $('section.main-content').append('<p>Hello World!</p>');

  movieList.fetch();

  var options = {
    el: $("#movie-list"),
    model: petList
  };

  var movieListDisplay = new MovieListView(options);
  movieListDisplay.render();

});





$(document).ready(function() {


});
