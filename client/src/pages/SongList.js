import { useEffect, useState } from "react";
import ReactMarkdown from "react-markdown";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { Box, Button } from "../styles";

function SongList() {
  const [songs, setSongs] = useState([]);

  useEffect(() => {
    fetch("/songs")
      .then((r) => r.json())
      .then(setSongs);
  }, []);

  return (
    <Wrapper>
      {songs.length > 0 ? (
        songs.map((song) => (
          <Song key={song.id}>
            <Box>
              <h2>{song.title}</h2>
              <p>
                <em>Artist: {song.artist} </em>
                &nbsp;·&nbsp;
                {/* <cite>By {song.user.username}</cite> */}
              </p>
              <ReactMarkdown>{song.album}</ReactMarkdown>
            </Box>
          </Song>
        ))
      ) : (
        <>
          <h2>No Songs Found</h2>
          <Button as={Link} to="/new">
            Make a New Song Entry
          </Button>
        </>
      )}
    </Wrapper>
  );
}

const Wrapper = styled.section`
  max-width: 800px;
  margin: 40px auto;
`;

const Song = styled.article`
  margin-bottom: 24px;
`;

export default SongList;
