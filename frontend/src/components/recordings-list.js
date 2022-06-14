import { useState, useEffect } from "react";
import styled from "styled-components";

export default function RecordingsList({ audio, uploadFile }) {
  const [recordings, setRecordings] = useState([]);

  useEffect(() => {
    if (audio)
      setRecordings(() => {
        return [{ audio }];
      });
  }, [audio]);
  return (
    <RecordingsContainer>
      {recordings.length > 0 ? (
        <>
          <RecordingsLists>
            {recordings.map((record) => (
              <Record key={record.audio}>
                <audio controls src={record.audio} />
              </Record>
            ))}
            <div>
              <ButtonSend onClick={uploadFile}>Преобразовать</ButtonSend>
            </div>
          </RecordingsLists>
        </>
      ) : null}
    </RecordingsContainer>
  );
}
const RecordingsContainer = styled.div`
  height: 85%;
  padding: 0 2rem;
`;

const RecordingsLists = styled.div`
  max-height: 85%;
  display: grid;
  justify-content: center;
  overflow-y: auto;
`;
const Record = styled.div`
  display: flex;
  justify-content: space-evenly;
  padding: 0.5rem;
`;
const ButtonSend = styled.button`
  margin-top: 20px;
  width: 200px;
  height: 30px;
  background-color: white;
`;
