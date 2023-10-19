import React, { ChangeEvent, FC, useContext, useState } from 'react';
import {
    Box,
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    Button,
    TextField,
    FormControl,
    FormLabel,
    RadioGroup,
    FormControlLabel,
    Radio,
    IconButton,
} from '@mui/material';
import SaveOutlinedIcon from '@mui/icons-material/SaveOutlined';
import DeleteOutlinedIcon from '@mui/icons-material/DeleteOutlined';
import { Entry, EntryStatus } from '../interfaces';
import { EntriesContext } from '../context/entries';
import { dateFunctions } from '../utils';
import { useConfirm } from 'material-ui-confirm';
import { useFormik } from 'formik';
import * as yup from 'yup';
import Slide from '@mui/material/Slide';
import { TransitionProps } from '@mui/material/transitions';

const Transition = React.forwardRef(function Transition(
    props: TransitionProps & {
        children: React.ReactElement<any, any>;
    },
    ref: React.Ref<unknown>,
) {
    return <Slide direction="up" ref={ref} {...props} />;
});

const validationSchema = yup.object({
    title: yup
        .string()
        .required( 'Name is required' ),
    description: yup
        .string()
        .required( 'Description is required' )
});

const validStatus: EntryStatus[] = [ 'pending', 'in-progress', 'finished' ];

interface Props {
    entry: Entry;
    open: boolean;
    onClose: () => void;
}

const EntryEditModal: FC<Props> = ({ entry, open, onClose }) => {
    const { updateEntry } = useContext(EntriesContext);
    const { deleteEntry } = useContext(EntriesContext);

    const formik = useFormik({

        initialValues: {
            title: entry.title,
            description: entry.description,
        },

        validationSchema: validationSchema,

        onSubmit: ( values ) => {

            const updatedEntry: Entry = {
                ...entry,
                title: values.title,
                description: values.description,
                status: status
            };
            updateEntry( updatedEntry );
            onClose();
        },
        
    });

    const [status, setStatus] = useState<EntryStatus>(entry.status);

    const confirm = useConfirm();

    const onStatusChanged = (event: ChangeEvent<HTMLInputElement>) => {
        setStatus(event.target.value as EntryStatus);
    };

    const onDelete = () => {
        confirm({ description: `This will permanently delete ${entry.description}.` })
        .then(() => deleteEntry(entry._id))
        .catch(() => console.log("Deletion cancelled."));
    };

    const handleReset = () => {
        onClose();
        formik.resetForm();
    };

    return (
        <Dialog
            TransitionComponent={Transition}
            open={open}
            onClose={onClose}
            transitionDuration={300}
            PaperProps={{
                sx: {
                    width: '100%',
                }
            }}
        >
            <DialogTitle>{`Entry: ${ formik.values.title }`}</DialogTitle>
            <DialogContent>
                {`Created ${dateFunctions.getFormatDistanceToNow(entry.createdAt)}`}
                <form onSubmit={ formik.handleSubmit }>
                    <Box sx={{ marginY: 2 }}>
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
                    <Box sx={{ marginY: 2 }}>
                        <FormControl sx={{ marginBottom: 1, display: 'flex' }}>
                            <FormLabel>Status:</FormLabel>
                            <RadioGroup row value={status} onChange={onStatusChanged}>
                                {validStatus.map(option => (
                                    <FormControlLabel key={option} value={option} control={<Radio />} label={option} />
                                ))}
                            </RadioGroup>
                        </FormControl>
                        <Button variant='contained' endIcon={<SaveOutlinedIcon />} type="submit" fullWidth>
                            Save
                        </Button>
                    </Box> 
                </form>
            </DialogContent>
            <DialogActions>
                <Button  onClick={ handleReset } color="primary">
                    Cancel
                </Button>
            </DialogActions>
            <IconButton onClick={onDelete} sx={{
                backgroundColor: 'error.dark',
                position: 'fixed',
                bottom: 30,
                right: 30,
                height: 48,
                width: 48
            }}>
                <DeleteOutlinedIcon fontSize='medium' />
            </IconButton>
        </Dialog>
    );
};

export default EntryEditModal;