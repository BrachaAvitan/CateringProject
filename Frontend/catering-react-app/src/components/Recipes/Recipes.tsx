import 'primeicons/primeicons.css';
import 'primereact/resources/themes/saga-blue/theme.css';
import 'primereact/resources/primereact.css';
import 'primeflex/primeflex.css';
import '../../index.css';

import React, { useState, useEffect, useRef } from 'react';
import { classNames } from 'primereact/utils';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { ProductService } from '../../services/ProductService';
import { Toast } from 'primereact/toast';
import { Button } from 'primereact/button';
import { InputTextarea } from 'primereact/inputtextarea';
import { InputNumber } from 'primereact/inputnumber';
import { Dialog } from 'primereact/dialog';
import { InputText } from 'primereact/inputtext';
import './Recipes.css'
import { RecipeService } from '../../services/RecipeService';
import { ProductsToRecipeService } from '../../services/ProductsToRecipeService';
import RecipesDropdown from '../RecipesDropdown';
import { useDispatch, useSelector } from 'react-redux';

const Recipes = (props: any) => {

    let emptyRecipe = {
        recipesId: 0,
        name: '',
        quantityOfPortions: 0,
        menuId: 0,
        doseTypeId: 0,
        instructions: '',
        managerId: 0,
        menu: {
            menuId: 0,
            menuName: ''
        },
        doseType: {
            doseTypeId: 0,
            doseName: ''
        }
    };

    let emptyProductToRecipe = {
        recipeId: 0,
        productToRecipeId: 0,
        amountToRecipe: 0,
        productId: 0,
        product: {
            productId: 0,
            productName: '',
            typeOfMeasurement: {
                typeOfMeasurementId: 0,
                typeOfMeasurement: ''
            }
        },
        edit: false,
    };

    const [productDialog, setProductDialog] = useState(false);
    const [deleteProductDialog, setDeleteProductDialog] = useState(false);
    const [deleteProductsDialog, setDeleteProductsDialog] = useState(false);
    const [selectedProducts, setSelectedProducts] = useState<any>(null);
    const [submitted, setSubmitted] = useState(false);
    const [globalFilter, setGlobalFilter] = useState(null);
    const toast = useRef<any>(null);
    const dt = useRef<any>(null);
    const productService = new ProductService();
    const recipeService = new RecipeService();
    const productsToRecipeService = new ProductsToRecipeService();
    const [recipe, setRecipe] = useState(emptyRecipe);
    const [productsToRecipe, setProductsToRecipe] = useState<any>(null);
    const [productToRecipe, setProductToRecipe] = useState<any>(emptyProductToRecipe);
    const [measurement, setMeasurement] = useState<any>(null);
    const [menu, setMenu] = useState<any>(null);
    const [productName, setProductName] = useState<any>(null);
    const [doseType, setDoseType] = useState<any>(null);
    const connectedUser = useSelector((state: any) => state.userReducer.connectedUser);
    const [numOfProductsToRecipe, setNumOfProductsToRecipe] = useState<number>(0);
    const dispatch = useDispatch();
    const products = useSelector((state: any) => state.recipesReducer.products);
    const recipes = useSelector((state: any) => state.recipesReducer.recipes);

    useEffect(() => {
        console.log('recipes reload');
        if (!recipes.length)
            recipeService.getRecipes(connectedUser.managerId).then((data: any) => dispatch({ type: 'SET_RECIPES', payload: data }))
    }, []);

    const openNew = () => {
        setProductsToRecipe([]);
        console.log(numOfProductsToRecipe);
        setNumOfProductsToRecipe(0);
        setRecipe(emptyRecipe);
        setProductToRecipe(emptyProductToRecipe);
        setSubmitted(false);
        setProductDialog(true);
    }

    const hideDialog = () => {
        setSubmitted(false);
        setProductDialog(false);
    }

    const hideDeleteProductDialog = () => {
        setDeleteProductDialog(false);
    }

    const hideDeleteProductsDialog = () => {
        setDeleteProductsDialog(false);
    }

    const saveProduct = async () => {
        setSubmitted(true);

        if (recipe.name.trim()) {
            let _recipes = [...recipes];
            let _recipe = { ...recipe };
            let _productsToRecipe = [...productsToRecipe];

            if (recipe.recipesId) {
                const index = findIndexById(recipe.recipesId);
                _recipes[index] = _recipe;
                //update recipe
                recipeService.updateRecipe(_recipe);
                //Insert productToRecipe or Update productToRecipe
                _productsToRecipe.map((product: any, indexProduct: number) => {
                    if (product.edit && indexProduct < numOfProductsToRecipe) {
                        productsToRecipeService.updateProductToRecipe(product);
                    }
                    if (indexProduct >= numOfProductsToRecipe && product.edit && product.amountToRecipe > 0 && product.product) {
                        let productInsert = {
                            AmountToRecipe: product.amountToRecipe,
                            ProductId: product.productId,
                            RecipesId: _recipe.recipesId
                        }
                        productsToRecipeService.insertProductToRecipe(productInsert);
                    }
                    if (indexProduct >= numOfProductsToRecipe && !product.edit && product.amountToRecipe > 0 && product.product)
                        _productsToRecipe.splice(indexProduct, 1);
                });
                toast.current.show({ severity: 'success', summary: 'בוצע בהצלחה', detail: 'המתכון עודכן', life: 3000 });
            }
            else {
                let rInsert = {
                    Name: _recipe.name,
                    QuantityOfPortions: _recipe.quantityOfPortions,
                    MenuId: _recipe.menuId,
                    DoseTypeId: _recipe.doseTypeId,
                    Instructions: _recipe.instructions,
                    ManagerId: connectedUser.managerId
                }
                //add recipe
                let recipeId: any = await recipeService.insertRecipe(rInsert);
                if (recipeId) {
                    debugger
                    //add productsToRecipe
                    _productsToRecipe.map((product: any, indexProduct: number) => {
                        if (product.amountToRecipe > 0 && product.product) {
                            debugger
                            let productInsert = {
                                AmountToRecipe: product.amountToRecipe,
                                ProductId: product.productId,
                                RecipesId: recipeId
                            }
                            productsToRecipeService.insertProductToRecipe(productInsert);
                            product.recipeId = recipeId;
                        }
                        else
                            _productsToRecipe.splice(indexProduct, 1);
                    });
                    _recipe.recipesId = recipeId;
                    debugger
                    _recipe.managerId = connectedUser.managerId;
                    _recipes.push(_recipe);
                    console.log(_recipes);
                    toast.current.show({ severity: 'success', summary: 'בוצע בהצלחה', detail: 'המתכון נוסף', life: 3000 });
                }
            }
            console.log(_recipes);
            setProductsToRecipe(_productsToRecipe);
            dispatch({ type: 'SET_RECIPES', payload: _recipes });
            setProductDialog(false);
            setRecipe(emptyRecipe);
            console.log(recipes);
        }
    }

    //עריכת מתכון
    const editProduct = (recipe: any) => {
        productsToRecipeService.getProductsToRecipe(recipe.recipesId, connectedUser.managerId).then((data: any) => { setProductsToRecipe(data); setNumOfProductsToRecipe(data.length) });
        setRecipe({ ...recipe });
        setProductDialog(true);
    }

    //הוספת מוצר למתכון
    const confirmAddProductToRecipe = () => {
        let _productsToRecipe = [...productsToRecipe];
        _productsToRecipe.push(emptyProductToRecipe);
        setProductsToRecipe(_productsToRecipe);
    }
    //מחיקת מוצר למתכון
    const confirmDeleteProductToRecipe = (e: any, index: number) => {
        let _productsToRecipe = [...productsToRecipe];
        if (index < numOfProductsToRecipe)
            productsToRecipeService.deleteProductToRecipe(_productsToRecipe[index].productToRecipeId, connectedUser.managerId);
        _productsToRecipe.splice(index, 1);
        setProductsToRecipe(_productsToRecipe);
    }
    //מחיקת מתכון-הצגת הודעת אזהרה
    const confirmDeleteProduct = (recipe: any) => {
        setRecipe(recipe);
        productsToRecipeService.getProductsToRecipe(recipe.recipesId, connectedUser.managerId).then((data: any) => { setProductsToRecipe(data); });
        setDeleteProductDialog(true);
    }
    //מחיקת מתכון והמוצרים למתכון אם קיים
    const deleteProduct = () => {
        let _recipes = recipes.filter((val: any) => val.recipesId !== recipe.recipesId);
        dispatch({ type: 'SET_RECIPES', payload: _recipes });
        //קודם מחיקת מוצרים להזמנה ואז אפשר למחוק את המתכון!!
        let _productsToRecipe = [...productsToRecipe];
        _productsToRecipe.map((product: any) => {
            productsToRecipeService.deleteProductToRecipe(product.productToRecipeId, connectedUser.managerId);
        });
        //מחיקת מתכון
        recipeService.deleteRecipe(recipe.recipesId, connectedUser.managerId);
        setProductsToRecipe([]);
        setDeleteProductDialog(false);
        setRecipe(emptyRecipe);
        toast.current.show({ severity: 'success', summary: 'בוצע בהצלחה', detail: 'המתכון נמחק', life: 3000 });
    }

    const findIndexById = (id: number) => {
        let index = -1;
        for (let i = 0; i < recipes.length; i++) {
            if (recipes[i].recipesId === id) {
                index = i;
                break;
            }
        }
        return index;
    }

    //מחיקת מתכונים מודגשים-הצגת הודעת אזהרה
    const confirmDeleteSelected = () => {
        debugger
        setDeleteProductsDialog(true);
    }
    //מחיקת המתכונים המסומנים
    const deleteSelectedProducts = () => {
        debugger
        let _recipes = recipes.filter((val: any) => !selectedProducts.includes(val));
        dispatch({ type: 'SET_RECIPES', payload: _recipes });
        // setRecipes(_recipes);
        setDeleteProductsDialog(false);
        //מחיקת המתכונים שמסומנים
        setSelectedProducts(null);
        toast.current.show({ severity: 'success', summary: 'בוצע בהצלחה', detail: 'המתכון נמחק', life: 3000 });
    }

    const onInputChange = (e: any, name: any) => {
        const val = (e.target && e.target.value) || '';
        let _recipe: any = { ...recipe };
        _recipe[`${name}`] = val;

        setRecipe(_recipe);
    }

    const onInputNumberChange = (e: any, name: any) => {
        const val = (e.target && e.target.value) || 0;
        let _recipe: any = { ...recipe };
        _recipe[`${name}`] = val;

        setRecipe(_recipe);
    }

    const OnChangeMenu = (menu: any) => {
        let _recipe: any = { ...recipe };
        _recipe.menuId = menu.menuId;
        _recipe.menu.menuId = menu.menuId;
        _recipe.menu.menuName = menu.menuName;
        setMenu(menu);
        setRecipe(_recipe);
    }

    const OnChangeDoseType = (doseType: any) => {
        let _recipe: any = { ...recipe };
        _recipe.doseTypeId = doseType.doseTypeId;
        _recipe.doseType.doseTypeId = doseType.doseTypeId;
        _recipe.doseType.doseName = doseType.doseName;
        setDoseType(doseType);
        setRecipe(_recipe);
    }

    const OnChangeMeasurement = (measurement: any, index: number) => {
        debugger
        let _productToRecipe: any = { ...productToRecipe };
        _productToRecipe.product.typeOfMeasurementId = measurement.typeOfMeasurementId;
        _productToRecipe.product.typeOfMeasurement = measurement.typeOfMeasurement;
        setMeasurement(measurement);
        setProductToRecipe(_productToRecipe);
    }

    const onChangeProduct = (product: any, index: number) => {
        //כששומרים את המתכון לעבור גם על המוצרים למתכון ולעשות שמירה של המוצר וכו עשיתי את זההההה
        setProductName(product);
        let _productsToRecipe: any = [...productsToRecipe];
        _productsToRecipe[index].product = product;
        _productsToRecipe[index].productId = product.productId;
        _productsToRecipe[index].typeOfMeasurementId = product.typeOfMeasurementId;
        _productsToRecipe[index].edit = true;
        setProductToRecipe(_productsToRecipe);
    }

    const onInputAmountToRecipeChange = (e: any, index: number) => {
        const val = (e.target && e.target.value) || 0;
        let _productsToRecipe: any = [...productsToRecipe];
        _productsToRecipe[index].amountToRecipe = val;
        _productsToRecipe[index].edit = true;
        setProductsToRecipe(_productsToRecipe);
    }

    const actionBodyTemplate = (rowData: any) => {
        return (
            <React.Fragment>
                <div className="p-edit">
                    <Button icon="pi pi-pencil" className="p-button-rounded p-button-success p-mr-2" onClick={() => editProduct(rowData)} />
                    <Button icon="pi pi-trash" className="p-button-rounded p-button-warning" onClick={() => confirmDeleteProduct(rowData)} />
                </div>
            </React.Fragment>
        );
    }

    const header = (
        <div className="table-header">
            <>
                <h5 className="p-mx-0 p-my-1">ניהול מתכונים</h5>
                <span className="p-input-icon-left">
                    <i className="pi pi-search" />
                    <InputText type="search" onInput={(e: any) => setGlobalFilter(e.target.value)} placeholder="חיפוש..." />
                </span>
            </>
            <div>
                <Button label="מתכון חדש" icon="pi pi-plus" className="p-button-success p-mr-2" onClick={openNew} />
                <Button label="מחק" icon="pi pi-trash" className="p-button-danger" onClick={confirmDeleteSelected} disabled={!selectedProducts || !selectedProducts.length} />
            </div>
        </div>
    );
    const productDialogFooter = (
        <div style={{ textAlign: 'left' }}>
            <Button label="ביטול" icon="pi pi-times" className="p-button-text" onClick={hideDialog} />
            <Button label="שמור" icon="pi pi-check" className="p-button-text" onClick={saveProduct} />
        </div>
    );
    const deleteProductDialogFooter = (
        <div style={{ textAlign: 'left' }}>
            <Button label="לא" icon="pi pi-times" className="p-button-text" onClick={hideDeleteProductDialog} />
            <Button label="כן" icon="pi pi-check" className="p-button-text" onClick={deleteProduct} />
        </div>
    );
    const deleteProductsDialogFooter = (
        <div style={{ textAlign: 'left' }}>
            <Button label="לא" icon="pi pi-times" className="p-button-text" onClick={hideDeleteProductsDialog} />
            <Button label="כן" icon="pi pi-check" className="p-button-text" onClick={deleteSelectedProducts} />
        </div>
    );

    return (
        <div className="datatable-crud-demo">
            <Toast ref={toast} />
            <div className="card">
                <DataTable ref={dt} value={recipes} alwaysShowPaginator={false} emptyMessage={<div>לא נמצאו מתכונים הכנס מתכון...🤓</div>} selection={selectedProducts} onSelectionChange={(e) => { debugger; setSelectedProducts(e.value) }}
                    dataKey="recipesId" paginator rows={10} rowsPerPageOptions={[5, 10, 25]}
                    paginatorTemplate="FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink CurrentPageReport RowsPerPageDropdown"
                    currentPageReportTemplate="מציג {last} - {first} מתוך {totalRecords} מתכונים"
                    globalFilter={globalFilter} header={header} responsiveLayout="scroll">
                    <Column selectionMode="multiple" headerStyle={{ width: '3rem' }} exportable={false}></Column>
                    <Column field="name" header="שם מתכון" sortable style={{ minWidth: '10rem' }}></Column>
                    <Column field="quantityOfPortions" header="מספר מנות" sortable style={{ minWidth: '10rem', textAlign: 'right !important' }}></Column>
                    <Column field="menu.menuName" header="סוג תפריט" sortable style={{ minWidth: '10rem', textAlign: 'right !important' }}></Column>
                    <Column field="doseType.doseName" header="סוג מנה" sortable style={{ minWidth: '10rem', textAlign: 'right !important' }}></Column>
                    <Column body={actionBodyTemplate} exportable={false} style={{ minWidth: '8rem' }}></Column>
                </DataTable>
            </div>

            <Dialog visible={productDialog} style={{ width: '450px' }} header="פרטי מתכון" modal className="p-fluid" footer={productDialogFooter} onHide={hideDialog}>

                <div className="p-field">
                    <label htmlFor="name">שם מתכון</label>
                    <InputText id="name" value={recipe.name} onChange={(e) => onInputChange(e, 'name')} required autoFocus className={classNames({ 'p-invalid': submitted && !recipe.name })} />
                    {submitted && !recipe.name && <small className="p-error">שם מתכון חובה.</small>}
                </div>
                <div className="p-field">
                    <label htmlFor="quantityOfPortions">מספר מנות</label>
                    <InputNumber id="quantityOfPortions" value={recipe.quantityOfPortions} onValueChange={(e) => onInputNumberChange(e, 'quantityOfPortions')} />
                </div>
                <div className="p-formgrid p-grid">
                    <div className="p-field p-col">
                        <label htmlFor="menu">סוג תפריט</label>
                        <RecipesDropdown id="menu" type="menu" menuType={recipe.menu} setMenu={OnChangeMenu} />
                    </div>
                    <div className="p-field p-col">
                        <label htmlFor="doseType">סוג מנה</label>
                        <RecipesDropdown id="doseType" type="doseType" doseType={recipe.doseType} setDoseType={OnChangeDoseType} />
                    </div>
                </div>
                <label htmlFor="">החומרים למתכון:  </label>
                <Button icon="pi pi-plus" className="p-button-rounded p-button-warning" onClick={() => confirmAddProductToRecipe()} />
                {
                    productsToRecipe && productsToRecipe.map((productToRecipe: any, index: number) => {
                        return (
                            <div className="p-formgrid p-grid" key={productToRecipe.productToRecipeId}>
                                <div className="p-field p-col-2">
                                    <Button icon="pi pi-trash" className="p-button-rounded p-button-warning" onClick={(e) => confirmDeleteProductToRecipe(e, index)} />
                                </div>
                                <div className="p-field p-col-2">
                                    <InputNumber id="amountToRecipe" value={productToRecipe.amountToRecipe} onValueChange={(e) => onInputAmountToRecipeChange(e, index)} />
                                </div>
                                <div className="p-field p-col-2">
                                    <label htmlFor="typeOfMeasurement">{productToRecipe.product.typeOfMeasurement.typeOfMeasurement}</label>
                                </div>
                                <div className="p-field p-col">
                                    <RecipesDropdown id="productName" type="product" product={productToRecipe.product} setProduct={(product: any, index: number) => onChangeProduct(product, index)} index={index} />
                                </div>
                            </div>
                        )
                    })
                }
                <div className="p-field">
                    <label htmlFor="instructions">הוראות הכנה</label>
                    <InputTextarea id="instructions" value={recipe.instructions} onChange={(e) => onInputChange(e, 'instructions')} required rows={3} cols={20} />
                </div>
            </Dialog>

            <Dialog visible={deleteProductDialog} style={{ width: '450px' }} header="לאשר" modal footer={deleteProductDialogFooter} onHide={hideDeleteProductDialog}>
                <div className="confirmation-content">
                    <i className="pi pi-exclamation-triangle p-mr-3" style={{ fontSize: '2rem' }} />
                    {recipe && <span>  האם אתה בטוח שברצונך למחוק את המתכון  <br /><b>{recipe.name}</b>?</span>}
                </div>
            </Dialog>

            <Dialog visible={deleteProductsDialog} style={{ width: '450px' }} header="לאשר" modal footer={deleteProductsDialogFooter} onHide={hideDeleteProductsDialog}>
                <div className="confirmation-content">
                    <i className="pi pi-exclamation-triangle p-mr-3" style={{ fontSize: '2rem' }} />
                    {recipe && <span>  האם אתה בטוח שברצונך למחוק את המתכונים שנבחרו?</span>}
                </div>
            </Dialog>
        </div>
    );
}

export default Recipes;