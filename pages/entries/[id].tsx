import { ChangeEvent, useState, useMemo, FC, useContext } from 'react';
import { Layout } from '../../layouts';
import { Card, CardHeader, CardContent, capitalize, Grid, TextField, CardActions, Button, FormControl, FormLabel, RadioGroup, FormControlLabel, Radio, IconButton } from '@mui/material';
import SaveOutlinedIcon from '@mui/icons-material/SaveOutlined';
import DeleteOutlinedIcon from '@mui/icons-material/DeleteOutlined';
import { Entry, EntryStatus } from '../../interfaces';
import { GetServerSideProps } from 'next';
import { dbEntries } from '../../database';
import { EntriesContext } from '../../context/entries';

const validStatus: EntryStatus[] = [ 'pending', 'in-progress', 'finished' ];

interface Props {
    entry: Entry
}

export const EntryPage:FC<Props> = ({ entry }) => {

    const { updateEntry } = useContext( EntriesContext )

    const [ inputValue , setInputValue ] = useState( entry.description );
    const [ status, setStatus ] = useState<EntryStatus>( entry.status );
    const [ touched, setTouched ] = useState( false );

    const isNotValid = useMemo(() => inputValue.length <= 0 && touched, [ inputValue, touched ])

    const onTextFieldChanges = ( event: ChangeEvent<HTMLInputElement> ) => {
        setInputValue( event.target.value );
    }

    const onStatusChanged = ( event: ChangeEvent<HTMLInputElement> ) => {
        setStatus( event.target.value as EntryStatus );
    }

    const onSave = () => {
        if ( inputValue.trim().length === 0 ) return;
        
        const updatedEntry: Entry = {
            ...entry,
            status,
            description: inputValue
        }

        updateEntry( updatedEntry );
    }

    // const onCancel = () => {
    //     setInputValue( '' );
    //     setStatus( 'pending' );
    //     setTouched( false );
    // }

    return (
        <Layout title={ inputValue.substring( 0,20 ) + '...' }>
            <Grid
                container
                justifyContent='center'
                sx={{ marginTop: 2 }}
            >
                <Grid item xs={ 12 } sm={ 8 } md={ 6 }>
                    <Card sx={{ position: 'relative' }} variant="outlined">
                        <CardHeader
                            title={`Entry: ${ inputValue }`} subheader={ `Created 5 minutes ago` } sx={{ padding: 3 }}
                        />
                        <CardContent sx={{ padding: 3 }}>
                            <TextField
                                fullWidth
                                placeholder="New Entry"
                                autoFocus
                                multiline
                                helperText={ isNotValid && 'Enter a Value' }
                                error={ isNotValid }
                                label="New Entry"
                                value={ inputValue }
                                onChange={ onTextFieldChanges }
                                onBlur={ () => setTouched( true ) }
                            />
                            <FormControl sx={{ marginTop: 2 }}>
                                <FormLabel>Status:</FormLabel>
                                <RadioGroup row value={ status } onChange={ onStatusChanged }>
                                    {
                                        validStatus.map( option => (
                                            <FormControlLabel key={ option } value={ option } control={ <Radio/> } label={ capitalize( option ) }  />
                                        ) )
                                    }
                                </RadioGroup>
                            </FormControl>
                        </CardContent>
                        <CardActions sx={{ display: 'flex', justifyContent: 'space-between', padding: 3 }}>
                            {/* <Button variant='outlined' fullWidth onClick={ onCancel } disabled={ inputValue.length <= 0 }>
                                Cancel
                            </Button> */}
                            <Button variant='contained' endIcon={ <SaveOutlinedIcon /> } fullWidth onClick={ onSave } disabled={ inputValue.length <= 0 } >
                                Save
                            </Button>
                        </CardActions>
                    </Card>
                </Grid>
            </Grid>  
            <IconButton sx={{
                backgroundColor: 'error.dark',
                position: 'fixed',
                bottom: 30,
                right: 30,
                height: 48,
                width: 48
            }}>
                <DeleteOutlinedIcon fontSize='medium' />
            </IconButton>          
        </Layout>
    )
}

export const getServerSideProps: GetServerSideProps = async({ params }) => {
    
    const { id } = params as { id: string };

    const entry = await dbEntries.getEntryById( id );

    if( !entry ){
        return {
            redirect: {
                destination: '/',
                permanent: false
            }
        }
    }

    return {
        props: {
            entry
        }
    }
}

export default EntryPage;