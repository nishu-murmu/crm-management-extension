import {
  getAssigneeName,
  getNameObject,
  getUniqueAssigneeNames,
} from '@/src/utils/utils';
import { useEffect, useState } from 'react';
import Dropdown from '../core/Dropdown';

const AssigneeDropdown = () => {
  const [assignees, setAssignees] = useState<{ key: string; value: string }[]>(
    []
  );
  const [selectedAssignee, setSelectedAssignee] = useState('all');

  function getValueFromKey(name: string) {
    const [key, value] = name.split('\n').map((n) => n.trim());
    return { key, value };
  }

  useEffect(() => {
    const names = getUniqueAssigneeNames();
    setAssignees([
      { key: 'all', value: 'All' },
      ...names.map(([key, value]) => {
        const { key: assigneeKey, value: assigneeValue } =
          getValueFromKey(value);
        return { key: assigneeKey, value: assigneeValue };
      }),
    ]);
  }, []);

  const handleChange = (event: any) => {
    const selectedAssignee = event;
    setSelectedAssignee(selectedAssignee);

    const ticketRows = document.querySelectorAll(
      '.has-row-options'
    ) as NodeListOf<HTMLElement>;
    if (!event || selectedAssignee.id === 'all') {
      ticketRows.forEach((row) => {
        row.style.display = '';
      });
      return;
    }

    ticketRows.forEach((row) => {
      const { key: assigneeKey } = getValueFromKey(getAssigneeName(row));
      if (assigneeKey === selectedAssignee.id) {
        row.style.display = '';
      } else {
        row.style.display = 'none';
      }
    });
  };

  return (
    <div className="cp-w-full cp-mb-4">
      <Dropdown
        id="assignee-dropdown"
        className="cp-w-[220px] cp-bg-white cp-border cp-border-gray-400 cp-rounded-lg cp-leading-tight focus:cp-outline-none focus:cp-border-blue-500"
        people={assignees.map(({ key, value }) => ({ id: key, name: value }))}
        value={selectedAssignee}
        onChange={handleChange}
      />
    </div>
  );
};

export default AssigneeDropdown;
