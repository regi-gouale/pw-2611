import { randomUUID } from "node:crypto";
import { expect, test } from "@playwright/test";

test("Créer une tâche", async ({ page }) => {
	test.setTimeout(90_000);
	const email = process.env.TASKFLOW_EMAIL;
	const password = process.env.TASKFLOW_PASSWORD;

	if (!email || !password) {
		throw new Error(
			"Définissez TASKFLOW_EMAIL et TASKFLOW_PASSWORD avec un compte de test valide.",
		);
	}

	const title = `Tâche E2E ${randomUUID()}`;
	const status = choice(["En cours", "Terminé"]);
	const data_status = status === "En cours" ? "IN_PROGRESS" : "DONE";
  const priority = choice(["Haute", "Moyenne", "Basse"]);
	const dialog = page.getByRole("dialog", { name: "Nouvelle tâche" });

	await test.step("Se connecter et afficher le tableau de bord", async () => {
		await page.goto("/sign-in");
		await page.getByTestId("email-input").fill(email);
		await page.getByTestId("password-input").fill(password);
    await page
					.getByRole("button", { name: "Se connecter", exact: true })
					.click();
		await expect(
			page.getByRole("heading", { name: "Tableau de bord", exact: true }),
		).toBeVisible();
	});

	await test.step("Ouvrir la modale et renseigner la tâche", async () => {
		await page.getByRole("link", { name: "Mes tâches", exact: true }).click();
		await expect(
			page.getByRole("heading", { name: "Mes tâches", exact: true }),
		).toBeVisible();
		await page
			.getByRole("button", { name: "Nouvelle tâche", exact: true })
			.click();

		await expect(dialog).toBeVisible();
		await expect(
			dialog.getByRole("combobox", { name: "Statut", exact: true }),
		).toHaveText("À faire");
		await dialog
			.getByRole("textbox", { name: "Titre", exact: true })
			.fill(title);
		await dialog
			.getByRole("textbox", { name: "Description", exact: true })
			.fill("Vérifier la création d'une tâche depuis l'interface TaskFlow.");
		await dialog
			.getByRole("combobox", { name: "Priorité", exact: true })
			.click();
		await page.getByRole("option", { name: priority, exact: true }).click();
	});

	await test.step("Enregistrer et vérifier le message de succès", async () => {
		await dialog
			.getByRole("button", { name: "Créer la tâche", exact: true })
			.click();
		await expect(page.getByText("Tâche créée.", { exact: true })).toBeVisible();
		await expect(dialog).toBeHidden();
	});

	await test.step("Vérifier la tâche dans le tableau", async () => {
		const card = page.getByTestId("task-card").filter({ hasText: title });

		await expect(card).toBeVisible();
		await expect(card).toHaveAttribute("data-status", "TODO");
		await expect(card.getByText(priority, { exact: true })).toBeVisible();
	});

	await test.step("Vérifier la persistance, le statut et la priorité affichés", async () => {
		await page.reload();
		const savedCard = page.getByTestId("task-card").filter({ hasText: title });
		await expect(savedCard).toBeVisible();
		await expect(savedCard).toHaveAttribute("data-status", "TODO");
		await expect(savedCard.getByText(priority, { exact: true })).toBeVisible();
		const details = page.getByRole("dialog", { name: title, exact: true });
		await expect(async () => {
			await savedCard
				.getByRole("button", {
					name: `Ouvrir les détails de la tâche ${title}`,
					exact: true,
				})
				.press("Enter");
			await expect(details).toBeVisible({ timeout: 2_000 });
		}).toPass({ timeout: 15_000 });
		await expect(details.getByText("À faire", { exact: true })).toBeVisible();
		await expect(details.getByText(priority, { exact: true })).toBeVisible();
	});

	await test.step("Modifier le statut de la tâche", async () => {
		const details = page.getByRole("dialog", { name: title, exact: true });
		await details.getByRole("button", { name: "Modifier", exact: true }).click();

		const editDialog = page
			.getByRole("dialog")
			.filter({ has: page.getByRole("combobox", { name: "Statut", exact: true }) });
		const statusSelect = editDialog.getByRole("combobox", {
			name: "Statut",
			exact: true,
		});
		await expect(statusSelect).toHaveText("À faire");
		await statusSelect.click();
		await page.getByRole("option", { name: status, exact: true }).click();
		await expect(statusSelect).toHaveText(status);

		await editDialog
			.getByRole("button", { name: "Enregistrer", exact: true })
			.click();
		await expect(
			page.getByText("Tâche mise à jour.", { exact: true }),
		).toBeVisible();
		await expect(editDialog).toBeHidden();

		const card = page.getByTestId("task-card").filter({ hasText: title });
		await expect(card).toHaveAttribute("data-status", data_status);
	});

	await test.step("Vérifier la persistance du nouveau statut", async () => {
		await page.reload();
		const card = page.getByTestId("task-card").filter({ hasText: title });
		await expect(card).toHaveAttribute("data-status", data_status);
		await expect(card.getByText(priority, { exact: true })).toBeVisible();

		const details = page.getByRole("dialog", { name: title, exact: true });
		await expect(async () => {
			await card
				.getByRole("button", {
					name: `Ouvrir les détails de la tâche ${title}`,
					exact: true,
				})
				.press("Enter");
			await expect(details).toBeVisible({ timeout: 2_000 });
		}).toPass({ timeout: 15_000 });
		await expect(details.getByText(status, { exact: true })).toBeVisible();
	});
});

function choice(options: string[]): string {
	if (options.length === 0) {
		throw new Error("Cannot choose from an empty list.");
	}

	const selected = options[Math.floor(Math.random() * options.length)];
	if (selected === undefined) {
		throw new Error("Failed to choose an option.");
	}

	return selected;
}
