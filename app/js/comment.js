/*global $:false */
'use strict';

var filtrComment = (function(){
  var apiHost;

  var init = function(){
    apiHost = 'https://filter-api.herokuapp.com';
    $('#container').on('submit', 'form#comment-form', submitComment);
  };

  var indexComments = function(comment){
    $.ajax({
      url: apiHost + '/posts/' + post.id + '/comments',
      type: 'GET'
    }).done(function(data){
      data.forEach(renderComment, comment);
      $('form#comment-form').hide();
      $('#toggle-review-button').on('click', function(){
      var id = parseInt(this.id.replace(/\D/g,''));
      $(this).hide();
      $('form#comment-form' + id).show();
      });
    }).fail(function(jqXHR, textStatus, errorThrown){
      console.log(jqXHR, textStatus, errorThrown);
    });
  };

  var renderComment = function(){

  };
  var submitComment = function(event){
    event.preventDefault();
    debugger;
    var id = parseInt(event.target.id.replace(/\D/g,''));
    var $body = $('form#comment-form' + id + '#comment-body');
    var $user = $('form#comment-form' + id + '#comment-user');
    $.ajax({
      //POST /posts/:post_id/comments comments#create
      url: apiHost + '/posts/' + id + '/comments',
      type: 'POST',
      data: {comment: {
        body: $body.val(),
        user:$user.val()
      }},
    }).done(function(data){
      console.log(data);
      $('#toggle-review-button').show();
      var template = Handlebars.compile($('#homeTemplate').html());
      $('' + id).append(template(data));
      //Clear the values
      $body.val('');
      $author.val('');
      $('form#comment-form' + id).hide();
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

