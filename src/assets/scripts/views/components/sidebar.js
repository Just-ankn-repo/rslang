export default (function sidebar() {
  const appElement = document.querySelector('.app');
  const menuButton = document.querySelector('.ti-menu');
  const links = document.querySelectorAll('.sidebar-link')
  const sidebarMenu = document.querySelector('.sidebar-menu');

  const closeSidebar = () => {
    if (appElement.classList.contains('is-collapsed')) {
      appElement.classList.remove('is-collapsed');
      document.body.removeEventListener('click', closeSidebar);
    }
  }

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

  menuButton.addEventListener('click', () => {
    if (!appElement.classList.contains('is-collapsed')) {
      appElement.classList.add('is-collapsed');
      document.body.addEventListener('mouseup', closeSidebar);
    } else {
      closeSidebar();
    };
  });

}());
