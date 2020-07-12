export default (function() {
    document.getElementById('dropdown').addEventListener('click', () => {
      if(document.getElementById('notifications').hasChildNodes()) {
        document.getElementById('dropdown').classList.toggle('show');
        document.getElementById('notifications').classList.toggle('show');
        document.querySelector('.dropdown-menu').classList.toggle('show');
      }
    })
})()