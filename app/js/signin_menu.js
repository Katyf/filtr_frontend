'use strict';

$(document).ready(function() {
  $('#signup-form-div').hide();

  $('.example').on('click', function(){
   window.location.href='http://teamjkg.github.io/filtr_frontend/';
   //change to github pages once uploaded
  });

  $('.item').on('click', function(){
    $('.item').toggleClass('active');
    $('.bottom.attached.segment').toggle();
  });

  $('.example')
  .popup({
    hoverable: true,
    position: 'top center'
  });

});
