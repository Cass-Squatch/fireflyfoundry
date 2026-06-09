const bookResults = document.getElementById('bookResults');
const bookCount = document.getElementById('bookCount');
const bookSearch = document.getElementById('bookSearch');
const statusFilter = document.getElementById('statusFilter');
const genreFilter = document.getElementById('genreFilter');
const ratingFilter = document.getElementById('ratingFilter');
const bookshelfControls = document.getElementById('bookshelfControls');

let books = [];

fetch('books.json')
  .then((response) => response.json())
  .then((bookData) => {
    books = bookData.filter((book) => book.title && book.title !== 'Book Title');
    buildFilterOptions();
    renderBooks();
  })
  .catch(() => {
    bookCount.textContent = 'Could not load books.';
    bookResults.innerHTML = '<p class="bookshelf-empty">The bookshelf data could not be loaded.</p>';
  });

function buildFilterOptions() {
  fillSelect(statusFilter, getUniqueValues('status'));
  fillSelect(genreFilter, getUniqueValues('genre'));
  fillSelect(ratingFilter, getUniqueValues('rating').map(String));
}

function getUniqueValues(key) {
  const values = books
    .map((book) => book[key])
    .filter((value) => value !== null && value !== undefined && value !== '');

  return [...new Set(values)].sort();
}

function fillSelect(select, values) {
  values.forEach((value) => {
    const option = document.createElement('option');
    option.value = value;
    option.textContent = value;
    select.appendChild(option);
  });
}

function renderBooks() {
  const searchTerm = bookSearch.value.trim().toLowerCase();
  const selectedStatus = statusFilter.value;
  const selectedGenre = genreFilter.value;
  const selectedRating = ratingFilter.value;

  const filteredBooks = books.filter((book) => {
    const searchableText = [
      book.title,
      book.author,
      book.genre,
      book.status,
      book.note,
      book.mood,
      ...(book.tags || [])
    ].join(' ').toLowerCase();

    const matchesSearch = searchableText.includes(searchTerm);
    const matchesStatus = !selectedStatus || book.status === selectedStatus;
    const matchesGenre = !selectedGenre || book.genre === selectedGenre;
    const matchesRating = !selectedRating || String(book.rating) === selectedRating;

    return matchesSearch && matchesStatus && matchesGenre && matchesRating;
  });

  bookCount.textContent = `${filteredBooks.length} of ${books.length} books`;

  if (filteredBooks.length === 0) {
    bookResults.innerHTML = '<p class="bookshelf-empty">No books match those filters.</p>';
    return;
  }

  bookResults.innerHTML = filteredBooks.map(createBookCard).join('');
}

function createBookCard(book) {
  const rating = book.rating ? `${book.rating} stars` : 'Unrated';
  const year = book.year ? book.year : 'Year unknown';
  const tags = (book.tags || []).filter(Boolean);

  return `
    <article class="book-card">
      <div class="book-card__meta">
        <span>${escapeHTML(book.status)}</span>
        <span>${escapeHTML(book.genre)}</span>
      </div>
      <h2>${escapeHTML(book.title)}</h2>
      <p class="book-card__author">${escapeHTML(book.author)}</p>
      <p class="book-card__details">${escapeHTML(year)} | ${escapeHTML(book.length)} | ${escapeHTML(rating)}</p>
      ${book.note && book.note !== 'text' ? `<p class="book-card__note">${escapeHTML(book.note)}</p>` : ''}
      ${tags.length ? `<p class="book-card__tags">${tags.map((tag) => `#${escapeHTML(tag)}`).join(' ')}</p>` : ''}
    </article>
  `;
}

function escapeHTML(value) {
  return String(value)
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
    .replaceAll('"', '&quot;')
    .replaceAll("'", '&#039;');
}

bookshelfControls.addEventListener('input', renderBooks);
bookshelfControls.addEventListener('reset', () => {
  setTimeout(renderBooks, 0);
});
