import { createRoot } from 'react-dom/client';
import GenerateButton from '../components/generic/GenerateButton';

export function createGenerateButtonUi(ctx: any) {
  return createShadowRootUi(ctx, {
    name: 'enacton-crm-generate-button',
    position: 'inline',
    anchor: '.tox-toolbar__primary',
    append: 'last',
    onMount: async (container) => {
      const app = document.createElement('div');
      container.append(app);
      const root = createRoot(app);
      root.render(<GenerateButton />);
      return root;
    },
    onRemove: async (root) => {
      const res = await root;
      res?.unmount();
    },
  });
}
