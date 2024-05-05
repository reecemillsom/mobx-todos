import TODO from './TODO';

describe('TODO', () => {
    describe('when instantiated', () => {
        describe('when its a fresh TODO item', () => {
            it('will set the initial state correctly', () => {
                const todo = new TODO();

                expect(todo).toEqual({
                    id: expect.any(String),
                    text: {
                        original: '',
                        updated: ''
                    },
                    deleted: false,
                    creating: false,
                    editing: false,
                    completed: false,
                });
            });
        });

        describe('when its a already existing TODO item', () => {
            it('will set the initial state correctly', () => {
                const context = {
                    text: 'First TODO item',
                    completed: true,
                };

                const todo = new TODO(context);

                expect(todo).toEqual({
                    id: expect.any(String),
                    text: {
                        original: 'First TODO item',
                        updated: ''
                    },
                    deleted: false,
                    creating: false,
                    editing: false,
                    completed: true
                });
            });
        });
    });

    describe('when actions are called', () => {
        it('should update what the value in state', () => {
            const todo = new TODO();

            todo.setText('Text value', 'original');
            todo.setEditing(true);
            todo.setCompleted();
            todo.setCreating(true);
            todo.setDeleted();

            expect(todo.getText()).toEqual({
                original: 'Text value',
                updated: ''
            });
            expect(todo.getEditing()).toEqual(true);
            expect(todo.getCompleted()).toEqual(true);
            expect(todo.getCreating()).toEqual(true);
            expect(todo.getDeleted()).toEqual(true);
        });
    });

    describe('when accepting an edit', () => {
        it('should set the updated and original text value accordingly, and editing state', () => {
            const todo = new TODO();

            todo.setText('Value text', 'updated');
            todo.setCreating(true);

            todo.acceptEdit();

            expect(todo.getText()).toEqual({
                original: 'Value text',
                updated: '',
            });
            expect(todo.getEditing()).toEqual(false);
        });
    });

    describe('when cancelling an edit', () => {
        it('should set the text and editing state', () => {
            const todo = new TODO();

            todo.setText('Value text', 'original');
            todo.setEditing(true);

            todo.cancelEdit();

            expect(todo.getText()).toEqual({
                original: 'Value text',
                updated: 'Value text'
            });

            expect(todo.getEditing()).toEqual(false);
        });
    });

    describe('when accepting a creation', () => {
        it('should set the text and creation state', () => {
            const todo = new TODO();

            todo.setText('Value text', 'updated');
            todo.setCreating(true);

            todo.acceptCreate();

            expect(todo.getText()).toEqual({
                original: 'Value text',
                updated: ''
            });

            expect(todo.getCreating()).toEqual(false);
        });
    });

    describe('when cancelling a creation', () => {
        it('should set the text and creation state', () => {
            const todo = new TODO();

            todo.setText('Value text', 'updated');
            todo.setCreating(true);

            todo.cancelCreate();

            expect(todo.getText()).toEqual({
                original: '',
                updated: ''
            });

            expect(todo.getCreating()).toEqual(false);
        });
    });
});