import {FC} from "react";
import {observer} from "mobx-react";
import TODOs from "../../models/TODOs/TODOs";
import {TODOItem} from "../TODOItem/TODOItem";

interface Props {
    todos: TODOs;
}

export const TODOList: FC<Props> = observer(({todos}) => {
    return (
        <>
            {todos?.todos.map(todo => <TODOItem todo={todo} key={todo.id}/>)}
        </>
    );
});