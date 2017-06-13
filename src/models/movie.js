import Backbone from 'backbone';

var  Movie = Backbone.Model.extend({
  defaults: {
    title: "Avvo"  
  },
  initialize: function(options) {
    console.log("Created new movie with options ");
  }
  // toggleComplete: function() {
  //   var newStatus = !(this.get('complete'));
  //   this.set('complete', newStatus);
  //   this.save();
  // }
});


export default Movie;
