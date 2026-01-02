import React, { useState } from "react";
import "../components/Community.css";

const Community = () => {
  const [posts, setPosts] = useState([
    { id: 1, text: "Welcome to the trainer community!", time: "9:00 AM" },
    { id: 2, text: "Consistency is the key to progress.", time: "10:30 AM" },
  ]);
  const [inputText, setInputText] = useState("");

  const handlePost = (e) => {
    e.preventDefault();
    if (inputText.trim() === "") return;

    const newPost = {
      id: Date.now(),
      text: inputText,
      time: new Date().toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
      }),
    };

    setPosts([newPost, ...posts]);
    setInputText("");
  };

  return (
    <div className="community-container">
      <div className="input-header">
        <form className="input-form" onSubmit={handlePost}>
          <input
            type="text"
            placeholder="Share your thoughts..."
            className="post-input"
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
          />
          <button type="submit" className="send-btn">
            Post
          </button>
        </form>
      </div>

      <div className="messages-feed">
        {posts.map((post) => (
          <div key={post.id} className="post-card">
            <p>{post.text}</p>
            <span className="post-time">{post.time}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Community;
