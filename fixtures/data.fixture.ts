import { test as base } from "@playwright/test";
import { UserFactory } from "@/factories/user.factory";

type Data = {
	user: ReturnType<typeof UserFactory.create>;
	existingUser: ReturnType<typeof UserFactory.create>;
};

export const test = base.extend<Data>({
	user: async ({}, use) => {
		await use(UserFactory.create());
	},
	existingUser: async ({}, use) => {
		const user = {
			name: "Alex Matin",
			email: "test@taskflow.dev",
			password: "Password123!",
		};
		await use(user);
	},
});

