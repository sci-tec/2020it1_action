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
      });

      // STOP!
      $('.stop').click(function(){
          $('div.roulette').roulette('stop');	
      });
     });


