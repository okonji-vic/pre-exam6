import React, { useState } from "react";
import styles from "./GitHubRepos2.module.css";
import { Link } from "react-router-dom";

const GitHubRepos2 = ({
  inputValue2,
  setInputValue2,
  username,
  setUsername,
  repos,
  setRepos,
  inputValue,
  setInputValue,
  itemsPerPage,
  setItemsPerPage,
  currentPage,
  setCurrentPage,
}) => {
  const [originalRepos, setOriginalRepos] = useState(repos); // Holds the unmodified repository list

  const handleSubmit = (e) => {
    e.preventDefault();
    setUsername(inputValue2);
  };

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const handleSortChange = (sortType) => {
    let sortedRepos = [...originalRepos]; // Work directly on the original repository list

    switch (sortType) {
      case "a-z":
        sortedRepos.sort((a, b) => a.name.localeCompare(b.name));
        break;
      case "z-a":
        sortedRepos.sort((a, b) => b.name.localeCompare(a.name));
        break;
      case "newest":
        sortedRepos.sort((a, b) => new Date(b.created_at) - new Date(a.created_at));
        break;
      case "oldest":
        sortedRepos.sort((a, b) => new Date(a.created_at) - new Date(b.created_at));
        break;
      case "updated":
        sortedRepos.sort((a, b) => new Date(b.updated_at) - new Date(a.updated_at));
        break;
      case "leastupdated":
        sortedRepos.sort((a, b) => new Date(a.updated_at) - new Date(b.updated_at));
        break;
      case "moststars":
        sortedRepos.sort((a, b) => b.stargazers_count - a.stargazers_count);
        break;
      case "leaststars":
        sortedRepos.sort((a, b) => a.stargazers_count - b.stargazers_count);
        break;
      case "mostforks":
        sortedRepos.sort((a, b) => b.forks_count - a.forks_count);
        break;
      case "leastforks":
        sortedRepos.sort((a, b) => a.forks_count - b.forks_count);
        break;
      case "description":
        sortedRepos = originalRepos.filter((repo) => repo.description !== null);
        break;
      case "hasforks":
        sortedRepos = originalRepos.filter((repo) => repo.forks_count > 0);
        break;
      case "noforks":
        sortedRepos = originalRepos.filter((repo) => repo.forks_count === 0);
        break;
      case "noissues":
        sortedRepos = originalRepos.filter((repo) => repo.open_issues_count === 0);
        break;
      case "hasprojects":
        sortedRepos = originalRepos.filter((repo) => repo.has_projects);
        break;
      case "hasdownloads":
        sortedRepos = originalRepos.filter((repo) => repo.has_downloads);
        break;
      default:
        sortedRepos = [...originalRepos]; // Reset to the original list
        break;
    }

    setRepos(sortedRepos);
  };

  const filteredRepos = repos.filter((repo) =>
    repo.name.toLowerCase().includes(inputValue.toLowerCase())
  );

  const indexOfLastRepo = currentPage * itemsPerPage;
  const indexOfFirstRepo = indexOfLastRepo - itemsPerPage;
  const currentRepos = filteredRepos.slice(indexOfFirstRepo, indexOfLastRepo);

  const totalPages = Math.ceil(filteredRepos.length / itemsPerPage);

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>GitHub Repositories for {username}</h1>
      <form onSubmit={handleSubmit} className={styles.form}>
        <input
          type="text"
          value={inputValue2}
          onChange={(e) => setInputValue2(e.target.value)}
          placeholder="Enter GitHub username"
          className={styles.input}
        />
        <button type="submit" className={styles.button}>
          Search
        </button>
      </form>
      <div className={styles.filterContainer}>
        <select style={{color: 'grey',}} onChange={(e) => handleSortChange(e.target.value)} className={styles.select}>
          <option value="" >Sort Repositories</option>
          <option value="a-z">A-Z</option>
          <option value="z-a">Z-A</option>
          <option value="newest">Newest</option>
          <option value="oldest">Oldest</option>
          <option value="updated">Recently Updated</option>
          <option value="leastupdated">Least Updated</option>
          <option value="moststars">Most Stars</option>
          <option value="leaststars">Least Stars</option>
          <option value="mostforks">Most Forks</option>
          <option value="leastforks">Least Forks</option>
          <option value="description">Has Description</option>
          <option value="hasforks">Has Forks</option>
          <option value="noforks">No Forks</option>
          <option value="noissues">No Issues</option>
          <option value="hasprojects">Has Projects</option>
          <option value="hasdownloads">Has Downloads</option>
        </select>
        <input
          type="text"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          placeholder="Search repositories"
          className={styles.input}
        />
        <select
          value={itemsPerPage}
          onChange={(e) => setItemsPerPage(Number(e.target.value))}
          className={styles.select}
        >
          <option value="5">5 per page</option>
          <option value="10">10 per page</option>
          <option value="20">20 per page</option>
        </select>
      </div>
      <ul className={styles.repoList}>
        {currentRepos.map((repo) => (
          <li key={repo.id} className={styles.repoItem}>
            <Link to="/about" className={styles.link} state={{ repo }}>
              <h3>{repo.name}</h3>
            </Link>
            <p>{repo.description}</p>
            <a href={repo.html_url} target="_blank" rel="noopener noreferrer">
              View on GitHub
            </a>
          </li>
        ))}
      </ul>
      <div className={styles.pagination}>
        {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
          <button
            key={page}
            onClick={() => handlePageChange(page)}
            className={`${styles.pageButton} ${
              currentPage === page ? styles.activePage : ""
            }`}
          >
            {page}
          </button>
        ))}
      </div>
    </div>
  );
};

export default GitHubRepos2;
