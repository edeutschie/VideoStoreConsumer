// /src/app.js

// Import jQuery & Underscore
import $ from 'jquery';
import _ from 'underscore';
import MovieList from 'collections/movie_list';
import MovieListView from 'views/movie_list_view';

var movieList = new MovieList();

// ready to go
$(document).ready(function() {

  $('section.main-content').append('<p>Hello World!</p>');

  movieList.fetch();

  var options = {
    el: $('main'),
    model: movieList
  };

  var movieListDisplay = new MovieListView(options);
  movieListDisplay.render();

  $('#order-form').hide();

  $('#library').click(function() {
    movieList.fetch();
  });

});
