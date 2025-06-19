const apiKey = 'AIzaSyBkmoP3XUpoOla6hNGDZDgRPENplJ4rcEk';
const channelId = 'UC8VKz15rOUKeQZ5qtt_HpXQ';
const videoContainer = document.getElementById('videoList');
const searchInput = document.getElementById('searchInput');

async function fetchChannelInfo() {
  const url = `https://www.googleapis.com/youtube/v3/channels?part=snippet&id=${channelId}&key=${apiKey}`;
  const res = await fetch(url);
  const data = await res.json();
  const snippet = data.items[0].snippet;
  document.getElementById('canalFoto').src = snippet.thumbnails.high.url;
  document.getElementById('canalNome').textContent = snippet.title;
  document.getElementById('canalDescricao').textContent = snippet.description;
}

async function fetchAllVideos(pageToken = '', videos = []) {
  const url = `https://www.googleapis.com/youtube/v3/search?key=${apiKey}&channelId=${channelId}&part=snippet,id&order=date&maxResults=50&pageToken=${pageToken}`;
  const res = await fetch(url);
  const data = await res.json();
  const newVideos = data.items.filter(item => item.id.kind === 'youtube#video');
  videos = videos.concat(newVideos);
  if (data.nextPageToken) {
    return fetchAllVideos(data.nextPageToken, videos);
  }
  return videos;
}

function displayVideos(videos) {
  videoContainer.innerHTML = '';
  videos.forEach(video => {
    const { title, description, thumbnails } = video.snippet;
    const videoId = video.id.videoId;
    const col = document.createElement('div');
    col.className = 'col-md-4 mb-4';
    col.innerHTML = `
      <div class="video-card p-3 h-100">
        <a href="https://www.youtube.com/watch?v=${videoId}" target="_blank">
          <img src="${thumbnails.medium.url}" alt="${title}">
          <h5>${title}</h5>
          <p>${description.substring(0, 100)}...</p>
        </a>
      </div>
    `;
    videoContainer.appendChild(col);
  });
  return videos;
}

let allVideos = [];

searchInput.addEventListener('input', () => {
  const value = searchInput.value.toLowerCase();
  const filtered = allVideos.filter(video =>
    video.snippet.title.toLowerCase().includes(value)
  );
  displayVideos(filtered);
});

async function init() {
  await fetchChannelInfo();
  allVideos = await fetchAllVideos();
  displayVideos(allVideos);
}

init();