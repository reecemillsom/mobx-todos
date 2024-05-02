import {action, computed, makeObservable, observable} from "mobx";
import TODO from "../TODO/TODO";
import TODOS from "../../constants/TODOs";

export default class TODOs {
    todos: TODO[] = [];

    constructor() {
        makeObservable(this, {
            todos: observable,
            createTodo: action,
            removeTodo: action,
            pendingItems: computed,
            completedItems: computed
        });

        this.todos = TODOS.map(todo => new TODO(todo));
    }

    createTodo(): void {
        const todo = new TODO();
        todo.setEditing(true);

        this.todos = [todo, ...this.todos];
    }

    removeTodo(id: string): void {
        this.todos = this.todos.filter((todo) => todo.id !== id);
    }

    get pendingItems(): TODO[] {
        return this.todos.filter(todo => !todo.completed);
    }

    get completedItems(): TODO[] {
        return this.todos.filter(todo => todo.completed);
    }
}