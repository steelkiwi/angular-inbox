(() => {
    'use strict';

    angular
        .module('app')
        .constant('gapiSettings', {
            clientid: '411489416329-rlrcg5c9qlc7k8il6sshivamdt3ekksa.apps.googleusercontent.com',
            scope: 'https://www.googleapis.com/auth/plus.login https://www.googleapis.com/auth/userinfo.email https://www.googleapis.com/auth/gmail.readonly',
            cookiepolicy: 'single_host_origin'
        });
})();
