import Backbone from 'backbone';

var MovieView = Backbone.View.extend({
  tagName: 'li',
  initialize: function(options) {
    this.template = options.template;
    this.movieSearchTemplate = options.movieSearchTemplate;
    this.listenTo(this.model, 'change', this.render);
  },

  render: function() {
    var html = this.template({movie: this.model.toJSON()});
    this.$el.html(html);

    this.delegateEvents();

    return this;
  },
  events: {
    "click .show-details": "onClick",
    "click .delete-button": "deleteMovie",
    // "click #rent: "
  },
  deleteMovie: function(event) {
    console.log("deleteMovie called!");
    if (window.confirm("Are you sure you want to delete this movie?")) {
      console.log("going to delete it!");
      this.model.destroy();
    }
  },
  searchRender: function(){
    var html = this.movieSearchTemplate({movie: this.model.toJSON()});
    this.$el.html(html);

    this.delegateEvents();

    return this;
  }
});

export default MovieView;
