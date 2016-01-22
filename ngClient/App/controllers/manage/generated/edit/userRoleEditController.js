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

    var controllerId = 'UserRoleEditController';
    angular.module('main')
        .controller(controllerId, ['userRoleFactory',
            'roleFactory',
            'userFactory',
            'logger',
            '$location',
            '$routeParams',
            UserRoleEditController]);

    function UserRoleEditController(userRoleFactory,
		roleFactory,
		userFactory,
		logger,
		$location,
		$routeParams) {
        logger = logger.forSource(controllerId);

        var isNew = $location.path() === '/manage/generated/userRole/new';
        var isSaving = false;

        // Controller methods (alphabetically)
        var vm = this;
        vm.roleSet = [];
        vm.userSet = [];
        vm.cancelChanges = cancelChanges;
        vm.isSaveDisabled = isSaveDisabled;
        vm.entityErrors = [];
        vm.userRole = null;
        vm.saveChanges = saveChanges;
        vm.hasChanges = hasChanges;

        initialize();

        /*** Implementations ***/

        function cancelChanges() {

            $location.url('/manage/generated/userRole');

            //if (userRoleFactory.hasChanges()) {
            //    userRoleFactory.rejectChanges();
            //    logWarning('Discarded pending change(s)', null, true);
            //}
        }

        function hasChanges() {
            return userRoleFactory.hasChanges();
        }

        function initialize() {

            roleFactory.getRoleSet(false)
                .then(function (data) {
                    vm.roleSet = data;
                });

            userFactory.getUserSet(false)
                .then(function (data) {
                    vm.userSet = data;
                });

            if (isNew) {
                // TODO For development enviroment, create test entity?
            }
            else {
                userRoleFactory.getUserRole($routeParams.Id)
                    .then(function (data) {
                        vm.userRole = data;
                    })
                    .catch(function (error) {
                        // TODO User-friendly message?
                    });
            }
        }

        function isSaveDisabled() {
            return isSaving ||
                (!isNew && !userRoleFactory.hasChanges());
        }

        function saveChanges() {

            if (isNew) {
                userRoleFactory.createUserRole(vm.userRole);
            }

            isSaving = true;
            userRoleFactory.saveChanges()
                .then(function (result) {
                    $location.url('/manage/generated/userRole');
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
    }
})();
