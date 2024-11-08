import { config } from '../config/config';
import '../tailwind-css/input.css';
import { injectTicketManager } from '../utils/utils';
import { createGenerateButtonUi } from './CreateGenerateButtonUi';
import { createRephraseButtonUi } from './CreateRephraseButtonUi';
import { createSliderUi } from './CreateSliderUi';

export default defineContentScript({
  matches: [config.CRM_TICKETS_PAGE, config.CRM_TICKET_PAGE + '*'],
  cssInjectionMode: 'ui',

  async main(ctx) {
    const sliderUi = await createSliderUi(ctx);
    sliderUi.mount();
    // Inject ticket manager
    setTimeout(() => {
      injectTicketManager();
    }, 1000);

    const observer = new MutationObserver((list) => {
      injectTicketManager();
      observer.disconnect();
    });

    observer.observe(document.body, {
      childList: true,
      subtree: true,
      attributes: true,
      characterData: true,
    });

    if (location.href.includes(config.CRM_TICKET_PAGE)) {
      const generateButtonUi = await createGenerateButtonUi(ctx);
      generateButtonUi.mount();

      // Create rephrase button after 1 second
      const rephraseButtonUi = await createRephraseButtonUi(ctx);
      rephraseButtonUi?.mount();
    }
  },
});
