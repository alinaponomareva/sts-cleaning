// $('.location__select').on('change', function(){
//   location.href = $(this).val();
// });

// // $('.location__select').styler();

// $('.main-menu__location-select').on('change', function(){
//   location.href = $(this).val();
// });


$(document).ready(function(){
  $('.services__item-title').on('click', function() {
    $(this).next().slideToggle();
    $(this).toggleClass('services__item-title--active');
  });
});

$('.services__tab-link').on('click', function(e) {
  e.preventDefault();
  $('.services__tab-link').removeClass('services__tab-link--active');
  $('.services__tab-item').removeClass('services__tab-item--active');
  $('.services__main-item').removeClass('services__main-item--active');

  $(this).addClass('services__tab-link--active');
  $($(this).closest('.services__tab-item')).addClass('services__tab-item--active');

  $($(this).attr('href')).addClass('services__main-item--active');

  // let breadcrumps = $('.services__tab-link--active').html();

  // $('.breadcrumps__item-link--current').breadcrumps;

  $('.breadcrumps__item-link--current').html(function() {
    let breadcrumps = $('.services__tab-link--active').html();
    return breadcrumps;
  });
});

// $('.location__select').styler();

$('.main-menu__btn').on('click', function() {
  $('.main-menu__btn').toggleClass('main-menu__btn--active');
  // $('.main-menu').toggleClass('main-menu--active');
  $('.main-menu__list').toggleClass('main-menu__list--active');
  $('.header__mobile-wrapper').toggleClass('header__mobile-wrapper--active');
});

$('.main-menu__item-link').on('click', function() {
  $('.main-menu__btn').removeClass('main-menu__btn--active');
  // $('.main-menu').removeClass('main-menu--active');
  $('.main-menu__list').removeClass('main-menu__list--active');
  $('.header__mobile-wrapper').removeClass('header__mobile-wrapper--active');
});