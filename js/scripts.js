(function() {
    var interestTags = ['artist','consulting','animation','3D','modelling','fx','photoshop','maya','unity', 'unreal', 'cg', 'video editing'];
    window.searchBar = new Taggle($('.searchBar.textarea')[0], {
        tags: [interestTags[Math.floor(Math.random()*interestTags.length)]],
        duplicateTagClass: 'bounce',
        onTagAdd: function(event, tag) {
            getTagIndex(tag);
        },
        onBeforeTagRemove: function(event, tag) {
            getTagIndex(tag);
        },
        onTagRemove: function(event, tag) {
            getTagIndex(tag);
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
    var getTagIndex = function(tagAdded) {
        targetTagIndex = 0;
        for (var i = 0; i<interestTags.length; i++){
            if (interestTags[i] ===tagAdded ) {
                targetTagIndex = i;
                i = interestTags.length;
            }
        }
        console.log(targetTagIndex);
        return targetTagIndex;
    }
}());

