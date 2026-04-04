import { defineConfig } from "@playwright/test";

export default defineConfig({
  testDir: "./generated-tests",
  timeout: 30000,
  retries: 0,
  use: {
    headless: true,
    baseURL: "http://127.0.0.1:4173",
    screenshot: "only-on-failure",
    trace: "retain-on-failure",
    video: "retain-on-failure",
  },
  reporter: [["list"], ["html", { open: "never" }]],
});