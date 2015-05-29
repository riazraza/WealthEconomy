//------------------------------------------------------------------------------
// <auto-generated>
//     This code was generated from a template.
//
//     Manual changes to this file may cause unexpected behavior in your application.
//     Manual changes to this file will be overwritten if the code is regenerated.
// </auto-generated>
//------------------------------------------------------------------------------

(function () {
    'use strict';

    var controllerId = 'userElementFieldEditController';
    angular.module('main')
        .controller(controllerId, ['userElementFieldService',
            'elementFieldService',
            'userService',
            'logger',
            '$location',
            '$routeParams',
            userElementFieldEditController]);

    function userElementFieldEditController(userElementFieldService,
		elementFieldService,
		userService,
		logger,
		$location,
		$routeParams) {
        logger = logger.forSource(controllerId);

        var isNew = $location.path() === '/manage/userElementField/new';
        var isSaving = false;

        // Controller methods (alphabetically)
        var vm = this;
        vm.elementFieldSet = [];
        vm.userSet = [];
        vm.cancelChanges = cancelChanges;
        vm.isSaveDisabled = isSaveDisabled;
        vm.entityErrors = [];
        vm.userElementField = null;
        vm.saveChanges = saveChanges;
        vm.hasChanges = hasChanges;

        initialize();

        /*** Implementations ***/

        function cancelChanges() {

            $location.path('/manage/userElementField');

            //if (userElementFieldService.hasChanges()) {
            //    userElementFieldService.rejectChanges();
            //    logWarning('Discarded pending change(s)', null, true);
            //}
        }

        function hasChanges() {
            return userElementFieldService.hasChanges();
        }

        function initialize() {

            elementFieldService.getElementFieldSet(false)
                .then(function (data) {
                    vm.elementFieldSet = data;
                });

            userService.getUserSet(false)
                .then(function (data) {
                    vm.userSet = data;
                });

            if (isNew) {
                // TODO For development enviroment, create test entity?
            }
            else {
                userElementFieldService.getUserElementField($routeParams.Id)
                    .then(function (data) {
                        vm.userElementField = data;
                    })
                    .catch(function (error) {
                        // TODO User-friendly message?
                    });
            }
        };

        function isSaveDisabled() {
            return isSaving ||
                (!isNew && !userElementFieldService.hasChanges());
        }

        function saveChanges() {

            if (isNew) {
                userElementFieldService.createUserElementField(vm.userElementField);
            }

            isSaving = true;
            userElementFieldService.saveChanges()
                .then(function (result) {
                    $location.path('/manage/userElementField');
                })
                .catch(function (error) {
                    // Conflict (Concurrency exception)
                    if (typeof error.status !== 'undefined' && error.status === '409') {
                        // TODO Try to recover!
                    } else if (typeof error.entityErrors !== 'undefined') {
                        vm.entityErrors = error.entityErrors;
                    }
                })
                .finally(function () {
                    isSaving = false;
                });
        }
    };
})();
