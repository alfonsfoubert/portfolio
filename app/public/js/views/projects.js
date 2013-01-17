define(['jquery', 'bootstrap', 'underscore', 'backbone', 'text!templates/projects.html', 'collections/projects', 'views/project'],
	function( $, Bootstrap, _, Backbone, ProjectsTemplate, ProjectsCollection, ProjectView ){
		var ProjectsView = Backbone.View.extend({
			el: '#content',
			template: _.template( ProjectsTemplate ),
			initialize: function(){
				this.projects = new ProjectsCollection();
				this.projects.bind( 'all', this.render, this );
				// this.projects.fetch();
			},
			render: function(){
				$("#page-title").html("Mis últimos proyectos");
				$(this.el).html( this.template() );
				var list = $(".projects", $(this.el));
				this.projects.each(function( model ){
					var projectView = new ProjectView( { el : $("<li>").addClass("span4"), model : model } );
					list.append( projectView.el );
				});
				$('.thumbnail').tooltip();
			}
		});
		return ProjectsView;
	}
);