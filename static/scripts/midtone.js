/* Variables */
var showAbout = false;
var curLogo = 0;
var cheatcode = "";
var totalProjects;
var projects = [];
var loadedProjects = [];
var pages = [];
var curProject = 0;
var curPage = 0;
var extLink;
var logoIsAnimate = false;
var logoIsMouseOver = false;
var recentHash = '';
var hashChange = false;
var mark = /\?/;

/* Settings */
var frLogo = 13;
var frRotate = 25;
var pathPrefix = "static/portfolio_";



/* Funcions */
function checkLogo(){
	checkHash();
	if(!logoIsAnimate && !showAbout){
		if(curLogo == 1 && !logoIsMouseOver){
			var obj = $("#logo em");
			obj.animate({backgroundPosition: "0 -26px"}, frLogo);
			obj.animate({backgroundPosition: "0 -22px"}, frLogo);
			obj.animate({backgroundPosition: "0 -18px"}, frLogo);
			obj.animate({backgroundPosition: "0 -14px"}, frLogo);
			obj.animate({backgroundPosition: "0 -8px"}, frLogo);
			obj.animate({backgroundPosition: "0 0px"}, frLogo);
			curLogo = 0;		
		}else if(curLogo == 0 && logoIsMouseOver){
			var obj = $("#logo em");
			obj.animate({backgroundPosition: "0 -3px"}, frLogo);	
			obj.animate({backgroundPosition: "0 -8px"}, frLogo);
			obj.animate({backgroundPosition: "0 -14px"}, frLogo);			
			obj.animate({backgroundPosition: "0 -18px"}, frLogo);
			obj.animate({backgroundPosition: "0 -22px"}, frLogo);
			obj.animate({backgroundPosition: "0 -26px"}, frLogo);
			curLogo = 1;
		}
	}
}

function checkCode(){
	if (cheatcode == "login"){
		window.location.href = 'http://appengine.google.com/dashboard?&app_id=midtonedesign';
	}else{

	}
	cheatcode = "";
}


function switchLogo(x){
	logoIsAnimate = true;
	if (x == 0 && curLogo == 0){
		var obj = $("#logo em");
		obj.animate({backgroundPosition: "0 -3px"}, frLogo);	
		obj.animate({backgroundPosition: "0 -8px"}, frLogo);
		obj.animate({backgroundPosition: "0 -14px"}, frLogo);			
		obj.animate({backgroundPosition: "0 -18px"}, frLogo);
		obj.animate({backgroundPosition: "0 -22px"}, frLogo);
		obj.animate({backgroundPosition: "0 -26px"}, frLogo);
		curLogo = 1;
		setTimeout(function(){
			logoIsAnimate = false;
		},100);
	}else if (x == 1 && curLogo == 1){
		var obj = $("#logo em");
		obj.animate({backgroundPosition: "0 -26px"}, frLogo);
		obj.animate({backgroundPosition: "0 -22px"}, frLogo);
		obj.animate({backgroundPosition: "0 -18px"}, frLogo);
		obj.animate({backgroundPosition: "0 -14px"}, frLogo);
		obj.animate({backgroundPosition: "0 -8px"}, frLogo);
		obj.animate({backgroundPosition: "0 0px"}, frLogo);
		curLogo = 0;
		setTimeout(function(){
			logoIsAnimate = false;
		},100);
	}
};

function initProject(){
	$("#projects #pagination").hide();

	extLink = $("#projects #externalLink a:first").attr("href");
	extLinkTitle = $("#projects #externalLink a:first").attr("title");

	pages = [];
	$("#projects #pagination a").each(function(){
		var href = this.getAttribute('href');
		pages.push(href);
	})

	if (pages.length <= 1){
		$("#projects #pagination").fadeOut();
	}else{
		var width = (pages.length*20) + "px";
		$("#projects #pagination ul").animate({
			width:width
		},1);
		$("#projects #pagination").fadeIn("slow");
	}

	loadImgs();

	$("#projects #description").animate({
		opacity:1
	},{duration: 500, easing: "easeInOutQuint"}); 
	
	setTimeout(function(){
		$("#control a").animate({
			opacity:1,
			left:"48px"
		},{duration: 400, easing: "easeInOutQuint"});
		$("#project").attr("left","0px").animate({
			opacity:1,		
		},{duration: 300, easing: "easeInOutQuint"});
	},400);
	
	updateHash(curProject);
}

function switchImg(index){
	var position = index*512*-1;
	
	switchDot(index);
	$("#imgContainer").animate({
		opacity:0
	},{duration: 280, easing: "easeInOutQuint"}).animate({
		top:position
	},1);
	setTimeout(function(){
		$("#imgContainer").animate({
			opacity:1
		},{duration: 500, easing: "easeInOutQuint"}); 
	},300);
}

function switchDot(index){
	$("#projects #pagination a:not(:eq("+index+"))").animate({
		opacity:0,
	},{duration: 600, easing: "easeInOutQuint"});
	$("#projects #pagination li:not(:eq("+index+"))").animate({
		backgroundPosition: "0 0"
	},100);

	$("#projects #pagination a").eq(index).animate({
		opacity:1,
	},{duration: 800, easing: "easeInOutQuint"});

	$("#projects #pagination li").eq(index).animate({
		backgroundPosition: "0 -44px"
	},800);
	curPage = index;
}

function loadImgs(){
	if (loadedProjects[curProject] == "0"){
		$("#loader").fadeIn();
	}else{
		$("#loader").hide();
	}
	var loadCount = 1;

	for (i=0;i<pages.length;i++){
		var img = new Image();
		$(img).load(function() {
			$("#imgContainer").append(this);
			loadCount++;
			if(loadCount > pages.length){
				$("#imgContainer").animate({
					opacity:1,
				},{duration: 800, easing: "easeInOutQuint"});

				if (extLink){
					var html = $("#imgContainer").html();
					newHTML = '<a href="'+extLink+'" title="'+extLinkTitle+'" target="_self">'+html+'</a>';
					$("#imgContainer").html(newHTML);
				}
				loadedProjects[curProject] = 1;
				switchDot(0);
				setTimeout(function(){$("#loader").fadeOut();},800);
			}
		}).error(function () {
			// notify the user that the image could not be loaded
		}).attr('src', pages[i]);
	}
}

function checkHash() {
	if ((window.location.hash != recentHash)) {
		hashChange = true;
		recentHash = window.location.hash;
		var hash = window.location.hash;
		if(hash.match(mark)){
			var splitHash = hash.split(/\?/);
			var section = splitHash[0];
			var item = splitHash[1];
			//directTo(section, item);
			if(section == '#portfolio'){
				path = pathPrefix + item + '.html';
				var projectIndex = jQuery.inArray(path, projects);
				curProject = projectIndex;
				$("#projects").load(path,initProject);
			}
		}
	}else{
		hashChange = false;
	}
}

function updateHash(index){
	var path = projects[index];
	path = path.replace(/static\/portfolio_/,'');
	path = path.replace(/.html/,'');
	recentHash =  window.location.hash = '#portfolio?'+path;
}

function toggleLogo(byKey){
		var obj = $("#panelWrapper");
		var badge = $("#logo small");
		if (!showAbout){
			obj.animate({height:"111px"}, {duration: 400, easing: "easeInOutQuint"});
			badge.animate({backgroundPosition: "0 -20px"}, frRotate);
			badge.animate({backgroundPosition: "0 -40px"}, frRotate);
			badge.animate({backgroundPosition: "0 -60px"}, frRotate);
			badge.animate({backgroundPosition: "0 -80px"}, frRotate);
			badge.animate({backgroundPosition: "0 0px"}, frRotate);
			badge.animate({backgroundPosition: "0 -20px"}, frRotate);
			badge.animate({backgroundPosition: "0 -40px"}, frRotate);
			badge.animate({backgroundPosition: "0 -60px"}, frRotate);
			badge.animate({backgroundPosition: "0 -80px"}, frRotate);
			showAbout = true;
			if (byKey){
				switchLogo(0);
			}
		}else{		
			obj.animate({height:"0px"}, {duration: 400, easing: "easeInOutQuint"});
			badge.animate({backgroundPosition: "0 -80px"}, frRotate);
			badge.animate({backgroundPosition: "0 -60px"}, frRotate);
			badge.animate({backgroundPosition: "0 -40px"}, frRotate);
			badge.animate({backgroundPosition: "0 -20px"}, frRotate);
			badge.animate({backgroundPosition: "0 0px"}, frRotate);
			badge.animate({backgroundPosition: "0 -80px"}, frRotate);
			badge.animate({backgroundPosition: "0 -60px"}, frRotate);
			badge.animate({backgroundPosition: "0 -40px"}, frRotate);
			badge.animate({backgroundPosition: "0 -20px"}, frRotate);
			badge.animate({backgroundPosition: "0 0px"}, frRotate);
			showAbout = false;
			if (byKey){
				switchLogo(1);
			}
		}
}
/* Keyboard Keys Bind */

// + key
$(document).bind('keydown', '+', function(){
	toggleLogo(true);
	return false;
});

// a key
$(document).bind('keydown', 'a', function(){
	toggleLogo(true);
	return false;
});

// left arrow - to next image
$(document).bind('keydown', 'down', function(){
	var totalPages = pages.length;
	if(totalPages > 1){
		var page = curPage + 1;
		if (page >= totalPages){page = 0;};
		$("#pagination a").eq(page).click();
	}
	return false;
});

// right arrow - to next project
$(document).bind('keydown', 'right', function(){
	$("#control a").click();
	return false;
});

$(document).bind('keydown', 'l', function (evt){cheatcode = cheatcode + "l";});
$(document).bind('keydown', 'o', function (evt){cheatcode = cheatcode + "o";});
$(document).bind('keydown', 'g', function (evt){cheatcode = cheatcode + "g";});
$(document).bind('keydown', 'i', function (evt){cheatcode = cheatcode + "i";});
$(document).bind('keydown', 'n', function (evt){cheatcode = cheatcode + "n";});
$(document).bind('keydown', 'return', function (evt){checkCode();});

/* Initialize */
$(document).ready(function(){
	Cufon.replace('#panel p', { fontFamily: 'NeoSans', hover: true});
	Cufon.replace('#panel li', { fontFamily: 'NeoSans Medium', hover: true});

	$("#projects .project").each(function(){
		var href = this.getAttribute('href');
		projects.push(href);
		loadedProjects.push("0");
	});

	checkHash();
	setInterval(checkLogo, 200);

	if (!hashChange){
		$("#projects").load(projects[0],initProject);
		$("#control a").attr("href", projects[1]);
	}
	
	$("#pagination a").live("click", function(){	
		switchImg($("#pagination a").index(this));
		return false;
	});
	
	$("#control a").click(function(){
		var nextProject = curProject+1;
		var nextHref = curProject+2;
		if (nextProject >= projects.length){
			nextProject = 0;
		}
		if (nextHref >= projects.length){
			nextHref = 0;
		}
		$("#project").animate({
			opacity:0
		},{duration: 380, easing: "easeInOutQuint"});
		$("#imgContainer").animate({
			left:"-80px"
		},{duration: 380, easing: "easeInOutQuint"});
		setTimeout(function(){
			$("#projects").load(projects[nextProject],initProject);
			$("#control a").attr("href", projects[nextHref]);
			curProject = nextProject;
		},300);
		return false;
	});
	
	$("#hitArea").mouseover(function(){
		logoIsMouseOver = true;
		/*if (!showAbout && !logoIsAnimate){switchLogo(0);}*/
	});
	$("#hitArea").mouseout(function(){
		logoIsMouseOver = false;
		/*if (!showAbout && !logoIsAnimate){switchLogo(1);}*/
	});

	$("#hitArea").click(function(byKey){
		toggleLogo(false);
		return false;
	});
});