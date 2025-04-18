import { api } from '../fixtures/api.fixture';
import { components } from '../fixtures/components.fixture';
import { pages } from '../fixtures/pages.fixture';
import { mergeTests } from '@playwright/test';

export const test = mergeTests(pages, components, api);

export { expect } from '@playwright/test';
