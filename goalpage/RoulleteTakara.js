
// コンテを隠す
function hideBtn(){

    let x = document.getElementById("btn-wrap");
    x.style.display = "none"
}

//hideBtn();


function random(){
	var a = Math.floor( Math.random() * 9);
	return a;
}
// ルーレットコード

function Random(){
	let random = Math.floor(Math.random() * 7)
	return random

}

(function($) {
	var Roulette = function(options) {
		var defaultSettings = {
			maxPlayCount : null, // x >= 0 or null
			speed : 10, // x > 0
			stopImageNumber : 0, // x >= 0 or null or -1
			rollCount : 3, // x >= 0
			duration : 3, //(x second)	
			stopCallback : function() {
			},
			startCallback : function() {
			},
			slowDownCallback : function() {
			}
		}
		var defaultProperty = {
			playCount : 0,
			$rouletteTarget : null,
			imageCount : null,
			$images : null,
			originalStopImageNumber : null,
			totalHeight : null,
			topPosition : 0,

			maxDistance : null,
			slowDownStartDistance : null,

			isRunUp : true,
			isSlowdown : false,
			isStop : false,

			distance : 0,
			runUpDistance : null,
			isIE : navigator.userAgent.toLowerCase().indexOf('msie') > -1 // TODO IE
		};
		var p = $.extend({}, defaultSettings, options, defaultProperty);

		var reset = function() {
			p.maxDistance = defaultProperty.maxDistance;
			p.slowDownStartDistance = defaultProperty.slowDownStartDistance;
			p.distance = defaultProperty.distance;
			p.isRunUp = defaultProperty.isRunUp;
			p.isSlowdown = defaultProperty.isSlowdown;
			p.isStop = defaultProperty.isStop;
			p.topPosition = defaultProperty.topPosition;
		}
		
		var slowDownSetup = function() {
			if(p.isSlowdown){
				return;
			}
			p.slowDownCallback();
			p.isSlowdown = true;
			p.slowDownStartDistance = p.distance;
			p.maxDistance = p.distance + (2*p.totalHeight);
			p.maxDistance += p.imageHeight - p.topPosition % p.imageHeight;
			if (p.stopImageNumber != null) {
				p.maxDistance += (p.totalHeight - (p.maxDistance % p.totalHeight) + (p.stopImageNumber * p.imageHeight))
						% p.totalHeight;
			}
		}
		

		var roll = function() {
			var speed_ = p.speed;

			if (p.isRunUp) {
				if (p.distance <= p.runUpDistance) {
					var rate_ = ~~((p.distance / p.runUpDistance) * p.speed);
					speed_ = rate_ + 1;
				} else {
					p.isRunUp = false;
				}

			} else if (p.isSlowdown) {
				var rate_ = ~~(((p.maxDistance - p.distance) / (p.maxDistance - p.slowDownStartDistance)) * (p.speed));
				speed_ = rate_ + 1;
			}

			if (p.maxDistance && p.distance >= p.maxDistance) {
				p.isStop = true;
				reset();
				p.stopCallback(p.$rouletteTarget.find('img').eq(p.stopImageNumber));
				return;
			}
			p.distance += speed_;
			p.topPosition += speed_;
			if (p.topPosition >= p.totalHeight) {
				p.topPosition = p.topPosition - p.totalHeight;
			}
			// TODO IE 
			if (p.isIE) {
				p.$rouletteTarget.css('top', '-' + p.topPosition + 'px');
			} else {
				// TODO more smooth roll
				p.$rouletteTarget.css('transform', 'translate(0px, -' + p.topPosition + 'px)');
			}
			setTimeout(roll, 1);
		}


		var init = function($roulette) {
			$roulette.css({ 'overflow' : 'hidden' });
			defaultProperty.originalStopImageNumber = p.stopImageNumber;
			if (!p.$images) {
				p.$images = $roulette.find('img').remove();
				p.imageCount = p.$images.length;
				p.$images.eq(0).bind('load',function(){
					p.imageHeight = $(this).height();
					$roulette.css({ 'height' : (p.imageHeight + 'px') });
					p.totalHeight = p.imageCount * p.imageHeight;
					p.runUpDistance = 2 * p.imageHeight;
				}).each(function(){
					if (this.complete || this.complete === undefined){
						var src = this.src;
						// set BLANK image
						this.src = "data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///ywAAAAAAQABAAACAUwAOw==";
						this.src = src;
					} 
				});
			}
			$roulette.find('div').remove();
			p.$images.css({
				'display' : 'block'
			});
			p.$rouletteTarget = $('<div>').css({
				'position' : 'relative',
				'top' : '0'
			}).attr('class',"roulette-inner");
			$roulette.append(p.$rouletteTarget);
			p.$rouletteTarget.append(p.$images);
			p.$rouletteTarget.append(p.$images.eq(0).clone());
			$roulette.show();
			
		}

		var start = function() {
			let n = random();
			defaultProperty.originalStopImageNumber = n;
			p.stopImageNumber = n;
			console.log(n);
			p.playCount++;
			if (p.maxPlayCount && p.playCount > p.maxPlayCount) {
				return;
			}
			p.stopImageNumber = $.isNumeric(defaultProperty.originalStopImageNumber) && Number(defaultProperty.originalStopImageNumber) >= 0 ?
									Number(defaultProperty.originalStopImageNumber) : Math.floor(Math.random() * p.imageCount); 
			p.startCallback();
			roll();
			setTimeout(function(){
				slowDownSetup();
			}, p.duration * 1000);
		}

		var stop = function(option) {
			if (!p.isSlowdown) {
				if (option) {
					var stopImageNumber = Number(option.stopImageNumber);
					if (0 <= stopImageNumber && stopImageNumber <= (p.imageCount - 1)) {
						p.stopImageNumber = option.stopImageNumber;
					}
				}
				slowDownSetup();
			}
			// function result(){

			// 	if (stopImageNumber  == 3 || stopImageNumber  == 5){
			// 		alert('残念、ハズレです。');
			// 	}else if (stopImageNumber  == 0){
			// 		alert('あたり！ルーレットあと１回廻ります。');
			// 	}else if (stopImageNumber  == ){
			// 		alert('あたり！ルーレットあと2回廻ります。');
			// 	}else if (stopImageNumber  == 1 || stopImageNumber  == 4){
			// 		alert('あたり！ルーレットあと2回廻ります。')
			// 	}else if (stopImageNumber  == 2){
			// 		alert('あたり！次のステージコインが２倍！')
			// 	}
			// }
			// result();
		}
		var option = function(options) {
			p = $.extend(p, options);
			p.speed = Number(p.speed);
			p.duration = Number(p.duration);
			p.duration = p.duration > 1 ? p.duration - 1 : 1; 
			defaultProperty.originalStopImageNumber = options.stopImageNumber; 
		}

		var ret = {
			start : start,
			stop : stop,
			init : init,
			option : option
		}
		return ret;
	}

	// この関数の置き場所探してる 
	function result(){
		if (n == 3 || n == 5 || n == 8){
			 alert('残念、ハズレです。');
		}else if (n == 0){
			 alert('あたり！ルーレットあと１回廻ります。');
		}else if (n == 6){
			 alert('あたり！ルーレットあと2回廻ります。');
		}else if (n == 1 || n == 4 || n == 7){
			 alert('あたり！ルーレットあと2回廻ります。')
		}else if (n == 2){
			 alert('あたり！次のステージコインが２倍！')
		}
	}	 

	var pluginName = 'roulette';
	$.fn[pluginName] = function(method, options) {
		return this.each(function() {
			var self = $(this);
			var roulette = self.data('plugin_' + pluginName);

			if (roulette) {
				if (roulette[method]) {
					roulette[method](options);
				} else {
					console && console.error('Method ' + method + ' does not exist on jQuery.roulette');
				}
			} else {
				roulette = new Roulette(method);
				roulette.init(self, method);
				$(this).data('plugin_' + pluginName, roulette);
			}
		});
	}
})(jQuery);



