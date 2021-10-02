import React from 'react';
import Cube from './components/Cube';
import TouchableAnimation from './components/TouchableAnimation';
import styled from 'styled-components';

const Scene = styled.div`
    position: relative;
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100vh;
    background: black;
`;

const App = () => {
  return (
    <Scene>
      <TouchableAnimation size={300}>
        <Cube size={200}/>
      </TouchableAnimation>
    </Scene>
  );
}

export default App;