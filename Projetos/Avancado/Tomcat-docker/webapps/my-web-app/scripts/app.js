const API_URL = 'http://www.omdbapi.com/?apikey=ff7e3dae';
const carouselContent = document.getElementById('carouselContent');
const searchForm = document.getElementById('searchForm');
const searchInput = document.getElementById('searchInput');

// Função para buscar filmes populares
async function fetchPopularMovies() {
  try {
    const response = await fetch(`${API_URL}&s=Avengers`);
    const data = await response.json();
    if (data.Response === "True") {
      displayMovies(data.Search);
    } else {
      displayError(data.Error);
    }
  } catch (error) {
    console.error('Erro ao buscar filmes populares:', error);
    displayError("Erro ao buscar filmes populares.");
  }
}

// Exibe os filmes no carrossel
function displayMovies(movies) {
  carouselContent.innerHTML = '';
  if (!movies || movies.length === 0) {
    displayError("Nenhum filme encontrado.");
    return;
  }
  movies.forEach((movie, index) => {
    const carouselItem = document.createElement('div');
    carouselItem.className = `carousel-item${index === 0 ? ' active' : ''}`;
    carouselItem.innerHTML = `
      <img src="${movie.Poster !== "N/A" ? movie.Poster : 'https://via.placeholder.com/300x450?text=No+Image'}" 
           class="d-block w-100" 
           alt="${movie.Title}">
      <div class="carousel-caption d-none d-md-block bg-dark bg-opacity-50 p-2 rounded">
        <h5>${movie.Title}</h5>
        <p>Year: ${movie.Year}</p>
      </div>
    `;
    carouselContent.appendChild(carouselItem);
  });
}

// Exibe mensagens de erro
function displayError(message) {
  carouselContent.innerHTML = `
    <div class="text-center py-4">
      <p class="text-danger">${message}</p>
    </div>
  `;
}

// Função para buscar filmes com base no termo de pesquisa
async function searchMovies(query) {
  try {
    const response = await fetch(`${API_URL}&s=${encodeURIComponent(query)}`);
    const data = await response.json();
    if (data.Response === "True") {
      displayMovies(data.Search);
    } else {
      displayError(data.Error);
    }
  } catch (error) {
    console.error('Erro ao buscar filmes:', error);
    displayError("Erro ao buscar filmes.");
  }
}

// Evento para a busca
searchForm.addEventListener('submit', (e) => {
  e.preventDefault();
  const query = searchInput.value.trim();
  if (query) {
    searchMovies(query);
  }
});

// Inicializa com filmes populares
fetchPopularMovies();
