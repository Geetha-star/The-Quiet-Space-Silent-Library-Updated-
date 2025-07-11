$(function() {
  $("#header").load("../pages/header.html");
  $("#footer").load("../pages/footer.html");
});
// scripts/script.js
$(document).ready(function () {
  $("#header").html(`
    <header>
      <h2>The Quiet Space Silent Library</h2>
      <nav>
        <a href="index.html" class="btn btn-light mx-2">Home</a>
        <a href="books.html" class="btn btn-light mx-2">Books</a>
        <a href="events.html" class="btn btn-light mx-2">Events</a>
        <a href="contact.html" class="btn btn-light mx-2">Contact</a>
      </nav>
    </header>
  `);

  $("#footer").html(`
    <footer>
      <p>&copy; 2025 The Quiet Space. All rights reserved.</p>
      <p>Follow us:
        <a href="#">Instagram</a> |
        <a href="#">Facebook</a> |
        <a href="#">YouTube</a>
      </p>
    </footer>
  `);
});
function handleSearch() {
  const query = document.getElementById('searchInput').value;
  if (query) {
    alert("Searching for: " + query); // Replace with redirect logic later
    // Example: window.location.href = `search.html?q=${encodeURIComponent(query)}`;
  } else {
    alert("Please enter a search term.");
  }
}
