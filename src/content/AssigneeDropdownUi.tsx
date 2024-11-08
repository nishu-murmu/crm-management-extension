import { createRoot } from 'react-dom/client';
import AssigneeDropdown from '../components/generic/AssigneeDropdown';

export function createAssigneeDropdownUi(ctx: any) {
  const elem = document.querySelector(
    '#tickets_wrapper .row:nth-child(2) .col-md-7'
  ) as HTMLDivElement;
  elem.style.display = 'flex';
  elem.style.gap = '12px';
  const linkElem = document.createElement('link');
  linkElem.setAttribute('rel', 'stylesheet');
  linkElem.setAttribute('type', 'text/css');
  document.head.appendChild(linkElem).href =
    chrome.runtime.getURL('assets/input.css');

  const observer = new MutationObserver((list) => {
    console.log('🚀 ~ observer ~ list:', list);

    const portalRoot = document.querySelector('#headlessui-portal-root');
    const enactonCrmAssigneeDropdown = document.querySelector(
      'enacton-crm-assignee-dropdown'
    );

    if (portalRoot && enactonCrmAssigneeDropdown) {
      enactonCrmAssigneeDropdown.shadowRoot?.appendChild(portalRoot);
      portalRoot.remove();
      observer.disconnect();
    }
  });
  observer.observe(document.body, { childList: true, subtree: true });
  return createShadowRootUi(ctx, {
    name: 'enacton-crm-assignee-dropdown',
    position: 'inline',
    anchor: '#tickets_wrapper .row:nth-child(2) .col-md-7',
    append: 'last',
    onMount: async (container) => {
      const app = document.createElement('span');
      container.append(app);
      const root = createRoot(app);
      root.render(<AssigneeDropdown />);
      return root;
    },
    onRemove: async (root) => {
      const res = await root;
      res?.unmount();
    },
  });
}
