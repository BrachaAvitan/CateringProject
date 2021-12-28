import React, { useEffect , useState} from 'react';
import TimeGrid from "react-big-calendar/lib/TimeGrid";

const AddEvent = () =>{
    useEffect(()=>{
        alert("gggggggg");
    },[]);
    const [productDialog, setProductDialog] = useState(false);
    const [submitted, setSubmitted] = useState(false);

    const hideDialog = () => {
        setSubmitted(false);
        setProductDialog(false);
    }
    
    // const productDialogFooter = (
    //     <React.Fragment>
    //         <Button label="ביטול" icon="pi pi-times" className="p-button-text" onClick={hideDialog} />
    //         <Button label="שמור" icon="pi pi-check" className="p-button-text" onClick={saveProduct} />
    //     </React.Fragment>
    // );

   return(
       <>
</>
   );
}
export default AddEvent;