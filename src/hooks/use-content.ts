function useContent() {
  function getChatsFromPage() {
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

  function provideCustomPrompt() {
    return `Summarize the following ticket conversation between our support team and the client, providing a clear and cohesive overview as though you’re explaining the conversation to a teammate. Include key points, such as the client’s initial questions or issues, how the team responded, any follow-up questions or clarifications, and the final outcomes or next steps. Focus on clarity and brevity. Structure the summary in this format:

Client's Initial Inquiry: Summarize the client's first message or question.
Team's Response (Staff Name): Summarize the support team’s initial response, noting who responded and any clarifications they provided.
Follow-ups and Clarifications: Briefly cover any further questions, concerns, or clarifications raised by either the client or the team, with staff names for each response.
Resolution or Next Steps: Summarize the agreed-upon solution, resolution, or any remaining actions for both parties.
Finally, indicate the Current Status of the ticket, specifying whether we are awaiting input from the client, the client is awaiting our input, or if our team is actively working on the client's requirements and will provide an update soon.

Here are the messages, categorized by sender, message type (staff or client), and staff name for each response:

${getChatsFromPage()}`;
  }

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

  async function generateBlackBoxReport() {
    const prompt = provideCustomPrompt();
    return new Promise((resolve, reject) => {
      chrome.runtime.sendMessage(
        {
          action: 'GENERATE_REPORT',
          payload: {
            prompt: prompt,
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
