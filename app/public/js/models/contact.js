define(['backbone'], 
	function( Backbone ){
		var ContactModel = Backbone.Model.extend({
			defaults:{
				name   : "undefined",
				contact: "undefined",
				message: "undefined",
				status : "new"
			},
			url: "api/contact"
		});
		return ContactModel;
	}
);