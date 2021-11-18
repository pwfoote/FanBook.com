var searchButton = document.querySelector("#search-btn");
var displayResults = document.querySelector("#search-result");
var inputEl = document.querySelector("#artist");


var getArtistName = function(event) {
    event.preventDefault();
    
    //get value from input element
    var artistName = inputEl.value.trim();

    if (artistName) {
        searchDisc(artistName);
        inputEl.value = "";
    }
    else {
        alert("please enter an Artist Name!");
    }
}


// TODO: Event listener so when user clicks submit button, the text is stored as artistName
//let artistName = "Drake";

var searchDisc = function (artistName) {

    // TODO: JSON only return the first result from Discogs
    let discogsUrl = "https://api.discogs.com/database/search?q=" + artistName + "&key=XELicaNMkoZtoErpMlbJ&secret=fsjoNmUilNcwWiMnwaHBQnpVKniTySkp&per_page=1";

    fetch(discogsUrl).then(function (response) {
        if (response.ok) {
            response.json().then(function (data) {
                console.log(data);
            })
        } else {
            alert("Error: GitHub User Not Found");
        }


    })
}

searchButton.addEventListener("click", getArtistName);