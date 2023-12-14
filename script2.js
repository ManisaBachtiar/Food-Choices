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
      console.log(paginationContainer);
      let labelLink = document.querySelectorAll(".labelLink");
      labelLink.forEach((lnk) => {
        lnk.addEventListener("click", function () {
          let uriLink = this.dataset.uri;
          console.log(uriLink);
        });
      });
      // Menambahkan event listener untuk tombol "Next"
      let paginationNext = document.querySelector(".pagination-next");
      paginationNext.addEventListener("click", function () {
        fetchRecipes(nextPage);
      });

      // Menambahkan event listener untuk tombol "Previous"
      let paginationPrevious = document.querySelector(".pagination-previous");
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

// Now detailLinksArray is a regular array that you can manipulate
// Access the dataUri attribute and log it to the console

// detailLinks.addEventListener("click", function () {
//     // Access the dataUri attribute and log it to the console
//     const dataUri = this.getAttribute("dataUri");
//     console.log(dataUri);
//   });
// });

function showCards(m) {
  return `<div class="card">
    <img src="${m.recipe.image}" loading="lazy">
    <h5><a href="#" class="labelLink" data-uri="${m.recipe.uri}">${m.recipe.uri}</a></h5>
<p> ${m.recipe.mealType}</p>
  </div>`;
}

// Menampilkan elemen pagination
function showPagination() {
  return `<button class="pagination-previous">Previous</button>
    <button class="pagination-next">Next</button>`;
}
