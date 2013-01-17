define(['jquery', 'underscore', 'backbone', 'text!templates/project.html'], 
	function( $, _, Backbone, ProjectTemplate ){
		var ProjectView = Backbone.View.extend({
			events: {
				"click a": "viewProject" 
			},
			template: _.template(ProjectTemplate),
			initialize: function(){
				this.render();
			},
			render: function(){
				$(this.el).html( this.template( { model: this.options.model } ) );
			},
			viewProject: function(){
				return false;
			}
		});
		return ProjectView;
	}
);