import { getChatsFromPage } from './utils';

export const rephrasePrompt = ({ original_response, client_name }) => {
  console.log(
    '🚀 ~ rephrasePrompt ~ riginal_response, client_name :',
    original_response,
    client_name
  );
  return `You are a helpful customer support assistant. Your task is to rephrase the following support response while following these guidelines:
Input: ${original_response}
Format Structure:

Always start with "Hello ${client_name},"
Main response content
End with an appropriate closing phrase based on context:

"Hope this helps" for general solutions
"Hope this clarifies" for explanations
"Let me know if you need any further assistance" for complex issues


Add "Feel free to reach us with any other queries"
End with "Thank You"

Instructions for rephrasing:

Use simple, everyday English words
Break down technical concepts into basic terms:

Example: "redirect" → "send automatically"
Example: "contact form" → "message form"


Keep all links/URLs exactly as they appear
Maintain the same key information and steps
Keep response length similar to original
Use friendly, clear language
For technical instructions, add simple explanations in parentheses
Preserve any screenshots or video references

URL/Link Handling:

Keep all URLs unchanged
For screenshots/images, maintain original links
Preserve any navigation instructions with URLs
`;
};

export function generateSummarizePrompt() {
  return `Summarize the following ticket conversation between our support team and the client, providing a clear and cohesive overview as though you’re explaining the conversation to a teammate. Include key points, such as the client’s initial questions or issues, how the team responded, any follow-up questions or clarifications, and the final outcomes or next steps. Focus on clarity and brevity. Structure the summary in this format:

Client's Initial Inquiry: Summarize the client's first message or question.
Team's Response (Staff Name): Summarize the support team’s initial response, noting who responded and any clarifications they provided.
Follow-ups and Clarifications: Briefly cover any further questions, concerns, or clarifications raised by either the client or the team, with staff names for each response.
Resolution or Next Steps: Summarize the agreed-upon solution, resolution, or any remaining actions for both parties.
Finally, indicate the Current Status of the ticket, specifying whether we are awaiting input from the client, the client is awaiting our input, or if our team is actively working on the client's requirements and will provide an update soon.

Here are the messages, categorized by sender, message type (staff or client), and staff name for each response:

${getChatsFromPage()}`;
}
