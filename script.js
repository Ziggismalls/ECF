document.addEventListener("DOMContentLoaded", () => {
  fetch("saisons.json")
    .then((response) => response.json())
    .then((data) => {
      console.log(data.saisons);
      displaySaisons(data.saisons);
    })
    .catch((error) => console.error("Erreur de chargement du JSON :", error));
});
const spansBtn = document.getElementById("spansBtn");
const menuBg = document.getElementById("menuBg");
spansBtn.addEventListener("click", (event) => {
  menuBg.classList.toggle("navBarSlide");
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
    const main = document.querySelector("main");

    const footerP = document.getElementById("footerP");
    h1.innerText = "Liste des Saisons";
    saisonBtn.addEventListener("click", () => {
      setTimeout(() => {
        main.style.display = "flex";
        saisonCard.style.animation = "fadeIn 1s";
        saisonCard.style.display = "flex";
        h1.style.animation = "fadeIn 1s";
        h1.style.visibility = "visible";
        footer.style.visibility = "visible";
        footerP.style.visibility = "visible";
        document.body.classList.add("blurBg");
      }, 500);
      menuBg.classList.remove("navBarSlide");
    });

    accueilBtn.addEventListener("click", () => {
      menuBg.classList.remove("navBarSlide");
      setTimeout(() => {
        window.location.reload();
      }, 900);
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
  let btnReturn = document.createElement("button");
  container.innerHTML = ""; // Vider le container avec les épisodes

  container.appendChild(btnReturn);
  btnReturn.classList.add("btnReturn");

  episodes.forEach((episode) => {
    const episodeCard = document.createElement("div");
    episodeCard.classList.add("episode-card");
    episodeCard.innerHTML = `<h3>${episode.titre}</h3>  Episode ${episode.episode}</p>`;
    episodeContainer.style.display = "flex";
    container.appendChild(episodeCard);

    // Ajouter un événement pour ouvrir le modal avec l'épisode

    episodeCard.addEventListener("click", () => {
      const episodeModal = document.getElementById("episodeModal");
      episodeModal.style.animation = "fadeIn 1s";
      h1.style.animation = "fadeOut 1s";
      episodeContainer.style.animation = "fadeOut 1s";
      setTimeout(() => {
        h1.style.visibility = "hidden";
        episodeContainer.style.display = "none";
        openModal(episode);
      }, 800);
    });

    btnReturn.addEventListener("click", () => {
      document.body.classList.add("blurBg");
      episodeContainer.style.animation = "fadeOut 1s";
      h1.style.animation = "fadein .5s";
      setTimeout(() => {
        h1.style.visibility = "visible";
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
    h1.style.animation = "fadeIn 1s";
    episodeContainer.style.animation = "fadeIn 1s";
    setTimeout(() => {
      episodeContainer.style.display = "flex";
      h1.style.visibility = "visible";
      modal.style.display = "none";
    }, 900);
  };
}
const logoGot = document.getElementById("logoGot");
logoGot.addEventListener("click", () => {
  window.open("https://fr.wikipedia.org/wiki/Game_of_Thrones", "_blank");
});
