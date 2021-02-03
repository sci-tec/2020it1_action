    $(".yami-gamen-background-img").hide();
    $(".alret-wrap").hide();
    $(".alret-text1").hide();
    $(".alret-text2").hide();
    $(".alret-text3").hide();
    $(".alret-text4").hide();
    $(".alret-text5").hide();
    $(".alret-text6").hide();
    $(".alret-img1").hide();
    $(".alret-img2").hide();
    $(".alret-img3").hide();
    $(".alret-img4").hide();
    $(".alret-img5").hide();
    $(".alret-img6").hide();
    $(".btn-return").hide();
$('.btn-1').click(function () {
    $(".yami-gamen-background-img").show();
    $(".btn-wrap").hide();
    $(".alret-wrap").hide();
    $(".alret-text1").hide();
    $(".alret-text2").hide();
    $(".alret-text3").hide();
    $(".alret-text4").hide();
    $(".alret-text5").hide();
    $(".alret-text6").hide();
    $(".alret-img1").hide();
    $(".alret-img2").hide();
    $(".alret-img3").hide();
    $(".alret-img4").hide();
    $(".alret-img5").hide();
    $(".alret-img6").hide();
    $(".btn-return").show();
    $("#sca.btn.btn-large.btn-primary").hide();
    $("#stg.stop.btn-large.btn-warning").hide();
})
$('.btn-1-1').click(function () {
    $(".alret-wrap").show();
    $(".alret-text1").show();
    $(".alret-img1").show();
    $('.alret-btn1').click(function () {
        addScoreToSS(10000);
    });
});

$('.btn-1-2').click(function () {
    
    $(".alret-wrap").show();
    $(".alret-text2").show();
    $(".alret-img2").show();
    $(".alret-btn1").click(function () {
        addScoreToSS(15000); 
    });
});

// $('.alret-btn1').click(function () {
//     $(".btn-wrap").show();
// });

$('.btn-1-3').click(function () {
    
    $(".alret-wrap").show();
    $(".alret-text3").show();
    $(".alret-img3").show();
    $(".alret-btn1").click(function () {
        addScoreToSS(20000);
    });
});

// $('.alret-btn1').click(function () {
//     $(".btn-wrap").show();
// });

$('.btn-1-4').click(function () {
    
    $(".alret-wrap").show();
    $(".alret-text4").show();
    $(".alret-img4").show();
    $(".alret-btn1").click(function () {
        addScoreToSS(25000);
    });
});

// $('.alret-btn1').click(function () {
//     $(".btn-wrap").show();
// });

$('.btn-1-5').click(function () {
    
    $(".alret-wrap").show();
    $(".alret-text5").show();
    $(".alret-img5").show();
    $(".alret-btn1").click(function () {
        addScoreToSS(30000);
    });
});

// $('.alret-btn1').click(function () {
//     $(".btn-wrap").show();
// });

$('.btn-1-6').click(function () {
    
    $(".alret-wrap").show();
    $(".alret-text6").show();
    $(".alret-img6").show();
    $(".alret-btn1").click(function () {
        addScoreToSS(35000);
    });
});

$('.btn-return').click(function () {
    $(".btn-wrap").show();
    $(".yami-gamen-background-img").hide();
    $("#sca.btn.btn-large.btn-primary").show();
    $("#stg.stop.btn-large.btn-warning").show();
});
$(".takara").hide();
$('.takara-btn-return').click(function () {
    $(".btn-wrap").show();

    $(".takara").hide();
    $(".btn btn-large btn-primary start").hide();
    $("#sca.btn.btn-large.btn-primary").show();
    $("#stg.stop.btn-large.btn-warning").show();

});
// 宝1回だけの処理
var True = sessionStorage.getItem('didRoulette'); 
if(True == null){
  sessionStorage.setItem('false', 'a');
}else{
  sessionStorage.setItem('false', True);
}
var False = sessionStorage.getItem('false');
console.log(False);
$('.btn-2').click(function(){
    True = sessionStorage.getItem('didRoulette'); 
    if(True == null){
      sessionStorage.setItem('false', 'a');
    }else{
      sessionStorage.setItem('false', True);
    }
    False = sessionStorage.getItem('false');
    if(False == 'a'){
        $(".btn-wrap").hide();
        $('.takara-btn-return').show();
        $('.takara').show();
        $("#sca.btn.btn-large.btn-primary").hide();
        $("#stg.stop.btn-large.btn-warning").hide();
    }
})


$(".btn btn-large btn-primary start").click(function () {
    $(".btn_container").hide();
    $(".takara-alret-btn1").hide();
    $(".start").hide();
    $(".takara-alret-wrap").show();
    console.log("start");

});
// ------------------------------------------shop---------------------------------//
$(".shop-wrap").hide();
$(".shop-btn-return").hide();
$(".caption1").hide();

$('.btn-shop').click(function () {
    $(".btn-wrap").hide();
    $(".shop-wrap").show();
    $(".shop-btn-return").show();
    $("#sca.btn.btn-large.btn-primary").hide();
    $("#stg.stop.btn-large.btn-warning").hide();
});
$(".shop-btn-return").click(function () {
    $(".btn-wrap").show();
    $(".shop-wrap").hide();
    $(".shop-btn-return").hide();
    $("#sca.btn.btn-large.btn-primary").show();
    $("#stg.stop.btn-large.btn-warning").show();
});

$(".suit-text").hide();
$('.car-text').hide();
$('.house-text').hide();

$(".btn-suit").mouseover(function (){
    $(".suit-text").show();
});
$(".btn-suit").mouseout(function (){
    $(".suit-text").hide();
})

$(".btn-car").mouseover(function (){
    $(".car-text").show();
});
$(".btn-car").mouseout(function (){
    $(".car-text").hide();
})

$(".btn-house").mouseover(function (){
    $(".house-text").show();
});
$(".btn-house").mouseout(function (){
    $(".house-text").hide();
})
// -------------------------RANKING-----------------------------------
$('.ranking-wrap').hide();
$('.ranking-text').hide();

$('#ranking-btn').click(function () {
    $('.ranking-wrap').show();
    $('.container_goalpage').hide();
    $('.ranking-text').show();
});

$('.ranking-btn-return').click(function () {
    $('.ranking-wrap').hide();
    $('.container_goalpage').show();
    $('.ranking-text').hide();
});

function addScoreToSS(num) {
    data.t += num;
    sessionStorage.setItem('Save', JSON.stringify({s:data.s,t:data.t,lv:data.lv,b:data.b,c:data.c}));
    location.href='./goalpage.html';
}