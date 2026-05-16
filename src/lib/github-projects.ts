import { projectsConfig } from '../config/projects';

export interface GitHubRepo {
  name: string;
  full_name: string;
  description: string | null;
  html_url: string;
  homepage: string | null;
  topics: string[];
  stargazers_count: number;
  language: string | null;
  updated_at: string;
  default_branch: string;
}

export interface PortfolioProject {
  slug: string;
  title: string;
  subtitle: string;
  content: string;
  github: string;
  demo: string | null;
  thumb: string;
  tags: string[];
  language: string | null;
  score: number;
  order: number;
}

const GITHUB_API_BASE = 'https://api.github.com';
const GITHUB_RAW_BASE = 'https://raw.githubusercontent.com';

// Get GitHub token from env (optional, for higher rate limits)
const GITHUB_TOKEN = import.meta.env.GITHUB_TOKEN;

const headers: HeadersInit = {
  'Accept': 'application/vnd.github+json',
  'X-GitHub-Api-Version': '2022-11-28',
};

if (GITHUB_TOKEN) {
  headers['Authorization'] = `Bearer ${GITHUB_TOKEN}`;
}

/**
 * Fetch all repos for the user
 */
async function fetchUserRepos(username: string): Promise<GitHubRepo[]> {
  const response = await fetch(
    `${GITHUB_API_BASE}/users/${username}/repos?per_page=100&sort=updated`,
    { headers }
  );
  
  if (!response.ok) {
    throw new Error(`GitHub API error: ${response.status} ${response.statusText}`);
  }
  
  return response.json();
}

/**
 * Check if repo has portfolio thumbnail in .github/
 */
async function getPortfolioThumb(fullName: string, defaultBranch: string): Promise<string> {
  const { imageExtensions } = projectsConfig;
  
  for (const ext of imageExtensions) {
    const url = `${GITHUB_RAW_BASE}/${fullName}/${defaultBranch}/.github/portfolio-thumb.${ext}`;
    
    try {
      const response = await fetch(url, { method: 'HEAD' });
      if (response.ok) {
        return url;
      }
    } catch {
      // Try next extension
      continue;
    }
  }
  
  throw new Error(
    `[Portfolio] ✗ ${fullName}: Missing .github/portfolio-thumb.{${imageExtensions.join(',')}} - build failed`
  );
}

/**
 * Fetch and parse README for portfolio section
 */
async function getPortfolioContent(
  fullName: string,
  defaultBranch: string,
  description: string | null
): Promise<string> {
  try {
    const readmeUrl = `${GITHUB_RAW_BASE}/${fullName}/${defaultBranch}/README.md`;
    const response = await fetch(readmeUrl);
    
    if (!response.ok) {
      return description || '';
    }
    
    const readme = await response.text();
    
    // Look for <!-- portfolio-start --> ... <!-- portfolio-end -->
    const commentMatch = readme.match(/<!--\s*portfolio-start\s*-->([\s\S]*?)<!--\s*portfolio-end\s*-->/i);
    if (commentMatch) {
      return commentMatch[1].trim();
    }
    
    // Look for ## Portfolio section
    const sectionMatch = readme.match(/##\s+Portfolio\s*\n([\s\S]*?)(?=\n##|\n#|$)/i);
    if (sectionMatch) {
      return sectionMatch[1].trim();
    }
    
    // Fallback to description
    return description || '';
  } catch {
    return description || '';
  }
}

/**
 * Calculate project score based on stars and recency
 */
function calculateScore(stars: number, updatedAt: string): number {
  const { scoreWeights } = projectsConfig;
  
  const now = new Date();
  const updated = new Date(updatedAt);
  const monthsSinceUpdate = (now.getTime() - updated.getTime()) / (1000 * 60 * 60 * 24 * 30);
  
  // Recency score: 12 points if updated today, 0 if updated 12+ months ago
  const recencyScore = Math.max(0, 12 - monthsSinceUpdate);
  
  // Normalize and weight
  const starScore = stars * scoreWeights.stars;
  const recencyWeightedScore = recencyScore * scoreWeights.recency;
  
  return starScore + recencyWeightedScore;
}

/**
 * Determine if project is Active or Stale
 */
function getActivityTag(updatedAt: string): 'Active' | 'Stale' {
  const { staleThresholdMonths } = projectsConfig;
  
  const now = new Date();
  const updated = new Date(updatedAt);
  const monthsSinceUpdate = (now.getTime() - updated.getTime()) / (1000 * 60 * 60 * 24 * 30);
  
  return monthsSinceUpdate <= staleThresholdMonths ? 'Active' : 'Stale';
}

/**
 * Map GitHub topics to portfolio tags
 */
function mapTopicsToTags(topics: string[]): string[] {
  const { topicToTagMap } = projectsConfig;
  
  const tags: string[] = [];
  
  for (const topic of topics) {
    const tag = topicToTagMap[topic as keyof typeof topicToTagMap];
    if (tag) {
      tags.push(tag);
    }
  }
  
  return tags;
}

/**
 * Fetch and process all portfolio projects from GitHub
 */
export async function getPortfolioProjects(username: string = 'yohannes15'): Promise<PortfolioProject[]> {
  const { requiredTopic, excludedRepos } = projectsConfig;
  
  console.log('[Portfolio] Fetching repos from GitHub...');
  
  // Fetch all repos
  const allRepos = await fetchUserRepos(username);
  
  // Filter repos with portfolio topic
  const portfolioRepos = allRepos.filter(repo => 
    repo.topics.includes(requiredTopic) &&
    !excludedRepos.includes(repo.name)
  );
  
  console.log(`[Portfolio] Found ${portfolioRepos.length} repos with '${requiredTopic}' topic`);
  
  // Process each repo
  const projects: PortfolioProject[] = [];
  
  for (const repo of portfolioRepos) {
    try {
      console.log(`[Portfolio] Processing ${repo.name}...`);
      
      // Check for thumbnail (throws if missing)
      const thumb = await getPortfolioThumb(repo.full_name, repo.default_branch);
      console.log(`[Portfolio] ✓ ${repo.name} (found thumbnail)`);
      
      // Get content
      const content = await getPortfolioContent(
        repo.full_name,
        repo.default_branch,
        repo.description
      );
      
      // Calculate score and tags
      const score = calculateScore(repo.stargazers_count, repo.updated_at);
      const tags = mapTopicsToTags(repo.topics);
      
      // Always add activity tag (Active/Stale) for non-demo projects
      if (!tags.includes('Demo')) {
        tags.push(getActivityTag(repo.updated_at));
      }
      
      projects.push({
        slug: repo.name,
        title: projectsConfig.repoTitleMap[repo.name as keyof typeof projectsConfig.repoTitleMap] || 
               repo.name
                 .split('-')
                 .map(word => word.charAt(0).toUpperCase() + word.slice(1))
                 .join(' '),
        subtitle: repo.description || '',
        content,
        github: repo.html_url,
        demo: repo.homepage || null,
        thumb,
        tags,
        language: repo.language,
        score,
        order: 0, // Will be set after sorting
      });
    } catch (error) {
      // Thumbnail missing or other error - fail build
      console.error(error instanceof Error ? error.message : String(error));
      throw error;
    }
  }
  
  // Sort by score (highest first) and assign order
  projects.sort((a, b) => b.score - a.score);
  projects.forEach((project, index) => {
    project.order = index + 1;
  });
  
  console.log(`[Portfolio] ✓ Successfully processed ${projects.length} projects`);
  
  return projects;
}

/**
 * Check for manual override in content collection
 */
export async function getManualOverride(slug: string): Promise<string | null> {
  try {
    const module = await import(`../content/projects/${slug}.md`);
    return module.compiledContent?.() || null;
  } catch {
    return null;
  }
}
