import 'primeicons/primeicons.css';
import 'primereact/resources/themes/saga-blue/theme.css';
import 'primereact/resources/primereact.css';
import 'primeflex/primeflex.css';

import React, { useState, useEffect, useRef } from 'react';
import { Dropdown } from 'primereact/dropdown';
import { MenuTypeService } from '../services/MenuTypeService';
import { TypeOfMeasurementService } from '../services/TypeOfMeasurementService';
import { ProductService } from '../services/ProductService';
import { useDispatch, useSelector } from 'react-redux';

const menuTypeService = new MenuTypeService();
const typeOfMeasurementService = new TypeOfMeasurementService();
const productService = new ProductService();

const RecipesDropdown = (props: any) => {
    const { type, menuType, setMenu, typeOfMeasurement, setMeasurement, product, setProduct, index } = props;
    const connectedUser = useSelector((state: any) => state.userReducer.connectedUser);
    const [menuTypes, setMenuTypes] = useState<any>([]);
    const [selectedMenuTypes, setSelectedMenuTypes] = useState<any>(menuType);
    const [typeOfMeasurements, setTypeOfMeasurements] = useState<any>([]);
    const [selectedTypeOfMeasurement, setSelectedTypeOfMeasurement] = useState<any>(typeOfMeasurement);
    const [selectedProduct, setSelectedProduct] = useState(product);
    const dispatch = useDispatch();
    const products = useSelector((state: any) => state.recipesReducer.products);
    // const [products, setProducts] = useState<any>([]);
    useEffect(() => {
        if (type === 'menu')
            menuTypeService.getMenuTypes().then((res: any) => setMenuTypes(res))
        else if (type === "typeOfMeasurement")
            typeOfMeasurementService.getTypeOfMeasurements().then((res: any) => setTypeOfMeasurements(res))
        // else if (type === "product") {
            
        // }
    }, []);


    const onMenuTypeChange = (e: any) => {
        setSelectedMenuTypes(e.value);
        debugger
        setMenu(e.value);
    }

    const onTypeOfMeasurementChange = (e: any) => {
        console.log(typeOfMeasurement);
        setSelectedTypeOfMeasurement(e.value);
        debugger
        setMeasurement(e.value, index);
    }

    const onProductChange = (e: any) => {
        console.log(product);
        console.log(selectedProduct);
        setSelectedProduct(e.value);
        debugger
        setProduct(e.value, index);
    }
    return (
        type === 'menu' ? (
            <div className="dropdown-demo">
                <div className="card">
                    <Dropdown value={selectedMenuTypes} optionLabel="menuName" options={menuTypes} onChange={onMenuTypeChange} placeholder="סוג תפריט" />
                </div>
            </div>
        ) : type === 'typeOfMeasurement' ? (
            <div className="dropdown-demo">
                <div className="card">
                    <Dropdown value={selectedTypeOfMeasurement} optionLabel="typeOfMeasurement" options={typeOfMeasurements} onChange={onTypeOfMeasurementChange} placeholder="סוג מדידה" />
                </div>
            </div>
        ) : type === 'product' ? (
            <div className="dropdown-demo">
                <div className="card">
                    <Dropdown value={selectedProduct} options={products} onChange={onProductChange} optionLabel="productName" placeholder="בחר מוצר" />
                </div>
            </div>
        ) : null
    );
}

export default RecipesDropdown;