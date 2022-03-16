

import React, { useState } from 'react';
import { Listbox } from "@headlessui/react";
import { FaChevronDown } from 'react-icons/fa';

export interface DropDownOption {
  id: string,
  displayKey: string;
}

interface DropDownProps {
  options: DropDownOption[];
  selectedOption: DropDownOption;
  onChange: (option: DropDownOption) => void;
}

const DropDown: React.FC<DropDownProps> = ({ options, selectedOption, onChange }) => {

  const baseStyle = "p-2 focus:outline-none"

  return (
    <div className="">
      <Listbox value={selectedOption} onChange={onChange}>
        {({ open }) => (
          <>
            <div className="relative mt-1">
              <Listbox.Button className="flex flex-row py-2 pl-3 pr-3 w-48 text-sm text-gray-800 text-left bg-gray-100 border border-gray-200 rounded-md focus:outline-none">
                <span>{selectedOption.displayKey}</span>
                <FaChevronDown className="text-gray-700 my-auto ml-auto h-5" />
              </Listbox.Button>
              <Listbox.Options className="absolute py-1 mt-1 w-48 overflow-auto text-sm bg-white rounded-md shadow-lg max-h-60 ring-1 ring-black ring-opacity-5 focus:outline-none">
                {options.map((option) => (
                  <Listbox.Option
                    key={option.id} value={option}>
                    {({ active, selected }) => (
                      <li
                        className={`${baseStyle} ${active ? "bg-gray-200" : "bg-white text-black"
                          }`}
                      >
                        {option.displayKey}
                      </li>
                    )}
                  </Listbox.Option>
                ))}
              </Listbox.Options>
            </div>
          </>
        )}
      </Listbox>
    </div>
  )
}

export default DropDown;