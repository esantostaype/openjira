import { ChangeEvent, useContext, useState } from 'react';
import { Box, Button, TextField } from '@mui/material';
import SaveOutlinedIcon from '@mui/icons-material/SaveOutlined';
import AddIcon from '@mui/icons-material/AddCircleOutlineOutlined';
import { EntriesContext } from '../context/entries';
import { UIContext } from '../context/ui';

export const NewEntry = () => {

    const { addNewEntry } = useContext( EntriesContext );

    const { isAddingEntry, setIsAddingEntry } = useContext( UIContext );

    const [ inputValue , setInputValue ] = useState( '' );
    const [ touched , setTouched ] = useState( false );

    const onTextFieldChanges = ( event: ChangeEvent<HTMLInputElement> ) => {
        setInputValue( event.target.value );
    }

    const onSave = () => {
        if ( inputValue.length === 0 ) return;
        addNewEntry( inputValue );
        setIsAddingEntry( false );
        setInputValue( '' );
        setTouched( false );
    }

    const onCancel = () => {
        setIsAddingEntry( false );
        setTouched( false );
    }

    return (
        <Box sx={{ paddingX: 2, paddingTop: 2 }}>
            {
                isAddingEntry
                ? (
                    <>
                    <Box>
                        <TextField
                            fullWidth
                            sx={{ marginBottom: 1 }}
                            placeholder='New Entry'
                            autoFocus
                            multiline
                            label='New Entry'
                            size="small"
                            helperText={ inputValue.length <= 0 && touched && 'Enter a Value' }
                            error={ inputValue.length <= 0 && touched }
                            value={ inputValue }
                            onChange={ onTextFieldChanges }
                            onBlur={ () => setTouched( true ) }
                        />
                    </Box> 
                    <Box display='flex' justifyContent='space-between'>
                        <Button variant='text' onClick={ onCancel }>
                            Cancelar
                        </Button>
                        <Button variant='outlined' endIcon={ <SaveOutlinedIcon /> } onClick={ onSave } >
                            Save
                        </Button>
                    </Box>
                    </>
                )
                
                : (
                    <Button variant='contained' startIcon={ <AddIcon /> } onClick={() => setIsAddingEntry( true ) }>
                        Add New Task
                    </Button>                
                )
            }
        </Box>
    )
}