app.controller('UserController', UserController)

function UserController ($scope, $http, $stateParams) {
  var vm = this;
  vm.all = [];

  vm.getUser = getUser;
  vm.doesGardenBelongToUser = doesGardenBelongToUser;
  
  function getUser() {
    var userId = $stateParams.id;
    $http
      .get('/api/profile/' + userId)
      .then(function(response) {
        console.log("getUser: ", response.data)
        $scope.user = response.data;
      })
  }

  // edit garden permissions
  function doesGardenBelongToUser() {
    // get garden id
    var gardenId = $stateParams.id
    // get user id from jwt
    var userId = Account.getUserIdFromJwt();
    console.log("useriD:", payload.sub);
    
    $scope.isEditable = false;

    $http
      .get('/api/profile/' + userId)
      .then(function(response) {
        console.log("users gardens: ", response.data.gardens[0]._id)
        // render json from server
        var usersGardens = response.data.gardens[0]._id
        // if garden id is in user's gardens
        if (usersGardens.indexOf(gardenId) !== -1 ) {
          // then do allow user to edit
          console.log("garden belongs to user")
          $scope.isEditable = true;
        }
      })
  }

}

