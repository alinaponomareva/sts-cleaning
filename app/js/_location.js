$(document).ready(function() {

  $('.location__dropdown-list').hide();

  $('.location__select-current').click(function(){
    $('.location__dropdown-list').toggle();
    $('.location__dropdown-list').addClass('location__dropdown-list--active');
    $('.location__select-arrow').toggleClass('location__select-arrow--active');
  });
  
  $('.location__dropdown-item').click(function(){
    $('.location__select-current').val($(this).html());
    $('.location__dropdown-item ').removeClass('location__dropdown-item--active');
    $(this).addClass('location__dropdown-item--active');
    $('.location__dropdown-list').hide();
    $('.location__select-arrow').removeClass('location__select-arrow--active');
  });

  $('body').click(function(){
    if (!$('.location__select-current').is(':focus')) {
        $('.location__dropdown-list').hide();

        $('.location__select-arrow').removeClass('location__select-arrow--active');
    }           
  });

  $('.location__select').on('change', function(){
    location.href = $(this).val();
  });
  
  // $('.location__select').styler();
  
  $('.main-menu__location-select').on('change', function(){
    location.href = $(this).val();
  });
  
});
