/// this are the globar variable for the application
var rockBand = ['radiohead', 'pearl jam', 'arctic monkeys', 'foo fighters', 'kiss', 'modest mouse', 'los campsesinos', 'rancid', 'nirvana', 'red hot chilli peppers'];
var currentGif; 
var pausedGif; 
var animatedGif; 
var stillGif;

//creates buttons for the rock band variable that i just create
function createButtons(){

	$('#display-button').empty();
	for(var i = 0; i < rockBand.length; i++){
    var bandBtn = $('<button>');
    bandBtn.text(rockBand[i])
    bandBtn.addClass('bandBtn')
    bandBtn.attr({'data-name': rockBand[i]});
	$('#display-button').append(bandBtn);
	}

	//displays gifs on click
	$('.bandBtn').on('click', function(){
		
		//this is to clean the gif from before
		$('.display').empty();


		//this is the url that I am using and the ajax code
		var band = $(this).data('name');
		var queryURL = "https://api.giphy.com/v1/gifs/search?q=bands+" + band + "&limit=10&api_key=OIjRqeBpfxjxOTpHhJXep8iw018fZHQy";
        $.ajax({url: queryURL, 
            method: 'GET'})
            .then(function(response){
             
			//the current GIF is the one that the query is send it to me in the aplicationn
			currentGif = response.data;
			$.each(currentGif, function(index,value){

			//for each of the GIF the the api is sending me it have a index and a value
				animatedGif = value.images.original.url;
                pausedGif = value.images.original_still.url;
				
			//this is the rating that the api is give me 
				var thisRating = value.rating;
				
				if(thisRating == ''){
					thisRating = 'unrated';
				}
                var rating = $('<p>').html('Rated: '+thisRating);
                rating.addClass('ratingStyle');
                
                stillGif = $('<img>');
                stillGif.attr('data-animated', animatedGif);
                stillGif.attr('data-paused', pausedGif);
                stillGif.attr('src', pausedGif);
                stillGif.addClass('playOnHover');
                
				var fullGifDisplay = $('<button>').append(rating, stillGif);
				$('.display').append(fullGifDisplay);
			});
		});
	});
}

// this is the animates and pauses gif on hover 
$(document).on('mouseover','.playOnHover', function(){
 	   	$(this).attr('src', $(this).data('animated'));
 });
 $(document).on('mouseleave','.playOnHover', function(){
 	   	$(this).attr('src', $(this).data('paused'));
 });

//this is when i create a new button in the aplication
$('#addBand').on('click', function(){
	event.preventDefault();
	var newBand = $('#newBandInput').val().trim();	
	rockBand.push(newBand);
	createButtons();
	return false;
});

createButtons();




