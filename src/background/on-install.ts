import { activateCRMTab } from '../utils/utils';

chrome.runtime.onInstalled.addListener(() => {
  activateCRMTab();
});

chrome.action.onClicked.addListener((tab) => {
  if (!tab.id) return;
  chrome.tabs.sendMessage(tab.id, {
    action: 'OPEN_POPUP',
  });
});
