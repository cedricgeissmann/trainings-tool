define(["jquery", "js/remotecall", "js/util"], function($, rc, util){


  /**
   * TODO: Remove function when no longer used
   */
  function dummy(data){
    console.log(data);
  }



  /**
   * render the login screen
   */
  function renderLoginScreen(){
    require(["jquery", "js/render"], function($, render){

      function addHandlers(){
        require(["jquery", "js/login"], function($, login){
          $("#loginButton").on("click", function(){
            login.login();
          });
        });
      }


      var data = {};
      var elem = "#screen";
      render.render("login.must", data, elem, {callback: addHandlers});
    });
  }


  function loadNavbar(){
    require(["js/navbar"], function(nav){
      nav.renderNav();
    });
  }


  function loadTrainings(){
    require(["js/content_switcher"], function(cs){
      var content = cs.getContent();
      content.switchEntry("trainings");
    });
  }


  /**
   * This function decides if the mainpage should be loaded (this is the case if a user is logged in) or the loggin screen should be displayed.
   * If data has a field .error the login was not successful and the login page needs to be rendered.
   * TODO: display error information to the user, so far log the error.msg to the console.
   */
  function loadMainPage(data){
    if(data.error !== undefined){
      console.log("Login was not successful: " + data.error);     //TODO: remove this line
      renderLoginScreen();
      return false;
    }else{
      //TODO: can check for success in response
      loadNavbar();
      loadTrainings();
      return true;
    }
  }

  return {
    login: function(){
      var data = util.formToJSON("#login");
      rc.call_server_side_function("Auth", "login", data, loadMainPage);
    },

    /**
     * This function is called when first visiting the site.
     * No data is sent to the server, except for cookies.
     * The server responds if a user has already logged in, or with an Error if the user needs to login.
     */
    isLoggedIn: function(){
      rc.call_server_side_function("Auth", "needs_login", {}, loadMainPage);
    },

    getTraining: function(){
      rc.call_server_side_function("TrainingUtil", "getTraining", {}, dummy);
    },
    logout: function(){
      rc.call_server_side_function("Auth", "logout", {}, renderLoginScreen);
    }
  };

});
