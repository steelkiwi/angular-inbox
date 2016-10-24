(() => {
    'use strict';

    class GoogleAPI {
        constructor(counts, $window) {
            this.counts = counts;
            this.$window = $window;
            this.signedIn = false;
            this.signInCallbacks = [];
        }

        registerSignInCallback(cb) {
            if (angular.isFunction(cb)) {
                this.signInCallbacks.push(cb);
            }
        }

        onSignIn(authResult) {
            if (authResult.access_token) {
                angular.forEach(this.signInCallbacks, cb => {
                    cb(authResult);
                });
            }
        }

        getUserInfo() {
            return gapi.client.request({
                path: '/plus/v1/people/me',
                method: 'GET'
            });
        }

        googleApiLoad() {
            return gapi.client.load('gmail', 'v1');
        }

        getMessages(messageId, formatData) {
            return gapi.client.gmail.users.messages.get({
                userId: 'me',
                id: messageId,
                format: formatData
            });
        }

        getMessagesID(token) {
            return gapi.client.gmail.users.messages.list({
                userId: 'me',
                maxResults: this.counts.paginateCoefficient,
                pageToken: token
            });
        }

        getBody(message) {
            let encodedBody = '';
            if (angular.isUndefined(message.parts)) {
                encodedBody = message.body.data;
            } else {
                encodedBody = this.getHTMLPart(message.parts);
            }
            encodedBody = encodedBody.replace(/-/g, '+').replace(/_/g, '/').replace(/\s/g, '');
            return decodeURIComponent(escape(this.$window.atob(encodedBody)));
        }

        getHTMLPart(arr) {
            for (let x = 0; x <= arr.length; x++) {
                if (angular.isUndefined(arr[x].parts)) {
                    if (arr[x].mimeType === 'text/html') {
                        return arr[x].body.data;
                    }
                } else {
                    return this.getHTMLPart(arr[x].parts);
                }
            }
            return '';
        }
    }

    GoogleAPI.$inject = [
        'counts',
        '$window'
    ];

    angular
        .module('app')
        .service('googleApi', GoogleAPI);
})();
