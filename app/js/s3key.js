'use strict';

var S3App = S3App || {
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
    S3App.getKey(results.id);
    $('#new-post-form').hide();
    S3App.getMessage(results.id);
    $('#message-prompt').hide();
  })
  .fail(function() {
    console.log("error");
  })
  .always(function() {
    console.log("complete");
  });

}

S3App.getMessage = function(postId){
  $.ajax({
    url: 'http://localhost:3000/posts/' + postId,
    type: 'GET',
  })
  .done(function(data) {
    S3App.renderMessage(data.message);
  })
  .fail(function() {
    console.log("error");
  });
}

S3App.renderMessage = function(msg) {
  $('.post-message-div').append('<h4>Your Message: </h4><p> ' + msg + '</p>');
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
    $('#s3-container').empty();
    S3App.getSecondKey(id);
    $('.second.modal #next').on('click', function(){
      S3App.showThumbs(data.url);
    });
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
    $('#first-check').fadeIn('slow');
    $('#first-check').transition({
      animation: 'pulse',
      duration: '2s',
      });
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
    $('#s3-container').fadeOut();
    $('#second-check').fadeIn('slow');
    $('#second-check').transition({
      animation: 'pulse',
      duration: '2s',
      });
    $('#done').fadeIn();
    //debugger;
    $('.second.modal #next').on('click', function(){
      S3App.showThumbs(data.url);
    });
    })
    //S3App.getSecondKey(id);
  .fail(function() {
    console.log("error");
  })
  .always(function() {
    console.log("complete");
  });

}

S3App.showThumbs = function (url) {
  $('div#img-preview-container').append('<img class="show-img" src="' + url + '" style="width:100px;height:100px"/>');
}


$(document).ready(function() {

  $('#img-upload-prompt').hide();
  $('#img-upload-prompt-2').hide();
  $('#done').hide();
  $('.checkmark').hide();

  $('#new-post-form').on('submit', function(){
    console.log('submitted');
    S3App.submitPost();
  });

  $('#done').on('click', function() {
    window.location.href = 'http://localhost:9000/'
  });

});


