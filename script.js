const galleryCards = Array.from(document.querySelectorAll(".gallery-card"));
const modal = document.querySelector("#imageModal");
const modalImage = document.querySelector("#modalImage");
const closeButton = document.querySelector(".modal-close");
const prevButton = document.querySelector(".modal-prev");
const nextButton = document.querySelector(".modal-next");
let activeIndex = 0;

function openModal(index) {
  activeIndex = index;
  const card = galleryCards[activeIndex];
  const label = card.dataset.label || "시공 사례";
  modalImage.src = card.dataset.src;
  modalImage.alt = `천년석재 ${label} 이미지`;
  modal.hidden = false;
  document.body.style.overflow = "hidden";
}

function closeModal() {
  modal.hidden = true;
  document.body.style.overflow = "";
}

function moveImage(direction) {
  activeIndex = (activeIndex + direction + galleryCards.length) % galleryCards.length;
  openModal(activeIndex);
}

galleryCards.forEach((card, index) => {
  card.addEventListener("click", () => openModal(index));
});

closeButton.addEventListener("click", closeModal);
prevButton.addEventListener("click", () => moveImage(-1));
nextButton.addEventListener("click", () => moveImage(1));

modal.addEventListener("click", (event) => {
  if (event.target === modal) {
    closeModal();
  }
});

document.addEventListener("keydown", (event) => {
  if (modal.hidden) {
    return;
  }

  if (event.key === "Escape") {
    closeModal();
  }

  if (event.key === "ArrowLeft") {
    moveImage(-1);
  }

  if (event.key === "ArrowRight") {
    moveImage(1);
  }
});
