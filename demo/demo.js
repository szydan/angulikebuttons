if (window.location.href.indexOf('http') != 0) {
    alert("This demo must be run on a web server (i.e. the url must start with http/https), it won't work by opening the file directly in a browser.");
}

angular.module('myApp', ['angulikebuttons'])
  .run([
      '$rootScope', function ($rootScope) {
          $rootScope.facebookAppId = '[FacebookAppId]'; // set your facebook app id here
      }
  ]);

angular.module('myApp')
  .controller('myController', [
      '$scope', function ($scope) {



          $scope.myModel = {
              facebookUrl: 'http://facebook.com/zuck',
              Name: "AngularJS directives for social sharing buttons - Facebook, Google+, Twitter and Pinterest | Jason Watmore's Blog",
              ImageUrl: 'http://www.jasonwatmore.com/pics/jason.jpg'
          };
      }
  ]);
