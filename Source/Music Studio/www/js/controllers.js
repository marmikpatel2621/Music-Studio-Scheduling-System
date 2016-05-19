angular.module('app.controllers', ['ionic', 'ngCordova', 'firebase', 'ngStorage', 'ui.bootstrap','ngAnimate'])
  
.controller('bookingHistoryCtrl', function($scope, $state, $http, $localStorage){
    $scope.$on('$ionicView.beforeEnter', function(){
        $scope.firstLoad()
    });
    
    
        $scope.firstLoad = function(){
            $scope.itemsList = [];
        var d1 = [], d2=[],d3=[],d4=[];
        var e1 = [], e2=[],e3=[],e4=[];
        // var url = "http://localhost:8075/MongoRestServiceExample/restService/user";
        var url = "http://musicstudio.h7dgnztdwp.us-west-2.elasticbeanstalk.com/restService/user";
        var resultBookingData = $http.get(url);
        resultBookingData.success(function(result, status, headers, config) {
            resultBookingData = result;
            for(i=0;i<resultBookingData.length;i++){
                            d1[i] = resultBookingData[i].date;
                            d2[i] = resultBookingData[i].time;
                            d3[i] = resultBookingData[i].room;
                            d4[i] = resultBookingData[i].email;
                        }
                        
                        var countNew = 0;
            for(i=d1.length-1;i>=0;i--){
                if(d4[i] == $localStorage.email){
                    e1[countNew] = d1[i];
                    e2[countNew] = d2[i];
                    e3[countNew] = d3[i];
                    
                    $scope.itemsList.push({"date": e1[countNew], "time": e2[countNew], "room": e3[countNew] });
                    countNew++;
                }
                
            }
            
            if(countNew==0){
                document.getElementById('bookingcount').style.display = 'none'; 
                document.getElementById('nobookingcount').style.display = 'block';
            }
            else{
                 document.getElementById('bookingcount').style.display = 'block'; 
                document.getElementById('nobookingcount').style.display = 'none';
            }
            console.log("user date" + e1);
            console.log("user time" + e2);
            console.log("user room" + e3);
            
            
                });
                resultBookingData.error(function(result, status, headers, config) {
                    console.log(result);
                });

        }
    
    $scope.itemList; 
    })
.controller('accountSettingCtrl', function($scope, $state, $cordovaToast, $localStorage){
        $scope.changePassword = function(){
            
            $state.go('menu.changePassword');
        }
        
        $scope.changePasswordNew = function(oldPassword, newPassword){
            var fb = new Firebase("https://aselab9.firebaseio.com/");
            fb.changePassword({
                email: $localStorage.email,
                oldPassword: oldPassword,
                newPassword: newPassword
                }, function(error) {
                if (error) {
                    switch (error.code) {
                    case "INVALID_PASSWORD":
                        console.log("The specified user account password is incorrect.");
                        // $cordovaToast.show('The specified user account password is incorrect.', 'short', 'bottom').then(function(success) {
                        //     console.log("The toast was shown");
                        // }, function (error) {
                        //  console.log("The toast was not shown due to " + error);
                        //  });
                        break;
                    case "INVALID_USER":
                        console.log("The specified user account does not exist.");
                        //  $cordovaToast.show('The specified user account does not exist.', 'short', 'bottom').then(function(success) {
                        //     console.log("The toast was shown");
                        // }, function (error) {
                        //  console.log("The toast was not shown due to " + error);
                        //  });
                        break;
                    default:
                        console.log("Error changing password:", error);
                        //   $cordovaToast.show('Error changing password:' + error, 'short', 'bottom').then(function(success) {
                        //     console.log("The toast was shown");
                        // }, function (error) {
                        //  console.log("The toast was not shown due to " + error);
                        //  });
                    }
                } else {
                    console.log("User password changed successfully!");
                    //  $cordovaToast.show('User password changed successfully!', 'short', 'bottom').then(function(success) {
                    //         console.log("The toast was shown");
                    //     }, function (error) {
                    //      console.log("The toast was not shown due to " + error);
                    //      });
                    $state.go('menu.accountSetting');
                }
                });
        }
        
        $scope.changeEmail = function(){
            $state.go('menu.changeEmail');
        }
        $scope.changeEmailNew = function(newEmail, password){
            var fb = new Firebase("https://aselab9.firebaseio.com/");    
            fb.changeEmail({
                oldEmail: $localStorage.email,
                newEmail: newEmail,
                password: password
                }, function(error) {
                if (error) {
                    switch (error.code) {
                    case "INVALID_PASSWORD":
                        console.log("The specified user account password is incorrect.");
                        //   $cordovaToast.show('The specified user account password is incorrect.', 'short', 'bottom').then(function(success) {
                        //     console.log("The toast was shown");
                        // }, function (error) {
                        //  console.log("The toast was not shown due to " + error);
                        //  });
                        break;
                    case "INVALID_USER":
                        console.log("The specified user account does not exist.");
                        //  $cordovaToast.show('The specified user account does not exist.', 'short', 'bottom').then(function(success) {
                        //     console.log("The toast was shown");
                        // }, function (error) {
                        //  console.log("The toast was not shown due to " + error);
                        //  });
                        break;
                    default:
                        console.log("Error creating user:", error);
                        // $cordovaToast.show('Error creating user:' + error, 'short', 'bottom').then(function(success) {
                        //     console.log("The toast was shown");
                        // }, function (error) {
                        // console.log("The toast was not shown due to " + error);
                        // });
                    }
                } else {
                    console.log("User email changed successfully!");
                    //   $cordovaToast.show('User email changed successfully!', 'short', 'bottom').then(function(success) {
                    //         console.log("The toast was shown");
                    //     }, function (error) {
                    //      console.log("The toast was not shown due to " + error);
                    //      });
                    $localStorage.email = newEmail;
                    $state.go('menu.accountSetting');
                }
                });
        }
    })
   
.controller('aboutCtrl', function($scope) {

})
      
.controller('homeCtrl', function($scope, $http, $state, $window, $filter, $stateParams, $localStorage){
        var a1 = [], a2=[],b1=[],b2=[];
       var url = "http://musicstudio.h7dgnztdwp.us-west-2.elasticbeanstalk.com/restService/user/";
       //var url = "http://localhost:8075/MongoRestServiceExample/restService/user";
        $scope.email = $localStorage.email;
        
        $scope.bookings = function(){
            $state.go('menu.bookingHistory');
        }
        $scope.$on('$ionicView.beforeEnter', function(){
    $scope.first()
    });
        $scope.first = function(){  
            
        var result = $http.get(url);
        result.success(function(result, status, headers, config) {
            // document.getElementById('timeBtn').style.backgroundColor = 'red';
            // document.getElementById('timeBtn').disabled = true;
            console.log('Getting Data');
                    if (result) {
                        userData = result;
                        for(i=0;i<userData.length;i++){
                            a1[i] = userData[i].date;
                            a2[i] = userData[i].time;
                            // z[i] = userData[i].room;
                        }
                        console.log(a1);
                        console.log(a2);
                        for(k=0;k<a1.length;k++){
                            for(j=k+1;j<a1.length;j++){
                                if(a1[k] == a1[j] && a1[j]!=null){
                                    b1[k] = a1[j];
                                    if(b2[k]!=null){
                                        b2[k] = b2[k] +',' + a2[j];
                                    }
                                    else{
                                        b2[k] = a2[k] + ',' + a2[j];
                                    }
                                    a1[j] = null;
                                    a2[j] = null;
                                    
                                }
                                else{
                                    if(b2[k] == null){
                                        b1[k] = a1[k];
                                        b2[k] = a2[k];
                                    }
                                }
                            }
                            if(k == (a1.length - 1)){
                                if(a1[k]!=null){
                                    b1[k] = a1[k];
                                        b2[k] = a2[k];
                                }
                            }
                        }
                        console.log(b1);
                        console.log(b2);
                        //disable fillled dates
                    var i=0;
                        for(j=0;j<b2.length;j++){
                            if(b2[j]!=null){
                                var disabledDatesArrayTime = b2[j].split(',');
                            if(disabledDatesArrayTime.length>11){
                                var temp = b1[j].split('/')
                                disabledDates[i] = temp[1];
                                console.log("Disabled Dates" + temp[1]);
                                i++;
                            }      
                            }
                            
                        }  
                        $localStorage.check = 0
                        for(i=0;i<b1.length;i++){
                if($localStorage.dateSelected == b1[i]){
                    var disabledTimeSlots = b2[i].split(',');
                    if(disabledTimeSlots[0]!=null){
                        $localStorage.check = 1;
                    }
                    for(j=0;j<b2[i].length;j++){
                        console.log(disabledTimeSlots[j]);
                    }
                }
            }
            localStorage["timeSlots"] = JSON.stringify(disabledTimeSlots);
            // document.getElementById('timeBtn').disabled = false;
                        // $location.path('/home');
                    } else {
                        alert('No Data.')
                    }
                });
                result.error(function(result, status, headers, config) {
                    console.log(result);
                });
        }
        sleep(1000);
    var disabledDates = [];        
        $scope.account = function(){
            $state.go('menu.accountSetting');
        }
        $scope.logoff = function(){
            $state.go('login');
        }
        
        $scope.time = function(){
            $localStorage.selectedRoom = 'room1';
            $state.go('menu.time');
        }
        
        
        var a=[];
        a[0] = 15;
        a[1] = 6
        function sleep(milliseconds) {
    var start = new Date().getTime();
    for (var i = 0; i < 1e7; i++) {
        if ((new Date().getTime() - start) > milliseconds){
        break;
        }
    }
    console.log("sleep Completed")
    }
        $scope.changedate = function(date){
            
            
                $localStorage.dateSelected= $filter('date')(date, 'MM') + '/' + $filter('date')(date, 'dd') +
                    '/' +  $filter('date')(date,'yyyy');
                $localStorage.check = 0;
            for(i=0;i<b1.length;i++){
                if($localStorage.dateSelected == b1[i]){
                    var disabledTimeSlots = b2[i].split(',');
                    if(disabledTimeSlots[0]!=null){
                        $localStorage.check = 1;
                    }
                    for(j=0;j<b2[i].length;j++){
                        console.log(disabledTimeSlots[j]);
                    }
                }
            }
            
            localStorage["timeSlots"] = JSON.stringify(disabledTimeSlots);
        //    $localStorage.dateSelected = date;
            $scope.endDateMinDate = date;
            $scope.$broadcast('refreshDatepickers');
            console.log(date)

            $scope.dateOptions = {
                dateDisabled: disabled,
                formatYear: 'yy',
                maxDate: new Date(2016, 7, 1),
                minDate: new Date(),
                startingDay: 1
            };
            
            function disabled(data) {
                var date = data.date,
                mode = data.mode;  
                return mode === 'day' && (date.getDay() === 0 || date.getDay() === 6 || date.getDate() === disabledDates[0] ) ;
            }
                    
                    // console.log(date.getDate() + 'getday' + date.getDay() + '/' + date) ;
                    console.log('month ' + $filter('date')(date, 'MM') + ' day' + $filter('date')(date, 'dd') +
                    ' year' +  $filter('date')(date,'yyyy'));
            };
            
        $scope.today = function() {
        $scope.dt = new Date();
        console.log("first " + $scope.dt);
    };
    $scope.today();

    $scope.clear = function() {
        $scope.dt = null;
    };

    $scope.inlineOptions = {
        customClass: getDayClass,
        minDate: new Date(),
        showWeeks: true
    };

    $scope.dateOptions = {
        dateDisabled: disabled,
        formatYear: 'yy',
        maxDate: new Date(2016, 4, 10),
        min: new Date(2016, 3, 10),
        // minDate: new Date($filter('date')($scope.dt,'yyyy'),$filter('date')($scope.dt, 'MM'), $filter('date')($scope.dt, 'dd')),
        startingDay: 1
    };



    // Disable weekend selection
    function disabled(data) {
        var date = data.date,
        mode = data.mode;  
        return mode === 'day' && (date.getDay() === 0 || date.getDay() === 6 || date.getDate() === disabledDates[0] );
        // || date.getDate === disabledDates[1] || date.getDate === 25) ;
    }

    $scope.toggleMin = function() {
        $scope.inlineOptions.minDate = $scope.inlineOptions.minDate ? null : new Date();
        $scope.dateOptions.minDate = $scope.inlineOptions.minDate;
    };
    
    $scope.toggleMin();

    $scope.open1 = function() {
        $scope.popup1.opened = true;
    };

    $scope.open2 = function() {
        $scope.popup2.opened = true;
    };

    $scope.setDate = function(year, month, day) {
        $scope.dt = new Date(year, month, day);
    };

    $scope.formats = ['dd-MMMM-yyyy', 'yyyy/MM/dd', 'dd.MM.yyyy', 'shortDate'];
    $scope.format = $scope.formats[0];
    $scope.altInputFormats = ['M!/d!/yyyy'];

    $scope.popup1 = {
        opened: false
    };

    $scope.popup2 = {
        opened: false
    };

    var tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);
    var afterTomorrow = new Date();
    afterTomorrow.setDate(tomorrow.getDate() + 1);
    $scope.events = [
        {
        date: tomorrow,
        status: 'full'
        },
        {
        date: afterTomorrow,
        status: 'partially'
        }
    ];

    function getDayClass(data) {
        var date = data.date,
        mode = data.mode;
        if (mode === 'day') {
        var dayToCheck = new Date(date).setHours(0,0,0,0);

        for (var i = 0; i < $scope.events.length; i++) {
            var currentDay = new Date($scope.events[i].date).setHours(0,0,0,0);

            if (dayToCheck === currentDay) {
            return $scope.events[i].status;
            }
        }
        }

        return '';
    }
    })
   
.controller('loginCtrl', function($scope, $state, $cordovaToast, $firebaseAuth, $localStorage){
    var fb = new Firebase("https://aselab9.firebaseio.com/");
        var fbAuth = $firebaseAuth(fb);
        var c = 0;
        $scope.login = function(email, password) {
            //admin
            if(email == 'admin@mail.com' && password=='password'){
                $state.go('admin');
                //    $cordovaToast.show('Login Successful', 'short', 'bottom').then(function(success) {
                //     console.log("The toast was shown");
                // }, function (error) {
                //     console.log("The toast was not shown due to " + error);
                // });
            }
            else{
                
                $localStorage.email = email;
                
                 c++;
                if(c==3){
                    $scope.resetPassword(email);
                }
                
                else{
                       fbAuth.$authWithPassword({
                email: email,
                password: password
            }).then(function(authData) { 
                
                //     $cordovaToast.show('Login Successful', 'short', 'bottom').then(function(success) {
                //     console.log("The toast was shown");
                // }, function (error) {
                //     console.log("The toast was not shown due to " + error);
                // });
                    $state.go('menu.home');
            }).catch(function(error) {
            //      $cordovaToast.show('Please check your username and password', 'short', 'bottom').then(function(success) {
            //     console.log("The toast was shown");
            // }, function (error) {
            //     console.log("The toast was not shown due to " + error);
            // });
                console.error("ERROR: " + error);
               
            });
                }
                     
         
            }
       
        }
    
        $scope.register = function() {
            $state.go('signup')
            
        }
        
        
    $scope.resetPassword = function(email){
        var fb = new Firebase("https://aselab9.firebaseio.com/");
            // var fbAuth = $firebaseAuth(fb);
            fb.resetPassword({
                email: email
                }, function(error) {
                    if (error) {
                    switch (error.code) {
                    case "INVALID_USER":
                    console.log("The specified user account does not exist.");
                        // $cordovaToast.show('The specified user account does not exist.', 'short', 'bottom').then(function(success) {
                        //     console.log("The toast was shown");
                        // }, function (error) {
                        //  console.log("The toast was not shown due to " + error);
                        //  });
                        break;
                    default:
                console.log("Error resetting password:", error);
                        // $cordovaToast.show('Error resetting password:' + error, 'short', 'bottom').then(function(success) {
                        //     console.log("The toast was shown");
                        // }, function (error) {
                        //  console.log("The toast was not shown due to " + error);
                        //  });
                }
                } else {
                console.log("Password reset email sent successfully!");
                //   $cordovaToast.show('Your password has been reset. Please check your email for further details!', 'short', 'bottom').then(function(success) {
                //             console.log("The toast was shown");
                //         }, function (error) {
                //          console.log("The toast was not shown due to " + error);
                //          });
                }
            });
    }
    })
   
.controller('signupCtrl', function($scope, $state, $cordovaToast, $firebaseAuth, $localStorage){
    var fb = new Firebase("https://aselab9.firebaseio.com/");
    $scope.pageClass = 'register';
    var fbAuth = $firebaseAuth(fb);

    $scope.register = function(email, password) {
            fbAuth.$createUser({email: email, password: password}).then(function(userData) {
                return fbAuth.$authWithPassword({
                    email: email,
                    password: password
                });
            }).then(function(authData) {
                console.log("Registration successfull!");
                //   $cordovaToast.show('Registration successfull!', 'short', 'bottom').then(function(success) {
                //             console.log("The toast was shown");
                //         }, function (error) {
                //          console.log("The toast was not shown due to " + error);
                //          });
                $state.go('login');
            }).catch(function(error) {
                console.error("ERROR: " + error);
                // $cordovaToast.show(error, 'short', 'bottom').then(function(success) {
                //             console.log("The toast was shown");
                //         }, function (error) {
                //          console.log("The toast was not shown due to " + error);
                //          });
            });
        }
    

    })
   
.controller('changePasswordCtrl', function($scope) {

})
   
.controller('changeEmailCtrl', function($scope) {

})

.controller('Naga', function($scope, $state, $http, $localStorage,  $cordovaSms, $ionicPlatform){
//        
  
        
        var b8am = false, b11am = false, b12pm = false, b1pm = false;
        var b9am = false, b2pm = false, b3pm = false, b4pm = false;
        var b10am = false, b5pm = false, b6pm = false, b7pm = false;
        
    if($localStorage.check==1){
            var storedNames = JSON.parse(localStorage["timeSlots"]);
        console.log(storedNames);
        
        for(i=0;i<storedNames.length;i++){
            if(storedNames[i] == '8am'){
                document.getElementById('a8am').disabled = true;
                document.getElementById('a8am').style.backgroundColor = 'red';
                // b8am = true;
            }
            else if(storedNames[i] == '9am'){
                document.getElementById('a9am').disabled = true;
                document.getElementById('a9am').style.backgroundColor = 'red';
                // b9am = true;
            }
            else if(storedNames[i] == '10am'){
                document.getElementById('a10am').disabled = true;
                document.getElementById('a10am').style.backgroundColor = 'red';
                // b10am = true;
            }
            else if(storedNames[i] == '11am'){
                document.getElementById('a11am').disabled = true;
                document.getElementById('a11am').style.backgroundColor = 'red';
                // b11am = true;
            }
            else if(storedNames[i] == '12pm'){
                document.getElementById('a12pm').disabled = true;
                document.getElementById('a12pm').style.backgroundColor = 'red';
                // b12pm = true;
            }
            else if(storedNames[i] == '1pm'){
                document.getElementById('a1pm').disabled = true;
                document.getElementById('a1pm').style.backgroundColor = 'red';
                // b1pm = true;
            }
            else if(storedNames[i] == '2pm'){
                document.getElementById('a2pm').disabled = true;
                document.getElementById('a2pm').style.backgroundColor = 'red';
                // b2pm = true;
            }
            else if(storedNames[i] == '3pm'){
                document.getElementById('a3pm').disabled = true;
                document.getElementById('a3pm').style.backgroundColor = 'red';
                // b3pm = true;
            }
            else if(storedNames[i] == '4pm'){
                document.getElementById('a4pm').disabled = true;
                document.getElementById('a4pm').style.backgroundColor = 'red';
                // b4pm = true;
            }
            else if(storedNames[i] == '5pm'){
                document.getElementById('a5pm').disabled = true;
                document.getElementById('a5pm').style.backgroundColor = 'red';
                // b5pm = true;
            }
            else if(storedNames[i] == '6pm'){
                document.getElementById('a6pm').disabled = true;
                document.getElementById('a6pm').style.backgroundColor = 'red';
                // b6pm = true;
            }
            else if(storedNames[i] == '7pm'){
                document.getElementById('a7pm').disabled = true;
                document.getElementById('a7pm').style.backgroundColor = 'red';
                // b7pm = true;
            }
        }

    }


        
        $scope.a8am = function(){
            if(b8am){
                document.getElementById('a8am').style.backgroundColor = 'green';
                b8am = false;
            }else{
                document.getElementById('a8am').style.backgroundColor = 'orange';
                b8am = true;
            }
            
        }
        $scope.a9am = function(){
            if(b9am){
                document.getElementById('a9am').style.backgroundColor = 'green';
                b9am = false;
            }else{
                document.getElementById('a9am').style.backgroundColor = 'orange';
                b9am = true;
            }
            
        }
        $scope.a10am = function(){
            if(b10am){
                document.getElementById('a10am').style.backgroundColor = 'green';
                b10am = false;
            }else{
                document.getElementById('a10am').style.backgroundColor = 'orange';
                b10am = true;
            }
            
        }
        $scope.a11am = function(){
            if(b11am){
                document.getElementById('a11am').style.backgroundColor = 'green';
                b11am = false;
            }else{
                document.getElementById('a11am').style.backgroundColor = 'orange';
                b11am = true;
            }
            
        }
        $scope.a12pm = function(){
            if(b12pm){
                document.getElementById('a12pm').style.backgroundColor = 'green';
                b12pm = false;
            }else{
                document.getElementById('a12pm').style.backgroundColor = 'orange';
                b12pm = true;
            }
            
        }
        $scope.a1pm = function(){
            if(b1pm){
                document.getElementById('a1pm').style.backgroundColor = 'green';
                b1pm = false;
            }else{
                document.getElementById('a1pm').style.backgroundColor = 'orange';
                b1pm = true;
            }
            
        }
        $scope.a2pm = function(){
            if(b2pm){
                document.getElementById('a2pm').style.backgroundColor = 'green';
                b2pm = false;
            }else{
                document.getElementById('a2pm').style.backgroundColor = 'orange';
                b2pm = true;
            }
            
        }
        $scope.a3pm = function(){
            if(b3pm){
                document.getElementById('a3pm').style.backgroundColor = 'green';
                b3pm = false;
            }else{
                document.getElementById('a3pm').style.backgroundColor = 'orange';
                b3pm = true;
            }
            
        }
        $scope.a4pm = function(){
            if(b4pm){
                document.getElementById('a4pm').style.backgroundColor = 'green';
                b4pm = false;
            }else{
                document.getElementById('a4pm').style.backgroundColor = 'orange';
                b4pm = true;
            }
            
        }
        $scope.a5pm = function(){
            if(b5pm){
                document.getElementById('a5pm').style.backgroundColor = 'green';
                b5pm = false;
            }else{
                document.getElementById('a5pm').style.backgroundColor = 'orange';
                b5pm = true;
            }
            
        }
        $scope.a6pm = function(){
            if(b6pm){
                document.getElementById('a6pm').style.backgroundColor = 'green';
                b6pm = false;
            }else{
                document.getElementById('a6pm').style.backgroundColor = 'orange';
                b6pm = true;
            }
            
        }
        $scope.a7pm = function(){
            if(b7pm){
                document.getElementById('a7pm').style.backgroundColor = 'green';
                b7pm = false;
            }else{
                document.getElementById('a7pm').style.backgroundColor = 'orange';
                b7pm = true;
            }
            
        }
        
        
        
        $scope.done = function(){     
        
        var str =[];
        
            
            if(b8am){
                console.log("Pushing 8am");
                str.push('8am'); 
            }
            if(b9am){
                console.log("Pushing 9am");
                str.push('9am');
            }
            if(b10am){
                console.log("Pushing 10am");
                str.push('10am');
            }
            if(b11am){
                console.log("Pushing 11am");
                str.push('11am');
            }
            if(b12pm){
                console.log("Pushing 12pm");
                str.push('12pm');
            }
            if(b1pm){
                console.log("Pushing 1pm");
                str.push('1pm');
            }
            if(b2pm){
                console.log("Pushing 2pm");
                str.push('2pm');
            }
            if(b3pm){
                console.log("Pushing 3pm");
                str.push('3pm');
            }
            if(b4pm){
                console.log("Pushing 4pm");
                str.push('4pm');
            }
            if(b5pm){
                console.log("Pushing 5pm");
                str.push('5pm');
            }
            if(b6pm){
                console.log("Pushing 6pm");
                str.push('6pm');
            }
            if(b7pm){
                console.log("Pushing 7pm");
                str.push('7pm');
            }
            
            var k = str.toLocaleString();
            
            var data = {
            email: $localStorage.email,
            date: $localStorage.dateSelected,
            room: $localStorage.selectedRoom,
            time: str.toString()
        }
          //  var url = "http://localhost:8075/MongoRestServiceExample/restService/user";
             var url = "http://musicstudio.h7dgnztdwp.us-west-2.elasticbeanstalk.com/restService/user";
            var res = $http.post(url, data);
            res.success(function(result, status, headers, config){
                console.log(result)
            });
            res.error(function(data, status, headers, config) {
                    console.log(data);
                    alert("There was some issue while registering. Please try again.")
                });
                // $state.transitionTo('home', null, {'reload':true});
                // $state.go('home', {}, { reload: true });
                

    //  var options = {
    //         replaceLineBreaks: false, // true to replace \n by a new line, false by default
    //         android: {
    //             intent: 'INTENT'  // send SMS with the native android SMS messaging
    //             //intent: '' // send SMS without open any other app
    //         }
    //     };
    // $ionicPlatform.ready(function(){
    //   $cordovaSms
    //   .send('+18167037557', $localStorage.email + ' requested timeslots' + k + ' on ' + $localStorage.dateSelected + ' for ' + $scope.room , options)
    //   .then(function(result) {
    //     console.log(result);
        
    //   }, function(error) {
    //     console.log(error);
    //   })
    // })
  
                $state.go('menu.home');
        }
        
        
    
    })
    
    .controller('adminCtrl', function($scope, $state, $localStorage, $http, $filter){
        
        $scope.logout = function(){
            $state.go('login')
        }
        
        $scope.AdminitemList = [];
        var f1 = [], f2=[],f3=[],f4=[];
        var g1 = [], g2=[],g3=[],g4=[];
        // var url = "http://localhost:8075/MongoRestServiceExample/restService/user";
        var url = "http://musicstudio.h7dgnztdwp.us-west-2.elasticbeanstalk.com/restService/user";        
        $scope.Adminchangedate = function(date){ 
            $scope.AdminitemList = [];        
                $localStorage.AdmindateSelected= $filter('date')(date, 'MM') + '/' + $filter('date')(date, 'dd') +
                    '/' +  $filter('date')(date,'yyyy');
                            var countNew = 0;
                    for(i=0;i<f1.length;i++){
                    if(f1[i] == $localStorage.AdmindateSelected){
                    g1[countNew] = f2[i];
                    g2[countNew] = f3[i];
                    g3[countNew] = f4[i];
                    
                    $scope.AdminitemList.push({"email": g3[countNew], "room": g2[countNew], "time": g1[countNew] });
                    countNew++;
                }
                
                 if(countNew==0){
                document.getElementById('Adminbookingcount').style.display = 'none'; 
                document.getElementById('Adminnobookingcount').style.display = 'block';
            }
            else{
                 document.getElementById('Adminbookingcount').style.display = 'block'; 
                document.getElementById('Adminnobookingcount').style.display = 'none';
            }
                
                console.log("user date" + g1);
            console.log("user time" + g2);
            console.log("user room" + g3);
                
            }
                    
        }
        var adminresultBookingData = $http.get(url);
        adminresultBookingData.success(function(result, status, headers, config) {
            adminresultBookingData = result;
            for(i=0;i<adminresultBookingData.length;i++){
                            f1[i] = adminresultBookingData[i].date;
                            f2[i] = adminresultBookingData[i].time;
                            f3[i] = adminresultBookingData[i].room;
                            f4[i] = adminresultBookingData[i].email;
                        }
                        console.log(f1);
                        console.log(f2);
                        console.log(f3);
                        console.log(f4);
                        
                        var tDate = new Date();
                         $localStorage.AdmindateSelected = $filter('date')(tDate, 'MM') + '/' + $filter('date')(tDate, 'dd') +
                    '/' +  $filter('date')(tDate,'yyyy');
                        var countNew = 0;
                    for(i=0;i<f1.length;i++){
                    if(f1[i] == $localStorage.AdmindateSelected){
                    g1[countNew] = f2[i];
                    g2[countNew] = f3[i];
                    g3[countNew] = f4[i];
                    
                    $scope.AdminitemList.push({"email": g3[countNew], "room": g2[countNew], "time": g1[countNew] });
                    countNew++;
                }
                
            }
            
            if(countNew==0){
                document.getElementById('Adminbookingcount').style.display = 'none'; 
                document.getElementById('Adminnobookingcount').style.display = 'block';
            }
            else{
                 document.getElementById('Adminbookingcount').style.display = 'block'; 
                document.getElementById('Adminnobookingcount').style.display = 'none';
            }
            console.log("user date" + g1);
            console.log("user time" + g2);
            console.log("user room" + g3);
            
            
                });
                adminresultBookingData.error(function(result, status, headers, config) {
                    console.log(result);
                });

    
        
        
        
        $scope.today = function() {
        $scope.dt = new Date();
        };
        $scope.today();

        $scope.clear = function() {
            $scope.dt = null;
        };

        $scope.inlineOptions = {
            customClass: getDayClass,
            minDate: new Date(),
            showWeeks: true
        };

        $scope.dateOptions = {
            dateDisabled: disabled,
            formatYear: 'yy',
            maxDate: new Date(2020, 5, 22),
            minDate: new Date(),
            startingDay: 1
        };

        // Disable weekend selection
        function disabled(data) {
            var date = data.date,
            mode = data.mode;
            return mode === 'day' && (date.getDay() === 0 || date.getDay() === 6);
        }

        $scope.toggleMin = function() {
            $scope.inlineOptions.minDate = $scope.inlineOptions.minDate ? null : new Date();
            $scope.dateOptions.minDate = $scope.inlineOptions.minDate;
        };

        $scope.toggleMin();

        $scope.open1 = function() {
            $scope.popup1.opened = true;
        };

        $scope.open2 = function() {
            $scope.popup2.opened = true;
        };

        $scope.setDate = function(year, month, day) {
            $scope.dt = new Date(year, month, day);
        };

        $scope.formats = ['dd-MMMM-yyyy', 'yyyy/MM/dd', 'dd.MM.yyyy', 'shortDate'];
        $scope.format = $scope.formats[0];
        $scope.altInputFormats = ['M!/d!/yyyy'];

        $scope.popup1 = {
            opened: false
        };

        $scope.popup2 = {
            opened: false
        };

        var tomorrow = new Date();
        tomorrow.setDate(tomorrow.getDate() + 1);
        var afterTomorrow = new Date(tomorrow);
        afterTomorrow.setDate(tomorrow.getDate() + 1);
        $scope.events = [
            {
            date: tomorrow,
            status: 'full'
            },
            {
            date: afterTomorrow,
            status: 'partially'
            }
        ];

        function getDayClass(data) {
            var date = data.date,
            mode = data.mode;
            if (mode === 'day') {
            var dayToCheck = new Date(date).setHours(0,0,0,0);

            for (var i = 0; i < $scope.events.length; i++) {
                var currentDay = new Date($scope.events[i].date).setHours(0,0,0,0);

                if (dayToCheck === currentDay) {
                return $scope.events[i].status;
                }
            }
            }

            return '';
        }
    })