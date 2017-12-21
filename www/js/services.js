angular.module('services', [])
  .service("restaurantSrvc", function ($http, $localStorage) {

    if (!$localStorage.restaurants) {
      $localStorage.restaurants = [];
    }

    this.createRestaurant = (restaurant) => {
      getRestaurants()
      .then((res) => {
        if (res.status !== 500) {
          let existingRestaurant = res.data.find(function (existingRest) {
            return existingRest.name === restaurant.name
          });

          if (!existingRestaurant)
            return $http.post('Http://localhost:8085/api/restaurant', restaurant)
            .then((res) => {
              if (res.status !== 500) {
                $localStorage.restaurants.push(res.data.name);
                return { status: res.status, message: `Added Restaurant: ${res.data.name} successfully!`, data: null};
              }
              else {
                return {
                  status: res.status,
                  response: {
                    message: `There was an error creating restaurant. Close the app and try again.`,
                    data: null
                  }
                };
              }
            });
          return {status: 409, message: `${ restaurant.name } already exists!`, data: null};
        }
      })
    }

    this.getRestaurants = () => {
      return $http.get('Http://localhost:8085/api/restaurants')
      .then((res) => {
        if (res.status !== 500) {
          $localStorage.restaurants = res.data;
          return {status: res.status, message: null, data: res.data};
        }
        else {
          return {
            status: res.status,
            response: {message: `There was an error getting the restaurants. Close the app and try again.`},
            data: res
          };
        }
      });
    }

    this.getRestaurant = (id) => {
      return $localStorage.restaurants.find(function (restaurant) {
        return restaurant.id == parseInt(id);
      })
    }

    this.deleteRestaurant = (id) => {
      return $http.post('http://localhost:8085/api/restaurant', id)
      .then((res) => {
        if (res.status !== 500) {
          return {status: res.status, response: {message: 'Deleted Successfully', data: null}};
        }
        else {
          return {
            status: res.status,
            response: {message: `There was an error deleting the restaurant. Close the app and try again.`},
            data: res
          };
        }
      });
    }
  });
