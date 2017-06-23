import $ from 'jquery';
import _ from 'underscore';
import Backbone from 'backbone';
import MovieView from './movie_view';
import MovieList from '../collections/movie_list';

var MovieListView = Backbone.View.extend({
  initialize: function(options) {
    this.movieTemplate = _.template($("#movie-card-template").html());
    this.movieDetailTemplate = _.template($("#movie-info-template").html());
    this.movieSearchTemplate= _.template($("#search-card-template").html());
    this.listElement = this.$(".movie-card");


    this.movieList = [];

    this.model.forEach(function(rawMovie) {
      this.addMovie(rawMovie);
    }, this);

    this.listenTo(this.model, '#search', this.getInput);
    this.listenTo(this.model, 'add', this.addMovie);
    this.listenTo(this.model, 'update', this.render);
  },

  render: function() {
    var self = this;
    console.log("here!");
    this.listElement.empty();


    this.movieList.forEach(function(movieView){
      movieView.render();

      this.listElement.prepend(movieView.$el);

      self.listenTo(movieView, 'openorderform', self.showMovieDetails);

    }, this,

  );

    return this;
  },

  events: {
    'click #search': 'getInput',
    'click #close': 'hideMovieDetails',
    'click #order-movie': 'orderMovie'
  },

  orderMovie: function(event) {
    if (this.movieInModal) {
      var order_count = this.$('#inventory').val();
      this.movieInModal.orderMovie(order_count);
    }
    console.log(this);
  },

  createMovie: function(event) {
    event.preventDefault();

    var rawMovie = this.getInput();
    this.model.create(rawMovie);
    this.clearInput();
  },

  addMovie: function(movie) {
    console.log("orig url");
    console.log("test" + movie.attributes.image_url);

    var cleanImage_url = movie.attributes.image_url.replace("https://image.tmdb.org/t/p/w185","");
    var movieView = new MovieView({
      model: movie,
      template: this.movieTemplate,
      movieSearchTemplate : this.movieSearchTemplate
    });

    // if (movie.attributes.image_url.includes("lorem")) {
    //   movie.set({image_url:cleanImage_url});
    //   console.log("clean url");
    // }

      console.log(movie.attributes.image_url);

    this.movieList.push(movieView);
  },

  showMovieDetails: function(movieView) {
    console.log("in Show Movie Details");

    this.movieInModal = movieView;

    var movieDetailsTemplate = this.movieDetailTemplate({movie: movieView.model.toJSON()});
    $('#order-form').html(movieDetailsTemplate);
    $("#order-form").show();
  },

  hideMovieDetails: function(event) {
    this.movieInModal = undefined;
    $("#order-form").hide();
  },

  getInput: function() {
    var searchList = new MovieList(),
    query = this.$('#title').val(),
    url = this.model.url;
    console.log("search url");
    console.log(url);
   searchList.fetch({
     url:url + "?query=" + query,
     success:this.searchRender
   }
 );
 var options = {el: $('main'),model: searchList},
 searchListView = new MovieListView(options);
  },

  clearInput: function(event) {
    console.log("clearInput called!");
    this.input.title.val('');
  },

  searchRender: function(collection, response, options) {
       collection.forEach(function(movie){
          movie.set({type:"search"})
        })
 },

});

export default MovieListView;
