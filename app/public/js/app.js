define(['backbone', 'jquery_cmd', 'views/index', 'views/info', 'views/projects', 'views/contact'],
    function( Backbone, Jquery_cmd, IndexView, InfoView, ProjectsView, ContactView ){

    var App = Backbone.Router.extend({
        initialize: function(){
            this.bind( "all", this.setActive, this );
            this.indexView    = new IndexView();
            this.infoView     = new InfoView();
            this.projectsView = new ProjectsView();
            this.contactView  = new ContactView();
        },
        routes : {
            ""         : "index",
            "/"        : "index",
            "info"     : "info",
            "projects" : "projects",
            "contact"  : "contact"
        },
        index : function() {
            this.indexView.render();
        },
        info: function(){
            this.infoView.render();
        },
        projects: function(){
            this.projectsView.projects.fetch();
        },
        contact: function(){
            this.contactView.render();
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