import type { Page } from "@playwright/test";

export class SignUpPage {
  constructor(private page: Page) {}
  
	get heading() {
		return this.page.getByText("Créer un compte");
	}

	get fullNameInput() {
		return this.page.getByRole("textbox", { name: "Nom" });
	}
	get emailInput() {
		return this.page.getByTestId("email-input");
	}

	get passwordInput() {
		return this.page.getByRole("textbox", {
			name: "Mot de passe",
			exact: true,
		});
	}

  get confirmPasswordInput() {
    return this.page.getByTestId("confirm-password-input");
  }

	get signUpButton() {
		return this.page.getByRole("button", { name: "Créer le compte" });
	}

  get signInLink() {
    return this.page.getByRole("link", { name: "Se connecter" });
  }


	async open() {
		await this.page.goto("/sign-up");
	}

	async signUp(fullName: string, email: string, password: string) {
		await this.fillForm(fullName, email, password);
		await this.signUpButton.click();
	}

  async fillForm(fullName: string, email: string, password: string) {
    await this.fullNameInput.fill(fullName);
    await this.emailInput.fill(email);
    await this.passwordInput.fill(password);
    await this.confirmPasswordInput.fill(password);
  }

  async isSignUpPage() {
    return this.heading.isVisible();
  }
}
