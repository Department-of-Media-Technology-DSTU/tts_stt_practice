import React, { useState } from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";
import axios from "axios";
import useRecorder from "../hooks/useRecorder";
import RecorderControls from "../components/recorder-controls";
import RecordingsList from "../components/recordings-list";

export default function StsBlock() {
  const [file, setFile] = useState(null);
  const [result, setResult] = useState("");
  const [loader, setLoader] = useState();

  const { recorderState, ...handlers } = useRecorder();
  const { audio, audioUrl } = recorderState;

  const handleChange = (file) => {
    setFile(file.target.files[0]);
  };

  const uploadFile = () => {
    setLoader(true);
    const formData = new FormData();
    formData.append("file", file);

    axios({
      method: "post",
      url: "https://d39a-95-24-11-149.ngrok.io",
      data: formData,
    })
      .then((res) => {
        setLoader(false);
        setResult(res.data);
      })
      .catch((e) => console.log(e));
  };

  const uploadRecord = () => {
    setLoader(true);
    const formData = new FormData();
    formData.append("file", audio);

    axios({
      method: "post",
      url: "https://d39a-95-24-11-149.ngrok.io",
      data: formData,
    })
      .then((res) => {
        setLoader(false);
        setResult(res.data);
      })
      .catch((e) => console.log(e));
  };
  return (
    <Container>
      <Header>
        <StyledLink to="/">Обратно</StyledLink>
        <p>Speech to Text</p>
      </Header>
      <Wrapper>
        <HandleLoaderBlock>
          <p>1) загрузка файла</p>
          <InputFile type="file" capture onChange={handleChange} />
          <div>
            {file ? (
              <ButtonSend onClick={uploadFile}>Преобразовать</ButtonSend>
            ) : null}
          </div>
        </HandleLoaderBlock>
        <RecorderBlock>
          <p>2) запись </p>
          <RecorderControls recorderState={recorderState} handlers={handlers} />
          <RecordingsList audioUrl={audioUrl} uploadFile={uploadRecord} />
        </RecorderBlock>
      </Wrapper>
      {loader ? <Loader>Загрузка</Loader> : null}
      {result ? <WrapperResult>{result}</WrapperResult> : null}
    </Container>
  );
}

const Container = styled.div`
  margin-left: 20px;
  margin-right: 20px;
  display: flex;
  flex-direction: column;
  align-items: center;
  font-size: 20px;
`;
const HandleLoaderBlock = styled.div`
  width: 500px;
  min-height: 300px;
  margin-right: 50px;
  background-color: white;
`;
const RecorderBlock = styled.div`
  width: 500px;
  background-color: white;
`;
const Wrapper = styled.div`
  display: flex;
  flex-direction: row;
  align-items: top;
  justify-content: space-between;
  margin-bottom: 50px;
`;
const WrapperResult = styled.div`
  display: flex;
  width: 600px;
  background-color: white;
  min-height: 200px;
  padding: 20px;
  justify-content: center;
`;
const Loader = styled.div`
  margin: 6px;
`;
const Header = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  margin-bottom: 15px;
`;
const StyledLink = styled(Link)`
  text-decoration: none;
  margin-right: 10px;
  color: #000 !important;
  border: 1px solid black;
  padding: 3px;
`;
const InputFile = styled.input`
  margin-top: 10px;
`;
const ButtonSend = styled.button`
  margin-top: 20px;
  width: 200px;
  height: 30px;
  background-color: white;
`;
