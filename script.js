document.addEventListener("DOMContentLoaded", () => {
  fetch("saisons.json")
    .then((response) => response.json())
    .then((data) => {
      console.log(data.saisons);
      displaySaisons(data.saisons);
    })
    .catch((error) => console.error("Erreur de chargement du JSON :", error));
});

function displaySaisons(saisons) {
  const containerSaison = document.getElementById("saisons-container");

  saisons.forEach((saison) => {
    const saisonCard = document.createElement("div");
    containerSaison.appendChild(saisonCard);
    saisonCard.classList.add("saison-card");
    saisonCard.setAttribute("data-saison", saison.id);

    const saisonImg = document.createElement("img");
    saisonCard.appendChild(saisonImg);
    saisonImg.src = saison.image;
    saisonImg.alt = `Image de ${saison.titre}`;

    // Ajouter un événement pour afficher les épisodes
    saisonCard.addEventListener("click", () => {
      setTimeout(() => {
        containerSaison.style.display = "none";
        displayEpisodes(saison.episodes);
      }, 1000);
    });
  });
}

function displayEpisodes(episodes) {
  const container = document.getElementById("episodes-container");
  container.innerHTML = ""; // Clear the previous episodes

  episodes.forEach((episode) => {
    const episodeCard = document.createElement("div");
    episodeCard.classList.add("episode-card");
    episodeCard.innerHTML = `<h3>${episode.titre}</h3>  Episode ${episode.episode}</p>`;

    // Ajouter un événement pour ouvrir le modal avec l'épisode
    episodeCard.addEventListener("click", () => openModal(episode));
    container.appendChild(episodeCard);
  });
}

function openModal(episode) {
  const modal = document.getElementById("episodeModal");
  const title = document.getElementById("modal-title");
  const resume = document.getElementById("modal-resume");
  const carouselImg = document.getElementById("carousel-Img");
  const prevBtn = document.getElementById("prev");
  const nextBtn = document.getElementById("next");

  title.textContent = episode.titre;
  resume.textContent = episode.resume;

  let imgIndex = 0;
  carouselImg.src = episode.images[imgIndex];

  prevBtn.onclick = () => {
    imgIndex = (imgIndex - 1 + episode.images.length) % episode.images.length;
    carouselImg.src = episode.images[imgIndex];
  };

  nextBtn.onclick = () => {
    imgIndex = (imgIndex + 1) % episode.images.length;
    carouselImg.src = episode.images[imgIndex];
  };

  modal.style.display = "flex";

  document.querySelector(".close").onclick = () => {
    modal.style.display = "none";
  };

  window.onclick = (event) => {
    if (event.target === modal) modal.style.display = "none";
  };
}
