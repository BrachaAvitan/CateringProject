import 'primeicons/primeicons.css';
import 'primereact/resources/themes/saga-blue/theme.css';
import 'primereact/resources/primereact.css';
import 'primeflex/primeflex.css';

import React ,{useState, useRef, useEffect} from 'react';
import { Button } from 'primereact/button';
import './ButtonDemo.css';
import { Route, BrowserRouter as Router, Switch, useRouteMatch ,Link} from 'react-router-dom';
import 'primeflex/primeflex.css';
import {InputText} from 'primereact/inputtext';
import {Checkbox} from 'primereact/checkbox';
import {RadioButton} from 'primereact/radiobutton';
import {Dropdown} from 'primereact/dropdown';
import {InputTextarea} from 'primereact/inputtextarea';
import EventsCalendar from './calendar/EventsCalendar';
import { Calendar } from 'primereact/calendar';
import { Dialog } from 'primereact/dialog';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { RecipesToOrderService } from '../services/RecipesToOrderService';
import { useDispatch, useSelector } from 'react-redux';
import { useForm } from "react-hook-form";
import { Tooltip } from 'primereact/tooltip';
import '../Tahoma Regular font-normal.js';
import { ProductService } from '../services/ProductService';

function Home() {
    const { register, handleSubmit, watch, formState: { errors } } = useForm();
    const [date8, setDate8] = useState<Date | Date[] | undefined | any>(undefined);
    const [dates1, setDates1] = useState<Date | Date[] | undefined | any>(undefined);
    const [dates2, setDates2] = useState<Date | Date[] | undefined | any>(undefined);
    const [selectedType, setSelectedType] = useState<any>('day');
    let { path, url } = useRouteMatch();
    const types = [
        {name: 'תאריך אחד', code:'day'},
        {name: 'טווח תאריכים', code:'range'},
        {name: 'מלאי מוצרים', code:'allProducts'},
    ];
    const [erorrMessage, setErorrMessage] = useState('');
    const recipesToOrderService = new RecipesToOrderService();
    const productService = new ProductService();
    const dispatch = useDispatch();
    const productsToEvent = useSelector((state:any) => state.eventsReducer.productsToEvent);
    const connectedUser = useSelector((state:any) => state.userReducer.connectedUser);
    const products = useSelector((state:any) => state.recipesReducer.products);
     // Dialog of -הפק מסמך
     const [documentDialog, setDocumentDialog] = useState(false);
     const [productDocument,setProduceDocument] = useState(false);
     const [event, setEvent] = useState<any>(null);
     const [statusDate, setStatusDate] = useState(false);
     const dt = useRef<any>(null);
     const cols = [
       { field: 'nameProduct', header: 'שם מוצר' },
       { field: 'quantityPerEvent', header: 'כמות לאירוע' },
       { field: 'quantityInStock', header: 'כמות במלאי' },
       { field: 'typeOfMeasurement', header: 'סוג מדידה' }
   ];
   const colsProducts = [
    { field: 'productName', header: 'שם מוצר' },
    { field: 'quantityInStock', header: 'כמות במלאי' }
   ];
   const exportColumns = cols.map(col => ({ title: col.header, dataKey: col.field }));
   const exportColumnsProducts = colsProducts.map(colProducts => ({ title: colProducts.header, dataKey: colProducts.field }));
   const exportCSV = () => {
    dt.current.exportCSV();
  }

  useEffect(()=>{
    if(!products.length){
        productService.getProducts(connectedUser.managerId).then(res  => dispatch({type: 'SET_PRODUCTS', payload: res}));
    }
    if(productsToEvent.length > 0)
    {
       setErorrMessage('');
       setDocumentDialog(true);
    }
    else if(statusDate)
        setErorrMessage("לא קיים אירוע בתאריך זה");
  },[productsToEvent]);

  const onBlurDate = () => {
      debugger
      setStatusDate(true);
  }

  const exportPdf = () => {
    import('jspdf').then(jsPDF => {
        import('jspdf-autotable').then(() => {
            const doc: any = new jsPDF.jsPDF();
            doc.addFont("Tahoma Regular font.ttf", "Tahoma Regular", "normal");
            doc.setFont("Tahoma Regular font"); // set font
            doc.setFontSize(18);
            doc.setR2L(true);
            const text= "מלאי מוצרים";
            doc.text(text, 100, 10, {styles: {font: "Tahoma Regular font", halign: 'left', isSymmetricSwapping: true, isInputVisual: true, isOutputVisual: false} });
            if(selectedType === "allProducts") {
                doc.autoTable(exportColumnsProducts.reverse(), products,{styles: {font: "Tahoma Regular font", halign: 'right' , isSymmetricSwapping: true , isInputVisual: true , isOutputVisual: false }});
            }
            else
               doc.autoTable(exportColumns.reverse(), productsToEvent,{styles: {font: "Tahoma Regular font", halign: 'right' , isSymmetricSwapping: true , isInputVisual: true , isOutputVisual: false }});
            doc.save('products.pdf');
        })
    })
  }
  
  const exportExcel = () => {
    import('xlsx').then(xlsx => {
        const worksheet = xlsx.utils.json_to_sheet(productsToEvent);
        const workbook = { Sheets: { 'data': worksheet }, SheetNames: ['data'] , Views : true};
        const excelBuffer = xlsx.write(workbook, { bookType: 'xlsx', type: 'array' });
        saveAsExcelFile(excelBuffer, 'productsToEvent');
    });
  }
  const saveAsExcelFile = (buffer: any, fileName: any) => {
    import('file-saver').then((FileSaver: any )=> {
        let EXCEL_TYPE = 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8';
        let EXCEL_EXTENSION = '.xlsx';
        const data = new Blob([buffer], {
            type: EXCEL_TYPE
        });
        FileSaver.saveAs(data, fileName + '_export_' + new Date() + EXCEL_EXTENSION);
    });
  }

   const hideDialogDocument = () => {
    setProduceDocument(false);
    setDocumentDialog(false);
    }
    const onTypeChange = (e:any) =>{
       setSelectedType(e.value);
    }
    const produceDocument = async (data:any) => {
        debugger
        let RangeDate ={
            DateMin: new Date(),
            DateMax: new Date(),
          }
        if(selectedType === "day"){
            setDate8(data.date);
            let tomorrow = new Date(data.date);
            tomorrow.setDate(tomorrow.getDate()+1);
            RangeDate.DateMin = data.date;
            RangeDate.DateMax = tomorrow;
            await recipesToOrderService.getProduceDocument(connectedUser.managerId, RangeDate)
        .then(res => dispatch({ type: 'SET_PRODUCTS_TO_EVENT', payload: res}));
        }
        if(selectedType === "range")
        {
            setDates1(dates2);
            let tomorrow: any = dates2[1];
            tomorrow.setDate(tomorrow.getDate()+1);
            RangeDate.DateMin = dates2[0];
            RangeDate.DateMax = tomorrow;
            await recipesToOrderService.getProduceDocument(connectedUser.managerId, RangeDate)
        .then(res => dispatch({ type: 'SET_PRODUCTS_TO_EVENT', payload: res}));
        }
        if(selectedType === "allProducts"){
            setErorrMessage('');
            setDocumentDialog(true);
        }
        // if(!productsToEvent.length)
        // {
        //    setErorrMessage('');
        //    setDocumentDialog(true);
        // }
        // else
        //     setErorrMessage("לא קיים אירוע בתאריך זה");
      }
      const documentDialogFooter = ()=>(
        <React.Fragment>
             <Tooltip target=".export-buttons>button" position="bottom" />
             {selectedType === "allProducts"?
             (
                <div className="p-d-flex p-ai-center export-buttons">
                      <Button type="button" style={{padding: '10px'}} icon="pi pi-file" onClick={exportCSV} className="p-mr-2" data-pr-tooltip="CSV" disabled={products.length === 0? true: false}/>
                      <Button type="button" style={{padding: '10px'}} icon="pi pi-file-pdf" onClick={exportPdf} className="p-button-warning p-mr-2" data-pr-tooltip="PDF"disabled={products.length === 0? true: false} />
                </div>
                ):
            (<div className="p-d-flex p-ai-center export-buttons">
                  <Button type="button" style={{padding: '10px'}} icon="pi pi-file" onClick={exportCSV} className="p-mr-2" data-pr-tooltip="CSV" disabled={productsToEvent.length === 0? true: false}/>
                  <Button type="button" style={{padding: '10px'}} icon="pi pi-file-excel" onClick={exportExcel} className="p-button-success p-mr-2" data-pr-tooltip="XLS" disabled={productsToEvent.length === 0? true: false}/>
                  <Button type="button" style={{padding: '10px'}} icon="pi pi-file-pdf" onClick={exportPdf} className="p-button-warning p-mr-2" data-pr-tooltip="PDF"disabled={productsToEvent.length === 0? true: false} />
            </div>)
          }
        </React.Fragment>
      );

      console.log(watch("date")); // watch input value by passing the name of it
      const onSubmit = (data: any)=>{
        produceDocument(data);
       }
    return (
        <>
            <div className="p-d-flex p-jc-center">
                <div className="p-field p-col-6 p-md-4 p-mr-2" style={{backgroundColor:'rgb(245 242 242 / 17%)', marginTop:'10%', borderRadius:'3px'}}>
                    <form onSubmit={handleSubmit(onSubmit)}>
                    <div className="dropdown-demo">
                        <label>הפק מסמך לפי</label>
                        <div className="card">
                            <Dropdown value={selectedType} optionLabel="name" optionValue="code" options={types} {...register("drop")} onChange={onTypeChange} />
                        </div>
                        {/* <Link to='/orderForm'><Button icon="pi pi-angle-left"/></Link> */}
                    </div>
                    {
                        selectedType==="day"?(
                           <div className="p-field" style={{direction: 'ltr'}}>
                                <label htmlFor="basic">בחר תאריך אירוע</label><br/>
                                <Calendar id="basic" {...register("date", { required: true })} onBlur={onBlurDate} showIcon/><br/>
                                {errors.date? <span>שדה חובה</span>:""}
                                {erorrMessage}
                            </div> 
                        ):
                        selectedType === "range"?(
                            <div className="p-field" style={{direction: 'ltr'}}>
                                <label htmlFor="range">בחר תאריך אירוע</label><br/>
                                <Calendar id="range" value={dates2}onChange={(e: any) => setDates2(e.value)} selectionMode="range" readOnlyInput/><br/>
                                {erorrMessage}
                            </div> 
                        ):null
                    }
                    <Button label="הפק מסמך" icon="pi pi-check" className="p-button-text" type="submit"/>
                    </form>
                </div>
                </div>
                      <Dialog visible={documentDialog} style={{ width: '450px' }} header="הפק מסמך ניהול מלאי" modal className="p-fluid" footer={documentDialogFooter} onHide={hideDialogDocument}>
                        <div className="p-field">
                        {/* <h5>{event.start.toDateString()}</h5>
                        <label htmlFor="startTime">{event.end.toTimeString().split(' ')[0]} - {event.start.toTimeString().split(' ')[0]}</label> */}
                         </div>
                         {selectedType === "day" || selectedType === "range"?(
                          <>
                           {dates1? (<><label>{`${dates1[0].toDateString()} - ${dates1[1].toDateString()}`}</label><br/><br/></>): null}
                           {date8? (<><label>{date8.toDateString()}</label><br/><br/></>): null}
                         <div className="card">
                          <DataTable ref={dt} value={productsToEvent} responsiveLayout="scroll" showGridlines >
                              <Column field="nameProduct" header="שם מוצר"></Column>
                              <Column field="quantityPerEvent" header="כמות לאירוע"></Column>
                              <Column field="quantityInStock" header="כמות במלאי"></Column>
                              <Column field="typeOfMeasurement" header="סוג מדידה"></Column>
                          </DataTable>
                       </div></>):
                        selectedType === "allProducts"?
                        (
                            <div className="card">
                             <DataTable ref={dt} value={products} responsiveLayout="scroll" showGridlines >
                                 <Column field="productName" header="שם מוצר"></Column>
                                 <Column field="quantityInStock" header="כמות במלאי"></Column>
                                 <Column field="category.categoryName" header="קטגוריה"></Column>
                             </DataTable>
                          </div>): null
                        }
                   </Dialog>
            </>
    );
}

export default Home;