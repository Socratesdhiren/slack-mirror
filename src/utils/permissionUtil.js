import { getLocalStorage } from '../utils/storageUtil';

export let isAllowed = itemPermission => {
    const userPermission = getLocalStorage('ct-permission');

    // console.log("itemPermission", itemPermission);
    // console.log("userPermission", userPermission);

    let isPermission = false;
    if (Array.isArray(userPermission)) {
        itemPermission &&
        itemPermission.forEach((value, index, array) => {
            if (userPermission.includes(value)) {
                isPermission = true;
            }
        });
    }
    return isPermission;
};
