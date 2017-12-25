angular.module('services', [])
  .service("restaurantSrvc", function ($http, $localStorage) {

    if (!$localStorage.restaurants) {
      $localStorage.restaurants = [
      	{"name": "Chili's", "type": "Sit-down"},
	      {"name": "Outback", "type": "Sit-down"},
	      {"name": "The Habit", "type": "Hamburgers"},
	      {"name": "Pizza Factory", "type": "Pizza"},
	      {"name": "Chick-fil-a", "type": "Fast-food"},
	      {"name": "Wendy's", "type": "Fast-food"},
	      {"name": "Durangos", "type": "Mexican"},
	      {"name": "AppleBee's", "type": "Sit-down"},
	      {"name": "Texas Roadhouse", "type": "Sit-down"},
	      {"name": "Subway", "type": "Fast-food Healthy"},
	      {"name": "Red-Lobster", "type": "Sea-food"},
	      {"name": "Panda Express", "type": "Fast-Food"},
	      {"name": "Cafe Rio", "type": "Mexican"},
	      {"name": "Don Pedro's", "type": "Mexican"},
	      {"name": "Olive Garden", "type": "Italian"}
	      ];
    }

    this.createRestaurant = (restaurant) => {
	    let existingRestaurant = $localStorage.restaurants.find((existingRest) => {
	      return existingRest.name === restaurant.name;
      });

	    if (!existingRestaurant) {
		    $localStorage.restaurants.push(restaurant);
		    return true;
      }
      return false;

      //TODO: Uncomment this for v2
      // getRestaurants()
      // .then((res) => {
      //   if (res.status !== 500) {
      //     let existingRestaurant = res.data.find(function (existingRest) {
      //       return existingRest.name === restaurant.name
      //     });
      //
      //     if (!existingRestaurant)
      //       return $http.post('https://helpmechews.herokuapp.com/api/restaurant', restaurant)
      //       .then((res) => {
      //         if (res.status !== 500) {
      //           $localStorage.restaurants.push(res.data.name);
      //           return { status: res.status, message: `Added Restaurant: ${res.data.name} successfully!`, data: null};
      //         }
      //         else {
      //           return {
      //             status: res.status,
      //             response: {
      //               message: `There was an error creating restaurant. Close the app and try again.`,
      //               data: null
      //             }
      //           };
      //         }
      //       });
      //     return {status: 409, message: `${ restaurant.name } already exists!`, data: null};
      //   }
      // })
    };

    this.getRestaurants = () => {
      return $localStorage.restaurants;
      //TODO: Uncomment this for V2
      // return $http.get('https://helpmechews.herokuapp.com/api/restaurants')
      // .then((res) => {
      //   if (res.status !== 500) {
      //     $localStorage.restaurants = res.data;
      //     return {status: res.status, message: null, data: res.data};
      //   }
      //   else {
      //     return {
      //       status: res.status,
      //       response: {message: `There was an error getting the restaurants. Close the app and try again.`},
      //       data: res
      //     };
      //   }
      // });
    };

    //TODO: Uncomment for v2
    // this.getRestaurant = (id) => {
    //   return $localStorage.restaurants.find(function (restaurant) {
    //     return restaurant.id === id;
    //   })
    // };

	  this.getRandom = () => {
	  	let index = Math.floor(Math.random() * $localStorage.restaurants.length);
			return $localStorage.restaurants[index];

	  };

    this.deleteRestaurant = (name) => {
	    $localStorage.restaurants = $localStorage.restaurants.filter(n => n !== name);
      //TODO: Uncomment for v2
      // return $http.post('https://helpmechews.herokuapp.com/api/restaurant', id)
      // .then((res) => {
      //   if (res.status !== 500) {
      //     return {status: res.status, response: {message: 'Deleted Successfully', data: null}};
      //   }
      //   else {
      //     return {
      //       status: res.status,
      //       response: {message: `There was an error deleting the restaurant. Close the app and try again.`},
      //       data: res
      //     };
      //   }
      // });
    }
  });
