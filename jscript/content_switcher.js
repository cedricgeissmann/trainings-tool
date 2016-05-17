define(["jquery"], function($){

  //use content as a module variable. instantiate it when it is used first, right after the navbar is loaded, or override it, to clear the cache.
  var content;


  Content = function(){
    //Get an array of all html-elements that contain the data-itentifier. The different identifiers will build the page content.
    //
    var elements = $("[data-identifier]");
    var contents = [];
    $.each(elements, function(i, obj){
      var name = $(obj).data("identifier");
      contents[name] = new ContentEntry();
    });

    /**
     * Since this function throws an error, no boolean has to be returned.
     */
    this.checkIfContentExists = function(name){
      if(contents[name] === undefined){
        throw "There is no content with the name: " + name;
      }
    };

    this.addEntry = function(name, data, html, needs_reload){
      content.checkIfContentExists(name);

      contents[name].needs_reload = needs_reload === undefined ? true : needs_reload;
      contents[name].content = data;
      contents[name].html = html;
    };

    this.set_needs_reload = function(name, needs_reload){
      content.checkIfContentExists(name);
      contents[name].needs_reload = needs_reload === undefined ? true : needs_reload;
    };


    this.addData = function(name, data){
      content.checkIfContentExists(name);
      contents[name].content = data;
    };


    this.addHTML = function(name, html){
      content.checkIfContentExists(name);
      contents[name].html = html;
    };


    /**
     * TODO: Remove
     *
     * DO NOT LONGER USE THIS FUNCTION
     *
     */
    this.getEntry = function(contentName){
      this.checkIfContentExists(contentName);
      var entry = contents[contentName];
      return entry;
    };

    this.generateEntry = function(name){
      require(["js/"+name], function(loader){
        /**
         * This callbackObj contains multiple functions.
         * One function is the addEntry from this object.
         * Another function is the render function that will deal with the data.
         */
        var CallbackObj = function(){
          this.execute = function(data, needs_reload){
            render(data);
            content.addData(name, data);
          };
          render = function(data){
            //Just call the rendering function defined in the loader here, and pass the data.
            loader.render(data, {callback: content.addHTML, name: name, needs_reload: content.set_needs_reload});
          };
          addEntry = function(data, html){
            content.addEntry(name, data, html, true);
          };
        };
        loader.loadContent(new CallbackObj());
      });
    };


    this.switchEntry = function(contentName){
      if(contents[contentName] === undefined){
        contents[contentName] = new ContentEntry();
      }
      var entry = contents[contentName];

      if(entry.html === "" || entry.needs_reload){
        this.generateEntry(contentName);
        //throw "There is no html. Create it and display it in the #screen";
      }else{
        //content and html can be reloaded from cache
        $("#screen").html(entry.html);
      }
      //TODO: Add trasition

    };

  };


  ContentEntry = function(){
    this.html = "";
    this.content = {};
    this.needs_reload = true;
  };

  var pub = {
    initialize: function(){
      content = new Content();
    },
    getContent: function(){
      if(content === undefined){
        this.initialize();
      }
      return content;
    }
  };


  return pub;
});
