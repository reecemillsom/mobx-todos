import TODOs from './TODOs';
import TODO from "../TODO/TODO";

jest.mock('../TODO/TODO');

describe('TODOs', () => {
    beforeEach(() => {
        jest.clearAllMocks();
    });

    describe('when instantiating TODOs', () => {
        it('should set the default state correctly', () => {
            const todos = new TODOs();

            expect(todos).toEqual({
                todos: [],
            });
        });
    });

    describe('when creating a TODO', () => {
        it('should set the state correctly', () => {
            const todos = new TODOs();

            todos.createTodo();

            expect(todos.todos).toHaveLength(1);
        });
    });

    describe('when deleting a TODO', () => {
        it('should set the state correctly', () => {
            const todos = new TODOs();

            todos.createTodo();

            expect(todos.todos).toHaveLength(1);

            const todoId = todos.todos[0].id;

            todos.removeTodo(todoId);

            expect(todos.todos).toHaveLength(0);
        });
    });

    // // TODO get mocking of completed items working.
    // describe.skip('when getting completed items', () => {
    //     beforeAll(() => {
    //
    //     });
    //
    //     it('should set the state correctly', () => {
    //         const todos = new TODOs();
    //
    //         const todoItemOne = TODO.mockImplementationOnce(() => ({
    //             completed: true
    //         }));
    //
    //         console.log('todoOne>', todoItemOne);
    //
    //         const todoItemTwo = TODO.mockImplementationOnce(() => ({
    //             completed: true
    //         }));
    //
    //         console.log('todoTwo>', todoItemTwo);
    //
    //
    //         todos.todos = [todoItemOne, todoItemTwo];
    //
    //         console.log('TODOs>', todos.todos)
    //
    //         expect(todos.completedItems).toHaveLength(1);
    //     });
    // });
    //
    // describe.skip('when getting pending items', () => {
    //     beforeAll(() => {
    //
    //     });
    //
    //     it('should set the state correctly', () => {
    //         const todos = new TODOs();
    //
    //         const todoItemOne = TODO.mockImplementationOnce(() => ({
    //             completed: true
    //         }));
    //
    //         console.log('todoOne>', todoItemOne);
    //
    //         const todoItemTwo = TODO.mockImplementationOnce(() => ({
    //             completed: true
    //         }));
    //
    //         console.log('todoTwo>', todoItemTwo);
    //
    //
    //         todos.todos = [todoItemOne, todoItemTwo];
    //
    //         console.log('TODOs>', todos.todos)
    //
    //         expect(todos.pendingItems).toHaveLength(1);
    //     });
    // });

})