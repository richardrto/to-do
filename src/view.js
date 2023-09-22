const view = (() => {
    const UI = (() => {
        const addProjectBtn = document.querySelector('.addProject');
        const addTodoBtn = document.querySelector('.addTodo');
        const projectsDiv = document.querySelector('.projectsList');
        const todoListDiv = document.querySelector('.todosList');
        const title = document.querySelector('.title');
        return {addProjectBtn, addTodoBtn, projectsDiv, todoListDiv, title};
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

    const todoDiv = (counter) => {
        const div = document.createElement('div');
        const checkbox = document.createElement('input');
        checkbox.type = 'checkbox';
        div.appendChild(checkbox);
        div.classList = 'item todo';
        div.dataset.id = `${counter}`;
        div.tabIndex = '0';

        const titleLabel = document.createElement('span');
        div.appendChild(titleLabel);

        return {div, titleLabel, checkbox};
    };

    return {UI, projectDiv, todoDiv}
})();

export {view};