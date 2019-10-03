(function() {
    
    var interestTags = ['art','consulting','animation','3D','modelling','fx','photoshop','maya','unity', 'unreal', 'cg', 'video editing'];
    var curTags = new Array(); 
    var resultList = new Array(); 
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

    //handles the logical addition of tag to results data structure
    var handleAdd = function(tagAdded) {
        var indexNum = getTargIndex(tagAdded);
        curTags.push(interestTags[indexNum]);  
        resultList = scanCareers(curTags,careerList);
        listUpdate();
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

        resultList = scanCareers(curTags,careerList);
        listUpdate();
    }

    //updates list 
    var listUpdate = function(){
     $("#responseList").empty();
        for (var i = 0; i < resultList.length; i++) {
           $("#responseList").append('<tr><td onclick="showDetails('+ i + ')">' + resultList[i].myName + '</td>' + '<td' </tr>');
         }
    }

    //shows details of career
    var showDetails = function(indexNum){
        console.log(indexNum);
    }

}());

