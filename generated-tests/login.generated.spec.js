import { test } from "@playwright/test";
import { LoginPage } from "../pages/LoginPage.js";

test("valid email + valid password should succeed", async ({ page }) => {
  const loginPage = new LoginPage(page);
  await loginPage.navigate();
  await loginPage.login("test@demo.com", "Password123");
  await loginPage.assertLoginSuccess();
});

test("valid email + wrong password should fail", async ({ page }) => {
  const loginPage = new LoginPage(page);
  await loginPage.navigate();
  await loginPage.login("test@demo.com", "WrongPassword999");
  await loginPage.assertLoginFailure();
});
