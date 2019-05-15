export const toUpper = (v, prev) => {
    if (v === prev) {
        return v;
    }
    return v && v.charAt(0).toUpperCase() + v.slice(1);
};

export const urlToList = url => {
    if (url) {
        const urlList = url.split('/').filter(i => i);
        return urlList.map((urlItem, index) => `/${urlList.slice(0, index + 1).join('/')}`);
    }
};

export const isEmpty = obj => {
    for (var key in obj) {
        if (obj.hasOwnProperty(key)) return false;
    }
    return true;
};

export const isDuplicate = (array, title) => {
    return array.some(el => el.title === title);
};

export const exactMatchByKey = (key, myArray) => {
    if (myArray) {
        for (var i = 0; i < myArray.length; i++) {
            if (myArray[i].key === key) {
                return myArray[i];
            }
        }
    }
};

export const matchBySearchKey = (key, arrayItems) => {
    if (arrayItems) {
        const currentList = arrayItems.filter(function(item) {
            return item.searchKey.toLowerCase().search(key.toLowerCase()) !== -1;
        });
        return currentList;
    }
    return;
};

export const paymentMethodTitle = paymentCode => {
    switch (paymentCode) {
        case 'C':
            return 'Cash';

        case 'B':
            return 'Account';

        case 'I':
            return 'Instant Deposit';

        default:
            return null;
    }
};

export const getDate = () => {
    let date = new Date().toLocaleDateString();
    let d = new Date(date),
        month = '' + (d.getMonth() + 1),
        day = '' + d.getDate(),
        year = d.getFullYear();

    if (month.length < 2) month = '0' + month;
    if (day.length < 2) day = '0' + day;

    return [year, month, day].join('-');
};

export const getTime = () => {
    let time = new Date().toLocaleTimeString('en-US', {
        hour12: false,
        hour: 'numeric',
        minute: 'numeric',
        second: 'numeric',
    });
    time = time.split(':');
    time = time.join('');
    return time;
};
