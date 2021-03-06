var app = angular.module('RecipesFinder', ['ngRoute',])
	.controller('RecipesIndexController', RecipesIndexController)
	.controller('RecipesShowController', RecipesShowController)
    .controller('RecipesNewController', RecipesNewController)
    .controller('ProfileController', ProfileController)
    .controller('RecipesDeleteController', RecipesDeleteController)
    .controller('RecipesUpdateController', RecipesUpdateController)
    .controller('FacebookMetaController', FacebookMetaController)
    .factory('facebook', function(){
        var facebook = {};

        return facebook;
    });

console.log('Angular is working.');

// ROUTES
app.config(function($routeProvider){
  $routeProvider
    .when('/', {
      templateUrl: '/templates/home.html',
    })
    .when('/recipes/:title/edit', { // the "id" parameter 
    templateUrl: '/templates/recipes-edit.html',
    controller: 'RecipesUpdateController'
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
  $http.get('/api/profile')
    .then(function(response){
        // console.log(response.data);
        $scope.user = response.data; 
        $scope.recipes = $scope.user.recipes;
    });
 }
	
RecipesIndexController.$inject = ['$scope','$http'];
function RecipesIndexController($scope, $http){
  $http.get('/api/recipes')
    .then(function(response){
    	$scope.recipes = response.data; 
    	// console.log($scope.recipes);
    });
 }

FacebookMetaController.$inject = ['$scope', 'facebook'];
function FacebookMetaController($scope, facebook){
    $scope.facebook = facebook;

 }

RecipesShowController.$inject = ['$scope', '$http', '$routeParams', 'facebook'];
function RecipesShowController($scope, $http, $routeParams, facebook){

  $http.get('/api/recipes/' + $routeParams.title)
    .then(function(response) {
        $scope.recipe = response.data;   
        $scope.encodedTitle = encodeURI($scope.recipe.title);
        facebook.title = $scope.recipe.title;
        facebook.encoded_title = encodeURI($scope.recipe.title);
        facebook.image = $scope.recipe.image; 
        facebook.description = $scope.recipe.description;         
        console.log($scope.encodedTitle);
    });

    $http.get('/api/profile')
    .then(function(response){
        // console.log(response.data);
        $scope.user = response.data; 
        $scope.recipes = $scope.user.recipes;
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
    $scope.sendRecipe = function() {
            var data = JSON.stringify({
                    title: $scope.newRecipe.title,
                    image: $scope.newRecipe.image,
                    description: $scope.newRecipe.description,
                    ingredients: $scope.newRecipe.ingredients,
                    directions: $scope.newRecipe.directions,
                    prep_time: $scope.newRecipe.prep_time,
                    cook_time: $scope.newRecipe.cook_time
                });
           
            // console.log(data);

        $http.post('/api/recipes/', data)
            .then(function(response) {
                // console.log(response);
                window.location.href = '/#/profile';
                
        });
    };                   
}

RecipesUpdateController.$inject = ['$scope', '$http', '$routeParams'];
function RecipesUpdateController($scope, $http, $routeParams) {
getRecipe();
$scope.recipeToEdit = {};
$scope.recipeToEdit.ingredients = [];
$scope.getRecipe = getRecipe;
$scope.editRecipe = editRecipe;
 $scope.addNewIngredient = function() {
        $scope.recipeToEdit.ingredients.push('');
};
    $scope.removeIngredient = function(z) {
        $scope.recipeToEdit.ingredients.splice(z, 1);
};
    
    function getRecipe(){
        $http.get('/api/recipes/' + $routeParams.title)
        .then(function(response) {
            $scope.recipeToEdit = response.data;
            });
    }

    function editRecipe() {
        $http.put('/api/recipes/' + $routeParams.title, $scope.recipeToEdit)
            .then(function(response) {
                var title = response.data.title;
                var recipe = response.data.current_recipe;
                window.location.href = ('/#/recipes/' + title);
            });
    // console.log($scope.recipeToEdit);
     }
    
}


RecipesDeleteController.$inject = ['$scope', '$http'];
    function RecipesDeleteController($scope, $http, recipe) {
        $http.delete('/api/recipes/' + recipe.title)
        .then(function(response) {
            // console.log('deleted a recipe!');
        });
        
}



