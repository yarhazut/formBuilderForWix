angular.module('formsBuilder')
 .controller('formBuilderController', ['$scope', '$rootScope', '$location', '$http', function ($scope, $rootScope, $location, $http) {
 
    let self = this;
    self.serverUrl = 'http://localhost:3000'
    let fields= [];
    self.showAddButton= true;
    self.moreThanOne= false;
    self.inputTypes = ["text","color","date","email","tel", "number"]


    self.init = function () {
        self.fields= new Array();
    }


    self.addField = function () {
       self.showAddButton= false;
    }


    self.applyField = function () {
        if (!self.moreThanOne)
            self.moreThanOne=true;
        let field={
            label: $scope.label,
            name: $scope.name,
            type: $scope.type
        }
        self.fields.push(field);
        self.showAddButton=true;
        $scope.label="";
        $scope.name="";
        $scope.type="";
     }
     


     self.saveForm = function () {
        newUrl= self.serverUrl+"/initFormSubs"
                $http.post(newUrl,)
                .then(function (response2) {
                    if(response2.status=='500')
                    {
                        window.alert("something went wrong.500..")
                        return
                    }
                    if (response2.status=='200')
                    {
                       // window.alert("Form saved successfully!")
                       self.insertFormToSubs();
                    }
                    
                }, function (response2) {
                    window.alert("something went wrong.innererr..")
                }); 
        
     }



     self.insertFormToSubs = function () {
        let newUrl= self.serverUrl+"/getAllForms"
        $http.get(newUrl, )
        .then(function (response1) {
            if(response1.status=='500')
            {
                window.alert("something went wrong...")
                return
            }
            else
            {
                let updatedFields= response1.data;
                let lastID= updatedFields[updatedFields.length-1].formID;
                // insert
                let newForm= {
                    formID: lastID,
                    formName: $scope.formName,
                    fields: self.fields
                 }
                 let newUrl= self.serverUrl+"/saveCleanForm"
            
                 $http.post(newUrl, newForm)
                    .then(function (response) {
                        if(response.status=='500')
                        {
                            window.alert("something went wrong...")
                            return
                        }
                        if (response.status=='200')
                        {
                            window.alert("Form saved successfully!")
                            $location.path('/')
                        }
                            
                    }, function (response) {
                        window.alert("something went wrong...")
                    });
                
            }
                
        }, function (response1) {
            window.alert("something went wrong.outererr..")
        });
        
     }


    
     












}]);