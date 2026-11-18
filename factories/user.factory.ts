import { faker } from "@faker-js/faker";

export class UserFactory {
  static create() {
    return {
      name: faker.person.fullName(),
      email: faker.internet.email(),
      password: faker.internet.password(),
    };
  }
}
