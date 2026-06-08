import { v4 as uuidv4 } from "https://jspm.dev/uuid";

import { initialTodos, validationConfig } from "../utils/constants.js";
import Todo from "../components/Todo.js";
import FormValidator from "../components/FormValidator.js";
import Section from "../components/Section.js";
import PopupWithForm from "../components/PopupWithForm.js";
import TodoCounter from "../components/TodoCounter.js";

const addTodoButton = document.querySelector(".button_action_add");
const addTodoForm = document.forms["add-todo-form"];
const todoCounter = new TodoCounter(initialTodos, ".counter__text");

const addTodoPopup = new PopupWithForm(
  {
    popupSelector: "#add-todo-popup",
    handleFormSubmit: ({ name, date }) => {
      const id = uuidv4();

      const newDate = new Date(date);
      newDate.setMinutes(newDate.getMinutes() + newDate.getTimezoneOffset());

      const values = { name, date: newDate, id };
      renderTodo(values);
      handleTotal(true);
      newTodoValidator.resetValidation();
    },
  },
  "add-todo-form",
);

addTodoPopup.setEventListeners();

function handleCheck(completed) {
  todoCounter.updateCompleted(completed);
}

function handleTotal(increment) {
  todoCounter.updateTotal(increment);
}

const generateTodo = (data) => {
  const todo = new Todo(data, "#todo-template", handleCheck, handleTotal);
  const todoElement = todo.getView();
  return todoElement;
};

function renderTodo(item) {
  const todo = generateTodo(item);
  section.addItem(todo);
}

const section = new Section({
  items: initialTodos,
  renderer: (item) => {
    renderTodo(item);
  },
  containerSelector: ".todos__list",
});

section.renderItems();

const newTodoValidator = new FormValidator(validationConfig, addTodoForm);

newTodoValidator.enableValidation();

addTodoButton.addEventListener("click", () => {
  addTodoPopup.open();
});
