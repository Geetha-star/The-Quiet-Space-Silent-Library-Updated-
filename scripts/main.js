let books = [];
let filteredBooks = [];

const bookList = document.getElementById('bookList');
const categoryFilter = document.getElementById('categoryFilter');
const languageFilter = document.getElementById('languageFilter');
const formatFilter = document.getElementById('formatFilter');
const searchInput = document.getElementById('searchInput');
const sortSelect = document.getElementById('sortSelect');

async function loadBooks() {
  const jsonlocation='../pages/data/books.json';
  const res = await fetch(jsonlocation);
  books = await res.json();
  filteredBooks = [...books];
  populateFilters();
  displayBooks(filteredBooks);
}

function populateFilters() {
  const categories = [...new Set(books.map(b => b.category))];
  const languages = [...new Set(books.map(b => b.language))];

  categories.forEach(c => {
    const opt = document.createElement('option');
    opt.value = c;
    opt.textContent = c;
    categoryFilter.appendChild(opt);
  });

  languages.forEach(l => {
    const opt = document.createElement('option');
    opt.value = l;
    opt.textContent = l;
    languageFilter.appendChild(opt);
  });
}

function displayBooks(bookArray) {
  bookList.innerHTML = `
    <div class="row">
  `;

  bookArray.forEach(book => {
    bookList.innerHTML += `
      <div class="col-md-4 d-flex mb-4">
        <div class="card h-100 w-100 d-flex flex-column">
          <img src="${book.cover}" class="card-img-top" alt="${book.title}" style="object-fit: cover; height: 200px;">
          <div class="card-body d-flex flex-column">
            <h5 class="card-title">${book.title}</h5>
            <p class="card-text mb-1"><strong>Author:</strong> ${book.author}</p>
            <p class="card-text mb-2">${book.description}</p>
            <div class="mb-2">
              <span class="badge bg-info me-1">${book.type}</span>
              <span class="badge bg-secondary me-1">${book.rating} ★</span>
              <span class="badge bg-dark">${book.isbn}</span>
            </div>
            <div class="mt-auto">
              <button class="btn btn-primary btn-sm w-100" onclick="showBookDetails('${book.title}')">View Details</button>
            </div>
          </div>
        </div>
      </div>
    `;
  });

  bookList.innerHTML += `</div>`;
}

function filterBooks() {
  const category = categoryFilter.value;
  const language = languageFilter.value;
  const format = formatFilter.value;
  const search = searchInput.value.toLowerCase();

  filteredBooks = books.filter(b => {
    return (
      (!category || b.category === category) &&
      (!language || b.language === language) &&
      (!format || b.format === format) &&
      (b.title.toLowerCase().includes(search) || b.author.toLowerCase().includes(search))
    );
  });

  sortBooks();
  displayBooks(filteredBooks);
}

function sortBooks() {
  const sortBy = sortSelect.value;
  if (sortBy === 'title') {
    filteredBooks.sort((a, b) => a.title.localeCompare(b.title));
  } else if (sortBy === 'author') {
    filteredBooks.sort((a, b) => a.author.localeCompare(b.author));
  } else if (sortBy === 'newest') {
    filteredBooks.reverse(); // assuming newest is last in JSON
  }
}

categoryFilter.addEventListener('change', filterBooks);
languageFilter.addEventListener('change', filterBooks);
formatFilter.addEventListener('change', filterBooks);
searchInput.addEventListener('input', filterBooks);
sortSelect.addEventListener('change', filterBooks);

loadBooks();