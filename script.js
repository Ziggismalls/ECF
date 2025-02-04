let imagesBg = [
  "url('./assets/bgMenu.webp')",
  "url('./assets/bgMenu2.webp')",
  "url('./assets/bgMenu3.webp')",
];
let indexMenuBg = 0;

function changeImageBg() {
  document.body.style.backgroundImage = imagesBg[indexMenuBg];
  indexMenuBg = (indexMenuBg + 1) % imagesBg.length;
}

// Exécuter la fonction immédiatement
changeImageBg();

// Changer l'image toutes les 2 minutes (120000 ms)
setInterval(changeImageBg, 120000);

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

    const saisonBtn = document.getElementById("saisonBtn");
    h1.innerText = "Liste des Saisons";
    saisonBtn.addEventListener("click", () => {
      setTimeout(() => {
        saisonCard.style.animation = "fadeIn 2s";
        saisonCard.style.display = "flex";
        document.body.style.backgroundImage = "url('')";
        saisonBtn.style.visibility = "hidden";
        saisonBtn.style.animation = "fadeOut 2s";
        h1.style.animation = "fadeIn 2s";
        h1.style.visibility = "visible";
      }, 1000);
      saisonBtn.style.animation = "fadeOut 2s";
    });
    // Ajouter un événement pour afficher les épisodes
    saisonCard.addEventListener("click", () => {
      containerSaison.style.animation = "fadeOut 2s";
      h1.style.animation = "fadeOut 2s";
      setTimeout(() => {
        h1.style.visibility = "hidden";
        episodeContainer.style.animation = "fadeIn 2s";
        containerSaison.style.display = "none";
        displayEpisodes(saison.episodes);
      }, 1800);
      setTimeout(() => {
        h1.style.animation = "fadeIn 2s";
        h1.style.visibility = "visible";
        h1.innerText = "Liste des Episodes";
      }, 1800);
    });
  });
}
let episodeContainer = document.getElementById("episodes-container");
let h1 = document.querySelector("h1");

function displayEpisodes(episodes) {
  const container = document.getElementById("episodes-container");
  container.innerHTML = ""; // Clear the previous episodes
  let btnReturn = document.createElement("button");
  container.appendChild(btnReturn);
  btnReturn.classList.add("btnReturn");
  episodes.forEach((episode) => {
    const episodeCard = document.createElement("div");
    episodeCard.classList.add("episode-card");
    episodeCard.innerHTML = `<h3>${episode.titre}</h3>  Episode ${episode.episode}</p>`;
    episodeContainer.style.display = "flex";
    // Ajouter un événement pour ouvrir le modal avec l'épisode
    episodeCard.addEventListener("click", () => {
      const episodeModal = document.getElementById("episodeModal");
      episodeModal.style.animation = "fadeIn 1s";
      openModal(episode);
    });
    btnReturn.addEventListener("click", () => {
      episodeContainer.style.animation = "fadeOut 2s";
      h1.style.animation = "fadeOut 2s";

      setTimeout(() => {
        episodeContainer.style.display = "none";
        document.getElementById("saisons-container").style.animation =
          "fadeIn 2s";
        document.getElementById("saisons-container").style.display = "flex";
        h1.style.animation = "fadeIn 2s";
        h1.innerText = "Liste des Saisons";
      }, 1800);
    });
    btnReturn.addEventListener("dblclick", () => {
      episodeContainer.style.animation = "fadeOut 2s";
      h1.style.animation = "fadeOut 2s";
      setTimeout(() => {
        h1.style.visibility = "hidden";
        window.location.reload();
      }, 1700);
    });
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
    modal.style.animation = "fadeOut 1s";
    setTimeout(() => {
      modal.style.display = "none";
    }, 900);
  };

  window.onclick = (event) => {
    if (event.target === modal) modal.style.display = "none";
  };
}
