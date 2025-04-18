import { RequestApiPage } from '../framework/ui/pages/api/request/request.page';
import { ResponseApiPage } from '../framework/ui/pages/api/response/response.page';
import { test as apiTest } from '@playwright/test';

interface Requests {
  apiRequest: RequestApiPage;
  apiResponse: ResponseApiPage;
}

export const api = apiTest.extend<Requests>({
  apiRequest: async ({ request }, use) => {
    await use(new RequestApiPage(request));
  },
  apiResponse: async ({}, use) => {
    await use(new ResponseApiPage());
  },
});
