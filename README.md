# GitHub Repositories Explorer

This is a React application that integrates with the GitHub API, allowing users to search for up to 5 users with a username similar to the value entered in the search input. When a user is selected, the application displays all repositories for that GitHub user.

[Live Demo](https://bagasafrz7.github.io/github-explorer-repositories/)

## Features

- Interactive splash screen introduction for first-time users
- Search for GitHub users by username
- Display up to 5 users that match the search query
- View all repositories for a selected user
- Smooth animations and transitions using Framer Motion
- Responsive design for mobile and desktop
- Error handling and loading states
- Keyboard event handling

## Technologies Used

- React
- TypeScript
- Vite
- Tailwind CSS
- Shadcn/UI
- Framer Motion
- React Query
- GitHub API v3
- Workflows Github Action

## Animation Details

This application uses Framer Motion to create smooth, engaging animations:

- Interactive splash screen with step-by-step introduction
- Page elements fade in with staggered timing
- User cards animate on hover and tap
- Repository cards have a subtle float animation on hover
- Error messages slide in and out smoothly
- Button interactions have ripple effects
- Badges have subtle scale animations on hover

## Getting Started

### Prerequisites

- Node.js (v14 or higher)
- npm or yarn

### Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/bagasafrz7/github-explorer-repositories
   cd github-explorer
   ```

2. Install dependencies:

   ```bash
   npm install
   # or
   yarn
   ```

3. Start the development server:

   ```bash
   npm run dev
   # or
   yarn dev
   ```

4. Open your browser and navigate to `http://localhost:5173`

### Building for Production

```bash
npm run build
# or
yarn build
```

## Deployment

This project is configured to be deployed using GitHub Pages. After pushing your code to GitHub:

1. Configure your GitHub repository settings to use GitHub Pages from the `gh-pages` branch.

2. Run the deploy script:
   ```bash
   npm run deploy
   # or
   yarn deploy
   ```

## API Usage

This application uses the GitHub API v3. No API key is required for basic usage, but there are rate limits for unauthenticated requests.

- Search users: `https://api.github.com/search/users?q={username}&per_page=5`
- Get user repositories: `https://api.github.com/users/{username}/repos?sort=updated`

## License

This project is licensed under the MIT License - see the LICENSE file for details.
