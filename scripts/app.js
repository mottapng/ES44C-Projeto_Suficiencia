import { addPost, deletePost, fetchPosts, filterPosts } from "./postActions.js";
import { toggleAdd, togglePopup, toggleSearch } from "./menu.js";

/*  SELECTORS */
let btnMenu = document.getElementById("menu-btn");
let overlay = document.getElementById("overlay");

let btnSearch = document.getElementById("search-btn");
let btnCloseSearch = document.getElementById("close-search");
let searchOverlay = document.getElementById("search-overlay");

let btnAdd = document.getElementById("add-btn");
let btnCloseAdd = document.getElementById("close-add");
let addOverlay = document.getElementById("add-overlay");

let btnSubmitAdd = document.getElementById("add-submit");
let contentContainer = document.getElementsByClassName("content__container")[0];

let btnSubmitSearch = document.getElementById("search-submit");

/*  TRIGGERS */
btnMenu.addEventListener("click", togglePopup);
overlay.addEventListener("click", togglePopup);

btnSearch.addEventListener("click", toggleSearch);
btnCloseSearch.addEventListener("click", toggleSearch);
searchOverlay.addEventListener("click", toggleSearch);

btnAdd.addEventListener("click", toggleAdd);
btnCloseAdd.addEventListener("click", toggleAdd);
addOverlay.addEventListener("click", toggleAdd);

btnSubmitAdd.addEventListener("click", addPost);
contentContainer.addEventListener("click", deletePost);

btnSubmitSearch.addEventListener("click", filterPosts);

window.addEventListener("load", fetchPosts);
