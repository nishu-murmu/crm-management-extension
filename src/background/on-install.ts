import { config } from '../config/config';

chrome.runtime.onInstalled.addListener(() => {
  chrome.tabs.query({}, (tabs) => {
    const current_tab =
      tabs.find((tab) => tab.url === config.CRM_TICKETS_PAGE) || 0;
    if (current_tab) {
      chrome.tabs.update(current_tab?.id as number, {
        active: true,
      });
      chrome.tabs.reload(current_tab?.id as number);
    } else {
      chrome.tabs.create({
        url: config.CRM_TICKETS_PAGE,
      });
    }
  });
});
