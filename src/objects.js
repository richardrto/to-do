const objects = (() => {
    const projectList = [];
    const project = (counter) => {
        const id = counter;
        const todoList = [];
        let title = 'Untitled Project';
        return {id, todoList, title};
    };

    const todo = () => {
        let title = 'Untitled Todo';
        return {title, description, dueDate, priority}
    }
    return {projectList, project, todo};
})();

export {objects};