import { expect } from "@playwright/test";

export class LoginPage {
  constructor(page) {
    this.page = page;
    this.emailInput = page.getByTestId("email-input");
    this.passwordInput = page.getByTestId("password-input");
    this.submitButton = page.getByTestId("login-button");
    this.successMessage = page.getByText("Login successful. Welcome back.", { exact: true });
    this.errorMessage = page.getByText("Invalid email or password.", { exact: true });
  }

  async navigate() {
    await this.page.goto("http://127.0.0.1:4173");
  }

  async enterEmail(email) {
    await this.emailInput.fill(email);
  }

  async enterPassword(password) {
    await this.passwordInput.fill(password);
  }

  async submit() {
    await this.submitButton.click();
  }

  async login(email, password) {
    await this.enterEmail(email);
    await this.enterPassword(password);
    await this.submit();
  }

  async assertLoginSuccess() {
    await expect(this.successMessage).toBeVisible();
    await expect(this.errorMessage).not.toBeVisible();
  }

  async assertLoginFailure() {
    await expect(this.errorMessage).toBeVisible();
    await expect(this.successMessage).not.toBeVisible();
  }
}
