<h1 align="center">🤖 AI Test Agent</h1>
<p align="center"><b>Hybrid AI Automation Demo with MCP Configuration</b></p>

<p align="center">
  <img src="https://img.shields.io/badge/Claude-API-blueviolet?style=for-the-badge" />
  <img src="https://img.shields.io/badge/Playwright-CLI-2ea44f?style=for-the-badge" />
  <img src="https://img.shields.io/badge/GitHub-REST_API-black?style=for-the-badge" />
  <img src="https://img.shields.io/badge/Playwright-MCP_Configured-orange?style=for-the-badge" />
  <img src="https://img.shields.io/badge/Architecture-Hybrid-blue?style=for-the-badge" />
</p>

<p align="center">
  <img src="https://img.shields.io/badge/Status-Working-success?style=flat-square" />
  <img src="https://img.shields.io/badge/Test_Generation-Claude_API-informational?style=flat-square" />
  <img src="https://img.shields.io/badge/Test_Execution-Playwright_CLI-success?style=flat-square" />
  <img src="https://img.shields.io/badge/Issue_Creation-GitHub_REST_API-lightgrey?style=flat-square" />
  <img src="https://img.shields.io/badge/GitHub_MCP-Not_Implemented-red?style=flat-square" />
</p>

---

## 📌 Overview

This repository is a **hybrid AI-driven QA automation demo**.

It currently combines:

- **Claude API** for Playwright test generation
- **Playwright CLI** for executing the generated test
- **Claude API** for failure analysis
- **GitHub REST API** for issue creation
- **Playwright MCP configuration** for manual experimentation and future evolution

> [!IMPORTANT]
> This project is **not a pure MCP pipeline**.
>  
> The current automated flow uses **Claude API + Playwright CLI + GitHub REST API**.  
> Playwright MCP is configured, but it is **not** the execution engine in the automated pipeline.

---

## 🏗️ Architecture at a Glance

```text
External user story file
        ↓
scripts/run-agent.js reads the story
        ↓
Claude API generates Playwright test code
        ↓
Generated files are written locally
        ↓
Playwright CLI executes the test
        ↓
Execution report is saved to reports/
        ↓
scripts/analyze-and-create-issue.js sends the result to Claude API
        ↓
Claude decides whether it is a real bug
        ↓
GitHub REST API creates the issue
        ↓
reports/ gets updated
```

---

## 🎯 What This Project Demonstrates

- Reading a user story from an **external file**
- Generating a Playwright test with AI
- Inspecting the UI and building selector context
- Generating supporting files
- Running the test locally
- Analyzing failures with AI
- Creating a GitHub issue for real bugs
- Saving outputs into `reports/`

---

## ✅ Current Implementation Status

| Capability | Status |
|---|---|
| External story input | ✅ Yes |
| Claude API for test generation | ✅ Yes |
| Playwright CLI execution | ✅ Yes |
| Claude API for failure analysis | ✅ Yes |
| GitHub issue creation via REST API | ✅ Yes |
| Playwright MCP configured | ✅ Yes |
| Playwright MCP used in automated pipeline | ❌ No |
| GitHub MCP configured | ❌ No |
| GitHub MCP used in automated pipeline | ❌ No |

---

## 🧩 Where MCP Fits Today

This repository contains **Playwright MCP configuration** in `.mcp.json`.

### MCP is currently useful for:
- manual exploration with Claude Code
- MCP-assisted UI inspection
- future evolution toward a more agent-native workflow

### MCP is not currently used for:
- automated Playwright test execution
- automated GitHub issue creation

> [!NOTE]
> A more accurate description of this project is:
>
> **Hybrid AI QA automation demo with MCP configuration**
>
> not
>
> **Pure MCP implementation**

---

## 🗂️ Key Files

| File / Folder | Purpose |
|---|---|
| `scripts/run-agent.js` | Orchestrates story reading, selector discovery, test generation, Playwright execution, and post-run analysis |
| `scripts/inspect-ui.js` | Inspects the running UI and builds `reports/selector-map.json` |
| `scripts/analyze-and-create-issue.js` | Sends execution results to Claude and creates a GitHub issue through REST API |
| `.mcp.json` | Playwright MCP configuration |
| `playwright.config.js` | Playwright runner configuration |
| `app/` | Demo application with an intentional login bug |
| `prompts/` | Prompt files for MCP/manual workflows |
| `reports/` | Execution and bug-analysis artifacts |

---

## 🐞 Intentional Bug in the Demo App

The login app is purposely incorrect.

### Current bug
- Login succeeds when **either** the email **or** the password is correct

### Correct behavior
- Login should succeed only when **both** email and password are correct

---

## 📁 Folder Structure

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

## ⚙️ Setup

### 1. Install dependencies

```bash
npm install
npm run install:browsers
```

### 2. Run the demo app

```bash
npm run dev
```

---

## 📥 External Story Input

The story file can live **outside the repository**.

`run-agent.js` accepts either:

- `--story "path-to-file"`
- or `STORY_FILE`

<details>
<summary><b>📄 Example story content</b></summary>

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

## 🚀 Useful Commands

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

---

## 🧠 Interview Positioning

Use wording like this:

> I built a hybrid AI-driven QA automation demo. The current implementation uses Claude API for test generation and failure triage, Playwright CLI for execution, and GitHub REST API for issue creation. I also configured Playwright MCP as a stepping stone toward a more agent-native workflow.

---

## 🧹 Cleanup Note

This repository generates runtime artifacts during execution. Those outputs should generally stay out of version control except for placeholders such as `reports/.gitkeep`.

---

## 🏷️ Suggested Badge Row for a Stronger Visual Look

You can keep this section or remove it. If you want a more colorful GitHub-style appearance, use this badge row near the top:

```md
<p align="center">
  <img src="https://img.shields.io/badge/Claude-API-blueviolet?style=for-the-badge" />
  <img src="https://img.shields.io/badge/Playwright-CLI-2ea44f?style=for-the-badge" />
  <img src="https://img.shields.io/badge/GitHub-REST_API-black?style=for-the-badge" />
  <img src="https://img.shields.io/badge/MCP-Configured-orange?style=for-the-badge" />
  <img src="https://img.shields.io/badge/Type-Hybrid-blue?style=for-the-badge" />
</p>
```