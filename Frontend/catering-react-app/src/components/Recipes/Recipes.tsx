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
// import { FileUpload } from 'primereact/fileupload';
// import { Rating } from 'primereact/rating';
// import { Toolbar } from 'primereact/toolbar';
import { InputTextarea } from 'primereact/inputtextarea';
// import { RadioButton } from 'primereact/radiobutton';
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
        amountToRecipe : 0,
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

    //const [products, setProducts] = useState<any>(null);
    const [productDialog, setProductDialog] = useState(false);
    const [deleteProductDialog, setDeleteProductDialog] = useState(false);
    const [deleteProductsDialog, setDeleteProductsDialog] = useState(false);
    // const [product, setProduct] = useState(emptyProduct);
    const [selectedProducts, setSelectedProducts] = useState<any>(null);
    const [submitted, setSubmitted] = useState(false);
    const [globalFilter, setGlobalFilter] = useState(null);
    const toast = useRef<any>(null);
    const dt = useRef<any>(null);
    const productService = new ProductService();
    const recipeService = new RecipeService();
    const productsToRecipeService = new ProductsToRecipeService();
    const [recipes, setRecipes] = useState<any>(null);
    const [recipe, setRecipe] = useState(emptyRecipe);
    const [productsToRecipe, setProductsToRecipe] = useState<any>(null);
    const [productToRecipe, setProductToRecipe] = useState<any>(emptyProductToRecipe);
    const [measurement, setMeasurement] = useState<any>(null);
    const [menu, setMenu] = useState<any>(null);
    const [productName, setProductName] = useState<any>(null);
    const [doseType, setDoseType] = useState<any>(null);
    const connectedUser = useSelector((state: any) => state.userReducer.connectedUser);
    const [amountToRecipe, setAmountToRecipe] = useState<any>(0);
    const [edit, setEdit] = useState(false);
    const [productsToRecipeUpdate, setProductsToRecipeUpdate]  = useState<any>(null);
    const [numOfProductsToRecipe, setNumOfProductsToRecipe] = useState<number>(0);
    const [recipe1, setRecipe1] = useState<any>(null);
    const dispatch = useDispatch();
    const products = useSelector((state: any) => state.recipesReducer.products);

    useEffect(() => {
        console.log('recipes reload');
        //productService.getProducts().then(data => setProducts(data));
        recipeService.getRecipes(connectedUser.managerId).then(data => setRecipes(data));
    }, []); // eslint-disable-line react-hooks/exhaustive-deps

    // const formatCurrency = (value:any) => {
    //     return value.toLocaleString('en-US', { style: 'currency', currency: 'USD' });
    // }

    const openNew = () => {
        setProductsToRecipe([]);
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

            console.log(_recipe);
            // let rUpdate = {
            //     RecipesId: _recipe.recipesId,
            //     Name: _recipe.name,
            //     QuantityOfPortions: _recipe.quantityOfPortions,
            //     MenuId: menu.menuId,
            //     DoseTypeId:1,
            //     Instructions:_recipe.instructions,
            //     ManagerId: connectedUser.managerId,
            //     Menu: menu
            // }
            if (recipe.recipesId) {
                const index = findIndexById(recipe.recipesId);
                console.log(_recipe);
                _recipes[index] = _recipe;
                //update recipe
                debugger
                recipeService.updateRecipe(_recipe);
                _productsToRecipe.map((product:any, indexProduct:number)=>{
                    debugger
                    if(product.edit && indexProduct<numOfProductsToRecipe){
                        debugger
                        productsToRecipeService.updateProductToRecipe(product);
                    }
                    else if(indexProduct>=numOfProductsToRecipe && product.edit && product.amountToRecipe>0 && product.product){
                        let productInsert = {
                            AmountToRecipe: product.amountToRecipe,
                            ProductId: product.productId,
                            RecipesId: _recipe.recipesId
                        }
                        productsToRecipeService.insertProductToRecipe(productInsert);
                    }
                    else
                       _productsToRecipe.splice(indexProduct,1);
                });
                toast.current.show({ severity: 'success', summary: 'Successful', detail: 'Recipe Updated', life: 3000 });
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
                debugger
                if(recipeId){
                    debugger
                //add productsToRecipe
                _productsToRecipe.map((product:any, indexProduct:number)=>{
                    if(product.amountToRecipe>0 && product.product){
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
                       _productsToRecipe.splice(indexProduct,1);
                });
                _recipe.recipesId = recipeId;
                _recipe.managerId = connectedUser.managerId;
                _recipes.push(_recipe);
                console.log(_recipes);
                toast.current.show({ severity: 'success', summary: 'Successful', detail: 'Recipe Created', life: 3000 });}
            }
            console.log(_recipes);
            setProductsToRecipe(_productsToRecipe);
            setRecipes(_recipes);
            setProductDialog(false);
            setRecipe(emptyRecipe);
            console.log(recipes);
        }
    }

    const editProduct = (recipe: any) => {
        productsToRecipeService.getProductsToRecipe(recipe.recipesId, connectedUser.managerId).then((data: any) =>{setProductsToRecipe(data); setNumOfProductsToRecipe(data.length)});
        if (!products.length) {
            productService.getProducts(connectedUser.managerId).then((res: any) => dispatch({ type: 'SET_PRODUCTS', payload: res }));
        }
        //debugger
        // let _productsToRecipe = [...productsToRecipe];
        // _productsToRecipe.push(emptyProductToRecipe);
        // setProductsToRecipe(_productsToRecipe);
        setRecipe({ ...recipe });
        setProductDialog(true);
    }

    const editProductToRecipe = (index: number, productId: number) => {
        //setEdit(true)
        //לא לשכוח לבדוק איך להתעסק עם המוצרים למתכון זה נורא קשהההה
        //כי צריך לשנות את הערכים וכו
    }

    const confirmAddProductToRecipe = () =>{ 
        let _productsToRecipe = [...productsToRecipe ];
        _productsToRecipe.push(emptyProductToRecipe);
        debugger
        setProductsToRecipe(_productsToRecipe);
    }
    const confirmDeleteProductToRecipe = (e:any, index: number) =>{
        debugger
        let _productsToRecipe = [...productsToRecipe ];
        if(index<numOfProductsToRecipe)
            productsToRecipeService.deleteProductToRecipe(_productsToRecipe[index].productToRecipeId, connectedUser.managerId);
        _productsToRecipe.splice(index,1);
        setProductsToRecipe(_productsToRecipe);
    }

    const confirmDeleteProduct = (recipe: any) => {
        setRecipe(recipe);
        setDeleteProductDialog(true);
    }

    const deleteProduct = () => {
        let _recipes = recipes.filter((val: any) => val.id !== recipe.recipesId);
        setRecipe(_recipes);
        setDeleteProductDialog(false);
        setRecipe(emptyRecipe);
        toast.current.show({ severity: 'success', summary: 'Successful', detail: 'Recipe Deleted', life: 3000 });
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

    // const createId = () => {
    //     let id = '';
    //     let chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    //     for (let i = 0; i < 5; i++) {
    //         id += chars.charAt(Math.floor(Math.random() * chars.length));
    //     }
    //     return id;
    // }

    const confirmDeleteSelected = () => {
        setDeleteProductsDialog(true);
    }

    const deleteSelectedProducts = () => {
        let _recipes = recipes.filter((val: any) => !selectedProducts.includes(val));
        setRecipes(_recipes);
        setDeleteProductsDialog(false);
        setSelectedProducts(null);
        toast.current.show({ severity: 'success', summary: 'Successful', detail: 'Recipes Deleted', life: 3000 });
    }

    const onCategoryChange = (e: any) => {
        let _recipe = { ...recipe };
        _recipe['quantityOfPortions'] = e.value;
        setRecipe(_recipe);
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
        debugger
        let _recipe: any = { ...recipe };
        _recipe.doseTypeId = doseType.doseTypeId;
        _recipe.doseType.doseTypeId = doseType.doseTypeId;
        _recipe.doseType.doseName = doseType.doseName;
        setDoseType(doseType);
        setRecipe(_recipe);
    }

    const OnChangeMeasurement = (measurement: any, index:number) => {
        debugger
        let _productToRecipe: any = { ...productToRecipe };
        _productToRecipe.product.typeOfMeasurementId = measurement.typeOfMeasurementId;
        _productToRecipe.product.typeOfMeasurement = measurement.typeOfMeasurement;
        setMeasurement(measurement);
        setProductToRecipe(_productToRecipe);
    }

    const onChangeProduct = (product: any, index:number) => {
        //כששומרים את המתכון לעבור גם על המוצרים למתכון ולעשות שמירה של המוצר וכו
        setProductName(product);
        let _productsToRecipe: any = [ ...productsToRecipe ];
        _productsToRecipe[index].product = product;
        _productsToRecipe[index].productId = product.productId;
        _productsToRecipe[index].typeOfMeasurementId = product.typeOfMeasurementId;
        _productsToRecipe[index].product.typeOfMeasurement.typeOfMeasurement = product.typeOfMeasurement.typeOfMeasurement;
        _productsToRecipe[index].product.typeOfMeasurement.typeOfMeasurementId = product.typeOfMeasurement.typeOfMeasurementId;
        _productsToRecipe[index].edit = true;
        setProductToRecipe(_productsToRecipe);
    }

    const onInputAmountToRecipeChange = (e: any, index: number) => {
        debugger
        const val = (e.target && e.target.value) || 0;
        debugger
        let _productsToRecipe: any = [ ...productsToRecipe ];
        _productsToRecipe[index].amountToRecipe = val;
        _productsToRecipe[index].edit = true;
        setProductsToRecipe(_productsToRecipe);
        debugger
    }

    const onInputProductNameChange = (e: any, index: number) => {
        const val = (e.target && e.target.value) || '';
        // let _productsToRecipe: any = { ...productsToRecipe };
        // _productsToRecipe[index].product.productName = val;
        // setProductsToRecipe(_productsToRecipe);
    }

    // const leftToolbarTemplate = () => {
    //     return (
    //         <React.Fragment>
    //             <Button label="New" icon="pi pi-plus" className="p-button-success p-mr-2" onClick={openNew} />
    //             <Button label="Delete" icon="pi pi-trash" className="p-button-danger" onClick={confirmDeleteSelected} disabled={!selectedProducts || !selectedProducts.length} />
    //         </React.Fragment>
    //     )
    // }

    // const rightToolbarTemplate = () => {
    //     return (
    //         <React.Fragment>
    //             <FileUpload mode="basic" name="demo[]" auto url="https://primefaces.org/primereact/showcase/upload.php" accept=".csv" chooseLabel="Import" className="p-mr-2 p-d-inline-block" onUpload={importCSV} />
    //             <Button label="Export" icon="pi pi-upload" className="p-button-help" onClick={exportCSV} />
    //         </React.Fragment>
    //     )
    // }

    // const imageBodyTemplate = (rowData:any) => {
    //     return <img src={`showcase/demo/images/product/${rowData.image}`} onError={(e:any) => e.target.src='https://www.primefaces.org/wp-content/uploads/2020/05/placeholder.png'} alt={rowData.image} className="product-image" />
    // }

    // const priceBodyTemplate = (rowData:any) => {
    //     return formatCurrency(rowData.price);
    // }

    // const ratingBodyTemplate = (rowData:any) => {
    //     return <Rating value={rowData.rating} readOnly cancel={false} />;
    // }

    // const statusBodyTemplate = (rowData:any) => {
    //     return <span className={`product-badge status-${rowData.inventoryStatus.toLowerCase()}`}>{rowData.inventoryStatus}</span>;
    // }

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
                <Button label="New" icon="pi pi-plus" className="p-button-success p-mr-2" onClick={openNew} />
                <Button label="Delete" icon="pi pi-trash" className="p-button-danger" onClick={confirmDeleteSelected} disabled={!selectedProducts || !selectedProducts.length} />
            </div>
        </div>
    );
    const productDialogFooter = (
        <React.Fragment>
            <Button label="Cancel" icon="pi pi-times" className="p-button-text" onClick={hideDialog} />
            <Button label="Save" icon="pi pi-check" className="p-button-text" onClick={saveProduct} />
        </React.Fragment>
    );
    const deleteProductDialogFooter = (
        <React.Fragment>
            <Button label="No" icon="pi pi-times" className="p-button-text" onClick={hideDeleteProductDialog} />
            <Button label="Yes" icon="pi pi-check" className="p-button-text" onClick={deleteProduct} />
        </React.Fragment>
    );
    const deleteProductsDialogFooter = (
        <React.Fragment>
            <Button label="No" icon="pi pi-times" className="p-button-text" onClick={hideDeleteProductsDialog} />
            <Button label="Yes" icon="pi pi-check" className="p-button-text" onClick={deleteSelectedProducts} />
        </React.Fragment>
    );

    return (
        <div className="datatable-crud-demo">
            <Toast ref={toast} />
            <div className="card">
                <DataTable ref={dt} value={recipes} alwaysShowPaginator={false} emptyMessage={<div>לא נמצאו מתכונים הכנס מתכון...🤓</div>} selection={selectedProducts} onSelectionChange={(e) => setSelectedProducts(e.value)}
                    dataKey="id" paginator rows={10} rowsPerPageOptions={[5, 10, 25]}
                    paginatorTemplate="FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink CurrentPageReport RowsPerPageDropdown"
                    currentPageReportTemplate="Showing {first} to {last} of {totalRecords} products"
                    globalFilter={globalFilter} header={header} responsiveLayout="scroll">
                    <Column selectionMode="multiple" headerStyle={{ width: '3rem' }} exportable={false}></Column>
                    {/* <Column field="code" header="Code" sortable style={{ minWidth: '12rem' }}></Column> */}
                    {/* <Column field="recipesId" header="RecipesId" sortable style={{ minWidth: '10rem' }}></Column> */}
                    <Column field="name" header="שם מתכון" sortable style={{ minWidth: '10rem' }}></Column>
                    {/* <Column field="image" header="Image" body={imageBodyTemplate}></Column>
                    <Column field="price" header="Price" body={priceBodyTemplate} sortable style={{ minWidth: '8rem' }}></Column> */}
                    <Column field="quantityOfPortions" header="מספר מנות" sortable style={{ minWidth: '10rem', textAlign: 'right !important'}}></Column>
                    <Column field="menu.menuName" header="סוג תפריט" sortable style={{ minWidth: '10rem', textAlign: 'right !important'}}></Column>
                    <Column field="doseType.doseName" header="סוג מנה" sortable style={{ minWidth: '10rem', textAlign: 'right !important'}}></Column>
                    {/* <Column field="rating" header="Reviews" body={ratingBodyTemplate} sortable style={{ minWidth: '12rem' }}></Column>
                    <Column field="inventoryStatus" header="Status" body={statusBodyTemplate} sortable style={{ minWidth: '12rem' }}></Column> */}
                    <Column body={actionBodyTemplate} exportable={false} style={{ minWidth: '8rem'}}></Column>
                </DataTable>
            </div>

            <Dialog visible={productDialog} style={{ width: '450px' }} header="פרטי מתכון" modal className="p-fluid" footer={productDialogFooter} onHide={hideDialog}>
                {/* {product.image && <img src={`showcase/demo/images/product/${product.image}`} onError={(e:any) => e.target.src='https://www.primefaces.org/wp-content/uploads/2020/05/placeholder.png'} alt={product.image} className="product-image" />} */}
                <div className="p-field">
                    <label htmlFor="name">שם מתכון</label>
                    <InputText id="name" value={recipe.name} onChange={(e) => onInputChange(e, 'name')} required autoFocus className={classNames({ 'p-invalid': submitted && !recipe.name })} />
                    {submitted && !recipe.name && <small className="p-error">Name is required.</small>}
                </div>

                {/* <div className="p-field">
                    <label className="p-mb-3">Category</label>
                    <div className="p-formgrid p-grid">
                        <div className="p-field-radiobutton p-col-6">
                            <RadioButton inputId="category1" name="category" value="Accessories" onChange={onCategoryChange} checked={product.category === 'Accessories'} />
                            <label htmlFor="category1">Accessories</label>
                        </div>
                        <div className="p-field-radiobutton p-col-6">
                            <RadioButton inputId="category2" name="category" value="Clothing" onChange={onCategoryChange} checked={product.category === 'Clothing'} />
                            <label htmlFor="category2">Clothing</label>
                        </div>
                        <div className="p-field-radiobutton p-col-6">
                            <RadioButton inputId="category3" name="category" value="Electronics" onChange={onCategoryChange} checked={product.category === 'Electronics'} />
                            <label htmlFor="category3">Electronics</label>
                        </div>
                        <div className="p-field-radiobutton p-col-6">
                            <RadioButton inputId="category4" name="category" value="Fitness" onChange={onCategoryChange} checked={product.category === 'Fitness'} />
                            <label htmlFor="category4">Fitness</label>
                        </div>
                    </div>
                </div> */}

                {/* <div className="p-formgrid p-grid"> */}
                    {/* <div className="p-field p-col">
                        <label htmlFor="price">Price</label>
                        <InputNumber id="price" value={product.price} onValueChange={(e) => onInputNumberChange(e, 'price')} mode="currency" currency="USD" locale="en-US" />
                    </div> */}
                    <div className="p-field">
                        <label htmlFor="quantityOfPortions">מספר מנות</label>
                        <InputNumber id="quantityOfPortions" value={recipe.quantityOfPortions} onValueChange={(e) => onInputNumberChange(e, 'quantityOfPortions')} />
                    </div>
                {/* </div> */}
                {/* <div className="p-formgrid p-grid"> */}
                    {/* <div className="p-field p-col">
                        <label htmlFor="price">Price</label>
                        <InputNumber id="price" value={product.price} onValueChange={(e) => onInputNumberChange(e, 'price')} mode="currency" currency="USD" locale="en-US" />
                    </div> */}
                {/* </div> */}
                <div className="p-field">
                    <label htmlFor="menu">סוג תפריט</label>
                    <RecipesDropdown id="menu" type="menu" menuType={recipe.menu} setMenu={OnChangeMenu} />
                </div>
                <div className="p-field">
                    <label htmlFor="doseType">סוג מנה</label>
                    <RecipesDropdown id="doseType" type="doseType" doseType={recipe.doseType} setDoseType={OnChangeDoseType} />
                </div>
                {/* <div className="p-field"> */}
                <label>החומרים למתכון:</label>
                <Button icon="pi pi-plus" className="p-button-rounded p-button-warning" onClick={() => confirmAddProductToRecipe()} />
                {
                    productsToRecipe && productsToRecipe.map((productToRecipe: any, index: number) => {
                        return (
                            // edit? (
                            <div className="p-formgrid p-grid" key={productToRecipe.productToRecipeId}>
                                <div className="p-field p-col-2">
                                    <Button icon="pi pi-trash" className="p-button-rounded p-button-warning" onClick={(e) => confirmDeleteProductToRecipe(e, index)}/>
                                </div>
                                <div className="p-field p-col-2">
                                    <InputNumber id="amountToRecipe" value={productToRecipe.amountToRecipe} onValueChange={(e) => onInputAmountToRecipeChange(e, index)} />
                                </div>
                                <div className="p-field p-col-2">
                                    <label htmlFor="typeOfMeasurement">{productToRecipe.product.typeOfMeasurement.typeOfMeasurement}</label>
                                    {/* <RecipesDropdown id="typeOfMeasurement" type="typeOfMeasurement" typeOfMeasurement={productToRecipe.product.typeOfMeasurement ?{typeOfMeasurementId : productToRecipe.product.typeOfMeasurement.typeOfMeasurementId, typeOfMeasurement: productToRecipe.product.typeOfMeasurement.typeOfMeasurement}:null} setMeasurement={(measurement: any, index:number) => OnChangeMeasurement(measurement, index)} index = {index}/> */}
                                </div>
                                <div className="p-field p-col">
                                    <RecipesDropdown id="productName" type="product" product={productToRecipe.product} setProduct={(product:any, index:number) => onChangeProduct(product, index)} index = {index}/>
                                    {/* <InputText id="productName" value={productToRecipe.product.productName} onChange={(e) => onInputProductNameChange(e, index)} /> */}
                                </div>
                            </div>
                            // ) : 
                            // (
                            // <div className="p-formgrid p-grid" key={productToRecipe.productToRecipeId}>
                            //     <div className="p-field p-col-2">
                            //         <span>{productToRecipe.amountToRecipe}</span>
                            //     </div>
                            //     <div className="p-field p-col-4">
                            //         <span>{productToRecipe.product.typeOfMeasurement.typeOfMeasurement}</span>
                            //     </div>
                            //     <div className="p-field p-col">
                            //         <span>{productToRecipe.product.productName}</span>
                            //     </div>
                            //      <Button icon="pi pi-pencil" className="p-button-rounded p-button-warning" onClick={() => editProductToRecipe(index, productToRecipe.productToRecipeId)} />
                            // </div>
                            // )
                        )
                    })
                }
                {/* </div> */}
                <div className="p-field">
                    <label htmlFor="instructions">הוראות הכנה</label>
                    <InputTextarea id="instructions" value={recipe.instructions} onChange={(e) => onInputChange(e, 'instructions')} required rows={3} cols={20} />
                </div>
            </Dialog>

            <Dialog visible={deleteProductDialog} style={{ width: '450px' }} header="Confirm" modal footer={deleteProductDialogFooter} onHide={hideDeleteProductDialog}>
                <div className="confirmation-content">
                    <i className="pi pi-exclamation-triangle p-mr-3" style={{ fontSize: '2rem' }} />
                    {recipe && <span>Are you sure you want to delete <b>{recipe.name}</b>?</span>}
                </div>
            </Dialog>

            <Dialog visible={deleteProductsDialog} style={{ width: '450px' }} header="Confirm" modal footer={deleteProductsDialogFooter} onHide={hideDeleteProductsDialog}>
                <div className="confirmation-content">
                    <i className="pi pi-exclamation-triangle p-mr-3" style={{ fontSize: '2rem' }} />
                    {recipe && <span>Are you sure you want to delete the selected products?</span>}
                </div>
            </Dialog>
        </div>
    );
}

export default Recipes;