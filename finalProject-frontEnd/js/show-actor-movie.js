$('document').ready(function() {
    movie_title = sessionStorage.getItem("movie_title");
    console.log(movie_title);
    $('#x-result-txt').text(movie_title);

    other_poss = sessionStorage.getItem("other")
    console.log(other_poss);
    $('#other-poss').text(other_poss)

    // Actor-info
    biography = sessionStorage.getItem("biography")
    $('#biography-content').text(biography);
    birthday = sessionStorage.getItem("birthday")
    $('#birthday-a').text(birthday)

    profile_path = "https://www.themoviedb.org/t/p/w1280" + sessionStorage.getItem("profile_path")
    $('#show-img-a').append('<img src="'+profile_path+'" alt="" class="img-thumbnail img-style m-2"></a>');

    place_of_birth = sessionStorage.getItem("place_of_birth")
    $('#place_of_birth-a').text(place_of_birth)
    
    deathday = sessionStorage.getItem("deathday")
    $('#deathday-a').text(deathday)

    popularity = sessionStorage.getItem("popularity-a")
    $('#popularity-a').text(popularity)

    // Movie-info
    overview = sessionStorage.getItem("overview")
    $('#about-content').text(overview);
    release_date = sessionStorage.getItem("release_date")
    $('#release-date').text(release_date)

    poster_path = "https://www.themoviedb.org/t/p/w1280" + sessionStorage.getItem("poster_path")
    $('#show-img').append('<img src="'+poster_path+'" alt="" class="img-thumbnail img-style m-2"></a>');

    original_language = sessionStorage.getItem("original_language")
    $('#ori-language').text(original_language)
    
    vote_average = sessionStorage.getItem("vote_average")
    $('#vote-avg').text(vote_average)

    popularity = sessionStorage.getItem("popularity")
    $('#popularity').text(popularity)

    // $('#cast-content').text();
});