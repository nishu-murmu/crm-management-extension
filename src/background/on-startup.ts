import { activateCRMTab } from '../utils/utils';

chrome.runtime.onStartup.addListener(() => {
  activateCRMTab();
});
