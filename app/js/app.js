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
    //'new-post': 'newPost', // http://localhost:9000/#/new-post
    //http://localhost:9000/#/new-post  <= what backbone will be looking for in router
    'posts/:id': 'showPosts' // http://localhost:9000/#/posts/1
  },
  home: function(){
    trace('hello from home');
    $('#container').empty();
    $.ajax({
      url: 'http://localhost:3000/posts/'
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

  showPosts: function(id){
    trace("hello word from showPosts");
    $('#container').empty();
    var id = localStorage.getItem('id') || id ;
    $.ajax({
      url: 'http://localhost:3000/posts/' + id,
      type: 'GET'
    }).done(function(response){
      localStorage.setItem('id', id);
      var template = Handlebars.compile($('#showPostsTemplate').html());
      $('#container').html(template({
        onePost: response
      }));

    $("#button").click(function(event){
    event.preventDefault();
    localStorage.getItem('id');
    id = parseInt(id);
    id = id + 1;
    localStorage.setItem('id', id);
    console.log(id);
    Backbone.history.loadUrl(Backbone.history.fragment);

    });


   }).fail(function(jqXHR, textStatus, errorThrown){
      trace(jqXHR, textStatus, errorThrown);
    }).always(function(response){
      trace(response);
    });
  }

});
$(document).ready(function(){
  var authToken =  localStorage.getItem('authToken');
  if (!authToken){
    window.location.href="/signup.html";
  }
});

var router = new Router();
Backbone.history.start();






