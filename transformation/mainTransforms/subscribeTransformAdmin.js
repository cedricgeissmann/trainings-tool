var subscribeTransformAdmin = {
    "tag": "div",
        "class": "col-sm-4",
        "children": [{
        "tag": "a",
            "href": "#!",
            "class": "subscribe",
            "name": "${id}",
            "children": [{
            "tag": "h2",
                "html": "Anmelden:"
        }]
    }, {
        "tag": "div",
        "class": "subscribeList",
            "html": function () {
            return renderPersons(this.subscribed, this.admin);
        }
    }]
};