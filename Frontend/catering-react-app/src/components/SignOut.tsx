import React, { useState } from 'react';
import { Button } from 'primereact/button';
import { Dialog } from 'primereact/dialog';
import { Cookie } from '../Cookies';

const SignOut = (props: any) => {
    const [showMessage, setShowMessage] = useState(true);
    const history = props.history;
    const cookie = new Cookie();

    const onSignOut = () => {
        setShowMessage(false);
        cookie.deleteCookie("userId");
        cookie.deleteCookie("userName");
        cookie.deleteCookie("userPassword");
        history.push('/SiginIn');
    }

    const onCancelSignOut = () => {
        setShowMessage(false);
        debugger
        if(history.location.pathname === '/SignOut')
            history.push('/');
        else
            history.push(`/${history.location.pathname.split('/')[1]}`);
    }

    const dialogFooter = (
        <div className="p-d-flex p-jc-center">
            <Button label="אישור" className="p-button-text" autoFocus onClick={() => onSignOut()} />
            <Button label="ביטול" className="p-button-text" autoFocus onClick={() => onCancelSignOut()} />
        </div>
    )
    return (
        //הקפצת שאלה האם הוא בטוח שהוא רוצה להתנתק?
        //אם כן מתנתקים ומנקים את קבצי הקוקיז
        //להעביר לדף התחברות
        <>
            <Dialog visible={showMessage} onHide={() => setShowMessage(false)} position="top" footer={dialogFooter} showHeader={false} breakpoints={{ '960px': '80vw' }} style={{ width: '30vw' }}>
                <div className="p-d-flex p-ai-center p-dir-col p-pt-6 p-px-3">
                    <i className="pi pi-warning" style={{ fontSize: '5rem', color: 'red' }}></i>
                    {/* <h5>ההרשמה בוצעה בהצלחה!</h5> */}
                    <p style={{ lineHeight: 1.5, textIndent: '1rem' }}>
                        האם אתה בטוח שברצונך להתנתק מהמערכת?
                    </p>
                </div>
            </Dialog>
        </>
    );
}

export default SignOut;