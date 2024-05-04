import TODO from './TODO';

describe('TODO', () => {
    describe('when instantiated', () => {
        describe('when its a fresh TODO item', () => {
            it('will set the initial state correctly', () => {
                const todo = new TODO();

                expect(todo).toEqual({
                    id: expect.any(String),
                    text: '',
                    editing: false,
                    completed: false,
                });
            });
        });

        describe('when its a already existing TODO item', () => {
            const context = {
                text: 'First TODO item',
                completed: true,
            };

            const todo = new TODO(context);

            expect(todo).toEqual({
                id: expect.any(String),
                text: 'First TODO item',
                editing: false,
                completed: true,
            });
        });

    });

    describe('when actions are called', () => {
        it('should update what the value in state', () => {
            const todo = new TODO();

            // todo.setText('Text value');
            todo.setEditing(true);
            todo.setCompleted();

            expect(todo.getText()).toEqual('Text value');
            expect(todo.getEditing()).toEqual(true);
            expect(todo.getCompleted()).toEqual(true);
        });
    });
});