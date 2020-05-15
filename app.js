const tasks = [
  {
    _id: "task_1",
    title:
      "1 Lorem Ipsum is simply dummy text of the printing and typesetting industry.",
    body:
      "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged.",
    completed: false,
  },
  {
    _id: "task_2",
    title:
      "2 Lorem Ipsum is simply dummy text of the printing and typesetting industry.",
    body:
      "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged.",
    completed: false,
  },
  {
    _id: "task_3",
    title:
      "3 Lorem Ipsum is simply dummy text of the printing and typesetting industry.",
    body:
      "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged.",
    completed: false,
  },
  {
    _id: "task_4",
    title:
      "4 Lorem Ipsum is simply dummy text of the printing and typesetting industry.",
    body:
      "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged.",
    completed: false,
  },
];

(function (arrOfTask) {
  const obectOfTasks = arrOfTask.reduce((acc, task) => {
    acc[task._id] = task;
    return acc;
  }, {});

  //UI

  const listContainer = document.querySelector(
    ".task-list-section .list-group"
  );
  const form = document.forms["addTask"];
  const inputTitle = form.elements["title"];
  const inputBody = form.elements["body"];

  // Events

  form.addEventListener("submit", onFormSubmitHandler);
  renderAllTask(arrOfTask);
  listContainer.addEventListener("click", onDeleteHandler);
  listContainer.addEventListener("click", onCompletedHandler);

  function renderAllTask(taskList) {
    if (!taskList) {
      console.error("Нет задач!");
      return;
    }

    const fragment = document.createDocumentFragment();
    Object.values(taskList).forEach((task) => {
      const li = listItemTemplate(task);
      listContainer.appendChild(li);
    });
  }

  function listItemTemplate({ _id, title, body }) {
    const li = document.createElement("li");
    li.classList.add(
      "list-group-item",
      "d-flex",
      "align-items-center",
      "flex-wrap"
    );
    li.setAttribute("data-task-id", _id);

    const span = document.createElement("span");
    span.textContent = title;
    span.style.fontWeight = "bold";

    const deleteBtn = document.createElement("button");
    deleteBtn.textContent = "Удалить";
    deleteBtn.classList.add("btn", "btn-danger", "btn-delete", "ml-auto");

    const doneBtn = document.createElement("button");
    doneBtn.textContent = "Сделано";
    doneBtn.classList.add("btn", "btn-success", "btn-done", "ml-auto");

    const article = document.createElement("p");
    article.textContent = body;
    article.classList.add("w-100", "mt-2");

    li.appendChild(span);
    li.appendChild(doneBtn);
    li.appendChild(deleteBtn);
    li.appendChild(article);

    return li;
  }

  function onFormSubmitHandler(e) {
    e.preventDefault();
    const titleValue = inputTitle.value;
    const bodyValue = inputBody.value;
    if (!titleValue || !bodyValue) {
      alert("Заполните все поля");
      return;
    }
    const task = createNewTask(titleValue, bodyValue);
    const listItem = listItemTemplate(task);
    listContainer.insertAdjacentElement("afterbegin", listItem);
    form.reset();
  }

  function createNewTask(title, body) {
    const newTask = {
      title,
      body,
      completed: false,
      _id: `task_${Math.random()}`,
    };
    obectOfTasks[newTask._id] = newTask;
    return { ...newTask };
  }

  function deleteTask(id) {
    const { title } = obectOfTasks[id];
    const isConfirm = confirm(
      `Вы действительно хотите удалить задачу ${title} ?`
    );
    if (!isConfirm) {
      return isConfirm;
    } else {
      delete obectOfTasks[id];
      return isConfirm;
    }
  }

  function deleteTaskFormHtml(confirmed, el) {
    if (!confirmed) {
      return;
    } else {
      el.remove();
    }
  }

  function onDeleteHandler({ target }) {
    if (target.classList.contains("btn-delete")) {
      const parent = target.closest("[data-task-id]");
      const id = parent.dataset.taskId;
      const confirmed = deleteTask(id);
      deleteTaskFormHtml(confirmed, parent);
    }
  }

  function onCompletedHandler({ target }) {
    if (target.classList.contains("btn-done")) {
      const parent = target.closest("[data-task-id]");
      const id = parent.dataset.taskId;
      obectOfTasks[id].completed = true;
      parent.style.background = "green";
    }
  }
})(tasks);
