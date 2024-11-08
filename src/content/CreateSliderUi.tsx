import { createRoot } from 'react-dom/client';
import Main from '../components/main';
import { removeDownloadExtensionSection } from '../utils/utils';
import { Provider } from 'jotai/react';

export function createSliderUi(ctx: any) {
  return createShadowRootUi(ctx, {
    name: 'enacton-crm-button',
    position: 'inline',
    onMount: async (container) => {
      removeDownloadExtensionSection();
      const { last_top_position } = await chrome.storage.local.get();

      const app = document.createElement('div');
      container.append(app);
      const root = createRoot(app);
      root.render(
        <Provider>
          <Main lastTopPosition={last_top_position} />
        </Provider>
      );
      return root;
    },
    onRemove: async (root) => {
      const res = await root;
      res?.unmount();
    },
  });
}
