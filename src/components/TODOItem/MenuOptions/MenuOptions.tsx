import {FC} from "react";
import {IconButton, Menu, MenuButton, MenuItem, MenuList} from "@chakra-ui/react";
import {CheckIcon, DeleteIcon, EditIcon, HamburgerIcon} from "@chakra-ui/icons";
import * as S from "../styles";

interface Props {
    todoId: string;
    setEditing: (editing: boolean) => void;
    setCompleted: () => void;
    removeTodo: (id: string) => void;
    itemBeingEditedOrCreated: boolean;
}

export const MenuOptions: FC<Props> = ({
                                           todoId,
                                           setEditing,
                                           setCompleted,
                                           removeTodo,
                                           itemBeingEditedOrCreated
                                       }) => {
    return (
        <>
            <S.DesktopMenuItems>
                <S.StateButton aria-label="Edit" title="Edit" onClick={() => setEditing(true)}
                               icon={<EditIcon/>} isDisabled={itemBeingEditedOrCreated}/>
                <S.StateButton aria-label="Complete" title="Complete" onClick={() => setCompleted()}
                               icon={<CheckIcon/>}/>
                <S.StateButton aria-label="Delete" title="Delete" onClick={() => removeTodo(todoId)}
                               icon={<DeleteIcon/>}/>
            </S.DesktopMenuItems>

            <S.MobileMenuItems>
                <Menu>
                    <MenuButton as={IconButton} aria-label="Options" icon={<HamburgerIcon/>} variant="outline"
                                isDisabled={itemBeingEditedOrCreated}/>
                    <MenuList>
                        <MenuItem icon={<EditIcon/>} onClick={() => setEditing(true)}>
                            Edit
                        </MenuItem>
                        <MenuItem icon={<CheckIcon/>} onClick={() => setCompleted()}>
                            Complete
                        </MenuItem>
                        <MenuItem icon={<DeleteIcon/>} onClick={() => removeTodo(todoId)}>
                            Delete
                        </MenuItem>
                    </MenuList>
                </Menu>
            </S.MobileMenuItems>
        </>
    )
};