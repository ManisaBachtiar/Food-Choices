let previousPages = []; // Array baru untuk menyimpan halaman-halaman sebelumnya
let nextPage = null;

window.addEventListener("load", function () {
  // Membaca parameter URL
  const urlParams = new URLSearchParams(window.location.search);
  const queryParam = urlParams.get("query");

  if (queryParam) {
    // Jika terdapat parameter query, panggil fungsi fetchRecipes
    fetchRecipes(
      `https://api.edamam.com/api/recipes/v2?type=public&app_id=c16f14bf&app_key=afef254282056eb258798674f41e04d2&q=${queryParam}`,
    );
  } else {
    // Jika tidak ada parameter query, log pesan kesalahan
    console.error("Parameter query tidak ditemukan");
  }
});

function fetchRecipes(url) {
  // Mengambil data dari URL menggunakan fetch
  fetch(url)
    .then((response) => response.json())
    .then((data) => {
      let paginationPage = "";
      let foodSearch = data.hits;
      nextPage = data._links.next ? data._links.next.href : null;

      // Mengolah setiap hasil pencarian dan menambahkannya ke paginationPage
      foodSearch.forEach((n) => (paginationPage += showCards(n)));

      // Menampilkan hasil pencarian di dalam container yang sesuai
      let foodContainer = document.querySelector(".food-container");
      foodContainer.innerHTML = paginationPage;

      // Menyimpan respons lengkap ke dalam array previousPages
      previousPages.push({ url, data });

      // Menampilkan elemen pagination
      let paginationContainer = document.querySelector(".pagination-container");
      paginationContainer.innerHTML = showPagination();

      // Menambahkan event listener untuk tombol "Next"
      let paginationNext = document.querySelector(".pagination-button-next");
      paginationNext.addEventListener("click", function () {
        fetchRecipes(nextPage);
      });

      // Menambahkan event listener untuk tombol "Previous"
      let paginationPrevious = document.querySelector(
        ".pagination-button-previous",
      );
      paginationPrevious.addEventListener("click", function () {
        fetchPreviousData();
      });
    })
    .catch((error) => {
      // Menangani kesalahan jika terjadi
      console.error("Error fetching data:", error);
    });
}

function fetchPreviousData() {
  // Memeriksa apakah ada halaman sebelumnya yang tersimpan
  if (previousPages.length > 1) {
    previousPages.pop(); // Menghapus halaman saat ini dari array
    let previousPage = previousPages.pop(); // Mendapatkan halaman sebelumnya dari array
    fetchRecipes(previousPage.url);
  }
}

// Menampilkan kartu untuk setiap hasil pencarian
function showCards(m) {
  return `<div class="card">
    <img src="${m.recipe.image}" loading="lazy">
    <h5><a href="#">${m.recipe.label}</a></h5>
<p> ${m.recipe.mealType}</p>
  </div>`;
}

// Menampilkan elemen pagination
function showPagination() {
  return `<button class="pagination-button-previous">Previous</button>
    <button class="pagination-button-next">Next</button>`;
}
