'use client'

import {PropertyPaginationResponse} from "../services/PropertyService";
import PropertyService from "../services/PropertyService";
import { Property } from "../models/Property";

const useProperty = () => {
    const service = PropertyService();

    const getProperty = async (id: number): Promise<Property> => {
        return await service.getProperty(id);
    }

    const listProperties = async (page?: number, search?: string): Promise<PropertyPaginationResponse> => {
        return await service.listProperties(page, search);
    }

    const createProperty = async (autoPart: Property): Promise<Property> => {
        return await service.createProperty(autoPart);
    }

    const updateProperty = async (id: number, autoPart: Property): Promise<Property> => {
        return await service.updateProperty(id, autoPart);
    }

    const deleteProperty = async (id: number): Promise<void> => {
        await service.deleteProperty(id);
    }   

    return {
        getProperty,
        listProperties,
        createProperty,
        updateProperty,
        deleteProperty,        
    }
}

export default useProperty;