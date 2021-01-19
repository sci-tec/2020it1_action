/* There are 5 options the user can fill in thereselves:
    - width - set the width of the tooltip (px, %, em)
    - backgroundColor - set the color of the tooltip (rgb, hexadecimals)
    - color - set the color of the text of the tooltip (rgb, hexadecimals)
    - arrow -  if the tooltip should have a arrow, (bolean)
    - position - the position of the tooltip (top, right, bottom, left)
    - the content of the tooltip is a data attribute called 'data-tt'. if this is not set, then the tooltip will not appear.
 * ============================================================================ */

(function($) {
    $.fn.tooltip = function(options) {
        // If there are no options set, use the default settings
        var defaults = {
            position: "top",
            backgroundColor : "#222",
            color : "#fff"
        };

        var opt = $.extend({}, defaults, options);

        return this.each(function() {
            // Set the defaults that are needed for the tooltip
            var $obj = $(this);            
            var $dataAttr = $obj.attr('data-tt');
            
            if(!$dataAttr == "") {
                        
                $obj.addClass('tt');
                $obj.prepend(
                    '<div class="ttC">' + $dataAttr + '</div>'
                );

                var $tt = $obj.find('.ttC');

                if(!opt.width){
                    var $ttWidth = $tt.width();
                } else {
                    var $ttWidth = opt.width;
                }

                var $ttHeight = $tt.height();

                /* ARROW
                 * ============================================================================ */
                if(opt.arrow){
                    // Create a class for the arrow
                    $tt.append(
                        '<div class="arrow"></div>'
                    );

                    // Set the color of the arrow
                    var $ttA = $obj.find('.arrow');
                    $ttA.css({
                        "borderColor": opt.backgroundColor
                    });
                }

                /* TOOTLTIP STYLES
                 * ============================================================================ */
                // Apply styles to the tooltip elements
                $tt.css({
                    "width": $ttWidth,
                    "background": opt.backgroundColor,
                    "color": opt.color,
                });

                // Set the position of the tooltip (and set the right arrowclass)
                switch(opt.position) {
                    case ('top'):
                        $tt.css({
                            "top": "-50px",
                            "left": "50%",
                            "margin-left": -(parseInt($ttWidth) / 2) - 10 + "px"
                        });
                        if(opt.arrow){
                            $tt.find('.arrow').addClass('arrowD');
                        }
                        break;
                    case ('bottom'):
                        $tt.css({
                            "bottom": "-50px",
                            "left": "50%",
                            "margin-left": -(parseInt($ttWidth) / 2) - 10 + "px"
                        });
                        if(opt.arrow){
                            $tt.find('.arrow').addClass('arrowU');
                        }
                        break;
                    case ('left'):
                        $tt.css({
                            "top": "50%",
                            "left": "0",
                            "margin-top": -parseInt($ttHeight) / 2 + "px",
                            "margin-left": -parseInt($ttWidth) - 30 + "px"
                        });
                        if(opt.arrow){
                            $tt.find('.arrow').addClass('arrowR');   
                        }
                        break;
                    case ('right'):
                        $tt.css({
                            "top": "50%",
                            "right": "0",
                            "margin-top": -parseInt($ttHeight) / 2 + "px",
                            "margin-right": -parseInt($ttWidth) - 30 + "px"
                        });
                        if(opt.arrow){
                            $tt.find('.arrow').addClass('arrowL');
                    }
                }

                /* MOUSE ACTIONS
                 * ============================================================================ */
                var $active = false;

                $obj.hover(function() {
                    if(!$active) {
                        $obj.find('.ttC').stop().fadeIn('fast');
                        $active = true;
                    } else {
                        $obj.find('.ttC').stop().delay('300').fadeOut('fast');
                        $active = false;
                    }
                });
                
            }
            
        });
    };
    
})(jQuery);