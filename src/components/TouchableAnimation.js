import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { keyframes } from 'styled-components'

const maxRotation = 360;
const animationDuration = 2;

const spin = (newRotation) => keyframes`
    100% {
        transform: rotateY(${newRotation[0]}deg) rotateX(${newRotation[1]}deg) 
    };
`
const pointerAnimation = (position) => keyframes`
    0%{
        border-width: 7px
    }
    100% {
        width: calc(var(--size)*20);
        height: calc(var(--size)*20);
        left: calc(${position[0]}px - var(--size)/2*20);
        top:  calc(${position[1]}px - var(--size)/2*20);
        border-width: 2px
    };
`

const Container = styled.div`
    width: ${props => props.size}px;
    height:  ${props => props.size}px;
    position: relative;
    display: flex;
    align-items: center;
    justify-content: center;
    box-sizing: border-box;
`;

const Touchable = styled.div`
    position: absolute;
    width: 100%;
    height: 100%;
    z-index: 10000;
`;

const Pointer = styled.div`
    --size: 2px;    
    position: absolute;
    width: var(--size);
    height: var(--size);
    left: calc(${props => props.position[0]}px - var(--size)/2);
    top:  calc(${props => props.position[1]}px - var(--size)/2);
    border-radius: 50%;
    border-width: 0;
    border-color: #2c2cca65;
    border-style: solid;
    animation: ${props => props.position ? pointerAnimation(props.position) : null} .5s linear;
`;

const RotatingAnimation = styled.div`
    width: ${props => props.size}px;
    height:  ${props => props.size}px;
    transform-style: preserve-3d;
    animation: ${props => props.newRotation ? spin(props.newRotation) : null} ${animationDuration}s ease-out;
    transform: rotateY(${props => props.currentRotation[0]}deg) rotateX(${props => props.currentRotation[1]}deg);
`;

const TouchableAnimation = props => {
    const [pointerPosition, setPointerPosition] = useState(null)
    const [currentRotation, setCurrentRotation] = useState([0, 0])//[x,y]
    const [newRotation, setNewRotation] = useState(null)//[x,y]

    const handleClick = (e) => {
        setPointerPosition([e.nativeEvent.offsetX, e.nativeEvent.offsetY])
    }

    const startAnimation = () => {
        setTimeout(() => {
            setCurrentRotation(newRotation)
            setNewRotation(null)
            setPointerPosition(null)
        }, animationDuration * (1000 - 16));
    }

    useEffect(() => {
        if (pointerPosition) {
            const rotationAppliedX = (pointerPosition[0] - props.size / 2) * maxRotation / (props.size / 2)
            const rotationAppliedY = (pointerPosition[1] - props.size / 2) * maxRotation / (props.size / 2)
            console.log([rotationAppliedX, rotationAppliedY])
            setNewRotation([currentRotation[0] - Math.round(rotationAppliedX), Math.round(currentRotation[1] + rotationAppliedY)])
        }
    }, [pointerPosition])

    useEffect(() => {
        if (newRotation) {
            startAnimation()
        }
    }, [newRotation])

    return (
        <Container
            size={props.size}
        >
            <Touchable
                onClick={(event) => !newRotation ? handleClick(event) : null}
            >
                <Pointer
                    position={pointerPosition ? pointerPosition : 0}
                />
            </Touchable>
            <RotatingAnimation
                currentRotation={currentRotation}
                newRotation={newRotation}
            >
                {props.children}
            </RotatingAnimation>
        </Container>
    );
}

export default TouchableAnimation