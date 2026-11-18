import { expect, mergeTests } from "@playwright/test";
import { test as dataTest } from "./data.fixture";
import { test as pageTest } from "./pages.fixture";

export const test = mergeTests(dataTest, pageTest);
export { expect };