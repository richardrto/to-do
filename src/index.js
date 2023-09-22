import {view} from './view.js';
import {objects} from './objects.js';

const todoController = (() => {
    let projectCounter = 0;

    let currentSelectedProject;
    let currentSelectedProjectDiv;

    let currentSelectedTodo;
    let currentSelectedTodoDiv;
    let currentTodoList;

    const todoListDiv = view.UI.todoListDiv;
    const projectList = objects.projectList;

    // First project to be created on page load
    createProject(projectCounter);

    // Create new projects/todos on each button click
    view.UI.addProjectBtn.addEventListener('click', () => {createProject(projectCounter)});
    view.UI.addTodoBtn.addEventListener('click', () => {createTodo(currentSelectedProject.todoCounter)});

    function createProject(counter) {
        const project = objects.project(counter);
        currentSelectedProject = project;
        currentTodoList = project.todoList;
        projectList.push(project);
        
        // Create project div and append to the projects list on the page
        const projectDiv = view.projectDiv(counter);
        projectDiv.titleLabel.textContent = project.title;
        view.UI.projectsDiv.insertBefore(projectDiv.div, view.UI.projectsDiv.firstChild);

        // Increment projectCounter to use as ID for next project to be created
        projectCounter++;

        // Handles all events when the specific project div is focused
        projectDiv.div.addEventListener('focus', () => {
            projectDiv.div.classList.add('focus');
            projectDiv.div.appendChild(projectDiv.buttons);

            // If there is a previously selected div (either from having just created one or user
            // has clicked on one, remove focus on the previously selected div and buttons)
            // Sometimes the div can lose focus but remain the currentSelectedProjectDiv, so user will be
            // able to trigger another focus event by clicking on it, removing buttons the first
            // time. When another div is selected, the previous div will still be the
            // currentSelectedProjectDiv, throwing an error when there are no more buttons to remove.
            // So, buttons will not be removed if a div loses focus and is "focused" again.
            if (currentSelectedProjectDiv && currentSelectedProjectDiv != projectDiv.div) {
                currentSelectedProjectDiv.classList.remove('focus');
                currentSelectedProjectDiv.querySelector('.buttons').remove();
                currentSelectedProjectDiv.blur();
            }

            // Make this newly focused div the currently selected div
            currentSelectedProjectDiv = projectDiv.div;
            // Assign currentSelectedProject according to which div was just selected. This will be
            // where the todos panel's list of todos will be coming from.
            currentSelectedProject = projectList[parseInt(currentSelectedProjectDiv.dataset.id)];

            todoListDiv.textContent = '';
            currentTodoList = currentSelectedProject.todoList;
            currentTodoList.forEach(todo => {
                todoListDiv.appendChild(todo.div);
            });
        });
            
        // Edit a project's title
        projectDiv.editBtn.addEventListener('click', () => {
            let userInput = prompt('Edit title:', projectDiv.titleLabel.textContent);
    
            if (userInput != null && userInput != undefined && userInput != '') {
                projectList[parseInt(projectDiv.div.dataset.id)].title = userInput;
                projectDiv.titleLabel.textContent = userInput;
                // Set currentSelectedProjectDiv to undefined, as the line above which removes buttons
                // will throw an error when currentSelectedProjectDiv still exists but has lost focus
                // due to prompt opening, meaning there will no longer be buttons to remove.
                currentSelectedProjectDiv = undefined;
            } else {
                currentSelectedProjectDiv = undefined;
            };
        });
    
        // Delete a project
        projectDiv.removeBtn.addEventListener('click', () => {
            const deleteProject = confirm('Are you sure you want to delete this project? Doing so will also delete any associated todos.');
            if (deleteProject) {
                currentSelectedProject.todoList.length = 0;
                view.UI.projectsDiv.removeChild(projectDiv.div);
            };
            // Set currentSelectedProjectDiv to undefined, as the line above which removes buttons
            // will throw an error when currentSelectedProjectDiv still exists but has lost focus
            // due to confirmation prompt opening, meaning there will no longer be buttons to
            // remove.
            currentSelectedProjectDiv = undefined;
        });

        projectDiv.div.focus();
        return {project, projectDiv};
    }

    function createTodo(counter) {
        const todo = objects.todo(counter);
        currentSelectedProject.todoList.unshift(todo);

        // Create todo div and append to the todos list on the page
        const todoDiv = view.todoDiv(counter);
        todoDiv.titleLabel.textContent = todo.title;
        todoListDiv.insertBefore(todoDiv.div, todoListDiv.firstChild);
        todo.div = todoDiv.div;
        
        // Increment todoCounter to use as ID for next todo to be created
        currentSelectedProject.todoCounter++;

        // Add eventListener for when user clicks on the todo div in list on page
        todoDiv.div.addEventListener('focus', () => {
            todoDiv.div.classList.add('focus');
            if (currentSelectedTodoDiv && currentSelectedTodoDiv != todoDiv.div) {
                currentSelectedTodoDiv.classList.remove('focus');
                currentSelectedTodoDiv.blur();
            }
            // Make this newly focused div the currently selected div
            currentSelectedTodoDiv = todoDiv.div;

            currentSelectedTodo = Array.prototype.find.call(currentTodoList, todo => todo.div.dataset.id == currentSelectedTodoDiv.dataset.id);
            view.UI.title.textContent = currentSelectedTodo.title;
        });

        todoDiv.checkbox.addEventListener('change', () => {
            if (todoDiv.checkbox.checked) {
                currentTodoList.push(currentSelectedProject.todoList.splice(Array.prototype.indexOf.call(todoListDiv.childNodes, todoDiv.div), 1)[0]);
                todoListDiv.textContent = '';
                currentTodoList.forEach(todo => {
                    todoListDiv.appendChild(todo.div);
                });
                todoDiv.div.style.textDecoration = 'line-through';
            } else {
                todoDiv.div.style.textDecoration = 'none';
                // todoListDiv.insertBefore(todoDiv.div, todoListDiv.firstChild);
                currentTodoList.unshift(currentTodoList.splice(Array.prototype.indexOf.call(todoListDiv.childNodes, todoDiv.div), 1)[0]);
                currentSelectedProject.todoList.forEach(todo => {
                    todoListDiv.appendChild(todo.div);
                });
            }
        })

        // // Edit a todo's title
        // todoDiv.editBtn.addEventListener('click', () => {
        //     let userInput = prompt('Edit title:', todoDiv.titleLabel.textContent);
    
        //     if (userInput != null && userInput != undefined && userInput != '') {
        //         todoList[parseInt(todoDiv.div.dataset.id)].title = userInput;
        //         todoDiv.titleLabel.textContent = userInput;
        //         // Set currentSelectedTodoDiv to undefined, as the line above which removes buttons
        //         // will throw an error when currentSelectedTodoDiv still exists but has lost focus
        //         // due to prompt opening, meaning there will no longer be buttons to remove.
        //         currentSelectedTodoDiv = undefined;
        //     } else {
        //         currentSelectedTodoDiv = undefined;
        //     };
        // });
    
        // // Delete a todo
        // todoDiv.removeBtn.addEventListener('click', () => {
        //     const deleteTodo = confirm('Are you sure you want to delete this todo? Doing so will also delete any associated todos.');
        //     if (deleteTodo) {
        //         todoListDiv.removeChild(todoDiv.div);
        //         view.UI.todosListDiv.innerHTML = '';
        //     };
        //     // Set currentSelectedTodoDiv to undefined, as the line above which removes buttons
        //     // will throw an error when currentSelectedTodoDiv still exists but has lost focus
        //     // due to confirmation prompt opening, meaning there will no longer be buttons to
        //     // remove.
        //     currentSelectedTodoDiv = undefined;
        // });
        todoDiv.div.focus();
        return {todo, todoDiv};
    };
})();