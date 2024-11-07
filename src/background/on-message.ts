import { config } from '../config/config';
import { v4 as uuidv4 } from 'uuid';
import { rephrasePrompt } from '../utils/prompts';

async function fetchBlackBoxAiResponse(prompt: string) {
  const message_id = uuidv4();

  return fetch(config.BLACKBOX_API_ENDPOINT, {
    headers: {
      accept: '*/*',
      'accept-language': 'en-GB,en;q=0.7',
      'cache-control': 'no-cache',
      'content-type': 'application/json',
      pragma: 'no-cache',
      priority: 'u=1, i',
      'sec-ch-ua': '"Chromium";v="130", "Brave";v="130", "Not?A_Brand";v="99"',
      'sec-ch-ua-mobile': '?0',
      'sec-ch-ua-platform': '"Windows"',
      'sec-fetch-dest': 'empty',
      'sec-fetch-mode': 'cors',
      'sec-fetch-site': 'same-origin',
      'sec-gpc': '1',
    },
    referrer: 'https://www.blackbox.ai/',
    referrerPolicy: 'strict-origin-when-cross-origin',
    body: JSON.stringify({
      messages: [
        {
          id: message_id,
          content: prompt,
          role: 'user',
        },
      ],
      id: message_id,
      previewToken: null,
      userId: null,
      codeModelMode: true,
      agentMode: {},
      trendingAgentMode: {},
      isMicMode: false,
      userSystemPrompt: null,
      maxTokens: 1024,
      playgroundTopP: 0.9,
      playgroundTemperature: 0.5,
      isChromeExt: false,
      githubToken: null,
      clickedAnswer2: false,
      clickedAnswer3: false,
      clickedForceWebSearch: false,
      visitFromDelta: false,
      mobileClient: false,
      userSelectedModel: null,
      validated: '69783381-2ce4-4dbd-ac78-35e9063feabc',
    }),
    method: 'POST',
    mode: 'cors',
    credentials: 'include',
  }).then((r) => r.text());
}

chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  (async () => {
    switch (request.action) {
      case 'GET_CURRENT_TAB':
        sendResponse(sender.tab);
        break;
      case 'GENERATE_REPORT':
        console.log('🚀 ~ request:', request);
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
