(function($) {
    
    $.fn.weemarquee = function(settings) {
        var config = {        
            interval: 20, 
            fade: true, 
            width: 600, 
            skin: 'wm-base' 
        };
        
        if (settings) $.extend(config, settings);
        
                                               
        if(config.fade) { 
           // Add the necessary Classname for styling                      
          $(this).wrap("<div class='wm-fade " + config.skin + "'><div class='wm-mom'/></div>");  
          $(this).parent().prepend("<b/><i/>");
        } else {
          $(this).wrap("<div class='wm-mom "+ config.skin + "'/>");
        }
        
        $(this).removeClass("wm-mom").addClass("marquee").parent().css({width : config.width});
        
        this.each(function() {              
            var ticker = $(this);        
            
            var containerwidth = ticker.parent().outerWidth();                                
            var totalwidth = 0, leftvalue = 0, recursivemarquee;
            ticker.children().each(function() { 
                $(this).addClass("wm-el"); // As we dont know the kind of element that will be in it, we use this classname to style         
                totalwidth += $(this).outerWidth(true);  
                $(this).mouseenter(function(){
                   clearInterval(interval);
                });  
                
                $(this).mouseleave(function(){
                  interval = setInterval(recursivemarquee, 30);
                })
               
            });                                             
                                               
             
            if(totalwidth > containerwidth) { 
              // Decide if we need to duplicate content depending on whether the content is longer than the marquee viewport
              ticker.children().each(function() {
                  $(this).clone().appendTo(ticker);
              });   
              
              ticker.width(3*totalwidth);  
              
              recursivemarquee = function() {
                  leftvalue = parseInt(ticker.css('left'))? parseInt($(ticker).css('left')) : 0;
                  leftvalue = (leftvalue%totalwidth)-1;  // Neat way to count till the width of the content and reset it.                                                                                    
                  ticker.css({ left: leftvalue});  

              };
                            
            } else {    

              ticker.css({left: containerwidth});
              recursivemarquee = function() {
                leftvalue = parseInt(ticker.css('left')); // Looks ugly when it starts from the middle. 
                ((leftvalue < 0) && (Math.abs(leftvalue) > totalwidth))? leftvalue = containerwidth: --leftvalue; 
                ticker.css({ left: leftvalue});   
              };
            }
           
            var interval = setInterval( recursivemarquee, 30 );
        });      
        
        return this;
        
    };
    
})(jQuery);
