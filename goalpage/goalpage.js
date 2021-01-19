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
});
$('.alret-btn1').click(function () {
    $(".btn-wrap").show();
    $(".yami-gamen-background-img").hide();
    $("#sca.btn.btn-large.btn-primary").show();
    $("#stg.stop.btn-large.btn-warning").show();
});

$('.btn-1-2').click(function () {
    
    $(".alret-wrap").show();
    $(".alret-text2").show();
    $(".alret-img2").show();
});
// $('.alret-btn1').click(function () {
//     $(".btn-wrap").show();
// });

$('.btn-1-3').click(function () {
    
    $(".alret-wrap").show();
    $(".alret-text3").show();
    $(".alret-img3").show();
});
// $('.alret-btn1').click(function () {
//     $(".btn-wrap").show();
// });

$('.btn-1-4').click(function () {
    
    $(".alret-wrap").show();
    $(".alret-text4").show();
    $(".alret-img4").show();
});
// $('.alret-btn1').click(function () {
//     $(".btn-wrap").show();
// });

$('.btn-1-5').click(function () {
    
    $(".alret-wrap").show();
    $(".alret-text5").show();
    $(".alret-img5").show();
});
// $('.alret-btn1').click(function () {
//     $(".btn-wrap").show();
// });

$('.btn-1-6').click(function () {
    
    $(".alret-wrap").show();
    $(".alret-text6").show();
    $(".alret-img6").show();
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
$('.btn-2').click(function(){
    $(".btn-wrap").hide();
    $('.takara-btn-return').show();
    $('.takara').show();
    $("#sca.btn.btn-large.btn-primary").hide();
    $("#stg.stop.btn-large.btn-warning").hide();
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

$(document).ready(function () {
$("btn-suit").mouseover(function (){
    $(".caption1").show();
})
});

