//listen for form submit
document.getElementById("myform").addEventListener('submit', saveBookmarks);

//Save bookmark
function saveBookmarks(e){
    //Get form values
    var siteName = document.getElementById('siteName').value;
    var siteUrl = document.getElementById("siteURL").value;
    //Object that contains siteName and siteUrl which is subkitted to local storage.
    var bookmark = {
        name: siteName,
        url: siteUrl
    }
    
    if(!siteName || !siteUrl){
        alert("Please fill in the form.");
        //must return false so as to submit to not actually submit a form.
        return false;
    }
    
//    //Local storage
//    localStorage.setItem('test', 'hello world!');
//    console.log(bookmark);
//    e.preventDefault();
//    
    
    //Test if bookmakrs is null
    if(localStorage.getItem('bookmarks') === null){
        // Init array
        var bookmarks = [];
        //Add to array
        bookmarks.push(bookmark);
        //Set to local storage
        localStorage.setItem('bookmarks', JSON.stringify(bookmarks));
       }
    else{
        //Get bookmakrs from localStroage
        var bookmarks = JSON.parse(localStorage.getItem('bookmarks'));
        //Add bookmark to array
        bookmarks.push(bookmark);
        //Set back to localStorage
        localStorage.setItem('bookmarks', JSON.stringify(bookmarks));
        
    }
    //Re-fetch bookmakrs
    fetchBookmarks();
   
}

function fetchBookmarks(){
        //Get bookmarks from localStroage
        var bookmarks = JSON.parse(localStorage.getItem('bookmarks'));
        //get output id
        var bookmarksResults = document.getElementById('bookmarksResults');
        //Build output
        bookmarksResults.innerHTML = '';
        for(var i = 0; i < bookmarks.length; i++){
            var name = bookmarks[i].name;
            var url = bookmarks[i].url;
            
            bookmarksResults.innerHTML += '<div class = "well">' + 
                                          '<h3>' + name +
                                          '<a class = "btn btn-default" target = "_blank" href = "'+url+ '"> Visit</a> ' + 
                                          '<a onclick = "deleteBookmark(\''+url+'\')"class = "btn btn-danger" href = "#"> Delete</a> ' + 
                                          '</h3>' + 
                                          '</div>';
            
        }
}

function deleteBookmark(url){
    //Get bookmarks from localStroage
    var bookmarks = JSON.parse(localStorage.getItem('bookmarks'));
    //Loop through bookmarks
    for(var i = 0; i < bookmarks.length; i++){
        if(bookmarks[i].url === url){
            //Remove from array
            bookmarks.splice(i, 1);
        }    
    }
    //Set back to localStorage
    localStorage.setItem('bookmarks', JSON.stringify(bookmarks));
    //Re-fetch bookmakrs
    fetchBookmarks();
}