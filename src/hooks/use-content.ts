import { generateSummarizePrompt } from '../utils/prompts';

function useContent() {
  function generateAssigneeReport() {
    const ticketRows = document.querySelectorAll('tr');
    const assigneeTicketsMap = {};

    ticketRows.forEach((row) => {
      const assigneeLink = row.querySelector('a[title]');
      const ticketLinkElement = row.querySelector(
        'a[href*="tickets/"]'
      ) as HTMLAnchorElement;

      if (assigneeLink && ticketLinkElement) {
        const assigneeName =
          assigneeLink.getAttribute('title') || ('' as string);
        const ticketLink = ticketLinkElement.href;

        if (!assigneeTicketsMap[assigneeName]) {
          assigneeTicketsMap[assigneeName] = [];
        }
        assigneeTicketsMap[assigneeName].push(ticketLink);
      }
    });

    let fileContent = 'Tickets grouped by assignee:\n\n';
    Object.keys(assigneeTicketsMap).forEach((assigneeName) => {
      fileContent += `Name: ${assigneeName}\n`;
      assigneeTicketsMap[assigneeName].forEach((ticketLink, index) => {
        fileContent += `Ticket ${index + 1}: ${ticketLink}\n`;
      });
      fileContent += '\n';
    });

    const blob = new Blob([fileContent], { type: 'text/plain' });
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = 'ticket_data.txt';
    link.click();
  }

  function generateProjectReport() {
    const ticketRows = document.querySelectorAll('tr');
    const contactTicketsMap = {};

    ticketRows.forEach((row) => {
      const contactLink = row.querySelector('a[href*="clients/"]');
      const ticketLinkElement = row.querySelector(
        'a[href*="tickets/"]'
      ) as HTMLAnchorElement;

      if (contactLink && ticketLinkElement) {
        const contactName = contactLink.textContent?.trim() || ('' as string);
        const ticketLink = ticketLinkElement.href;

        if (!contactTicketsMap[contactName]) {
          contactTicketsMap[contactName] = [];
        }
        contactTicketsMap[contactName].push(ticketLink);
      }
    });

    let fileContent = 'Tickets grouped by contact:\n\n';
    Object.keys(contactTicketsMap).forEach((contactName) => {
      fileContent += `Contact: ${contactName}\n`;
      contactTicketsMap[contactName].forEach((ticketLink, index) => {
        fileContent += `Ticket ${index + 1}: ${ticketLink}\n`;
      });
      fileContent += '\n';
    });

    const blob = new Blob([fileContent], { type: 'text/plain' });
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = 'contact_tickets.txt';
    link.click();
  }

  function openOpenTickets() {
    const ticketRows = document.querySelectorAll('table tbody tr');
    const regex = /^https:\/\/crm\.enacton\.com\/admin\/tickets\/ticket\/\d+$/;

    const filteredLinks = Array.from(ticketRows)
      .filter((row) => {
        const ticketLinkElement = row.querySelector('a');
        const link = ticketLinkElement ? ticketLinkElement.href : '';

        const statusElement = row.querySelector('span.label.ticket-status-1');
        const status = statusElement
          ? statusElement.textContent?.trim().toLowerCase()
          : '';

        return regex.test(link) && status === 'open';
      })
      .map(
        (row) => (row.querySelector('a') as HTMLAnchorElement).href as string
      );

    filteredLinks.forEach((link) => {
      window.open(link, '_blank');
    });
  }

  async function generateBlackBoxReport(additionalPrompt?: string) {
    const prompt = generateSummarizePrompt();
    return new Promise((resolve, reject) => {
      chrome.runtime.sendMessage(
        {
          action: 'GENERATE_REPORT',
          payload: {
            prompt: `${prompt} \n\n ${additionalPrompt}`,
          },
        },
        (response) => {
          if (chrome.runtime.lastError) {
            reject(chrome.runtime.lastError);
          } else {
            resolve(response);
          }
        }
      );
    }) as Promise<string>;
  }

  return {
    generateBlackBoxReport,
    generateAssigneeReport,
    generateProjectReport,
    openOpenTickets,
  };
}

export default useContent;
