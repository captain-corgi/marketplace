/**
 * Output Formatters for Jira Data
 * Format Jira API responses into readable markdown
 */

/**
 * Format a list of issues as a markdown table
 */
function formatIssueList(issues) {
  if (!issues || issues.length === 0) {
    return 'No issues found.';
  }

  const headers = '| Key | Summary | Status | Priority | Assignee |';
  const separator = '|-----|---------|--------|----------|----------|';
  const rows = issues.map(issue => {
    const key = issue.key || 'N/A';
    const summary = ((issue.fields?.summary || '').substring(0, 47)) + '...';
    const status = issue.fields?.status?.name || 'N/A';
    const priority = issue.fields?.priority?.name || '-';
    const assignee = issue.fields?.assignee?.displayName || 'Unassigned';
    return `| ${key} | ${summary} | ${status} | ${priority} | ${assignee} |`;
  });

  return [headers, separator, ...rows].join('\n');
}

/**
 * Format a single issue with full details
 */
function formatIssueDetail(issue) {
  const fields = issue.fields || {};
  const baseUrl = process.env.JIRA_URL || '';

  return `
## ${issue.key}

**Summary**: ${fields.summary || 'N/A'}

**Status**: ${fields.status?.name || 'N/A'}
**Priority**: ${fields.priority?.name || '-'}
**Issue Type**: ${fields.issuetype?.name || 'N/A'}

**Assignee**: ${fields.assignee?.displayName || 'Unassigned'}
**Reporter**: ${fields.reporter?.displayName || 'N/A'}

**Project**: ${fields.project?.name || 'N/A'} (${fields.project?.key || 'N/A'})

**Created**: ${fields.created || 'N/A'}
**Updated**: ${fields.updated || 'N/A'}

${fields.description ? `\n**Description**:\n${fields.description}\n` : ''}

**View in Jira**: ${baseUrl}/browse/${issue.key}
`;
}

/**
 * Format sprint list as a markdown table
 */
function formatSprintList(sprints) {
  if (!sprints || sprints.length === 0) {
    return 'No sprints found.';
  }

  const headers = '| ID | Name | State | Start Date | End Date |';
  const separator = '|----|------|-------|------------|----------|';
  const rows = sprints.map(sprint => {
    const start = sprint.startDate ? new Date(sprint.startDate).toLocaleDateString() : '-';
    const end = sprint.endDate ? new Date(sprint.endDate).toLocaleDateString() : '-';
    return `| ${sprint.id || 'N/A'} | ${sprint.name || 'N/A'} | ${sprint.state || 'N/A'} | ${start} | ${end} |`;
  });

  return [headers, separator, ...rows].join('\n');
}

/**
 * Format board list as a markdown table
 */
function formatBoardList(boards) {
  if (!boards || boards.length === 0) {
    return 'No boards found.';
  }

  const headers = '| ID | Name | Type |';
  const separator = '|----|------|------|';
  const rows = boards.map(board => {
    return `| ${board.id || 'N/A'} | ${board.name || 'N/A'} | ${board.type || 'N/A'} |`;
  });

  return [headers, separator, ...rows].join('\n');
}

/**
 * Format project list as a markdown table
 */
function formatProjectList(projects) {
  if (!projects || projects.length === 0) {
    return 'No projects found.';
  }

  const headers = '| Key | Name | Project Type | Lead |';
  const separator = '|-----|------|--------------|------|';
  const rows = projects.map(project => {
    return `| ${project.key || 'N/A'} | ${project.name || 'N/A'} | ${project.projectTypeKey || 'N/A'} | ${project.lead?.displayName || 'N/A'} |`;
  });

  return [headers, separator, ...rows].join('\n');
}

module.exports = {
  formatIssueList,
  formatIssueDetail,
  formatSprintList,
  formatBoardList,
  formatProjectList
};
