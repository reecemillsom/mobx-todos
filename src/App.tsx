import React from 'react';
import TODOs from "./models/TODOs/TODOs";
import {TODOList} from "./components/TODOList/TODOList";
import {Heading, Button, Stack} from "@chakra-ui/react";
import {SmallAddIcon} from "@chakra-ui/icons";
import * as S from './AppStyles';

function App() {
    const todos = new TODOs();
    return (
        <S.Container className="App">
            <S.HeaderContainer>
                <Heading as="h1">TODO List</Heading>
            </S.HeaderContainer>
            <TODOList todos={todos}/>
        </S.Container>
    );
}

export default App;
