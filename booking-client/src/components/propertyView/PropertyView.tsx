'use client';

import {useState, useEffect, useContext} from "react";
import { Property } from "@/src/models/Property";
import useProperty from "@/src/hooks/useProperty";
import GlobalContext from "@/src/contexts/GlobalContext";
import { TableContainer,
    Table,
    TableHead,
    TableRow,
    TableCell,
    TableBody,
    Paper,
 } from "@mui/material";
import { get } from "http";

export default function AutoPartView(props:{
    id: number;
}){
    const { getProperty } = useProperty();
    const [property, setProperty] = useState<Property | null>(null);
    const { setToastProps } = useContext(GlobalContext);

    useEffect(() => {
        const fetchData = async () => {
            try{
                const data =  await getProperty(props.id as number);
                setProperty(data);
            }catch(error){
                setToastProps({
                    open: true,
                    message: "Error fetching property details",
                    severity: "error",
                    setProps: setToastProps
                });                
            }
        }
        if(props.id){
            fetchData();
        }
    }, [props.id]);

    const getPropertyType = (type: string | undefined) => {
        switch(type){
            case "apartment": return "DEPARTAMENTO";
            case "house": return "CASA";
            case "PH": return "PH";            
        }
    }

    return(
        <>
            <TableContainer component={Paper} sx={{ maxWidth: 600, marginTop: 2 }}>
                <Table  size="small" aria-label="property details">
                    <TableHead>
                        <TableRow><TableCell>Id</TableCell><TableCell>{property?.id}</TableCell></TableRow>
                    </TableHead>
                    <TableBody>                        
                        <TableRow><TableCell>Tipo de propiedad</TableCell><TableCell>{getPropertyType(property?.type)}</TableCell></TableRow>
                        <TableRow><TableCell>Tipo de operacion</TableCell><TableCell>{property?.operation=="RENT" ? "ALQUILER" : "VENTA"}</TableCell></TableRow>
                        <TableRow><TableCell>Precio</TableCell><TableCell>{property?.price}</TableCell></TableRow>
                        <TableRow><TableCell>Ciudad</TableCell><TableCell>{property?.city}</TableCell></TableRow>
                        <TableRow><TableCell>Direccion</TableCell><TableCell>{property?.address}</TableCell></TableRow>
                        <TableRow><TableCell>Numero de dormitorios</TableCell><TableCell>{property?.room_count}</TableCell></TableRow>
                        <TableRow><TableCell>Numero de baños</TableCell><TableCell>{property?.bathroom_count}</TableCell></TableRow>
                    </TableBody>
                </Table>
            </TableContainer>
           
        </>
    );
}