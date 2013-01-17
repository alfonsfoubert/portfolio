define(['jquery', 'underscore', 'backbone', 'text!templates/info.html'],
	function( $, _, Backbone, InfoTemplate ){
		var InfoView = Backbone.View.extend({
			el: '#content',
			template: _.template( InfoTemplate ),
			initialize: function(){
				$("#page-title").html("¿Quién soy?");
				this.render();
			},
			render: function(){
				$(this.el).html( this.template() );
			}
		});
		return InfoView;
	}
);