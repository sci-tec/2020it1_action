jQuery(function(){    
    // initialize!
      var option = {
          speed : 10,
          duration : 5,
      }
      $('div.roulette').roulette(option);	

      // START!
      $('.start').click(function(){
          $('div.roulette').roulette('start');	
          $("btn btn-large btn-primary start").hide();
          console.log("start2");
          $(".start").hide();
          
      });

      // STOP!
      $('.stop').click(function(){
          $('div.roulette').roulette('stop');	
      });
     });


