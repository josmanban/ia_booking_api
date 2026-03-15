'use client'
import { useState } from 'react';
import { TextField, Button, SelectChangeEvent, FormControlLabel, Checkbox, Box } from '@mui/material';


export interface Filters {   
    search?: string;    
}

export default function PropertyFilters(
    props: {
        onFilter: (filters: Filters) => void;
        isLoading?: boolean;
    }
){
    const [filters, setFilters] = useState<Filters>({});
    
    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement> | SelectChangeEvent<string>) => {
        const { name, value } = e.target;
        setFilters(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        props.onFilter(filters);
    };
    
    return (
        <form onSubmit={handleSubmit}>
            
            <Box sx={{ display: 'inline-flex', alignItems: 'start', mr: 1}}>
            <TextField 
            name="search" 
            label="Quiero alquilar un departamento de 2 dormitorios, con 1 baño de alrededor de 500USD en cordoba" 
            variant="outlined" 
            multiline
            minRows={4}
            maxRows={10}
            onChange={handleChange} sx={{ mr: 1, minWidth: 750 }}
            disabled={props.isLoading}
            />            
            <Button 
                type="submit" variant="contained" color="primary"                
                loading={props.isLoading}
            >Filter</Button>
                    </Box>
        </form>
    );
}