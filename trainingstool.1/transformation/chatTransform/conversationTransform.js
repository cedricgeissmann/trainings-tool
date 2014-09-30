var conversationTransform = [{
	"tag": "div",
	"class": "conversationBubble ${sender}",
	"children": [{
		"tag": "b",
		"html": "${senderFirstname} ${senderName}:"
	},{
		"tag": "div",
		"class": "messageBody",
		"html": "${message}"
	},{
		"tag": "div",
		"class": "messageTime",
		"html": "${sendtime}"
	}]
},{
	"tag": "hr"
}]