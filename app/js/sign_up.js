/*global $:false*/
'use strict';

var filtrApp = (function(){
  var authToken, apiHost;

  var init = function(){
    authToken = localStorage.getItem('authToken');
    apiHost = 'https://filtr-api.herokuapp.com/posts/';
    setupAjaxRequests();
    $('#').on('submit', submitLogin);
    $('#').on('submit', submitRegistration);
    $('#').on('click', signOut);
  };

  var submitRegistration = function(event)


});
