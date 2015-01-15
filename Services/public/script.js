var app = angular.module("myApp", []);

app.service('ContactService', function(){
	//Unique Id for each contact.
	var uid = 2;

	//Container to hold contact.
	var contactList = [{
						id : 1,
						Name : "Ryan",
						Email: "abc@gmail.com",
						Phone: "12345"
					   }];

	//Functions for our service.
	//Save function save new contact to contact list.
	this.save = function(contact){
		
		//Check id of contact to see if it aleady exists. If so, just update contact.
		if(contact.id != null){
			for(i in contactList){
				if(contactList[i].id == contact.id){
					contactList[i] = contact;
				}
			}
		}
		else{
			contact.id = uid++;
			contactList.push(contact);
		}
	};

	//Delete contact from contact list.
	this.delete = function(contactID){
		for(i in contactList){
			if(contactList[i].id == contactID){
				contactList.splice(i,1);
			}
		}
	}

	//Return contact using contact ID
	this.get = function(contactID){
		for(i in contactList){
			if(contactList[i].id == contactID){
				return contactList[i];
			}
		}
	}

	//Return contact list.
	this.list = function(){
		return contactList;
	}
})

app.controller('myCtrl', function($scope, ContactService){	
	$scope.contacts = ContactService.list();

	$scope.doSave = function(){
		ContactService.save($scope.newContact);
		$scope.newContact = {};
		$scope.contactForm.$setPristine();
	};

	$scope.doDelete = function(contactID){
		ContactService.delete(contactID);
	}

	$scope.doEdit = function(contactID){
		$scope.newContact = angular.copy(ContactService.get(contactID));
	}
});