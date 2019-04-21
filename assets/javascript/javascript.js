//Add functionality to button and Search
//Tie search into button, create button from search.
//var queryURL = "https://api.giphy.com/v1/gifs/search?api_key=dc6zaTOxFJmzC&rating=g&limit=20&q=";
var userSearch = "";
var userHistory = ["Persona 5", "The Good, The Bad, And the Ugly", "The Last Of Us"];

//Funcition makes buttons when you press search button
    function makeButtons() {
        //Clears div to not make button duplicates!
        $(".button-div").empty()
        //Creates as many buttons as are in list
        for (i=0;i<userHistory.length;i++){
            var button = $("<button>")
            button.addClass("gif");
            //Adds text and an attribute (So we can use it for searching later)
            button.attr("data-name", userHistory[i])
            button.text(userHistory[i])
            //I don't know what this line of code does, but i'm removing it because it doesn't seem to have an affect.
            //button.append(button)
            //Appends button to the div
            $(".button-div").append(button)
        }
    }

//This function will load the images into the gif space! once the button is clicked.
function buttonPress(){
    //pulls the movie title from the button
   var oldTerm = $(this).attr("data-name")
   //Creates a URL to search with by combining the search term and the query url.
   var queryURL = "https://api.giphy.com/v1/gifs/search?q=" +
   oldTerm + "&api_key=dc6zaTOxFJmzC&limit=25&rating=g";
        //alert(oldTerm)
        //Emptys the gif div so we can put different gifs in it.
        $(".gif-div").empty();
        //alert("Button Clicked " + this.val())
        //console.log("Clicked")
        //Does the search
        $.ajax({
            url : queryURL,
            //url: searchURL,
            method: "GET"
        }).then(function(resp){
            //Logs the results so we can use it in the for loop.
            var results = resp.data;
            //These alerts just let us know how many we should expect.
            console.log("Starting to grab data!")
            console.log(results.length);
            console.log(results)
            for (var bc = 0; bc<results.length; bc++){
            console.log("Image " + bc + " is go!")
            var gameGif = $("<img>")
            var srcLive = resp.data[bc].images.original.url;
            var srcStill = resp.data[bc].images.original_still.url;
            console.log(srcLive);
            console.log(srcStill);
            gameGif.attr("src",srcStill);
            gameGif.attr("live", srcLive);
            gameGif.attr("still", srcStill);
            gameGif.attr("moving", "false")
            gameGif.addClass("coolGif")
            //var gameGif = $("<img src='" + resp.data.images.original_still.url + "' gif-still='" + resp.data.images.original_still.url + "' gif-moving='" + resp.data.images.original.url + "'");
            $(".gif-div").append(gameGif);
            }
        }) 
}
    

    //Creates button and searches on search click
    $("#search-button").on("click", function(){
        event.preventDefault();
        var searchTerm = $("#user-search").val().trim();
        var queryURL = "https://api.giphy.com/v1/gifs/search?q=" +
        searchTerm + "&api_key=dc6zaTOxFJmzC&limit=25&rating=g";

        //Adds the search term into the array.
        userHistory.push(searchTerm);
        $.ajax({
            url:queryURL,
            method: "GET"
        }).then(function(resp){

        })

        //Should work when the button is clicked now.
       

        makeButtons();  
    })
    //Changes the gif to moving or vice versa
    function gifPress(){
        if ($(this).attr('moving') === 'false'){
            $(this).attr("src", $(this).attr("live"));
            $(this).attr('moving', 'true');
            console.log($(this).attr('moving'));
        }else{
            $(this).attr("src", $(this).attr("still"));
            $(this).attr('moving', 'false'); 
        }
    }


    //Changes button Source on click to moving or not
    $(document).on("click", ".coolGif", gifPress)

     $(document).on("click", ".gif", buttonPress)
     $(document).ready(function(){
         makeButtons()
        
        
        })