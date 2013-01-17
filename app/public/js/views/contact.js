define(['jquery', 'underscore', 'backbone', 'models/contact', 'text!templates/contact.html', 'text!templates/thanks.html'],
	function( $, _, Backbone, ContactModel, ContactTemplate, ThanksTemplate ){
		var ProjectsView = Backbone.View.extend({
			events: {
				"click .select-links": "select",
				"submit form": "send"
			},
			el: '#content',
			template: _.template( ContactTemplate ),
			initialize: function(){
			},
			render: function(){
				$("#page-title").html("Contacta conmigo");
				$(this.el).html( this.template() );
			},
			select: function( ev ){

				// Get the element
				var e = $(ev.target);

				// Not clicacble
				if ( e.hasClass("active") ) return false;

				// Clean CSS classes
				$(".select-links li").removeClass("active");
				
				// Reorder data
				
				e.addClass("active");
				var label = e.parent().parent();
				var span = $("input[name="+label.attr("for")+"]").prev();
				var i = $("i", span);
				i.removeClass();
				i.addClass(e.attr("data-icon"));
			},
			send: function( ev ){
				// Do not submit
				ev.preventDefault();

				// Save the info
				var contactModel = new ContactModel();
				contactModel.set( $('form').serializeObject() );
				contactModel.save();
				
				// Reset form data
				$('form')[0].reset();

				// Render Thanks template
				var thanks = _.template( ThanksTemplate );
				$("#contact-content").prepend( thanks( { model: contactModel } ) );
				
				// Return False
				return false;
			}
		});
		return ProjectsView;
	}
);