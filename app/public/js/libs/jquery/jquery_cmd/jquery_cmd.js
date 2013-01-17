/**
 *  Command Line plugin for jquery extendable with widgets
 *
 *  @author Alfons Foubert
 *  @version 0.1
 */

// takes a plugin Constructor function and creates a jQuery style widget
$.pluginMaker = function(plugin) {
    $.fn[plugin.prototype.name] = function(options) {
        
        var args = $.makeArray(arguments),
            after = args.slice(1);

        return this.each(function() {
            
            // see if we have an instance
            var instance = $.data(this, plugin.prototype.name);
            if (instance) {
                
                // call a method on the instance
                if (typeof options == "string") {
                    instance[options].apply(instance, after);
                } else if (instance.update) {
                    
                    // call update on the instance
                    instance.update.apply(instance, args);
                }
            } else {
                
                // create the plugin
                new plugin(this, options);
            }
        })
    };
};

/**
 * Triggers a destroyed event when an element is removed via the jQuery modifiers
 */
(function() {
    var oldClean = jQuery.cleanData

    $.cleanData = function(elems) {
        for (var i = 0, elem;
        (elem = elems[i]) != null; i++) {
            $(elem).triggerHandler("destroyed")
        }
        oldClean(elems)
    }
})();

// namespace
BSP = {};

/*
 * Skeleton for a widgetable console
 */
BSP.Cmd = function(el, options) {
  if (el) {
    this.init(el, options)
  }
};

$.extend(BSP.Cmd.prototype, {  
  
  // the name of the plugin
  name: "bsp_cmd",

  defaults: {
    title: 'Línea de Comandos'
  },

  // Sets up the cmd widget
  init: function(el, options) {

    // Settings
    var settings = $.extend({}, this.defaults, options);

    // Cursor
    this.cursorTimer = null;
    
    // History
    this.history  = new Array();
    this.historyIndex = null;
    this.backupCommand = '';

    // Commands
    this.commands = new Array();
    this.actualCommand = '';
    
    // HTML
    this.element = $(el).addClass(this.name)
                        .addClass("commandline")
                        .append( $("<header>").html( settings.title ) )
                        .append( $("<div>").addClass("content")
                                           .attr("tabindex", "0")
                                           .html( $("<div>") ))
                        .append( $("<footer>") );
    
    this.element.bind("destroyed", $.proxy(this.teardown, this));
    this.bind();

    // Default Commands
    this.setCommands();

    // Print the initial help
    this.writeln( 'write "help" to know what to do' );

    // Prompt
    this.newline();

    // Remove the initial cursor
    this.removeCursor();
  },

  // bind the events to this instance's methods
  bind: function(){
    this.element.delegate("div.content", "keypress", $.proxy(this.keycontrol, this))
                .delegate("div.content", "focus", $.proxy(this.onfocus, this))
                .delegate("div.content", "blur",  $.proxy(this.onblur, this))
  },

  // call destroy to teardown while leaving element
  destroy: function(){
    this.element.unbind("destroyed", this.teardown);
    this.teardown();
  },

  // remove all functionality of this cmd widget
  teardown: function(){
    $.removeData( this.element[0], this.name );
    this.element.removeClass(this.name + " cmd");
    this.unbind();
    this.element = null;
    this.actualCommand = null;
  },

  // unbinds the events
  unbind: function(){
    this.element.undelegate("div.content", "keypress", this.keycontrol)
                .undelegate("div.content", "focus", this.onfocus)
                .undelegate("div.content", "blur",  this.onblur)
  },

  // returns the content div for a console
  content: function(){
    return $( this.element.find("div.content > div").first() );
  },
  
  // returns the span command for a console
  prompt: function() {
    return $( this.content().find("div").last().find("span.command").last() );
  },

  cursor: function(){
    return $( this.content().find("div").last().find("span.cursor").last() );
  },

  setCommands: function(){
    this.addCommand( 'help', this.help );
    this.addCommand( 'hello', this.hello );
    this.addCommand( 'goto', this.go );
    this.addCommand( 'mail', this.mail );
    this.addCommand( 'print', this.print );
  },

  addCommand: function( pattern, callback ) {
    var command = { 
      pattern: pattern,
      callback: $.proxy(callback, this)
    };
    this.commands.push( command );
  },

  // creates a new line
  newline: function(){
    this.removeCursor();
    var content = this.content();
    content.append( $("<div>").html( $("<span>").addClass("prompt")
                                                .html("&gt;"))
                              .append( $("<span>").addClass("command") )
                              .append( $("<span>").addClass("cursor") ));
    this.addCursor();
    content.parent().animate( { scrollTop: content.height() }, "fast" );
  },

  writeln: function( msg, type ){
    type = typeof type !== "undefined" ? type : "message";
    var content = this.content();
    content.append( $("<div>").html( $("<span>").addClass(type)
                                                .html(msg) ));
  },

  // executes the current command
  executeCommand: function( command, options ) {
    this.removeCursor();
    for ( var i = 0; i < this.commands.length; i++ ){
      if ( this.commands[i].pattern == command ){
        this.commands[i].callback( options );
        break;
      }
    }
  },

  // prints the current command
  printCommand: function(){
    this.prompt().html(this.actualCommand);
  },

  addCursor: function(){
    this.cursor().html('_');
  },

  removeCursor: function(){
    this.cursor().html('');
  },

  // controls the keys pressed
  keycontrol: function(ev) {
    
    // Prevent Navigator
    ev.preventDefault();

    // Decode the key code
    var code = (ev.keyCode ? ev.keyCode : ev.which);

    switch ( code ) {
      
      case 8:  // Backspace

        // Remove the last character
        if ( this.actualCommand.length > 0 ){
          this.actualCommand = this.actualCommand.substring(0, this.actualCommand.length - 1);
        }

        // print actual command
        this.printCommand();
        break;
      
      case 9:  // Tab
        break;

      case 13: // Enter
        var options = this.actualCommand.split(" ");
        var command = options.shift();
        this.executeCommand( command, options );
        this.history.push( this.actualCommand );
        this.historyIndex  = this.history.length;
        this.backupCommand = '';
        this.actualCommand = '';
        this.newline();
        break;

      case 38: // Up
        if ( this.historyIndex == 0 ) {
          return;
        } else {
          if ( this.historyIndex == (this.history.length) ) {
            this.backupCommand = this.actualCommand;
          }
          this.historyIndex--;
          this.actualCommand = this.history[ this.historyIndex ];
          this.printCommand();
        }
        break;
      case 40: // Down
        console.log("History Index: " + this.historyIndex);
        console.log("Actual Command: " + this.actualCommand);
        console.log("backupCommand: " + this.backupCommand);
        if ( this.historyIndex == (this.history.length ) ) {
          return
        } else {
          this.historyIndex++;
          if ( this.historyIndex == (this.history.length ) ) {
            this.actualCommand = this.backupCommand;
          } else {
            this.actualCommand = this.history[ this.historyIndex ];
          }
        }
        this.printCommand();
        break;

      default:
        this.actualCommand += String.fromCharCode(code);
        this.printCommand();
        break;
    }
  },

  // activates the cursor
  onfocus: function(ev){
    this.addCursor();
    this.cursorTimer = setInterval( $.proxy(this.switchCursor, this), 200);
  },

  // deactivates the cursor
  onblur: function(ev){
    clearInterval( this.cursorTimer );
    this.removeCursor();
  },

  hasCursor: function(){
    return this.cursor().html() != '';
  },

  switchCursor: function(){
    if ( this.hasCursor() == true ){
      this.removeCursor();
    } else {
      this.addCursor();
    };
  },

  // Command that prints all the commands available
  help: function( options ){
    this.writeln( "Commands:" );
    for ( var i = 0; i < this.commands.length; i++ ){
      this.writeln( " - " + this.commands[i].pattern );
    }
  },

  hello: function( options ){
    this.writeln( "Hello you too!" );
  },

  go: function( options ){
    var url = options.pop();
    if ( url == undefined )
    {
      this.writeln("This command Naigates wherever you want");
      this.writeln('Try: "goto projects" or "goto info"');
    } else {
      window.location = "#" + url;
    }
  },

  mail: function( options ){
    this.writeln("Opening Mail ...");
    window.location.href = "mailto:alfons.foubert@gmail.com?subject='Contacto -cmd- Portfolio'";
  },

  print: function( options ){
    if ( options.length == 0 ){
      this.printHelp();
    } else {
      var action = options.pop();
      if ( action != undefined ){
        switch (action){
          
          case 'age':
            var today = new Date();
            var birthDate = new Date( 1981, 3, 27 );
            var age = today.getFullYear() - birthDate.getFullYear();
            var m = today.getMonth() - birthDate.getMonth();
            if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
                age--;
            }
            this.writeln(age);
          break;

          case 'skills':
            this.writeln( "HTML" );
            this.writeln( "Javascript" );
            this.writeln( "PHP" );
            this.writeln( "Java" );
            this.writeln( ".NET" );
            this.writeln( "C/C++" );
          break;

          case 'frameworks':
            this.writeln( "Javascript: [ 'jQuery', 'Backbone', 'Dojo', 'Scriptaculous' ]" );
            this.writeln( "PHP: [ 'Symfony 2', 'Codeigniter', 'Zend Framework' ]" );
            this.writeln( "Java: [ 'Struts' ]" );
          break;

          case 'databases':
            this.writeln( "MongoDB" );
            this.writeln( "MySQL" );
            this.writeln( "PostgreSQL" );
            this.writeln( "Informix" );
            this.writeln( "MySQL Server" );
          break;

          default:
            this.writeln( "Action not accepted" );
            this.printHelp();
          break;

        }
      }
    }
  },

  printHelp: function(){
    this.writeln( 'Available actions are:' );
    this.writeln( '&nbsp;&nbsp;age' );
    this.writeln( '&nbsp;&nbsp;skills' );
    this.writeln( '&nbsp;&nbsp;frameworks' );
    this.writeln( '&nbsp;&nbsp;databases' );
    this.writeln( 'For example: print age' );
  }

});

// Make the bsp_cmd widget
$.pluginMaker( BSP.Cmd );
