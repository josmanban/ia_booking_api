import HttpError from "./HttpError";

export default function Service(){
    const doPost = async (url: string, data: any, options?: any) => {
        const response = await fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                ...options?.headers
            },
            body: JSON.stringify(data),            
        });
        if (response.ok) {
            if (options?.responseType === 'blob') {
                return response.blob();
            }
            return response.json();
        }
        const contentType = response.headers.get("content-type");
        const body = contentType?.includes("application/json") ? await response.json() : await response.text();
        throw new HttpError(response.status, response.statusText, body);
    }

    const doPostFormData = async (url: string, formData: FormData, options?: any) => {
        const response = await fetch(url, {
            method: 'POST',
            body: formData,
            headers: {
                ...options?.headers
            },
        });
        if (response.ok) {
            if (options?.responseType === 'blob') {
                return response.blob();
            }
            return response.json();
        }
        const contentType = response.headers.get("content-type");
        const body = contentType?.includes("application/json") ? await response.json() : await response.text();
        throw new HttpError(response.status, response.statusText, body);
    }
    

    const doPut = async (url: string, data: any, options?: any) => {
        const response = await fetch(url, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                ...options?.headers
            },
            body: JSON.stringify(data),
        });
        if (response.ok) {
            return response.json();
        }
        const contentType = response.headers.get("content-type");
        const body = contentType?.includes("application/json") ? await response.json() : await response.text();
        throw new HttpError(response.status, response.statusText, body);
    }   

    const doDelete = async (url: string) => {
        const response = await fetch(url, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
            },
        });
        if (response.ok) {
            return;
        }
        const contentType = response.headers.get("content-type");
        const body = contentType?.includes("application/json") ? await response.json() : await response.text();
        throw new HttpError(response.status, response.statusText, body);
    }

    

    const doGet = async (url: string, options?: any) => {
        const response = await fetch(url, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                ...options?.headers
            },
        });
        if (response.ok) {
            if (options?.responseType === 'blob') {
                return response.blob();
            }
            return response.json();
        }
        const contentType = response.headers.get("content-type");
        const body = contentType?.includes("application/json") ? await response.json() : await response.text();
        throw new HttpError(response.status, response.statusText, body);
    }

    

    return {
        doPost,
        doGet,
        doPut,
        doDelete,
        doPostFormData,
    };
}