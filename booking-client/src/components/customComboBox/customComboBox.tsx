import { get } from "http";
import { useState } from "react";
import { TextField, Button, InputLabel, Select, MenuItem, FormControl,FormHelperText, SelectChangeEvent, Menu } from "@mui/material";


function CustomComboBox<T>(props: {
    options: T[];
    getOptionLabel: (option: T) => string;
    getValue: (option: T) => string | number;
    //React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement> | SelectChangeEvent<string>
    handleChange: (e: any) => void;
    label: string;
    selectedValue: string | number | undefined;
    hasEmptyOption?: boolean;
    name:string,
    id:string,
    error?: boolean;
    helperText?: string;
    fullWidth?: boolean;
    margin?: "none" | "dense" | "normal";
    sx?: any;
}) {
    const { 
        options, 
        getOptionLabel, 
        handleChange, 
        getValue, 
        label, 
        selectedValue, 
        hasEmptyOption,
        name,
        id
    } = props;

    return (
        <FormControl
            fullWidth={props.fullWidth || true}
            margin={props.margin || "normal"}
            sx={props.sx}
        >
            <InputLabel id="demo-simple-select-label">{label}</InputLabel>
            <Select
                id={id}
                name={name}                
                value={selectedValue}            
                onChange={handleChange}
                error={props.error}                
                >
                {hasEmptyOption && (<MenuItem value="">Seleccione...</MenuItem>)}
                {options.map((option, index) => (
                    <MenuItem
                        key={index}
                        value={getValue(option)}                        
                        >                        
                        {getOptionLabel(option)}
                    </MenuItem>
                ))}
            </Select>
            {props.helperText && <FormHelperText error={props.error}>{props.helperText}</FormHelperText>}
        </FormControl>
    );
}

export default CustomComboBox;