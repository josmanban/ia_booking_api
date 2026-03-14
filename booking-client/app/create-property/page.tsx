'use client';
import { Typography } from "@mui/material";
import PropertySaveForm from "@/src/components/propertySaveForm/PropertySaveForm";
export default function CreateProperty(){
    return (
        <>
        <Typography variant="h5">Crear Propiedad</Typography>
        <PropertySaveForm />
        </>
    );
}