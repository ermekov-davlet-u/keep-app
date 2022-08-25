import * as React from 'react';
import { Container, Grid, Menu, MenuItem, Paper, TextField  } from "@mui/material";
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Divider from '@mui/material/Divider';
import Drawer from '@mui/material/Drawer';
import IconButton from '@mui/material/IconButton';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import SideBar from './../components/SideBar/index';
import NoteCard from './../components/Note/card';
import CreateNote from './../components/Note/CreateNote';
import { Modal } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import AddBoxIcon from '@mui/icons-material/AddBox';
import { NoteContext } from './../store';
import { INotes } from '../App';
import { useMemo } from 'react';

function Main() {
    const {notes, trash} = React.useContext(NoteContext)    
    const [ search, setSearch ] = React.useState<string>('')
    const [ createNew, setCreate ] = React.useState<boolean>(false)
    const [ open, setOpen ] = React.useState<{
        show: boolean;
        note?: INotes | null
    }>({
        show: false,
        note: null
    })
    function hundleClouse(){
        setOpen({
            show: false,
            note: null
        });
    }

    const noteses = useMemo(() => {
        return notes
    }, [open.show, createNew, trash])
    


    return ( 
        <Container style={{ background: "#aaa", minHeight: "99vh", width: "100vw", maxWidth: "1440px", marginBottom: 24 }} >
                <Modal
                    open={open.show}
                    onClose={hundleClouse}
                    aria-labelledby="modal-modal-title" 
                    aria-describedby="modal-modal-description">
                    <Box style={{ background: "#fff", width: 480, margin: "68px auto", padding: "28px", borderRadius: 12}}>
                        <CreateNote note={open.note} close={hundleClouse} />
                    </Box>
                </Modal>
            
            <Grid container style={{margin: '0 auto'}}>
                <Grid spacing={2} item xs={12}>
                    <Paper style={{height: 68, margin: 10, display: 'flex', justifyContent: 'space-between', alignItems: 'center'}}>
                        <TextField size="small" value={search} onChange={(e) => {
                            setSearch(e.target.value)
                        }} type="search"
                        id="outlined-basic" label="Поиск" variant="outlined" style={{ margin: 5, width: 420 }} />
                        <Typography variant="h6" style={{ margin: 12 }} >
                            Заметки
                        </Typography>
                    </Paper>
                </Grid>
                <Grid item xs={3}>
                    <Paper style={{ margin: 10 }}>
                        <SideBar />
                    </Paper>
                </Grid>
                <Grid item xs={9}>
                    <Grid container>
                        <Grid spacing={1} item xs={12} >
                            <Paper style={{ textAlign: "center", height: "auto", width: "520px", overflow: "hidden", margin: "0 auto"}} >
                                    {
                                        !createNew && <IconButton style={{ fontSize: "12", paddingRight: 12}} onClick={() => { setCreate(true) }} >
                                        <AddBoxIcon color="action" />
                                    </IconButton>
                                    }
                                    {
                                        createNew && <CreateNote close={() => { setCreate(false) }} note={null} /> 
                                    }
                            </Paper>
                        </Grid>
                        {
                            noteses.filter((item: INotes) => {
                                return item.title.includes(search) || item.content.includes(search)
                                    }).map((note: INotes , i: number) => { 
                                return (
                                    <Grid key={note.id} spacing={2} item xs={4} >
                                        <Paper style={{ margin: 10}}>
                                            <NoteCard idNote={note.id} editHundle={() => {
                                                setOpen({
                                                    show: true,
                                                    note: note
                                                });
                                            }} key={note.id} title={note.title} content={note.content} date={note.date.toLocaleDateString()} />
                                        </Paper>
                                    </Grid>
                                )
                            })
                        }
                    </Grid>
                </Grid>
            </Grid>
        </Container>
     );
}

export default Main;