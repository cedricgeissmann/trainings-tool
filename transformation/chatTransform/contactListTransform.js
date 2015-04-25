var contactListTransform = {
	"tag": "li",
	"children": [{
		"tag": "a",
		"href": "#!",
		"name": "${username}",
		"html": "${firstname} ${name}",
		"class": "contactListEntry",
		"children": [{
		    "tag": "span",
		    "class": "pull-right label label-primary",
		    "html": function(){
		        return getNumberOfMessages(this.username);
		    }
		}]
	}]
};