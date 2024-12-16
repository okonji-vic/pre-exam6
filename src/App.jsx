// App.jsx
// import React, { useState, useEffect } from "react";
// import {Routes, Route, Link, NavLink } from "react-router-dom";
// import ClipLoader from "react-spinners/ClipLoader";
// import { ErrorBoundary } from "react-error-boundary";
// import "./App.css";
// import About from "./about";

// function App() {
//   const [inputValue2, setInputValue2] = useState("");
//   const [username, setUsername] = useState("oluwasetemi");
//   const [repos, setRepos] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);
//   const [currentPage, setCurrentPage] = useState(1);
//   const [inputValue, setInputValue] = useState("");
//   const [itemsPerPage, setItemsPerPage] = useState(5);

//   useEffect(() => {
//     setLoading(true);
//     let mounted = true;
//     if (!username) return;
//     if (mounted) {
//       document.title = `GitHub Repositories - ${username}`;
//       fetch(`https://api.github.com/users/${username}/repos`)
//         .then((response) => {
//           if (!response.ok) {
//             throw new Error(`HTTP error! Status: ${response.status}`);
//           }
//           return response.json();
//         })
//         .then((data) => {
//           setRepos(data);
//           setLoading(false);
//         })
//         .catch((err) => {
//           setError(err.message);
//           setLoading(false);
//         });
//     }
//     return () => {
//       setLoading(true);
//       mounted = false;
//     };
//   }, [username]);

//   if (loading)
//     return (
//       <div className="spinner">
//         <ClipLoader color="#36d7b7" size={50} />
//       </div>
//     );

//   if (error) return <p className="error">Error: {error}</p>;

//   return (
//     <Router>
//       <Navigation />
//       <div className="app-container">
//         <Routes>
//           <Route
//             path="/"
//             element={
//               <GitHubRepos
//                 inputValue2={inputValue2}
//                 setInputValue2={setInputValue2}
//                 username={username}
//                 setUsername={setUsername}
//                 repos={repos}
//                 setRepos={setRepos}
//                 loading={loading}
//                 setLoading={setLoading}
//                 error={error}
//                 setError={setError}
//                 inputValue={inputValue}
//                 setInputValue={setInputValue}
//                 itemsPerPage={itemsPerPage}
//                 setItemsPerPage={setItemsPerPage}
//                 currentPage={currentPage}
//                 setCurrentPage={setCurrentPage}
//               />
//             }
//           />
//           <Route
//             path="/about"
//             element={<About repos={repos} currentPage={currentPage} itemsPerPage={itemsPerPage} />}
//           />
//           <Route
//             path="/error"
//             element={<ErrorComponent />}
//           />
//           <Route
//             path="*"
//             element={
//               <div className="not-found">
//                 <h1>404: Page Not Found</h1>
//                 <Link to="/">Go to Home Page</Link>
//               </div>
//             }
//           />
//         </Routes>
//       </div>
//     </Router>
//   );
// }

// function Navigation() {
//   return (
//     <nav className="nav-bar">
//       <NavLink to="/" className={({ isActive }) => (isActive ? "active" : "nav-link")}>Repositories</NavLink>
//       <NavLink to="/about" className={({ isActive }) => (isActive ? "active" : "nav-link")}>About</NavLink>
//       <NavLink to="/error" className={({ isActive }) => (isActive ? "active" : "nav-link")}>Error</NavLink>
//     </nav>
//   );
// }

// function GitHubRepos({
//   inputValue2,
//   setInputValue2,
//   username,
//   setUsername,
//   repos,
//   setRepos,
//   inputValue,
//   setInputValue,
//   itemsPerPage,
//   setItemsPerPage,
//   currentPage,
//   setCurrentPage,
// }) {
//   const [search, setSearch] = useState("");

//   const handleSubmit = () => {
//     if (inputValue && !isNaN(inputValue)) {
//       setItemsPerPage(Number(inputValue));
//     }
//     if (inputValue2.trim()) {
//       setUsername(inputValue2);
//     }
//   };

//   const filteredRepos = repos.filter((repo) => {
//     if (!search.trim()) return true;
//     return repo.name.toLowerCase().includes(search.toLowerCase());
//   });

//   const indexOfLastItem = currentPage * itemsPerPage;
//   const indexOfFirstItem = indexOfLastItem - itemsPerPage;
//   const currentItems = filteredRepos.slice(indexOfFirstItem, indexOfLastItem);
//   const totalPages = Math.ceil(filteredRepos.length / itemsPerPage);

//   return (
//     <div className="repos-container">
//       <h1>{username.toUpperCase()}'s GitHub Repositories</h1>
//       <div className="filter-container">
//         <label>
//           Items per page:
//           <input
//             type="number"
//             value={inputValue}
//             onChange={(e) => setInputValue(e.target.value)}
//           />
//         </label>
//         <label>
//           GitHub Username:
//           <input
//             type="text"
//             value={inputValue2}
//             onChange={(e) => setInputValue2(e.target.value)}
//           />
//         </label>
//         <button onClick={handleSubmit}>Submit</button>
//       </div>
//       <div className="search-sort">
//         <input
//           type="text"
//           placeholder="Search repositories"
//           value={search}
//           onChange={(e) => setSearch(e.target.value)}
//         />
//       </div>
//       <ul className="repo-list">
//         {currentItems.map((repo) => (
//           <li key={repo.id}>
//             <a href={repo.html_url} target="_blank" rel="noopener noreferrer">
//               {repo.name}
//             </a>
//           </li>
//         ))}
//       </ul>
//       <div className="pagination">
//         {[...Array(totalPages)].map((_, index) => (
//           <button
//             key={index}
//             onClick={() => setCurrentPage(index + 1)}
//             className={currentPage === index + 1 ? "active" : ""}
//           >
//             {index + 1}
//           </button>
//         ))}
//       </div>
//     </div>
//   );
// }

// function About({ repos, currentPage, itemsPerPage }) {
//   const indexOfLastItem = currentPage * itemsPerPage;
//   const indexOfFirstItem = indexOfLastItem - itemsPerPage;
//   const currentItems = repos.slice(indexOfFirstItem, indexOfLastItem);

//   return (
//     <div className="about-container">
//       <h1>About Repositories</h1>
//       {currentItems.map((repo) => (
//         <div key={repo.id} className="repo-details">
//           <p><strong>Name:</strong> {repo.name}</p>
//           <p><strong>Description:</strong> {repo.description || "No description available"}</p>
//           <p><strong>Language:</strong> {repo.language}</p>
//           <p><strong>Stars:</strong> {repo.stargazers_count}</p>
//           <p><strong>Forks:</strong> {repo.forks_count}</p>
//           <p><strong>Watchers:</strong> {repo.watchers_count}</p>
//           <p><strong>Open Issues:</strong> {repo.open_issues_count}</p>
//           <p><strong>Created At:</strong> {new Date(repo.created_at).toLocaleString()}</p>
//           <a href={repo.html_url} target="_blank" rel="noopener noreferrer">
//             View on GitHub
//           </a>
//         </div>
//       ))}
//     </div>
//   );
// }

// function ErrorComponent() {
//   return (
//     <ErrorBoundary
//       FallbackComponent={({ error, resetErrorBoundary }) => (
//         <div className="error-boundary">
//           <h2>Something went wrong</h2>
//           <p>{error.message}</p>
//           <button onClick={resetErrorBoundary}>Try Again</button>
//         </div>
//       )}
//     >
//       <BuggyComponent />
//     </ErrorBoundary>
//   );
// }

// function BuggyComponent() {
//   throw new Error("This is a test error. Please fix it!");
// }

// export default App;

// function App() {
//   const [inputValue2, setInputValue2] = useState("");
//   const [username, setUsername] = useState("oluwasetemi");
//   const [repos, setRepos] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);
//   const [currentPage, setCurrentPage] = useState(1);
//   const [inputValue, setInputValue] = useState("");
//   const [itemsPerPage, setItemsPerPage] = useState(5);

//   useEffect(() => {
//     setLoading(true);
//     let mounted = true;
    
//     if (mounted) {
//     document.title = `GitHub Repositories - ${username}`;
//     fetch(`https://api.github.com/users/${username}/repos`)
//       .then((response) => {
//         if (!response.ok) {
//           throw new Error(`HTTP error! Status: ${response.status}`);
//         }
//         return response.json();
//       })
//       .then((data) => {
//         setRepos(data);
//         setLoading(false);
        
//         // setInputValue2("");
//         // setInputValue("");
//       })
//       .catch((err) => {
//         setError(err.message);
//         setLoading(false);
//       });
//     }
//     return () => {
//       console.log("cleanup");
//       setLoading(true);
//       mounted = false;
//     };
//   }, [username]);

//   if (loading)
//     return (
//       <div className="spinner">
//         <ClipLoader color="#36d7b7" size={50} />
//       </div>
//     );

//   if (error) return <p>Error: {error}</p>;

//   return (
//     <>
//     <Navigation />
//     <Routes>
//       <Route
//         path="/"
//         element={
//           <GitHubRepos2
//             inputValue2={inputValue2}
//             setInputValue2={setInputValue2}
//             username={username}
//             setUsername={setUsername}
//             repos={repos}
//             setRepos={setRepos}
//             loading={loading}
//             setLoading={setLoading}
//             error={error}
//             setError={setError}
//             inputValue={inputValue}
//             setInputValue={setInputValue}
//             itemsPerPage={itemsPerPage}
//             setItemsPerPage={setItemsPerPage}
//             currentPage={currentPage}
//             setCurrentPage={setCurrentPage}
//           />
//         }
//       />
//       <Route
//         path="/about"
//         element={
//           <About
//             inputValue2={inputValue2}
//             setInputValue2={setInputValue2}
//             username={username}
//             setUsername={setUsername}
//             repos={repos}
//             setRepos={setRepos}
//             loading={loading}
//             setLoading={setLoading}
//             error={error}
//             setError={setError}
//             inputValue={inputValue}
//             setInputValue={setInputValue}
//             itemsPerPage={itemsPerPage}
//             setItemsPerPage={setItemsPerPage}
//             currentPage={currentPage}
//             setCurrentPage={setCurrentPage}
//           />
//         }
//       />
//       <Route path="/error" element={<ErrorComponent />} />
//       <Route path="*" element={
//       <>
//         <h1>404: Page Not Found</h1>
//       <button><a href="/">Go to Home page</a></button>
//       </>
//       } />
//     </Routes>
//     </>
//   );
// }

// function GitHubRepos2({
//   inputValue2,
//   setInputValue2,
//   username,
//   setUsername,
//   repos,
//   setRepos,
//   loading,
//   setloading,
//   error,
//   setError,
//   inputValue,
//   setInputValue,
//   itemsPerPage,
//   setItemsPerPage,
//   currentPage,
//   setCurrentPage,
// }) {
//   const [search, setSearch] = useState("");

//   const handleSubmit = () => {
//     if (inputValue && !isNaN(inputValue)) {
//       setItemsPerPage(Number(inputValue));
//     }
//     if (inputValue < 1) {
//       setItemsPerPage(1);
//     }
//     if (inputValue2.trim()) {
//       setUsername(inputValue2);
//     }
//   };

//   const sortRepos = (sortType) => {
//     const originalRepos = [...repos];

//     let reposCopy = [...originalRepos];

//     if (sortType === "") {
//       setRepos(originalRepos);
//     } else if (sortType === "a-z") {
//       reposCopy.sort((a, b) => a.name.localeCompare(b.name));
//     } else if (sortType === "z-a") {
//       reposCopy.sort((a, b) => b.name.localeCompare(a.name));
//     } else if (sortType === "newest") {
//       reposCopy.sort((a, b) => new Date(b.created_at) - new Date(a.created_at));
//     } else if (sortType === "oldest") {
//       reposCopy.sort((a, b) => new Date(a.created_at) - new Date(b.created_at));
//     } else if (sortType === "updated") {
//       reposCopy.sort((a, b) => new Date(b.updated_at) - new Date(a.updated_at));
//     } else if (sortType === "leastupdated") {
//       reposCopy.sort((a, b) => new Date(a.updated_at) - new Date(b.updated_at));
//     } else if (sortType === "moststars") {
//       reposCopy.sort((a, b) => b.stargazers_count - a.stargazers_count);
//     } else if (sortType === "leaststars") {
//       reposCopy.sort((a, b) => a.stargazers_count - b.stargazers_count);
//     } else if (sortType === "mostforks") {
//       reposCopy.sort((a, b) => b.forks_count - a.forks_count);
//     } else if (sortType === "leastforks") {
//       reposCopy.sort((a, b) => a.forks_count - b.forks_count);
//     } else if (sortType === "description") {
//       reposCopy = reposCopy.filter((repo) => repo.description !== null);
//     } else if (sortType === "hasforks") {
//       reposCopy = reposCopy.filter((repo) => repo.forks_count > 0);
//     } else if (sortType === "noforks") {
//       reposCopy = reposCopy.filter((repo) => repo.forks_count === 0);
//     }  else if (sortType === "noissues") {
//       reposCopy = reposCopy.filter((repo) => repo.open_issues_count === 0);
//     } else if (sortType === "hasprojects") {
//       reposCopy = reposCopy.filter((repo) => repo.has_projects === true);
//     }  else if (sortType === "hasdownloads") {
//       reposCopy = reposCopy.filter((repo) => repo.has_downloads === true);
//     } 
//     setRepos(reposCopy);
//   };

//   const filteredRepos = repos.filter((repo) => {
//     if (!search.trim()) return true;
//     return repo.name.toLowerCase().includes(search.toLowerCase());
//   });

//   const indexOfLastItem = currentPage * itemsPerPage;
//   const indexOfFirstItem = indexOfLastItem - itemsPerPage;

//   const currentItems = filteredRepos.slice(indexOfFirstItem, indexOfLastItem);

//   const totalPages = Math.ceil(filteredRepos.length / itemsPerPage);

//   const handlePageChange = (pageNumber) => setCurrentPage(pageNumber);

//   return (
//     <div>
//       <h1>
//         {username.toUpperCase()}'S <span>GITHUB</span> REPOSITORIES{" "}
//       </h1>
//       <div className="container">
//       <div className="signin">
//         <label>
//           Items per page:{" "}
//           <input
//             type="text"
//             value={inputValue}
//             onChange={(e) => setInputValue(e.target.value)}
//             placeholder="Enter a number"
//           />
//         </label>
//         <br />
//         <label>
//           GitHub Username:{" "}
//           <input
//             type="text"
//             value={inputValue2}
//             onChange={(e) => setInputValue2(e.target.value)}
//             placeholder="Enter a username"
//           />
//         </label>
//         <br />
//         <button onClick={handleSubmit} className="button1">
//           Submit
//         </button>
//       </div>
//       <br />
//       <div>
//       <select onChange={(e) => sortRepos(e.target.value)}>
//         <option value="">Sort Repositories</option>
//         <option value="a-z">A-Z</option>
//         <option value="z-a">Z-A</option>
//         <option value="newest">Newest</option>
//         <option value="oldest">Oldest</option>
//         <option value="updated">Recently Updated</option>
//         <option value="leastupdated">Least Updated</option>
//         <option value="moststars">Most Stars</option>
//         <option value="leaststars">Least Stars</option>
//         <option value="mostforks">Most Forks</option>
//         <option value="leastforks">Least Forks</option>
//         <option value="description">Description</option>
//         <option value="hasforks">Has Forks</option>
//         <option value="noforks">No Forks</option>
//         <option value="noissues">No Issues</option>
//         <option value="hasprojects">Has Projects</option>
//         <option value="hasdownloads">Has Downloads</option>
//       </select>

//       <input
//         type="text"
//         value={search}
//         onChange={(e) => setSearch(e.target.value)}
//         placeholder="Search Repositories"
//       />

//       <ul>
//         {filteredRepos.length === 0 && search.length != 0 && (
//           <p style={{ color: "red" }}>No repositories found for {search}</p>
//         )}
//         {currentItems.length === 0 && inputValue2.length > 0 && (
//           <p style={{ color: "red" }}>
//             No repositories found for username {inputValue2}
//           </p>
//         )}
//         {currentItems.map((repo) => (
//           <li key={repo.id}>
//             <Link to="/about" state={{ repo }}>
//               {repo.name}
//             </Link>
//             {console.log(repo)}
//           </li>
//         ))}
//       </ul>
//       <div className="pagination">
//         {[...Array(totalPages)].map((_, index) => (
//           <button
//             key={index + 1}
//             onClick={() => handlePageChange(index + 1)}
//             className={currentPage === index + 1 ? "active" : ""}
//           >
//             {index + 1}
//           </button>
//         ))}
//          </div>
//         </div>
//       </div>
//     </div>
//   );
// }



// function Navigation() {
//   return (
//     <section className="nav-container">
//       <NavLink
//         to="/"
//         className={"nav-link"}
//         style={({ isActive }) =>
//           isActive
//             ? {
                
//                 backgroundColor: "black",
//                 border: "0.5px solid white",
//                 borderRadius: "5px",
                

//               }
//             : {
//                 color: "white",
//                 backgroundColor: '#646cff',
//                 border: "none",
//                 borderRadius: "5px",
                
//               }
//         }
//       >
//         <h4>Repositories</h4>
//       </NavLink>
//       <NavLink
//         to="/about"
//         className={"nav-link"}
        
//         style={({ isActive }) =>
//           isActive
//             ? {
                
//                 backgroundColor: "black",
//                 border: "0.5px solid white",
//                 borderRadius: "5px",
                
//               }
//             : {
                
//                 backgroundColor: '#646cff',
//                 border: "none",
//                 borderRadius: "5px",
                
                
            

//               }
//         }
//       >
//         <h4>About</h4>
//       </NavLink>
//       <NavLink
//         to="/error"
//         className={"nav-link"}
//         style={({ isActive }) =>
//           isActive
//             ? {
                
//                 backgroundColor: "black",
//                 border: "0.5px solid white",
//                 borderRadius: "5px",
                

//               }
//             : {
                
//                 backgroundColor: '#646cff',
//                 border: "none",
//                 borderRadius: "5px",
                
//               }
//         }
//       >
//         <h4>Error</h4>
//       </NavLink>
//     </section>
//   );
// }

// function FallbackComponent({ error, resetErrorBoundary }) {



//   return (
//     <div role="alert">
//       <h1>Something went wrong:</h1>
//       <pre>{error.message}</pre>
//       <button onClick={resetErrorBoundary}>Try Again</button>
//       {console.log(error)}
//     </div>
    
//   );
// }

// function BuggyComponent() {
//   // Simulate a crash
//   throw new Error("This is a test error! Please be patient \n while we rectify.");
// }

// function ErrorComponent() {
//   return (
//     <ErrorBoundary
//       FallbackComponent={FallbackComponent}
//       onReset={() => {
//         // Reset any state or perform any cleanup
//         console.log("Resetting...");
        
//       }}
//     >
//       <BuggyComponent />
//     </ErrorBoundary>
//   );
// }

// export default App;

import React, { useState, useEffect, Suspense } from "react";
import { Routes, Route } from "react-router-dom";
import { ClipLoader } from "react-spinners";
import GitHubRepos2 from "./components/GitHubRepos2";
import ErrorComponent from "./components/ErrorComponent";
import Layout from "./components/layout";
import styles from "./App.module.css";
import About from "./components/about";

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
