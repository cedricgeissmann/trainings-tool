define(["js/render", "js/remotecall", "js/util", "lib/bootstrap"], function(render, rc, util){

  /**
   * This function is called after the data is rendered. Call here the event handlers that should be appended to the new elements.
   */
  function postRender(){

  }

  /**
   * This function takes the data returned from the server, and renders them to display to the client.
   * A postrender function is called to add eventHandlers to the newly rendered elements.
   */
  function renderTrainings(data, callback){
    render.render("profile.must", data.result, "#screen", callback);

  }

  var pub = {
    /**
     * This function gets the data from the server, and passes it to a specified callback function
     */
    loadContent: function(callback){
      rc.call_server_side_function("TrainingUtil", "getTraining", {}, callback.execute);
    },
    render: function(data, callback){
      callback.needs_reload(callback.name, false);
      callback.postRender = postRender;
      renderTrainings(data, callback);
    },
    postRender: function(){
      postRender();
    }
  };

  return pub;
});
