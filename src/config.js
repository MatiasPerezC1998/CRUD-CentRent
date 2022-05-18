/**
* Convert object data to queryString
* @param data dato to convert
* @returns {FormData} form data
*/
export const getFormData = (data) => {
    const formData = typeof FormData === 'undefined' ? new URLSearchParams() : new FormData(); if (!data) {
        return formData;
    } Object.keys(data).forEach((key) => {
        getItemFormData(formData, key, data[key]);
    }); return formData;
};

/**
* Genera te item form data to request
* @param formData form data object
* @param name Property name
* @param data Data to request
*/
export const getItemFormData = (formData, name, data) => {
    if (data === null || data === undefined || data === '' || name === 'token') {
        return;
    } switch (typeof data) {
        case 'object':
            switch (data.constructor.name) {
                case 'Object':
                    if (data.blobId) {
                        formData.append(name, data);
                    } else {
                        Object.keys(data).forEach((key) => {
                            getItemFormData(formData, `${name}.${key}`, data[key]);
                        });
                    }
                    break;
                case 'FileList':
                    for (let item = 0; item < data.length; item += 1) {
                        formData.append(`${name}[${item}]`, data.item(item));
                    }
                    break;
                case 'Date':
                    formData.append(name, data.toJSON());
                    break;
                case 'Array':
                    if (data.length > 0 && ['File', 'Blob'].includes(data[0].constructor.name)) {
                        for (let index = 0; index < data.length; index += 1) {
                            getItemFormData(formData, `${name}`, data[index]);
                        }
                    } else {
                        for (let index = 0; index < data.length; index += 1) {
                            getItemFormData(formData, `${name}[${index}]`, data[index]);
                        }
                    }
                    break;
                default:
                    formData.append(name, data);
                    break;
            }
            break;
        default:
            formData.append(name, data);
            break;
    }
};

/**
* Generate querystring from form data
* @param formData Form data
*/
export const getQueryString = (formData) => {
    const queryStringArray = [];
    if (formData) {
        // USE IN SERVER SIDE
        if (formData.constructor.name === 'URLSearchParams') {
            // if (formData.has('token')) {
            //     formData.delete('token');
            // } 
            const query = formData.toString(); return query ? `?${query}` : '';
            // REACT NATIVE
        } else if (formData?.getParts) {
            // eslint-disable-next-line @typescript-eslint/no-unused-vars
            formData?.getParts().forEach((value, key) => {
                queryStringArray.push(`${value.fieldName}=${value.string}`);
            }); // CLIENT SIDE
        } else {
            formData.forEach((value, key) => {
                queryStringArray.push(`${key}=${value}`);
            });
        } if (queryStringArray.length > 0) {
            return `?${queryStringArray.join('&')}`;
        }
    } return '';
};