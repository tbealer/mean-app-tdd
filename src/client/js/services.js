app.service('studentDataService', ['crudService', function(crudService) {

  return {
    getAllStudents: function() {
      return crudService.getAll('students')
        .then(function(students) {
          return students;
        });
    },
    addStudent: function(payload) {
      crudService.addOne('students', payload)
        .then(function(student) {
          return student;
        });
    },
    editStudent: function(student) {
      crudService.editOne('students', student)
        .then(function(student) {
          return student;
        });
    },
    removeStudent: function(studentID) {
      crudService.removeOne('students', studentID)
        .then(function(student) {
          return student;
        });
    }
  };

}]);


app.service('crudService', ['$http', function($http) {

  return {
    getAll: function(resource) {
      return $http.get('/'+resource)
        .then(function(res){
          return res;
        })
        .catch(function(err){
          return err;
        });
    },
    addOne: function(resource, payload) {
      return $http.post('/'+resource, payload)
        .then(function(res){
          return res;
        })
        .catch(function(err){
          return err;
        });
    },
    editOne: function(resource, payload) {
      return $http.put('/'+resource+'/'+payload._id, payload)
        .then(function(res){
          return res;
        })
        .catch(function(err){
          return err;
        });
    },
    removeOne: function(resource, uuid) {
      return $http.delete('/'+resource+'/'+uuid)
        .then(function(res){
          return res;
        })
        .catch(function(err){
          return err;
        });
    }
  };

}]);

app.service('authService', ['$http', function($http) {
  var user = {};
  return {
    login: function(user) {
      return $http('/auth/login', user);
    },
    logout: function(user) {
      user = null;
      $window.localStorage.clear();
    },
    register: function(user) {
      return $http('/auth/register', user);
    },
    setUserInfo: function (userData) {
      $window.localStorage.set('user', 'PLACEHOLDER');
      $window.localStorage.set('token', 'PLACEHOLDER');
    },
    getUserInfo: function (userData) {
      $window.localStorage.get('user', 'PLACEHOLDER');
      
    }
  };
}]);