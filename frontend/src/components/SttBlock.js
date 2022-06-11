import styled from "styled-components";
import { Link } from "react-router-dom";

export default function StsBlock() {
  return (
    <Container>
      <Header>
        <StyledLink to="/">Обратно</StyledLink>
        <p>Speech to Text</p>
      </Header>
    </Container>
  );
}

const Container = styled.div`
  margin-left: 20px;
  margin-right: 20px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;
const Header = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
`;
const StyledLink = styled(Link)`
  text-decoration: none;
  margin-right: 10px;
  color: #000 !important;
  border: 1px solid black;
  padding: 3px;
`;
