import { Provider } from 'jotai/react';
import ReactDOM from 'react-dom/client';
import Main from '../components/main';
import '../tailwind-css/input.css';
import {
  injectTicketManager,
  removeDownloadExtensionSection,
} from '../utils/utils';
import GenerateButton from '../components/generic/GenerateButton';
import { config } from '../config/config';
import RephraseButton from '../components/generic/RephraseButton';

export default defineContentScript({
  matches: ['<all_urls>'],
  cssInjectionMode: 'ui',

  async main(ctx) {
    const sliderUi = await createSliderUi(ctx);
    sliderUi.mount();

    // Inject ticket manager
    if (location.href.includes(config.CRM_TICKETS_PAGE)) {
      setTimeout(() => {
        injectTicketManager();
      }, 1000);
    }

    if (location.href.includes(config.CRM_TICKET_PAGE)) {
      console.log('gone inside');
      const generateButtonUi = await createGenerateButtonUi(ctx);
      generateButtonUi.mount();

      // Create rephrase button after 1 second
      setTimeout(async () => {
        const rephraseButtonUi = await createRephraseButtonUi(ctx);
        rephraseButtonUi?.mount();
        const button = document.querySelector(
          'enacton-crm-rephrase-button'
        ) as HTMLDivElement;

        // Observe for changes in the paragraph element
        const observer = new MutationObserver((list) => {
          console.log('🚀 ~ observer.observe ~ list:', list);
          if (button) {
            button.style.display = 'block';
          }
          observer.disconnect();
        });
        const iframeElem = document.querySelector(
          'iframe#message_ifr'
        ) as HTMLIFrameElement;

        if (iframeElem) {
          const paraElem = iframeElem.contentDocument?.querySelector('p');
          if (paraElem) {
            observer.observe(paraElem, {
              childList: true,
              subtree: true,
              attributes: true,
              characterData: true,
            });
          }
        }
      }, 1000);
    }
  },
});

function createSliderUi(ctx: any) {
  return createShadowRootUi(ctx, {
    name: 'enacton-crm-button',
    position: 'inline',
    onMount: async (container) => {
      removeDownloadExtensionSection();
      const { last_top_position } = await chrome.storage.local.get();

      const app = document.createElement('div');
      container.append(app);
      const root = ReactDOM.createRoot(app);
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

function createGenerateButtonUi(ctx: any) {
  return createShadowRootUi(ctx, {
    name: 'enacton-crm-generate-button',
    position: 'inline',
    anchor: '.tox-toolbar__primary',
    append: 'last',
    onMount: async (container) => {
      const app = document.createElement('div');
      container.append(app);
      const root = ReactDOM.createRoot(app);
      root.render(<GenerateButton />);
      return root;
    },
    onRemove: async (root) => {
      const res = await root;
      res?.unmount();
    },
  });
}

function createRephraseButtonUi(ctx: any) {
  const iframeElem = document.querySelector(
    'iframe#message_ifr'
  ) as HTMLIFrameElement;
  if (!iframeElem) return;
  const paraElem = iframeElem.contentDocument?.querySelector('p');
  if (!paraElem) return;

  return createShadowRootUi(ctx, {
    name: 'enacton-crm-rephrase-button',
    position: 'inline',
    css: 'display: none;',
    anchor: paraElem,
    append: 'last',
    onMount: async (container) => {
      const app = document.createElement('div');
      container.append(app);
      const root = ReactDOM.createRoot(app);
      root.render(<RephraseButton />);
      return root;
    },
    onRemove: async (root) => {
      const res = await root;
      res?.unmount();
    },
  });
}
