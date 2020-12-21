let portfolioSlider = new Swiper('.portfolio__wrapper', {
  direction: 'horizontal',
  slidesPerView: '4.5',
  loop: false,
  spaceBetween: 50,
  // freemode: 'true',
  
  navigation: {
    nextEl: '.portfolio__btn--next',
    prevEl: '.portfolio__btn--prev',
  }
});

portfolioSlider.isEnd 

// portfolioSlider.on('slideChange', function () {
//   $('.portfolio__item').addClass('portfolio__item--opacity');
// });
