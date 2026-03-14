import React from "react";
import { Property } from "@/src/models/Property";

import { 
    Tooltip,
    IconButton
 } from "@mui/material";
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import Divider from '@mui/material/Divider';
import ListItemText from '@mui/material/ListItemText';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import Typography from '@mui/material/Typography';
import VisibilityIcon from '@mui/icons-material/Visibility';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import HouseIcon from '@mui/icons-material/House';
import ApartmentIcon from '@mui/icons-material/Apartment';
import { Icon } from '@mui/material';
import LocationOnIcon from '@mui/icons-material/LocationOn';

export default function PropertyList(props:{
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
        <List sx={{ width: '100%', bgcolor: 'background.paper' }}>
            {props.properties.map((property) => (
                <React.Fragment key={property.id}>
                    <ListItem alignItems="flex-start" > 
                        <ListItemAvatar>
                            <Icon component={property.type === "apartment" ? ApartmentIcon : property.type === "house" ? HouseIcon : ApartmentIcon} />
                        </ListItemAvatar>
                        <ListItemText
                            primary={
                            <>
                            {property.operation=="RENT" ? "ALQUILER" : "VENTA"} {getPropertyType(property.type)} 
                            <Typography
                                        sx={{ display: 'inline', marginLeft: 3 }}
                                        component="span"
                                        variant="body2"
                                        color="text.primary"                                        
                                    >
                            <LocationOnIcon sx={{ fontSize: 16, verticalAlign: 'middle'}} />
                            {property.address}, {property.city}
                            </Typography>
                            </>}
                            secondary={
                                <>
                                    <Typography
                                        sx={{ display: 'inline' }}
                                        component="span"
                                        variant="body2"
                                        color="text.primary"
                                    >
                                        {`Precio: $${property.price} - Dormitorios ${property.room_count} - Baños: ${property.bathroom_count}`}
                                    </Typography>
                                </>
                            }
                        />
                        <Tooltip title="View">
                            <IconButton onClick={() => property.id !== undefined && props.onView(property.id)}>
                                <VisibilityIcon />
                            </IconButton>
                        </Tooltip>
                        <Tooltip title="Edit">
                            <IconButton onClick={() => property.id !== undefined && props.onEdit(property.id)}>
                                <EditIcon />
                            </IconButton>
                        </Tooltip>
                        <Tooltip title="Delete">
                            <IconButton onClick={() => property.id !== undefined && props.onDelete(property.id)}>
                                <DeleteIcon />
                            </IconButton>
                        </Tooltip>
                    </ListItem>
                    <Divider variant="inset" component="li" />
                </React.Fragment>
            ))}
        </List>
        </>
    );

}