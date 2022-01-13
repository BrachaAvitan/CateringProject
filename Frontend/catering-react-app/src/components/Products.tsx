import 'primeicons/primeicons.css';
import 'primereact/resources/themes/saga-blue/theme.css';
import 'primereact/resources/primereact.css';
import 'primeflex/primeflex.css';
import '../index.css';

import React, { useState, useEffect, useRef } from 'react';
import { classNames } from 'primereact/utils';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { Toast } from 'primereact/toast';
import { Button } from 'primereact/button';
import { InputNumber } from 'primereact/inputnumber';
import { Dialog } from 'primereact/dialog';
import { InputText } from 'primereact/inputtext';
import './Recipes/Recipes.css';
import { ProductService } from '../services/ProductService';
import RecipesDropdown from './RecipesDropdown';
import { useDispatch, useSelector } from 'react-redux';

const Products = (props: any) => {

    let emptyProduct = {
        productId: 0,
        productName: '',
        categoryId: 0,
        quantityInStock: 0,
        typeOfMeasurementId: 0,
        managerId: 0,
        typeOfMeasurement: {
            typeOfMeasurementId: 0,
            typeOfMeasurement: ''
        },
        category: {
            categoryId: 0,
            categoryName: ''
        }
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
    const [product, setProduct] = useState(emptyProduct);
    const [measurement, setMeasurement] = useState<any>(null);
    const [category, setCategory] = useState<any>(null);
    const dispatch = useDispatch();
    const connectedUser = useSelector((state: any) => state.userReducer.connectedUser);
    const products = useSelector((state: any) => state.recipesReducer.products);

    useEffect(() => {
        console.log('products reload');
        if (!products.length)
            productService.getProducts(connectedUser.managerId).then(res => dispatch({ type: 'SET_PRODUCTS', payload: res }));
    }, []);

    const openNew = () => {
        setProduct(emptyProduct);
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

    const saveProduct = () => {
        setSubmitted(true);

        if (product.productName.trim()) {
            let _products = [...products];
            let _product = { ...product };
            console.log(_product);
            if (product.productId) {
                const index = findIndexById(product.productId);
                _products[index] = _product;
                //update product
                productService.updateProduct(_product);
                toast.current.show({ severity: 'success', summary: 'בוצע בהצלחה', detail: 'המוצר התעדכן', life: 3000 });
            }
            else {
                let productInsert = {
                    ProductName: _product.productName,
                    CategoryId: _product.categoryId,
                    QuantityInStock: _product.quantityInStock,
                    TypeOfMeasurementId: _product.typeOfMeasurementId,
                    ManagerId: connectedUser.managerId
                }
                //add recipe
                productService.insertProduct(productInsert);
                _products.push(_product);
                toast.current.show({ severity: 'success', summary: 'בוצע בהצלחה', detail: 'המוצר נוסף', life: 3000 });
            }
            console.log(_products);
            //update products in redux
            dispatch({ type: 'SET_PRODUCTS', payload: _products });
            setProductDialog(false);
            setProduct(emptyProduct);
            console.log(products);
        }
    }
    //edit product
    const editProduct = (product: any) => {
        setProduct({ ...product });
        setProductDialog(true);
    }
    //אישור מחיקת מוצר
    const confirmDeleteProduct = (product: any) => {
        setProduct(product);
        setDeleteProductDialog(true);
    }
    //מחיקת מוצר
    const deleteProduct = () => {
        let _products = products.filter((val: any) => val.productId !== product.productId);
        //update products in redux
        dispatch({ type: 'SET_PRODUCTS', payload: _products });
        setDeleteProductDialog(false);
        setProduct(emptyProduct);
        toast.current.show({ severity: 'success', summary: 'בוצע בהצלחה', detail: 'המוצר נמחק', life: 3000 });
    }

    const findIndexById = (id: number) => {
        let index = -1;
        for (let i = 0; i < products.length; i++) {
            if (products[i].productId === id) {
                index = i;
                break;
            }
        }
        return index;
    }
    //אישור מחיקת מוצרים שנבחרו למחיקה
    const confirmDeleteSelected = () => {
        setDeleteProductsDialog(true);
    }

    const deleteSelectedProducts = () => {
        let _products = products.filter((val: any) => !selectedProducts.includes(val));
        dispatch({ type: 'SET_PRODUCTS', payload: _products });
        setDeleteProductsDialog(false);
        setSelectedProducts(null);
        toast.current.show({ severity: 'success', summary: 'בוצע בהצלחה', detail: 'המוצר נמחק', life: 3000 });
    }

    const onInputChange = (e: any, name: any) => {
        const val = (e.target && e.target.value) || '';
        let _product: any = { ...product };
        _product[`${name}`] = val;

        setProduct(_product);
    }

    const onInputNumberChange = (e: any, name: any) => {
        const val = (e.target && e.target.value) || 0;
        let _product: any = { ...product };
        _product[`${name}`] = val;

        setProduct(_product);
    }

    const OnChangeMeasurement = (measurement: any, index: number) => {
        let _product: any = { ...product };
        let _measurement: any = { ...measurement };
        _product.typeOfMeasurementId = _measurement.typeOfMeasurementId;
        _product.typeOfMeasurement = _measurement;
        setMeasurement(measurement);
        setProduct(_product);
    }

    const OnChangeCategory = (category: any) => {
        let _product: any = { ...product };
        let _category: any = { ...category };
        _product.categoryId = _category.categoryId;
        _product.category = _category;
        setCategory(category);
        setProduct(_product);
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
                <h5 className="p-mx-0 p-my-1">ניהול מוצרים</h5>
                <span className="p-input-icon-left">
                    <i className="pi pi-search" />
                    <InputText type="search" onInput={(e: any) => setGlobalFilter(e.target.value)} placeholder="חיפוש..." />
                </span>
            </>
            <div>
                <Button label="מוצר חדש" icon="pi pi-plus" className="p-button-success p-mr-2" onClick={openNew} />
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
                <DataTable ref={dt} value={products} selection={selectedProducts} emptyMessage={<div>לא נמצאו מוצרים הכנס מוצר...🤓</div>} onSelectionChange={(e) => setSelectedProducts(e.value)}
                    dataKey="productId" paginator rows={10} rowsPerPageOptions={[5, 10, 25]}
                    paginatorTemplate="FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink CurrentPageReport RowsPerPageDropdown"
                    currentPageReportTemplate="מציג {last} - {first} מתוך {totalRecords} מוצרים"
                    globalFilter={globalFilter} header={header} responsiveLayout="scroll">
                    <Column selectionMode="multiple" headerStyle={{ width: '3rem' }} exportable={false}></Column>
                    <Column field="productName" header="שם מוצר" sortable style={{ minWidth: '10rem' }}></Column>
                    <Column field="quantityInStock" header="כמות במלאי" sortable style={{ minWidth: '10rem' }}></Column>
                    <Column field="category.categoryName" header="קטגוריה" sortable style={{ minWidth: '10rem' }}></Column>
                    <Column field="typeOfMeasurement.typeOfMeasurement" header="סוג מדידה" sortable style={{ minWidth: '10rem' }}></Column>
                    <Column body={actionBodyTemplate} exportable={false} style={{ minWidth: '8rem' }}></Column>
                </DataTable>
            </div>

            <Dialog visible={productDialog} style={{ width: '450px' }} header="פרטי מוצר" modal className="p-fluid" footer={productDialogFooter} onHide={hideDialog}>

                <div className="p-field">
                    <label htmlFor="productName">שם מוצר</label>
                    <InputText id="productName" value={product.productName} onChange={(e) => onInputChange(e, 'productName')} required autoFocus className={classNames({ 'p-invalid': submitted && !product.productName })} />
                    {submitted && !product.productName && <small className="p-error">שם מוצר חובה.</small>}
                </div>

                <div className="p-field">
                    <label htmlFor="quantityInStock">כמות במלאי</label>
                    <InputNumber id="quantityInStock" value={product.quantityInStock} onValueChange={(e) => onInputNumberChange(e, 'quantityInStock')} />
                </div>

                <div className="p-field">
                    <label htmlFor="category">קטגוריה</label>
                    <RecipesDropdown id="category" type="category" category={product.category} setCategory={OnChangeCategory} />
                </div>

                <div className="p-field">
                    <label htmlFor="typeOfMeasurement">סוג מדידה</label>
                    <RecipesDropdown id="typeOfMeasurement" type="typeOfMeasurement" typeOfMeasurement={product.typeOfMeasurement} setMeasurement={OnChangeMeasurement} />
                </div>
            </Dialog>

            <Dialog visible={deleteProductDialog} style={{ width: '450px' }} header="Confirm" modal footer={deleteProductDialogFooter} onHide={hideDeleteProductDialog}>
                <div className="confirmation-content">
                    <i className="pi pi-exclamation-triangle p-mr-3" style={{ fontSize: '2rem' }} />
                    {product && <span>האם אתה בטוח שברצונך למחוק את המוצר  <b>{product.productName}</b>?</span>}
                </div>
            </Dialog>

            <Dialog visible={deleteProductsDialog} style={{ width: '450px' }} header="Confirm" modal footer={deleteProductsDialogFooter} onHide={hideDeleteProductsDialog}>
                <div className="confirmation-content">
                    <i className="pi pi-exclamation-triangle p-mr-3" style={{ fontSize: '2rem' }} />
                    {product && <span>האם אתה בטוח שברצונך למחוק את המוצרים שנבחרו?</span>}
                </div>
            </Dialog>
        </div>
    );
}

export default Products;