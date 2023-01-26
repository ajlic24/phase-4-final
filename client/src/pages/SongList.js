import { useEffect, useState } from "react";
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
              <h2>{song.title} <Button as={Link} to={`/edit/${song.id}`}> Edit </Button> &nbsp; <Button as={Link} to={`/delete/${song.id}`}> Delete </Button> </h2>
              <p>
                <em>Artist: {song.artist.name} </em>
                &nbsp;&nbsp; 
              </p>
              <p>
                <>Album: {song.album.name} </>
                &nbsp;&nbsp; 
              </p>
              <p>
                <>Released: {song.album.release_year} </>
                &nbsp;&nbsp;
              </p>
              <p>
                <>Genre: {song.genre} </>
                &nbsp;&nbsp;
              </p>
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
