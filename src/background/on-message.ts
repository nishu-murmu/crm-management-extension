import { fetchBlackBoxAiResponse } from '../utils/blackbox-ai-utils';
import { rephrasePrompt } from '../utils/prompts';

chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  (async () => {
    switch (request.action) {
      case 'GET_CURRENT_TAB':
        sendResponse(sender.tab);
        break;
      case 'GENERATE_REPORT':
        const response = await fetchBlackBoxAiResponse(request.payload.prompt);
        sendResponse(response);
        break;
      case 'REPHRASE':
        const rephraseResponse = await fetchBlackBoxAiResponse(
          rephrasePrompt({
            original_response: request.payload.original_response,
            client_name: request.payload.client_name,
          })
        );
        sendResponse(rephraseResponse);
        break;
      default:
        break;
    }
  })();
  return true;
});
