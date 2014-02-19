function trainer(){
	send_ajax("", "trainer.php", "response", true, true);
}

function add_plan(arg){
	var id = arg.name;
	var elem = document.getElementById(id+"_trainingsplan");
	var times = elem.getElementsByClassName("time");
	var durations = elem.getElementsByClassName("min");
	var titles = elem.getElementsByClassName("trainingsTitel");
	var descriptions = elem.getElementsByClassName("trainingsBeschreibung");
	send_ajax2("trainingsID="+id, "deleteTrainingsPlan.php");
	for(var i=0;i<times.length;i++){
		var msg = "trainingsID="+id;
		msg+="&t1="+getT1(times[i]);
		msg+="&t2="+getT2(times[i]);
		msg+="&duration="+durations[i].firstChild.value;
		msg+="&title="+titles[i].value;
		msg+="&description="+descriptions[i].value;
		send_ajax2(msg, "uploadTraining.php");
	}

}

function getT1(arg){
	var str = arg.innerHTML;
	var t1 = str.substring(0,5);
	return t1;
}

function getT2(arg){
	var str = arg.innerHTML;
	var t2 = str.substring(8,13);
	return t2;
}

/*function countElementsByClass(parent, elem, className){
		var iterElements = parent.getElementsByClassName(className);
		var i = 0;
		alert(iterElements.length);
		while(iterElements[i]!==elem && i<100){
			i++;
		}
		return i;
	}*/

function update_time(arg){
	if(arg.value){
		var par = arg.parentNode.parentNode;
		var time = par.getElementsByClassName("time")[0];
		var str = time.innerHTML;
		var t1 = str.substring(0,5);
		time.innerHTML = t1+" - "+add_time(t1,parseInt(arg.value));
		get_time(arg.parentNode.parentNode.parentNode);
	}
}

function add_time(time, min){
	var h = time.substring(0,2);
	var m = time.substring(3,5);
	m = (parseInt(m)+min);
	//	var n = m%60;
	h = parseInt(h)+Math.floor(m/60);
	m = m%60;
	return pad(h)+":"+pad(m);
}

function pad(number) {
	return (number < 10 ? '0' : '') + number;
}

function add_uebung(arg){
	var parent = arg.parentNode;
	var elem = document.createElement("div");
	elem.innerHTML = contentHTML;
	parent.insertBefore(elem, arg);
	get_time(arg);
}

function get_time(arg){
	var par = arg.parentNode;
	var t_start = "20:30";			//TODO
	var times = par.getElementsByClassName("time");
	var durations = par.getElementsByClassName("min");
	var time = times[0];
	time.innerHTML = t_start+" - "+add_time(t_start,parseInt(durations[0].firstChild.value));
	
	for(var i=1;i<times.length;i++){
		var time_next = times[i];
		var duration_next = durations[i].firstChild.value;
		var str = time.innerHTML;
		var t2 = str.substring(8,13);
		time_next.innerHTML = t2+" - "+add_time(t2,parseInt(duration_next));
		time = times[i];
	}

}

function delete_uebung(arg){
	var elem = arg.parentNode;
	var tmp = elem.parentNode;
	tmp.removeChild(elem);
	get_time(tmp);
}

var contentHTML = "<div><li class='time'>20:30 - 20:40</li><li class='min'><input type='text' onblur='update_time(this)' value='10'>min</li></div><ul><li>Titel:</li><li><input class='trainingsTitel' type='text'></li></ul><ul><li>Beschreibung:</li><li><textarea class='trainingsBeschreibung'></textarea></li></ul><button class='button' onclick='delete_uebung(this)'>Übung löschen</button>";


