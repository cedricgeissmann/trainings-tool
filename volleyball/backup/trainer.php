<?php
include 'check_login.php';

include 'connect.php';

$sql = "SELECT * FROM `training` WHERE type='training' AND datum>='".date("Y-m-d")."' ORDER BY datum ASC";
$res = mysql_query($sql, $link);
$echoString = "";

while($row = mysql_fetch_array($res)){
	$id = $row['id'];
	$id_date= date("l j. F Y",strtotime($row['datum'])). " " .$row['zeit_start']. " - ". $row['zeit_end'] ." ". $row['ort'];
	$h = strstr($row['zeit_start'],":",true);
	$m = substr($row['zeit_start'],-2);
	$h_end = strstr($row['zeit_end'],":",true);
	$m_end = substr($row['zeit_end'],-2);
	$echoString = $echoString . "<div name='$id' class='box'><h4 name='$id'>"
									. $id_date . 
									"<button class='remove' onclick='add_plan(this)' name='$id'>Trainingsplan hinzufügen</button>
								</h4>
									<div id='".$id."_trainingsplan' name='$row[zeit_start]' class='trainingsplan'>";
										
									
									$sql = "SELECT * FROM `trainingsPlan` WHERE trainingsID='$row[id]'";
										$resPlan = mysql_query($sql,$link);
										while($plan = mysql_fetch_array($resPlan)){
											$h = strstr($plan['zeit_start'],":",true);
											$m = substr($plan['zeit_start'],-2);
											$echoString.=addUebung($h, $m, $plan["dauer"], $plan["titel"], $plan["beschreibung"]);
										}
										$echoString.="<button class='button' onclick='add_uebung(this)'>Übung hinzufügen</button>
									</div>
								</div>";
								
}

mysql_close($link);
echo $echoString;


function addTime($h,$m,$min){
	return date("H:i",mktime($h,$m)). " - " . date("H:i",mktime($h,$m+$min));
}

function addUebung($h,$m,$dur, $title, $description){
	return "<div>
			<div>
			<li class='time'>".addTime($h,$m,$dur,$title, $description)."</li>
					<li class='min'><input type='text' onblur=update_time(this) value='$dur'/>min</li>
					</div>
					<ul>
					<li>Titel:</li>
					<li><input class='trainingsTitel' type='text' value='$title'/></li>
					</ul>
					<ul>
					<li>Beschreibung:</li>
					<li><textarea class='trainingsBeschreibung'>$description</textarea></li>
					</ul>
					<button class='button' onclick='delete_uebung(this)'>Übung löschen</button>
					</div>";
}

?>
