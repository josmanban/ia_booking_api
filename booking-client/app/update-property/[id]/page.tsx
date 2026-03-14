'use client';
import {useState, useEffect} from "react";
import PropertySaveForm from "@/src/components/propertySaveForm/PropertySaveForm";
import useProperty from "@/src/hooks/useProperty";
import {Property} from "@/src/models/Property";
import HttpError from "@/src/services/HttpError";
import { useContext } from "react";
import GlobalContext from "@/src/contexts/GlobalContext";
import { Typography } from "@mui/material";
import { useParams } from 'next/navigation';

export default function UpdateAutopart(
){
    const params = useParams();
    const {id} = params;
    const { getProperty } = useProperty();
    const [property, setProperty] = useState<Property | null>(null);

    const { setToastProps } = useContext(GlobalContext);

    useEffect(() => {
        const fetchData = async () => {
            try{
                const data =  await getProperty(id as unknown as number);               
                setProperty(data);
            }catch(error){
                if(error instanceof HttpError){
                    setToastProps({
                        open: true,
                        message: `Error fetching property: ${error.message}`,
                        severity: "error",
                        setProps: setToastProps
                    });
                }else{
                    setToastProps({
                        open: true,
                        message: `Unexpected error fetching property`,
                        severity: "error",
                        setProps: setToastProps
                    });
                }
            }
        }
        if(id){
            fetchData();
        }
    }, [id]);

    return(
    <>
        <Typography variant="h5">Actualizar Propiedad {id} </Typography>
        {property && <PropertySaveForm initialData={property}/>}
    </>
    );
}