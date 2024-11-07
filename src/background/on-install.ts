import { config } from '../config/config';

chrome.runtime.onInstalled.addListener(() => {
  chrome.tabs.query({}, (tabs) => {
    const current_tab =
      tabs.find(
        (tab) =>
          tab.url === config.CRM_TICKETS_PAGE ||
          tab.url === config.CRM_AUTHENTICATION_PAGE
      ) || 0;
    if (current_tab) {
      chrome.tabs.update(current_tab?.id as number, {
        active: true,
      });
    } else {
      chrome.tabs.create({
        url: config.CRM_TICKETS_PAGE,
      });
    }
  });
});

chrome.action.onClicked.addListener((tab) => {
  if (!tab.id) return;
  chrome.tabs.sendMessage(tab.id, {
    action: 'OPEN_POPUP',
  });
});
