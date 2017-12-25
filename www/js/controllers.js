angular.module('controllers',[])

  .controller('HomeCtrl', function ($scope, $ionicPopup, restaurantSrvc) {
	  $scope.showAlert = function() {
	  	let randomRestaurant = restaurantSrvc.getRandom();

	  	$ionicPopup.alert({
			  title: `Maybe ${ randomRestaurant.name }?`,
			  cssClass: 'popupBox'
		  });
	  };
  })

  .controller('restaurantCtrl', function ($scope, restaurantSrvc){
	  $scope.$on( '$ionicView.enter', () => {
		  let restaurants = restaurantSrvc.getRestaurants();
		  return mapRestaurants($scope, restaurants);
	  });
  })

  .controller('chewsCtrl', function ($scope, restaurantSrvc, $ionicPopup, $location) {
	  let restaurantList = [];
	  let newList;
	  let picked;
	  let final;

	  let finalPopup = (restaurant) => {
		  let myPopup = $ionicPopup.show({
			  title: `${ restaurant.name } sounds great!`,
			  cssClass: 'popupBox',
			  buttons: [
				  {
					  text: 'Ok',
					  type: 'button-positive',
				  }
			  ]
		  });

		  myPopup.then(() => {
			  $location.path('/tab/home');
		  });
	  };

	  let finalList = () => {
		  let myPopup = $ionicPopup.show({
			  title: "<p class='positive'>Here is your final list! Pick where you want to go!</p>",
			  buttons: [
				  {
					  text: 'Ok',
					  type: 'button-positive',
					  onTap: function(e) {
					  	mapRestaurants($scope, newList);
					  }
				  }
			  ]
		  });
	  };

	  let myapp = () => {
		  if (restaurantList.length >= 5 && picked !== 4) {
			  let restaurants = [];

			  for(let i = 0; i < 5; i++){
				  let index = Math.floor(Math.random() * restaurantList.length);
				  let restaurant = restaurantList.splice(index, 1);
				  restaurants.push(restaurant[0]);
			  }

			  mapRestaurants($scope, restaurants);
		  }
		  else {
		  	final = true;
			  finalList();
		  }
	  };

	  let showPopup = () => {
		  let myPopup = $ionicPopup.show({
			  title: "<p class='positive'>Pick a couple of Restaurants from each list</p>",
			  buttons: [
				  {
				  	text: 'Ok',
					  type: 'button-positive',
				  }
			  ]
		  });

		  myPopup.then(() => {
			  let restaurants = restaurantSrvc.getRestaurants();
			  for (let i = 0; i < restaurants.length; i++) {
				  restaurantList.push(restaurants[i]);
			  }
			  newList = [];
			  picked = 0;
			  final = false;
			  myapp();
		  });
	  };

	  $scope.$on( '$ionicView.enter', () => {
	  	showPopup();
	  });

	  $scope.pickedRestaurant = (restaurant) => {
	  	if(final){
	  		finalPopup(restaurant);
		  }
		  else {
			  newList.push(restaurant);
			  picked++;
			  myapp();
		  }
	  }
  })

	.controller('addRestaurantCtrl', function ($scope, restaurantSrvc, $stateParams) {
		$scope.master = {};

		$scope.addRestaurant = (restaurant) => {
      if(restaurant.name !== '') {
        restaurantSrvc.createRestaurant(restaurant);
      }
      else {
        $scope.restaurant = angular.copy($scope.master);
      }
    }
	})

.controller('removeRestaurantCtrl', function ($scope, restaurantSrvc, $ionicPopup, $location) {
	let restaurants = restaurantSrvc.getRestaurants();
	mapRestaurants($scope, restaurants);

	$scope.removeRestaurant = (restaurant) => {
			let confirmPopup = $ionicPopup.confirm({
				title: 'Delete Restaurant',
				template: `Are you sure you want to delete ${restaurant.name}?`
			});

			confirmPopup.then((res) => {
				if(res) {
					restaurantSrvc.deleteRestaurant(restaurant);
					mapRestaurants($scope, restaurants);
					$location.path('/tab/manage');
				}
			});
		};
});

function mapRestaurants ($scope, restaurants) {
	$scope.loading = true;
	if(!restaurants) {
		restaurants = restaurantSrvc.getRestaurants();
	}
	let restaurantTypes = [];

	restaurants.map((restaurant) => {
		let found = restaurantTypes.find(({type}) => {
			return type === restaurant.type;
		});

		if (!found) {
			restaurantTypes.push({
				type: restaurant.type,
				restaurants: []
			});
		}
		let index = restaurantTypes.findIndex(i => i.type === restaurant.type);
		restaurantTypes[index].restaurants.push(restaurant);
	});

	$scope.mappedRestaurantTypes = restaurantTypes;
	$scope.loading = false;
}


//================ For V2 =================//

// .controller('restaurantDetailCtrl', function ($scope, $sce, restaurantSrvc, $stateParams, ionicToast) {
//  $scope.restaurant = restaurantSrvc.getRestaurant($stateParams.id);
// })


