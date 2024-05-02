import {action, makeObservable, observable} from 'mobx';
import {v4 as uuidv4} from 'uuid';

interface TODOData {
    text: string;
    completed: boolean;
}

export default class TODO {
    id: string = uuidv4();
    text: string = '';
    editing: boolean = false;
    completed: boolean = false;

    constructor(data?: TODOData) {
        makeObservable(this, {
            text: observable,
            editing: observable,
            completed: observable,
            setEditing: action,
            setText: action,
            setCompleted: action
        });

        this.setText(data?.text ?? '');
        data?.completed && this.setCompleted();
    }

    setText(text: string) {
        this.text = text;
    }

    setEditing(editing: boolean) {
        this.editing = editing;
    }

    setCompleted() {
        this.completed = true;
    }

    getText(): string {
        return this.text;
    }

    getEditing(): boolean {
        return this.editing;
    }

    getCompleted(): boolean {
        return this.completed;
    }
}