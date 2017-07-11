/**
 * Created by harpreetsingh on 16-04-02.
 */
$(document).ready(function(){

    growBoxesAnimations();
    anchors();
    resetTop();
    detectIE();

    var extending_nav = $('.extending-nav');

   $('.navbar-toggle').click(function(){

       $('.extending-nav').toggleClass('open-nav');
       $('.navbar-toggle').toggleClass('open-nav');

       if(extending_nav.hasClass('open-nav')){
           $('body').css({
               'overflowY':'hidden'
           });
       }else if(!extending_nav.hasClass('open-nav')){
           $('body').css({
               'overflowY':'visible'
           });
       }

   });

    $('.extending-nav ul li a').click(function(){
        //alert("clicked!");
        $('body').css({
            'overflowY':'visible'
        })
        //$(extending_nav).removeClass('open-nav');

    });


    // $('.cta-btn').click(function(){
    //     var target = $(this).attr('href');
    //
    //     var strip = target.slice(1);
    //     var anchor = $("section[class='" + strip + "']");
    //     $('body,html').animate({
    //         scrollTop: anchor.offset().top - 70
    //     },1200);


    $('.navbar-links').click(function(){
        var target = $(this).attr('href');

        var strip = target.slice(1);
        var anchor = $("section[class='" + strip + "']");
        var removePadding = parseInt(anchor.css('paddingTop'));
        $('body,html').animate({
            scrollTop: anchor.offset().top - removePadding
        },400);
        showOverflow();
    });

    //Click event to scroll to top
    $('.cta-btn-top').click(function(){
        $('html, body').animate({scrollTop : 0},1800);
        return false;
    });

    $('#cta').click(function(){

       //get #href
        var fullHref = $(this).attr('href');

        //remove the #
        var removeHashtag = fullHref.slice(1);

        //plug in removeHashtag into the target we want to go to
        var target = $("section[class='" + removeHashtag + "']");

        //remove padding so when animated to our target its on the very top of the page not within - hold its value
        var targetPadding = parseInt(target.css('paddingTop'));

        //animate with tl - using body and html - need to scroll from the top
        var bodyHtml = $('body,html');
        var tween = TweenMax.to(bodyHtml,.3,{scrollTop:target.offset().top - targetPadding});
        showOverflow();

    });

    setHeight();

    $(window).resize(function () {
        setHeight();
    });
});

function anchors(){
    $('.extending-nav ul li a').click(function(e){
        e.preventDefault();

        var target = $(this).attr('href');

        var strip = target.slice(1);
        var anchor = $("section[class='" + strip + "']");
        var removePadding = parseInt(anchor.css('paddingTop'));

        e.preventDefault();

        $('body,html').animate({
            scrollTop: anchor.offset().top - removePadding
        },500);

        $('.extending-nav').removeClass('open-nav');
    });
};

function resetTop(){
    $('html,body').animate({
        scrollTop: 0,
        overflow:'hidden'
    },10);

    $('body').css({
        overflow:'hidden'
    })
};

function setHeight(){
    var windowHeight = $(window).innerHeight();
    $('.home-page').css('min-height', 'windowHeight');
}

function setWidth(){

}

$('.button--bubble').each(function() {
        var $circlesTopLeft = $(this).parent().find('.circle.top-left');
        var $circlesBottomRight = $(this).parent().find('.circle.bottom-right');

        var tl = new TimelineLite();
        var tl2 = new TimelineLite();

        var btTl = new TimelineLite({ paused: true });

        tl.to($circlesTopLeft, 1.2, { x: -25, y: -25, scaleY: 2, ease: SlowMo.ease.config(0.1, 0.7, false) });
        tl.to($circlesTopLeft.eq(0), 0.1, { scale: 0.2, x: '+=6', y: '-=2' });
        tl.to($circlesTopLeft.eq(1), 0.1, { scaleX: 1, scaleY: 0.8, x: '-=10', y: '-=7' }, '-=0.1');
        tl.to($circlesTopLeft.eq(2), 0.1, { scale: 0.2, x: '-=15', y: '+=6' }, '-=0.1');
        tl.to($circlesTopLeft.eq(0), 1, { scale: 0, x: '-=5', y: '-=15', opacity: 0 });
        tl.to($circlesTopLeft.eq(1), 1, { scaleX: 0.4, scaleY: 0.4, x: '-=10', y: '-=10', opacity: 0 }, '-=1');
        tl.to($circlesTopLeft.eq(2), 1, { scale: 0, x: '-=15', y: '+=5', opacity: 0 }, '-=1');

        var tlBt1 = new TimelineLite();
        var tlBt2 = new TimelineLite();

        tlBt1.set($circlesTopLeft, { x: 0, y: 0, rotation: -45 });
        tlBt1.add(tl);

        tl2.set($circlesBottomRight, { x: 0, y: 0 });
        tl2.to($circlesBottomRight, 1.1, { x: 30, y: 30, ease: SlowMo.ease.config(0.1, 0.7, false) });
        tl2.to($circlesBottomRight.eq(0), 0.1, { scale: 0.2, x: '-=6', y: '+=3' });
        tl2.to($circlesBottomRight.eq(1), 0.1, { scale: 0.8, x: '+=7', y: '+=3' }, '-=0.1');
        tl2.to($circlesBottomRight.eq(2), 0.1, { scale: 0.2, x: '+=15', y: '-=6' }, '-=0.2');
        tl2.to($circlesBottomRight.eq(0), 1, { scale: 0, x: '+=5', y: '+=15', opacity: 0 });
        tl2.to($circlesBottomRight.eq(1), 1, { scale: 0.4, x: '+=7', y: '+=7', opacity: 0 }, '-=1');
        tl2.to($circlesBottomRight.eq(2), 1, { scale: 0, x: '+=15', y: '-=5', opacity: 0 }, '-=1');

        tlBt2.set($circlesBottomRight, { x: 0, y: 0, rotation: 45 });
        tlBt2.add(tl2);

        btTl.add(tlBt1);
        btTl.to($(this).parent().find('.button.effect-button'), 0.8, { scaleY: 1.1 }, 0.1);
        btTl.add(tlBt2, 0.2);
        btTl.to($(this).parent().find('.button.effect-button'), 1.8, { scale: 1, ease: Elastic.easeOut.config(1.2, 0.4) }, 1.2);

        btTl.timeScale(2.6);

        $(this).on('mouseover', function() {
            btTl.restart();
        });
    });


// function loadPageAnimations(){
//
//
//         // $textAnimationBox = $('.text-animation-box'),
//
//     var $hoist = $('#hoist'),
//         $car = $('#car-white'),
//         $mechanic = $('#mechanic'),
//         tl = new TimelineMax();
//
//     tl
//
//
//         // .to($textAnimationBox,.2,{width:'0%', ease:Power4.easeOut})
//         // .set($textAnimationBox,{right:'0 !important'})
//         // .to($textAnimationBox,.2,{width:'0%'})
//
// };

function growBoxesAnimations(){
    var $contentBoxHolder = $('.content-box-holder'),
        $contentBox = $('.content-box'),
        $graphicsBoxHolder = $('.graphics-box-holder'),
        $graphicsBox = $('.graphics-box'),
        tl = new TimelineMax({delay:'.5',onComplete:headingAnimations});

    tl
        .add('growBoxesWidth')
        .to($contentBoxHolder,.3,{width:'100%',ease:Power4.easeOut},'growBoxesWidth')
        .to($graphicsBox,.3,{width:'100%',ease:Power4.easeOut},'growBoxesWidth')

        .add('growBoxesHeight')
        .to($contentBoxHolder,.3,{height:'100vh',ease:Power4.easeOut},'growBoxesHeight')
        .to($graphicsBox,.3,{height:'100%',ease:Power4.easeOut},'growBoxesHeight');

};

function headingAnimations(){
    var $priceInfo = $('#price-info'),
        $contentList_textHolder1 = $('#heading1'),
        $contentList_textHolder2 = $('#heading2'),
        $contentList_textHolder3 = $('#heading3'),
        $contentList_textHolder4 = $('#heading4'),
        $buttonHolder = $('.button-holder'),
        $navbar = $('.navbar-default'),
        tl = new TimelineMax({onComplete:carMechanicAnimation});

        tl
            .to($priceInfo,.8,{width:'85%',x:'20%',opacity:'1', ease:Power4.easeOut})
            .to($contentList_textHolder1,1.2,{width:'50%',x:'20%',opacity:'1', ease:Power4.easeOut},'-=.3')
            .to($contentList_textHolder2,1.2,{width:'80%',x:'10%',opacity:'1', ease:Power4.easeOut},'-=.5')
            .to($contentList_textHolder3,1.2,{width:'100%',x:'10%',opacity:'1', ease:Power4.easeOut},'-=.5')
            .to($contentList_textHolder4,1.2,{width:'100%',x:'10%',opacity:'1', ease:Power4.easeOut},'-=.5')
            .add('appear','-=1.2')
            .to($buttonHolder,.8,{y:'-22px',opacity:'1'},'appear')
            .to($navbar,.8,{y:'0px',ease:Power4.easeOut},'appear');

};

function carMechanicAnimation(){
    var $car = $('#car-white'),
        $mechanic = $('#mechanic'),
        tl = new TimelineMax();

    tl
        .to($car,.8,{y:'-98%',ease:Linear.easeOut})
        .to($('#car-white .st1'),1,{opacity:'1'},'-=.5')
        .to($mechanic,3.3,{opacity:'1',x:'-60%',ease:Power4.easeOut},'-=1');

};

function showOverflow(){
    $('body').css({
        overflowY:'visible'
    })
}

//Showing only yellow page - make


/**
 * detect IE
 * returns version of IE or false, if browser is not Internet Explorer
 */
function detectIE() {
    var ua = window.navigator.userAgent;

    // Test values; Uncomment to check result …

    // IE 10
    // ua = 'Mozilla/5.0 (compatible; MSIE 10.0; Windows NT 6.2; Trident/6.0)';

    // IE 11
    // ua = 'Mozilla/5.0 (Windows NT 6.3; Trident/7.0; rv:11.0) like Gecko';

    // Edge 12 (Spartan)
    // ua = 'Mozilla/5.0 (Windows NT 10.0; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/39.0.2171.71 Safari/537.36 Edge/12.0';

    // Edge 13
    // ua = 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/46.0.2486.0 Safari/537.36 Edge/13.10586';

    var msie = ua.indexOf('MSIE ');
    if (msie > 0) {
        // IE 10 or older => return version number
        $('.full-width').css('width', '100%');
        $('.zero-width').css({
            width:'0%',
            height:'0%',
            visibility:'hidden'
        });
        $('#service-car').css({
            height:'500px'
        });

            resetTop();
    }

    var trident = ua.indexOf('Trident/');
    if (trident > 0) {
        // IE 11 => return version number
        $('.full-width').css('width', '100%');
        $('.zero-width').css({
            width:'0%',
            height:'0%',
            visibility:'hidden'
        });
        $('#service-car').css({
            height:'500px'
        });

            resetTop();
    }

    var edge = ua.indexOf('Edge/');
    if (edge > 0) {
        // Edge (IE 12+) => return version number
        $('.full-width').css('width', '100%');
        $('.zero-width').css({
            width:'0%',
            height:'0%',
            visibility:'hidden'
        });
        resetTop();
        $('#service-car').css({
            height:'500px'
        });
    }

    // other browser
    return 'im google';
}









