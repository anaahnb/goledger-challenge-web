import React, { Fragment } from 'react';
import { Menu, Transition } from '@headlessui/react';
import { ChevronDownIcon } from '@heroicons/react/20/solid';

interface DropdownButtonProps {
  options: { label: string; onClick?: () => void }[]; // Opções do dropdown
  buttonText: string; // Texto do botão
}

export default function DropdownButton({ options, buttonText }: DropdownButtonProps) {
  return (
    <Menu as={Fragment}>
      <div className="relative inline-block text-left">
        <div>
          <Menu.Button className="inline-flex w-full justify-center items-center gap-x-1.5 bg-orange-700 text-neutral-100 rounded-sm px-5 py-4 text-lg font-medium shadow-sm focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-orange-600">
            {buttonText}
            <ChevronDownIcon className="-mr-1 h-5 w-5 text-neutral-100" aria-hidden="true" />
          </Menu.Button>
        </div>

        <Transition
          as={Fragment}
          enter="transition ease-out duration-100"
          enterFrom="transform opacity-0 scale-95"
          enterTo="transform opacity-100 scale-100"
          leave="transition ease-in duration-75"
          leaveFrom="transform opacity-100 scale-100"
          leaveTo="transform opacity-0 scale-95"
        >
          <Menu.Items className="absolute right-0 z-10 mt-2 w-56 origin-top-right rounded-md bg-neutral-200 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
            <div className="py-1">
              {options.map((option, index) => (
                <Menu.Item>
                  {({ active }: { active: boolean }) => (
                    <button
                      onClick={option.onClick}
                      className={`${
                        active ? 'bg-gray-100 text-gray-900' : 'text-gray-700'
                      } block w-full px-4 py-2 text-left text-sm`}
                    >
                      {option.label}
                    </button>
                  )}
                </Menu.Item>
              
              ))}
            </div>
          </Menu.Items>
        </Transition>
      </div>
    </Menu>
  );
}
