const apiKey = 'AIzaSyBkmoP3XUpoOla6hNGDZDgRPENplJ4rcEk';
const channelId = 'UC8VKz15rOUKeQZ5qtt_HpXQ';
const maxResults = 24;
const videoContainer = document.getElementById('videoList');
const shortsContainer = document.getElementById('shortsList');
const projetosContainer = document.getElementById('projetosList');
const searchInput = document.getElementById('searchInput');

let allVideos = [];

// Busca dados do canal
async function fetchChannelInfo() {
  try {
    const url = `https://www.googleapis.com/youtube/v3/channels?part=snippet&id=${channelId}&key=${apiKey}`;
    const res = await fetch(url);
    const data = await res.json();
    const snippet = data.items[0].snippet;
    document.getElementById('canalFoto').src = snippet.thumbnails.high.url;
    document.getElementById('canalNome').textContent = snippet.title;
    document.getElementById('canalDescricao').textContent = snippet.description;
  } catch (error) {
    console.error('Erro ao buscar informações do canal:', error);
  }
}

// Busca vídeos do canal
async function fetchVideos() {
  try {
    const url = `https://www.googleapis.com/youtube/v3/search?key=${apiKey}&channelId=${channelId}&part=snippet&type=video&order=date&maxResults=${maxResults}`;
    const res = await fetch(url);
    const data = await res.json();
    return data.items || [];
  } catch (error) {
    console.error('Erro ao buscar vídeos:', error);
    return [];
  }
}

// Renderiza um vídeo em um container
function renderVideo(video, container, isShort = false) {
  const { title, description, thumbnails } = video.snippet;
  const videoId = video.id.videoId;

  const col = document.createElement('div');
  col.className = 'col-md-4 mb-4';
  col.innerHTML = `
    <div class="video-card p-3 h-100 position-relative">
      ${isShort ? `<span class="badge bg-danger position-absolute top-0 start-0 m-2">SHORT</span>` : ''}
      <a href="https://www.youtube.com/watch?v=${videoId}" target="_blank">
        <img src="${thumbnails.medium.url}" alt="${title}">
        <h5>${title}</h5>
        <p>${description.substring(0, 100)}...</p>
      </a>
    </div>
  `;
  container.appendChild(col);
}

// Exibe os vídeos divididos por tipo
function displayVideosByType(videos) {
  videoContainer.innerHTML = '';
  shortsContainer.innerHTML = '';
  projetosContainer.innerHTML = '';

  videos.forEach(video => {
    const title = video.snippet.title.toLowerCase();
    const desc = video.snippet.description.toLowerCase();
    const isShort = title.includes('#') || desc.includes('#') && !desc.includes('#tutorial');

    if (isShort) {
      renderVideo(video, shortsContainer, true);
    } else {
      renderVideo(video, videoContainer);
    }
  });
}

// Filtro de busca por título
searchInput.addEventListener('input', () => {
  const value = searchInput.value.toLowerCase();
  const filtered = allVideos.filter(video =>
    video.snippet.title.toLowerCase().includes(value)
  );
  displayVideosByType(filtered);
});

// Inicialização
async function init() {
  await fetchChannelInfo();
  allVideos = await fetchVideos();
  displayVideosByType(allVideos);
}

init();
