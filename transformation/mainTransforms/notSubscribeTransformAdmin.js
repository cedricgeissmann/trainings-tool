notSubscribeTransformAdmin = {
    "tag": "div",
        "class": "col-sm-4",
        "children": [{
        "tag": "a",
            "href": "#!",
            "children": [{
            "tag": "h2",
                "html": "Nicht gemeldet:"
        }]
    }, {
        "tag": "div",
        "class": "notSubscribedList",
            "html": function () {
            return renderPersons(this.notSubscribed, this.admin);
        }
    }]
};