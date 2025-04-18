import { FooterComponent } from '../components/footer.component';
import { HeaderComponent } from '../components/header.component';
import { SliderComponent } from '../components/slider.component';
import { test as componentsTest } from '@playwright/test';

interface Components {
  header: HeaderComponent;
  slider: SliderComponent;
  footer: FooterComponent;
}

export const components = componentsTest.extend<Components>({
  header: async ({ page }, use) => {
    await use(new HeaderComponent(page));
  },
  slider: async ({ page }, use) => {
    await use(new SliderComponent(page));
  },
  footer: async ({ page }, use) => {
    await use(new FooterComponent(page));
  },
});
