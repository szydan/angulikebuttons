/**
 * AngularJS directives for social sharing buttons - Facebook Like, Google+, Twitter and Pinterest
 * based on Jason Watmore <jason@pointblankdevelopment.com.au> (http://jasonwatmore.com)
 * @version 1.0.0
 */
/*global angular*/
(function () {

  var loadedScripts = {};
  function checkLoadedScripts(id, callback) {
    if (loadedScripts[id]) {
      callback();
    } else {
      setTimeout(function () {
        checkLoadedScripts(id, callback);
      }, 10);
    }
  }

  var loadScript = function (id, url, callback) {
    var s = window.document.getElementById(id);
    if (!s) {
      s = window.document.createElement('script'); // use global document since Angular's $document is weak
      s.type = 'text/javascript';
      s.src = url;
      s.async = true;
      s.id = id;
      s.onload = function () {
        if (callback) {
          loadedScripts[id] = true;
          callback();
        }
      };
      window.document.body.appendChild(s);
    } else {
      if (callback) {
        checkLoadedScripts(id, callback);
      }
    }
  };


  angular.module('angulikebuttons', [])
  .directive('fbLike', ['$window', '$rootScope', function ($window, $rootScope) {
    return {
      restrict: 'A',
      scope: {
        fbLike: '=?',
        fbType       : '@?',
        fbShare      : '@?',
        fbShowFaces  : '@?',
        fbActionType : '@?',
        fbButtonLang : '@?'
      },
      link: function (scope, element, attrs) {

        scope.type       = scope.fbType === undefined ? 'button' : scope.fbType;
        scope.share      = scope.fbShare === undefined ? 'true' : scope.fbShare;
        scope.showFaces  = scope.fbShowFaces === undefined ? 'false' : scope.fbShowFaces;
        scope.actionType = scope.fbActionType === undefined ? 'like' : scope.fbActionType;
        scope.buttonLang = scope.fbButtonLang === undefined ? 'en_US' : scope.fbButtonLang;


        var watchAdded = false;
        function renderLikeButton() {
          if (!!attrs.fbLike && !scope.fbLike && !watchAdded) {
            // wait for data if it hasn't loaded yet
            watchAdded = true;
            var unbindWatch = scope.$watch('fbLike', function (newValue, oldValue) {
              if (newValue) {
                renderLikeButton();

                // only need to run once
                unbindWatch();
              }
            });
            return;
          } else {
            var html =
              '<div class="fb-like"' +
              (!!scope.fbLike ? ' data-href="' + scope.fbLike + '"' : '') +
              ' data-layout="' + scope.type + '"' +
              ' data-action="' + scope.actionType + '"' +
              ' data-show-faces="' + scope.showFaces + '"' +
              ' data-share="' + scope.share + '"></div>';
            element.html(html);
            $window.FB.XFBML.parse(element[0]);
          }
        }

        if (!$window.FB) {
          // Load Facebook SDK if not already loaded
          loadScript(
            'fb-script', '//connect.facebook.net/' + scope.buttonLang + '/sdk.js',
            function () {
              $window.FB.init({
                appId: $rootScope.facebookAppId,
                xfbml: false,
                version: 'v2.4'
              });
              renderLikeButton();
            }
          );
        } else {
          renderLikeButton();
        }
      }
    };
  }])

  .directive('googlePlus', ['$window', function ($window) {
    return {
      restrict: 'A',
      scope: {
        googlePlus: '=?'
      },
      link: function (scope, element, attrs) {

        var watchAdded = false;
        function renderPlusButton() {
          if (!!attrs.googlePlus && !scope.googlePlus && !watchAdded) {
            // wait for data if it hasn't loaded yet
            watchAdded = true;
            var unbindWatch = scope.$watch('googlePlus', function (newValue, oldValue) {
              if (newValue) {
                renderPlusButton();

                // only need to run once
                unbindWatch();
              }

            });
            return;
          } else {
            element.html(
              '<div class="g-plusone"' + (!!scope.googlePlus ? ' data-href="' + scope.googlePlus + '"' : '') +
              ' data-size="medium"></div>');
            $window.gapi.plusone.go(element[0]);
          }
        }


        if (!$window.gapi) {
          // Load Google SDK if not already loaded
          loadScript('google-sdk', '//apis.google.com/js/platform.js', function () {
            renderPlusButton();
          });
        } else {
          renderPlusButton();
        }

      }
    };
  }])
  .directive('tweet', ['$window', '$location', function ($window, $location) {
    return {
      restrict: 'A',
      scope: {
        tweet: '=',
        tweetUrl: '='
      },
      link: function (scope, element, attrs) {

        var watchAdded = false;
        function renderTweetButton() {
          if (!scope.tweet && !watchAdded) {
            // wait for data if it hasn't loaded yet
            watchAdded = true;
            var unbindWatch = scope.$watch('tweet', function (newValue, oldValue) {
              if (newValue) {
                renderTweetButton();

                // only need to run once
                unbindWatch();
              }
            });
            return;
          } else {
            element.html(
              '<a href="https://twitter.com/share" class="twitter-share-button" ' +
              ' data-text="' + scope.tweet + '" ' +
              ' data-url="' + (scope.tweetUrl || $location.absUrl()) + '">Tweet</a>');
            $window.twttr.widgets.load(element[0]);
          }
        }

        if (!$window.twttr) {
          // Load Twitter SDK if not already loaded
          loadScript('twitter-sdk', '//platform.twitter.com/widgets.js', function () {
            renderTweetButton();
          });
        } else {
          renderTweetButton();
        }
      }
    };
  }])
  .directive('pinIt', ['$window', '$location', function ($window, $location) {
    return {
      restrict: 'A',
      scope: {
        pinIt: '=',
        pinItImage: '=',
        pinItUrl: '='
      },
      link: function (scope, element, attrs) {

        var watchAdded = false;
        function renderPinItButton() {
          if (!scope.pinIt && !watchAdded) {
            // wait for data if it hasn't loaded yet
            watchAdded = true;
            var unbindWatch = scope.$watch('pinIt', function (newValue, oldValue) {
              if (newValue) {
                renderPinItButton();

                // only need to run once
                unbindWatch();
              }
            });
            return;
          } else {
            element.html(
              '<a href="//www.pinterest.com/pin/create/button/' +
              '?url=' + (scope.pinItUrl || $location.absUrl()) +
              '&media=' + scope.pinItImage +
              '&description=' + scope.pinIt + '" ' +
              'data-pin-do="buttonPin" data-pin-config="beside"></a>');
            $window.parsePins(element[0]);
          }
        }


        if (!$window.parsePins) {
          // Load Pinterest SDK if not already loaded
          (function (d) {
            var f = d.getElementsByTagName('SCRIPT')[0];
            var p = d.createElement('SCRIPT');
            p.type = 'text/javascript';
            p.async = true;
            p.src = '//assets.pinterest.com/js/pinit.js';
            p['data-pin-build'] = 'parsePins';
            p.onload = function () {
              if (!!$window.parsePins) {
                renderPinItButton();
              } else {
                setTimeout(p.onload, 100);
              }
            };
            f.parentNode.insertBefore(p, f);
          }($window.document));
        } else {
          renderPinItButton();
        }
      }
    };
  }]);

}());
