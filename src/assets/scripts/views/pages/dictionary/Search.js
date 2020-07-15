function searchWords() {
  const SEARCH = document.querySelector('.dictionary-tools__search');
  document.getElementById('search-form').addEventListener('submit', (e) => {
    currentMovie = document.getElementById('search-text').value;
    e.preventDefault();
  });
}