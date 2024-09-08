import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import Post from "./components/Post";
import PostsList from "./components/PostsList";
import NewPost from "./components/NewPost";
import { useEffect, useState } from "react";
import NavScrollExample from "./components/NavScrollExample";

function App() {
  const [enteredBody, setEnteredBody] = useState("");
  const [enteredAuthor, setEnteredAuthor] = useState("");
  const [ posts, setPosts ] = useState([]);

  useEffect(() => {
    async function fetchPosts(){
      const response = await fetch ('http://localhost:8080/posts')
      const resData = await response.json();
      setPosts(resData.posts);
    }
    fetchPosts();
  }, []);

  function addPostHandler(postData) {
    fetch('http://localhost:8080/posts', {
      method: 'POST',
      body: JSON.stringify(postData),
      headers: {
        'Content-Type' : 'application/json'
      }
    });
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
