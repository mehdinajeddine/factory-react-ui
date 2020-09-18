import React from 'react';
import styled, {css} from 'styled-components';
import {getOuterMargin, getContainer} from '../helpers';
import {generateMedia} from '../../../core';
import {Box} from '../../Box';

const generateMediaforContainer = props => {
    const breakpointsName = Object.keys(props.theme.breakpoints);
    if(!props.fluid) {
        return css`
            ${breakpointsName.map(breakpoint => {
                if(getContainer(props)(breakpoint)) {
                    return generateMedia(props).greaterThan(breakpoint)`
                        max-width: ${(props) => getContainer(props)(breakpoint)};
                    `
                } else {
                    return null;
                }
            })}
        `;

    }
};

const StyledContainer = styled.div`
    box-sizing: border-box;
    margin-right: auto;
    margin-left: auto;
    padding-left: ${props => getOuterMargin(props)}px;
    padding-right: ${props => getOuterMargin(props)}px;
    width: 100%;
    ${generateMediaforContainer}
`;

const Container = ({fluid = false, ...rest}) => {
    return <Box as={StyledContainer}  fluid={fluid} {...rest} />
}

Container.defaultProps = {
    fluid: false
};


export default Container;