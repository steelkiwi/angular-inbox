(() => {
    'use strict';

    angular
        .module('app')
        .component('app', {
            transclude: true,
            templateUrl: 'components/containers/app/app.html'
        });
})();
