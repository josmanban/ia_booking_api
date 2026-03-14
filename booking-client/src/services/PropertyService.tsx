import { PropertyUrls } from "../urls/PropertyUrls";
import RequestService from "./RequestService";
import { Property } from "../models/Property";

export interface PropertyPaginationResponse {
    results: Property[];
    count: number;
    previous: string | null;
    next: string | null;
}

export default function PropertyService() {
    const {
        createPropertyUrl,
        updatePropertyUrl,
        deletePropertyUrl,
        getPropertyUrl,
        listPropertiesUrl,        
    } = PropertyUrls();

    const {
        doGet,
        doPost,
        doPut,
        doDelete,
        doPostFormData,
    } = RequestService();

    const getProperty = async (id: number): Promise<Property> => {
        return await doGet(getPropertyUrl(id));
    }

    const listProperties = async (page?: number, search?: string): Promise<PropertyPaginationResponse> => {
        return await doGet(listPropertiesUrl(page, search));
    }

    const createProperty = async (autoPart: Property): Promise<Property> => {
        return await doPost(createPropertyUrl(), autoPart);
    }

    const updateProperty = async (id: number, autoPart: Property): Promise<Property> => {
        return await doPut(updatePropertyUrl(id), autoPart);
    }

    const deleteProperty = async (id: number): Promise<void> => {
        await doDelete(deletePropertyUrl(id));
    }
    

    return {
        getProperty,
        listProperties,
        createProperty,
        updateProperty,
        deleteProperty,
    };
}