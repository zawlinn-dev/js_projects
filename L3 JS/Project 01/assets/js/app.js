const images = document.querySelectorAll(".image"),
  modalItems = document.querySelector(".modal_items"),
  modalContainer = document.querySelector(".modal_container"),
  modalBackground = document.querySelector(".modal_background"),
  btnClose = document.querySelector(".btn_close"),
  viewImage = document.querySelector(".view_image"),
  caption = document.querySelector(".captions"),
  counter = document.querySelector(".counter");

let isChild = true,
  numId = 0;

// Init project

function init() {
  images.forEach((val) => {
    val.addEventListener("click", function (e) {
      showModal();

      if (isChild) {
        createSlideItems();
        isChild = false;
      }

      numId = e.target.alt.slice(-1);

      updateCaption(numId);
    });
  });

  closeModal();
}

// Create slide Items Function
function createSlideItems() {
  images.forEach((val, ind) => {
    const context = `
    <figure class="modal_item_img">
        <img src="${val.src}" alt="Image - 0${ind + 1}" />
    </figure>
    `;
    modalItems.insertAdjacentHTML("beforeend", context);
  });
}

// Close Modal Function
function closeModal() {
  document.addEventListener("click", (e) => {
    if (e.target === modalBackground) {
      hideModal();
    }

    if (e.target.src) {
      numId = e.target.alt.slice(-1);

      showImgView(numId);

      updateCaption(numId);
    }

    if (e.target.classList.contains("btn_close")) {
      hideModal();
    }

    if (e.target.classList.contains("prev_icon")) {
      numId--;
      if (numId < 1) {
        numId = images.length;
      }
      showImgView(numId);
      updateCaption(numId);
      console.log(numId, true);
    }

    if (e.target.classList.contains("next_icon")) {
      numId++;
      if (numId > images.length) {
        numId = 1;
      }
      showImgView(numId);
      updateCaption(numId);
      console.log(numId, true);
    }
  });
}

// Update Status Function
function updateCaption(e) {
  const slideImg = document.querySelectorAll(".modal_item_img");

  if (slideImg) {
    slideImg.forEach((val) => val.classList.remove("activeImg"));

    counter.textContent = `${e}/6`;
    caption.textContent = images[e - 1].alt;

    slideImg[e - 1].classList.add("activeImg");
  }
}

// Show Modal Function
function showModal() {
  modalContainer.classList.add("active");
}

// Hide Modal Function
function hideModal() {
  modalContainer.classList.remove("active");
}

// Show View Image Function
function showImgView(e) {
  viewImage.src = images[e - 1].src;
  viewImage.alt = `Iamge - 0${e}`;
  modalBackground.style.background = `linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.6)), url(${
    images[e - 1].src
  }) no-repeat center/cover`;
}

// Init Main Function
init();
