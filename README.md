# GitHub Repository Explorer 🔍

A React-based web application that allows users to search and explore public GitHub repositories by entering a GitHub username. It supports sorting, filtering, and pagination to make exploring repositories efficient and user-friendly.

## 🚀 Features

- 🔍 Search public repositories by GitHub username
- 📄 View repository details (name, description, stars, forks, etc.)
- 🎯 Filter repositories by:
  - Name (A-Z, Z-A)
  - Creation/Update date (Newest, Oldest, Recently Updated)
  - Star count
  - Forks
  - Description presence
  - Projects/downloads availability
- 👤 View user details (avatar, username, profile link, bio)
- 📑 Pagination with custom items per page
- 🌐 Link to each repository on GitHub

## 🛠️ Tech Stack

- **React**
- **React Router**
- **CSS Modules**
- **GitHub REST API**

## 📸 Preview

(https://repo02.netlify.app/) 

## 🔧 Installation

To run the project locally:

```bash
# Clone the repository
git clone https://github.com/okonji-vic/github-repo01.git

# Navigate to the project folder
cd github-repo-explorer

# Install dependencies
npm install

# Start the development server
npm start
The app will run on http://localhost:3000.

📂 Folder Structure
cpp
Copy
Edit
src/
├── components/
│   └── GitHubRepos2.jsx
├── styles/
│   └── GitHubRepos2.module.css
├── App.jsx
└── index.jsx
✍️ Usage
Enter a GitHub username in the search input.

View the user's public repositories.

Use the filters to sort repositories by stars, forks, creation/update time, etc.

Click on any repository to see more details or visit it on GitHub.

📤 Props Passed
The GitHubRepos2 component receives the following props:

jsx
Copy
Edit
{
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
}
These help in maintaining state from a parent component or context provider.

🧪 Future Improvements
Add loading states with spinners/skeletons

Enhance mobile responsiveness

Implement error handling and fallback UI

Allow bookmarking favorite repositories

🤝 Contributing
Contributions are welcome! Please open issues and submit pull requests to collaborate.

📄 License
This project is licensed under the MIT License.

Made with ❤️ by Okonji Emeka