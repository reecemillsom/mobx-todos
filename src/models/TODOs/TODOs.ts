import {action, computed, makeObservable, observable} from "mobx";
import TODO from "../TODO/TODO";
import TODOS from "../../constants/TODOs";
import {AlertStatus} from "@chakra-ui/react";

interface Toast {
    show: boolean;
    status: AlertStatus | '';
    message: string;
}

type ItemType = 'creating' | 'editing';

// TODO if todo cannot be found, we should return early.
export default class TODOs {
    todos: TODO[] = [];
    toast: Toast = {
        show: false,
        status: '',
        message: ''
    };

    constructor() {
        makeObservable(this, {
            todos: observable,
            toast: observable,
            setTodos: action,
            setToast: action,
            pendingItems: computed,
            completedItems: computed,
            isItemAlreadyBeingEditedOrCreated: computed,
        });

        this.setTodos(TODOS.map(todo => new TODO(todo)));
    }

    createTodo(): void {
        const todo = new TODO();
        todo.setCreating(true);

        this.setTodos([todo, ...this.todos]);
    }

    removeTodo = (id: string): void => {
        const todo = this.todos.find(todo => todo.id === id);
        todo?.setDeleted();

        this.setTodos(this.todos.filter((todo) => todo.id !== id));
    }

    handleCancel = (id: string, itemType: ItemType): void => {
        const todo = this.todos.find(todo => todo.id === id);
        const itemTypes: { [key: string]: () => void; } = {
            creating: () => {
                todo?.cancelCreate();
                this.setTodos(this.todos.filter((todo) => todo.id !== id));
            },
            editing: () => todo?.cancelEdit(),
        }

        itemTypes[itemType]();
    }

    handleAccept = (id: string, itemType: ItemType): void => {
        const todo = this.todos.find(todo => todo.id === id);

        const itemTypes: { [key: string]: () => void } = {
            creating: () => {
                if (!todo?.getText()?.updated) {
                    this.setToast({
                        show: true,
                        status: 'warning',
                        message: 'Please enter a title before accepting.'
                    });
                } else {
                    todo?.acceptCreate();
                }
            },
            editing: () => {
                if (!todo?.getText()?.updated) {
                    this.setToast({
                        show: true,
                        status: 'warning',
                        message: 'Updated item must have a title.'
                    });
                } else {
                    todo?.acceptEdit();
                }
            }
        };

        itemTypes[itemType]();
    }

    get pendingItems(): TODO[] {
        return this.todos.filter(todo => !todo.getCompleted() && !todo.getDeleted());
    }

    get completedItems(): TODO[] {
        return this.todos.filter(todo => todo.getCompleted());
    }

    get isItemAlreadyBeingEditedOrCreated(): boolean {
        return this.todos.some(todo => todo.getEditing() || todo?.getCreating());
    }

    setTodos(todos: TODO[]): void {
        this.todos = todos;
    }

    setToast(toast: Toast): void {
        this.toast = toast;
    }
}