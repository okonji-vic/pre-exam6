
import React, { useState, useEffect, Suspense } from "react";
import { Routes, Route } from "react-router-dom";
import { ClipLoader } from "react-spinners";
import GitHubRepos2 from "./components/GitHubRepos2";
import ErrorComponent from "./components/ErrorComponent";
import Layout from "./components/layout";
import styles from "./App.module.css";
import About from "./components/about";
import Contact from "./components/Contacts";

const App = () => {
  const [inputValue2, setInputValue2] = useState("");
  const [username, setUsername] = useState("oluwasetemi");
  const [repos, setRepos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [inputValue, setInputValue] = useState("");
  const [itemsPerPage, setItemsPerPage] = useState(5);

  useEffect(() => {
    setLoading(true);
    document.title = `GitHub Repositories - ${username}`;
    fetch(`https://api.github.com/users/${username}/repos`)
      .then((response) => {
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        console.log(response);
        return response.json();
      })
      .then((data) => {
        setRepos(data);
        setLoading(false);
        console.log(data);
      })
      .catch((err) => {
        setError(err.message);
        setLoading(false);
      });

    return () => {
      console.log("cleanup");
      setLoading(true);
    };
  }, [username,]);

  if (loading)
    return (
      <div className={styles.spinner}>
        <ClipLoader color="#36d7b7" size={50} />
      </div>
    );

  if (error) return <p className={styles.error}>Error: {error}</p>;

  return (
    <Layout>
      <Routes>
        <Route
          path="/"
          element={
            <GitHubRepos2
              inputValue2={inputValue2}
              setInputValue2={setInputValue2}
              username={username}
              setUsername={setUsername}
              repos={repos}
              setRepos={setRepos}
              loading={loading}
              setLoading={setLoading}
              error={error}
              setError={setError}
              inputValue={inputValue}
              setInputValue={setInputValue}
              itemsPerPage={itemsPerPage}
              setItemsPerPage={setItemsPerPage}
              currentPage={currentPage}
              setCurrentPage={setCurrentPage}
            />
          }
        />
        <Route
          path="/about"
          element={
            <Suspense fallback={<ClipLoader color="#36d7b7" size={50} />}>
            <About
              inputValue2={inputValue2}
              setInputValue2={setInputValue2}
              username={username}
              setUsername={setUsername}
              repos={repos}
              setRepos={setRepos}
              loading={loading}
              setLoading={setLoading}
              error={error}
              setError={setError}
              inputValue={inputValue}
              setInputValue={setInputValue}
              itemsPerPage={itemsPerPage}
              setItemsPerPage={setItemsPerPage}
              currentPage={currentPage}
              setCurrentPage={setCurrentPage}
            />
            </Suspense>
          }
        />
        <Route path="/contact" element={<Contact />} />
        <Route path="/error" element={<ErrorComponent />} />
        <Route
          path="*"
          element={
            <div className={styles.notFound}>
              <h1>404: Page Not Found</h1>
              <button className={styles.button}>
                <a href="/">Go to Home page</a>
              </button>
            </div>
          }
        />
      </Routes>
    </Layout>
  );
};

export default App;
