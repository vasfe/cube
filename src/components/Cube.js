import React from 'react';
import styled from 'styled-components';
import { keyframes } from 'styled-components'

const float = () => keyframes`
    to {
        transform: rotate(360deg) rotateY(360deg) rotateX(360deg);
    }
`
const Body = styled.div`
    width: ${props => props.size}px;
    height:  ${props => props.size}px;
    position: relative;
    transform-style: preserve-3d;
    animation: ${float} 30s infinite linear;
`;

const Face = styled.div`
    position: absolute;
    background-color: rgba(9, 255, 0, 0.287);
    width: 100%;
    height: 100%;
    box-shadow: 0 0 30px rgba(22, 185, 16, 0.623) inset;
    transform: 
        rotateY(${props => props.rotateY})
        translateZ(${props => props.translateZ}) 
        translateY(${props => props.translateY}) 
        rotateX(${props => props.rotateX});
`;

const Cube = props => {

    return (
        <Body
            className="App" color="black" size={props.size}
        >
            <Face
                // front
                rotateY="0"
                rotateX="0"
                translateZ={`${props.size / 2}px`}
                translateY="0"
            />
            <Face
                // back
                rotateY="180deg"
                rotateX="0"
                translateZ={`${props.size / 2}px`}
                translateY="0"
            />
            <Face
                // bottom
                rotateY="0"
                rotateX="90deg"
                translateY={`${props.size / 2}px`}
                translateZ="0"
            />
            <Face
                // top
                rotateY="0"
                rotateX="90deg"
                translateY={`-${props.size / 2}px`}
                translateZ="0"
            />
            <Face
                // right
                rotateY="90deg"
                rotateX="0"
                translateY="0"
                translateZ={`${props.size / 2}px`}
            />
            <Face
                // right
                rotateY="270deg"
                rotateX="0"
                translateY="0"
                translateZ={`${props.size / 2}px`}
            />
        </Body>
    );
}

export default Cube;