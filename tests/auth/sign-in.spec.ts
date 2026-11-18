import { test } from "@/fixtures";

test.describe("Authentification", () => {
  
  test("Se connecter avec un utilisateur existant", async ({
    signInPage,
		dashboardPage,
		existingUser,
	}) => {
    test.slow();
		await signInPage.open();
		await signInPage.signIn(existingUser.email, existingUser.password);
		await dashboardPage.isWelcomeMessageVisible();
	});

	test("Se connecter avec utilisateur inexistant", async ({
		signInPage,
		user,
	}) => {
		await signInPage.open();
		await signInPage.signIn(user.email, user.password);

		await signInPage.isErrorMessageVisible();
	});

	test("Se connecter sans mot de passe", async ({ signInPage, user }) => {
		await signInPage.open();
		await signInPage.signIn(user.email, "");

		await signInPage.isHeadingVisible();
	});
});
