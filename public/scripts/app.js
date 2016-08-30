var app = angular.module('RecipesFinder', ['ngRoute',])
	.controller('RecipesIndexController', RecipesIndexController)
	.controller('RecipesShowController', RecipesShowController)
    .controller('RecipesNewController', RecipesNewController)
    .controller('ProfileController', ProfileController)
    .controller('RecipesDeleteController', RecipesDeleteController);

console.log('Angular is working.');

// ROUTES
app.config(function($routeProvider){
  $routeProvider
    .when('/', {
      templateUrl: '/templates/home.html',
    })
    .when('/profile', { 
    templateUrl: '/templates/profile.html',
    controller: 'ProfileController',
    })
    .when('/recipes', { 
    templateUrl: '/templates/recipes.html',
    controller: 'RecipesIndexController',
    })
    .when('/recipes/new', { // the "id" parameter 
    templateUrl: '/templates/recipes-new.html',
    controller: 'RecipesNewController'
    })
    .when('/recipes/:title', { // the "id" parameter 
    templateUrl: '/templates/recipes-show.html',
    controller: 'RecipesShowController'
    });
    
});

ProfileController.$inject = ['$scope','$http'];
function ProfileController($scope, $http){
  $http.get('http://localhost:3000/api/profile')
    .then(function(response){
        // console.log(response.data);
        $scope.user = response.data; 
        $scope.recipes = $scope.user.recipes;
    });
 }
	
RecipesIndexController.$inject = ['$scope','$http'];
function RecipesIndexController($scope, $http){
  $http.get('http://localhost:3000/api/recipes')
    .then(function(response){
    	$scope.recipes = response.data; 
    	console.log($scope.recipes);
    });
 }

RecipesShowController.$inject = ['$scope', '$http', '$routeParams'];
function RecipesShowController($scope, $http, $routeParams){
  console.log("show");  
  $http.get('http://localhost:3000/api/recipes/' + $routeParams.title)
    .then(function(response) {
        $scope.recipe = response.data;         
        console.log($scope.recipe);
    });
} 

RecipesNewController.$inject = ['$scope', '$http'];
    function RecipesNewController($scope, $http) {
    $scope.newRecipe = {};
    $scope.newRecipe.title = "";
    $scope.newRecipe.image = "";
    $scope.newRecipe.description = "";
    $scope.newRecipe.ingredients = [""];
    $scope.newRecipe.directions = "";
    $scope.newRecipe.prep_time = "";
    $scope.newRecipe.cook_time = "";
    $scope.addNewIngredient = function() {
        $scope.newRecipe.ingredients.push('');
    };
    $scope.removeIngredient = function(z) {
        $scope.newRecipe.ingredients.splice(z, 1);
    };
    $scope.sendPost = function() {
            var data = JSON.stringify({
                    title: $scope.newRecipe.title,
                    image: $scope.newRecipe.image,
                    description: $scope.newRecipe.description,
                    ingredients: $scope.newRecipe.ingredients,
                    directions: $scope.newRecipe.directions,
                    prep_time: $scope.newRecipe.prep_time,
                    cook_time: $scope.newRecipe.cook_time
                });
           
            console.log(data);

        $http.post('/api/recipes/', data)
            .then(function(response) {
                console.log(response);
                window.location.href = '/#/profile';
                
        });
    };                   
}

RecipesDeleteController.$inject = ['$scope', '$http'];
    function RecipesDeleteController($scope, $http, recipe) {
        $http.delete('http://localhost:3000/api/recipes/' + recipe.title)
        .then(function(response) {
            console.log('deleted a recipe!');
        });
        
    }



