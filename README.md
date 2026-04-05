# AI Test Agent — Hybrid AI Automation Demo with MCP Configuration

This repo is a **hybrid AI-driven QA automation demo**.

It currently uses:
- **Claude API** to generate Playwright tests
- **Playwright CLI** to execute the generated test
- **Claude API** to analyze the failure
- **GitHub REST API** to create an issue
- **Playwright MCP** is configured for manual experimentation and future evolution

It does **not** currently use:
- Playwright MCP as the execution engine in the automated pipeline
- GitHub MCP for issue creation

## Current automated flow

```text
External user story file
        ↓
scripts/run-agent.js reads the story file
        ↓
Claude API generates Playwright test code
        ↓
run-agent.js writes generated files
        ↓
Playwright CLI executes the generated test
        ↓
scripts/analyze-and-create-issue.js sends execution results to Claude API
        ↓
Claude decides whether the failure is a real product bug
        ↓
GitHub REST API creates the issue
        ↓
reports/ gets updated

Where MCP fits today

This repo contains Playwright MCP configuration in .mcp.json.

That MCP setup is useful for:

manual exploration with Claude Code
MCP-assisted UI inspection
future evolution toward a more agent-native workflow

However, the current automated pipeline does not run test execution through Playwright MCP, and it does not create issues through GitHub MCP.

Project idea

The project demonstrates a practical QA automation flow:

read a user story from an external file
generate a Playwright spec with Claude
inspect the UI and build a selector map
generate a page object
run the test locally
analyze the result with Claude
create a GitHub issue if the failure is classified as a real bug
save execution and analysis artifacts into reports/
Key files
scripts/run-agent.js — orchestrates story reading, selector discovery, test generation, Playwright execution, and post-run analysis
scripts/inspect-ui.js — inspects the running UI and builds reports/selector-map.json
scripts/analyze-and-create-issue.js — asks Claude to triage the failure and creates a GitHub issue through the GitHub REST API
.mcp.json — Playwright MCP configuration
playwright.config.js — Playwright runner configuration
app/ — local demo application with an intentional login bug
prompts/ — prompt files for MCP/manual workflows
reports/ — generated execution and bug-analysis artifacts
Intentional bug in the app

The login app is purposely wrong.

Current bug:

login succeeds when either the email or the password is correct

Correct behavior:

login should succeed only when both email and password are correct
Folder structure
ai-test-agent-mcp-pure-mcp/
├─ .mcp.json
├─ .gitignore
├─ package.json
├─ README.md
├─ app/
│  ├─ index.html
│  ├─ vite.config.js
│  ├─ src/
│  └─ dist/
├─ prompts/
│  ├─ explore-login-story.md
│  └─ create-github-issue.md
├─ scripts/
│  ├─ run-agent.js
│  ├─ inspect-ui.js
│  └─ analyze-and-create-issue.js
├─ playwright.config.js
├─ generated-tests/
├─ pages/
└─ reports/
Setup

Install dependencies:

npm install
npm run install:browsers

Run the app:

npm run dev
External story input

The story file can live outside the repo.

run-agent.js accepts either:

--story "path-to-file"
or STORY_FILE

Example story content:
As a valid user, I want to log in with correct email and password so that I can access my account.

Valid email: user@example.com
Valid password: Password123

Acceptance criteria:
- valid email + valid password -> login succeeds
- valid email + wrong password -> login fails
- wrong email + valid password -> login fails
- wrong email + wrong password -> login fails

Success is indicated by the message: "Login successful. Welcome back."
Failure is indicated by the message: "Invalid email or password."
Useful commands

Run the main agent flow:

npm run agent:run -- --story "C:\path\to\your\story.txt"

Run UI inspection only:

npm run agent:inspect -- --url "http://127.0.0.1:4173" --out ".\reports\selector-map.json"

Run analysis/issue creation only:

npm run agent:analyze -- --story "C:\path\to\your\story.txt" --report ".\reports\execution-result.json"
Current implementation status
External story input: Yes
Claude API for test generation: Yes
Playwright CLI execution: Yes
Claude API for failure analysis: Yes
GitHub issue creation via REST API: Yes
Playwright MCP configured: Yes
Playwright MCP used in automated pipeline: No
GitHub MCP configured: No
GitHub MCP used in automated pipeline: No