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
import { DoseTypeService } from '../services/DoseTypeService';
import { RecipeService } from '../services/RecipeService';
import { CategoryService } from '../services/CategoryService';

const menuTypeService = new MenuTypeService();
const typeOfMeasurementService = new TypeOfMeasurementService();
const productService = new ProductService();
const doseTypeService = new DoseTypeService();
const recipeService = new RecipeService();
const categoryService = new CategoryService();

const RecipesDropdown = (props: any) => {
    const { type, menuType, setMenu, typeOfMeasurement, setMeasurement, product, setProduct, index,
    doseType, setDoseType , eventMenu, recipesOfDoseType, category, setCategory} = props;
    const [selectedMenuTypes, setSelectedMenuTypes] = useState<any>(menuType);
    const [typeOfMeasurements, setTypeOfMeasurements] = useState<any>([]);
    const [selectedTypeOfMeasurement, setSelectedTypeOfMeasurement] = useState<any>(typeOfMeasurement);
    const [selectedProduct, setSelectedProduct] = useState(product);
    const [selectedDoseType, setSelectedDoseType] = useState(doseType);
    const [selectedEventMenu, setSelectedEventMenu] = useState(eventMenu);
    const [categories, setCategories] = useState<any>([]);
    const [selectedCategory, setSelectedCategory] = useState<any>(typeOfMeasurement);
    const connectedUser = useSelector((state: any) => state.userReducer.connectedUser);
    const dispatch = useDispatch();
    const products = useSelector((state: any) => state.recipesReducer.products);
    const doseTypes = useSelector((state: any) => state.recipesReducer.doseTypes);
    const menuTypes = useSelector((state: any) => state.recipesReducer.menuTypes);
    // const [products, setProducts] = useState<any>([]);
    useEffect(() => {
        if (type === 'menu'){
            if(!menuTypes.length)
               menuTypeService.getMenuTypes().then((res: any) => dispatch({type: 'SET_MENU_TYPES', payload: res}));
        }
        else if (type === "typeOfMeasurement")
            typeOfMeasurementService.getTypeOfMeasurements().then((res: any) => setTypeOfMeasurements(res))
        else if (type === "doseType") {
            if (!doseTypes.length)
                doseTypeService.getDoseTypes().then((res: any) => dispatch({ type: 'SET_DOSE_TYPES', payload: res }));
        }
        else if (type === "category")
                categoryService.getCateories().then((res:any) => setCategories(res));
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

    const onDoseTypeChange = (e: any) => {
        console.log(doseTypes);
        console.log(selectedDoseType);
        setSelectedDoseType(e.value);
        setDoseType(e.value);
    }
    const onRecipesOfDoseTypeChange = (e: any)=>{
       setSelectedEventMenu(e.value);
    }

    const onCategoryChange = (e: any) =>{
        setSelectedCategory(e.value);
        setCategory(e.value);
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
        ) : type === 'doseType' ? (
            <div className="dropdown-demo">
                <div className="card">
                    <Dropdown value={selectedDoseType} options={doseTypes} onChange={onDoseTypeChange} optionLabel="doseName" placeholder="בחר סוג מנה" />
                </div>
            </div>
        ) : type === 'eventMenu' ? (
            <div className="dropdown-demo">
                <div className="card">
                    <Dropdown value={selectedEventMenu} options={recipesOfDoseType} onChange={onRecipesOfDoseTypeChange} optionLabel="name" placeholder="סוגי מאכלים" />
                </div>
            </div>
        ) : type === 'category' ? (
            <div className="dropdown-demo">
                <div className="card">
                    <Dropdown value={selectedCategory} options={categories} onChange={onCategoryChange} optionLabel="categoryName" placeholder="בחר קטגוריה" />
                </div>
            </div>
        ) : null
    );
}

export default RecipesDropdown;