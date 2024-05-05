import {action, computed, makeObservable, observable} from "mobx";
import TODO from "../TODO/TODO";
import TODOS from "../../constants/TODOs";

interface Toast {
    show: boolean;
    message: string;
}

// TODO should create setters for todos and toast, rather than setting create, remove and so on as actions themselves.
export default class TODOs {
    todos: TODO[] = [];
    toast: Toast = {
        show: false,
        message: ''
    };

    constructor() {
        makeObservable(this, {
            todos: observable,
            toast: observable,
            createTodo: action,
            removeTodo: action,
            handleCancel: action,
            handleAccept: action,
            pendingItems: computed,
            completedItems: computed,
            isItemAlreadyBeingEditedOrCreated: computed,
        });

        this.todos = TODOS.map(todo => new TODO(todo));
    }

    createTodo(): void {
        const todo = new TODO();
        todo.setCreating(true);

        this.todos = [todo, ...this.todos];
    }

    removeTodo = (id: string): void => {
        const todo = this.todos.find(todo => todo.id === id);
        todo?.setDeleted();

        this.todos = this.todos.filter((todo) => todo.id !== id);
    }

    handleCancel = (id: string, itemType: 'creating' | 'editing'): void => {
        const todo = this.todos.find(todo => todo.id === id);
        const itemTypes: { [key: string]: () => void; } = {
            creating: () => {
                todo?.setCreating(false);
                this.todos = this.todos.filter((todo) => todo.id !== id);
            },
            editing: () => todo?.cancelEdit(),
        }

        itemTypes[itemType]();
    }

    handleAccept = (id: string, itemType: 'creating' | 'editing'): void => {
        const todo = this.todos.find(todo => todo.id === id);

        const itemTypes: { [key: string]: () => void } = {
            creating: () => {
                if (!todo?.getText()?.updated) {
                    this.toast = {
                        show: true,
                        message: 'Please enter a title before accepting.'
                    };
                } else {
                    // TODO should we have acceptance and cancellation logic for creation
                    todo?.acceptEdit();
                    todo?.setCreating(false);
                }
            },
            editing: () => {
                todo?.acceptEdit();
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
}