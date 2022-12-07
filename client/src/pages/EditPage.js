import { useState, useEffect } from "react";
import { useHistory, useParams } from "react-router";
import styled from "styled-components";
import ReactMarkdown from "react-markdown";
import { Button, Error, FormField, Input, Label} from "../styles";

function EditPage({ user }) {
  const [title, setTitle] = useState("");
  const [artist, setArtist] = useState("");
  const [album, setAlbum] = useState(``);
  const [genre, setGenre] = useState(``)
  const [releaseYear, setReleaseYear] = useState(0)
  const [errors, setErrors] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const history = useHistory();
  const {id} = useParams();

  useEffect(() => {
    fetch(`/songs/${id}`).then((r) => {
      if (r.ok) {
        r.json().then((song) => {
        setTitle(song.title);
        setArtist(song.artist.name);
        setAlbum(song.album.name);
        setGenre(song.genre);
        setReleaseYear(song.album.release_year)}
        );
      }
    });
  }, []);

  function handleSubmit(e) {
    e.preventDefault();
    setIsLoading(true);
    fetch(`/songs/${id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        title: title,
        genre: genre,
      }),
    }).then((r) => {
      setIsLoading(false);
      if (r.ok) {
        history.push("/");
      } else {
        r.json().then((err) => setErrors(err.errors));
      }
    });
  }

  return (
    <Wrapper>
      <WrapperChild>
        <h2>Edit Song Entry</h2>
        <form onSubmit={handleSubmit}>
          <FormField>
            <Label htmlFor="title">Title</Label>
            <Input
              type="text"
              id="title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
          </FormField>
          <FormField>
            <Label htmlFor="genre">Genre</Label>
            <Input
              id="genre"
              type="text"
              value={genre}
              onChange={(e) => setGenre(e.target.value)}
            />
          </FormField>
          <FormField>
            <Label htmlFor="artist">Artist</Label>
            <Input
              disabled={true}
              type="text"
              id="artist"
              value={artist}
              onChange={(e) => setArtist(e.target.value)}
            />
          </FormField>
          <FormField>
            <Label htmlFor="album">Album</Label>
            <Input
              disabled={true}
              id="album"
              type="text"
              value={album}
              onChange={(e) => setAlbum(e.target.value)}
            />
          </FormField>
          <FormField>
            <Label htmlFor="releaseYear">Year Released</Label>
            <Input
              disabled={true}
              id="releaseYear"
              type="integer"
              value={releaseYear}
              onChange={(e) => setReleaseYear(e.target.value)}
            />
          </FormField>
          <FormField>
            <Button color="primary" type="submit">
              {isLoading ? "Loading..." : "Submit"}
            </Button>
          </FormField>
          <FormField>
            {errors.map((err) => (
              <Error key={err}>{err}</Error>
            ))}
          </FormField>
        </form>
      </WrapperChild>
      <WrapperChild>
        <h2>Title: {title}</h2>
        {/* <p>
          <em>{artist} </em>
          &nbsp;&nbsp;
          <cite>By {user.username}</cite>
        </p> */}
        {/* <ReactMarkdown>{album}</ReactMarkdown> */}
        <h3>Genre: {genre}</h3>
      </WrapperChild>
    </Wrapper>
  );
}

const Wrapper = styled.section`
  max-width: 1000px;
  margin: 40px auto;
  padding: 16px;
  display: flex;
  gap: 24px;
`;

const WrapperChild = styled.div`
  flex: 1;
`;

export default EditPage;
