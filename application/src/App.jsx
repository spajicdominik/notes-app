import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import Post from "./components/Post";
import PostsList from "./components/PostsList";
import NewPost from "./components/NewPost";
import { useState } from "react";
import NavScrollExample from "./components/NavScrollExample";

function App() {
  const [enteredBody, setEnteredBody] = useState("");
  const [enteredAuthor, setEnteredAuthor] = useState("");
  const [ posts, setPosts ] = useState([]);

  function addPostHandler(postData) {
    setPosts((existingPosts) => [postData, ...existingPosts]);
  }
  function submitHandler(event){
    event.preventDefault();
    const postData = {
      body: enteredBody,
      author: enteredAuthor
    };
    addPostHandler(postData);
    }
  function changeBodyHandler(event) {
    setEnteredBody(event.target.value);
  }
  function changeAuthorHandler(event) {
    setEnteredAuthor(event.target.value);
  }

  
  return (
    <main>
      <NavScrollExample></NavScrollExample>
      <div className="container mt-4">
        <div className="row d-flex justify-content-center">
          <NewPost
            onBodyChange={changeBodyHandler}
            onAuthorChange={changeAuthorHandler}
            onEventChange={submitHandler}
          ></NewPost>
          <PostsList postsArray={posts}>
          </PostsList>
        </div>
      </div>
    </main>
  );
}

export default App;
