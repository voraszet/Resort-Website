$(function(){
	//$.getJSON('resorts.json', function(data){

		menu();
		datePickerFrom();
		datePickerTo();
		pricePicker();
		

		$("#search").on("click",function(){
		//$('input').keypress(function(){

		//Search box input	
		var search = $("input:text").val();
		var searchLength = search.length;
		//Destination menu
		var selectMenu = $("#destination option:selected").val();
		//Radio buttons for COMFORT LEVEL
		var comfortLev = $("input[name='comfortLevel']:checked").val();
		//Checkboxes for activities
		var activitySearch = $("input[name='activity']:checked").map(function(){
	            return this.value;
	        }).get();
		var needToMatch = activitySearch.length;


		//VARIABLES FOR PRICES $$$$
		var str = $('#amount').val();
		var lowPrice = str.substring(1 , 5);
		var highPrice = str.substring(8 , 13);

		if(lowPrice >= 1000){
			highPrice = str.substring(9, 13);
		}
		// $$$$$$$$
		//DATE PICKER FROM & TO
		var dateFrom = $("input[name='dateFrom']:text").val();
		var dateTo = $("input[name='dateTo']:text").val();
		// VARIABLE FOR OUTPUTING THE RESULTS, STARTING WITH <UL>
		var output = "<ul>";
		
		// IF THE DATE IS NOT 0, THEN SLIDE DOWN TO RESORT RESULTS	
			if(dateTo.length > 0 && dateFrom.length > 0){
				$('html,body').animate({
		        scrollTop: $(".resorts").offset().top},
		        1000);
			}

		// LOOP START OF READING THROUGH JSON
		for(var i in data.resorts){
			//IF DATE IS NOT ENTERED, CHANGE THE BORDER COLOUR
			//*****************************
			if(dateFrom.length == 0){
				$('#datepickerFrom').attr('style', "border:#F28383 3px solid;");									
			} else{
				$('#datepickerFrom').attr('style', "");

			}

			if(dateTo.length == 0){
				$('#datepickerTo').attr('style', "border:#F28383 3px solid;");
			} else{
				$('#datepickerTo').attr('style', "");
			}
			//*****************************

			//IF DESTINATION IS SELECTED
			if(selectMenu.length > 0){
				needToMatch = activitySearch.length;
					//VALIDATION FOR DESTINATION, COMFORT LEVEL, PRICE AND DATES
					if((selectMenu == data.resorts[i].destination && comfortLev == "Any") && (lowPrice <= data.resorts[i].price && highPrice >= data.resorts[i].price) && (new Date(dateFrom).getTime() >= new Date(data.resorts[i].startDate).getTime() && new Date(dateTo).getTime() <= new Date(data.resorts[i].endDate).getTime() && dateFrom < dateTo)){
						
						//OUTPUTING THE RESORT RESULTS WITH IMAGE, SHORT-DESCRIPTION AND PRICE. ALSO THE LINK TO CORRESPONDING RESORT PAGE
						if(needToMatch == 0){
									output+= '<div class="resorts-result">';
									output+= '<span class="resorts-image">' +'<img src="' +data.resorts[i].picture +'"</img>'+'</span>'+"</li>";
									output+="<li>" + data.resorts[i].short_description +"</li>";
									output+="<li>" + '<span class="resorts-price">'+"£"+ data.resorts[i].price+ '</span>' +"</li>";
									output+="<li>" + '<span id="resorts-link">'+'<a href="'+data.resorts[i].url+ '">READ MORE</a>'+'</span>'+ "</li>";
									output+= '</div>';	
						}		
								//ALGORITHM FOR FILTERING THE ACTIVITIES
								else{
									for(var j in data.resorts[i].activities){
										for(var k in activitySearch){
											if(activitySearch[k] == data.resorts[i].activities[j]){
												needToMatch--;
											}
										}
									}
									//OUTPUTING THE RESORT RESULTS WITH IMAGE, SHORT-DESCRIPTION AND PRICE. ALSO THE LINK TO CORRESPONDING RESORT PAGE
									if( needToMatch == 0){
									output+= '<div class="resorts-result">';
									output+= '<span class="resorts-image">' +'<img src="' +data.resorts[i].picture +'"</img>'+'</span>'+"</li>";
									output+="<li>" + data.resorts[i].short_description +"</li>";
									output+="<li>" + '<span class="resorts-price">'+"£"+ data.resorts[i].price+ '</span>' +"</li>";
									output+="<li>" + '<span id="resorts-link">'+'<a href="'+data.resorts[i].url+ '">READ MORE</a>'+'</span>'+ "</li>";
									output+= '</div>';									}	
								}						
					} 

					else if((selectMenu == data.resorts[i].destination && comfortLev == data.resorts[i].comfortLevel) && (lowPrice <= data.resorts[i].price && highPrice >= data.resorts[i].price) && (new Date(dateFrom).getTime() >= new Date(data.resorts[i].startDate).getTime() && new Date(dateTo).getTime() <= new Date(data.resorts[i].endDate).getTime() && dateFrom < dateTo)){
						//OUTPUTING THE RESORT RESULTS WITH IMAGE, SHORT-DESCRIPTION AND PRICE. ALSO THE LINK TO CORRESPONDING RESORT PAGE
						if(needToMatch == 0){
									output+= '<div class="resorts-result">';
									output+= '<span class="resorts-image">' +'<img src="' +data.resorts[i].picture +'"</img>'+'</span>'+"</li>";
									output+="<li>" + data.resorts[i].short_description +"</li>";
									output+="<li>" + '<span class="resorts-price">'+"£"+ data.resorts[i].price+ '</span>' +"</li>";
									output+="<li>" + '<span id="resorts-link">'+'<a href="'+data.resorts[i].url+ '">READ MORE</a>'+'</span>'+ "</li>";
									output+= '</div>';	
						}	
								else{
									for(var j in data.resorts[i].activities){
										for(var k in activitySearch){
											if(activitySearch[k] == data.resorts[i].activities[j]){
												needToMatch--;
											}
										}
									}
									//OUTPUTING THE RESORT RESULTS WITH IMAGE, SHORT-DESCRIPTION AND PRICE. ALSO THE LINK TO CORRESPONDING RESORT PAGE
									if( needToMatch == 0){
									output+= '<div class="resorts-result">';
									output+= '<span class="resorts-image">' +'<img src="' +data.resorts[i].picture +'"</img>'+'</span>'+"</li>";
									output+="<li>" + data.resorts[i].short_description +"</li>";
									output+="<li>" + '<span class="resorts-price">'+"£"+ data.resorts[i].price+ '</span>' +"</li>";
									output+="<li>" + '<span id="resorts-link">'+'<a href="'+data.resorts[i].url+ '">READ MORE</a>'+'</span>'+ "</li>";
									output+= '</div>';	
									}	
								}
					} 

			} else {
			//VALIDATION FOR DESTINATION, COMFORT LEVEL, PRICE AND DATES
			if((comfortLev == data.resorts[i].comfortLevel || comfortLev == "Any") && 
				(lowPrice <= data.resorts[i].price && highPrice >= data.resorts[i].price) && 
				(new Date(dateFrom).getTime() >= new Date(data.resorts[i].startDate).getTime() && new Date(dateTo).getTime() <= new Date(data.resorts[i].endDate).getTime() && dateFrom < dateTo)){
				needToMatch = activitySearch.length;

				//ACTIVITY SEARCH
				if(needToMatch == 0){
								//OUTPUTING THE RESORT RESULTS WITH IMAGE, SHORT-DESCRIPTION AND PRICE. ALSO THE LINK TO CORRESPONDING RESORT PAGE
									output+= '<div class="resorts-result">';
									output+= '<span class="resorts-image">' +'<img src="' +data.resorts[i].picture +'"</img>'+'</span>'+"</li>";
									output+="<li>" + data.resorts[i].short_description +"</li>";
									output+="<li>" + '<span class="resorts-price">'+"£"+ data.resorts[i].price+ '</span>' +"</li>";
									output+="<li>" + '<span id="resorts-link">'+'<a href="'+data.resorts[i].url+ '">READ MORE</a>'+'</span>'+ "</li>";
									output+= '</div>';	
				} else{
						for(var j in data.resorts[i].activities){
							for(var k in activitySearch){
								if(activitySearch[k] == data.resorts[i].activities[j]){
									needToMatch--;
								}
							}
						}
						if( needToMatch == 0){
							//OUTPUTING THE RESORT RESULTS WITH IMAGE, SHORT-DESCRIPTION AND PRICE. ALSO THE LINK TO CORRESPONDING RESORT PAGE
									output+= '<div class="resorts-result">';
									output+= '<span class="resorts-image">' +'<img src="' +data.resorts[i].picture +'"</img>'+'</span>'+"</li>";
									output+="<li>" + data.resorts[i].short_description +"</li>";
									output+="<li>" + '<span class="resorts-price">'+"£"+ data.resorts[i].price+ '</span>' +"</li>";
									output+="<li>" + '<span id="resorts-link">'+'<a href="'+data.resorts[i].url+ '">READ MORE</a>'+'</span>'+ "</li>";
									output+= '</div>';	
						}	
					}

				//search box
				}
			}
		// end of loop		
		}
		output+="</ul>";
		document.getElementById("resorts-result").innerHTML = output;
		});
	//});
});
//WIDGET FOR DESTINATIONS
function menu(){
	$('#destination').selectmenu().selectmenu("menuWidget");
};
//JQUERY DATE PICKER FROM
function datePickerFrom(){
	$( "#datepickerFrom" ).datepicker({ dateFormat: 'yy-mm-dd' });
};
//JQUERY DATE PICKER TO
function datePickerTo(){
	$( "#datepickerTo" ).datepicker({ dateFormat: 'yy-mm-dd' });
};
//PRICE PICKER FUNCTION
function pricePicker(){
			$( "#slider-range" ).slider({
			range: true,
			min: 120,
			max: 2100,
			values: [ 120, 2100 ],
			slide: function( event, ui ) {
				$( "#amount" ).val( "£" + ui.values[ 0 ] + " - £" + ui.values[ 1 ] );

			}
		});
		$( "#amount" ).val( "£" + $( "#slider-range" ).slider( "values", 0 )+
			" - £" + $( "#slider-range" ).slider( "values", 1 ) );
};

	//VIEW FAVOURITES FUNCTION
	$("#favourites").on("click", function(){
			console.log("Restoring array data from local storage.");

			myFavouriteResort = JSON.parse(localStorage.getItem("favResort"));
			var output = "<ul>";
			if(myFavouriteResort != null){
				//LOOPING THROUGH RESORT DATA
				for(var i=0; i < data.resorts.length; i++){
					for(var j=0; j<myFavouriteResort.length; j++){
						if( data.resorts[i].id == myFavouriteResort[j])
						{
							//OUTPUTING THE RESORT RESULTS WITH IMAGE, SHORT-DESCRIPTION AND PRICE. ALSO THE LINK TO CORRESPONDING RESORT PAGE
								output+= '<div class="resorts-result">';
								output+= '<span class="resorts-image">' +'<img src="' +data.resorts[i].picture +'"</img>'+'</span>'+"</li>";
								output+="<li>" + data.resorts[i].short_description +"</li>";
								output+="<li>" + '<span class="resorts-price">'+"£"+ data.resorts[i].price+ '</span>' +"</li>";
								output+="<li>" + '<span id="resorts-link">'+'<a href="'+data.resorts[i].url+ '">READ MORE</a>'+'</span>'+ "</li>";
								output+="<li>" + '<button id="delete" class="btn btn-danger" style="float:right; margin-right:10px;">Delete</button>' + "</li>";
								output+= '</div>';	

						}
					}
				}
			}
			//OUTPUTING THE FAVOURITES
			output+="</ul>";
			document.getElementById( "favourites-container" ).innerHTML = output;
	});

	


//SAVE TO FAVOURITES FUNCTION
$("#save").on("click", function() {
		try{
			$(this).attr('disabled', true);
			//restore the Array data

			var resortIdToAdd = $(this).closest("p").attr("id");

			var myFavouriteResort = JSON.parse(localStorage.getItem("favResort"));

			var newvaluelength = JSON.parse(localStorage.getItem("favResort"));

				if(myFavouriteResort == null){
					myFavouriteResort = [];

									
				} 
					myFavouriteResort.push(resortIdToAdd);
					localStorage.setItem("favResort", JSON.stringify(myFavouriteResort));
					
		}

		catch(e)
		{

				if(e == QUOTA_EXCEEDED_ERR) 
				{
					console.log("text here");
				} 
				else
				{
					console.log("text")
				}
		}
});

//CLEAR FUNCTION FAVOURITES FUNCTION
$("#clear").on("click", function(){
	localStorage.clear();
	$("#favourites").click();
});

$('body').on('click','#delete',function(){

   		var json = JSON.parse(localStorage["favResort"]);

		for (i=0;i<json.length;i++){
			var value = JSON.parse(localStorage.getItem("favResort"))[i];

            if (json[i] == value) {
            	json.splice(i,1);
				localStorage["favResort"] = JSON.stringify(json);
				console.log("deleted");
     		}
     	}

   $(this).closest("div").remove();
   
   if(json.length == 0){
   		localStorage.clear();
   		console.log("Cleared");
   }
});
//VIEW FAVOURITES FUNCTIONS
$("#favourites").click(function() {
	  $('html,body').animate({
	      scrollTop: $(".favourites").offset().top},
	      1200);
});

//ANIMATION TO SLIDE TOP AFTER FAVOURITES CLEARED
$("#clear").click(function() {
    $('html,body').animate({
        scrollTop: $(".container-full").offset().top},
        1000);
});


