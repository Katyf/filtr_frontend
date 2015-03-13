'use strict';

var trace = function(){
  for(var i = 0; i < arguments.length; i++){
    console.log(arguments[i]);
  }
};

$(document).ajaxStart(function(e){
  trace(e, "starting an ajax request");
  $('section#ajax-preloader').fadeIn();
  $('section#container').fadeOut();
});

$(document).ajaxComplete(function(event, xhr, settings) {
  /* executes whenever an AJAX request completes */
  $('section#ajax-preloader').fadeOut();
  $('section#container').fadeIn();
});

var Router = Backbone.Router.extend({
  routes: {
    '': 'home', // http://localhost:9000/
    'home': 'home', // http://localhost:9000/#/home
    'posts': 'posts', // http://localhost:9000/#/posts
    //'new-post': 'newPost', // http://localhost:9000/#/new-post
    //http://localhost:9000/#/new-post  <= what backbone will be looking for in router
    'posts/:id': 'showPosts' // http://localhost:9000/#/posts/1
  },
  home: function(){
    trace('hello from home');
    $('#container').empty();
    $.ajax({
      url: 'http://localhost:3000/posts'
    }).done(function(response){
      var template = Handlebars.compile($('#homeTemplate').html());
      $('#container').html(template({
        post: response
      }));
    }).fail(function(jqXHR, textStatus, errorThrown){
      trace(jqXHR, textStatus, errorThrown);
    }).always(function(response){
      trace(response);
    });

  },
  posts: function(){
    trace("Hello from posts");
    $('#container').empty();
    $.ajax({
      url: 'http://localhost:3000/posts'
    }).done(function(response){
      var template = Handlebars.compile($('#commentsTemplate').html());
      $('#container').html(template({
        posts: response
      }));
    }).fail(function(jqXHR, textStatus, errorThrown){
      trace(jqXHR, textStatus, errorThrown);
    }).always(function(response){
      trace(response);
    });
  },
  showPosts: function(id){
    trace("hello word from showPosts");
    $('#container').empty();
    $.ajax({
      url: 'http://localhost:3000/posts/' + id,
      type: 'GET'
    }).done(function(response){
      var template = Handlebars.compile($('#submissionTemplate').html());
      $('#container').html(template({
        submission: response
      }));
   }).fail(function(jqXHR, textStatus, errorThrown){
      trace(jqXHR, textStatus, errorThrown);
    }).always(function(response){
      trace(response);
    });
  }
});

var router = new Router();
Backbone.history.start();
