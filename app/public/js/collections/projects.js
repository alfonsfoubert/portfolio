define([ 'backbone', 'models/project' ], 
	function( Backbone, ProjectModel ){
		var ProjectsCollection = Backbone.Collection.extend({
			model: ProjectModel,
			url: 'api/projects'
		});
		return ProjectsCollection;
	}
);