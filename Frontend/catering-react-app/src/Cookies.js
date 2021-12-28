export class Cookie {

    setCookie(name, value, days) {
        let date = new Date();
        date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
        let expires = "expires=" + date.toUTCString();
        document.cookie = name + "=" + value + ";" + expires + ";path=/";
    }

    getCookie(name) {
        let dataArr = document.cookie.split(';');
        for (let i = 0; i < dataArr.length; i++) {
            let paramDataArr = dataArr[i].split('=');
            if (paramDataArr[0].trim() === name.trim()) {
                return paramDataArr[1].trim();
            }
        }
        return "";
    }

    deleteCookie(name) {
        let date = new Date();
        console.log(date);
        date.setTime(date.getFullYear() - 100);
        let expires = "expires=" + date.toUTCString();
        document.cookie = name + "=;" + expires + ";path=/";
    }
}