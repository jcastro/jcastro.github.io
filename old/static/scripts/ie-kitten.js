

$(document).ready(function(){
	$("#messageBox a").mouseover(function(){
		$("#kitten").animate({
			backgroundPosition: "0 -243px"
		},10);
	});
	$("#messageBox a").mouseout(function(){
		$("#kitten").animate({
			backgroundPosition: "0 0"
		},10);
	});
});