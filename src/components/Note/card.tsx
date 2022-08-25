import { CardContent, Card, Typography, CardActions, Button, IconButton } from '@mui/material';
import React, { useContext } from 'react';
import EditIcon from '@mui/icons-material/Edit';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import { Box } from '@mui/material';
import { NoteContext } from './../../store';

function NoteCard( { title, content, date, editHundle, idNote }: { title: string, content: string, date: string, editHundle: () => void, idNote: string } ) {

    const { deleteNote } = useContext(NoteContext)

    return ( 
        <Card sx={{ minWidth: 275 }}>
            <CardContent>
                <Typography variant="h5" component="div">
                    {
                        title
                    }
                </Typography>
                <Typography sx={{ mb: 1.5 }} color="text.secondary">
                    {
                        content
                    }
                </Typography>
            </CardContent>
            <CardActions style={{ display: 'flex', justifyContent: 'space-between' }} >
                <Typography variant="body1">
                    {
                        date
                    }
                </Typography>
                <Box>
                    <IconButton style={{ fontSize: "12" }} onClick={editHundle}>
                        <EditIcon fontSize='small' />
                    </IconButton>
                    <IconButton style={{ fontSize: "12" }} onClick={() => deleteNote(idNote)}>
                        <DeleteOutlineIcon fontSize='small' />
                    </IconButton>
                </Box>
            </CardActions>
            </Card>
     );
}

export default NoteCard;