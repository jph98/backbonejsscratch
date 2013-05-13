(function ($) {
  
  // Run model object
  // Models represent serverside objects
  // See: http://backbonetutorials.com/what-is-a-model/
  Run = Backbone.Model.extend({    

    // model defaults
    defaults: {
      name: null,
      description: null
    },

    // initialize function
    initialize: function(){    
      console.log("initialize");

      this.on("change:description", function(model){        
        console.log("runmodel change: " + model.get('description') );
      });      
    },

    // description function
    description: function() {
      return "description: " + this.description;
    }

  });

  // Define a simple user (serverside) object
  // This requires a server to be running to present this
  User = Backbone.Model.extend({
        urlRoot: '/user',
        defaults: {
            name: '',
            email: ''
        }
  });
  
  // Collection: ordered sets of models
  // Inherit all of the Underscore array/collection methods
  // Events are propogated up
  Runs = Backbone.Collection.extend({    
    initialize: function (models, options) {
      this.bind("add", options.view.addRunToList);
    }
  });
  
  // AppView
  AppView = Backbone.View.extend({

    // Access JQuery through $(jQuery)

    // This references the DOM object
    el: $("body"),

    // Initialize constructor
    initialize: function () {

      // Create a new Runs model
      this.runs = new Runs( null, { view: this });       
      // Pass
      console.log("init")
    },      

    // Define our events
    events: {
      "click #add-run": "showPrompt",
    },

    // Show prompt function
    showPrompt: function () {

      var runname = prompt("Run details?");

      var runmodel = new Run({ 
        name: runname,
        description: "default description"
      });

      console.log("Retrieve name " + runmodel.get('name'))
      console.log("Retrieve description " + runmodel.get('description'))
      
      runmodel.on('change', function () {
        console.log('runmodel change');
      });

      runmodel.set('name', 'Run:' + runmodel.get('name'));

      // Both events should fire
      runmodel.set('description', 'NM run');
      
      this.runs.add(runmodel);

      // User actions
      var user = new Usermodel();    
      var userDetails = {
          name: 'Bob',
          email: 'bob@gmail.com'
      };

      console.log(user.toJSON());
    },

    // Add run to list
    addRunToList: function (model) {      
      $("#run-list").append("<li>" + model.get('name') + "</li>");      
    }

  });
  

  var appview = new AppView;
  
})(jQuery);