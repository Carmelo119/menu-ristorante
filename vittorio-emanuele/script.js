(function(){
  var revealEls = document.querySelectorAll('.reveal');
  if ('IntersectionObserver' in window && revealEls.length) {
    var observer = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });
    revealEls.forEach(function (el) { observer.observe(el); });
  } else {
    revealEls.forEach(function (el) { el.classList.add('is-visible'); });
  }

  var dock = document.getElementById('categoryDock');
  if (dock) {
    var onScroll = function () {
      if (window.scrollY > 80) {
        dock.classList.add('is-compact');
      } else {
        dock.classList.remove('is-compact');
      }
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
  }
})();