require.config({
    paths: {
        'jquery'    : 'libs/jquery/jquery',
        'jquery_cmd': 'libs/jquery/jquery_cmd/jquery_cmd',
        'bootstrap' : 'libs/bootstrap/bootstrap',
        'underscore': 'libs/underscore/underscore',
        'backbone'  : 'libs/backbone/backbone',
        'text'      : 'libs/text/text',
        'i18n'      : 'libs/i18n/i18n',
        'prettify'  : 'libs/prettify/prettify',
        'serializeObject' : 'libs/jquery/serializeObject'
    },
    shim: {
        serializeObject: {
            deps: ["jquery"]
        },
        jquery_cmd: {
            deps: ["jquery"]
        },
        bootstrap : {
            deps: ["jquery"]
        },
        underscore: {
             exports: '_'
        },
        backbone  : {
            deps: ["underscore", "jquery"],
            exports: "Backbone"
        }
    }
});

var alfons = {
    getAge : function(){
        var today = new Date();
        var birthDate = new Date( 1981, 3, 27 );
        var age = today.getFullYear() - birthDate.getFullYear();
        var m = today.getMonth() - birthDate.getMonth();
        if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
            age--;
        }
        return age;
    },
    getSkills: function(){
        var skills = new Array();
        skills.push( "HTML" );
        skills.push( "Javascript" );
        skills.push( "PHP" );
        skills.push( "Java" );
        skills.push( ".NET" );
        skills.push( "C/C++" );
        return skills;
    },
    getFrameworks: function(){
        var engines           = new Array();
        engines['Javascript'] = new Array();
        engines['PHP']        = new Array();
        engines['Java']       = new Array();
        engines['Javascript'].push( "Jquery", "Backbone", "Dojo", "Scriptaculous" );
        engines['PHP'].push( "Codeigniter", "Symfony 2", "Zend Framework" );
        engines['Java'].push( "Struts" );

        return engines;
    },
    getDatabases: function(){
        var dbs = new Array();
        dbs.push( "MongoDB", "MySQL", "PostgreSQL", "Informix", "MySQL Server" );
        return dbs;
    },
    getLanguages: function(){
        var langs = new Array();
        langs.push( "Catalán", "Castellano", "Inglés" );
        return langs;
    },
    kill: function(){
        return "You can't do this, I'm immortal!";
    },
    slap: function(){
        return "Ouch! it hurts";
    }
};

require(['backbone', 'bootstrap', 'serializeObject', 'prettify', 'app'], 
    function ( Backbone, Bootstrap, SerializeObject, Prettify, App ) {
        var app = new App();
        Backbone.history.start();
    }
);