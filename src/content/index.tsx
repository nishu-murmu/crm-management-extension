import { config } from '../config/config';
import '../tailwind-css/input.css';
import 'react-tooltip/dist/react-tooltip.css';
import { injectTicketManager } from '../utils/utils';
import { createAssigneeDropdownUi } from './AssigneeDropdownUi';
import { createGenerateButtonUi } from './GenerateButtonUi';
import { createRephraseButtonUi } from './RephraseButtonUi';
import { createSliderUi } from './SliderUi';

export default defineContentScript({
  matches: [config.CRM_TICKETS_PAGE, config.CRM_TICKET_PAGE + '*'],
  cssInjectionMode: 'ui',

  async main(ctx) {
    const sliderUi = await createSliderUi(ctx);
    sliderUi.mount();
    await injectTicketManager();

    if (location.href.includes(config.CRM_TICKETS_PAGE)) {
      const assigneeDropdownUi = await createAssigneeDropdownUi(ctx);
      assigneeDropdownUi?.mount();
    }

    if (location.href.includes(config.CRM_TICKET_PAGE)) {
      setTimeout(async () => {
        const generateButtonUi = await createGenerateButtonUi(ctx);
        generateButtonUi.mount();

        // Create rephrase button after 1 second
        const rephraseButtonUi = await createRephraseButtonUi(ctx);
        rephraseButtonUi?.mount();
      }, 100);
    }
  },
});
