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
    $('#container').on('submit', 'form#comment-form', submitComment);
  };

  var home = function(){
    trace('hello from home');
    $('#container').empty();
    $.ajax({
      url: 'http://localhost:3000/posts/'
    }).done(function(response){
      var createdAtReverse = response.reverse();
      console.log(createdAtReverse);
      for (var i = 0; i < createdAtReverse.length; i++) {
        var reverseOrder = createdAtReverse[i]
      };

      var template = Handlebars.compile($('#homeTemplate').html());
      $('#container').html(template({post: createdAtReverse}));
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
    });
    $('#comment-form').hide();
    $('#add-comment-btn').on('click', function(){
      $('#comment-form').show();
    });
    $('.nested-comment-form').hide();
    $('.add-nested-comment-btn').on('click', function(){
      $('.nested-comment-form').toggle();
    });
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
    // $('#container').empty();
    var id = localStorage.getItem('id') || postId ;
    $.ajax({
      url: 'http://localhost:3000/posts/' + id,
      type: 'GET'
    }).done(showPostSuccess)
    .fail(function(){
      $('#container').empty();
      $('#container').append("Thanks for voting today, now <h2><a href='http://localhost:9000/#/'>GO HOME</a></h2>");
      localStorage.setItem('id', 1);
    });
  };

  var submitComment = function(event){
    console.log("this is the submit form");
    var postId = $('.show-post').data("post-id");
    event.preventDefault();
    $.ajax({
      url: 'http://localhost:3000/posts/' + postId + '/comments',
      type: 'POST',
      data: {comment: {
        user: $('input#comment-user').val(),
        body: $('textarea#comment-body').val()
      }},
    }).done(function(data){
      console.log(data);
      showPost();
    }).fail(function(jqXHR, textStatus, errorThrown) {
    console.log(jqXHR, textStatus, errorThrown);
    });
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

$(document).ready(function(){
  App.initialize();
});



