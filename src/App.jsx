import React, { useState } from "react";
import "./App.css";

function App() {
  const [files, setFiles] = useState([]);
  const [dragActive, setDragActive] = useState(false);

  const handleChange = (e) => {
    e.preventDefault();
    if (e.target.files && e.target.files[0]) {
      setFiles([...e.target.files]);
    }
  };

  const handleReset = () => {
    setFiles([]);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const data = new FormData();
    files.forEach((file) => {
      data.append("file", file);
    });
    fetch("https://someapi", { method: "POST", body: data })
      .then((response) => response.json())
      .then(() => setFiles([]))
      .catch(() => setFiles([]));
  };

  const handleDrag = function (e) {
    e.preventDefault();
    setDragActive(true);
  };

  const handleLive = function (e) {
    e.preventDefault();
    setDragActive(false);
  };

  const handleDrop = function (e) {
    e.preventDefault();
    setDragActive(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      setFiles([...e.dataTransfer.files]);
    }
  };

  return (
    <div className="wrapper">
      <h1>Drag & Drop</h1>
      <form
        className={`form ${dragActive ? "drag" : ""}`}
        onReset={handleReset}
        onSubmit={handleSubmit}
        onDragEnter={handleDrag}
        onDragOver={handleDrag}
        onDragLeave={handleLive}
        onDrop={handleDrop}
      >
        <h2>Перетащите файлы сюда</h2>
        <p>или</p>
        <label className="label">
          <span>Загрузите файл</span>
          <input
            className="input"
            type="file"
            multiple={true}
            onChange={handleChange}
          />
        </label>
        {files.length > 0 && (
          <>
            <ul className="file-list">
              {files.map(({ name }, id) => (
                <li key={id}>{name}</li>
              ))}
            </ul>
            <button className="button-reset" type="reset">
              Отменить
            </button>
            <button className="button-submit" type="submit">
              Отправить
            </button>
          </>
        )}
      </form>
    </div>
  );
}

export default App;
