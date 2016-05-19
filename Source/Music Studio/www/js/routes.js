angular.module('app.routes', [])

.config(function($stateProvider, $urlRouterProvider) {

  // Ionic uses AngularUI Router which uses the concept of states
  // Learn more here: https://github.com/angular-ui/ui-router
  // Set up the various states which the app can be in.
  // Each state's controller can be found in controllers.js
  $stateProvider
    
     .state('admin', {
    url: '/admin',
    templateUrl: 'templates/admin.html',
    controller: 'adminCtrl'
  })

      .state('menu.bookingHistory', {
    url: '/booking',
    views: {
      'side-menu21': {
        templateUrl: 'templates/bookingHistory.html',
        controller: 'bookingHistoryCtrl'
      }
    }
  })

  .state('menu.accountSetting', {
    url: '/account',
    views: {
      'side-menu21': {
        templateUrl: 'templates/accountSetting.html',
        controller: 'accountSettingCtrl'
      }
    }
  })

  .state('menu.about', {
    url: '/about',
    views: {
      'side-menu21': {
        templateUrl: 'templates/about.html',
        controller: 'aboutCtrl'
      }
    }
  })
  .state('menu.time', {
    url: '/time',
    views: {
      'side-menu21': {
        templateUrl: 'templates/time.html',
        controller: 'Naga'
      }
    }
  })
  .state('menu', {
    url: '/side-menu21',
    templateUrl: 'templates/menu.html',
    abstract:true
  })

  .state('menu.home', {
    url: '/home',
    views: {
      'side-menu21': {
        templateUrl: 'templates/home.html',
        controller: 'homeCtrl'
      }
    }
  })

  .state('login', {
    url: '/login',
    templateUrl: 'templates/login.html',
    controller: 'loginCtrl'
  })


  .state('signup', {
    url: '/signup',
    templateUrl: 'templates/signup.html',
    controller: 'signupCtrl'
  })

  .state('menu.changePassword', {
    url: '/changepw',
    views: {
      'side-menu21': {
        templateUrl: 'templates/changePassword.html',
        controller: 'accountSettingCtrl'
      }
    }
  })

  .state('menu.changeEmail', {
    url: '/email',
    views: {
      'side-menu21': {
        templateUrl: 'templates/changeEmail.html',
        controller: 'accountSettingCtrl'
      }
    }
  })

 $urlRouterProvider.otherwise('/login');

  

});