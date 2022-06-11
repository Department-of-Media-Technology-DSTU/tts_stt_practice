import styled from "styled-components";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import ReactPlayer from "react-player";

// let socket = new WebSocket("ws://localhost:8021");
// console.log(socket);
// socket.onopen = function (e) {
//   console.log("asdasd");
//   socket.send("Меня зовут Джон");
// };

export default function TtsBlock() {
  const [text, setText] = useState();
  const [sound, setSound] = useState();
  const [click, setClick] = useState();
  const [url, setUrl] = useState();
  const [blob, setBlob] = useState();

  const handleChange = (e) => {
    setText(e.target.value);
  };

  const clickButton = () => {
    axios
      .get(`http://localhost:5000/tts/${text}`, { responseType: "blob" })
      .then((c) => setBlob(c.data));
    setClick(true);
  };

  useEffect(() => {
    axios
      .get("http://localhost:5000/tts/лол", { responseType: "blob" })
      .then((c) => setBlob(c.data));
  }, []);

  console.log(blob);
  return (
    <Wrapper>
      <Header>
        <StyledLink to="/">Обратно</StyledLink>
        <p>Text to Speech</p>
      </Header>
      <ContentWrapper>
        <Input onChange={handleChange}></Input>
        <Button onClick={clickButton}>отправить</Button>
        {/* <audio controls src="http://localhost:500/tts/лолка"></audio> */}
      </ContentWrapper>
      {click && blob ? (
        <audio
          controls
          src={URL.createObjectURL(blob)}
          type="audio/wav"
        ></audio>
      ) : null}
    </Wrapper>
  );
}

const Wrapper = styled.div`
  margin-left: 20px;
  margin-right: 20px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;
const ContentWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
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
