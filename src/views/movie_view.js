import Backbone from 'backbone';

var MovieView = Backbone.View.extend({
  initialize: function(options) {
    this.template = options.template;

    this.listenTo(this.model, 'change', this.render);
  },

  render: function() {
    // console.log(this.model.attributes.name);
    var html = this.template({movie: this.model.toJSON()});
    // console.log(info);
    this.$el.html(html);

    this.delegateEvents();

    return this;
  },
  events: {
    // "click .show-details": "onClick",
    "click .delete-button": "deleteMovie",
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
