/*global $:false*/
'use strict';
var filtrApp = (function(){
  var authToken, apiHost;

  var init = function(){
    authToken = localStorage.getItem('authToken');
    apiHost = 'https://filter-api.herokuapp.com/';
    setupAjaxRequests();
    $('.ui form').on('submit', submitLogin);
    $('.ui form').on('submit', submitRegistration);
    $('').on('click', signOut);
  };

  var submitRegistration = function(event){
    console.log("button works");
    event.preventDefault();
    $.ajax({
      url: apiHost + '/users',
      type: 'POST',
      data: {user: {
        email: $('#email').val(),
        username: $('#username').val(),
        password: $('#password').val()
      }},
    }).done(loginSuccess).fail(function(){
      console.log("error");
    });
    return false;
  };

  var loginSuccess = function(userData){
    localStorage.setItem('authToken', userData.token);
    console.log('Logged in!');
    window.location.href = '/';
    console.log('Logged in!');
  };

  var submitLogin = function(){
    var $form;
    event.preventDefault();
    $form = $(this);
    $.ajax({
      url: apiHost + '/users/sign_in',
      type: 'POST',
      data: $form.serialize()
    }).done(loginSuccess).fail(function(){
      console.log('error');
    });
    return false;
  };

  var setupAjaxRequests = function(){
    $.ajaxPrefilter(function(options){
      options.headers = {};
      options.headers['AUTHORIZATION'] = 'Token token='+ authToken;
    });
  };

  var acceptFailure = function(error){
    if(error.status === 401){
      console.log('send to login screen');
      window.location.href = '/signin.html';
    }
  };

  var signOut = function(event){
    event.preventDefault();
    localStorage.removeItem('authToken');
    authToken = undefined;
  };
  return {init: init};
})();

$(document).ready(function(){
  filtrApp.init();
});
