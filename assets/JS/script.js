// Variables needed for page functionality
var searchButton = document.querySelector("#search-btn");
var displayResults = document.querySelector("#search-result");
var inputEl = document.querySelector("#artist");
var resultDiv = document.createElement("div");
var cardImg = document.createElement("div");
var resultCoverImage = document.createElement("figure");
var resultImage = document.createElement("img");
var media = document.createElement("div");
var mediaLeft = document.createElement("div");
var infoDiv = document.createElement("div");
var resultNetworks = document.createElement("div");
var artistArr = localStorage.getItem("artist");
var modal = document.getElementById("modal");
var modalText = document.getElementById("modal-text");
var closeModal = document.getElementsByClassName("close")[0];

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
    // Error inputting artist name
    displayModal("Error: Please enter an Artist Name!");
  };
};

// Search Discogs API and return artist info
var searchDisc = function(artistName) {

  // JSON only return the first result from Discogs
  let discogsUrl = "https://api.discogs.com/database/search?q=" + artistName + "&key=XELicaNMkoZtoErpMlbJ&secret=fsjoNmUilNcwWiMnwaHBQnpVKniTySkp&per_page=1";
  fetch(discogsUrl).then(function(response) {
    if (response.ok) {
      response.json().then(function(data) {
        displayArtist(data);
        localStorage.setItem("artist", data.results[0].title);
      });
    } else {
      // Error finding artist in Discogs
      displayModal("Error: Artist not found in Discogs!");
    };
  });
};

// Display artist information in search results
var displayArtist = function(data) {
  // Clear previous results
  resultDiv.innerHTML = "";
  resultDiv.classList.add("card", "has-text-centered", "artist-div");
  // Search result title
  var resultTitleHeader = document.createElement("header");
  resultTitleHeader.classList.add("card-header", "has-background-black");
  var resultTitle = document.createElement("h2");
  resultTitle.innerHTML = data.results[0].title;
  resultTitle.classList.add("card-header-title", "is-size-3", "has-text-centered", "has-text-white");
  // Search result images
  media.classList = "media";
  mediaLeft.classList = "media-left";
  media.appendChild(mediaLeft);
  cardImg.classList = "card-image";
  resultCoverImage.classList = "image";
  cardImg.appendChild(resultCoverImage);
  resultCoverImage.appendChild(resultImage);
  resultImage.setAttribute("src", data.results[0].cover_image);
  resultDiv.appendChild(resultTitleHeader);
  resultTitleHeader.appendChild(resultTitle);
  mediaLeft.appendChild(cardImg);
  resultDiv.appendChild(media);
  displayResults.appendChild(resultDiv);
};

// Search MusicBrainz API and return MusicBrainz's artist id
var searchMusicId = function(artistName) {
  // Return artist's id from MusicBrainz API
  let mbUrl = "https://musicbrainz.org/ws/2/artist/?query=artist:" + artistName + "&fmt=json&limit=1";
  // Search for artist info using MusicBrainz artist id
  fetch(mbUrl).then(function(response) {
    if (response.ok) {
      response.json().then(function(data) {
        searchMusicInfo(data.artists[0].id);
      });
    } else {
      // Error finding artist in MusicBrainz
      displayModal("Error: Artist not found in MusicBrainz!");
    };
  });
};

// Search MusicBrainz API and return social networks
var searchMusicInfo = function(id) {
  // Return artist social networks from MusicBrainz API
  let mbInfoUrl = "https://musicbrainz.org/ws/2/artist/" + id + "/relationships?fmt=json&inc=url-rels";
  // Return all social networks for artist from MusicBrainz API
  fetch(mbInfoUrl).then(function(response) {
    if (response.ok) {
      response.json().then(function(data) {
        displayInfo(data);
        let socialNetworks = data.relations.filter(item => item.type === "social network");
        displaySocialMedia(socialNetworks);
      })
    } else {
      // Error finding artist's social networks in MusicBrainz
      displayModal("Error: Artist's social networks not found in MusicBrainz!");
    };
  });
};

// Display information describing the artist
var displayInfo = function(data) {
  infoDiv.innerHTML = "";
  infoDiv.classList = "m-2 has-text-centered has-background-danger has-text-white is-rounded";
  mediaLeft.appendChild(infoDiv);
  var info = document.createElement("h4");
  info.textContent = data.disambiguation;
  infoDiv.appendChild(info);
};

// Display artist's social networks
var displaySocialMedia = function(socialNetworks) {
  // Clear previous results
  resultNetworks.innerHTML = "";
  // Loop through social networks array
  for (let i = 0; i < socialNetworks.length; i++) {
    var result = document.createElement("a");
    result.href = socialNetworks[i].url.resource;
    result.textContent = socialNetworks[i].url.resource;
    result.classList = "media-link content column button is-rounded is-danger is-hovered is-mobile";
    resultNetworks.classList = " media-link media-content column";
    resultNetworks.appendChild(result);
    result.setAttribute('target', '_blank');
  }
  media.appendChild(resultNetworks);
};

// Load previous search results from local storage
if (artistArr) {
  searchDisc(artistArr);
  searchMusicId(artistArr);
};

// Display string in error modal
var displayModal = function(modalString) {
  modal.style.display = "block";
  modalText.textContent = "";
  modalText.textContent = modalString;
};

// Close modal when user clicks on close button
closeModal.onclick = function() {
  modal.style.display = "none";
};

// Close modal if user clicks anywhere outside modal
window.onclick = function(event) {
  if (event.target == modal) {
    modal.style.display = "none";
  };
};

// Event listener for search button clicks
searchButton.addEventListener("click", getArtistName);