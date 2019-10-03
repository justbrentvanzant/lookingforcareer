//dataHandle.js
var firebaseConfig = {
    apiKey: "AIzaSyBXtvdQY1lkMhi1hjCbkg4Cfy62LoIZJNQ",
    authDomain: "lookingforcareer-1a6d7.firebaseapp.com",
    databaseURL: "https://lookingforcareer-1a6d7.firebaseio.com",
    projectId: "lookingforcareer-1a6d7",
    storageBucket: "lookingforcareer-1a6d7.appspot.com",
    messagingSenderId: "644837846715",
    appId: "1:644837846715:web:a4dd75f130ff93a5c1c39e"
 };
firebase.initializeApp(firebaseConfig);
var db = firebase.firestore();

//holds references to careers
var careerList = new Array();
var validObjs =  new Array();
//serves as an object constructor 
function Career(tags, description, source,name) {
  this.myTags = tags;
  this.myDescription = description;
  this.sourceDescription = source;
  this.myName = name; 
}

//transforms string of tags into array of tags
var formatTags = function(tagString){
	var tagsArray = tagString.split(','); 
	return tagsArray; 
}

//collects all data required from database
db.collection("careers").get().then((querySnapshot) => {
    querySnapshot.forEach((doc) => {
       var dataObj = doc.data();
       careerList.push(new Career(formatTags(dataObj.tags),dataObj.descr,dataObj.source,dataObj.name));
    });
});

//checks career for tag
var checkForTag = function(careerObj, desiredTag){
	var tagList = careerObj.myTags;
	var bool = false; 
	for (var i = 0; i < tagList.length; i++) {
		if (desiredTag ===tagList[i] ) {
			bool = true;
			i = tagList.length;
		}
	}
	return bool;
}

var scanCareers = function(listDesired, listObjects) {
	var resultant = new Array();
	if (listDesired.length == 0) {
		return resultant;
	}
	for (var i = 0; i < listObjects.length; i++) {
			objectSelected = true; 
			for (var j = 0; j < listDesired.length; j++) {
				var desiredTag = listDesired[j];
				var objectHasTag = false; 
				objectHasTag = checkForTag(listObjects[i], desiredTag);
				if (objectHasTag == false) {
					objectSelected = false;
				}
			}
			if (objectSelected == true) {
				resultant.push(listObjects[i]);	
			}
	}
	return resultant;
}
var showDetails = function(indexNum){
        console.log(indexNum);
 }