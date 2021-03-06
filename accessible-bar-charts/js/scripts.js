var retextarea = function(elm) {
	var code = $(".bar-chart").clone();  		
	$('b[contenteditable]', code).contents().unwrap(); 
 	$('.delete', code).remove();
	elm.text("<div class='bar-chart'>" + code.html() + "</div>");  
	return elm;
};             

var barvals = [];
$('.bar-chart dl dd').each(function(){
	 barvals.push({ val: $(this).text(), index: $(this).parent().index() });
});                     

$("body").append(retextarea($('textarea')));
  
var comparevals = function(a, b) {
	return b.val - a.val;
};  

barvals.sort(comparevals); 
var numrows = barvals.length;

$("#addbar").click(function() {            
		if($(".bar-chart dl").length < numrows) {
     	$("<dl class=ratio-0><dt><b contenteditable=true>what it is</b><b class='delete'></b></dt><dd><b contenteditable=true>0</b></dd></dl>").appendTo(".bar-chart"); 
			barvals.push({val: "0", index: $('.bar-chart dl').last().index()}); 		
		} 
		return false; 
});	

$(".bar-chart dl dt").append($('<b/>').addClass("delete").text(""));

$(".bar-chart").delegate("b.delete", "click", function() { 
		var val = $(this).parent().next().text(), breakkey;   
		for(var key in barvals) {
			 if(barvals[key].val == +val) {
				breakkey = key;
				break;
			}
		}                  			
		barvals.splice(breakkey, 1); 
		$.each(barvals, function(){ --this.index;});
		$(this).parents("dl").empty().remove();
		retextarea($("textarea"));	 
}); 

$(".bar-chart").delegate("dd b[contenteditable]", "focusout", function() {   
	 var changedval = $(this).text().replace(/(\n)+/g); 
	 $(this).html(changedval);                                   
	 if(parseInt(changedval)  >= 0) {
			var changedindex = $(this).parents("dl").index(), barvalindex;                    
			for(var key in barvals) {
				if(barvals[key].index == changedindex) {
					barvalindex = key;   
					break;
				}
			}                                  
			barvals[barvalindex].val = +changedval;                                	
			 if(+changedval < barvals[0].val) {    
				 $(this).parents("dl").removeClass().addClass("ratio-" + 
				Math.round((+changedval / barvals[0].val)*10));
			} else {   
				 barvals.sort(comparevals);                                  
				$(".bar-chart dl").each(function() {				$(this).removeClass().addClass("ratio-"+Math.round((+$(this).children("dd").text() / barvals[0].val)*10));
				});
			} 
			retextarea($("textarea"));  
	}
});
$(".bar-chart").delegate("dt b[contenteditable], p b[contenteditable]", "blur", function() { retextarea($("textarea")); });