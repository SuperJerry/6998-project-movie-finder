$('document').ready(function() {
    title = sessionStorage.getItem("name");
    console.log(title);
    $('#x-result-txt').text(title);

    overview = sessionStorage.getItem("overview")
    $('#about-content').text(overview);
    release_date = sessionStorage.getItem("release_date")
    $('#release-date').text(release_date)

    poster_path = "https://www.themoviedb.org/t/p/w1280" + sessionStorage.getItem("poster_path")
    $('#show-img').append('<img src="'+poster_path+'" alt="" class="img-thumbnail img-style m-2"></a>');
    
    // production_country_number = sessionStorage.getItem("production_country_number")
    // for (var i = 0; i < production_country_number; i++) {
    //     production_country = sessionStorage.getItem("country" + i)
    //     $('#production-country').text(production_country)
    // }

    original_language = sessionStorage.getItem("original_language")
    $('#ori-language').text(original_language)
    
    vote_average = sessionStorage.getItem("vote_average")
    $('#vote-avg').text(vote_average)

    popularity = sessionStorage.getItem("popularity")
    $('#popularity').text(popularity)

    // $('#cast-content').text();
});