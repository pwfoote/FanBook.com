// TODO: Event listener so when user clicks submit button, the text is stored as artistName
let artistName = "Drake";

// TODO: JSON only return the first result from Discogs
let discogsUrl = "https://api.discogs.com/database/search?q=" + artistName + "&key=XELicaNMkoZtoErpMlbJ&secret=fsjoNmUilNcwWiMnwaHBQnpVKniTySkp&per_page=1";
console.log(discogsUrl);