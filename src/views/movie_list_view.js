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

    // this.input = {
    // title: this.$('.new-movie input[name="name"]'),
    // age: this.$('.new-movie input[name="age"]'),
    // breed: this.$('.new-movie input[name="breed"]')
    // };
    this.listenTo(this.model, '#search', this.getInput);
    this.listenTo(this.model, 'add', this.addMovie);
    this.listenTo(this.model, 'update', this.render);
    // this.listenTo(this.model, 'remove', this.removeMovie);
  },

  render: function() {
    // var self = this;
    console.log("here");
    this.listElement.empty();

    this.movieList.forEach(function(movieView){
      movieView.render();
      // console.log(movieView.model);

      this.listElement.append(movieView.$el);
    }, this);

    return this;
  },

  events: {
    'click #search': 'getInput',
    'click .movie-poster': 'showMovieDetails'
    // 'submit .new-movie': 'createMovie',
    // 'click .clear-button': 'clearInput'
  },

  createMovie: function(event) {
    event.preventDefault();

    var rawMovie = this.getInput();
    this.model.create(rawMovie);
    this.clearInput();
  },

  addMovie: function(movie) {
    var movieView = new MovieView({
      model: movie,
      template: this.movieTemplate,
      movieSearchTemplate : this.movieSearchTemplate
    });

    // this.listenTo(movieView, 'showDetailsClicked', this.showMovieDetails);
    // this.listenTo(movieView,'getInput') find the right callback
    // this.listenTo(movie, 'edit', this.editMovie);

    this.movieList.push(movieView);
  },

  showMovieDetails: function(event) {
    event.preventDefault();
    console.log("in Show Movie Details");
    // console.log(this);
    this.render();
  },

      // this.listElement.empty();

    //   this.movieList.forEach(function(movieView){
    //   movieView.searchRender();
    //   console.log("word");
    //
    //   this.listElement.append(movieView.$el);
    // }, this);

  //   return this;
  // },

  getInput: function() {
    var searchList = new MovieList(),
    query = this.$('#title').val(),
    url = this.model.url;
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

  // this.listenTo(movie, 'edit', this.editPet);


});

export default MovieListView;
