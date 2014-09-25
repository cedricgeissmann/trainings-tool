var adminTransform = {
	"tag": "div",
	"class": "panel panel-default",
	"data-team": "${teamID}",
	"children": [{
		"tag": "div",
		"class": "panel-heading",
		"html": "${teamName}"
	},{
		"tag": "div",
		"class": "panel-body tableHolder",
		"id": "team${teamID}",
		"children": [{
			"tag": "table",
            "class": "table table-responsive",
            "children": [{
                "tag": "thead",
                "children": [{
                    "tag": "tr",
                    "children": [{
                        "tag": "th",
                        "html": "Benutzername",
                        "class": "sorter",
                        "data-sort": "username"
                    },{
                        "tag": "th",
                        "html": "Vorname",
                        "class": "sorter",
                        "data-sort": "firstname"
                    },{
                        "tag": "th",
                        "html": "Name",
                        "class": "sorter",
                        "data-sort": "name"
                    },{
                        "tag": "th",
                        "html": "Geburtsdatum",
                        "class": "sorter",
                        "data-sort": "birthdate"
                    },{
                        "tag": "th",
                        "html": "Telefon",
                        "class": "sorter",
                        "data-sort": "phone"
                    },{
                        "tag": "th",
                        "html": "Email",
                        "class": "sorter",
                        "data-sort": "mail"
                    },{
                        "tag": "th",
                        "html": "Adresse",
                        "class": "sorter",
                        "data-sort": "address"
                    },{
                        "tag": "th",
                        "html": "PLZ",
                        "class": "sorter",
                        "data-sort": "zip"
                    },{
                        "tag": "th",
                        "html": "Stadt",
                        "class": "sorter",
                        "data-sort": "city"
                    }]
                }]
            },{
                "tag": "tbody",
                
                    "html": function(){
						return renderTeamMembers(this.teamMembers);
					}
               
            }]
		}]
	}]
};