/**
 * Gets a json object from the server, that contains all data needed for the recipie.
 * @param name the name of the recipie.
 * @param callback is a callback function, to which the result data is handed over.
 */
 function getRecipieData(name, callback){
     $.ajax({
        "type": "POST",
        "url": "RecipieUtil.php",
        "data": {
            "name": name,
            "function": "getRecipie"
        },
        "dataType": "json",
        "success": function(data){
            callback(data);
        }
     });
 }

/**
 * Converts the JSON object that contains the recipie data to an html object.
 * @param data JSON object, that contains the recipie data.
 */
function renderRecipie(data){
    var res = json2html.transform(data, recipieTransformation);
    $("#content").html(res);
    addHandlers();
    showActualID();
}


var recipieTransformation = {
    "tag": "div",
    "class": "panel panel-default recipiePanel",
    "id": "recipieController",
    "data-partsList": function(){
        return JSON.stringify(this.idList);
    },
    "data-actID": function(){
        return this.idList[0].recipie_partsID;
    },
    "children": [{
        "tag": "div",
        "class": "panel-heading clearfix",
        "children": [{
            "tag": "div",
            "class": "col-xs-2 text-center",
            "children": [{
                "tag": "button",
                "class": "btn btn-default",
                "id": "recipieBackButton",
                "html": "Zurück"
            }]
        },{
            "tag": "h4",
            "class": "col-xs-8 text-center",
            "html": function(){
                return this.recipie[0].name;
            }
        },{
            "tag": "div",
            "class": "col-xs-2 text-center",
            "children": [{
                "tag": "button",
                "class": "btn btn-default",
                "id": "recipieForButton",
                "html": "Weiter"
            }]
        }]
    },{
        "tag": "div",
        "class": "panel-body",
        "children": [{
            "tag": "div",
            "id": "recipieBody",
            "html": function(){
                return renderRecipieBody(this.parts);
            }
        },{
            "tag": "ul",
            "class": "list-group",
            "id": "ingredientList",
            "html": function(){
                return renderIngredientList(this.ingredients);
            }
    }]
        
    }]
};

var recipieBodyTransformation = {
    "tag": "div",
    "class": "recipiePart showByActualID",
    "data-recipie_partsID": "${recipie_partsID}",
    "children": [{
        "tag": "h4",
        "html": "${type}"
    },{
        "tag": "div",
        "html": "${description}"
    }]
};

var ingredientTransform = {
    "tag": "li",
    "data-recipie_partsID": "${recipie_partsID}",
    "class": "list-group-item ingredient showByActualID",
    "html": "${name} ${value}${unit}"
}

/**
 * Converts a JSON array to an html element to display the content of the recipie data.
 * @param recipie_parts a JSON array that contains the different parts of a recipie.
 */
function renderRecipieBody(recipie_parts){
    var res = json2html.transform(recipie_parts, recipieBodyTransformation);
    return res;
}

/**
 * Converts a JSON array to an html element to display the content of the ingredient list.
 * @param recipie_parts a JSON array that contains all the ingredients.
 */
function renderIngredientList(ingredients){
    var res = json2html.transform(ingredients, ingredientTransform);
    return res;
}

/**
 * Only show parts of the recipie that match the current ID. This id is set in the recipie root element (#recipieController)
 */
function showActualID(){
    var actualID = $("#recipieController").data("actid");
    $(".showByActualID").hide("slow");
    $(".showByActualID[data-recipie_partsid='"+actualID+"'").show("slow");
    console.log(".showByActualID[data-recipie_partsid='"+actualID+"']");
}

/**
 * TODO: change after import of util.js to the default add handler function
 * Adds event handlers to the html elements.
 */
function addHandlers(){
   $("#recipieBackButton").on("click", function(){recipieBackHandler($(this));});
   $("#recipieForButton").on("click", function(){recipieForHandler($(this));});
}

/**
 * This event handler is called when the recipie back button is clicked. Sets the actual id to the previous and displays the actual recipie part.
 * @param element the html element that triggered the event.
 */
function recipieForHandler(element){
    var controller = $("#recipieController");
    var idList = controller.data("partslist"); //jQuery.parseJSON(controller.data("partslist"));
    var actualID = controller.data("actid");
    $.each(idList, function(i, item){
        if(item.recipie_partsID==actualID && i < idList.length-1){
            actualID = idList[i+1].recipie_partsID;
            return false;
        }
    });
    controller.data("actid", actualID);
    showActualID();
}

/**
 * This event handler is called when the recipie back button is clicked. Sets the actual id to the previous and displays the actual recipie part.
 * @param element the html element that triggered the event.
 */
function recipieBackHandler(element){
    var controller = $("#recipieController");
    var idList = controller.data("partslist"); //jQuery.parseJSON(controller.data("partslist"));
    var actualID = controller.data("actid");
    $.each(idList, function(i, item){
        if(item.recipie_partsID==actualID && i > 0){
            actualID = idList[i-1].recipie_partsID;
            return false;
        }
    });
    controller.data("actid", actualID);
    showActualID();
}


$(document).on("ready", function(){
    getRecipieData("Magenbrot", renderRecipie);
});