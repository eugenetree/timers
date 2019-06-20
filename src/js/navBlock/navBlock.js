const navBlock = document.querySelector('.start_timer_buttons_scroll_wrapper');

document.addEventListener('scroll', e => {
  if (window.pageYOffset) navBlock.style.top = 0;
  else navBlock.style.top = '-110px';
});