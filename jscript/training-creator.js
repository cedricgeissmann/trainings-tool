/**
 * This is the training-creator module. This module defines the workflow for creating a new training and add the training-plan to an existing training.
 *
 *
 * TODO: at the moment of writing, the workflow only applies to newly created training plans.
 *
 *
 * WORKFLOW:
 *  1. set topic for the training.
 *  2. get a list of possible exercises for this topic from the server.
 *    2.1 add exercises from this list to the exercise-list.
 *    2.2 add additional exercises that are not in the suggestions to the exercise-list.
 *  3. reorder the exercise-list so it matches the order in training.
 *  4. finish.
 *    4.1 print the exercise-list as an as is training.
 *    4.1 add the exercise-list to an existing training and print it.
 */


define(["jquery", "js/render", "js/remotecall", "js/util"], function($, render, rc, util) {

  function addHandlers(){
    util.addHandlerToElements(".addExerciseFromSuggestions", "click", addFromSuggestionsHandler);
  }

  function addFromSuggestionsHandler(){
    var id = $(this).data("id");
    pub.addFromSuggestions(id);
  }

  var Training = function(teamID, time_start, duration){
    if(teamID === undefined){
      throw "No teamID defined for training";
    }else{
      this.teamID = teamID;
    }
    if(time_start === undefined){
      this.time_start = "20:30";
    }else{
      this.time_start = time_start;
    }
    if(duration === undefined){
      this.duration = 90;       //90 minutes are default for a training
    }else{
      this.duration = duration;
    }

    this.exercises = [];

    this.addExercise = function(exercise){
      this.exercises.push(exercise);
    };

    this.showExercises = function(){
      //TODO: print them to the html document
      console.log(this.exercises);
    };

    this.renderTraining = function(){
      render.render("training-plan.must", this.createDataForRender(), "#screen", {callback: addHandlers});
    };

    this.createDataForRender = function(){
      var data = {
        training: {
        header: {
          teamID: this.teamID,
          time_start: this.time_start,
          time_end: this.time_start,  //TODO: calculate time
          duration: this.duration
        },
        exercises: this.exercises
        },
        suggestions: pub.suggestionList
      };
     return data; 
    };

  };

  var Exercise = function(title, description, duration, args){
    if(title === undefined){
      throw "No title defined for exercise";
    }else{
      this.title = title;
    }

    if(description === undefined){
      throw "No description defined for exercise";
    }else{
      this.description = description;
    }

    if(duration === undefined){
      this.duration = 15;       //15 minutes is the default duration for an exercise
    }else{
      this.duration = duration;
    }

    if(args === undefined){
      //TODO: create default args
    }else{
      //TODO: set parameters acording to args
    }


  };

  function populateSuggestionList(data){
    pub.suggestionList = data.result.suggestions;
  }

  var pub = {

    topic: "none",
    training: {},
    exerciseList: [],
    suggestionList: [],
    createExercise: function(title, description, duration){
      var ex = new Exercise(title, description, duration);
      this.exerciseList.push(ex);
    },
    createNewTraining: function(teamID, time_start, duration){
      this.training = new Training(teamID, time_start, duration);
    },
    setTopic: function(topic){
      this.topic = topic;
    },
    getSuggestions: function(){
      rc.call_server_side_function("TrainingUtil", "getSuggestions", {topic: this.topic}, populateSuggestionList);
    },
    addFromSuggestions: function(id){
      $.each(this.suggestionList, function(i, obj){
        if(obj.id == id){
          pub.training.addExercise(obj);  //TODO: create an exercise object
          pub.training.renderTraining();
        }
      });
    },
    init: function() {
      console.log("init");
      this.setTopic("Pass");
      this.getSuggestions();
      this.createNewTraining(1, "20:00", 120);
      this.createExercise("test", "blabla", 2);
      this.createExercise("huhu", "yamm yamm", 10);
      this.training.addExercise(this.exerciseList[0]);
      this.training.addExercise(this.exerciseList[1]);
    }
  };




  return pub;
});
