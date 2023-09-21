const objects = (() => {
    const projectList = [];
    const project = (counter) => {
        const id = counter;
        let todoCounter = 0;
        let title = 'Untitled Project';
        const todoList = [];
        return {id, title, todoList, todoCounter};
    };

    const todo = (counter, div) => {
        const id = counter;
        let title = 'Untitled Todo';
        let description;
        let dueDate;
        let priority;
        return {id, title, description, dueDate, priority, div}
    }
    return {projectList, project, todo};
})();

export {objects};