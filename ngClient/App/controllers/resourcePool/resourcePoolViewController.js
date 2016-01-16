﻿(function () {
    'use strict';

    var controllerId = 'resourcePoolViewController';
    angular.module('main')
        .controller(controllerId, ['resourcePoolFactory',
            '$location',
            '$routeParams',
            '$rootScope',
            'logger',
            resourcePoolViewController]);

    function resourcePoolViewController(resourcePoolFactory, $location, $routeParams, $rootScope, logger) {

        // Logger
        logger = logger.forSource(controllerId);

        var vm = this;
        vm.editorConfig = getEditorConfig();

        init();

        function init() {

            // Title
            if (!vm.editorConfig.isNew) {
                resourcePoolFactory.getResourcePool(vm.editorConfig.resourcePoolId)
                    .then(function (resourcePool) {

                        // Not found, navigate to 404
                        if (resourcePool === null) {
                            $location.path('/content/404');
                            return;
                        }

                        $rootScope.viewTitle = resourcePool.Name;
                    });
            }
        }

        function getEditorConfig() {

            var action = $location.path().substring($location.path().lastIndexOf('/') + 1);
            var isNew = action === 'new';
            var isEdit = action === 'edit';
            var resourcePoolId = $routeParams.resourcePoolId;

            var config = {
                isNew: isNew,
                isEdit: isEdit,
                resourcePoolId: isNew ? null : resourcePoolId
            };

            return config;
        }
    };
})();