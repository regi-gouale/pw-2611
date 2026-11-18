import { expect, type Page } from "@playwright/test";


export class DashboardPage {
  get welcomeMessage() {
    return this.page.getByRole("heading", { name: "Tableau de bord", exact: true });
  }
  constructor(public readonly page: Page) {}

  async isWelcomeMessageVisible() {
    await expect(this.welcomeMessage).toBeVisible({ timeout: 15_000 });
  }
}