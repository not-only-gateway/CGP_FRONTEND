import React from 'react'
import {Accordion, AccordionSummary, Dropdown, DropdownOption, DropdownOptions} from "@f-ui/core";

export default function Test() {
    const o = {
        label: 'TESTE',
        onClick: () => null,

    }
    return (
        <div style={{width: '100vw', height: 'calc(100vh - 45px)', position: 'relative'}}>
            <Dropdown styles={{position: 'absolute', top: 0, left: 0}}>
                TOP LEFT
                <DropdownOptions>
                    <DropdownOption option={o}/>
                    <DropdownOption option={o}/>
                    <DropdownOption option={o}/>
                    <DropdownOption option={o}/>
                    <DropdownOption option={o}/>
                    <DropdownOption option={o}/>
                </DropdownOptions>
            </Dropdown>




            <Dropdown styles={{position: 'absolute', bottom: 0, left: 0}}>
                BOTTOM LEFT
                <DropdownOptions>
                    <DropdownOption option={o}/>
                    <DropdownOption option={o}/>
                    <DropdownOption option={o}/>
                    <DropdownOption option={o}/>
                    <DropdownOption option={o}/>
                    <DropdownOption option={o}/>
                </DropdownOptions>
            </Dropdown>


            <Dropdown styles={{position: 'absolute', top: 0, right: 0}}>
                TOP RIGHT
                <DropdownOptions>
                    <DropdownOption option={o}/>
                    <DropdownOption option={o}/>
                    <DropdownOption option={o}/>
                    <DropdownOption option={o}/>
                    <DropdownOption option={o}/>
                    <DropdownOption option={o}/>
                </DropdownOptions>
            </Dropdown>

            <Dropdown styles={{position: 'absolute', bottom: 0, right: 0}}>
                BOTTOM RIGHT
                <DropdownOptions>
                    <DropdownOption option={o}/>
                    <DropdownOption option={o}/>
                    <DropdownOption option={o}/>
                    <DropdownOption option={o}/>
                    <DropdownOption option={o}/>
                    <DropdownOption option={o}/>
                </DropdownOptions>
            </Dropdown>
        </div>
    )
}