import 'primeicons/primeicons.css';
import 'primereact/resources/themes/saga-blue/theme.css';
import 'primereact/resources/primereact.css';
import 'primeflex/primeflex.css';
import '../../index.css';
import React, {useEffect, useState, useRef} from "react";
import { Calendar as Cal, momentLocalizer } from "react-big-calendar";
import moment from "./moment";
import withDragAndDrop from "react-big-calendar/lib/addons/dragAndDrop";
import MyWorkWeek from "./MyWorkWeek.component";
import "react-big-calendar/lib/css/react-big-calendar.css";
import "react-big-calendar/lib/addons/dragAndDrop/styles.css";
import { Button } from 'primereact/button';
import { Dialog } from 'primereact/dialog';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { useDispatch, useSelector } from 'react-redux';
import {RecipesToOrderService} from '../../services/RecipesToOrderService';
import AddEvent from './AddEvent';
import { Tooltip } from 'primereact/tooltip';
import '../../Tahoma Regular font-normal.js';
// import $ from 'jquery';

const DragAndDropCalendar = withDragAndDrop(Cal);

const Calendar = ({
  events = [],
  date = new Date(),
  onNavigate,
  view = "month",
  onView,
  views = {
    addEvent: AddEvent,
    day: true,
    month: true,
    week: true
  },
  getNow = () => new Date(),
  accessors,
  selectable = false,
  ...props
}) => {
  let eventEmpty = {
    eventId :0,
    title: '',
    phoneNumberOfEventOwner:'',
    details: '',
    start: new Date(Date.now()),
    end: new Date(Date.now()),
    menuId:0,
    numberOfDose:0,
    toolsType: '',
    isCompleted: false,
    managerId: 0,
    menu: {
      menuId:0,
      menuName:''
    }
  }
  const recipesToOrderService = new RecipesToOrderService();
  const dispatch = useDispatch();
  const productsToEvent = useSelector(state => state.eventsReducer.productsToEvent);
  const connectedUser = useSelector(state => state.userReducer.connectedUser);

  const localizer = momentLocalizer(moment);
    // Dialog of -הפק מסמך
    const [documentDialog, setDocumentDialog] = useState(false);
    const [productDocument,setProduceDocument] = useState(false);
    const [event, setEvent] = useState(eventEmpty);
    const dt = useRef(null);
    const cols = [
      { field: 'nameProduct', header: 'שם מוצר' },
      { field: 'quantityPerEvent', header: 'כמות לאירוע' },
      { field: 'quantityInStock', header: 'כמות במלאי' },
      { field: 'typeOfMeasurement', header: 'סוג מדידה' }
  ];
  const exportColumns = cols.map(col => ({ title: col.header, dataKey: col.field }));


    
    const hideDialogDocument = () => {
      setProduceDocument(false);
      setDocumentDialog(false);
    }
    const produceDocument = (event) => {
      let _event = {...event};
      _event.start = new Date(_event.start);
      _event.end = new Date(_event.end);
      debugger
      setEvent(_event);
      let RangeDate ={
        DateMin: `${_event.start.getMonth()+1}/${_event.start.getDate()}/${_event.start.getFullYear()} 00:00:00`,
        DateMax: `${_event.start.getMonth()+1}/${_event.start.getDate()+1}/${_event.start.getFullYear()} 00:00:00`,
      }
      recipesToOrderService.getProduceDocument(connectedUser.managerId, RangeDate)
      .then(res => dispatch({ type: 'SET_PRODUCTS_TO_EVENT', payload: res}));
       setDocumentDialog(true);
    }

  const MonthEvent = ({ event }) => (
    <div>
      <div className="p-d-flex p-jc-center">{event.title}</div>
      <Button label="הפק מסמך" icon="pi pi-check" className="p-button-text" onClick={() => produceDocument(event)}/>
    </div>
  );
  
const exportCSV = () => {
  dt.current.exportCSV();
}

const exportPdf = () => {
  import('jspdf').then(jsPDF => {
      import('jspdf-autotable').then(() => {
          const doc = new jsPDF.jsPDF();
          doc.addFont("Tahoma Regular font.ttf", "Tahoma Regular", "normal");
          doc.setFont("Tahoma Regular font"); // set font
          doc.setFontSize(18);
          doc.setR2L(true);
          const text= "מלאי מוצרים";
          doc.text(text, 100, 10, {styles: {font: "Tahoma Regular font", halign: 'left', isSymmetricSwapping: true, isInputVisual: true, isOutputVisual: false} });
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
      saveAsExcelFile(excelBuffer, 'productsToEvent '+event.start);
  });
}

const saveAsExcelFile = (buffer, fileName) => {
  import('file-saver').then(FileSaver => {
      let EXCEL_TYPE = 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8';
      let EXCEL_EXTENSION = '.xlsx';
      const data = new Blob([buffer], {
          type: EXCEL_TYPE
      });
      FileSaver.saveAs(data, fileName + '_export_' + new Date().getTime() + EXCEL_EXTENSION);
  });
}

  // const documentDialogFooter = ()=>(
  //   <React.Fragment>
  //       {/* <Button label="הפק מסמך" icon="pi pi-check" className="p-button-text" onClick={produceDocument} /> */}
  //       <Button label="Export" icon="pi pi-upload" className="p-button-help" onClick={exportCSV} />
  //   </React.Fragment>
  // );

  const exportAllButton = ()=>(
      <div className="p-d-flex p-ai-center export-buttons">
               <Tooltip target=".export-buttons>button" position="bottom" />
                <Button type="button" style={{padding: '10px'}} icon="pi pi-file" onClick={exportCSV} className="p-mr-2" data-pr-tooltip="CSV" disabled={productsToEvent.length === 0? true: false}/>
                <Button type="button" style={{padding: '10px'}} icon="pi pi-file-excel" onClick={exportExcel} className="p-button-success p-mr-2" data-pr-tooltip="XLS" disabled={productsToEvent.length === 0 ? true: false}/>
                <Button type="button" style={{padding: '10px'}} icon="pi pi-file-pdf" onClick={exportPdf} className="p-button-warning p-mr-2" data-pr-tooltip="PDF"disabled={productsToEvent.length === 0 ? true: false} />
      </div>
  );
  return (
    <>
    <DragAndDropCalendar
      {...{
        localizer,
        events,
        date,
        onNavigate,
        view,
        onView,
        views,
        getNow,
        accessors,
        selectable
      }}
      messages={{
        addEvent: "הוספת אירוע"
      }}
      components={{
        event: MonthEvent
      }}
      resizable
      {...props}
      className="calendar-css"
    />
    <Dialog visible={documentDialog} style={{ width: '450px' }} header="הפק מסמך ניהול מלאי" modal className="p-fluid" footer={exportAllButton} onHide={hideDialogDocument}>
                        <div className="p-field">
                        <h5>{event.title}  {event.start.toDateString()}</h5>
                        <label htmlFor="startTime">{event.end.toTimeString().split(' ')[0].split(':')[0]}:{event.end.toTimeString().split(' ')[0].split(':')[1]} -{event.start.toTimeString().split(' ')[0].split(':')[0]}:{event.start.toTimeString().split(' ')[0].split(':')[1]}</label>
                         </div>
                         <div className="p-field">
                         </div>
                         <div className="card">
                          <DataTable ref={dt} className="table-product" value={productsToEvent} responsiveLayout="scroll" showGridlines emptyMessage={<div>לאירוע זה אין תפריט הכנס תפריט...🤓</div>}>
                              <Column field="nameProduct" header="שם מוצר"></Column>
                              <Column field="quantityPerEvent" header="כמות לאירוע"></Column>
                              <Column field="quantityInStock" header="כמות במלאי"></Column>
                              <Column field="typeOfMeasurement" header="סוג מדידה"></Column>
                          </DataTable>
                       </div>
   </Dialog>
   </>
  );
};

export default Calendar;
