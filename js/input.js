"use strict";

const input = document.querySelector(".input-wrap input");
const inputBtn = document.querySelector(".input-wrap i");
const items = document.querySelector(".todo__items");
let countId = 0;
let localData = [];

function createItem(text) {
  if (text === "") {
    return;
  }

  const item = document.createElement("li");
  const content = document.createElement("span");
  const delBtn = document.createElement("i");
  const partition = document.createElement("div");

  item.setAttribute("class", "todo__item");
  item.setAttribute("data-id", countId);
  content.setAttribute("class", "todo__content");
  content.textContent = text;
  delBtn.classList.add("fas", "fa-trash-alt", "delete");
  delBtn.setAttribute("data-id", countId);
  partition.setAttribute("class", "partition");

  items.appendChild(item);
  items.appendChild(partition);

  item.appendChild(content);
  item.appendChild(delBtn);

  const toDoObj = {
    text: text,
  };
  localData.push(toDoObj);

  input.focus();
  item.scrollIntoView({ behavior: "smooth" });

  saveTodo();
  input.value = "";
  countId++;
}

function saveTodo() {
  localStorage.removeItem("itemList");
  localStorage.setItem("itemList", JSON.stringify(localData));
}
function loadTodo() {
  const load = JSON.parse(localStorage.getItem("itemList"));
  if (load !== null) {
    load.forEach((itemList) => {
      createItem(itemList.text);
    });
  }
}

function init() {
  loadTodo();
}

input.addEventListener("keypress", (event) => {
  if (event.key === "Enter") {
    createItem(input.value);
  }
});

inputBtn.addEventListener("click", () => {
  createItem(input.value);
});

items.addEventListener("click", (event) => {
  const target = event.target.dataset.id;
  if (target && event.target.classList[2] == "delete") {
    const deleteItem = document.querySelector(`.todo__item[data-id="${target}"]`);
    const text = document.querySelector(`.todo__item[data-id="${target}"] .todo__content`);
    const sibling = document.querySelector(`.todo__item[data-id="${target}"] + .partition`);
    const removeText = text.textContent;
    localData.forEach((key, index) => {
      if (key.text === removeText) {
        localData.splice(index, 1);
        saveTodo();
      }
    });

    deleteItem.remove();
    sibling.remove();
  }
});

init();
