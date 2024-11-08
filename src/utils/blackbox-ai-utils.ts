import { config } from '../config/config';
import { v4 as uuidv4 } from 'uuid';

export async function fetchBlackBoxAiResponse(prompt: string) {
  const message_id = uuidv4();

  return fetch(config.BLACKBOX_API_ENDPOINT, {
    headers: {
      accept: '*/*',
      'accept-language': 'en-GB,en;q=0.7',
      'content-type': 'application/json',
      priority: 'u=1, i',
    },
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
    credentials: 'include',
  }).then((r) => r.text());
}
