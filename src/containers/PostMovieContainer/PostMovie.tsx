import React from "react";
import { Button, Form, Spinner } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { RootStore } from "../../Store";
import { PostMovieAction } from "../../actions/PostMovieAction";
import "./PostMovie.css";
const PostMovie = () => {
  const dispatch = useDispatch();
  const postMovieState = useSelector((state: RootStore) => state.postMovie);
  const [title, setTitle] = React.useState("");
  const [titleError, setTitleError] = React.useState(false);
  const [titleText, setTitleText] = React.useState("");
  const [category, setCategory] = React.useState("");
  const [categoryError, setCategoryError] = React.useState(false);
  const [categoryText, setCategoryText] = React.useState("");
  const [rating, setRating] = React.useState<number>();
  const [ratingError, setRatingError] = React.useState(false);
  const [ratingText, setRatingText] = React.useState("");
  const [youtube_url, setYoutube_url] = React.useState("");
  const [youtube_urlError, setYoutube_urlError] = React.useState(false);
  const [youtube_urlText, setYoutube_urlText] = React.useState("");
  const [movie_img, setMovie_img] = React.useState<File>();
  const [movie_imgError, setMovie_imgError] = React.useState(false);
  const [movie_imgText, setMovie_imgText] = React.useState("");
  const [description, setDescription] = React.useState("");
  const [descriptionError, setDescriptionError] = React.useState(false);
  const [descriptionText, setDescriptionText] = React.useState("");

  const categories = [
    "Action",
    "Animation",
    "Comedy",
    "Crime",
    "Drama",
    "Fantasy",
    "Horror",
    "History",
    "Mystery",
    "Psychological",
    "Romance",
    "Thriller",
    "Western",
  ];
  const checkTitle = (event: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(event.target.value);
    if (
      event.target.value == null ||
      event.target.value === undefined ||
      event.target.value === ""
    ) {
      setTitleText("title field is required");
      setTitleError(true);
    } else {
      setTitleError(false);
    }
  };
  const checkCategory = (event: React.ChangeEvent<HTMLInputElement>) => {
    setCategory(event.target.value);
    if (
      event.target.value == null ||
      event.target.value === undefined ||
      event.target.value === "" ||
      event.target.value === "Choose..."
    ) {
      setCategoryText("category field is required");
      setCategoryError(true);
    } else {
      setCategoryError(false);
    }
  };
  const checkRating = (event: React.ChangeEvent<HTMLInputElement>) => {
    setRating(event.target.valueAsNumber);
    if (
      event.target.value == null ||
      event.target.value === undefined ||
      event.target.value === ""
    ) {
      setRatingText("rating field is required");
      setRatingError(true);
    } else {
      setRatingError(false);
    }
  };
  const checkYoutube_url = (event: React.ChangeEvent<HTMLInputElement>) => {
    setYoutube_url(event.target.value);
    if (
      event.target.value !== "" &&
      !event.target.value.startsWith("https://www.youtube.com/")
    ) {
      setYoutube_urlText("please insert a valid youtube url");
      setYoutube_urlError(true);
    } else {
      setYoutube_urlError(false);
    }
  };
  const checkMovie_img = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files: FileList | null = event.target.files;
    if (files === null) {
      return;
    } else {
      setMovie_img(files[0]);
    }
  };
  const checkDescription = (event: React.ChangeEvent<HTMLInputElement>) => {
    setDescription(event.target.value);
    if (
      event.target.value == null ||
      event.target.value === undefined ||
      event.target.value === ""
    ) {
      setDescriptionText("description field is required");
      setDescriptionError(true);
    } else {
      setDescriptionError(false);
    }
  };
  const handleSubmit = () => {
    if (
      title !== "" &&
      category !== "" &&
      category !== "Choose..." &&
      rating !== undefined &&
      ((youtube_url !== "" &&
        youtube_url.startsWith("https://www.youtube.com/")) ||
        youtube_url === "") &&
      description !== ""
    ) {
      const token = localStorage.getItem("token");
      if (token) {
        dispatch(
          PostMovieAction(
            title,
            category,
            rating,
            description,
            token,
            movie_img,
            youtube_url
          )
        );
      } else {
        window.location.replace("/");
      }
    } else {
      if (title === "") {
        setTitleText("title field is required");
        setTitleError(true);
      }
      if (category === "" || category === "Choose...") {
        setCategoryText("category field is required");
        setCategoryError(true);
      }
      if (rating === undefined) {
        setRatingText("rating field is required");
        setRatingError(true);
      }
      if (
        youtube_url !== "" &&
        !youtube_url.startsWith("https://www.youtube.com/")
      ) {
        setYoutube_urlText("please insert a valid youtube url");
        setYoutube_urlError(true);
      }
      if (description === "") {
        setDescriptionText("description field is required");
        setDescriptionError(true);
      }
    }
  };

  return (
    <div id="add-new-movie" className="my-movies-page">
      <p className="my-movies-title">Post a movie</p>

      <Form className="white-form">
        {postMovieState.errMsg && (
          <span className="text-danger err-login">{postMovieState.errMsg}</span>
        )}
        <Form.Row>
          <Form.Group controlId="formGridTitle">
            <Form.Label>Title *</Form.Label>
            <Form.Control
              type="title"
              placeholder="Enter movie title"
              onChange={checkTitle}
            />
            {titleError && <span className="text-danger">{titleText}</span>}
            {postMovieState.title_err && (
              <span className="text-danger">{postMovieState.title_err}</span>
            )}
          </Form.Group>
          <Form.Group controlId="formGridCategory">
            <Form.Label>Category *</Form.Label>
            <Form.Control
              as="select"
              defaultValue="Choose..."
              onChange={checkCategory}
            >
              <option disabled>Choose...</option>
              {categories.map((category) => (
                <option>{category}</option>
              ))}
            </Form.Control>
            {categoryError && (
              <span className="text-danger">{categoryText}</span>
            )}
            {postMovieState.category_err && (
              <span className="text-danger">{postMovieState.category_err}</span>
            )}
          </Form.Group>
          <Form.Group controlId="formGridRating">
            <Form.Label>Rating *</Form.Label>
            <Form.Control
              type="number"
              min="1"
              max="10"
              placeholder="Rating from 1 to 10"
              onChange={checkRating}
            />
            {ratingError && <span className="text-danger">{ratingText}</span>}
            {postMovieState.rating_err && (
              <span className="text-danger">{postMovieState.rating_err}</span>
            )}
          </Form.Group>
        </Form.Row>
        <Form.Row>
          <Form.Group className="form-group2" controlId="formGridAddress1">
            <Form.Label>Youtube url</Form.Label>
            <Form.Control
              placeholder="https://www.youtube.com/........"
              onChange={checkYoutube_url}
            />
            {youtube_urlError && (
              <span className="text-danger">{youtube_urlText}</span>
            )}
            {postMovieState.youtube_url_err && (
              <span className="text-danger">
                {postMovieState.youtube_url_err}
              </span>
            )}
          </Form.Group>
          <Form.Group className="form-group2" controlId="formGridPoster">
            <Form.Label>Poster</Form.Label>
            <Form.File id="exampleFormControlFile1" onChange={checkMovie_img} />
            {movie_imgError && (
              <span className="text-danger">{movie_imgText}</span>
            )}
            {postMovieState.movie_img_err && (
              <span className="text-danger">
                {postMovieState.movie_img_err}
              </span>
            )}
          </Form.Group>
        </Form.Row>

        <Form.Row>
          <Form.Group
            className="form-group3"
            controlId="exampleForm.ControlTextarea1"
          >
            <Form.Label>Description *</Form.Label>
            <Form.Control as="textarea" rows={3} onChange={checkDescription} />
            {descriptionError && (
              <span className="text-danger">{descriptionText}</span>
            )}
            {postMovieState.description_err && (
              <span className="text-danger">
                {postMovieState.description_err}
              </span>
            )}
          </Form.Group>
        </Form.Row>
        <Form.Row>
          <Form.Group
            className="form-group3 middle-row"
            controlId="exampleForm.ControlTextarea1"
          >
            <Button className="post-Btn" color="primary" onClick={handleSubmit}>
              {postMovieState.loading && <Spinner animation="border" />}
              {!postMovieState.loading && <span>Submit</span>}
            </Button>
          </Form.Group>
        </Form.Row>
      </Form>
    </div>
  );
};
export default PostMovie;
