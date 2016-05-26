requirejs.config({
  baseUrl: "./",
  paths: {
    js: "jscript",
    lib: "lib",
    jquery: "lib/jquery",
    templates: "templates",
    text: "lib/text"
  },
  //TODO: remove urlArgs in productive environment
 urlArgs: "bust=" + (new Date()).getTime()
});



var gtc;
require(["js/training-creator"], function(tc){
  gtc = tc;
  gtc.init();
  setTimeout(function(){gtc.training.renderTraining();}, 1000);
});
