# AI Test Agent — Hybrid AI Automation Demo with MCP Configuration

This repository is a **hybrid AI-driven QA automation demo**.

It combines:
- **Claude API** for test generation
- **Playwright CLI** for test execution
- **Claude API** for failure analysis
- **GitHub REST API** for issue creation
- **Playwright MCP configuration** for manual experimentation and future evolution

---

## Overview

This project demonstrates a practical QA workflow:

1. Read a user story from an **external file**
2. Generate a Playwright test with Claude
3. Inspect the UI and build selector context
4. Generate supporting files
5. Run the test locally with Playwright
6. Analyze the failure with Claude
7. Create a GitHub issue if the failure is classified as a real bug
8. Save execution and analysis artifacts in `reports/`

---

## What the project currently uses

- Claude API to generate Playwright tests
- Playwright CLI to execute generated tests
- Claude API to analyze failures
- GitHub REST API to create issues
- Playwright MCP configuration for manual exploration

## What it does not currently use

- Playwright MCP as the execution engine in the automated pipeline
- GitHub MCP for issue creation

---

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
```

---

## Where MCP fits today

This repository contains **Playwright MCP configuration** in `.mcp.json`.

Right now, MCP is useful for:
- manual exploration with Claude Code
- MCP-assisted UI inspection
- future evolution toward a more agent-native workflow

However, the **current automated pipeline**:
- does **not** run test execution through Playwright MCP
- does **not** create GitHub issues through GitHub MCP

---

## Implementation status

| Capability | Status |
|---|---|
| External story input | Yes |
| Claude API for test generation | Yes |
| Playwright CLI execution | Yes |
| Claude API for failure analysis | Yes |
| GitHub issue creation via REST API | Yes |
| Playwright MCP configured | Yes |
| Playwright MCP used in automated pipeline | No |
| GitHub MCP configured | No |
| GitHub MCP used in automated pipeline | No |

---

## Key files

- `scripts/run-agent.js` — orchestrates story reading, selector discovery, test generation, Playwright execution, and post-run analysis
- `scripts/inspect-ui.js` — inspects the running UI and builds `reports/selector-map.json`
- `scripts/analyze-and-create-issue.js` — asks Claude to triage the failure and creates a GitHub issue through the GitHub REST API
- `.mcp.json` — Playwright MCP configuration
- `playwright.config.js` — Playwright runner configuration
- `app/` — local demo application with an intentional login bug
- `prompts/` — prompt files for MCP/manual workflows
- `reports/` — generated execution and bug-analysis artifacts

---

## Intentional bug in the demo app

The login app is purposely incorrect.

**Current bug**
- Login succeeds when **either** the email **or** the password is correct

**Correct behavior**
- Login should succeed only when **both** email and password are correct

---

## Folder structure

```text
ai-test-agent-mcp/
├─ .claude/
├─ .playwright-mcp/
├─ app/
├─ generated-tests/
├─ pages/
├─ prompts/
├─ reports/
├─ scripts/
├─ .gitignore
├─ .mcp.json
├─ package.json
├─ package-lock.json
├─ playwright.config.js
└─ README.md
```

---

## Setup

Install dependencies:

```bash
npm install
npm run install:browsers
```

Run the demo app:

```bash
npm run dev
```

---

## External story input

The story file can live **outside the repository**.

`run-agent.js` accepts either:
- `--story "path-to-file"`
- or `STORY_FILE`

<details>
<summary><strong>Example story content</strong></summary>

```text
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
```

</details>

---

## Useful commands

### Run the main agent flow

```bash
npm run agent:run -- --story "C:\path\to\your\story.txt"
```

### Run UI inspection only

```bash
npm run agent:inspect -- --url "http://127.0.0.1:4173" --out ".\reports\selector-map.json"
```

### Run analysis and issue creation only

```bash
npm run agent:analyze -- --story "C:\path\to\your\story.txt" --report ".\reports\execution-result.json"
```