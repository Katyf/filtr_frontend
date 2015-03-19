'use strict';


  $(document).ready(function() {

    $('#back').on('click', function(){
      window.location.href="http://localhost:9000/#/posts/1"
    });

    $('#clickme').on('click', function(){
      $('.coupled.modal')
      .modal({
        allowMultiple: false
      });
      // attach events to buttons
      $('.third.modal')
        .modal('attach events', '.second.modal #next');
      $('.second.modal')
        .modal('attach events', '.first.modal #next');
        // show first now
      $('.first.modal')
        .modal('show');
    });

  });
