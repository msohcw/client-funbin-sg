$(document).ready(function(){
	$("#first").disablescroll({
		onlyWebkitSafe: true,
		disabledDirections: [0,0,1,1]
	});
	$("#first").mousewheel(function(e){
		if(e.deltaX != 0) e.preventDefault();
	});
	$("#background-btn").click(function(){
		showBackground();
	})
	
	$("#background-close-btn").click(function(){
		showHeader();
	})

	$("#faq-btn").click(function(){
		showFAQ();
	})


	$(document).keydown(function(e){
		switch(e.keyCode){
			case 37:
				left();
				break;
			case 39:
				right();
				break;
		}
	});
});

var firstPosition = 0;
var framePosition = 0;

function left(){
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

function right(){
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

function down(){
	
}

function up() {
	if (framePosition == 0) return;
	framePosition--
}

function showHeader(){
	$("#first").css("margin-left", "-50%");
	$("#header").css("opacity", "1");
	$("#nav").css("opacity", "1");
	$("#nav").css("left", "50%");
	firstPosition = 0;
}

function showBackground(){
	$("#first").css("margin-left", "0");
	$("#header").css("opacity", "0.5");
	$("#nav").css("opacity", "0.5");
	$("#nav").css("left", "100%");
	firstPosition = -1;
}

function showFAQ(){
	$("#first").css("margin-left", "-150%");
	$("#nav").css("left", "-50%");
	firstPosition = 1;
}