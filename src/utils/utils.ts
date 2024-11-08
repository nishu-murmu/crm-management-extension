import { config, ROUTES } from '../config/config';

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

export function sleep(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms));
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

export function getCurrentRoute() {
  if (window.location.href.includes(config.CRM_TICKET_PAGE)) {
    return ROUTES.GENERATE;
  }
  return ROUTES.HOME;
}

export function getNameObject(name) {
  const initials = name
    .split(' ')
    .map((n) => n[0])
    .join('')
    .toUpperCase();
  return { key: initials, value: name };
}

function calculateDaysHoursAndMinutes(date1, date2) {
  const differenceInTime = date2.getTime() - date1.getTime();
  const days = Math.floor(differenceInTime / (1000 * 3600 * 24));
  const hours = Math.floor(
    (differenceInTime % (1000 * 3600 * 24)) / (1000 * 3600)
  );
  const minutes = Math.floor((differenceInTime % (1000 * 3600)) / (1000 * 60));

  return {
    days: days,
    hours: hours,
    minutes: minutes,
  };
}

function parseCustomDate(dateString) {
  if (!dateString || !dateString.includes(' ')) return NaN;

  const [datePart, timePart] = dateString.split(' ');
  const [day, month, year] = datePart.split('-').map(Number);
  let [hour, minute] = timePart.split(':').map(Number);
  const period = timePart.split(' ')[1];

  if (period === 'PM' && hour < 12) hour += 12;
  if (period === 'AM' && hour === 12) hour = 0;

  return new Date(year, month - 1, day, hour, minute);
}

export function getAssigneeName(row) {
  const nameExtractors = [
    (row) =>
      row
        .querySelector('.name-tag, .assignee-tag, .user-tag')
        ?.textContent?.trim(),
    (row) =>
      row.querySelector('a.user-link, a.assignee-link')?.textContent?.trim(),
    (row) =>
      row.querySelector('.assigned-to, .assignee-name')?.textContent?.trim(),
    (row) => {
      const element = row.querySelector('[data-assignee], [data-assigned-to]');
      return (
        element?.getAttribute('data-assignee') ||
        element?.getAttribute('data-assigned-to')
      );
    },
    (row) => {
      const tooltipElement = row.querySelector(
        '[title], [data-original-title]'
      );
      return (
        tooltipElement?.getAttribute('title') ||
        tooltipElement?.getAttribute('data-original-title')
      );
    },
    (row) => {
      const profileImg = row.querySelector('img[alt]');
      return profileImg
        ?.getAttribute('alt')
        ?.replace('Profile picture of ', '')
        ?.trim();
    },
  ];

  for (const extractor of nameExtractors) {
    try {
      const name = extractor(row);
      if (name && name.length > 0 && name !== 'undefined' && name !== 'null') {
        if (
          name.length >= 2 &&
          name.length <= 50 &&
          /^[A-Za-z\s\-'.]+$/.test(name)
        ) {
          return name;
        }
      }
    } catch (error) {
      console.warn('Error in name extractor:', error);
    }
  }
  return 'Not Assigned';
}

export async function injectTicketManager() {
  await sleep(1000);
  if (!location.href.includes(config.CRM_TICKETS_PAGE)) return;

  const daysWithoutReplyThresholds = { yellow: 2, orange: 5, red: 7 };
  const styleSheet = document.createElement('link');
  styleSheet.setAttribute('type', 'text/css');
  styleSheet.setAttribute('rel', 'stylesheet');

  styleSheet.href = chrome.runtime.getURL('content-scripts/custom.css');
  styleSheet.id = 'crm-tickets-management';
  document.head.appendChild(styleSheet);

  // Updated color palette
  const colors = {
    yellow: '#FFF8E1',
    orange: '#FFE0B2',
    red: '#FFEBEE',
    bugFixRed: '#FDE7E7',
    customizationOrange: '#FFF3E0',
    deadlineRed: '#FFEBEE',
    noReplyYet: '#F3E5F5',
  };

  document
    .querySelectorAll('.days-badge, .assignee-name')
    .forEach((element) => element.remove());

  const today = new Date();

  function injectColors() {
    const ticketRows = document.querySelectorAll(
      '.has-row-options'
    ) as NodeListOf<HTMLElement>;
    ticketRows.forEach((row) => {
      row.classList.add('clickable');

      const categoryElement = row.querySelector('td:nth-last-child(1)');
      const categoryText =
        categoryElement?.textContent?.trim().toLowerCase() || '';

      // Enhanced category styling
      if (categoryElement) {
        categoryElement.innerHTML = `
              <div class="ticket-category">
                  ${
                    categoryText.charAt(0).toUpperCase() + categoryText.slice(1)
                  }
              </div>
          `;
      }

      if (categoryText === 'bug fix') {
        row.style.setProperty('--highlight-color', colors.bugFixRed);
        row.classList.add('ticket-row-highlighted');
        row.querySelectorAll('td').forEach((cell) => {
          cell.style.backgroundColor = colors.bugFixRed;
        });
        return;
      }
      const lastReplyElement = row.querySelector('td:nth-child(10)');
      if (lastReplyElement) {
        const lastReplyText = lastReplyElement.textContent?.trim();
        if (lastReplyText && lastReplyText !== 'No Reply Yet') {
          const lastReplyDate = parseCustomDate(lastReplyText) as number;

          if (!isNaN(lastReplyDate)) {
            const {
              days: lastReplyDays,
              hours,
              minutes,
            } = calculateDaysHoursAndMinutes(lastReplyDate, today);

            const daysWithoutReply = Math.floor(lastReplyDays);
            const lastReplyHours = Math.floor(hours);
            const lastReplyMinutes = Math.floor(minutes);
            let color = '';
            let badgeClass = '';

            if (daysWithoutReply > daysWithoutReplyThresholds.orange) {
              color = colors.red;
              badgeClass = 'danger';
            } else if (daysWithoutReply > daysWithoutReplyThresholds.yellow) {
              color = colors.orange;
              badgeClass = 'warning';
            } else {
              color = colors.yellow;
            }

            if (color) {
              row.style.setProperty('--highlight-color', color);
              row.classList.add('ticket-row-highlighted');
              row.querySelectorAll('td').forEach((cell) => {
                cell.style.backgroundColor = color;
              });

              const badge = document.createElement('span');
              badge.className = `days-badge ${badgeClass}`;
              badge.textContent = `${
                !daysWithoutReply ? '' : daysWithoutReply + ' days'
              }  ${!lastReplyHours ? '' : lastReplyHours + ' hrs'} ${
                !lastReplyMinutes ? '' : lastReplyMinutes + ' mins'
              }`;
              lastReplyElement.appendChild(badge);
            }
          }
        } else {
          row.style.setProperty('--highlight-color', colors.noReplyYet);
          row.classList.add('ticket-row-highlighted');
          row.querySelectorAll('td').forEach((cell) => {
            cell.style.backgroundColor = colors.noReplyYet;
          });
        }
      }

      // Rest of the existing functionality remains unchanged
      // Status enhancement
      const statusElement = row.querySelector('.ticket-status-1');
      if (!statusElement?.textContent) {
        return;
      }
      const status = statusElement.textContent.trim().toLowerCase();
      statusElement.innerHTML = `
          <span class="priority-indicator priority-${
            status === 'high' ? 'high' : status === 'medium' ? 'medium' : 'low'
          }"></span>
          ${status.toUpperCase()}
      `;

      // Assignee name enhancement
      const { value: assigneeName, key } = getNameObject(getAssigneeName(row));
      if (assigneeName) {
        const initials = key.toUpperCase();

        const assigneeNameElement = document.createElement('div');
        assigneeNameElement.className = 'assignee-name clickable';
        assigneeNameElement.innerHTML = `
            <div class="assignee-avatar ${
              assigneeName === 'NOT ASSIGNED' ? 'priority-high' : ''
            }">${initials}</div>
            ${assigneeName}
        `;

        const container =
          row.querySelector('a[title]')?.parentNode ||
          row.querySelector('.assignee-cell') ||
          row.querySelector('.user-cell') ||
          row.querySelector('.valign')?.parentNode;

        if (container) {
          container.appendChild(assigneeNameElement);
        }
      }
    });
  }

  async function observerCallback(list) {
    await sleep(100);
    injectColors();
  }

  injectColors();

  const observer = new MutationObserver(observerCallback);
  observer.observe(document.querySelector('table tbody') as Node, {
    childList: true,
  });
}

export function getUniqueAssigneeNames() {
  const assigneeNamesSet = new Map<string, string>();
  const ticketRows = document.querySelectorAll(
    '.has-row-options'
  ) as NodeListOf<HTMLElement>;

  ticketRows.forEach((row) => {
    const { key: assigneeKey, value: assigneeName } = getNameObject(
      getAssigneeName(row)
    );
    if (!assigneeNamesSet.has(assigneeKey)) {
      assigneeNamesSet.set(assigneeKey, assigneeName);
    }
  });

  return Array.from(assigneeNamesSet);
}

export function getChatsFromPage() {
  // Function to clean text content by removing extra whitespace and newlines
  const cleanText = (text) => {
    return text.replace(/\s+/g, ' ').replace(/\n+/g, ' ').trim();
  };

  // Function to extract chats from HTML content
  const extractChats = (htmlContent) => {
    // Create a DOM parser
    const parser = new DOMParser();
    const doc = parser.parseFromString(htmlContent, 'text/html');

    // Find all panel bodies containing chats
    const chatPanels = doc.querySelectorAll('.panel-body');
    const chats = [] as { name: string; type: string; chat: string }[];

    chatPanels.forEach((panel) => {
      // Skip if it's not a chat panel
      if (!panel.querySelector('.ticket-submitter-info')) return;

      // Determine if it's a client reply
      const isClient = panel.classList.contains('client-reply');

      // Extract name
      const nameElement = panel.querySelector(
        '.ticket-submitter-info p:first-child a'
      );
      if (!nameElement) return;
      const name = (nameElement.textContent?.trim() || '') as string;

      // Extract chat content
      const contentElement = panel.querySelector('.tc-content');
      if (!contentElement) return;
      const chat = cleanText(contentElement.textContent);

      // Create chat object
      chats.push({
        name: name,
        type: isClient ? 'customer' : 'staff',
        chat: chat,
      });
    });

    return chats;
  };

  // Function to format chats as text
  const formatChatsAsText = (chats) => {
    return chats
      .map((chat, index) => {
        return `=== Message ${index + 1} ===
Name: ${chat.name}
Type: ${chat.type}
Message: ${chat.chat}
`;
      })
      .join('\n');
  };

  // Main execution
  const htmlContent = document.documentElement.innerHTML;
  const chats = extractChats(htmlContent);
  return formatChatsAsText(chats);
}

export function activateCRMTab() {
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
}
