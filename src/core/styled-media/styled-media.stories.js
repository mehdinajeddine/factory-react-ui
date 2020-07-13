import React from 'react';
import { Container } from '../../components';
import styled from 'styled-components';
import { generateMedia } from './index';


const StyledMedia = styled.div`
    display: block;
    padding: 18px;
    border: 2px solid;
    margin: 1rem auto;
`;

const StyledGreaterThan = styled(StyledMedia)`
    border-color: red;
    ${
        props => generateMedia(props).greaterThan('md')`
            border-color: blue;
        `
    }
`;

const StryledLessThan = styled(StyledMedia)`
    border-color: red;
    ${
        props => generateMedia(props).lessThan('md')`
            border-color: blue;
        `
    }
`

const StryledBetwwen = styled(StyledMedia)`
    border-color: red;
    ${
        props => generateMedia(props).between('md', 'lg')`
            border-color: blue;
        `
    }
`

export const GenerateMedia = () => {

    return <Container>
            <StyledGreaterThan>geatherThan</StyledGreaterThan>
            <StryledLessThan>lessThan</StryledLessThan>
            <StryledBetwwen>between</StryledBetwwen>
        </Container>
}

export default {
    title: 'Core/StyledMedia',
};