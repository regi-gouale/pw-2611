import { DashboardPage } from "@pages/dashboard.page";
import { SignInPage } from "@pages/sign-in.page";
import { SignUpPage } from "@pages/sign-up.page";
import { test as base } from "@playwright/test";

type Pages = {
	signInPage: SignInPage;
	dashboardPage: DashboardPage;
	loggedAsAdminPage: DashboardPage;
	signUpPage: SignUpPage;
};
export const test = base.extend<Pages>({
	signInPage: async ({ page }, use) => {
		const signInPage = new SignInPage(page);
		await signInPage.open();
		await use(signInPage);
	},
	signUpPage: async ({ page }, use) => {
		const signUpPage = new SignUpPage(page);
		await use(signUpPage);
	},
	dashboardPage: async ({ page }, use) => {
		const dashboardPage = new DashboardPage(page);
		await use(dashboardPage);
	},
	loggedAsAdminPage: async ({ signInPage, dashboardPage }, use) => {
		await signInPage.signIn("test@taskflow.dev", "Password123!");
		await dashboardPage.isWelcomeMessageVisible();

		await use(dashboardPage);
	},
});
