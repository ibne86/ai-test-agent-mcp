# AI Test Agent — Pure MCP Version

This repo is a **pure MCP** starter for an agentic QA demo.

## Project idea

The workflow is:

```text
External user story
        ↓
Claude Code reads the story
        ↓
Claude uses Playwright MCP to open and test the local app
        ↓
Claude observes incorrect behavior
        ↓
Claude summarizes the defect
        ↓
Claude uses GitHub MCP to create a bug issue (later step)
        ↓
reports/ gets updated
```

## What is in this repo

- `app/` — tiny React login app with an intentional bug
- `.mcp.json` — MCP config for Playwright MCP
- `prompts/` — prompt text you can use inside Claude Code
- `reports/` — place to save findings and issue links

## What is intentionally **not** in this repo right now

These were removed on purpose because they belong to the hybrid version, not the pure MCP version:

- generated Playwright `.spec.js` files
- Playwright test runner orchestration
- `run-agent.js`
- `create-issue.js`
- `playwright.config.js`

## Intentional bug in the app

The login app is purposely wrong.

Current bug:
- login succeeds when **either** the email **or** the password is correct

Correct behavior should be:
- login succeeds only when **both** email and password are correct

## Folder structure

```text
ai-test-agent-mcp-pure-mcp/
├─ .mcp.json
├─ .gitignore
├─ package.json
├─ README.md
├─ app/
│  ├─ index.html
│  ├─ vite.config.js
│  └─ src/
│     ├─ App.jsx
│     ├─ main.jsx
│     └─ styles.css
├─ prompts/
│  ├─ explore-login-story.md
│  └─ create-github-issue.md
└─ reports/
```

## Local app setup

Install dependencies:

```bash
npm install
npm run install:browsers
```

Run the app:

```bash
npm run dev
```

## First learning goal

Before GitHub MCP, do only this:

1. start the local app
2. connect Claude Code to Playwright MCP using `.mcp.json`
3. ask Claude to open the app on localhost
4. ask Claude to test the login behavior from your external story
5. ask Claude to write a report into `reports/`

## Example external story

You can keep the story outside the repo in Notepad, for example:

```text
As a valid user, I want to log in with correct email and password so that I can access my account.

Acceptance criteria:
- valid email + valid password -> login succeeds
- valid email + wrong password -> login fails
- wrong email + valid password -> login fails
- wrong email + wrong password -> login fails
```

## Later step: GitHub MCP

Do **not** set this up first.

Once Playwright MCP is working, add GitHub MCP to `.mcp.json` so Claude can create an issue after it confirms a bug.

Example shape to add later:

```json
{
  "mcpServers": {
    "playwright": {
      "command": "npx",
      "args": ["@playwright/mcp@latest"]
    },
    "github": {
      "command": "<path-to-github-mcp-server>",
      "args": ["stdio"],
      "env": {
        "GITHUB_PERSONAL_ACCESS_TOKEN": "<YOUR_GITHUB_PAT>",
        "GITHUB_TOOLSETS": "issues,repos"
      }
    }
  }
}
```

## How to explain this in an interview

A simple explanation:

> I built a pure MCP QA prototype where Claude uses Playwright MCP to explore a local app against an external user story, detect incorrect behavior, summarize the defect, and later create a GitHub issue through GitHub MCP.
