angular.module('formsBuilder')
 .controller('submitPageController', ['$scope', '$rootScope', '$location', '$http', '$routeParams', function ($scope, $rootScope, $location, $http, $routeParams) {
 
    let self = this;
    self.serverUrl = 'http://localhost:3000/';
    self.wholeFields= []
    self.fieldsNames=[];// new Map();
    self.formName="";
    self.formID= $routeParams.id;
    self.dataModel="";
    self.toServer= [];
    self.validaF= [];


    self.saveData = function () {
        let data= self.dataModel;
        self.fieldsNames.set(response.data[i].inputName, data);
   }

    self.getCleanForm = function () {
        
        $http.get(self.serverUrl + 'getCleanFormByID/' + self.formID)
                .then(function (response) {
                    self.formName= response.data[0].formName;
                    self.wholeFields= response.data;
                    self.fieldsNames= new Array();
                    self.validateF= new Array();
                    var x="";
                    for (var i=0; i<response.data.length; i++)
                    {
                        self.fieldsNames[response.data[i].inputName]= x;
                        //validation
                        /*var pattern= "";
                        var placeHolder="";
                        if (response.data[i].inputType== 'text')
                            pattern= "/^[a-zA-Z]*$/";
                        else if (response.data[i].inputType== 'number')
                            pattern= "/^[a-zA-Z]*$/";
                        
                        let obj={
                            pattern: pattern,
                            ph: placeHolder
                        }

                        self.validateF[response.data[i].inputName]= obj;*/
                    }

                }, function (response) {
                    window.alert("Something went wrong");
                });
   }


   self.submitForm = function () {
    self.convertFields();

    let toInsert= {
        formID: self.formID,
        names: self.toServer
     }
    $http.post(self.serverUrl+'saveFullForm/', toInsert)
    .then(function (response) {
        if(response.status=='500')
        {
            window.alert("something went wrong...")
            return
        }
        if (response.status=='200')
        {
           window.alert("Form details saved successfully")
           $location.path('/')
        }
            
    }, function (response) {
        window.alert("something went wrong...")
    });
    
}


self.convertFields = function () {
    self.toServer= new Array();
    for (var i=0; i< self.wholeFields.length; i++)
    {
        let inputName= self.wholeFields[i].inputName;
        let data= self.fieldsNames[inputName];
        let obj={
            inputName: inputName,
            data: data
        }
        self.toServer.push(obj);
    }
}

}]);