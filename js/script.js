// serviceWorker
if('serviceWorker' in navigator){
    navigator.serviceWorker.register('/sw.js')
      .then(reg => console.log('service worker registered'))
      .catch(err => console.log('service worker not registered', err));
  }
  //setting untuk pwa

  /**
   * Back to top button
   */
  let backtotop = document.getElementsByClassName('back-to-top');

  // When the user scrolls down 20px from the top of the document, show the button
  window.onscroll = function() {scrollFunction()};

  function scrollFunction() {
    if (document.body.scrollTop > 20 || document.documentElement.scrollTop > 20) {
      backtotop[0].style.display = "block";
      backtotop[0].style.visibility = "visible";
      backtotop[0].style.opacity = 1;
    } else {
      backtotop[0].style.display = "none";
      backtotop[0].style.visibility = "hidden";
      backtotop[0].style.opacity = 0;
    }
  }

  // When the user clicks on the button, scroll to the top of the document
  function topFunction() {
    window.scrollTo({top: 0, behavior: 'smooth'});
    // document.body.scrollTop = 0; // For Safari
    // document.documentElement.scrollTop = 0; // For Chrome, Firefox, IE and Opera
  }