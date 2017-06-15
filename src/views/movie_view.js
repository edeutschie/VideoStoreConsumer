import Backbone from 'backbone';

var MovieView = Backbone.View.extend({
  tagName : 'article',
  initialize: function(options) {
    this.template = options.template;

    this.listenTo(this.model, 'change', this.render);
  },



  render: function() {
    var backgroundImageStyleProperty = "url(\" " + this.model.attributes.image_url+ "\") ",
     html = this.template({movie: this.model.toJSON()});
    this.$el.html(html);
    console.log(this.model.attributes);
    // this.$el.css({
    //   'background-image':backgroundImageStyleProperty,
    //  'height': '278px',
    //  'width': '185px',
    //  'display': 'inline-block'
    // });
    // console.log(this.model.attributes);
    console.log(html);
    this.delegateEvents();

    return this;
  },
  events: {
    "click .show-details": "onClick",
    "click .delete-button": "deleteMovie",
    // 'click .movie-poster': 'showMovieDetails'

  },
  showMovieDetails: function(event) {
    event.preventDefault();
    console.log("in Show Movie Details");
    var html = this.movieDetailTemplate({movie: this.model.toJSON()});
    // $("#movie").append(html);
    console.log(this.model);
  },
  deleteMovie: function(event) {
    console.log("deleteMovie called!");
    if (window.confirm("Are you sure you want to delete this movie?")) {
      console.log("going to delete it!");
      this.model.destroy();
    }
  }
});

export default MovieView;
