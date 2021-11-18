var searchButton = document.querySelector("#search-btn");
var displayResults = document.querySelector("#search-result");
var inputEl = document.querySelector("#artist");


var getArtistName = function(event) {
    event.preventDefault();
    
    //get value from input element
    var artistName = inputEl.value.trim();

    if (artistName) {
        searchDisc(artistName);
       searchMusicId(artistName);
        inputEl.value = "";
    }
    else {
        // change alert to modal
        alert("please enter an Artist Name!");
    }
}



var searchDisc = function (artistName) {

    // TODO: JSON only return the first result from Discogs
    let discogsUrl = "https://api.discogs.com/database/search?q=" + artistName + "&key=XELicaNMkoZtoErpMlbJ&secret=fsjoNmUilNcwWiMnwaHBQnpVKniTySkp&per_page=1";

    fetch(discogsUrl).then(function (response) {
        if (response.ok) {
            response.json().then(function (data) {
                console.log(data);
            })
        } else {
            // change alert to modal
            alert("Error: GitHub User Not Found");
        }


    })
}

var searchMusicId = function (artistName) {

    // TODO: JSON only return the first result from Discogs
    let mbUrl = "https://musicbrainz.org/ws/2/artist/?query=artist:"+ artistName + "&fmt=json&limit=1";

    fetch(mbUrl).then(function (response) {
        if (response.ok) {
            response.json().then(function (data) {
                searchMusicInfo(data.artists[0].id);
            })
        } else {
            //change alert to modal
            alert("Error: GitHub User Not Found");
        }


    })
}

var searchMusicInfo = function (id) {

    // TODO: JSON only return the first result from Discogs
    let mbInfoUrl = "https://musicbrainz.org/ws/2/artist/" + id + "/relationships?fmt=json&inc=url-rels";

    fetch(mbInfoUrl).then(function (response) {
        if (response.ok) {
            response.json().then(function (data) {
                console.log(data.relations.filter(item => item.type === "social network")[0].url);
                console.log(data.relations.filter(item => item.type === "social network")[1].url);
            })
        } else {
            //change alert to modal
            alert("Error: GitHub User Not Found");
        }


    })
}


searchButton.addEventListener("click", getArtistName);