import { Provider } from 'jotai/react';
import ReactDOM from 'react-dom/client';
import Main from './components/main';
import './tailwind-css/input.css';
import { removeDownloadExtensionSection } from './utils/utils';

export default defineContentScript({
  matches: ['<all_urls>'],
  cssInjectionMode: 'ui',

  async main(ctx) {
    const ui = await createShadowRootUi(ctx, {
      name: 'code-promo',
      position: 'inline',
      onMount: async (container) => {
        removeDownloadExtensionSection();
        const { last_top_position } = await chrome.storage.local.get();

        const app = document.createElement('div');
        container.append(app);
        const root = ReactDOM.createRoot(app);
        root.render(
          <Provider>
            <Main lastTopPosition={last_top_position} currentStoreInfo={{}} />
          </Provider>
        );
        return root;
      },
      onRemove: async (root) => {
        const res = await root;
        res?.unmount();
      },
    });

    ui.mount();
  },
});
