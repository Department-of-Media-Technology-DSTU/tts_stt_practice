import styled, { createGlobalStyle } from "styled-components";
import TtsBlock from "./components/TtsBlock";
import SttBlock from "./components/SttBlock";
import HomePage from "./components/HomePage";
import { Routes, Route } from "react-router-dom";

function App() {
  return (
    <Container>
      <GlobalStyle />
      <Routes>
        <Route path="/" element={<HomePage />} exact />
        <Route path="/TTS" element={<TtsBlock />} exact />
        <Route path="/STT" element={<SttBlock />} exact />
      </Routes>
    </Container>
  );
}

export default App;

const GlobalStyle = createGlobalStyle`
  body {
    color: black;
    background: #DCDCDC;
    margin: 0;
    
  }
`;
const Container = styled.div`
  margin: 100px 100px;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  text-align: center;
`;
