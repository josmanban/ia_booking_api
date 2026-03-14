import { Property } from "@/src/models/Property";

import { TableContainer,
    Table,
    TableHead,
    TableRow,
    TableCell,
    TableBody,
    Paper,
    Button,
    Tooltip,
    IconButton
 } from "@mui/material";
import CriticalStockChip from "../criticalStockChip/CriticalStockChip";
import VisibilityIcon from '@mui/icons-material/Visibility';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';

export default function PropertyTable(props:{
    properties: Property[];
    onDelete: (id: number) => void;
    onEdit: (id: number) => void;
    onView: (id: number) => void;
}){

    const getPropertyType = (type: string | undefined) => {
        switch(type){
            case "apartment": return "DEPARTAMENTO";
            case "house": return "CASA";
            case "PH": return "PH";            
        }
    }

    return (
        <>
        <TableContainer component={Paper} sx={{ maxHeight: 500 }}>
            <Table stickyHeader sx={{ minWidth: 650 }} size="small" aria-label="simple table">
                <TableHead>
                <TableRow>                    
                    <TableCell>Id</TableCell>
                    <TableCell align="right">Tipo de propiedad</TableCell>
                    <TableCell align="right">Tipo de operacion</TableCell>
                    <TableCell align="right">Precio</TableCell>
                    <TableCell align="right">Ciudad</TableCell>
                    <TableCell align="right">Direccion</TableCell>
                    <TableCell align="right">Numero de dormitorios</TableCell>
                    <TableCell align="right">Numero de baños</TableCell>
                    <TableCell align="right">Acciones</TableCell>
                </TableRow>
                </TableHead>
                <TableBody>
                    {props.properties.map((property) => (
                        <TableRow
                        key={property.id}
                        sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                        >
                        <TableCell>{property.id}</TableCell>
                        <TableCell align="right">{getPropertyType(property.type)}</TableCell>
                        <TableCell align="right">{property.operation=="RENT" ? "ALQUILER" : "VENTA"}</TableCell>
                        <TableCell align="right">{property.price}</TableCell>
                        <TableCell align="right">{property.city}</TableCell>
                        <TableCell align="right">{property.address}</TableCell>
                        <TableCell align="right">{property.room_count}</TableCell>
                        <TableCell align="right">{property.bathroom_count}</TableCell>
                        <TableCell align="right" >
                            <Tooltip title="View" placement="top">
                                <IconButton 
                                    color="primary" 
                                    size="small" 
                                    sx={{ mr: 1 }} 
                                    onClick={() => property.id !== undefined && props.onView(property.id)}>
                                    <VisibilityIcon fontSize="small" />
                                </IconButton>
                            </Tooltip>
                            <Tooltip title="Edit" placement="top">
                                <IconButton 
                                    color="primary" 
                                    size="small" 
                                    sx={{ mr: 1 }} 
                                    onClick={() => property.id !== undefined && props.onEdit(property.id)}>
                                    <EditIcon fontSize="small" />   
                                </IconButton>
                            </Tooltip>
                            <Tooltip title="Delete" placement="top">
                                <IconButton 
                                    color="secondary" 
                                    size="small" 
                                    onClick={() => property.id !== undefined && props.onDelete(property.id)}>
                                    <DeleteIcon fontSize="small" />
                                </IconButton>
                            </Tooltip>
                        </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
            </TableContainer>
        </>
    );

}