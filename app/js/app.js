'use strict';
var trace = function(){
  for(var i = 0; i < arguments.length; i++){
    console.log(arguments[i]);
  }
};

// $(document).ajaxStart(function(e){
//   trace(e, 'starting an ajax request');
//   $('section#ajax-preloader').fadeIn();
//   $('section#container').fadeOut();
// });

// $(document).ajaxComplete(function(event, xhr, settings) {
//   /* executes whenever an AJAX request completes */
//   $('section#ajax-preloader').fadeOut();
//   $('section#container').fadeIn();
// });

var App = (function(app) {
  app.initialize = function() {
    var router = new Router();
    Backbone.history.start();
  };

  var home = function(){
    trace('hello from home');
    $('#container').empty();
    $.ajax({
      url: 'http://localhost:3000/posts/'
    }).done(function(response){
      var allPostsLength = response.length
      for (var i = 0; i < response.length; i++) {
        var totalVote = response[i].images;
        debugger;
      };
      var template = Handlebars.compile($('#homeTemplate').html());
      $('#container').html(template({post: response}));
    }).fail(failAjax);
  };

  var failAjax = function(error) {
    console.log(error);
  };

  var logResult = function(data) {
    console.log(data);
  };

  var checkVote = function($img, voteCount, postId) {
    var voteLength = voteCount.votes.length;
    // $img.closest('div').append(voteLength);
    $(".vote").empty();
    $(".vote").append(voteCount.votecount);
    $.ajax({
      // /posts/:post_id/images/:id/upvote(.:format
      url: 'http://localhost:3000/posts/' + postId + '/images/' + $img.alt + '/upvote',
        type: 'PATCH',
      data: {
        vote: {count : voteLength }
      }
    }).done(logResult)
    .fail(failAjax);
  };

  var vote = function(event){
    // event.currentTarget == image that was clicked
    var postId = event.data.postId;
    var imgId = this.alt;
    var $img = this;
    var $oImg = $('.voteable');


    $.ajax({
      // POST /posts/:post_id/images/:id/vote(.:format
      url: 'http://localhost:3000/posts/' + postId + '/images/' + imgId,
      type: 'GET'
    }).done(function(data){
      checkVote($img, data, postId);
    }).fail(failAjax);
  };

  var showPostSuccess = function(response){
    localStorage.setItem('id', response.id);
    var template = Handlebars.compile($('#showPostsTemplate').html());
    $('#container').html(template({onePost: response}));
    $('body').on('click', 'img.voteable', {postId: response.id}, vote);
    $('img.voteable').on('click',function(event){
      var newId = parseInt(localStorage.getItem('id')) + 1;
      localStorage.setItem('id', newId);
      console.log(newId);
      showPost(newId);
    })
    $('#button').on('click', function(event){
      event.preventDefault();
      var newId = parseInt(localStorage.getItem('id')) + 1;
      localStorage.setItem('id', newId);
      console.log(newId);

      showPost(newId);
    });
  };

  var showPost = function(postId){
    trace('hello word from showPosts');
    $('#container').empty();
    var id = localStorage.getItem('id') || postId ;
    $.ajax({
      url: 'http://localhost:3000/posts/' + id,
      type: 'GET'
    }).done(showPostSuccess)
    .fail(failAjax);
  };

  var Router = Backbone.Router.extend({
    routes: {
      '': 'home', // http://localhost:9000/
      'home': 'home', // http://localhost:9000/#/home
      //'new-post': 'newPost', // http://localhost:9000/#/new-post
      //http://localhost:9000/#/new-post  <= what backbone will be looking for in router
      'posts/:id': 'showPost' // http://localhost:9000/#/posts/1
    },
    home: home,
    showPost: showPost
  });

  return app;
})(App || {});

$(document).ready(App.initialize);



