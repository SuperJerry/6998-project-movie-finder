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
    $('.img-thumbnail').css("width", "50%");
    


    title = sessionStorage.getItem("name-1");
    console.log(title);
    $('#x-result-txt-1').text(title);

    overview = sessionStorage.getItem("overview-1")
    $('#about-content-1').text(overview);
    release_date = sessionStorage.getItem("release_date-1")
    $('#release-date-1').text(release_date)

    poster_path = "https://www.themoviedb.org/t/p/w1280" + sessionStorage.getItem("poster_path-1")
    $('#show-img-1').append('<img src="'+poster_path+'" alt="" class="img-thumbnail img-style m-2"></a>');
    $('.img-thumbnail').css("width", "50%");



    title = sessionStorage.getItem("name-2");
    console.log(title);
    $('#x-result-txt-2').text(title);

    overview = sessionStorage.getItem("overview-2")
    $('#about-content-2').text(overview);
    release_date = sessionStorage.getItem("release_date-2")
    $('#release-date-2').text(release_date)

    poster_path = "https://www.themoviedb.org/t/p/w1280" + sessionStorage.getItem("poster_path-2")
    $('#show-img-2').append('<img src="'+poster_path+'" alt="" class="img-thumbnail img-style m-2"></a>');
    $('.img-thumbnail').css("width", "50%");
    



    // production_country_number = sessionStorage.getItem("production_country_number")
    // for (var i = 0; i < production_country_number; i++) {
    //     production_country = sessionStorage.getItem("country" + i)
    //     $('#production-country').text(production_country)
    // }

    

    // $('#cast-content').text();
});