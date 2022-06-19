import styled from "styled-components";
import { useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

export default function TtsBlock() {
  const [text, setText] = useState();
  const [click, setClick] = useState();
  const [blob, setBlob] = useState();
  const [result, setResult] = useState("");

  const handleChange = (e) => {
    setText(e.target.value);
  };

  const clickButton = () => {
    setResult("Загрузка");
    axios
      .get(`https://d39a-95-24-11-149.ngrok.io/tts/${text}`, {
        responseType: "blob",
      })
      .then((c) => {
        setResult("");
        setBlob(c.data);
      });
    setClick(true);
  };

  return (
    <Container>
      <Header>
        <StyledLink to="/">Обратно</StyledLink>
        <p>Text to Speech</p>
      </Header>
      <Wrapper>
        <Input onChange={handleChange}></Input>
        <Button onClick={clickButton}>Отправить</Button>
      </Wrapper>
      {result}
      {click && blob ? (
        <Audio
          controls
          src={URL.createObjectURL(blob)}
          type="audio/wav"
        ></Audio>
      ) : null}
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
  font-size: 20px;
`;
const Wrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 10px;
`;
const Input = styled.textarea`
  width: 400px;
  min-height: 100px;
  resize: none;
`;
const Button = styled.button`
  width: 80px;
  height: 50px;
  margin: 10px;
  background-color: white;
  border: 2px gray solid;
`;
const Header = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
`;
const Audio = styled.audio`
  margin-top: 30px;
`;
const StyledLink = styled(Link)`
  text-decoration: none;
  margin-right: 10px;
  color: #000 !important;
  border: 1px solid black;
  padding: 3px;
`;
