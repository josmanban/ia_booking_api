import CustomComboBox from "../customComboBox/customComboBox"
import { SelectChangeEvent } from "@mui/material";

function TypeComboBox(
    props: {
        handleChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement> | SelectChangeEvent<string>) => void;
        selectedValue: string | number | undefined;
        hasEmptyOption?: boolean;
        name:string;
        id:string;
        error?: boolean;
        helperText?: string;
        getOptionValue?: (option: { value: string; label: string }) => string | number;
        fullWidth?: boolean;
        margin?: "none" | "dense" | "normal";
        sx?: any;
    }
){
   

    const types = [
        {value: "apartment", label: "Departamento"},
        {value: "house", label: "Casa"},
        {value: "PH", label: "PH"},
    ];    


    return (
        <CustomComboBox<{ value: string; label: string }>
            options={types}
            getOptionLabel={(option: { value: string; label: string }) => option.label}
            getValue={props.getOptionValue || ((option: { value: string; label: string }) => option.value)}
            handleChange={props.handleChange}
            selectedValue={props.selectedValue}
            label="Tipo de propiedad"
            hasEmptyOption={props.hasEmptyOption}
            name={props.name}
            id={props.id}
            error={props.error}
            helperText={props.helperText}
            fullWidth={props.fullWidth}
            margin={props.margin}
            sx={props.sx}
        />
    )
}

TypeComboBox.prototype = {};

export default TypeComboBox;