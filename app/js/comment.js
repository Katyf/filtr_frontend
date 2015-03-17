/*global $:false */
'use strict';

var filtrComment = (function(){
  var apiHost;

  var init = function(){
    apiHost = 'https://filter-api.herokuapp.com/';
    $('').on('submit', submitComment);
  };

  var submitComment = function(event){
    event.preventDefault();
    $.ajax({
      url: apiHost + '/posts' + post.id + '/comments', //POST /posts/:post_id/comments comments#create
      type: 'POST',
      data: {something: {
        something: $('#something').val()
      }},
    }).done().fail(function(){
      console.log("error");
    });
  };






  return {init: init};
// end of filtrComment function
})();

$(document).ready(function(){
  filtrComment.init();
});

/*
 post_comments GET /posts/:post_id/comments(.:format)  comments#index
               POST  /posts/:post_id/comments(.:format)  comments#create
  post_comment GET   /posts/:post_id/comments/:id(.:format) comments#show
*/
