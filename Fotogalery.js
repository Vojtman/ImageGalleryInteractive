document.addEventListener('DOMContentLoaded', () => {
    loadMoreItems(); // Inicializace načítání první série položek
});


async function fetchData() {
    try {
      const response = await fetch("https://api.thecatapi.com/v1/images/search?limit=3&api_key=live_8dDMduGOZvsGQzcDfsgCgLU9Ewyo9oFMGNNKUAXPuEGzH4Ze699lP9mfqnO4D45J");
      const data = await response.json();

      return data
    } 
    catch (error) {
      console.error(error)
    }
  }


async function loadMoreItems() {
    const container = document.getElementById('items-container');
    const loader = document.getElementById('loader');
    loader.style.display = 'block';

    try {
        for (let i= 0; i<3; i++){
        const items = await fetchData();
        const div = document.createElement('div');
        div.className = "column"
        container.appendChild(div);
        items.forEach(item => {
            div.innerHTML +=`<img src = "${item.url}" width="33%"">`;
        });
    }
    } finally {
        loader.style.display = 'none';
    }
}

window.onscroll = function(ev) {
    if ((window.innerHeight + window.pageYOffset) >= document.body.offsetHeight) {
        loadMoreItems()
    }
};