(() => {
    'use strict';

    class SignIn {
        constructor(googleApi, gapiSettings) {
            this.googleApiSettings = angular.extend({
                callback: googleApi.onSignIn.bind(googleApi)
            }, gapiSettings);
            googleApi.registerSignInCallback(this.onSignIn.bind(this));
            this.renderSignInButton();
        }

        onSignIn() {
            this.signedIn = true;
        }

        renderSignInButton() {
            gapi.signin.render('signInButton', this.googleApiSettings);
        }
    }

    SignIn.$inject = [
        'googleApi',
        'gapiSettings'
    ];

    angular
        .module('app')
        .component('signIn', {
            templateUrl: 'components/shared/sign-in/sign-in.html',
            controller: SignIn
        });
})();
