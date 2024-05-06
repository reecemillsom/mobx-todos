import TODO from '../TODO/TODO';
import TODOs from './TODOs';

jest.mock('../TODO/TODO');

describe('TODOs', () => {
    beforeEach(() => {
        jest.clearAllMocks();
    });

    describe('when instantiating TODOs', () => {
        it('should set the default state correctly', () => {
            const todos = new TODOs();

            expect(todos.todos).toHaveLength(4);
        });
    });

    describe('when creating a TODO', () => {
        it('should set the state correctly', () => {
            const todos = new TODOs();

            todos.createTodo();

            expect(todos.todos).toHaveLength(5);
        });
    });

    describe('when removing a TODO', () => {
        let setDeletedSpy: jest.SpyInstance;
        beforeEach(() => {
            setDeletedSpy = jest.fn()

            const getMockedTodo = (n: number) => ({
                id: `some-generated-id-${n}`,
                setDeleted: setDeletedSpy,
            });

            (TODO as jest.MockedClass<any>)
                .mockImplementationOnce(() => getMockedTodo(1))
                .mockImplementationOnce(() => getMockedTodo(2))
                .mockImplementationOnce(() => getMockedTodo(3))
                .mockImplementationOnce(() => getMockedTodo(4))
        });

        it('should set the state correctly and call setDeleted', () => {
            const todos = new TODOs();

            expect(todos.todos).toHaveLength(4);

            const todoId = todos.todos[0].id;

            todos.removeTodo(todoId);

            expect(todos.todos).toHaveLength(3);
            expect(setDeletedSpy).toHaveBeenCalledTimes(1);
        });
    });

    describe('when cancelling the TODO', () => {
        describe('when TODO is a creation', () => {
            let mockCancelCreationSpy: jest.SpyInstance;
            beforeEach(() => {
                mockCancelCreationSpy = jest.fn();

                const getTodoMock = (n: number) => ({
                    id: `some-generated-id-${n}`,
                    cancelCreate: mockCancelCreationSpy
                });

                (TODO as jest.MockedClass<any>).mockImplementationOnce(
                    () => getTodoMock(1)
                )
                    .mockImplementationOnce(() => getTodoMock(2))
                    .mockImplementationOnce(() => getTodoMock(3))
                    .mockImplementationOnce(() => getTodoMock(4))
                    .mockImplementationOnce(() => getTodoMock(5))
            });

            it('should call cancel create and remove it from the todos array', () => {
                const todos = new TODOs();

                todos.handleCancel('some-generated-id-2', 'creating');

                expect(mockCancelCreationSpy).toHaveBeenCalledTimes(1);

                expect(todos.todos).not.toContain({id: 'some-generated-id-test-2'});
            });
        });

        describe('when TODO is a edit', () => {
            let mockCancelEditSpy: jest.SpyInstance;
            beforeEach(() => {
                mockCancelEditSpy = jest.fn();

                const getTodoMock = (n: number) => ({
                    id: `some-generated-id-${n}`,
                    cancelEdit: mockCancelEditSpy
                });

                (TODO as jest.MockedClass<any>).mockImplementationOnce(
                    () => getTodoMock(1)
                )
                    .mockImplementationOnce(() => getTodoMock(2))
                    .mockImplementationOnce(() => getTodoMock(3))
                    .mockImplementationOnce(() => getTodoMock(4))
                    .mockImplementationOnce(() => getTodoMock(5))
            });

            it('should call cancel edit', () => {
                const todos = new TODOs();

                todos.handleCancel('some-generated-id-1', 'editing');

                expect(mockCancelEditSpy).toHaveBeenCalledTimes(1);
            });
        });
    });

    describe('when accepting the TODO', () => {
        describe('when creating a TODO', () => {
            describe('when todo has no text', () => {
                let getTextSpy: jest.SpyInstance;
                beforeEach(() => {
                    getTextSpy = jest.fn();

                    const getTodoMock = (n: number) => ({
                        id: `some-generated-id-${n}`,
                        getText: getTextSpy.mockReturnValue({
                            updated: ''
                        })
                    });

                    (TODO as jest.MockedClass<any>).mockImplementationOnce(
                        () => getTodoMock(1)
                    ).mockImplementationOnce(() => getTodoMock(2))
                        .mockImplementationOnce(() => getTodoMock(3))
                        .mockImplementationOnce(() => getTodoMock(4))
                });

                it('should set the toast info', () => {
                    const todos = new TODOs();

                    todos.handleAccept('some-generated-id-4', 'creating');

                    expect(todos.toast).toEqual({
                        show: true,
                        status: 'warning',
                        message: 'Please enter a title before creating.'
                    });
                });
            });

            describe('when todo has text', () => {
                let acceptCreateSpy: jest.SpyInstance;
                beforeEach(() => {
                    acceptCreateSpy = jest.fn()

                    const getMockedTodo = (n: number) => ({
                        id: `some-generated-id-${n}`,
                        getText: jest.fn().mockReturnValue({
                            updated: `some-text-value`,
                        }),
                        acceptCreate: acceptCreateSpy
                    });

                    (TODO as jest.MockedClass<any>).mockImplementationOnce(
                        () => getMockedTodo(1)
                    ).mockImplementationOnce(() => getMockedTodo(2))
                        .mockImplementationOnce(() => getMockedTodo(3))
                        .mockImplementationOnce(() => getMockedTodo(4))
                });

                it('should call accept create', () => {
                    const todos = new TODOs();

                    todos.handleAccept('some-generated-id-2', 'creating');

                    expect(acceptCreateSpy).toHaveBeenCalledTimes(1);
                });
            });
        });

        describe('when updating a TODO', () => {
            describe('when todo has no text', () => {
                let getTextSpy: jest.SpyInstance;
                beforeEach(() => {
                    getTextSpy = jest.fn();

                    const getTodoMock = (n: number) => ({
                        id: `some-generated-id-${n}`,
                        getText: getTextSpy.mockReturnValue({
                            updated: ''
                        })
                    });

                    (TODO as jest.MockedClass<any>).mockImplementationOnce(
                        () => getTodoMock(1)
                    ).mockImplementationOnce(() => getTodoMock(2))
                        .mockImplementationOnce(() => getTodoMock(3))
                        .mockImplementationOnce(() => getTodoMock(4))
                });

                it('should set the toast info', () => {
                    const todos = new TODOs();

                    todos.handleAccept('some-generated-id-4', 'editing');

                    expect(todos.toast).toEqual({
                        show: true,
                        status: 'warning',
                        message: 'Please enter a title before updating.'
                    });
                });
            });

            describe('when todo has text', () => {
                let acceptEditSpy: jest.SpyInstance;
                beforeEach(() => {
                    acceptEditSpy = jest.fn()

                    const getMockedTodo = (n: number) => ({
                        id: `some-generated-id-${n}`,
                        getText: jest.fn().mockReturnValue({
                            updated: `some-text-value`,
                        }),
                        acceptEdit: acceptEditSpy
                    });

                    (TODO as jest.MockedClass<any>).mockImplementationOnce(
                        () => getMockedTodo(1)
                    ).mockImplementationOnce(() => getMockedTodo(2))
                        .mockImplementationOnce(() => getMockedTodo(3))
                        .mockImplementationOnce(() => getMockedTodo(4))
                });

                it('should call accept edit', () => {
                    const todos = new TODOs();

                    todos.handleAccept('some-generated-id-2', 'editing');

                    expect(acceptEditSpy).toHaveBeenCalledTimes(1);
                });
            });
        });
    });

    describe('when getting pending items', () => {
        beforeEach(() => {
            const getMockedTodo = (n: number, completed: boolean, deleted: boolean) => ({
                id: `some-generated-id-${n}`,
                getCompleted: jest.fn().mockReturnValue(completed),
                getDeleted: jest.fn().mockReturnValue(deleted)
            });

            (TODO as jest.MockedClass<any>).mockImplementationOnce(
                () => getMockedTodo(1, true, false)
            )
                .mockImplementationOnce(() => getMockedTodo(2, false, false))
                .mockImplementationOnce(() => getMockedTodo(3, false, true))
                .mockImplementationOnce(() => getMockedTodo(4, false, false))
        });

        it('should get the correct TODOs', () => {
            const todos = new TODOs();
            const pendingItems = todos.pendingItems;

            expect(pendingItems).toHaveLength(2);
            expect(pendingItems).toEqual(
                expect.arrayContaining([
                    expect.objectContaining({
                        id: 'some-generated-id-2'
                    }),
                    expect.objectContaining({
                        id: 'some-generated-id-4'
                    })
                ]))
        });
    });

    describe('when getting completed items', () => {
        beforeEach(() => {
            const getMockedTodo = (n: number, completed: boolean) => ({
                id: `some-generated-id-${n}`,
                getCompleted: jest.fn().mockReturnValue(completed),
            });

            (TODO as jest.MockedClass<any>).mockImplementationOnce(
                () => getMockedTodo(1, true)
            )
                .mockImplementationOnce(() => getMockedTodo(2, false))
                .mockImplementationOnce(() => getMockedTodo(3, false))
                .mockImplementationOnce(() => getMockedTodo(4, true))
        });

        it('should set the state correctly', () => {
            const todos = new TODOs();
            const completedItems = todos.completedItems;

            expect(completedItems).toHaveLength(2);
            expect(completedItems).toEqual(
                expect.arrayContaining([
                    expect.objectContaining({
                        id: 'some-generated-id-1',
                    }),
                    expect.objectContaining({
                        id: 'some-generated-id-4'
                    })
                ])
            );
        });
    });

    describe('when seeing whether a item is already being created or edited', () => {
        describe('when there is a item in created or edited', () => {
            beforeEach(() => {
                const getMockedTodo = (n: number, editing: boolean, creating: boolean) => ({
                    id: `some-generated-id-${n}`,
                    getEditing: jest.fn().mockReturnValue(editing),
                    getCreating: jest.fn().mockReturnValue(creating)
                });

                (TODO as jest.MockedClass<any>)
                    .mockImplementationOnce(() => getMockedTodo(1, false, false))
                    .mockImplementationOnce(() => getMockedTodo(2, false, false))
                    .mockImplementationOnce(() => getMockedTodo(3, true, false))
                    .mockImplementationOnce(() => getMockedTodo(4, false, false))
            });

            it('should return true', () => {
                const todos = new TODOs();

                expect(todos.isItemAlreadyBeingEditedOrCreated).toEqual(true);
            });
        });

        describe('when there is not a item in created or edited', () => {
            beforeEach(() => {
                const getMockedTodo = (n: number, editing: boolean, creating: boolean) => ({
                    id: `some-generated-id-${n}`,
                    getEditing: jest.fn().mockReturnValue(editing),
                    getCreating: jest.fn().mockReturnValue(creating)
                });

                (TODO as jest.MockedClass<any>)
                    .mockImplementationOnce(() => getMockedTodo(1, false, false))
                    .mockImplementationOnce(() => getMockedTodo(2, false, false))
                    .mockImplementationOnce(() => getMockedTodo(3, false, false))
                    .mockImplementationOnce(() => getMockedTodo(4, false, false))
            });

            it('should return false', () => {
                const todos = new TODOs();

                expect(todos.isItemAlreadyBeingEditedOrCreated).toEqual(false);
            });
        });
    });
})