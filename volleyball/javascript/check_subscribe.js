function check(){
	
	var lastname = document.getElementById("lastname").value;
	var firstname = document.getElementById("firstname").value;
	var username = document.getElementById("username").value;
	var password = document.getElementById("password").value;
	//var date = document.getElementById("date").value;
	
	var params = "name="+lastname+"&firstname="+firstname+"&username="+username+"&password="+password;//+"&date="+date;
	
	if(lastname.length>0){
		if(firstname.length>0){
			if(username.length>0){
				if(password.length>=4){
					//if(date.length>0){
						var xmlhttp;
						if (window.XMLHttpRequest){// code for IE7+, Firefox, Chrome, Opera, Safari
							xmlhttp=new XMLHttpRequest();
						} else{// code for IE6, IE5
							xmlhttp=new ActiveXObject("Microsoft.XMLHTTP");
						}
						
						xmlhttp.open("POST","subscribe.php",true);
						xmlhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
						/*xmlhttp.setRequestHeader("Content-length", params.length);
						xmlhttp.setRequestHeader("Connection", "close");*/
						
						xmlhttp.onreadystatechange=function(){
							if (xmlhttp.readyState==4 && xmlhttp.status==200){
								document.getElementById("comment").innerHTML=xmlhttp.responseText;
						    }
						};
						
						xmlhttp.send(params);
					/*}else{
						document.getElementById("comment").innerHTML = "Bitte Geben Sie Ihr Geburtsdatum an.";
					}*/
				}else{
					document.getElementById("comment").innerHTML = "Ihr Passwort ist zu kurz.";
				}
			}else{
				document.getElementById("comment").innerHTML = "Bitte geben Sie einen Benutzernamen an.";//Überprüfen ob Name schon vorhanden ist.
			}
		}else{
			document.getElementById("comment").innerHTML = "Bitte Geben Sie Ihren Vornamen an.";
		}
	}else{
		document.getElementById("comment").innerHTML = "Bitte geben Sie ihren Nachnamen an.";
	}
}
