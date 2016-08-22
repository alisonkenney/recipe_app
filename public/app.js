var app = angular.module('RecipesFinder', ['ngRoute'])
	 .controller('RecipesIndexController', RecipesIndexController)
	 .controller('RecipesShowController', RecipesShowController);

console.log('Angular is working.');

// ROUTES
app.config(function($routeProvider){
  $routeProvider
    .when('/', {
      templateUrl: '/templates/home.html',
    })
    .when('/recipes', { 
    templateUrl: 'templates/recipes.html',
    controller: 'RecipesIndexController',
    })
    .when('/recipes/:title', { // the "id" parameter 
    templateUrl: 'templates/recipes-show.html',
    controller: 'RecipesShowController'
    })
    .when('/recipes/new', { // the "id" parameter 
    templateUrl: 'templates/recipes-new.html',
    controller: 'RecipesNewController'
    });
});
	
RecipesIndexController.$inject = ['$scope','$http'];
function RecipesIndexController($scope, $http){
$scope.hello = "wine index controller is working!";
  $http.get('http://localhost:3000/api/recipes')
    .then(function(response){
    	$scope.recipes = response.data; 
    	console.log($scope.recipes);
    });
 }

RecipesShowController.$inject = ['$scope', '$http', '$routeParams'];
function RecipesShowController($scope, $http, $routeParams){
  $http.get('http://localhost:3000/api/recipes/' + $routeParams.title)
    .then(function(response) {
        $scope.recipe = response.data;         
        console.log($scope.recipe);
    });
} 

RecipesNewController.$inject = ['$scope', '$http', '$routeParams'];
function RecipesNewController($scope, $http, $routeParams) {
    $http.post('http://localhost:3000/api/recipes/', newRecipe);
        console.log(newRecipe);
}


