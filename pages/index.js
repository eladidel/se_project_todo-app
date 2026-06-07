import { v4 as uuidv4 } from "https://jspm.dev/uuid";

import { initialTodos, validationConfig } from "../utils/constants.js";
import Todo from "../components/Todo.js";
import FormValidator from "../components/FormValidator.js";
import Section from "../components/Section.js";
import PopupWithForm from "../components/PopupWithForm.js";

const addTodoButton = document.querySelector(".button_action_add");
const addTodoPopupEl = document.querySelector("#add-todo-popup");
const addTodoForm = document.forms["add-todo-form"];
const todosList = document.querySelector(".todos__list");

const addTodoPopup = new PopupWithForm({
  popupSelector: "#add-todo-popup",
  handleFormSubmit: ({ name, date }) => {
    const id = uuidv4();

    const newDate = new Date(date);
    newDate.setMinutes(newDate.getMinutes() + newDate.getTimezoneOffset());

    const values = { name, newDate, id };

    section.renderItems([values]);
  },
});
addTodoPopup.setEventListeners();

const section = new Section({
  // items: initialTodos,
  renderer: (item) => {
    const todo = new Todo(item, "#todo-template");
    const todoElement = todo.getView();
    section.addItem(todoElement);
  },
  containerSelector: ".todos__list",
});

section.renderItems(initialTodos);

const newTodoValidator = new FormValidator(validationConfig, addTodoForm);
newTodoValidator.enableValidation();

addTodoButton.addEventListener("click", () => {
  addTodoPopup.open();
});

// const generateTodo = (data) => {
//   const todo = new Todo(data, "#todo-template");
//   const todoElement = todo.getView();
//   return todoElement;
// };

// function renderTodo(item) {
//   const todo = generateTodo(item);
//   section.addItem(todo);
// }
