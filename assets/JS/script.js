// https://musicbrainz.org/ws/2/artist/9fff2f8a-21e6-47de-a2b8-7f449929d43f/relationships?fmt=json&inc=url-rels
let musicbrainzArtistId = "9fff2f8a-21e6-47de-a2b8-7f449929d43f"; // Drake
let musicbrainzUrl = "https://musicbrainz.org/ws/2/artist/" + musicbrainzArtistId + "/relationships?fmt=json&inc=url-rels";
console.log(musicbrainzUrl);

// https://api.discogs.com/database/search?artist_id=151199&key=XELicaNMkoZtoErpMlbJ&secret=fsjoNmUilNcwWiMnwaHBQnpVKniTySkp
let discogsArtistId = "151199"; // Drake
let discogsUrl = "https://api.discogs.com/database/search?artist_id=" + discogsArtistId + "&key=XELicaNMkoZtoErpMlbJ&secret=fsjoNmUilNcwWiMnwaHBQnpVKniTySkp";
console.log(discogsUrl);