define(['backbone', 'jquery_cmd', 'views/index', 'views/info', 'views/projects', 'views/contact'],
    function( Backbone, Jquery_cmd, IndexView, InfoView, ProjectsView, ContactView ){

    var App = Backbone.Router.extend({
        initialize: function(){
            this.bind( "all", this.setActive, this );
        },
        routes : {
            ""         : "index",
            "/"        : "index",
            "info"     : "info",
            "projects" : "projects",
            "contact"  : "contact"
        },
        index : function() {
            var indexView = new IndexView();
        },
        info: function(){
            var infoView = new InfoView();
        },
        projects: function(){
            var projectsView = new ProjectsView();
        },
        contact: function(){
            var contactView = new ContactView();
        },
        setActive: function(){
            $(".menu li").removeClass( "active" );
            if ( Backbone.history.fragment != '' ) {
                $('a[href$="'+Backbone.history.fragment+'"]').parent().addClass("active");
            }
        }
    });
    return App;
});