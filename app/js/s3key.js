'use strict';

var S3App = S3App || {};

S3App.getKey = function(){
  $.ajax({
    url: 'https://filter-api.herokuapp.com/amazon/sign_key',
    type: 'GET',
    dataType: 'JSON',
  })
  .done(function(data) {
    S3App.getUrl(data);
    var template = Handlebars.compile($('#imageFormTemplate').html());
      $('#s3-container').html(template({ imageForm: data }));
    console.log(data);
  })
  .fail(function() {
    console.log("error");
  });

};

S3App.getUrl = function(data){
  S3App.parseData(data);
  AWS.config.update({accessKeyId: S3App.access_key, secretAccessKey: S3App.signature, region: 'us-east-1'});
  var s3 = new AWS.S3();
  var params = {Bucket: S3App.bucket, Key: S3App.key};
  s3.getSignedUrl('getObject', params, function(err, url){
    console.log(url);
  });
};


S3App.parseData = function(data) {
  S3App.access_key = data.access_key;
  S3App.key = data.key;
  S3App.bucket = data.bucket;
  S3App.signature = data.signature;
};



$(document).ready(function() {
  S3App.getKey();
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

