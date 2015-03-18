/*global $:false */
'use strict';

var filtrComment = (function(){
  var apiHost;
// https://filter-api.herokuapp.com
  var init = function(){
    apiHost = 'http://localhost:3000';
    $('#container').on('submit', 'form#comment-form', submitComment);
  };

  var getComments = function(){
    $.ajax({
      url: apiHost + '/posts/' + post.id + '/comments',
      type: 'GET'
    }).done(function(data){
      console.log(data);
      indexComments(data);
    }).fail(function(jqXHR, textStatus, errorThrown){
      console.log(jqXHR, textStatus, errorThrown);
    });
  };

  var indexComments = function(data){
    var template = Handlebars.compile($('#homeTemplate').html());
      $('#container').html(template({post: data}));
  };
  var submitComment = function(event){
    debugger;
    console.log("this is the submit form");
    var postId = $('.comment-form').data("post-id");
    event.preventDefault();
    // var id = parseInt(event.target.id.replace(/\D/g,''));
    // var $body = $('form#comment-form-' + id + '#comment-body');
    // var $user = $('form#comment-form-' + id + '#comment-user');
    $.ajax({
      //POST /posts/:post_id/comments comments#create
      url: apiHost + '/posts/' + postId + '/comments',
      type: 'POST',
      data: {comment: {
        body: $('input#comment-user').val(),
        user: $('textarea#comment-body').val()
      }},
    }).done(function(data){
      console.log(data);

    }).fail(function(jqXHR, textStatus, errorThrown) {
    console.log(jqXHR, textStatus, errorThrown);
    });
  };


  return {init: init};
// end of filtrComment function
})();

$(document).ready(function(){
  filtrComment.init();
});

