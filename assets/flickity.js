var direction = "left";
var tickerSpeed = 0.4;
var count = 0;
  var clicked = true;
$(document).ready(function () {
    $('.block-content').hide();
    var block_content = $(event.target).find(".carousel-cell").eq(0).find(".block-content").html();
     $('.dynamic-block-content-animations').html(block_content);

    leftslider();
    var $carousel = $('.main-carousel');

    $carousel.on('change.flickity ', function (event, index) {

        $('.block-content').hide();
        var current_item = index;
        var block_content = $(event.target).find(".carousel-cell").eq(current_item).find(".block-content").html();
        $('.dynamic-block-content-animations').html(block_content);
    });


    $carousel.on('staticClick.flickity ', function (event, pointer, cellElement, cellIndex) {
        $('.block-content').hide();
        var current_item = cellIndex;
        var block_content = $(".carousel-cell").eq(current_item).find(".block-content").html();
     
        $('.dynamic-block-content-animations').html(block_content);

    });

  
    function getSwipeDirection(moveVector) {

        var swipeDirection = null;

        if (moveVector.x > 0) {
            swipeDirection = 'right';
        } else {
            swipeDirection = 'left';
        }

        return swipeDirection;
    }

    var flkty = $carousel.data('flickity'),
        current_index = null,
        swipe_direction = null;

    // Detect swipe direction
    $carousel.on('dragMove.flickity', function (event, pointer, moveVector) {
         console.log();
        swipe_direction = getSwipeDirection(moveVector);
        if (direction != swipe_direction) {
            direction = swipe_direction;
            if (direction == "right") {
                rightsilder();
            } else {
                leftslider();
            }
        } else {
            return;
        }

    });
	

});
  
  
function leftslider() {
    const slideshowEl = document.querySelector('.main-carousel');
    let flickity = null;
   flickity = new Flickity(slideshowEl, {
        autoPlay: false,
        prevNextButtons: false,
        pageDots: false,
        draggable: true,
        wrapAround: true,
        selectedAttraction: 0.008,
        freeScroll: true,
        freeScrollFriction: 0.075
    });
 
    let isPaused = false;
  

  function update() {
        if (isPaused) return;
        if (direction == "left") {
            if (flickity.slides) {
                flickity.x = (flickity.x - tickerSpeed) % flickity.slideableWidth;
                flickity.selectedIndex = flickity.dragEndRestingSelect();
                var index = Math.abs(flickity.selectedIndex);
                var current_item = index;
                var block_content = $(".carousel-cell").eq(current_item).find(".block-content").html();
                var event_type = $(".event_type").text();
                if (event_type =="false"){
                  $('.dynamic-block-content-animations').html(block_content);
                }
                flickity.updateSelectedSlide();
                flickity.settle(flickity.x);
            }
        } else {
            return;
        }
//     if (clicked){
        window.requestAnimationFrame(update);
//     }
      
    };
  

    const pause = () => {
        isPaused = true;
      
      console.log("tttt");
      setTimeout(
      function(){isPaused = false;
      window.requestAnimationFrame(update)}, 500);
      
    };

    const play = () => {
        if (isPaused) {
          isPaused = false;
  		  window.requestAnimationFrame(update);
        }
    };

   
   slideshowEl.addEventListener('mouseenter', play);
    slideshowEl.addEventListener('focusin', play,);
   slideshowEl.addEventListener('mouseleave', play);
    slideshowEl.addEventListener('focusout', play);
  
  
  
  update();

}

function rightsilder() {
     const slideshowEl = document.querySelector('.main-carousel');
    var length = $(".carousel-cell").length;
  let flickity = null;
      flickity = new Flickity(slideshowEl, {
        autoPlay: false,
        prevNextButtons: false,
        pageDots: false,
        draggable: true,
        wrapAround: true,
          selectedAttraction: 0.008,
       freeScroll: true,
        freeScrollFriction: 0.075
    });
    let isPaused = false;
 
    const update = () => {
        if (isPaused) return;
        if (direction == "right") {
            if (flickity.slides) {
                flickity.x = (flickity.x + tickerSpeed) % flickity.slideableWidth;
                flickity.selectedIndex = flickity.dragEndRestingSelect();
                var index = Math.abs(flickity.selectedIndex);
                var current_item = length - index;
                var block_content = $(".carousel-cell").eq(current_item).find(".block-content").html();
               var event_type = $(".event_type").text();
                if (event_type =="false"){
                  $('.dynamic-block-content-animations').html(block_content);
                }
                flickity.updateSelectedSlide();
                flickity.settle(flickity.x);
            }
        } else {
            return;
        }
        window.requestAnimationFrame(update);
    };

    const pause = () => {
        isPaused = true;
       setTimeout(
      function(){isPaused = false;
      window.requestAnimationFrame(update)}, 500);
    };

    const play = () => {
        if (isPaused) {
            isPaused = false;
            window.requestAnimationFrame(update);
        }
    };

  

    slideshowEl.addEventListener('mouseenter', play);
    slideshowEl.addEventListener('focusin', play);
    slideshowEl.addEventListener('mouseleave', play);
    slideshowEl.addEventListener('focusout', play);

    update();

}