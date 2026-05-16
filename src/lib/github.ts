// Utility to fetch GitHub repo activity and determine if Active or Stale
export async function getRepoActivity(githubUrl: string): Promise<'Active' | 'Stale'> {
  try {
    const repoPath = githubUrl.replace('https://github.com/', '');
    const response = await fetch(`https://api.github.com/repos/${repoPath}`);
    
    if (!response.ok) return 'Stale';
    
    const data = await response.json();
    const lastUpdated = new Date(data.updated_at);
    const sixMonthsAgo = new Date();
    sixMonthsAgo.setMonth(sixMonthsAgo.getMonth() - 6);
    
    return lastUpdated > sixMonthsAgo ? 'Active' : 'Stale';
  } catch {
    return 'Stale';
  }
}

export async function enrichProjectsWithActivity(projects: any[]) {
  const enriched = await Promise.all(
    projects.map(async (project) => {
      const activity = await getRepoActivity(project.data.github);
      const hasActivityTag = project.data.tags.includes('Active') || project.data.tags.includes('Stale');
      
      if (!hasActivityTag && !project.data.tags.includes('Learning')) {
        return {
          ...project,
          data: {
            ...project.data,
            tags: [...project.data.tags, activity]
          }
        };
      }
      
      return project;
    })
  );
  
  return enriched;
}
