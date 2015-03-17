'use strict';

var S3App = S3App || {
  //var postId 
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
    //S3App.setPostId(results.id)
    S3App.getKey(results.id);
    $('#new-post-form').fadeOut();

  })
  .fail(function() {
    console.log("error");
  })
  .always(function() {
    console.log("complete");
  });

}

S3App.getKey = function(id){
  $.ajax({
    url: 'http://localhost:3000/amazon/sign_key',
    type: 'GET',
    dataType: 'JSON',
  })
  .done(function(data) {
    $('#s3-container').fadeIn();
    $('#img-upload-prompt').fadeIn();
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



//S3App.setPostId = function(id){
  //return id;
//}

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
    $('#img-upload-prompt').fadeOut();
    //$('.imgFile').val('');
    //$('#img-upload-prompt-2').show();
    $('#s3-container').empty();
    S3App.getSecondKey(id);
  })
  .fail(function() {
    console.log("error");
  })
  .always(function() {
    console.log("complete");
  });

}

S3App.getSecondKey = function(id){
  $.ajax({
    url: 'http://localhost:3000/amazon/sign_key',
    type: 'GET',
    dataType: 'JSON',
  })
  .done(function(data) {
    $('#s3-container').fadeIn();
    $('#img-upload-prompt-2').fadeIn();
    var sectemplate = Handlebars.compile($('#imageFormTemplate2').html());
      $('#s3-container').html(sectemplate({ imageForm: data }));
    console.log(data);
    //debugger;
    $('.imageForm').on('submit', function(){
      S3App.sendSecondUrlToDb(id, data.key);
    });
  })
  .fail(function() {
    console.log("error");
  });

};

S3App.sendSecondUrlToDb = function(id, key){
  $.ajax({
    url: 'http://localhost:3000/posts/' + id + '/images' ,
    type: 'POST',
    data: { image: { url: 'https://s3.amazonaws.com/filtrapp/' + key }},
  })
  .done(function(data) {
    console.log(data);
    $('#img-upload-prompt-2').fadeOut();
    $('#s3-container').fadeOut();
    $('#done').fadeIn();
    //debugger;
    S3App.showThumbs(data.url)
    S3App.getSecondKey(id);
  })
  .fail(function() {
    console.log("error");
  })
  .always(function() {
    console.log("complete");
  });

}

S3App.showThumbs = function (url) {
  $('div#img-preview-container').append('<img class="show-img" src="' + url + '"/>');
}




$(document).ready(function() {
  
  $('#img-upload-prompt').hide();
  $('#img-upload-prompt-2').hide();
  $('#done').hide();
  //$('i').hide();

  $('#new-post-form').on('submit', function(){
    console.log('submitted');
    S3App.submitPost();
  });

  $('#done').on('click', function() {
    window.location.href = 'http://localhost:9000/' 
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

