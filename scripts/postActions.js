import { toggleAdd, toggleSearch } from "./menu.js";

/*  SELECTORS */
let formAdd = document.getElementById("add-form");
let formSearch = document.getElementById("search-form");

/*  POST FUNCTIONS  */
export const addPost = (event) => {
  event.preventDefault();

  const titleValidated = validateField("title");
  const contentValidated = validateField("content");

  if (titleValidated && contentValidated) {
    const postId = createPost(
      formAdd.elements["title"].value,
      formAdd.elements["content"].value,
      null
    );

    storePost(formAdd.elements["title"].value, formAdd.elements["content"].value, postId);

    formAdd.elements["title"].value = "";
    formAdd.elements["content"].value = "";

    toggleAdd();
  }
};

export const deletePost = (event) => {
  const item = event.target;

  if (item.classList.contains("fa-trash-can")) {
    let post = event.target.parentElement.parentElement;
    deletePostById(post.dataset.id);
    post.remove();
  }
};

export const filterPosts = (event) => {
  event.preventDefault();

  const posts = document.getElementsByClassName("content__post");

  for (let post of posts) {
    let postTitle = post.getElementsByTagName("h2")[0].innerHTML.toLowerCase();
    let postDate = post.getElementsByClassName("content__post__date")[0].innerHTML.toLowerCase();

    let searchValue = formSearch.elements["query"].value.toLowerCase();

    let dateValue = new Date(formSearch.elements["date"].value);

    const options = { year: "numeric", month: "long", day: "numeric" };
    let formattedDate = dateValue.addDays(1).toLocaleDateString("en-US", options).toLowerCase();

    if (formattedDate == "invalid date") {
      formattedDate = "";
    }

    if (postTitle.indexOf(searchValue) > -1 && postDate.indexOf(formattedDate) > -1) {
      post.style.display = "block";
    } else {
      post.style.display = "none";
    }
  }

  toggleSearch();
};

/*  STORAGE FUNCTIONS  */
const storePost = (title, content, id) => {
  let posts = JSON.parse(localStorage.getItem("posts")) || [];

  posts.push({
    id: id,
    title: title,
    content: content
  });

  localStorage.setItem("posts", JSON.stringify(posts));
};

const deletePostById = (id) => {
  let posts = JSON.parse(localStorage.getItem("posts")) || [];

  posts = posts.filter((post) => {
    return post.id != id;
  });

  localStorage.setItem("posts", JSON.stringify(posts));
};

export const fetchPosts = () => {
  let posts = JSON.parse(localStorage.getItem("posts")) || [];

  for (let post of posts) {
    createPost(post.title, post.content, post.id);
  }
};

/*  UTILS  */
const createPost = (title, content, id) => {
  let contentContainer = document.getElementsByClassName("content__container")[0];

  const postContainer = document.createElement("div");
  postContainer.classList.add("content__post");

  const postHead = document.createElement("div");
  postHead.classList.add("content__post__head");

  const postTitle = document.createElement("h2");
  postTitle.innerHTML = title;

  const deleteIcon = document.createElement("i");
  deleteIcon.classList.add("fa-solid", "fa-trash-can");

  const postDate = document.createElement("p");
  postDate.classList.add("content__post__date");

  const currentDate = new Date();
  const options = { year: "numeric", month: "long", day: "numeric" };
  const formattedDate = currentDate.toLocaleDateString("en-US", options);
  postDate.innerHTML = formattedDate;

  const postExcerpt = document.createElement("p");
  postExcerpt.classList.add("content__post__excerpt");
  postExcerpt.innerHTML = content;

  postContainer.append(postHead, postDate, postExcerpt);
  postHead.append(postTitle, deleteIcon);

  contentContainer.prepend(postContainer);

  if (!id) postContainer.dataset.id = Date.now();
  else postContainer.dataset.id = id;

  return postContainer.dataset.id;
};

const validateField = (fieldName) => {
  let inputDiv = formAdd.elements[fieldName].parentElement;

  if (!formAdd.elements[fieldName].value) {
    inputDiv.classList.add(`${fieldName}-error`);
    inputDiv.parentElement.getElementsByTagName("p")[0].style.display = "block";
  } else {
    inputDiv.classList.remove(`${fieldName}-error`);
    inputDiv.parentElement.getElementsByTagName("p")[0].style.display = "none";
    return true;
  }

  return false;
};

Date.prototype.addDays = function (days) {
  var date = new Date(this.valueOf());
  date.setDate(date.getDate() + days);
  return date;
};
