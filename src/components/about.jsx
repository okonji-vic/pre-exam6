
  import React, { Suspense } from "react";
import { Link, useLocation } from "react-router-dom";
import styles from "./About.module.css";

const About = ({ username, repos, itemsPerPage, currentPage, setCurrentPage }) => {
  const location = useLocation();
  const { repo } = location.state || {};

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;

  const currentItems = repos.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(repos.length / itemsPerPage);

  const handlePageChange = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <div className={styles.container}>
      {repo ? (
        <div className={styles.singleRepo}>
          <h2 className={styles.title}>About Repository</h2>
          <div className={styles.repoDetails}>
            <p>
              <strong>Name:</strong> {repo.name}
            </p>
            <p>
              <strong>Full name:</strong> {repo.full_name}
            </p>
            <p>
              <strong>Owner:</strong> {repo.owner.login}
            </p>
            <p>
              <strong>Description:</strong>{" "}
              {repo.description || "No description available"}
            </p>
            <p>
              <strong>Stars:</strong> {repo.stargazers_count}
            </p>
            <p>
              <strong>Forks:</strong> {repo.forks_count}
            </p>
            <p>
              <strong>Open Issues:</strong> {repo.open_issues_count}
            </p>
            <p>
              <strong>Has Projects:</strong> {repo.has_projects ? "Yes" : "No"}
            </p>
            <p>
              <strong>Has Downloads:</strong> {repo.has_downloads ? "Yes" : "No"}
            </p>
            <p>
              <strong>Language:</strong> {repo.language || "Not specified"}
            </p>
            <p>
              <strong>Default Branch:</strong> {repo.default_branch}
            </p>
            <p>
              <strong>Creation Date:</strong>{" "}
              {new Date(repo.created_at).toLocaleDateString()}
            </p>
            <p>
              <strong>Time:</strong>{" "}
              {new Date(repo.created_at).toLocaleTimeString()}
            </p>
            <a
              href={repo.html_url}
              target="_blank"
              rel="noopener noreferrer"
              className={styles.link}
            >
              View on GitHub
            </a>
          </div>
        </div>
      ) : (
        <div className={styles.allRepos}>
          <h2 className={styles.title}>All Filtered Repositories</h2>
          {currentItems.map((filteredRepo) => (
            <div key={filteredRepo.id} className={styles.repoCard}>
              <h3 className={styles.repoName}>{filteredRepo.name}</h3>
              <p>
                <strong>Full name:</strong> {filteredRepo.full_name}
              </p>
              <p>
                <strong>Owner:</strong> {filteredRepo.owner.login}
              </p>
              <p>
                <strong>Description:</strong>{" "}
                {filteredRepo.description || "No description available"}
              </p>
              <p>
                <strong>Creation Date:</strong>{" "}
                {new Date(filteredRepo.created_at).toLocaleDateString()}
              </p>
              <p>
                <strong>Time:</strong>{" "}
                {new Date(filteredRepo.created_at).toLocaleTimeString()}
              </p>
              <a
                href={filteredRepo.html_url}
                target="_blank"
                rel="noopener noreferrer"
                className={styles.link}
              >
                View on GitHub
              </a>
              
            </div>
          ))}
          <div className={styles.pagination}>
            {[...Array(totalPages)].map((_, index) => (
              <button
                key={index + 1}
                onClick={() => handlePageChange(index + 1)}
                className={`${styles.pageButton} ${
                  currentPage === index + 1 ? styles.active : ""
                }`}
              >
                {index + 1}
              </button>
            ))}
          </div>
        </div>
      )}
      <Link to="/" className={styles.backLink}>
        Back to Repositories
      </Link>
    </div>
  );
};

export default About;

