var app_name = "luna";

angular.module(app_name, ['angular-loading-bar', 'ui.router', 'ngCookies','ngAnimate','notification']);

angular.module('notification', ['ui-notification'])
    .config(function(NotificationProvider) {
        NotificationProvider.setOptions({
            delay: 10000,
            startTop: 20,
            startRight: 10,
            verticalSpacing: 20,
            horizontalSpacing: 20,
            positionX: 'right',
            positionY: 'bottom',
            closeOnClick: false
        });
    });