import { config } from '../config/config';

export function sendMessage({
  action,
  payload,
}: {
  action: string;
  payload?: any;
}) {
  return new Promise((resolve) => {
    chrome.runtime.sendMessage({ action, payload }, (response) => {
      resolve(response);
    });
  });
}

export function handleCopyCode(string) {
  if (!string) return;
  navigator.clipboard.writeText(string);
}

function isValidUrl(urlString: string) {
  try {
    if (!urlString.includes('//')) {
      return false;
    }
    return Boolean(new URL(urlString));
  } catch (e) {
    return false;
  }
}

export async function updateExtensionIcon({ web_url }) {
  // const storeInfo: any = await getStoreInfoFromUrl(web_url);
  // const isMerchantPage = !!storeInfo?.id;
  // if (isMerchantPage) {
  //   const coupon_count =
  //     (storeInfo?.coupon_count?.code || 0) +
  //     (storeInfo?.coupon_count?.sale || 0) +
  //     (storeInfo?.coupon_count?.print || 0);
  //   if (coupon_count > 0) {
  //     chrome.action.setBadgeText({
  //       text: `${coupon_count}`,
  //     });
  //     chrome.action.setBadgeBackgroundColor({
  //       color: '#819da6',
  //     });
  //   }
  // } else {
  //   chrome.action.setBadgeText({
  //     text: '',
  //   });
  // }
  // chrome.action.setIcon({
  //   path: isMerchantPage
  //     ? chrome.runtime.getURL('/images/active-128.png')
  //     : chrome.runtime.getURL('/images/in-active-128.png'),
  // });
}

export function removeDownloadExtensionSection() {
  let currentUrlHostname = window.location.hostname;
  let appUrlHostname = new URL(config.APP_URL).hostname;
  if (currentUrlHostname !== appUrlHostname) return;
  let counter = 0;
  const interval = setInterval(() => {
    if (config.REMOVE_DOWNLOAD_EXTENSION_SECTION_ID) {
      let extensionSection = document.querySelector(
        `#${config.REMOVE_DOWNLOAD_EXTENSION_SECTION_ID}`
      );
      if (extensionSection) {
        extensionSection.remove();
        clearInterval(interval);
      }
    }
    if (counter > 1000000000) {
      clearInterval(interval);
    }
    counter++;
  }, 100);
}
