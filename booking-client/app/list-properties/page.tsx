'use client';
import { Typography } from "@mui/material";
import PropertyList from "@/src/components/propertyList/PropertyList";

export default function ListPropertiesPage(){
    return (
        <>
        <Typography variant="h4" gutterBottom>
            Listar Propiedades
        </Typography>
        <Typography variant="body1" gutterBottom>
            Aquí puedes ver todas las propiedades disponibles.
            Y buscar propiedades usando nuestro asistente IA
        </Typography>
        <PropertyList />
        </>
    );
}