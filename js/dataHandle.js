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
var curTags = new Array(); 
var resultList = new Array(); 

//handle general state
var isCareerType = true; 
	var handleToggle = function(type) {
		if (type == 0) {
			if (isCareerType != true) {
				hideDetails(); 
				isCareerType = true; 
				$("#typeText").empty();
				$("#typeText").append("Careers");
				resultList = new Array(); 
				$("#responseList").empty();
				//TODO USE CURRENT TAGS
				resultList = scanCareers(curTags,careerList);
				listUpdate();
				hideDetails();
			}
		}
		else {
			if (isCareerType != false) {
				hideDetails(); 
				isCareerType = false; 
				$("#typeText").empty();
				$("#typeText").append("Internships");
				resultList = new Array();
				$("#responseList").empty();
				//TODO USE CURRENT TAGS
			}	
		}
	}

//serves as an object constructor 
function Career(tags, description, source,name) {
  this.myTags = tags;
  this.myDescription = description;
  this.sourceDescription = source;
  this.myName = name; 
}

var listUpdate = function(){
     $("#responseList").empty();
        for (var i = 0; i < resultList.length; i++) {
           $("#responseList").append('<tr><td> <a href="#objectInfo" class="tdLeft" onclick="showDetails('+ i + ')">' + resultList[i].myName + '</a></td>' + '<td><a class="tdRight" href="'+ resultList[i].sourceDescription +'">'+ "Resource</a></td>" + '</tr>');
         }
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
	hideDetails();
	return resultant;
}
//shows details by editing html properties of content of details divs
var showDetails = function(indexNum){
	$("#curTitle").empty();
	$("#curTitle").append(resultList[indexNum].myName);
	$("#curContent").empty();
	$("#curContent").append(resultList[indexNum].myDescription);
	$("#toggleDiv").removeClass("hiddenEle");
	$("#toggleDiv").addClass("visableEle");
}
//clears details by editing html properties of content of details divs and hiding the div
var hideDetails = function(){
	$("#curTitle").empty();
	$("#curContent").empty();
	$("#toggleDiv").removeClass("visableEle");
	$("#toggleDiv").addClass("hiddenEle");
}

