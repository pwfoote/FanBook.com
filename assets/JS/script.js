var searchButton = document.querySelector("#search-btn");
var displayResults = document.querySelector("#search-result");
var inputEl = document.querySelector("#artist");
var resultDiv = document.querySelector("#result-div");
var resultTitle = document.querySelector("#result-title");

var resultCoverImage = document.createElement("figure");
var resultImage = document.createElement("img");
var resultNetworks = document.createElement("div");


// Get artist name from user to search APIs
var getArtistName = function(event) {
  event.preventDefault();

  // Get name from user input element
  var artistName = inputEl.value.trim();

  // Search Discogs and MusicBrainz using artist name
  if (artistName) {
    searchDisc(artistName);
    searchMusicId(artistName);
    inputEl.value = "";
  } else {
    // TODO: change alert to modal
    alert("Please enter an Artist Name!");
  }
}

// Search Discogs API and return artist info
var searchDisc = function(artistName) {
  // JSON only return the first result from Discogs
  let discogsUrl = "https://api.discogs.com/database/search?q=" + artistName + "&key=XELicaNMkoZtoErpMlbJ&secret=fsjoNmUilNcwWiMnwaHBQnpVKniTySkp&per_page=1";

  fetch(discogsUrl).then(function(response) {
    if (response.ok) {
      response.json().then(function(data) {
        resultTitle.innerHTML = data.results[0].title;
        resultTitle.classList = "results-card-twitter card-header-title has-text-white";

        resultCoverImage.classList = "image is-128x128";
        resultCoverImage.appendChild(resultImage);
        resultImage.setAttribute("src", data.results[0].cover_image);
        
        resultDiv.appendChild(resultTitle);
        resultDiv.appendChild(resultCoverImage);
        displayResults.appendChild(resultDiv);
      })
    } else {
      // TODO: change alert to modal
      alert("Error: Artist not found in Discogs!");
    }
  })
}

// Search MusicBrainz API and return MusicBrainz's artist id
var searchMusicId = function(artistName) {
  // Return artist's id from MusicBrainz API
  let mbUrl = "https://musicbrainz.org/ws/2/artist/?query=artist:" + artistName + "&fmt=json&limit=1";

  fetch(mbUrl).then(function(response) {
    if (response.ok) {
      response.json().then(function(data) {
        searchMusicInfo(data.artists[0].id);
      })
    } else {
      // TODO: Change alert to modal
      alert("Error: Artist not found in MusicBrainz!");
    }
  })
}

// Search MusicBrainz API and return social networks
var searchMusicInfo = function(id) {
  // Return artist social networks from MusicBrainz API
  let mbInfoUrl = "https://musicbrainz.org/ws/2/artist/" + id + "/relationships?fmt=json&inc=url-rels";

  // Return all social networks for artist from MusicBrainz API
  fetch(mbInfoUrl).then(function(response) {
    if (response.ok) {
      response.json().then(function(data) {
        let socialNetworks = data.relations.filter(item => item.type === "social network");

        // Loop through social networks array
        for (let i = 0; i < socialNetworks.length; i++) {
          var result = document.createElement("a");
          result.textContent = socialNetworks[i].url.resource;
          result.classList = "has-background-white card-content column";
          resultNetworks.classList = "has-background-white card-content column";
          resultNetworks.appendChild(result);
        }
        resultDiv.appendChild(resultNetworks);
      })
    } else {
      // TODO: change alert to modal
      alert("Error: Artist's social networks not found in MusicBrainz!");
    }
  })
}

searchButton.addEventListener("click", getArtistName);