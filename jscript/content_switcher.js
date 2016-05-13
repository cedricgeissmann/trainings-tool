define(["jquery"], function($){

	//use content as a module variable. instantiate it when it is used first, right after the navbar is loaded, or override it, to clear the cache.
	content = {};


	Content = function(){
		//Get an array of all html-elements that contain the data-itentifier. The different identifiers will build the page content.
		//
		var elements = $("[data-identifier]");
		var contents = [];
		$.each(elements, function(i, obj){
			var name = $(obj).data("identifier");
			contents[name] = new ContentEntry();
		});
		console.log(contents);
		console.log(contents.main);

		/**
		 * Since this function throws an error, no boolean has to be returned.
		 */
		this.checkIfContentExists = function(name){
			if(contents[name] === undefined){
				throw "There is no content with the name: " + name;
			}
		};

		this.addEntry = function(name, data, html){
			this.checkIfContentExists(name);
			contents[name].content = data;
			contents[name].html = html;

			console.log(contents[name]);
		};

		this.getEntry = function(contentName){
			this.checkIfContentExists(contentName);
			var entry = contents[contentName];
			console.log(entry);		//TODO: Remove this
			return entry;
		};

		this.generateEntry = function(name){
			require(["js/"+name], function(loader){
				loader.loadContent();
			});
		};


		this.switchEntry = function(contentName){
			this.checkIfContentExists(contentName);
			var entry = contents[contentName];

			if(entry.html === ""){
				this.generateEntry(contentName);
				throw "There is no html. Create it and display it in the #screen";
			}
			$("#screen").html(entry.html);
			//TODO: Add trasition

		};

	};


	ContentEntry = function(){
		this.html = "";
		this.content = {};
	};

	var pub = {
		initialize: function(){
			console.log("initialize content is called");	//TODO: remove this
			content = new Content();
		},
		getContent: function(){
			return content;
		}
	};


	return pub;
});
