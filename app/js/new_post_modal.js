'use strict';


  $(document).ready(function() {

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
