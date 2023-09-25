/*  SELECTORS  */
let overlay = document.getElementById("overlay");
let popup = document.getElementById("menu-popup");

let modalSearch = document.getElementById("modal-search");
let searchOverlay = document.getElementById("search-overlay");

let modalAdd = document.getElementById("modal-add");
let addOverlay = document.getElementById("add-overlay");

/*  MENU FUNCTIONS  */
export const togglePopup = () => {
  if (popup.style.display == "block") {
    popup.style.display = "none";
    toggleOverlay();
  } else {
    popup.style.display = "block";
    toggleOverlay();
  }
};

export const toggleOverlay = () => {
  if (overlay.style.display == "block") {
    overlay.style.display = "none";
  } else {
    overlay.style.display = "block";
  }
};

export const toggleSearch = () => {
  if (modalSearch.style.display == "block") {
    modalSearch.style.display = "none";
    searchOverlay.style.display = "none";
  } else {
    modalSearch.style.display = "block";
    searchOverlay.style.display = "block";
    togglePopup();
  }
};

export const toggleAdd = () => {
  if (modalAdd.style.display == "block") {
    modalAdd.style.display = "none";
    addOverlay.style.display = "none";
  } else {
    modalAdd.style.display = "block";
    addOverlay.style.display = "block";
    togglePopup();
  }
};
