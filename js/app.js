(function() {
    
	
    var interestTags = ['art','coding','design','game-mechanics','gaming','esports','data analytics','product management','finance', 'consulting', 'animation', 'video editing','3d','2d','modelling','fx','photoshop','maya','unity','unreal','cg','social','hr','tech','it','languages','esports','film','writing','communications'];

    window.searchBar = new Taggle($('.searchBar.textarea')[0], {
        duplicateTagClass: 'bounce',
        onTagAdd: function(event, tag) {
            handleAdd(tag);
        },
        onTagRemove: function(event, tag) {
            handleRemove(tag);
        },
        allowedTags: interestTags
    });
    var container = window.searchBar.getContainer();
    var input = window.searchBar.getInput();
    var responseArea = window.responseList;

    $(input).autocomplete({
        source: interestTags,
        appendTo: container,
        position: { at: 'left bottom', of: container },
        select: function(e, v) {
            e.preventDefault();
            if (e.which === 1) {
                window.searchBar.add(v.item.value);
            }
        }
    });

	    //handles the logical addition of tag to results data structure
	var handleAdd = function(tagAdded) {
		var indexNum = getTargIndex(tagAdded);
		curTags.push(interestTags[indexNum]);  
		if ( isCareerType ) {
			resultList = scanCareers(curTags,careerList);
			listUpdate();
		}
	}

    var getTargIndex = function(tagAdded) {
        targetTagIndex = 0;
        for (var i = 0; i<interestTags.length; i++){
            if (interestTags[i] ===tagAdded ) {
                targetTagIndex = i;
                i = interestTags.length;
            }
        }
        return targetTagIndex;
    }

    //handles the logical removal of tag to results data structure
    var handleRemove = function(tagAdded) {
        var indexNum = getTargIndex(tagAdded);
        var tagRemoved = interestTags[indexNum]; 
        for (var i = 0; i < curTags.length;i++){
            if (curTags[i] === tagRemoved) {
                curTags.splice(i,1);
                i = curTags.length; 
            }
        }
		if ( isCareerType ) {
			resultList = scanCareers(curTags,careerList);
			listUpdate();
			hideDetails();
		}
    }

    //updates list 
    

	hideDetails();
}());

