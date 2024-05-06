import {action, computed, makeObservable, observable} from "mobx";
import {AlertStatus} from "@chakra-ui/react";
import TODO from "../TODO/TODO";
import TODOS from "../../constants/TODOs";

interface Toast {
    show: boolean;
    status: AlertStatus | '';
    message: string;
}

export type ItemType = 'creating' | 'editing';

export const DEFAULT_TOAST_VALUES: Toast = {
    show: false,
    status: '',
    message: ''
};

export default class TODOs {
    todos: TODO[] = [];
    toast: Toast = DEFAULT_TOAST_VALUES;

    constructor() {
        makeObservable(this, {
            todos: observable,
            toast: observable,
            setTodos: action,
            setToast: action,
            setToastToDefault: action,
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
        const text = todo?.getText();
        const isCreating = itemType === 'creating';

        if (!text?.updated) {
            this.setToast({
                show: true,
                status: 'warning',
                message: isCreating ? 'Please enter a title before creating.' : 'Please enter a title before updating.'
            });

            return;
        }

        isCreating ? todo?.acceptCreate() : todo?.acceptEdit();
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

    setToastToDefault(): void {
        this.toast = DEFAULT_TOAST_VALUES;
    }
}