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
    const backgroundImageStyleProperty = "url(\" " + this.model.attributes.image_url.replace("https://image.tmdb.org/t/p/w185","")+ "\") ";
    if (this.model.attributes.type === "rental") {
      var html = this.template({movie: this.model.toJSON()});
      //  this.$el.css({
      //    'background-image':backgroundImageStyleProperty,
      //    'background-size':'contain',
      //    'height': '278px',
      //    'width': '185px',
      //    'display': 'inline-block'
      //  });
      this.$el.html(html)
      this.delegateEvents();
    }else if (this.model.attributes.type === "search"){
    const  backgroundImageStyleProperty = "url(\" " + this.model.attributes.image_url+ "\") ";
    var html = this.movieSearchTemplate({movie: this.model.toJSON()});
      //  this.$el.css({
      //    'background-image':backgroundImageStyleProperty,
      //    'height': '278px',
      //    'width': '185px',
      //    'display': 'inline-block'
      //  });
      this.$el.html(html);
    }

    return this
  },
  events: {
    "click #add": "orderMovie",
    "click #open": "openForm"

  },

  deleteMovie: function(event) {
    console.log("deleteMovie called!");
    if (window.confirm("Are you sure you want to delete this movie?")) {
      console.log("going to delete it!");
      this.model.destroy();
    }
  },
  
  orderMovie: function(order_count){

    console.log("orderMovie called");
    var selectedMovie = this.model;
    selectedMovie.set({inventory:order_count});
    console.log(selectedMovie.attributes);
    var options = {
      success: 'syncSuccessCallback',
      url: this.model.attributes.url,
      method: "create",
    }
      this.model.emulateHTTP = true;
      this.model.sync("create",selectedMovie,[options]);
      $('#order-form').hide();

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
