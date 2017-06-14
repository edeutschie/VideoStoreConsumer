  import $ from 'jquery';
  import _ from 'underscore';
  import Backbone from 'backbone';
  import MovieView from './movie_view';
  import MovieList from '../collections/movie_list';

  var MovieListView = Backbone.View.extend({
    initialize: function(options) {
      this.movieTemplate = _.template($("#movie-card-template").html());

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
      // this.listenTo(this.model, '#search', this.getInput);
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

        this.listElement.append(movieView.$el);
      }, this);
      // console.log(this.model);

      return this;
    },

    events: {
      'click #search': 'getInput'
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
        template: this.movieTemplate
      });

      // this.listenTo(petView, 'showDetailsClicked', this.showPetDetails);

      this.listenTo(movie, 'edit', this.editMovie);

      this.movieList.push(movieView);
    },

    getInput: function() {
    var searchList = new MovieList(),
      query = this.$('#title').val(),
      url = this.model.url,
     result =searchList.sync('read', 'movie', {url:url + "?query=" +query})
     console.log(this);
     var searchListView = new MovieListView({el: $('main'),model: movieList});
     searchListView.render()



      // console.log('a');
        // age: this.input.age.val(),
        // breed: this.input.breed.val()

      // console.log("Searched Something:");
      // console.log(movie);

      // return movie;
    },

    clearInput: function(event) {
      console.log("clearInput called!");
      this.input.title.val('');
      // this.input.age.val('');
      // this.input.breed.val('');
    }

      // this.listenTo(movie, 'edit', this.editPet);


  });

  export default MovieListView;
