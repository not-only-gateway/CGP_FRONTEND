import React, {useEffect, useState} from 'react'
import {Accordion, AccordionSummary, Dropdown, DropdownOption, DropdownOptions, Tab, VerticalTabs} from "../fabric/src/index";
import styles from '../styles/Home.module.css'
import CollaboratorList from "../components/lists/CollaboratorList";
import VacancyList from "../components/lists/VacancyList";
import UnitList from "../components/lists/UnitList";
import SimpleList from "../components/lists/SimpleList";
import CommissionedList from "../components/lists/CommissionedList";
import EffectiveList from "../components/lists/EffectiveList";
import {useRouter} from "next/router";

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

         <Accordion contentStyles={{display: 'flex'}}>
             <AccordionSummary>
                 TESTE
             </AccordionSummary>
             <Dropdown>
                 ACCORDION DROPDOWN
                 <DropdownOptions>
                     <DropdownOption option={o}/>
                     <DropdownOption option={o}/>
                     <DropdownOption option={o}/>
                     <DropdownOption option={o}/>
                     <DropdownOption option={o}/>
                     <DropdownOption option={o}/>
                 </DropdownOptions>
             </Dropdown>
             <Dropdown>
                 ACCORDION DROPDOWN
                 <DropdownOptions>
                     <DropdownOption option={o}/>
                     <DropdownOption option={o}/>
                     <DropdownOption option={o}/>
                     <DropdownOption option={o}/>
                     <DropdownOption option={o}/>
                     <DropdownOption option={o}/>
                 </DropdownOptions>
             </Dropdown>
             <Dropdown>
                 ACCORDION DROPDOWN
                 <DropdownOptions>
                     <DropdownOption option={o}/>
                     <DropdownOption option={o}/>
                     <DropdownOption option={o}/>
                     <DropdownOption option={o}/>
                     <DropdownOption option={o}/>
                     <DropdownOption option={o}/>
                 </DropdownOptions>
             </Dropdown>
             <Dropdown>
                 ACCORDION DROPDOWN
                 <DropdownOptions>
                     <DropdownOption option={o}/>
                     <DropdownOption option={o}/>
                     <DropdownOption option={o}/>
                     <DropdownOption option={o}/>
                     <DropdownOption option={o}/>
                     <DropdownOption option={o}/>
                 </DropdownOptions>
             </Dropdown>
         </Accordion>

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
