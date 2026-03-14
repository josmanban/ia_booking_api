'use client'
import { Pagination } from '@mui/material';

export default function PropertyPaginator(
    props: {
        totalItems: number;
        itemsPerPage: number;
        currentPage: number;
        onPageChange: (page: number) => void;
    }
){
    
    return(
        <Pagination 
            count={Math.ceil(props.totalItems / props.itemsPerPage)} 
            page={props.currentPage} 
            onChange={(e, page) => props.onPageChange(page)}
        />
    );
}