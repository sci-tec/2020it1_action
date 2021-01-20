jQuery(function(){    
    // initialize!
      var option = {
          speed : 10,
          duration : 5,
      }
      $('div.roulette').roulette(option);	

      $('.stop').hide();
      $('#stg').show();
      
      // START!
      $('.start').click(function(){
          $('div.roulette').roulette('start');
          $('.start').hide();
          $('.stop').show();
      });

      // STOP!
      $('.stop').click(function(){
          $('div.roulette').roulette('stop');	
      });
     });

