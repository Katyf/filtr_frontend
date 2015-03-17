'use strict';

var S3App = S3App || {};

S3App.getKey = function(id){
  $.ajax({
    url: 'http://localhost:3000/amazon/sign_key',
    type: 'GET',
    dataType: 'JSON',
  })
  .done(function(data) {
    var template = Handlebars.compile($('#imageFormTemplate').html());
      $('#s3-container').html(template({ imageForm: data }));
    console.log(data);
    //debugger;
    $('.imageForm').on('submit', function(){
      S3App.sendUrlToDb(id, data.key);
    });
  })
  .fail(function() {
    console.log("error");
  });

};

S3App.submitPost = function() {
  event.preventDefault();
  //debugger;
  $.ajax({
    url: 'http://localhost:3000/posts',
    type: 'POST',
    data: { post: { message: $('#post-msg').val() }},
  })
  .done(function(results) {
    console.log(results.id);
    //debugger;
    S3App.getKey(results.id);
  })
  .fail(function() {
    console.log("error");
  })
  .always(function() {
    console.log("complete");
  });

};

S3App.sendUrlToDb = function(id, key){
  // var postId = parseInt(event.target.id.replace(/\D/g, ''));
  //debugger;
  $.ajax({
    url: 'http://localhost:3000/posts/' + id + '/images' ,
    type: 'POST',
    data: { image: { url: 'https://s3.amazonaws.com/filtrapp/' + key }},
  })
  .done(function(data) {
    console.log(data);
  })
  .fail(function() {
    console.log("error");
  })
  .always(function() {
    console.log("complete");
  });

};


$(document).ready(function() {
  //S3App.getKsey();

  // $('#new-post-form').on('submit', function(e) {
  //   S3App.submitPost(e);
  // });

  $('#new-post-form').on('submit', function(){
    console.log('submitted');
    S3App.submitPost();
  });

});











// $(document).ajaxStart(function(e){
//   trace(e, "starting an ajax request");
//   $('section#ajax-preloader').fadeIn();
//   $('section#s-3container').fadeOut();
// });

// var s3upload = new s3upload();
// //Backbone.history.start();

// $(document).ajaxComplete(function(event, xhr, settings) {
//   /* executes whenever an AJAX request completes */
//   $('section#ajax-preloader').fadeOut();
//   $('section#s3-container').fadeIn();
// });

// var S3upload = Backbone.S3upload.extend({
//   routes: {

//   }
// })

