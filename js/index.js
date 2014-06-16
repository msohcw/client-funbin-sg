var firstPosition = 0;
var framePosition = 0;
var navPagePosition = 0;
var frameHeights = [0];
var navPageHeights = []
var navPageMidHeights = []

function left(e){
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
	if(framePosition == frameHeights.length) return;
	framePosition++;
	$(document).scrollTo(frameHeights[framePosition], { "axis" : "y", "duration":500})
	// console.log("hullo")
}

function up(e) {
	e.preventDefault();
	if(framePosition == frameHeights.length) return;
	framePosition--;
	$(document).scrollTo(frameHeights[framePosition], { "axis" : "y", "duration":500})
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

	$(document).keydown(function(e){
		// console.log(e.keyCode)
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

	$(document).scroll(function(){
		var position = $(window).scrollTop();
		// console.log(position)
		for(var i = 0; i<frameHeights.length; ++i){
			if(position <= frameHeights[i]){
				if(framePosition != i){
					framePosition = i;
				}
				break;
			}

		}
		for(var i = 0; i<navPageHeights.length; ++i){
			if(position <= navPageMidHeights[i]){
				if(navPagePosition != i){
					navPagePosition = i;
					if(i == 0){
						$(".nav-btn").css("opacity",1);
					}else{
						$(".nav-btn").eq(i).css("opacity",1);
						$(".nav-btn").not(":eq("+i+")").css("opacity",0.5);
					}
				}
				break;
			}
		}	
	})
});