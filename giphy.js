var topics = ["house stark", "jon snow", "hodor", "tyrion", "khal drogo", "white walker", "dracarys"];

function renderButtons() {
    $("#view").empty();



    for (var i = 0; i < topics.length; i++) {
        var buttons = $("<button>");
        buttons.addClass("topic btn btn-dark");
        buttons.attr("data-name", topics[i]);
        buttons.text(topics[i]);
        $("#view").append(buttons);
    }
};


renderButtons();


$("#view").on("click", ".topic", function () {
    var gotTopics = $(this).attr("data-name");
    //alert(gotTopics);
    console.log(gotTopics);
    var queryURL = "https://api.giphy.com/v1/gifs/search?q=" + gotTopics + "&api_key=65U8N8EE24ym6H6VHu7Zx3KIsSho8gpr&limit=10";

    $.ajax({
            url: queryURL,
            method: "GET"
        })

        .then(function (response) {
            var results = response.data;

        console.log(queryURL);
            
        console.log(response);
            
        for (var i = 0; i < results.length; i++) {
               
                var gifDiv = $("<div>");
                
                var rating = results[i].rating;
                console.log(rating);
                
                var p = $("<p>").text("Rating: " + rating);
                
                var gotImages = $("<img>");
                
                gotImages.attr("src", results[i].images.fixed_height.url);
                
                gotImages.attr("alt", "got image");
                
                gifDiv.append(p);
                
                gifDiv.append(gotImages);
                
                $("#images-here").prepend(gifDiv);

            };


        });
});

$("#add-gif").on("click", function(event) {
        event.preventDefault();
        // This line grabs the input from the textbox
        var newGifButton = $("#gif-input").val().trim();

        // Adding movie from the textbox to our array
        topics.push(newGifButton);

        // Calling renderButtons which handles the processing of our movie array
        renderButtons();
      });

