
var s3upload = new s3upload();
//Backbone.history.start();

$(document).ajaxComplete(function(event, xhr, settings) {
  /* executes whenever an AJAX request completes */
  $('section#ajax-preloader').fadeOut();
  $('section#container').fadeIn();
});


var s3upload = s3upload != null ? s3upload : new S3Upload({
  file_dom_selector: '#files',
  s3_sign_put_url: '/signS3put',
  onProgress: function(percent, message) { // Use this for live upload progress bars
    console.log('Upload progress: ', percent, message);
  },
  onFinishS3Put: function(public_url) { // Get the URL of the uploaded file
    console.log('Upload finished: ', public_url);
  },
  onError: function(status) {
    console.log('Upload error: ', status);
  }
});

