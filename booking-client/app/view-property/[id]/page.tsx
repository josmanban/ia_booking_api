'use client';

import { Typography } from "@mui/material";
import { useParams } from 'next/navigation';
import PropertyView from "@/src/components/propertyView/PropertyView";

export default function ViewPropertyPage(){
    const params = useParams();
    const { id } = params;
    return(
        <div>
            <Typography variant="h4" gutterBottom>
                View Property   
            </Typography>
            <PropertyView id={id as unknown as number} />
        </div>
    );
}