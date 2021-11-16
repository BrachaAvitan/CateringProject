import 'primeicons/primeicons.css';
import 'primereact/resources/themes/saga-blue/theme.css';
import 'primereact/resources/primereact.css';
import 'primeflex/primeflex.css';

import React, { useState, useEffect, useRef } from 'react';
import { Dropdown } from 'primereact/dropdown';
import { MenuTypeService } from '../services/MenuTypeService';

const menuTypeService = new MenuTypeService();

const RecipesDropdown = (props: any) => {
    const [menuTypes, setMenuTypes] = useState<any>([]);
    const {menuType ,setMenu} = props;
    const [selectedMenuTypes, setSelectedMenuTypes] = useState(menuType);

    useEffect(() => {
        menuTypeService.getMenuTypes().then((res:any) => setMenuTypes(res));
    },[]);


    const onMenuTypeChange = (e: any) => {
        setSelectedMenuTypes(e.value);
        setMenu(e.value);
    }

    return (
        <div className="dropdown-demo">
            <div className="card">
                <Dropdown value={selectedMenuTypes} optionLabel="menuName" optionValue="menuId" options={menuTypes} onChange={onMenuTypeChange} placeholder="סוג תפריט"/>
            </div>
        </div>
    );
}

export default RecipesDropdown;