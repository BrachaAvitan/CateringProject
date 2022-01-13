import 'primeicons/primeicons.css';
import 'primereact/resources/themes/saga-blue/theme.css';
import 'primereact/resources/primereact.css';
import 'primeflex/primeflex.css';
import '../../index.css';
import '../Recipes/Recipes.css';
import { Toast } from 'primereact/toast';
import { Dialog } from 'primereact/dialog';
import { Button } from 'primereact/button';
import { InputNumber } from "primereact/inputnumber";
import { InputText } from "primereact/inputtext";
import { classNames } from 'primereact/utils';
import React, { useEffect, useState, useRef } from "react";
import ReactDOM from "react-dom";
import { default as CalendarBig } from "./Calendar.component";
// import { events as eventData } from "./eventData";
import { useDispatch, useSelector } from 'react-redux';
import { DetailsEventService } from '../../services/DetailsEventService';
import { Calendar } from 'primereact/calendar';
//
import { styled } from '@mui/material/styles';
import Stack from '@mui/material/Stack';
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';
import Check from '@mui/icons-material/Check';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import PersonIcon from '@mui/icons-material/Person';
import MenuIcon from '@mui/icons-material/Menu';
import VideoLabelIcon from '@mui/icons-material/VideoLabel';
import StepConnector, { stepConnectorClasses } from '@mui/material/StepConnector';
import { StepIconProps } from '@mui/material/StepIcon';
import { StyleSheetManager } from 'styled-components';
import rtlPlugin from 'stylis-plugin-rtl';
import { Checkbox } from 'primereact/checkbox';

import { InputTextarea } from 'primereact/inputtextarea';
import RecipesDropdown from '../RecipesDropdown';
import { DoseTypeService } from '../../services/DoseTypeService';
import { RecipeService } from '../../services/RecipeService';
import { RecipesToOrderService } from '../../services/RecipesToOrderService';

const dayColors = [
  "rgba(128, 128, 128, 0.219)",
  "rgba(128, 128, 128, 0.219)",
  "rgba(128, 128, 128, 0.219)",
  "rgba(128, 128, 128, 0.219)",
  "rgba(128, 128, 128, 0.219)",
  "rgba(128, 128, 128, 0.219)",
  "rgba(128, 128, 128, 0.219)"
];

const now = () => new Date();
let selectTimeout;

const EventsCalendar = () => {
  let eventEmpty = {
    eventId: 0,
    title: '',
    nameOfEventOwner: '',
    phoneNumberOfEventOwner: '',
    details: '',
    start: new Date(),
    end: new Date(),
    startDate: new Date(),
    endDate: new Date(),
    menuId: 0,
    numberOfDose: 0,
    toolsType: '',
    isCompleted: false,
    managerId: 0,
    menu: {
      menuId: 0,
      menuName: ''
    }
  }
  const detailsEventService = new DetailsEventService();
  const doseTypesService = new DoseTypeService();
  const recipeService = new RecipeService();
  const recipesToOrderService = new RecipesToOrderService();
  const dispatch = useDispatch();
  const events = useSelector(state => state.eventsReducer.events);
  const connectedUser = useSelector(state => state.userReducer.connectedUser);
  const recipesToOrder = useSelector(state => state.eventsReducer.recipesToOrder);
  const recipesOrder = useSelector(state => state.eventsReducer.recipesOrder);
  const [event, setEvent] = useState(eventEmpty);
  const toast = useRef(null);

  const [date, setDate] = useState(now());
  const [view, setView] = useState("month");
  const [productDialog, setProductDialog] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  // Dialog of -הפק מסמך
  const [documentDialog, setDocumentDialog] = useState(false);
  const [productDocument, setProduceDocument] = useState(false);

  const onNavigate = (newDate) => setDate(newDate);
  const onView = (newView) => setView(newView);

  const accessors = {
    draggableAccessor: (event) => !event.blocked,
    resizableAccessor: (event) => !event.blocked
  };
  const [menuType, setMenuType] = useState(event.menu);
  const [eventMenu, setEventMenu] = useState(null);
  const [selectedRecipes, setSelectedRecipes] = useState([]);
  const doseTypes = useSelector(state => state.recipesReducer.doseTypes);
  const recipes = useSelector(state => state.recipesReducer.recipes);

  const dt = useRef(null);

  useEffect(() => {
    if (!events.length)
      detailsEventService.getDetailsEvents(connectedUser.managerId).then(res => dispatch({ type: 'SET_EVENTS', payload: res }));
    if (!doseTypes.length)
      doseTypesService.getDoseTypes().then(res => dispatch({ type: 'SET_DOSE_TYPES', payload: res }));
    if (!recipes.length)
      recipeService.getRecipes(connectedUser.managerId).then(res => dispatch({ type: 'SET_RECIPES', payload: res }));
  }, []);

  const onRecipeChange = (e) => {
    debugger
    let _selectedRecipes = [...selectedRecipes];

    if (e.checked) {
      _selectedRecipes.push(e.value);
      //insert recipeToOrder
      // recipesToOrderService.
    }
    else {
      for (let i = 0; i < _selectedRecipes.length; i++) {
        const selectedRecipe = _selectedRecipes[i];

        if (selectedRecipe.recipesId === e.value.recipesId) {
          _selectedRecipes.splice(i, 1);
          break;
        }
      }
    }

    setSelectedRecipes(_selectedRecipes);
  }
  // const [events, setEvents] = useState(
  //   eventData.map((event) => {
  //     event.start = new Date(event.start);
  //     event.end = new Date(event.end);
  //     return event;
  //   })
  // );
  //Steps--
  const [step, setStep] = useState(0);
  const ColorlibConnector = styled(StepConnector)(({ theme }) => ({
    [`&.${stepConnectorClasses.alternativeLabel}`]: {
      top: 22,
    },
    [`&.${stepConnectorClasses.active}`]: {
      [`& .${stepConnectorClasses.line}`]: {
        backgroundColor:
          '#d38385',
      },
    },
    [`&.${stepConnectorClasses.completed}`]: {
      [`& .${stepConnectorClasses.line}`]: {
        backgroundColor:
          '#d38385',
      },
    },
    [`& .${stepConnectorClasses.line}`]: {
      height: 3,
      border: 0,
      backgroundColor:
        theme.palette.mode === 'dark' ? theme.palette.grey[800] : '#eaeaf0',
      borderRadius: 1,
    },
  }));

  const ColorlibStepIconRoot = styled('div')(({ theme, ownerState }) => ({
    backgroundColor: theme.palette.mode === 'dark' ? theme.palette.grey[700] : '#ccc',
    zIndex: 1,
    color: '#fff',
    width: 50,
    height: 50,
    display: 'flex',
    borderRadius: '50%',
    justifyContent: 'center',
    alignItems: 'center',
    ...(ownerState.active && {
      backgroundColor:
        '#d38385',
      boxShadow: '0 4px 10px 0 rgba(0,0,0,.25)',
    }),
    ...(ownerState.completed && {
      backgroundColor:
        '#d38385',
    }),
  }));

  function ColorlibStepIcon(props) {
    const { active, completed, className } = props;

    const icons = [<PersonIcon />, <ArrowForwardIcon />, <MenuIcon />];
    return (
      <ColorlibStepIconRoot ownerState={{ completed, active }} className={className}>
        {icons[String(props.icon - 1)]}
      </ColorlibStepIconRoot>
    );
  }
  const steps = ['יצירת תפריט', 'בחירת תפריט', 'פרטי בעל האירוע'];
  // 

  const dayPropGetter = (date) => {
    //console.log('[dayPropGetter] ', date, ' day ', date.getDay());
    return {
      style: {
        backgroundColor: dayColors[date.getDay()]
      }
    };
  };

  const onSelectSlot = ({ start, end, action }) => {
    selectTimeout && window.clearTimeout(selectTimeout);

    selectTimeout = setTimeout(() => {
      console.log("onSelectSlot: ", { start, end, action });
    }, 250);
  };

  const onSelectEvent = (event) => {
    selectTimeout && window.clearTimeout(selectTimeout);

    selectTimeout = setTimeout(() => {
      console.log("onSelectEvent: ", event);
    }, 250);
    // setEvent({ ...event});
    // setDocumentDialog(true);
  };

  const onDoubleClickEvent = (event) => {
    // selectTimeout && window.clearTimeout(selectTimeout);
    console.log(event);
    let _event = { ...event };
    _event.start = new Date(_event.start);
    _event.end = new Date(_event.end);
    // selectTimeout = setTimeout(() => {
    //   console.log("onDoubleClickEvent: ", event);
    // }, 250);
    debugger
    setEvent(_event);
    setMenuType(_event.menu);
    setStep(0);
    if (!recipesToOrder.length)
      recipesToOrderService.getRecipesToOrder(event.eventId, connectedUser.managerId).then(res => dispatch({ type: 'SET_RECIPES_TO_ORDER', payload: res }));
    if (!recipesOrder.length) {
      debugger
      recipesToOrderService.getRecipes(event.eventId, connectedUser.managerId).then(res => { dispatch({ type: 'SET_RECIPES_ORDER', payload: res }); setSelectedRecipes(res); });
    }
    setProductDialog(true);
  };
  const hideDialog = () => {
    setSubmitted(false);
    setProductDialog(false);
  }

  const hideDialogDocument = () => {
    setProduceDocument(false);
    setDocumentDialog(false);
  }
  const saveEvent = () => {
    setSubmitted(true);
    //שמירת אירוע.
    let _event = { ...event };
    let _events = [...events];
    if (event.eventId) {
      const index = findIndexById(event.eventId);
      _events[index] = _event;
      debugger
      _event.nameOfEventOwner = _event.title;
      _event.startDate = new Date(_event.start.getFullYear(), _event.start.getMonth() , _event.start.getDate(),_event.start.getHours()+2, _event.start.getMinutes(), 0);
      _event.endDate = new Date(_event.end.getFullYear(), _event.end.getMonth() , _event.end.getDate(),_event.end.getHours()+2, _event.end.getMinutes(), 0);
      _event.menuId = menuType.menuId;
      debugger
      //update event
      detailsEventService.updateDetailsEvent(_event);
      //insert or update recipesToOrder
      //***************************************************************************/
      toast.current.show({ severity: 'success', summary: 'בוצע בהצלחה', detail: 'האירוע עודכן', life: 3000 });
    }
    else {
      let eventInsert = {
        NameOfEventOwner: _event.title,
        phoneNumberOfEventOwner: _event.phoneNumberOfEventOwner,
        details: _event.details,
        StartDate: _event.start,
        EndDate: _event.end,
        MenuId: menuType.menuId,
        numberOfDose: _event.numberOfDose,
        toolsType: _event.toolsType,
        isCompleted: _event.isCompleted,
        managerId: connectedUser.managerId
      }
      debugger
      //insert event
      detailsEventService.insertDetailsEvent(eventInsert);
      //insert recipeToOrder
      //**********************************************************************************/
    }
    setProductDialog(false);
  }

  const findIndexById = (id) => {
    let index = -1;
    for (let i = 0; i < events.length; i++) {
      if (events[i].eventId === id) {
        index = i;
        break;
      }
    }
    return index;
  }

  const produceDocument = () => {
    setProduceDocument(true);
    setDocumentDialog(false);
  }


  const moveEvent = ({ event, start, end, isAllDay: droppedOnAllDaySlot }) => {
    let allDay = event.allDay;

    if (!event.allDay && droppedOnAllDaySlot) {
      allDay = true;
    } else if (event.allDay && !droppedOnAllDaySlot) {
      allDay = false;
    }

    const updatedEvent = {
      ...event,
      nameOfEventOwner: event.title,
      StartDate: start,
      EndDate: end
    }
    const updatedEvent1 = { ...event, start, end, allDay }

    dispatch({ type: 'UPDATE_EVENT', payload: updatedEvent1 });
    detailsEventService.updateDetailsEvent(updatedEvent);
    // alert(`${event.title} was dropped onto ${updatedEvent.start}`)
  };

  const resizeEvent = ({ event, start, end }) => {
    // setEvents((prevEvents) => {
    //   const filtered = prevEvents.filter((it) => it.id !== event.id);
    //   return [...filtered, { ...event, start, end }];
    // });

    //alert(`${event.title} was resized to ${start}-${end}`)
  };

  const onKeyPressEvent = ({ event, ...other }) => {
    console.log("[onKeyPressEvent] - event", event);
    console.log("[onKeyPressEvent] - other", other);
  };

  const onDragStart = ({ event, action }) => {
    const { id } = event;
    if (id === 5) {
      return false;
    }
    //console.log(`onDragStart: ${action}`, event);
  };
  const onClickEvent = (event) => {
    debugger
    setEvent({ ...event });
    setDocumentDialog(true);
  }

  const onSelecting = (range) => {
    console.log("[onSelecting] range: ", range);
  };

  const openNew = () => {
    setEvent(eventEmpty);
    setStep(0);
    setSubmitted(false);
    setProductDialog(true);
  }
  const onChangeDate = (e) => {
    debugger
    let val = (e.target && e.target.value) || '';
    let _event = { ...event };
    let _val = val;
    let ezerStart = _event.start;
    _event.start = new Date(_val.getFullYear(), _val.getMonth() , _val.getDate(),ezerStart.getHours(), ezerStart.getMinutes(), 0);
    let ezerEnd = _event.end;
    _event.end = new Date(_val.getFullYear(), _val.getMonth() , _val.getDate(),ezerEnd.getHours(), ezerEnd.getMinutes(), 0);
    console.log('date', _event.start);
    setEvent(_event);
  }

  const onChangeTimeStart = (e) => {
    debugger
    let val = (e.target && e.target.value) || 0;
    let _event = { ...event };
    debugger
    console.log('before start', _event.start);
    _event.start = val;
    // setDateStart(val.getTime());
    console.log('after start', _event.start);
    setEvent(_event);
  }

  const onChangeTimeEnd = (e) => {
    let val = (e.target && e.target.value) || 0;
    let _event = { ...event };
    console.log('before end', _event.end);
    _event.end = val;
    // setDateEnd(val.getTime());
    console.log('after end', _event.end);
    setEvent(_event);
  }
  const onInputChange = (e, name) => {
    const val = (e.target && e.target.value) || '';
    let _event = { ...event };
    _event[`${name}`] = val;

    setEvent(_event);
  }

  const onInputNumberChange = (e, name) => {
    const val = (e.target && e.target.value) || 0;
    let _event = { ...event };
    _event[`${name}`] = val;

    setEvent(_event);
}

  const exportCSV = () => {
    dt.current.exportCSV();
  }
  const productDialogFooter = () => (
    <React.Fragment>
      {
        step == 0 ?
          (<div style={{ textAlign: 'left' }}>
            <Button icon="pi pi-angle-right" label="חזור" className="p-button-text" onClick={(e) => setStep(0)} />
            <Button label="הבא" icon="pi pi-angle-left" className="p-button-text" onClick={(e) => setStep(1)} />
          </div>) :
          step == 1 ?
            (<div style={{ textAlign: 'left' }}>
              <Button icon="pi pi-angle-right" label="חזור" className="p-button-text" onClick={(e) => setStep(0)} />
              <Button label="הבא" icon="pi pi-angle-left" className="p-button-text" onClick={(e) => setStep(2)} />
            </div>) :
            step == 2 ?
              (<div style={{ textAlign: 'left' }}>
                <Button icon="pi pi-angle-right" label="חזור" className="p-button-text" onClick={(e) => setStep(1)} />
                <Button label="שמור" icon="pi pi-check" className="p-button-text" onClick={saveEvent} />
                <Button label="ביטול" icon="pi pi-times" className="p-button-text" onClick={hideDialog} />
              </div>) : ''
      }
    </React.Fragment>
  );

  const documentDialogFooter = () => (
    <React.Fragment>
      {/* <Button label="הפק מסמך" icon="pi pi-check" className="p-button-text" onClick={produceDocument} /> */}
      <Button label="Export" icon="pi pi-upload" className="p-button-help" onClick={exportCSV} />
    </React.Fragment>
  );
  
  return (
    <>
      <Toast ref={toast} />
      <div className="App" style={{ height: "100vh" }}>
        <CalendarBig
          {...{
            events,
            date,
            onNavigate,
            view,
            onView,
            onSelectSlot,
            onSelectEvent,
            onSelecting,
            onDoubleClickEvent,
            onKeyPressEvent,
            dayPropGetter
          }}
          onView={(name) => {
            if (name === "addEvent") {
              setEvent(eventEmpty);
              setStep(0);
              setSubmitted(false);
              setProductDialog(true);
            }
            else {
              onView(name);
            }
          }}
          onEventDrop={moveEvent}
          // onEventResize={resizeEvent}
          getNow={now}
          {...accessors}
          selectable="ignoreEvents"
        />
      </div>
      <Dialog visible={productDialog} style={{ width: '450px' }} header="פרטי אירוע" modal className="p-fluid" footer={productDialogFooter} onHide={hideDialog}>
        {/* <div className="p-field p-col-12 p-md-4 p-as-center"> */}
        {/* <label htmlFor="time24">בחר תאריך לאירוע</label><br/>
                            <Calendar id="time24" value={date8} onChange={(e) => setDate8(e.value)} showTime/> */}
        <Stack sx={{ width: '100%', direction: 'ltr' }} spacing={4}>
          <Stepper alternativeLabel activeStep={step} connector={<ColorlibConnector />}>
            {steps.map((label, index) => (
              <Step key={label}>
                <StepLabel StepIconComponent={ColorlibStepIcon}> </StepLabel>
              </Step>
            ))}
          </Stepper>
        </Stack>
        {
          step == 0 ? (
            <div><div className="p-field" style={{ direction: 'ltr' }}>
              <Calendar id="basic" value={event.start} onChange={(e) => onChangeDate(e)} showIcon dateFormat="dd/mm/yy" />
            </div>
              <div className="p-formgrid p-grid">
                <div className="p-field p-col-6">
                  <label htmlFor="startTime">שעת התחלה:</label>
                  <Calendar id="startTime" value={event.start} onChange={(e) => onChangeTimeStart(e)} showTime timeOnly readOnlyInput />
                </div>
                <div className="p-field p-col-6">
                  <label htmlFor="endTime">שעת סיום:</label>
                  <Calendar id="endTime" value={event.end} onChange={(e) => onChangeTimeEnd(e)} showTime timeOnly readOnlyInput />
                </div>
              </div>
              <div className="p-formgrid p-grid">
                <label htmlFor="nameOfEventOwner">שם בעל האירוע:</label>
                <InputText id="name" value={event.title} onChange={(e) => onInputChange(e, 'title')}/>
              </div>
              <div className="p-formgrid p-grid">
                <label htmlFor="phoneNumberOfEventOwner">מספר טלפון:</label>
                <InputText id="phoneNumberOfEventOwner" value={event.phoneNumberOfEventOwner} onChange={(e) => onInputNumberChange(e,'phoneNumberOfEventOwner')}/>
              </div>
            </div>) :
            (step == 1) ? (
              <div>
                <div className="p-formgrid p-grid">
                  <div className="p-field p-col-6">
                    <label htmlFor="numberOfDose">מספר מנות:</label>
                    <InputText id="numberOfDose" value={event.numberOfDose} onChange={(e) => onInputNumberChange(e,'numberOfDose')}/>
                  </div>
                  <div className="p-field p-col-6">
                    <label htmlFor="menu">בחר תפריט:</label>
                    <RecipesDropdown id="menu" type="menu" menuType={event.menu} setMenu={setMenuType} />
                  </div>
                </div>
                <div className="p-field">
                  <label htmlFor="details">הערות ודברים חשובים לאירוע</label>
                  <InputTextarea id="details" value={event.details} onChange={(e) => onInputChange(e, 'details')} required rows={3} cols={20} />
                </div>
              </div>
            ) :
              (step == 2 && menuType.menuId == 1) ?
                doseTypes.map((doseType, index) => {
                  let _recipesByDoseType = recipes.filter((recipe) => recipe.menuId === menuType.menuId && recipe.doseTypeId === doseType.doseTypeId);
                  debugger
                  return (
                    <div className="p-field" key={doseType.doseTypeId}>
                      <label className="p-mb-3"><b>{doseType.doseName}</b></label>
                      <div className="p-formgrid p-grid">
                        {
                          _recipesByDoseType.map((recipe) => {
                            debugger
                            return (
                              <div key={recipe.recipesId} className="p-field-checkbox p-col-6">
                                {/* <Checkbox inputId={recipe.recipesId} name="recipe" value={recipe} onChange={(e) => onRecipeChange(e)} checked={selectedRecipes ? selectedRecipes.some((item) => item.recipesId === recipe.recipesId) : false} /> */}
                                <div className="p-col-4">
                                    <InputNumber id="amountToRecipe" value={0}/>
                                </div>
                                <label htmlFor={recipe.recipesId}>{recipe.name}</label>
                              </div>
                            )
                          })
                        }
                        {/* <RecipesDropdown type="eventMenu" eventMenu={null} recipesOfDoseType={_recipesByDoseType} setEventMenu={setEventMenu}/> */}
                      </div></div>);
                  // console.log(_recipesByDoseType);
                }
                ) : ''
        }
      </Dialog>
    </>
  );
}

export default EventsCalendar;
