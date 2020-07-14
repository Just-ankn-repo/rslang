export default (function sidebar() {
  document.querySelectorAll('.nav__trigger').forEach(hamburger => {
    hamburger.addEventListener('click', (burger) => {
      burger.preventDefault()
        if (!hamburger.classList.contains('is-active')) {
            // .nav--trigger active
            hamburger.classList.add('is-active');
            // .nav active
            if (!document.querySelector('.nav').classList.contains('is-active')) {
              document.querySelector('.nav').classList.add('is-active');
              document.querySelector('.nav').addEventListener('transitionend', (e) => {
                    if (e.propertyName === 'width' && hamburger.classList.contains('is-active')) {
                        // .nav__content active
                        document.querySelector('.nav__content').classList.add('is-active');
                    }
                });
            } else {
              document.querySelector('.nav__content').classList.add('is-active');                    
            }

            // no-csstransitions fallback
            if (document.documentElement.classList.contains('no-csstransitions')) {
              document.querySelector('.nav__content').classList.add('is-active');
            }
        } else {
            // .nav--trigger inactive
            hamburger.classList.remove('is-active');
            
            // .nav__content inactive
            if (document.querySelector('.nav__content').classList.contains('is-active')) {
              document.querySelector('.nav__content').classList.remove('is-active');
              document.querySelector('.nav').classList.remove('is-active');                 
            } else {
              document.querySelector('.nav').classList.remove('is-active');                    
            }

            // no-csstransitions fallback
            if (document.documentElement.classList.contains('no-csstransitions')) {
              document.querySelector('.nav').classList.remove('is-active');
            }
        }
    });
  })  
  const links = document.querySelectorAll('.sidebar-link')
  const sidebarMenu = document.querySelector('.sidebar-menu');
  sidebarMenu.addEventListener('click', (event) => {
    if (event.target.parentNode.classList.contains('sidebar-link')) {
      links.forEach((item) => { item.classList.remove('actived') });
      event.target.parentNode.classList.add('actived');
    };
    if (event.target.parentNode.parentNode.classList.contains('sidebar-link')) {
      links.forEach((item) => { item.classList.remove('actived') });
      event.target.parentNode.parentNode.classList.add('actived');
    };
  });
  const currentLocation = document.location.hash.split('').splice(2).join('')
  if(currentLocation === '') {
    links.forEach((item) => { item.classList.remove('actived') });
    document.getElementById('home').classList.add('actived')
  } else {
    links.forEach((item) => { item.classList.remove('actived') });
    document.getElementById(`${currentLocation}`).classList.add('actived')
  }
}());
