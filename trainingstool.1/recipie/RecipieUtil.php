<?php

include_once '../server/DatabaseUtil.php';
//include_once "LoggerUtil.php";        //logger is not needed here, because user does not need to be signed in.

//Create a logger to write what a user has done.
//$logger = new LoggerUtil();

/**
 * This utility class holds multiple functions to execute admin functions on the server side.
 */
class RecipieUtil{
    
    /**
     * Gets the recept for a Product identified by recept name from the database, and returns it as JSON array.
     * @param String $recipieName the name that identifies the product.
     * @returns JSON-array that contains the different parts of the recipie.
     */
    public static function getRecipie($recipieName){
        $resName = DatabaseUtil::executeQueryASJSON("SELECT * FROM recipie WHERE name='$recipieName'");
        $resParts = DatabaseUtil::executeQueryASJSON("SELECT * FROM recipie_parts INNER JOIN (`recipie`) ON (recipie_parts.recipieID=recipie.recipieID) WHERE recipie.name='$recipieName'");
        $resIDList = DatabaseUtil::executeQueryASJSON("SELECT recipie_partsID FROM recipie_parts INNER JOIN (`recipie`) ON (recipie_parts.recipieID=recipie.recipieID) WHERE recipie.name='$recipieName'");
        $resIngred = DatabaseUtil::executeQueryASJSON("SELECT ingredients.name AS name, value, unit, recipie_parts.recipie_partsID AS recipie_partsID FROM ingredients INNER JOIN (`recipie`, `recipie_parts`) ON (recipie_parts.recipie_partsID=ingredients.recipie_partsID AND ingredients.recipieID=recipie.recipieID) WHERE recipie.name='$recipieName'");
        return "{\"recipie\": $resName, \"parts\": $resParts, \"ingredients\": $resIngred, \"idList\": $resIDList}";
    }
}

/**
 * Evaluate incoming requests.
 */
$function = $_POST["function"];
switch($function){
	case "getRecipie":
		echo RecipieUtil::getRecipie($_POST["name"]);
		break;
}