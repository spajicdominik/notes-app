import { useState } from "react";
import classes from "./NewPost.module.css";
import Button from "react-bootstrap/esm/Button";

function NewPost({onAuthorChange, onBodyChange, onEventChange}) {
  
  return (
    <div className="col-md-6 col-12">
      <form className={classes.form} onSubmit={onEventChange}>
        <p>
          <label htmlFor="body">Text</label>
          <textarea id="body" required rows={3} onChange={onBodyChange} />
        </p>
        <p>
          <label htmlFor="name">Your name</label>
          <input
            type="text"
            id="name"
            required
            onChange={onAuthorChange}
          />
        </p>
        <p>
          <button>Submit</button>
        </p>
      </form>
    </div>
  );
}

export default NewPost;
