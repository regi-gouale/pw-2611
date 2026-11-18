import type { Page } from "@playwright/test";

export class SidebarPage {
  constructor(private page: Page) {}

  get dashboardLink() {
    return this.page.getByRole("link", { name: "Tableau de bord" });
  }

  get tasksLink() {
    return this.page.getByRole("link", { name: "Mes tâches" });
  }

  get projectsLink() {
    return this.page.getByRole("link", { name: "Projets" });
  }

  get calendarLink() {
    return this.page.getByRole("link", { name: "Calendrier" });
  }

  get reportsLink() {
    return this.page.getByRole("link", { name: "Rapports" });
  }

  get teamLink() {
    return this.page.getByRole("link", { name: "Équipe" });
  }

  get settingsLink() {
    return this.page.getByRole("link", { name: "Paramètres" });
  }

  get helpLink() {
    return this.page.getByRole("link", { name: "Aide" });
  }

  
}