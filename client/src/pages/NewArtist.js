import { useState } from "react";
import { useHistory } from "react-router";
import styled from "styled-components";
// import ReactMarkdown from "react-markdown";
import { Button, Error, FormField, Input, Label} from "../styles";

function NewArtist({ user }) {
//   const [title, setTitle] = useState("");
  const [name, setName] = useState("");
//   const [album, setAlbum] = useState(``);
//   const [genre, setGenre] = useState(``)
//   const [releaseYear, setReleaseYear] = useState(0)
  const [errors, setErrors] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const history = useHistory();

  function handleSubmit(e) {
    e.preventDefault();
    setIsLoading(true);
    fetch("/artists", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        // title: title,
        // genre: genre,
        name: name,
        // album: {name: album, release_year: releaseYear},
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
        <h2>Create Artist Entry</h2>
        <form onSubmit={handleSubmit}>
          {/* <FormField>
            <Label htmlFor="title">Title</Label>
            <Input
              type="text"
              id="title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
          </FormField> */}
          <FormField>
            <Label htmlFor="artist">Artist</Label>
            <Input
              type="text"
              id="artist"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </FormField>
          {/* <FormField>
            <Label htmlFor="album">Album</Label>
            <Input
              id="album"
              type="text"
              value={album}
              onChange={(e) => setAlbum(e.target.value)}
            />
          </FormField>
          <FormField>
            <Label htmlFor="releaseYear">Year Released</Label>
            <Input
              id="releaseYear"
              type="integer"
              value={releaseYear}
              onChange={(e) => setReleaseYear(e.target.value)}
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
          </FormField> */}
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
        {/* <h1>{title}</h1> */}
        <p>
          <em>{name} </em>
          &nbsp;&nbsp;
          {/* <cite>By {user.username}</cite> */}
        </p>
        {/* <ReactMarkdown>{album}</ReactMarkdown> */}
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

export default NewArtist;
