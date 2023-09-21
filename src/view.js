const view = (() => {
    const UI = (() => {
        const addProjectBtn = document.querySelector('.addProject');
        const addTodoBtn = document.querySelector('.addTodo');
        const projectsDiv = document.querySelector('.projectsList');
        const todosListDiv = document.querySelector('.todosList');
        return {addProjectBtn, addTodoBtn, projectsDiv, todosListDiv};
    })();

    const projectDiv = (counter) => {
        const div = document.createElement('div');
        div.classList = 'item project';
        div.dataset.id = `${counter}`;
        div.tabIndex = '0';

        const titleLabel = document.createElement('span');
        div.appendChild(titleLabel);

        // Edit button
        const editBtn = document.createElement('img');
        editBtn.src = './images/edit.svg';
        // Remove button
        const removeBtn = document.createElement('img');
        removeBtn.src = './images/remove.svg';
        // Div to contain edit and remove buttons
        const buttons = document.createElement('div');
        buttons.classList.add('buttons');

        buttons.appendChild(editBtn);
        buttons.appendChild(removeBtn);

        return {div, titleLabel, editBtn, removeBtn, buttons};
    };

    // const todoDiv = (todoObj) => {
    //     const todoDiv = document.createElement('div');
    //     todoDiv.tabIndex = '0';

    //     const title = document.createElement('span');
    //     title.textContent = todoObj.title;
    //     todoDiv.appendChild(title);

    //     const removeBtn = document.createElement('img');
    //     removeBtn.src = './images/remove.svg';

    //     const editBtn = document.createElement('img');
    //     editBtn.src = './images/edit.svg';

    //     const buttons = document.createElement('div');
    //     buttons.classList.add('buttons');
    //     buttons.appendChild(editBtn);
    //     buttons.appendChild(removeBtn);

    //     // Selecting a project and populating the todos list with the project's todos
    //     todoDiv.addEventListener('click', () => {
    //         currentSelectedTodo = todoObj;
    //         todoDiv.classList.add('focus');
    //     });
    //     return {todoDiv, todoObj};
    // };
    return {UI, projectDiv}
})();

export {view};