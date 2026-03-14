import { AUTO_PARTS_URL } from "./urls";

const BASE_URL = AUTO_PARTS_URL+"/properties/";

export function PropertyUrls() {
  const createPropertyUrl = () => `${BASE_URL}`;
  const updatePropertyUrl = (id: number) => `${BASE_URL}${id}/`;
  const deletePropertyUrl = (id: number) => `${BASE_URL}${id}/`;
  const getPropertyUrl = (id: number) => `${BASE_URL}${id}/`;
  const listPropertiesUrl = (page?: number, search?: string) => {
    let url = BASE_URL;
    if (page !== undefined) {
      url += `?page=${page}`;
    }
    if (search !== undefined && search.trim() !== "") {
      url += `${url.includes("?") ? "&" : "?"}search=${encodeURIComponent(search)}`;
    }    
    return url;
  };

  return {
    createPropertyUrl,
    updatePropertyUrl,
    deletePropertyUrl,
    getPropertyUrl,
    listPropertiesUrl,    
  };
}