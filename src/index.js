import {view} from './view.js';
import {objects} from './objects.js';

const todoController = (() => {
    let projectCounter = 0;
    let todoCounter = 0;
    let currentSelectedTodo;
    let currentSelectedProject;
    let currentSelectedDiv;
    const projectList = objects.projectList;

    // First project to be created on page load
    createProject(projectCounter);

    // Create new projects on each button click
    view.UI.addProjectBtn.addEventListener('click', () => {createProject(projectCounter)});
    view.UI.addTodoBtn.addEventListener('click', () => {createTodo(todoCounter)});

    function createProject(counter) {
        // Create project object
        const project = objects.project(counter);
        currentSelectedProject = project;
        projectList.push(project);
        
        // Create project div and append to the projects list on the page
        const projectDiv = view.projectDiv(counter);
        projectDiv.titleLabel.textContent = project.title;
        view.UI.projectsDiv.insertBefore(projectDiv.div, view.UI.projectsDiv.firstChild);

        // Increment projectCounter to use as ID for next project to be created
        projectCounter++;

        // Add eventListener for when user clicks on the project div in list on page
        projectDiv.div.addEventListener('focus', () => {
            projectDiv.div.classList.add('focus');
            projectDiv.div.appendChild(projectDiv.buttons);

            // If there is a previously selected div (either from having just created one or user
            // has clicked on one, remove focus on the previously selected div and buttons)
            // Sometimes the div can lose focus but remain the currentSelectedDiv, so user will be
            // able to trigger another focus event by clicking on it, removing buttons the first
            // time. When another div is selected, the previous div will still be the
            // currentSelectedDiv, throwing an error when there are no more buttons to remove.
            // So, buttons will not be removed if a div loses focus and is "focused" again.
            if (currentSelectedDiv && currentSelectedDiv != projectDiv.div) {
                currentSelectedDiv.classList.remove('focus');
                currentSelectedDiv.querySelector('.buttons').remove();
                currentSelectedDiv.blur();
            }

            // Make this newly focused div the currently selected div
            currentSelectedDiv = projectDiv.div;

            // Assign currentSelectedProject according to which div was just selected. This will be
            // where the todos panel's list of todos will be coming from.
            currentSelectedProject = projectList[parseInt(projectDiv.div.dataset.id)];
            currentSelectedProject.todoList.forEach(todo => {
                todoListDiv.appendChild(todo.div);
            });
        });
            
        // Edit a project's title
        projectDiv.editBtn.addEventListener('click', () => {
            let userInput = prompt('Edit title:', projectDiv.titleLabel.textContent);
    
            if (userInput != null && userInput != undefined && userInput != '') {
                projectList[parseInt(projectDiv.div.dataset.id)].title = userInput;
                projectDiv.titleLabel.textContent = userInput;
                // Set currentSelectedDiv to undefined, as the line above which removes buttons
                // will throw an error when currentSelectedDiv still exists but has lost focus
                // due to prompt opening, meaning there will no longer be buttons to remove.
                currentSelectedDiv = undefined;
            } else {
                currentSelectedDiv = undefined;
            };
        });
    
        // Delete a project
        projectDiv.removeBtn.addEventListener('click', () => {
            const deleteProject = confirm('Are you sure you want to delete this project? Doing so will also delete any associated todos.');
            if (deleteProject) {
                view.UI.projectsDiv.removeChild(projectDiv.div);
                view.UI.todosListDiv.innerHTML = '';
            };
            // Set currentSelectedDiv to undefined, as the line above which removes buttons
            // will throw an error when currentSelectedDiv still exists but has lost focus
            // due to confirmation prompt opening, meaning there will no longer be buttons to
            // remove.
            currentSelectedDiv = undefined;
        });

        projectDiv.div.focus();
        return {project, projectDiv};
    }
})();