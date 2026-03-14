import CustomComboBox from "../customComboBox/customComboBox"
import { SelectChangeEvent } from "@mui/material";

type OperationOption = { value: string; label: string };

function OperationComboBox(
    props: {
        handleChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement> | SelectChangeEvent<string>) => void;
        selectedValue: string | number | undefined;
        hasEmptyOption?: boolean;
        name:string;
        id:string;
        error?: boolean;
        helperText?: string;
        getOptionValue?: (option: OperationOption) => string | number;
        fullWidth?: boolean;
        margin?: "none" | "dense" | "normal";
        sx?: any;
    }
){   

    

    const operations: OperationOption[] = [
        {value: "RENT", label: "Alquilar"},
        {value: "BUY", label: "Comprar"},
    ];




    return (
        <CustomComboBox<OperationOption>
            options={operations}
            getOptionLabel={(option: OperationOption) => option.label}
            getValue={props.getOptionValue || ((option: OperationOption) => option.value)}
            handleChange={props.handleChange}
            selectedValue={props.selectedValue}
            label="Tipo de operacion"
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

OperationComboBox.prototype = {};

export default OperationComboBox;