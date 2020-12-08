<html>
	<head>
		<meta charset="UTF-8">
		<title>JavaScriptでルーレットゲームを作成</title>
		<style>
			body {
				text-align: center;
				padding: 0;
				margin: 0;
			}
			ul {
				list-style: none;
			}
			.roulette {
				width: 90%;
				height: 500px;
				margin: auto;
				position: relative;
				border : solid 1px #333 ;
			}

			.panels {
				position: relative;
				margin: 0 auto;
				width: 400px;
				height: 400px;
			}

			.panel {
				width: 200px;
				position: absolute;
			}

			.panel img {
				vertical-align: bottom;
			}
		</style>
	</head>
	<body>
		<h1>JavaScriptでルーレットゲームを作成</h1>
		<div class="roulette">
			<div class="panels">
				<img src="/ut/roulette/img/panel.png" class="panel">
				<img src="/ut/roulette/img/panel.png" class="panel">
				<img src="/ut/roulette/img/panel.png" class="panel">
				<img src="/ut/roulette/img/panel.png" class="panel">
				<img src="/ut/roulette/img/panel.png" class="panel">
				<img src="/ut/roulette/img/panel.png" class="panel">
				<img src="/ut/roulette/img/panel.png" class="panel">
				<img src="/ut/roulette/img/panel.png" class="panel">
				<img src="/ut/roulette/img/panel.png" class="panel">
				<img src="/ut/roulette/img/panel.png" class="panel">
				<img src="/ut/roulette/img/panel.png" class="panel">
				<img src="/ut/roulette/img/panel.png" class="panel">
				<img src="/ut/roulette/img/panel.png" class="panel">
				<img src="/ut/roulette/img/panel.png" class="panel">
				<img src="/ut/roulette/img/panel.png" class="panel">
				<img src="/ut/roulette/img/panel.png" class="panel">
				<img src="/ut/roulette/img/panel.png" class="panel">
				<img src="/ut/roulette/img/panel.png" class="panel">
				<img src="/ut/roulette/img/panel.png" class="panel">
				<img src="/ut/roulette/img/panel.png" class="panel">
			</div>
		</div>
		<div>
			<button type="button" class="btn-start">start</button>
			<button type="button" class="btn-stop" disabled="true">stop</button>
		</div>
		<script src="https://ajax.googleapis.com/ajax/libs/jquery/3.3.1/jquery.min.js"></script>
		<script>
			(function (global) {
				"use strict";

				/*
				 * ルーレットの回転速度(実行毎秒数)
				 */
				var sec = 100;

				/*
				 * ルーレットの停止フラグ
				 */
				var stopFlag = false;

				/*
				 * ・ルーレットのパネル数
				 * ・ルーレットの回転数
				 */
				var panelNum  = 0,
					loopCount = 0;

				/**
				 * ルーレット
				 */
				var Roulette = {
					/**
					 * 初期化処理
					 */
					init: function () {
						// ルーレットのパネル配置を調整
						var $panels = $('.panel');
						var deg = 360.0 / $panels.length;
						var red = (deg * Math.PI / 180.0);
						var r   = $panels.width() / 2;
						var adjustY = ($panels.width() / 2) - ($panels.height() / 2);

						$panels.each(function (i, elem) {
							var tmp = i - ($panels.length / 4);

							var x = Math.cos(red * tmp) * r + r;
							var y = Math.sin(red * tmp) * r + r + adjustY;
							var t = tmp * deg;

							$(elem).css({
								'left': x,
								'top' : y,
								'transform': 'rotate(' + t + 'deg)'
							});

						});

						// ルーレットのパネル数を代入
						panelNum = $panels.length;
					},
					/**
					 * ルーレットの回転開始
					 */
					start: function () {
						stopFlag = false;
						Roulette.animation();
					},
					/**
					 * ルーレットの回転停止
					 */
					stop: function () {
						stopFlag = true;
					},
					/**
					 * ルーレットの回転アニメーション
					 */
					animation: function () {
						$('.panels').animate({
							deg: -((360 / panelNum) * loopCount)
						},{
							duration: sec,
							step: function (now) {
								$('.panels').css({
									transform: 'rotate(' + now + 'deg)'
								});
							},
							complete: function () {
								if (stopFlag) {
									return ;
								}
								loopCount++;
								Roulette.animation();
							}
						});
					}
				};

				global.Roulette = Roulette;

			})((this || 0).self || global);

			$(document).ready(function () {

				// 初期化処理を実行
				Roulette.init();

				/**
				 * スタートボタンのクリックイベント
				 */
				$('.btn-start').click(function () {
					$(this).attr('disabled', true);
					Roulette.start();
					$('.btn-stop').attr('disabled', false);
				});

				/**
				 * ストップボタンのクリックイベント
				 */
				$('.btn-stop').click(function () {
					$(this).attr('disabled', true);
					Roulette.stop();
					$('.btn-start').attr('disabled', false);
				});

			});
		</script>
	</body>
</html>