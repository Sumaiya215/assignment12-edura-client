import {
 Dialog, 
 DialogPanel,
 DialogTitle,
 Listbox,
 ListboxButton, 
 ListboxOption,
 ListboxOptions, 
 Transition, 
 TransitionChild } from "@headlessui/react";
import { Fragment, useState } from "react";
import { AiOutlineDown } from "react-icons/ai";
import { BsCheckLg } from "react-icons/bs";

const roles =['Student', 'Tutor','Admin']
const UpdateUserModal = ({role, updateRole, isOpen, setIsOpen}) => {
    const [selected, setSelected] = useState(role);
    console.log(selected);

    return (
        <Transition appear show={isOpen} as={Fragment}>
            <Dialog 
             as='div'
             className='relative z-10'
             onClose={() => setIsOpen(false)}
            >
            <TransitionChild 
             as={Fragment}
             enter='ease-out duration-200'
             enterFrom="opacity-0"
             enterTo="opacity-100"
             leave='ease-in duration-100'
             leaveFrom="opacity-100"
             leaveTo="opacity-0"
            >
            <div className="fixed inset-0 bg-black bg-opacity-25"></div>
            </TransitionChild>

            <div className="fixed inset-0 overflow-y-auto">
              <div className="flex min-h-full items-center justify-center p-4 text-center">
                <TransitionChild 
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0 scale-95"
                enterTo="opacity-100 scale-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 scale-100"
                leaveTo="opacity-0 scale-95">
                <DialogPanel className="w-full h-56 max-w-md transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all">
                    <DialogTitle 
                    as='h3'
                    className='text-lg font-medium text-center leading-6 text-gray-800'>
                        Update User Role
                    </DialogTitle>
                    <div className="mt-4 w-full">
                        <Listbox value={selected} onChange={setSelected}>
                            <div className="relative mt-1">
                                <ListboxButton className="relative w-full cursor-default rounded-lg bg-white py-2 pl-3 pr-10text-left shadow-md sm:text-sm">
                                    <span className="block truncate">{selected}</span>
                                    <span className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2">
                                    <AiOutlineDown className="h-5 w-5 text-gray-400" aria-hidden='true'/></span>
                                </ListboxButton>
                            <Transition 
                            as={Fragment}
                            leave="transition ease-in duration-100"
                            leaveFrom="opacity-100"
                            leaveTo="opacity-0"
                            >
                            <ListboxOptions className='absolute mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg sm:text-sm '>
                                {
                                    roles.map((role, Index) =>(
                                        <ListboxOption key={Index}
                                        className="relative cursor-default select-none py-2 pl-10 pr-4 text-gray-800 " 
                                        value={role}>
                                            {({selected}) =>(
                                                
                                                <> 
                                                <span className={`block truncate ${
                                                    selected? 'font-medium': 'font-normal'
                                                }`}>
                                                    {role}
                                                </span>
                                                {
                                                    selected?(
                                                        <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-green-600">
                                                            <BsCheckLg
                                                            className='h-4 w-4'
                                                            aria-hidden='true' />
                                                        </span>
                                                    ): null}
                                                </>
                                            )}
                                        </ListboxOption>
                                    ))}
                            </ListboxOptions>
                            </Transition>
                            </div>
                        </Listbox>
                    </div>
                    <hr className="mt-14" />
                    <div className="flex mt-2 justify-center gap-5 ">
                        <button onClick={() => updateRole(selected)}
                          type="button" className="inline-flex justify-center rounded-md border border-transparent px-4 py-2 text-sm font-medium "  
                         >
                            Update
                        </button>
                        <button 
                        type="button"
                        className="inline-flex justify-center rounded-md border border-transparent px-4 py-2 text-sm font-medium "
                          onClick={() => setIsOpen(false)}>
                          Cancel
                        </button>
                    </div>
                </DialogPanel>
                </TransitionChild>
                </div>
            </div>
            </Dialog>
        </Transition>   
    );
};

export default UpdateUserModal;