window.addEventListener("load", () => {
    $('.carousel-item').eq(0).addClass('active');
    var total = $('.carousel-item').length;
    var current = 0;
    $('.carousel-item.active').on('click', function(){
      $('.carousel-item.active .carousel-item__image').css("width","100%");
      $('.carousel-item.active .carousel-item__image').css("flex-basis","100%");
      $('.carousel-item.active .carousel-item__info').css("display","none");
      // $('.carousel-item.active').css("display","block");
    });
    $('#moveRight').on('click', function(){
      var next=current;
      current= current+1;
      setSlide(next, current);
    });
    $('#moveLeft').on('click', function(){
      var prev=current;
      current = current- 1;
      setSlide(prev, current);
    });
    function setSlide(prev, next){
      var slide= current;
      if(next>total-1){
       slide=0;
        current=0;
      }
      if(next<0){
        slide=total - 1;
        current=total - 1;
      }
             $('.carousel-item').eq(prev).removeClass('active');
             $('.carousel-item').eq(slide).addClass('active');
        setTimeout(function(){
  
        },800);
      
  
      
      console.log('current '+current);
      console.log('prev '+prev);
    }
  });