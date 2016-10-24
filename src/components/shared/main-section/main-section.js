(() => {
    'use strict';

    angular
        .module('app')
        .component('mainSection', {
            templateUrl: 'components/shared/main-section/main-section.html',
            transclude: true
        });
})();
