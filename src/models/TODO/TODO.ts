import {action, makeObservable, observable} from 'mobx';
import {v4 as uuidv4} from 'uuid';

interface TODOData {
    text: string;
    completed: boolean;
}

interface Text {
    original: string;
    updated: string;
}

export default class TODO {
    id: string = uuidv4();
    text: Text = {
        original: '',
        updated: ''
    };
    editing: boolean = false;
    creating: boolean = false;
    completed: boolean = false;
    deleted: boolean = false;

    constructor(data?: TODOData) {
        makeObservable(this, {
            text: observable,
            editing: observable,
            creating: observable,
            completed: observable,
            setEditing: action,
            setCreating: action,
            setText: action,
            setCompleted: action,
            setDeleted: action,
        });
        
        this.setText(data?.text ?? '', 'original');
        data?.completed && this.setCompleted();
    }

    setText(text: string, field: keyof Text) {
        this.text[field] = text;
    }

    setEditing(editing: boolean) {
        this.editing = editing;
    }

    setCreating(editing: boolean) {
        this.creating = editing;
    }

    setCompleted() {
        this.completed = true;
    }

    setDeleted() {
        this.deleted = true;
    }

    getText(): Text {
        return this.text;
    }

    getEditing(): boolean {
        return this.editing;
    }

    getCreating(): boolean {
        return this.creating;
    }

    getCompleted(): boolean {
        return this.completed;
    }

    getDeleted(): boolean {
        return this.deleted;
    }

    acceptEdit(): void {
        this.setText(this.text?.updated, 'original');
        this.setText('', 'updated');
        this.setEditing(false)
    }

    cancelEdit(): void {
        this.setText(this.text?.original, 'updated');
        this.setEditing(false);
    }

    acceptCreate(): void {
        this.setText(this.text?.updated, 'original');
        this.setText('', 'updated');
        this.setCreating(false);
    }

    cancelCreate(): void {
        this.setText('', 'updated');
        this.setCreating(false);
    }
}