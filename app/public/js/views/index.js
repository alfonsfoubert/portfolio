define(['jquery', 'underscore', 'backbone', 'text!templates/index.html'],
	function( $, _, Backbone, IndexTemplate ){
		var IndexTemplate = Backbone.View.extend({
			el: '#content',
			template: _.template( IndexTemplate ),
			initialize: function(){
			},
			render: function(){
				$("#page-title").html("Bienvenido");
				$(this.el).html( this.template() );
				prettyPrint(); // Prettify the code
				var cmd = $('#cmd').bsp_cmd(); // Initialize the console
				$(".content", cmd).first().focus();
			}
		});
		return IndexTemplate;
	}
);