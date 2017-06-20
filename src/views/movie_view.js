import $ from 'jquery';
import _ from 'underscore';
import Backbone from 'backbone';

var MovieView = Backbone.View.extend({
  tagName: 'li',
  initialize: function(options) {
    this.template = options.template;
    this.movieSearchTemplate = options.movieSearchTemplate;
    this.listenTo(this.model, 'change', this.render);
  },

  render: function() {
    // console.log(this.model.attributes.type);
    if (this.model.attributes.type === "rental") {
      let html = this.template({movie: this.model.toJSON()});
      this.$el.html(html);
      // console.log("in movie render");
      this.delegateEvents();
    }else if (this.model.attributes.type === "search"){
      let html = this.movieSearchTemplate({movie: this.model.toJSON()});
      // console.log("in search render");
      // console.log(this.model);
      this.$el.html(html);
      this.delegateEvents();
    }

    return this;
  },
  events: {
    // "click .show-details": "onClick",
    // "click .delete-button": "deleteMovie",
    "click #add": "orderMovie",
    "click #open": "openForm"
    // "click #rent: "

  },
  deleteMovie: function(event) {
    console.log("deleteMovie called!");
    if (window.confirm("Are you sure you want to delete this movie?")) {
      console.log("going to delete it!");
      this.model.destroy();
    }
  },
  orderMovie: function(event){
    // I don't think we can preventDefault on a button that was
    // inserted with the template.  It will just rerende whenever
    // the user presses it
    // event.preventDefault();
    console.log("orderMovie called");
    var selectedMovie = this.model
    var options = {
      success: 'syncSuccessCallback',
      url: this.model.attributes.url,
      method: "create",

      // data: this.model.toJSON(),
    }
      // console.log( this);
      // console.log( this.model.attributes.url);
      // console.log(this.model.toJSON());
      this.model.emulateHTTP = true;
      this.model.sync("create",selectedMovie,[options]);
      $('#order-form').hide();
      // movieList.fetch();


  },
  syncSuccessCallback: function(collection, response, options){
    console.log("in syncSuccessCallback");
  },

  openForm: function(event) {
    event.preventDefault();
    console.log("open form");
    $('#order-form').show();
    this.trigger('openorderform', this)
  }
});

export default MovieView;
