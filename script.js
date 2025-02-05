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
    const accueilBtn = document.getElementById("accueilBtn");
    const footer = document.querySelector("footer");
    const nav = document.querySelector("nav");

    const footerP = document.getElementById("footerP");
    h1.innerText = "Liste des Saisons";
    saisonBtn.addEventListener("click", () => {
      setTimeout(() => {
        saisonCard.style.animation = "fadeIn 1s";
        saisonCard.style.display = "flex";
        saisonBtn.style.visibility = "hidden";
        accueilBtn.style.visibility = "hidden";
        h1.style.animation = "fadeIn 1s";
        h1.style.visibility = "visible";
        nav.style.visibility = "hidden";
        footer.style.visibility = "visible";
        footerP.style.visibility = "visible";
      }, 500);
      document.body.classList.add("blurBg");
      nav.style.animation = "fadeOut 1s";
      accueilBtn.style.animation = "fadeOut 1s";
      saisonBtn.style.animation = "fadeOut 1s";
    });

    accueilBtn.addEventListener("click", () => {
      window.location.reload();
    });

    // Ajouter un événement pour afficher les épisodes
    saisonCard.addEventListener("click", () => {
      containerSaison.style.animation = "fadeOut 1s";
      h1.style.animation = "fadeOut 1s";
      document.body.classList.add("blurBg");

      setTimeout(() => {
        h1.style.visibility = "hidden";
        episodeContainer.style.animation = "fadeIn 1s";
        containerSaison.style.display = "none";
        displayEpisodes(saison.episodes);
      }, 800);
      setTimeout(() => {
        h1.style.animation = "fadeIn 1s";
        h1.style.visibility = "visible";
        h1.innerText = "Liste des Episodes";
      }, 800);
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
      episodeContainer.style.display = "none";
      openModal(episode);
    });
    btnReturn.addEventListener("click", () => {
      document.body.classList.add("blurBg");
      episodeContainer.style.animation = "fadeOut 1s";
      h1.style.animation = "fadeOut 1s";

      setTimeout(() => {
        episodeContainer.style.display = "none";
        document.getElementById("saisons-container").style.animation =
          "fadeIn 1s";
        document.getElementById("saisons-container").style.display = "flex";
        h1.style.animation = "fadeIn 1s";
        h1.innerText = "Liste des Saisons";
      }, 800);
    });
    btnReturn.addEventListener("dblclick", () => {
      episodeContainer.style.animation = "fadeOut 2s";
      h1.style.animation = "fadeOut 1s";
      setTimeout(() => {
        h1.style.visibility = "hidden";
        window.location.reload();
      }, 700);
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
      episodeContainer.style.display = "flex";

      modal.style.display = "none";
    }, 900);
  };
}
