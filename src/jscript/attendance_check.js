define(["js/render", "js/remotecall", "js/util", "lib/bootstrap"], function(render, rc, util){

  function log(data){
    console.log(data);
  }

  function showOnlyHandler(){
    var date = $("#showOnlyValue").val();
    showPanelsByDate(date);
  }

  function hideOthersHandler(){
    var date = $(this).data("date");
    showPanelsByDate(date);
  }

  function showPanelsByDate(date){
    $(".panel[data-date!=" + date + "]").hide();
  }

  function sendAttendanceDataToServer() {
    var tid = $(this).data("id");
    var elementsToSend = $("[data-tid=" + tid + "]");
    //Build a new data-Object which will be sent to the server. This object contains the trainings id and a list of usernames and subscribetype.
    var to_send = new SendData(tid, elementsToSend);
    //The data can now be sent to the server. Callback function will be a user notification.
    //
    rc.call_server_side_function("TrainingUtil", "completeCheck", to_send, log);
  }

  SendData = function(id, list){
    this.id = id;
    var attendance_list = [];
    $.each(list, function(i, obj){
      var username = $(obj).data("username");
      var subscribeType = $(obj).is(":checked");

      attendance_list.push(new UserSubscription(username, subscribeType));
    });
    this.attendance_list = attendance_list;
  };

  UserSubscription = function(username, subscribeType){
    subscribeType = subscribeType ? 1 : 0;
    this.username = username;
    this.subscribe_type = subscribeType;
  };

  function addSendButtonHandlers(){
    util.addHandlerToElements(".send-attendance-check", "click", sendAttendanceDataToServer);
    util.addHandlerToElements(".hide-others", "click", hideOthersHandler);
    util.addHandlerToElements("#showOnlyButton", "click", showOnlyHandler);
  }



  /**
   * This function is called after the data is rendered. Call here the event handlers that should be appended to the new elements.
   */
  function postRender(){
    addSendButtonHandlers();
  }

  /**
   * This function takes the data returned from the server, and renders them to display to the client.
   * A postrender function is called to add eventHandlers to the newly rendered elements.
   */
  function renderTrainings(data, callback){
    render.render("attendance_commit.must", data.result, "#screen", callback);
    //render.render("attendance_check.must", data.result, "#screen", callback);
    render.render("attendance_filter.must", {}, "#left-canvas");

  }

  var pub = {
    /**
     * Request the data for trainings from the server and hand them to a render function.
     */
    loadTrainings: function(){
      //rc.call_server_side_function("TrainingUtil", "getTraining", {}, renderTrainings);
    },
    /**
     * This function gets the data from the server, and passes it to a specified callback function
     */
    loadContent: function(callback){
      rc.call_server_side_function("TrainingUtil", "getAttendanceList", {}, callback.execute);
      //rc.call_server_side_function("TrainingUtil", "attendanceCheck", {}, callback.execute);
    },
    render: function(data, callback){
      callback.postRender = postRender;
      renderTrainings(data, callback);
    },
    postRender: function(){
      postRender();
    }
  };

  return pub;
});
