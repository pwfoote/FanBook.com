<<<<<<< HEAD
// https://musicbrainz.org/ws/2/artist/9fff2f8a-21e6-47de-a2b8-7f449929d43f/relationships?fmt=json&inc=url-rels
let musicbrainzArtistId = "9fff2f8a-21e6-47de-a2b8-7f449929d43f"; // Drake
let musicbrainzUrl = "https://musicbrainz.org/ws/2/artist/" + musicbrainzArtistId + "/relationships?fmt=json&inc=url-rels";
console.log(musicbrainzUrl);

// https://api.discogs.com/database/search?artist_id=151199&key=XELicaNMkoZtoErpMlbJ&secret=fsjoNmUilNcwWiMnwaHBQnpVKniTySkp
let discogsArtistId = "151199"; // Drake
let discogsUrl = "https://api.discogs.com/database/search?artist_id=" + discogsArtistId + "&key=XELicaNMkoZtoErpMlbJ&secret=fsjoNmUilNcwWiMnwaHBQnpVKniTySkp";
console.log(discogsUrl);
=======
var searchButton = document.querySelector("#search-btn");
var displayResults = document.querySelector("#search-result");
var inputEl = document.querySelector("#artist");

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
        console.log(data);
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
          console.log(socialNetworks[i].url);
        }
      })
    } else {
      // TODO: change alert to modal
      alert("Error: Artist's social networks not found in MusicBrainz!");
    }
  })
}

searchButton.addEventListener("click", getArtistName);
>>>>>>> c184ccfbd3883b8a6c8f27f1400ac9a2bcfac832
