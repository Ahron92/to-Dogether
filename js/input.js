"use strict";

const input = document.querySelector(".input-wrap input");
const inputBtn = document.querySelector(".input-wrap i");
const items = document.querySelector(".todo__items");
let countId = 0;

function createItem() {
  const text = input.value;
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

  input.value = "";
  input.focus();
  item.scrollIntoView({ behavior: "smooth" });
  countId++;
}

input.addEventListener("keypress", (event) => {
  if (event.key === "Enter") {
    createItem();
  }
});

inputBtn.addEventListener("click", createItem);

items.addEventListener("click", (event) => {
  const target = event.target.dataset.id;
  if (target && event.target.classList[2] == "delete") {
    const deleteItem = document.querySelector(`.todo__item[data-id="${target}"]`);
    const sibling = document.querySelector(`.todo__item[data-id="${target}"] + .partition`);
    deleteItem.remove();
    sibling.remove();
  }
});
