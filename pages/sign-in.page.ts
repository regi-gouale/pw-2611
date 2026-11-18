import type { Page } from "@playwright/test";

export class SignInPage {
	constructor(private page: Page) {}

	get heading() {
		return this.page.getByRole("heading", {
			name: "Se connecter",
			exact: true,
		});
	}

	get emailInput() {
		return this.page.getByTestId("email-input");
	}

	get passwordInput() {
		return this.page.getByTestId("password-input");
	}

	get signInButton() {
		return this.page.getByRole("button", { name: "Se connecter", exact: true });
	}

	get createAccountLink() {
		return this.page.getByRole("link", {
			name: "Créer un compte",
			exact: true,
		});
	}

	get forgetPasswordLink() {
		return this.page.getByRole("link", {
			name: "Mot de passe oublié ?",
			exact: true,
		});
	}

	async open() {
		await this.page.goto("/sign-in");
	}
	async isErrorMessageVisible() {
		return this.page.getByText("Invalid email or password").isVisible();
	}
	async signIn(email: string, password: string) {
		await this.fillCredentials(email, password);
		await this.signInButton.click();
	}

	async fillCredentials(email: string, password: string) {
		await this.emailInput.fill(email);
		await this.passwordInput.fill(password);
	}

	async isHeadingVisible() {
		return this.heading.isVisible();
	}
}
