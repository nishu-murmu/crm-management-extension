import {
  Combobox,
  ComboboxButton,
  ComboboxInput,
  ComboboxOption,
  ComboboxOptions,
} from '@headlessui/react';
import { ChevronDownIcon } from '@heroicons/react/20/solid';
import clsx from 'clsx';
import { useState } from 'react';

export default function Dropdown({ people, className, id, value, onChange }) {
  const [query, setQuery] = useState('');
  const [selected, setSelected] = useState(value);

  const filteredPeople =
    query === ''
      ? people
      : people.filter((person) => {
          return person.name.toLowerCase().includes(query.toLowerCase());
        });

  return (
    <div id={id} className={`cp-mx-auto ${className}`}>
      <Combobox
        immediate
        value={selected}
        onChange={(value) => {
          setSelected(value);
          onChange(value);
        }}
        onClose={() => setQuery('')}
      >
        <div className="cp-relative">
          <ComboboxInput
            className={clsx(
              'cp-w-full cp-rounded-lg cp-border-none cp-py-1.5 cp-pr-8 cp-pl-3 cp-text-sm/6 cp-text-primary-text',
              'cp-focus:outline-none cp-data-[focus]:outline-2 cp-data-[focus]:-outline-offset-2 cp-data-[focus]:outline-white/25'
            )}
            displayValue={(person: any) => person?.name}
            onChange={(event) => setQuery(event.target.value)}
          />
          <ComboboxButton className="cp-group cp-absolute cp-inset-y-0 cp-right-0 cp-px-2.5">
            <ChevronDownIcon className="cp-w-4 cp-h-4 cp-fill-primary-text cp-group-data-[hover]:fill-white" />
          </ComboboxButton>
        </div>

        <ComboboxOptions
          anchor="bottom"
          transition
          className="cp-mt-1 cp-w-[220px] cp-z-10 cp-bg-primary-background cp-text-sm cp-absolute cp-rounded-xl cp-border cp-p-1 cp-transition-ease"
        >
          {filteredPeople.map((person) => (
            <ComboboxOption
              key={person.id}
              value={person}
              className="cp-group cp-w-full cp-p-2 cp-z-10 cp-bg-primary-background cp-flex cp-cursor-pointer cp-items-center cp-gap-2 cp-rounded-lg cp-py-1.5 cp-px-3"
            >
              <div className="cp-text-md cp-text-primary">{person.name}</div>
            </ComboboxOption>
          ))}
        </ComboboxOptions>
      </Combobox>
    </div>
  );
}
