
define(["jquery", "lib/mustache"], function($, mus){


  function includeHTML(html, elem){
    $(elem).html(html);
  }

  var pub = {
    render: function(template_name, data, elem, callback){
      var template_to_load = "text!templates/" + template_name;
      require([template_to_load], function(templ){
        var res = mus.render(templ, data);
        includeHTML(res, elem);
        callback.callback(callback.name, res);
        if(callback.postRender !== undefined){
          callback.postRender();
        }
      });
    },
    renderReturn: function(template_name, data){
      var template_to_load = "text!templates/" + template_name;
      require([template_to_load], function(templ){
        return mus.render(templ, data);
      });

    }
  };

  return pub;

});
