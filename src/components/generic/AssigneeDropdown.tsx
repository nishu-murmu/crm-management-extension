import { translate } from '@/src/translation/translation';
import {
  getAssigneeName,
  getKeyAndValue,
  getNameObject,
  getUniqueAssigneeNames,
} from '@/src/utils/utils';
import { useState, useEffect } from 'react';

const AssigneeDropdown = () => {
  const [assignees, setAssignees] = useState<{ key: string; value: string }[]>(
    []
  );
  const [selectedAssignee, setSelectedAssignee] = useState('');

  useEffect(() => {
    const names = getUniqueAssigneeNames();
    setAssignees([
      { key: 'all', value: 'All' },
      ...names.map(([key, value]) => ({ key, value })),
    ]);
  }, []);

  const handleChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedAssignee = event.target.value;
    setSelectedAssignee(selectedAssignee);

    const ticketRows = document.querySelectorAll(
      '.has-row-options'
    ) as NodeListOf<HTMLElement>;
    if (event.target.value === 'all') {
      ticketRows.forEach((row) => {
        row.style.display = '';
      });
      return;
    }

    ticketRows.forEach((row) => {
      const { key: assigneeKey } = getNameObject(getAssigneeName(row));
      if (assigneeKey === selectedAssignee) {
        row.style.display = '';
      } else {
        row.style.display = 'none';
      }
    });
  };

  return (
    <div className="cp-w-full cp-max-w-xs cp-mb-4">
      <select
        id="assignee-dropdown"
        value={selectedAssignee}
        onChange={handleChange}
        className="cp-block cp-w-full cp-bg-white cp-border cp-border-gray-400 cp-py-2 cp-px-3 cp-rounded cp-leading-tight focus:cp-outline-none focus:cp-border-blue-500"
      >
        <option value="">{translate('selectAnAssignee')}</option>
        {assignees.map(({ key, value }) => (
          <option key={key} value={key}>
            {value}
          </option>
        ))}
      </select>
    </div>
  );
};

export default AssigneeDropdown;
