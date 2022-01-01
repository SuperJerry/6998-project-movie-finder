$('document').ready(function() {
  
  // Advanced search with both genre and cast
  $("#search-form-advanced").on('submit', function(event) {
    event.preventDefault();
    var queryString = $("#transcript").val();
    console.log(queryString)
    $("#loader").css("display", "block");
    
    $.ajax({
      url: "https://cwm62dylg9.execute-api.us-west-2.amazonaws.com/v1/advancesearch",
      type: "PUT",
      data: JSON.stringify(queryString),
      // contentType: 'application/json',
      processData: false,
      cache: false,
      crossDomain: true,
      dataType: "json",
      headers: {"x-api-key": "***"},
      error: function(res) {console.log(res)},
      success: function(res) { 
        console.log(res);
        $("#loader").css("display", "none");
        
        sessionStorage.setItem("movie-query", queryString)

        var movie_title = res['body'][0]['original_title']
        console.log(movie_title)
        sessionStorage.setItem("name", movie_title)

        var overview = res['body'][0]['overview']
        console.log(overview)
        sessionStorage.setItem("overview", overview)

        var poster_path = res['body'][0]['poster_path']
        console.log(poster_path)
        sessionStorage.setItem("poster_path", poster_path)

        var release_date = res['body'][0]['release_date']
        console.log(release_date)
        sessionStorage.setItem("release_date", release_date)


        var movie_title = res['body'][1]['original_title']
        console.log(movie_title)
        sessionStorage.setItem("name-1", movie_title)

        var overview = res['body'][1]['overview']
        console.log(overview)
        sessionStorage.setItem("overview-1", overview)

        var poster_path = res['body'][1]['poster_path']
        console.log(poster_path)
        sessionStorage.setItem("poster_path-1", poster_path)

        var release_date = res['body'][1]['release_date']
        console.log(release_date)
        sessionStorage.setItem("release_date-1", release_date)


        var movie_title = res['body'][2]['original_title']
        console.log(movie_title)
        sessionStorage.setItem("name-2", movie_title)

        var overview = res['body'][2]['overview']
        console.log(overview)
        sessionStorage.setItem("overview-2", overview)

        var poster_path = res['body'][2]['poster_path']
        console.log(poster_path)
        sessionStorage.setItem("poster_path-2", poster_path)

        var release_date = res['body'][2]['release_date']
        console.log(release_date)
        sessionStorage.setItem("release_date-2", release_date)


        // var production_countries = res['body']['production_countries']
        // sessionStorage.setItem("production_country_number", production_countries.length)
        // for (var i = 0; i < production_countries.length; i++) {
        //   var production_country = production_countries[i]['name']
        //   sessionStorage.setItem("country" + i, production_country)
        //   console.log(production_country)
        // }

        window.location.href="result-movieList.html";
      }
   });
  });
  
  // Search by movie name
  $("#search-form-movie").on('submit', function(event) {
    event.preventDefault();
    var queryString = $("#movie-name").val();
    console.log(queryString)
    $("#loader").css("display", "block");
    
    $.ajax({
      url: "https://cwm62dylg9.execute-api.us-west-2.amazonaws.com/v1/search",
      type: "PUT",
      data: JSON.stringify(queryString),
      // contentType: 'application/json',
      processData: false,
      cache: false,
      crossDomain: true,
      dataType: "json",
      headers: {"x-api-key": "***"},
      //beforeSend: function(xhr){
        // $('#x-result-txt').text(' ');
        // $('#x-hrule').css('display', 'none');
        // xhr.setRequestHeader('Content-Type', fileType);
      //  xhr.setRequestHeader('x-api-key', '8vD0DcGMaD5cKrlHzhFHc5gxDKD5E7h5az4hzjNY');
      //},
      error: function(res) {console.log(res)},
      success: function(res) { 
        console.log(res);
        $("#loader").css("display", "none");
        
        sessionStorage.setItem("movie-query", queryString)
        var movie_title = res['body']['original_title']
        console.log(movie_title)
        sessionStorage.setItem("name", movie_title)

        var overview = res['body']['overview']
        console.log(overview)
        sessionStorage.setItem("overview", overview)

        var poster_path = res['body']['poster_path']
        console.log(poster_path)
        sessionStorage.setItem("poster_path", poster_path)

        var release_date = res['body']['release_date']
        console.log(release_date)
        sessionStorage.setItem("release_date", release_date)

        // var production_countries = res['body']['production_countries']
        // sessionStorage.setItem("production_country_number", production_countries.length)
        // for (var i = 0; i < production_countries.length; i++) {
        //   var production_country = production_countries[i]['name']
        //   sessionStorage.setItem("country" + i, production_country)
        //   console.log(production_country)
        // }

        var original_language = res['body']['original_language']
        console.log(original_language)
        sessionStorage.setItem("original_language", original_language)

        var vote_average = res['body']['vote_average']
        console.log(vote_average)
        sessionStorage.setItem("vote_average", vote_average)

        var popularity = res['body']['popularity']
        console.log(popularity)
        sessionStorage.setItem("popularity", popularity)

        window.location.href="result-movie.html";
        // var images = JSON.parse(res['body'])
        // $('#x-grid-div').empty();
        // if (images.length > 0){
        //   if (images[0] == 'Failed to understand text input') {
        //     $('#x-result-txt').text(images[0]);
        //   } else {
        //     $('#x-result-txt').text('Search results for ' + queryString);
        //   }
        // }
        // else {
        //   $('#x-result-txt').text('No results found');
        // }
        
        // $('#x-hrule').css('display', 'block');
        // if (images[0] != 'Failed to understand text input') {
        //   for (var i = 0; i < images.length; i++) {
        //     imgUrl = images[i];
        //     $('#x-grid-div').append('<a href="'+imgUrl+'" target="_blank"><img src="'+imgUrl+'" alt="" class="img-thumbnail img-style m-2"></a>');
        //   }
        // }
        
      }
   });
  });


  // File Upload
  $("#file-input").on('change', function(e) {
    var uploadedfile = $("#file-input")[0].files[0];
    uploadedfile.src = URL.createObjectURL(uploadedfile);
    console.log(uploadedfile.src)
    
    newElement = "<img class='img-fluid w-100' src='" + uploadedfile.src + "'>" ;
    $("#imageCol").prepend(newElement);

    console.log(newElement); 
  });


  $("#file-upload").on('click', function(event) {
    event.preventDefault();
    $("#loader").css("display", "block");

    var file = $("#file-input")[0].files[0];
    var fileName = file.name;
    var fileType = file.type;
	
    console.log(file);
    console.log(fileName);
    console.log(fileType);

    // uploadFile(file).then(
    //   data => console.log(data)
    // );

    var formData = new FormData();
    formData.append('file', $('#file-input')[0].files[0]);

    $.ajax({
      url: "https://cwm62dylg9.execute-api.us-west-2.amazonaws.com/v1/detect",
      type: "PUT",
      data: file,
      processData: false,
      cache: false,
      dataType: 'html',
      crossDomain: true,
      beforeSend: function(xhr){
        $('#x-success-msg').text('');
        xhr.setRequestHeader('Content-Type', fileType);
        xhr.setRequestHeader('x-api-key', '***');
      },
      error: function(res) {console.log(res)},
      success: function(res) {
        console.log(res);
        $("#loader").css("display", "none");
        $('#x-success-msg').text('File uploaded successfully!');

        // Actor-info
        var body = JSON.parse(res)['body']['actor_info']
        var name = body['name']
        console.log(name)
        sessionStorage.setItem("name", name)

        var biography = body['biography']
        console.log(biography)
        sessionStorage.setItem("biography", biography)

        var profile_path = body['profile_path']
        console.log(profile_path)
        sessionStorage.setItem("profile_path", profile_path)

        var birthday = body['birthday']
        console.log(birthday)
        sessionStorage.setItem("birthday", birthday)

        var place_of_birth = body['place_of_birth']
        sessionStorage.setItem("place_of_birth", place_of_birth)
        console.log(place_of_birth)
        
        var deathday = body['deathday']
        console.log(deathday)
        sessionStorage.setItem("deathday", deathday)

        var popularity = body['popularity']
        console.log(popularity)
        sessionStorage.setItem("popularity-a", popularity)



        // Movie-info
        var body = JSON.parse(res)['body']['movie_info']
        var other = JSON.parse(res)['body']['other_possible_movie_title'][0]
        console.log(other)
        sessionStorage.setItem("other", other)

        var movie_title = body['original_title']
        console.log(movie_title)
        sessionStorage.setItem("movie_title", movie_title)

        var overview = body['overview']
        console.log(overview)
        sessionStorage.setItem("overview", overview)

        var poster_path = body['poster_path']
        console.log(poster_path)
        sessionStorage.setItem("poster_path", poster_path)

        var release_date = body['release_date']
        console.log(release_date)
        sessionStorage.setItem("release_date", release_date)

        var original_language = body['original_language']
        sessionStorage.setItem("original_language", original_language)
        console.log(original_language)
        
        var vote_average = body['vote_average']
        console.log(vote_average)
        sessionStorage.setItem("vote_average", vote_average)

        var popularity = body['popularity']
        console.log(popularity)
        sessionStorage.setItem("popularity", popularity)

        window.location.href="result-actor-movie.html";
      }
    });


    $("#imageCol").html("");
  });

  /******************for base 64 *****************************/
  function uploadFile(file) {
    // var reader = new FileReader();
    // reader.onloadend = function() {
    //   console.log('Encoded Base 64 File String:\n', reader.result);
    //   b64 = reader.result;
    // }
    // reader.readAsDataURL(file);
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result);
      reader.onerror = error => reject(error);
    });
  }

  function loadPhoto(json_str) {
    var results = json_str["results"];
    for (var i = 0; i < results.length; i++){
      var obj = results[i];
      var photoSrc = obj["url"];
      var labels = obj["labels"];
      if(photoSrc != null){
        var newElement = 
          "<img class='img-fluid w-100' src='" + photoSrc + "' alt='Failed to open image: " + photoSrc + "'>" 
        $("#imageCol").prepend(newElement);
      }
    }
  }


});
