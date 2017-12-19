angular.module('controllers',[])

  .controller('HomeCtrl', function ($scope) {

  })

  .controller('restaurantCtrl', function ($scope, sessionsSrvc, ionicToast) {

    let sessionLength = 0;
    let sessionType;
    let sessions;
    $scope.sessions = {};

    function getAllSessions() {
      $scope.loading = true;
      sessionsSrvc.getSessions()
        .then((res) => {
          sessions = res.data;
          sessionsSrvc.setSessions(sessions);
          return sessions;
        })
        .then(function (result) {
          let mappedSessions = [];
          sessions = result;

          //Create Mapped array with sessionType, SessionTime, then array of sessions
          result.map(function (session) {
            let isMapped = mappedSessions.find(function (mappedSession) {
              return mappedSession.sessionType === session.sessiontype;
            });

            if (!isMapped) {
              mappedSessions.push({
                sessionType: session.sessiontype,
                sessionTime: session.sessiontime,
                sessions: []
              })
            }
          });

          //Add sessions to the session object in the mapped session.
          result.map(function (session) {
            let mappedSession = mappedSessions.find(function (mappedSession) {
              return mappedSession.sessionTime === session.sessiontime;
            });
            if (mappedSession) {
              mappedSession.sessions.push(session);
            }
          });
          $scope.mappedSessions = mappedSessions;
          $scope.loading = false;
        })
    }

    getAllSessions()
  })

  .controller('chewsCtrl', function ($scope, sessionsSrvc, ionicToast) {
    $scope.sendSms = function () {
      let message = 'My Schedule \n \n';
      schedule = sessionsSrvc.getSchedule();
      if (schedule) {
        for (let i = 0; i < schedule.length; i++) {
          message = message.concat("Breakout " + (i + 1) + ": " + schedule[i].title + "\n \n");
        }
        let options = {
          replaceLineBreaks: false, // true to replace \n by a new line, false by default
          android: {
            intent: 'INTENT'  // send SMS with the native android SMS messaging
            //intent: '' // send SMS without open any other app
          }
        };
        let number = '';
        sms.send(number, message, options);
      }
      else {
        ionicToast.show('Nothing in your schedule, please add before sharing', 'middle', false, 2500);
      }
    };


    function getSchedule() {
      let scheduledSessions = sessionsSrvc.getSchedule();
      if (scheduledSessions) {
        $scope.scheduledSessions = scheduledSessions;
        $scope.noSchedule = false;
      }
      else {
        $scope.noSchedule = true;
      }
    }

    $scope.removeFromSchedule = function (id) {
      sessionsSrvc.removeFromSchedule(id);
      getSchedule();
    };

    $scope.$on('$ionicView.enter', function (e) {
      getSchedule()
    });
  })

  .controller('manageCtrl', function ($scope, $ionicModal) {
    $ionicModal.fromTemplateUrl('templates/map.html', {
      scope: $scope
    }).then(function (modal) {
      $scope.modal = modal;
    });

    $scope.openModal = function () {
      $scope.modal.show();
      $scope.imgUrl = "img/map.png"
    }
  })

  .controller('restaurantDetailCtrl', function ($scope, sessionsSrvc, $stateParams, ionicToast, $ionicModal) {
    $scope.session = sessionsSrvc.getSession($stateParams.id);

    $scope.addToSchedule = function (id) {
      let status = sessionsSrvc.addToSchedule(id);
      if (status.sessionId) {
        ionicToast.show('Added to your schedule!', 'middle', false, 1500);
      }
      if (status.sessionType) {
        ionicToast.show('You already have something for this session.', 'middle', false, 1500);
      }
      if (!status.sessionId && !status.sessionType) {
        ionicToast.show('Already in your schedule.', 'middle', false, 1500);
      }
    };

    $ionicModal.fromTemplateUrl('templates/map.html', {
      scope: $scope
    }).then(function (modal) {
      $scope.modal = modal;
    });

    $scope.openModal = function () {
      $scope.modal.show();
      $scope.imgUrl = "img/map.png"
    }
  })

	.controller('addRestaurantCtrl', function ($scope, sessionsSrvc, $stateParams) {
		$scope.session = sessionsSrvc.getSession($stateParams.id);
		$scope.submitReview = function (session) {

			if (session.likeFeedback || session.dislikeFeedback || session.generalFeedback) {
				var review = {
					sessionId: session.id,
					sessionTitle: session.title,
					sessionSpeaker: session.speaker,
					userName: session.userName || "",
					userEmail: session.userEmail || "",
					likeFeedback: session.likeFeedback || "",
					dislikeFeedback: session.dislikeFeedback || "",
					generalFeedback: session.generalFeedback || "",
					rating : session.rating || ""
				};

				sessionsSrvc.submitReview(review)
			}
		};
	})

.controller('removeRestaurantCtrl', function ($scope, sessionsSrvc, $stateParams) {
	let sessionLength = 0;
	let sessionType;
	let sessions;
	$scope.sessions = {};

	function getAllSessions() {
		$scope.loading = true;
		sessionsSrvc.getSessions()
			.then((res) => {
				sessions = res.data;
				sessionsSrvc.setSessions(sessions);
				return sessions;
			})
			.then(function (result) {
				let mappedSessions = [];
				sessions = result;

				//Create Mapped array with sessionType, SessionTime, then array of sessions
				result.map(function (session) {
					let isMapped = mappedSessions.find(function (mappedSession) {
						return mappedSession.sessionType === session.sessiontype;
					});

					if (!isMapped) {
						mappedSessions.push({
							sessionType: session.sessiontype,
							sessionTime: session.sessiontime,
							sessions: []
						})
					}
				});

				//Add sessions to the session object in the mapped session.
				result.map(function (session) {
					let mappedSession = mappedSessions.find(function (mappedSession) {
						return mappedSession.sessionTime === session.sessiontime;
					});
					if (mappedSession) {
						mappedSession.sessions.push(session);
					}
				});
				$scope.mappedSessions = mappedSessions;
				$scope.loading = false;
			})
	}

	getAllSessions()
});
