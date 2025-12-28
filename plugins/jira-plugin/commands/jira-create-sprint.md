---
description: name="<name>" boardId=<id> [startDate=<YYYY-MM-DD>] [endDate=<YYYY-MM-DD>] - Create a new sprint
---

# Create a New Sprint

## Instructions

1. Load the API client from `${CLAUDE_PLUGIN_ROOT}/lib/api.js`
2. Extract parameters from user input:
   - `name` (required): Sprint name
   - `boardId` (required): Board ID to create sprint in
   - `startDate` (optional): Sprint start date (ISO format or relative)
   - `endDate` (optional): Sprint end date (ISO format or relative)
3. Call `api.createSprint(name, boardId, startDate, endDate)`
4. Display confirmation with sprint ID and details

## Example Usage

### Basic Examples

```
/jira-create-sprint name="Sprint 42" boardId=12
/jira-create-sprint name="Sprint 42" boardId=12 startDate=2025-01-15 endDate=2025-01-29
```

### Real-World Workflows

**Create Sprint with Default Dates:**
```
/jira-create-sprint name="Sprint 23 - Q1 Feature Delivery" boardId=15
# Output: Creates sprint with no dates (can be set later when starting)
```

**Create Sprint with Specific Dates:**
```
/jira-create-sprint name="Sprint 24" boardId=15 startDate=2025-02-03 endDate=2025-02-17
# Output: Creates 2-week sprint with ISO 8601 dates
```

**Create Named Sprint:**
```
/jira-create-sprint name="Sprint 25 - API Rewrite" boardId=15 startDate=2025-02-18 endDate=2025-03-03
# Output: Creates sprint with descriptive name
```

**Hardening Sprint:**
```
/jira-create-sprint name="Sprint 26 - Hardening & Bug Fixes" boardId=15
# Output: Creates sprint focused on quality
```

**Release Sprint:**
```
/jira-create-sprint name="Sprint 27 - v3.0 Release" boardId=15 startDate=2025-03-10 endDate=2025-03-15
# Output: Creates shorter 1-week release sprint
```

## Output

```
✓ Sprint Created
ID: 145
Name: Sprint 42
Board: Team Alpha (ID: 12)
Start Date: 2025-01-15
End Date: 2025-01-29
State: future
```

## Error Scenarios

**Invalid Board ID:**
```
Error: Board with ID 999 does not exist
```

**Duplicate Sprint Name:**
```
Error: A sprint named "Sprint 42" already exists on this board
```

**Invalid Date Format:**
```
Error: Invalid date format. Use ISO 8601 format (YYYY-MM-DD)
```

**End Date Before Start Date:**
```
Error: End date must be after start date
```

## Notes

- Dates should be in ISO 8601 format: YYYY-MM-DD
- If not provided, start/end dates can be set later when starting the sprint in Jira
- The sprint will be created in the "future" state until started
- Use `/jira-boards` to find valid board IDs
- Sprint names must be unique within a board
- Standard sprint lengths: 1 week (7 days), 2 weeks (14 days), or custom
- Create sprints before planning meetings so they're available for issue assignment
