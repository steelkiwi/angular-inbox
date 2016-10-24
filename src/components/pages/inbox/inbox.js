(() => {
    'use strict';

    class Inbox {
        constructor(googleApi, $mdDialog, $document, $scope) {
            this.googleApi = googleApi;
            this.googleApi.registerSignInCallback(this.onSignIn.bind(this));
            this.$mdDialog = $mdDialog;
            this.$document = $document;
            this.inbox = [];
            this.modalConfiguration = {
                templateUrl: 'components/containers/modal/modal.html',
                parent: angular.element(this.$document[0].body),
                clickOutsideToClose: true,
                onComplete: this.onModalComplete.bind(this)
            };
            this.$scope = $scope;
        }

        onSignIn() {
            this.googleApi.googleApiLoad().then(this.getIDs.bind(this));
            this.googleApi.getUserInfo().then(data => {
                this.userInfo = data.result;
            });
        }

        getIDs(token) {
            const getMessages = this.getMessages.bind(this);
            this.googleApi.getMessagesID(token).then(getMessages);
        }

        getMessages(resp) {
            this.nextPageToken = resp.result.nextPageToken;
            const messageIdsArr = resp.result.messages;
            angular.forEach(messageIdsArr, msgId => {
                this.googleApi.getMessages(msgId.id, 'minimal').then(resp => {
                    this.$scope.$apply(() => {
                        this.inbox = [...this.inbox, resp.result];
                    });
                });
            });
        }

        loadMore() {
            if (this.inbox.length) {
                this.getIDs(this.nextPageToken);
            }
        }

        onModalComplete() {
            this.googleApi.getMessages(this.id, 'full').then(data => {
                this.$scope.$apply(() => {
                    const iframe = this.$document[0].getElementById('iframe').contentWindow.document;
                    iframe.open();
                    iframe.write(this.googleApi.getBody(data.result.payload));
                    iframe.close();
                });
            });
        }

        openModal(id) {
            this.id = id;
            this.$mdDialog.show(this.modalConfiguration);
        }
    }

    Inbox.$inject = [
        'googleApi',
        '$mdDialog',
        '$document',
        '$scope'
    ];

    angular
        .module('app')
        .component('inbox', {
            templateUrl: 'components/pages/inbox/inbox.html',
            controller: Inbox
        });
})();
