define(['backbone'], 
	function( Backbone ){
		var ProjectModel = Backbone.Model.extend({
			defaults:{
				name: "En Desarrollo"
			}
		});
		return ProjectModel;
	}
);