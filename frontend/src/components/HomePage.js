import styled from "styled-components";
import { Link } from "react-router-dom";

export default function HomePage() {
  return (
    <Container>
      <Wrapper>
        <StyledLink to="/TTS">TTS</StyledLink>
        <p> Text To Speech</p>
      </Wrapper>
      <Wrapper>
        <StyledLink to="/STT">STT</StyledLink>
        <p> Speech To Text</p>
      </Wrapper>
    </Container>
  );
}

const Container = styled.div`
  min-width: 300px;
  min-height: 100px;
  display: flex;
  flex-direction: row;
  justify-content: center;

  background-color: white;
`;
const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  margin: 40px;
`;
const StyledLink = styled(Link)`
  color: #000 !important;
  font-size: 20px;
  text-decoration: none;
  border: 2px solid black;
  padding: 3px;
`;
