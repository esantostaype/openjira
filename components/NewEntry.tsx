import { FC, useContext } from 'react';
import { Box, Button, TextField } from '@mui/material';
import SaveOutlinedIcon from '@mui/icons-material/SaveOutlined';
import AddIcon from '@mui/icons-material/AddCircleOutlineOutlined';
import { EntriesContext } from '../context/entries';
import { UIContext } from '../context/ui';
import { useFormik } from 'formik';
import * as yup from 'yup';
import { Entry } from '../interfaces';

const validationSchema = yup.object({
    title: yup
        .string()
        .required( 'Name is required' ),
    description: yup
        .string()
        .required( 'Description is required' )
});

interface Props {
    entry: Entry;
    open: boolean;
    onClose: () => void;
}

export const NewEntry: FC<Props> = ({ entry }) => {

    const { addNewEntry } = useContext( EntriesContext );

    const { isAddingEntry, setIsAddingEntry } = useContext( UIContext );

    const formik = useFormik({

        initialValues: {
            title: '',
            description: '',
        },

        validationSchema: validationSchema,

        onSubmit: ( values, { resetForm } ) => {
            const addedEntry: Entry = {
                ...entry,
                title: values.title,
                description: values.description
            };
            addNewEntry( addedEntry );
            setIsAddingEntry( false );
            resetForm();
        },
        
    });

    const handleReset = () => {
        setIsAddingEntry( false );
        formik.resetForm();
    };

    return (
        <Box sx={{ padding: 2, paddingBottom: 0 }}>
            {
                isAddingEntry
                ? (
                    <form onSubmit={ formik.handleSubmit}>
                        <Box>
                            <TextField
                                id="title"
                                type="text"
                                label="Title"
                                name="title"
                                size="small"
                                fullWidth
                                value={ formik.values.title }
                                onChange={ formik.handleChange }
                                onBlur={ formik.handleBlur }
                                error={ formik.touched.title && Boolean( formik.errors.title ) }
                                helperText={ formik.touched.title && formik.errors.title }
                            />
                        </Box> 
                        <Box sx={{ marginY: 2 }}>
                            <TextField
                                id="description"
                                type="text"
                                label="Description"
                                name="description"
                                size="small"
                                fullWidth
                                value={ formik.values.description}
                                onChange={ formik.handleChange}
                                onBlur={ formik.handleBlur}
                                error={ formik.touched.description && Boolean( formik.errors.description ) }
                                helperText={ formik.touched.description && formik.errors.description }
                                multiline
                                rows={4}
                            />
                        </Box> 
                        <Box display='flex' justifyContent='space-between'>
                            <Button variant='text' onClick={ handleReset }>
                                Cancelar
                            </Button>
                            <Button variant='outlined' endIcon={ <SaveOutlinedIcon /> } type="submit" >
                                Save
                            </Button>
                        </Box>
                    </form>
                )
                
                : (
                    <Box>
                        <Button variant='contained' startIcon={ <AddIcon /> } onClick={() => setIsAddingEntry( true ) }>
                            Add New Task
                        </Button>  
                    </Box>              
                )
            }
        </Box>
    )
}