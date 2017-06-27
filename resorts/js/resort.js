$(function() {
	//CALLING THE FUNCTIONS
	slider();
	tabs();
});
// LIGHT SLIDER IMAGE PLUGIN WITH ITS QUERIES
function slider(){
	    $("#lightSlider").lightSlider({
		    	    gallery: true,
				    item: 1,
				    loop: true,
				    slideMargin: 0,			    
				    thumbItem: 7
		});
};

//JQUERY TABS
function tabs(){
	$("#tabs").tabs();
}




