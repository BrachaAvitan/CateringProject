import 'primeicons/primeicons.css';
import 'primereact/resources/themes/saga-blue/theme.css';
import 'primereact/resources/primereact.css';
import 'primeflex/primeflex.css';

import React ,{useState, useRef} from 'react';
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

function Home() {
    const { register, handleSubmit, watch, formState: { errors } } = useForm();
    const [date8, setDate8] = useState<Date | Date[] | undefined>(undefined);
    const [startTime, setStartTime] = useState<Date|Date[] | undefined>(undefined);
    const [endTime, setEndTime] = useState<Date|Date[] | undefined>(undefined);
    const [selectedType, setSelectedType] = useState<any>(null);
    let { path, url } = useRouteMatch();
    const types = [
        {name: 'תאריך אחד', code:'day'},
        {name: 'טווח תאריכים', code:'range'},
        {name: 'מלאי מוצרים', code:'allProducts'},
    ];
    const recipesToOrderService = new RecipesToOrderService();
    const dispatch = useDispatch();
    const productsToEvent = useSelector((state:any) => state.eventsReducer.productsToEvent);
    const connectedUser = useSelector((state:any) => state.userReducer.connectedUser.managerId);
     // Dialog of -הפק מסמך
     const [documentDialog, setDocumentDialog] = useState(false);
     const [productDocument,setProduceDocument] = useState(false);
     const [event, setEvent] = useState<any>(null);
     const dt = useRef<any>(null);
     const cols = [
       { field: 'nameProduct', header: 'שם מוצר' },
       { field: 'quantityPerEvent', header: 'כמות לאירוע' },
       { field: 'quantityInStock', header: 'כמות במלאי' },
       { field: 'typeOfMeasurement', header: 'סוג מדידה' }
   ];
   const exportColumns = cols.map(col => ({ title: col.header, dataKey: col.field }));
   const exportCSV = () => {
    dt.current.exportCSV();
  }
  
   const hideDialogDocument = () => {
    setProduceDocument(false);
    setDocumentDialog(false);
    }
    const onTypeChange = (e:any) =>{
       setSelectedType(e.value);
    }
    const produceDocument = (data:any) => {
        debugger
        recipesToOrderService.getProduceDocument(event.eventId, connectedUser)
        .then(res => dispatch({ type: 'SET_PRODUCTS_TO_EVENT', payload: res}));
        if(!productsToEvent.length)
           setDocumentDialog(true);
        else
            alert("לא קיים אירוע בתאריך זה");
      }
      const documentDialogFooter = ()=>(
        <React.Fragment>
            {/* <Button label="הפק מסמך" icon="pi pi-check" className="p-button-text" onClick={produceDocument} /> */}
            <Button label="Export" icon="pi pi-upload" className="p-button-help" onClick={exportCSV} />
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
                        <div className="card">
                            <Dropdown value={selectedType} optionLabel="name" optionValue="code" options={types} {...register("drop")} onChange={onTypeChange} placeholder="הפק מסמך לפי" />
                        </div>
                        {/* <Link to='/orderForm'><Button icon="pi pi-angle-left"/></Link> */}
                    </div>
                    {
                        selectedType==="day"?(
                            <>
                           <div className="p-field" style={{direction: 'ltr'}}>
                                <label htmlFor="basic">בחר תאריך אירוע</label><br/>
                                <Calendar id="basic" {...register("date", { required: true })} showIcon/>
                                {errors.date? <span>שדה חובה</span>:""}
                            </div> 
                            <Button label="הפק מסמך" icon="pi pi-check" className="p-button-text" type="submit"/>
                            </>
                        ):""
                    }
                    </form>
                </div>
                </div>
        
            
            {/* <label htmlFor="time24">בחר תאריך לאירוע</label><br/>
                            <Calendar id="time24" value={date8} onChange={(e) => setDate8(e.value)} showTime/> */}
                             {/* <div className="p-field" style={{direction: 'ltr'}}>
                                <label htmlFor="basic">בחר תאריך לאירוע</label><br/>
                                <Calendar id="basic" value={date8} onChange={(e) => setDate8(e.value)} showIcon className="buttonCalendar"/>
                            </div> */}
                            {/* <div className="p-formgrid p-grid"> */}
                                {/* <Button icon="pi pi-angle-left"/> */}
                                {/* <div className="p-field p-col-6">
                                <label htmlFor="startTime">שעת התחלה:</label>
                                <Calendar id="startTime" value={startTime} onChange={(e) => setStartTime(e.value)} showTime timeOnly/>
                                </div>
                                <div className="p-field p-col-6">
                                <label htmlFor="endTime">שעת סיום:</label>
                                <Calendar id="endTime" value={endTime} onChange={(e) => setEndTime(e.value)} showTime timeOnly/>
                            </div>
                            </div>
                            <div className="p-formgrid p-grid">
                                <label htmlFor="nameOfEventOwner">שם בעל האירוע:</label>
                                <InputText id="name" />
                            </div>
                            <div className="p-formgrid p-grid">
                            </div> */}
                      <Dialog visible={documentDialog} style={{ width: '450px' }} header="הפק מסמך ניהול מלאי" modal className="p-fluid" footer={documentDialogFooter} onHide={hideDialogDocument}>
                        <div className="p-field">
                        {/* <h5>{event.title}  {event.start.toDateString()}</h5> */}
                        {/* <label htmlFor="startTime">{event.end.toTimeString().split(' ')[0]} - {event.start.toTimeString().split(' ')[0]}</label> */}
                         </div>
                         <div className="p-field">
                         </div>
                         <div className="card">
                          <DataTable ref={dt} value={productsToEvent} responsiveLayout="scroll" showGridlines >
                              <Column field="nameProduct" header="שם מוצר"></Column>
                              <Column field="quantityPerEvent" header="כמות לאירוע"></Column>
                              <Column field="quantityInStock" header="כמות במלאי"></Column>
                              <Column field="typeOfMeasurement" header="סוג מדידה"></Column>
                          </DataTable>
                       </div>
   </Dialog>
                            </>
    );
}

export default Home;