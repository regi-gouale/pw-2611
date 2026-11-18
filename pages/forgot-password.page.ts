import type { Page } from "@playwright/test";

export class ForgotPasswordPage {
  constructor(private page: Page) {}

  get heading() {
    return this.page.getByRole("heading", { name: "Mot de passe oublié" });
  }

  get emailInput() {
    return this.page.getByRole("textbox", { name: "Adresse e-mail" });
  }

  get submitButton() {
    return this.page.getByRole("button", { name: "Envoyer le lien" });
  }

  get backToSignInLink() {
    return this.page.getByRole("link", { name: "Retour à la connexion" });
  }
  
  async open() {
    await this.page.goto("/forgot-password");
  }
  
  async submit(email: string) {
    await this.emailInput.fill(email);
    await this.submitButton.click();
  }
}