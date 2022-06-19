import { useState, useEffect } from "react";
import styled from "styled-components";

export default function RecordingsList({ audioUrl, uploadRecord }) {
  const [recordings, setRecordings] = useState([]);

  useEffect(() => {
    if (audioUrl)
      setRecordings(() => {
        return [{ audioUrl }];
      });
  }, [audioUrl]);
  return (
    <RecordingsContainer>
      {recordings.length > 0 ? (
        <>
          <RecordingsLists>
            {recordings.map((record) => (
              <Record key={record.audioUrl}>
                <audio controls src={record.audioUrl} />
              </Record>
            ))}
            <div>
              <ButtonSend onClick={uploadRecord}>Преобразовать</ButtonSend>
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
