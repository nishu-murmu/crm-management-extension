import { createRoot } from 'react-dom/client';
import AssigneeDropdown from '../components/generic/AssigneeDropdown';

export function createAssigneeDropdownUi(ctx: any) {
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
