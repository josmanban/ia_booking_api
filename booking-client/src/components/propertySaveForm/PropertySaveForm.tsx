'use-client'

import { useEffect, useState } from 'react';
import { Property } from '@/src/models/Property';
import TypeComboBox from '../TypeComboBox/TypeComboBox';
import { TextField, Button, SelectChangeEvent, Grid } from '@mui/material';
import useProperty from '@/src/hooks/useProperty';
import HttpError from '@/src/services/HttpError';
import { useContext } from 'react';
import GlobalContext from '@/src/contexts/GlobalContext';
import { init } from 'next/dist/compiled/webpack/webpack';
import OperationComboBox from '../OperationComboBox/OperationComboBox';

interface Errors {
    room_count?: string[];    
    bathroom_count?: string[];
    type?: string[];
    price?: string[];
    address?: string[];
    operation?: string[];
}

interface Validator {
    validate: (value: any) => boolean;
    message: string;
}

const validators = {
    room_count: [
        {
            validate: (value: string) => value !== '', 
            message: 'Room count is required'
        },
        {
            validate: (value: number) => value >= 0, 
            message: 'Room count must be non-negative'
        }
    ],
    bathroom_count: [
        {
            validate: (value: string) => value !== '', 
            message: 'Bathroom count is required'
        },
        {
            validate: (value: number) => value >= 0, 
            message: 'Bathroom count must be non-negative'
        }
    ],
    city: [
        {
            validate: (value: string) => value.trim() !== '', 
            message: 'City is required'
        }
    ],
    address: [
        {
            validate: (value: string) => value.trim() !== '', 
            message: 'Address is required'
        }
    ],
    price: [
        {
            validate: (value: string) => value !== '', 
            message: 'Price is required'
        },
        {
            validate: (value: number) => value >= 0, 
            message: 'Price must be non-negative'
        }
    ],    
    type: [
        {
            validate: (value: any) => value !== undefined && value !== null && value !== '', 
            message: 'Type is required'
        }
    ],
    operation: [
        {
            validate: (value: any) => value !== undefined && value !== null && value !== '', 
            message: 'Operation is required'
        }
    ],  
}


export default function PropertySaveForm(
    props: {
        onSubmit?: (property: Property) => void;
        initialData?: Property;
    }
){
    const { createProperty, updateProperty } = useProperty();
    const { setToastProps } = useContext(GlobalContext);
    const [formData, setFormData] = useState<Property>({
        id: props.initialData?.id || undefined,
        room_count: props.initialData?.room_count || '',
        bathroom_count: props.initialData?.bathroom_count || '',
        type: props.initialData?.type || '',
        price: props.initialData?.price || '',
        city: props.initialData?.city || '',
        address: props.initialData?.address || '',
        operation: props.initialData?.operation || '',
    } as Property 
    );

    const [isSubmitting, setIsSubmitting] = useState<boolean>(false);

    const [errors, setErrors] = useState<any>(null);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement> | SelectChangeEvent<string>) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
        validateField(name, value);
    };

    const validateField = (name: string, value: any) => {
        const fieldValidators = (validators as any)[name] as Validator[] | undefined;
        if(!fieldValidators) return null;

        const fieldErrors: string[] = [];
        for(const validator of fieldValidators){
            if(!validator.validate(value)){
                fieldErrors.push(validator.message);
            }
        }
        if(fieldErrors.length > 0){
            setErrors((prev: any) => ({ ...prev, [name]: fieldErrors }));
        } else {
            setErrors((prev: any) => {
                const newErrors = { ...prev };
                delete newErrors[name];
                return newErrors;
            });
        }
    }

    const isValid = (formData: Property) => {
        let valid = true;
        let newErrors: any = {};
        for(const field in validators){
            const fieldValidators = (validators as any)[field] as Validator[];
            for(const validator of fieldValidators){
                if(!validator.validate((formData as any)[field])){
                    valid = false;
                    if(!newErrors[field]){
                        newErrors[field] = [];
                    }
                    newErrors[field].push(validator.message);
                }
            }
        }
        setErrors(newErrors);
        return valid;
    }

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        const successMessage = props.initialData ? 'Property updated' : 'Property created';
        const errorMessage = props.initialData ? 'Error updating property' : 'Error creating property';
        
        if(!isValid(formData)){
            setToastProps({
                open: true,
                severity: 'error',
                message: 'Please fix the errors in the form'
            });
            return;
        }
        
        
        try{
            setIsSubmitting(true);
            if(props.initialData){
                await updateProperty(props.initialData.id!, formData);
            } else {
                await createProperty(formData);
            }
            setToastProps({
                open: true,
                severity: 'success',
                message: successMessage,
            });
            props.onSubmit?.(formData);
        } catch (error){
            if(error instanceof HttpError){
                setToastProps({
                    open: true,
                    severity: 'error',
                    message: error.body?.non_field_errors ? error.body.non_field_errors.join(', ') : errorMessage
                });
                setErrors(error.body);
                return;
            }
            setToastProps({
                open: true,
                severity: 'error',
                message: errorMessage
            });
        } finally {
            setIsSubmitting(false);
        }

    }

    return (
        <Grid container spacing={2}>
        <form onSubmit={handleSubmit}>
            {props.initialData && (
            <TextField 
                label="Id" 
                name="id" 
                value={formData.id} 
                onChange={handleChange}
                helperText={errors?.id ? errors.id.join(', ') : ''}    
                error={!!errors?.id}
                disabled={true}
                fullWidth margin="normal" required />
            )}          
            <TypeComboBox 
                handleChange={handleChange} 
                selectedValue={formData.type} 
                name="type" 
                id="type" 
                hasEmptyOption
                error={!!errors?.type}
                helperText={errors?.type ? errors.type.join(', ') : ''}
            />            
            <OperationComboBox
                handleChange={handleChange} 
                selectedValue={formData.operation} 
                name="operation" 
                id="operation"
                hasEmptyOption
                error={!!errors?.operation}
                helperText={errors?.operation ? errors.operation.join(', ') : ''}
            />   
            <TextField 
                label="Precio" 
                name="price" type="number" 
                value={formData.price} 
                onChange={handleChange}
                helperText={errors?.price ? errors.price.join(', ') : ''}    
                error={!!errors?.price}
                fullWidth margin="normal" />
            <TextField 
                label="Ciudad"
                name="city" 
                value={formData.city} 
                onChange={handleChange}
                helperText={errors?.city ? errors.city.join(', ') : ''}                
                error={!!errors?.city}
                fullWidth margin="normal" />
            <TextField 
                label="Direccion"
                name="address" 
                value={formData.address} 
                onChange={handleChange}
                helperText={errors?.address ? errors.address.join(', ') : ''}                
                error={!!errors?.address}
                fullWidth margin="normal" />          
            <TextField 
                label="Numero de habitaciones" 
                name="room_count" type="number" 
                value={formData.room_count} 
                onChange={handleChange}
                helperText={errors?.room_count ? errors.room_count.join(', ') : ''}    
                error={!!errors?.room_count}
                fullWidth margin="normal" />
            <TextField 
                label="Numero de baños" 
                name="bathroom_count" type="number" 
                value={formData.bathroom_count} 
                onChange={handleChange}
                helperText={errors?.bathroom_count ? errors.bathroom_count.join(', ') : ''}    
                error={!!errors?.bathroom_count}
                fullWidth margin="normal" />
            
            
            <Button 
                type="submit" 
                variant="contained" 
                color="primary"
                disabled={isSubmitting}
                loading={isSubmitting}
                >{props.initialData ? 'Update' : 'Create'}</Button>
        </form>
        </Grid>
    )

}  