import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import Post from "./components/Post";
import PostsList from "./components/PostsList";
import NewPost from "./components/NewPost";
import { useEffect, useState } from "react";
import NavScrollExample from "./components/NavScrollExample";
import Login from "./components/Login";
import Register from "./components/Register";
import { Route, Routes, Navigate, useNavigate } from "react-router-dom";
import About from "./components/About"

function App() {
  const [enteredBody, setEnteredBody] = useState("");
  const [enteredAuthor, setEnteredAuthor] = useState("");
  const [posts, setPosts] = useState([]);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [searchTerm, setSearchTerm] = useState(""); 
  const navigate = useNavigate();

  

  const handleDownloadPosts = async () => {
    try {
      const response = await fetch('http://localhost:8080/posts');
      const posts = await response.json();

      const jsonData = JSON.stringify(posts.posts, null, 2); 
      
      const blob = new Blob([jsonData], { type: 'application/json' });
      const link = document.createElement('a');
      link.href = URL.createObjectURL(blob);
      link.download = 'tasks.json';
      link.click();
    } catch (error) {
      console.error('Error downloading tasks:', error);
    }
  };


  const handleSearch = (term) => {
    setSearchTerm(term);
  };

  const filteredPosts = posts.filter(post =>
    post.body.toLowerCase().includes(searchTerm.toLowerCase()) ||
    post.author.toLowerCase().includes(searchTerm.toLowerCase())
  );

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      setIsAuthenticated(true);
    }
  }, []);

  const handleLogin = (token) => {
    localStorage.setItem("token", token);
    setIsAuthenticated(true);
    navigate("/");
  };

  const handleLogout = () => {
    localStorage.removeItem('token'); 
    setIsAuthenticated(false);         
    navigate('/login');             
  };

  useEffect(() => {
    async function fetchPosts() {
      const response = await fetch("http://localhost:8080/posts");
      const resData = await response.json();
      setPosts(resData.posts);
    }
    fetchPosts();
  }, []);

  function addPostHandler(postData) {
    fetch("http://localhost:8080/posts", {
      method: "POST",
      body: JSON.stringify(postData),
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((response) => response.json())
      .then((data) => {
        setPosts((existingPosts) => [data.post, ...existingPosts]);
      })
      .catch((error) => {
        console.error("Error adding post:", error);
      });
  }

  function submitHandler(event) {
    event.preventDefault();
    const postData = {
      body: enteredBody,
      author: enteredAuthor,
    };
    addPostHandler(postData);
  }

  function changeBodyHandler(event) {
    setEnteredBody(event.target.value);
  }

  function changeAuthorHandler(event) {
    setEnteredAuthor(event.target.value);
  }

  const deletePostHandler = async (id) => {
    if (!id) {
      console.error("Post ID is undefined");
      return;
    }

    try {
      const response = await fetch(`http://localhost:8080/posts/${id}`, {
        method: "DELETE",
      });

      if (response.ok) {
        setPosts((prevPosts) => prevPosts.filter((post) => post._id !== id));
      } else {
        console.error("Failed to delete post");
      }
    } catch (error) {
      console.error("Error deleting post:", error);
    }
  };

  return (
    <main>
      <Routes>
        <Route
        path="/about"
        element={
          isAuthenticated ? (
            <div className="container">
              <NavScrollExample onLogout={handleLogout} 
                isAuthenticated={isAuthenticated} 
                onSearch={handleSearch}
                onDownload={handleDownloadPosts}></NavScrollExample>
            <About></About>
            </div>
          ) : (
            <Navigate to="/login" />
          )
        }
        />

        <Route
          path="/login"
          element={
            isAuthenticated ? (
              <Navigate to="/" />
            ) : (
              <Login onLogin={handleLogin} />
            )
          }
        />
        <Route
          path="/register"
          element={isAuthenticated ? <Navigate to="/" /> : <Register />}
        />
        <Route
          path="/"
          element={
            isAuthenticated ? (
              <div>
                <NavScrollExample onLogout={handleLogout} 
                isAuthenticated={isAuthenticated} 
                onSearch={handleSearch}
                onDownload={handleDownloadPosts}></NavScrollExample>
                <div className="container mt-4">
                  <div className="row d-flex justify-content-center">
                    <NewPost
                      onBodyChange={changeBodyHandler}
                      onAuthorChange={changeAuthorHandler}
                      onEventChange={submitHandler}
                    ></NewPost>
                    <PostsList
                      postsArray={filteredPosts}
                      handleDelete={deletePostHandler}
                    ></PostsList>
                  </div>
                </div>
              </div>
            ) : (
              <Navigate to="/login" />
            )
          }
        />
      </Routes>
    </main>
  );
}

export default App;
