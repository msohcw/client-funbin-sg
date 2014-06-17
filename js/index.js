var firstPosition = 0;
var framePosition = 0;
var navPagePosition = 0;
var frameHeights = [0];
var navPageHeights = []
var navPageMidHeights = []

function left(e){
	if($(window).scrollTop()!=0) return;
	switch (firstPosition){
		case 0:
			showBackground();
			break;
		case 1:
			showHeader();
			break;
		case -1:
			break;
	}
}

function right(e){
	if($(window).scrollTop()!=0) return;
	switch (firstPosition){
		case 0:
			showFAQ();
			break;
		case 1:
			break;
		case -1:
			showHeader();
			break;
	}
}

function down(e){
	e.preventDefault();
	if(framePosition == frameHeights.length - 1) return;
	$(document).scrollTo(frameHeights[framePosition+1], { "axis" : "y", "duration":500, "onAfter":updatePosition})
	// console.log("hullo")
}

function up(e) {
	e.preventDefault();
	if(framePosition == 0) return;
	$(document).scrollTo(frameHeights[framePosition-1], { "axis" : "y", "duration":500, "onAfter":updatePosition})
}

function showHeader(){
	$("#first").css("margin-left", "-50%");
	$("#header").css("opacity", "1");
	$("#header").css("z-index","0");
	$("#nav").css("z-index","1");
	$("#nav").css("opacity", "1");
	$("#nav").css("left", "50%");
	firstPosition = 0;
	$(".page").css("display","block")
}

function hideHeader(){
	$("#header").css("opacity", "0.5");
	$("#nav").css("opacity", "0.5");
	$("#header").css("z-index","-2");
	$("#nav").css("z-index","-1");
	$(".page").css("display","none")
}

function showBackground(){
	$("#first").css("margin-left", "0");
	$("#nav").css("left", "100%");
	hideHeader();
	firstPosition = -1;
}

function showFAQ(){
	$("#first").css("margin-left", "-150%");
	$("#nav").css("left", "-50%");
	hideHeader();
	firstPosition = 1;
}

var youtubeVideo;

function onYouTubeIframeAPIReady() {
  youtubeVideo = new YT.Player('youtube-video');
}

function updatePosition(){
	var position = $(window).scrollTop() + 1; //+1 account for rounding

	for(var i = 1 ; l = frameHeights.length, i < l; ++i){
		if(position == frameHeights[i]){
			framePosition = i;
			break;
		}
		if(position <= frameHeights[i]){
			framePosition = i-1;
			break;
		}
		framePosition = frameHeights.length-1;
	}

	for(var i = 0; i<navPageHeights.length; ++i){
		if(position == navPageHeights[i]){
			navPagePosition = i;
			break;
		}else if(position <= navPageHeights[i]){
			navPagePosition = i-1;
			break;
		}else{
			navPagePosition = navPageHeights.length-1;
		}
		console.log (i + " " + (position <= navPageHeights[i]))
	}	
	if(navPagePosition == 0){
		$(".nav-btn").css("opacity",1);
	}else{
		$(".nav-btn").eq(navPagePosition).css("opacity",1);
		$(".nav-btn").not(":eq("+navPagePosition+")").css("opacity",0.5);
	}
}

$(document).ready(function(){
	$(".page").each(function(i){
		frameHeights.push($(this).offset().top);
	});
	$(".nav-page").each(function(i){
		navPageHeights.push($(this).offset().top);
	});
	
	for(var i = 0; i < navPageHeights.length-1; ++i){
		navPageMidHeights[i] = (navPageHeights[i] + navPageHeights[i+1])/2;
	}

	navPageMidHeights[navPageHeights.length-1] = navPageHeights[navPageHeights.length-1];

	$("#background-btn").click(function(){
		showBackground();
	})
	
	$("#background-close-btn").click(function(){
		showHeader();
	})
	
	$("#faq-close-btn").click(function(){
		showHeader();
	})

	$("#faq-btn").click(function(){
		showFAQ();
	})

	$("#bin-bottom").hover(
		function(){
			$("#bin-bottom-img").attr("src","img/bin_bottom_hover.png")
			$("#video-btn-text").css("text-shadow", "none")
			$("#video-btn-text").css("margin-top", "calc(-1.8em + 2px)")
		},
		function(){
			$("#bin-bottom-img").attr("src","img/bin_bottom.png")
			$("#video-btn-text").css("text-shadow", "0 2px #ccc")
			$("#video-btn-text").css("margin-top", "-1.8em")
		}
	);

	$("#bin-bottom").click(function(){
		$("#video-popup").fadeIn();
	})

	$("#video-popup-close-btn").click(function(){
		$("#video-popup").fadeOut();
		youtubeVideo.pauseVideo();
	})

	$("#home-btn").click(function(){
		$(document).scrollTo("#first",{ "axis" : "y", "duration":500, "onAfter":updatePosition});
	});
	$("#challenge-btn").click(function(){
		$(document).scrollTo("#challenge",{ "axis" : "y", "duration":500, "onAfter":updatePosition});
	});
	$("#how-to-enter-btn").click(function(){
		$(document).scrollTo("#howtoenter",{ "axis" : "y", "duration":500, "onAfter":updatePosition});
	});
	$("#contact-btn").click(function(){
		$(document).scrollTo("#contactus",{ "axis" : "y", "duration":500, "onAfter":updatePosition});
	});
	$("#sponsors-btn").click(function(){
		$(document).scrollTo("#sponsors",{ "axis" : "y", "duration":500, "onAfter":updatePosition});
	});

	$(document).keydown(function(e){
		console.log(e.keyCode)
		switch(e.keyCode){
			case 38:
				up(e);
				break;
			case 37:
				left(e);
				break;
			case 40:
				down(e);
				break;
			case 39:
				right(e);
				break;
		}
	});

	$(document).scroll(function(e){
		updatePosition();		
		$(".nav-btn img").hover(
			function(){
				$(this).parent().css("opacity",1)
			}
			,
			function(){
				if($(this).parent().index()!=navPagePosition && navPagePosition != 0) $(this).parent().css("opacity",0.5);
			}
		)
	})

	$("#first").mousewheel(function(e){
		console.log(e.deltaX)
		if(e.deltaX!=0) e.preventDefault();
	})
});