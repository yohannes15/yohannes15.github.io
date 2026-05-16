// Configuration for GitHub-sourced portfolio projects

export const projectsConfig = {
  // Only repos with this topic will be included
  requiredTopic: 'portfolio',
  
  // Repos to explicitly exclude (even if they have the portfolio topic)
  excludedRepos: [
    'yohannes15.github.io', // This portfolio site itself
  ],
  
  // Map GitHub topics to portfolio tags
  topicToTagMap: {
    'learning': 'Learning',
    'demo': 'Demo',
    'tool': 'Tool',
    'archived': 'Archived',
  } as const,
  
  // Map GitHub repo names to display titles (optional overrides)
  repoTitleMap: {
    'AddisMap': 'World Map Path Finder',
    'DeveloperMatchMaker': 'DevConnect',
    'fp-in-scala-red-book': 'Red Book Exercises',
    'advent-of-code': 'Advent of Code',
    'log-sentinel': 'Log Sentinel',
    'chess-engine': 'Chess Engine',
  } as const,
  
  // Score calculation weights (must sum to 1.0)
  scoreWeights: {
    stars: 0.6,
    recency: 0.4,
  },
  
  // Activity threshold (months)
  staleThresholdMonths: 6,
  
  // Valid image extensions to check in .github/
  imageExtensions: ['png', 'jpg', 'jpeg', 'svg', 'gif'],
} as const;
