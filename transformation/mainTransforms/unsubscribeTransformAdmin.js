var unsubscribeTransformAdmin = {
    "tag": "div",
        "class": "col-sm-4",
        "children": [{
        "tag": "a",
            "href": "#!",
            "class": "unsubscribe",
            "name": "${id}",
            "data-need_reason": "${need_reason}",
            "children": [{
            "tag": "h2",
                "html": "Abmelden:"
        }]
    }, {
        "tag": "div",
        "class": "unsubscribeList",
            "html": function () {
            return renderPersons(this.unsubscribed, this.admin);
        }
    }]
};