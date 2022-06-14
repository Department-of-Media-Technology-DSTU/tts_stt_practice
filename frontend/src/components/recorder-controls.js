import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faMicrophone,
  faTimes,
  faSave,
} from "@fortawesome/free-solid-svg-icons";
import { formatMinutes, formatSeconds } from "../utils/format-time";
import styled from "styled-components";

export default function RecorderControls({ recorderState, handlers }) {
  const { recordingMinutes, recordingSeconds, initRecording } = recorderState;
  const { startRecording, saveRecording, cancelRecording } = handlers;

  return (
    <ControlsContainer>
      <CerorderDisplay>
        <RecordingTime>
          <span>{formatMinutes(recordingMinutes)}</span>
          <span>:</span>
          <span>{formatSeconds(recordingSeconds)}</span>
        </RecordingTime>
        {initRecording && (
          <CancelButtonContainer>
            <CancelButton onClick={cancelRecording}>
              <FontAwesomeIcon icon={faTimes} />
            </CancelButton>
          </CancelButtonContainer>
        )}
      </CerorderDisplay>
      <StartButtonContainer>
        {initRecording ? (
          <StartButton
            disabled={recordingSeconds === 0}
            onClick={saveRecording}
          >
            <FontAwesomeIcon icon={faSave} size="1x" />
          </StartButton>
        ) : (
          <StartButton onClick={startRecording}>
            <FontAwesomeIcon icon={faMicrophone} size="2x" />
          </StartButton>
        )}
      </StartButtonContainer>
    </ControlsContainer>
  );
}
const ControlsContainer = styled.div`
  height: 15%;
  display: flex;
  justify-content: space-evenly;
  padding: 0.5rem;
`;
const CerorderDisplay = styled.div`
  width: 50%;
  display: flex;
  font-size: 2rem;
`;
const RecordingTime = styled.div`
  width: 70%;
  display: flex;
  align-items: center;
  justify-content: center;
`;
const CancelButtonContainer = styled.div`
  width: 20%;
  display: grid;
  place-content: center;
  animation-name: animated-block;
  animation-duration: 2s;
`;
const CancelButton = styled.button`
  border: none;
  border-radius: 50%;
  background-color: #fff;
  cursor: pointer;
`;
const StartButton = styled.button`
  border: none;
  border-radius: 50%;
  background-color: #fff;
  cursor: pointer;
`;
const StartButtonContainer = styled.div`
  width: 15%;
  display: grid;
  place-content: center;
`;
