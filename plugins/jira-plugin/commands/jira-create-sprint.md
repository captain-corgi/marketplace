# /jira-create-sprint - Create a New Sprint

Create a new sprint in a Jira board.

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

```
/jira-create-sprint name="Sprint 42" boardId=12
/jira-create-sprint name="Sprint 42" boardId=12 startDate=2025-01-15 endDate=2025-01-29
```

## Notes

- Dates should be in ISO 8601 format: YYYY-MM-DD
- If not provided, start/end dates can be set later in Jira
- The sprint will be created in the "future" state until started
