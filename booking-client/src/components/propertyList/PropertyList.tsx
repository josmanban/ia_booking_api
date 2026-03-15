'use client';
import { Typography } from "@mui/material";
import PropertyTable from "@/src/components/propertyTable/PropertyTable";
import PropertyListCards from "@/src/components/propertyListCards/PropertyList";
import PropertyFilters from "@/src/components/propertyFilters/PropertyFilters";

import useProperty from "@/src/hooks/useProperty";
import { useEffect, useState, useContext } from "react";
import GlobalContext from "@/src/contexts/GlobalContext";
import PropertyPaginator from "@/src/components/propertyPaginator/PropertyPaginator";
import { PropertyPaginationResponse } from "@/src/services/PropertyService";
import { Filters } from "@/src/components/propertyFilters/PropertyFilters";

import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';

import { useRouter } from 'next/navigation';
import { Property } from "@/src/models/Property";
import {Skeleton} from "@mui/material";


export default function PropertyList(){
    const { listProperties, deleteProperty } = useProperty();
    const { setToastProps } = useContext(GlobalContext);
    const [properties, setProperties] = useState<Array<Property>>([]);
    const [filters, setFilters] = useState<Filters>({});
    const [currentPage, setCurrentPage] = useState<number>(1);
    const itemsPerPage = 10;
    const [totalItems, setTotalItems] = useState<number>(0);
    
    const [isLoading, setIsLoading] = useState<boolean>(false);

    const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);

    const [selectedId, setSelectedId] = useState<number | null>(null);

    const router = useRouter();


    const handleDelete = (id: number) => {
        setSelectedId(id);
        setDeleteDialogOpen(true);
    };

    const confirmDelete = async () => {
        setDeleteDialogOpen(false);
        if(selectedId){
            try{
                await deleteProperty(selectedId);
                setToastProps({
                    message: "Property deleted successfully",
                    severity: "success"
                });
                if(currentPage == 1){
                    reloadData();
                }else{
                    setCurrentPage(1);
                }
            }catch(error){
                setToastProps({
                    message: "Error deleting property",
                    severity: "error"
                });
            }finally{
                setSelectedId(null);
            }
        }
    }

    

    const handleEdit = (id: number) => {
        router.push(`/update-property/${id}`);
    };

    const handleView = (id: number) => {
        router.push(`/view-property/${id}`);
    };
    

    const reloadData = async () => {
        try{
            setIsLoading(true);
            const paginationData: PropertyPaginationResponse = await listProperties(
                currentPage,filters.search);
            setProperties(paginationData.results);
            setTotalItems(paginationData.count);            
        } catch (error) {
            setToastProps({
                message: "Error loading properties",
                severity: "error"
            });
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        reloadData();
    }, [currentPage, filters]);

    return (
        <>            
            <PropertyFilters 
                onFilter={setFilters}
                isLoading={isLoading}
            />
            {isLoading ? (
                <>
                <Skeleton variant="rectangular" height={65} sx={{ m: 1 }} />
                <Skeleton variant="rectangular" height={65} sx={{ m: 1 }} />
                <Skeleton variant="rectangular" height={65} sx={{ m: 1 }} />
                <Skeleton variant="rectangular" height={65} sx={{ m: 1 }} />
                <Skeleton variant="rectangular" height={65} sx={{ m: 1 }} />
                <Skeleton variant="rectangular" height={65} sx={{ m: 1 }} />
                <Skeleton variant="rectangular" height={65} sx={{ m: 1 }} />
                <Skeleton variant="rectangular" height={65} sx={{ m: 1 }} />
                <Skeleton variant="rectangular" height={65} sx={{ m: 1 }} />
                <Skeleton variant="rectangular" height={65} sx={{ m: 1 }} />
                </>
            ) : (
                <>
                    <PropertyListCards properties={properties} onDelete={handleDelete} onEdit={handleEdit} onView={handleView}/>
                    <PropertyPaginator
                        totalItems={totalItems}
                        itemsPerPage={itemsPerPage} 
                        currentPage={currentPage}
                        onPageChange={setCurrentPage} 
                    />
                </>
            )}

            <Dialog open={deleteDialogOpen} onClose={() => setDeleteDialogOpen(false)}>
                <DialogTitle>Confirm Delete</DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        Are you sure you want to delete this property?
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={() => setDeleteDialogOpen(false)}>Cancel</Button>
                    <Button onClick={confirmDelete} color="error">Delete</Button>
                </DialogActions>    
            </Dialog>
        </>
    );
}