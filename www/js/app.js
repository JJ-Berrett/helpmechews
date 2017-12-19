'use strict';
angular.module('chews', ['ionic', 'ionic.cloud', 'controllers', 'services', 'ionic-toast', 'ngStorage'])
	.run(function ($ionicPlatform) {
		$ionicPlatform.ready(function () {
			if (window.cordova && window.cordova.plugins && window.cordova.plugins.Keyboard) {
				cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
				cordova.plugins.Keyboard.disableScroll(true);
			}
			if (window.StatusBar) {
				StatusBar.styleLightContent();
			}
		});
	})

	.config(function ($stateProvider, $urlRouterProvider, $ionicCloudProvider,  $ionicConfigProvider) {
    $ionicConfigProvider.tabs.position('bottom'); // other values: top
    
    $ionicCloudProvider.init({
			"core": {
				"app_id": "ec05e39b"
			},
			"push": {
				"sender_id": "1095842076318",
				"pluginConfig": {
					"ios": {
						"badge": true,
						"sound": true
					},
          'android': {
            'iconColor': '#343434'
          }
				}
			}
		});

		$stateProvider
			.state('tab', {
				url: '/tab',
				abstract: true,
				templateUrl: 'templates/tabs.html'
			})
			.state('tab.home', {
				url: '/home',
				views: {
					'home-tab': {
						templateUrl: 'templates/home.html',
						controller: 'HomeCtrl'
					}
				}
			})

			.state('tab.restaurants', {
				url: '/restaurants',
				views: {
					'restaurants-tab': {
						templateUrl: 'templates/restaurants.html',
						controller: 'restaurantCtrl'
					}
				}
			})
      .state('tab.chews', {
        url: '/chews',
        views: {
          'chews-tab': {
            templateUrl: 'templates/chews.html',
            controller: 'chewsCtrl'
          }
        }
      })
      .state('tab.manage', {
        url: '/manage',
        views: {
          'manage-tab': {
            templateUrl: 'templates/manage.html',
            controller: 'manageCtrl'
          }
        }
      })
			.state('tab.restaurant-detail', {
				url: '/restaurants/:id',
				views: {
					'restaurants-tab': {
						templateUrl: 'templates/restaurant-detail.html',
						controller: 'restaurantDetailCtrl'
					}
				}
			})
			.state('tab.add-restaurant', {
				url: '/restaurant/:id',
				views: {
					'manage-tab': {
						templateUrl: 'templates/add-restaurant.html',
						controller: 'addRestaurantCtrl'
					}
				}
			})
			.state('tab.remove-restaurant', {
				url: '/restaurant/:id',
				views: {
					'manage-tab': {
						templateUrl: 'templates/remove-restaurant.html',
						controller: 'removeRestaurantCtrl'
					}
				}
			});


		$urlRouterProvider.otherwise('/tab/home');
	});
