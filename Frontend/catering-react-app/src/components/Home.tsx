import React ,{useState} from 'react';
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

function Home() {
    const [date8, setDate8] = useState<Date | Date[] | undefined>(undefined);
    const [startTime, setStartTime] = useState<Date|Date[] | undefined>(undefined);
    const [endTime, setEndTime] = useState<Date|Date[] | undefined>(undefined);
    let { path, url } = useRouteMatch();

    return (
        <Router>
         <div className="p-d-flex p-jc-center" style={{height: '500px'}}>
                <div className="p-field p-col-12 p-md-4 p-as-center">
                            {/* <label htmlFor="time24">בחר תאריך לאירוע</label><br/>
                            <Calendar id="time24" value={date8} onChange={(e) => setDate8(e.value)} showTime/> */}
                             <div className="p-field" style={{direction: 'ltr'}}>
                                <label htmlFor="basic">בחר תאריך לאירוע</label><br/>
                                <Calendar id="basic" value={date8} onChange={(e) => setDate8(e.value)} showIcon className="buttonCalendar"/>
                            </div>
                            <div className="p-formgrid p-grid">
                                {/* <Button icon="pi pi-angle-left"/> */}
                                <div className="p-field p-col-6">
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
                            </div>
                            <Link to='/orderForm'><Button icon="pi pi-angle-left"/></Link>
                </div>
            </div>
        <Switch>
             {/* <Route path='/orderForm' exact>
            </Route> */}
        </Switch>
        </Router>
    );
}

export default Home;