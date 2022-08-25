import * as React from 'react';
import { Container, Grid, Paper, TextField  } from "@mui/material";
import Box from '@mui/material/Box';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import SideBar from './../components/SideBar/index';
import NoteCard from './../components/Note/card';
import CreateNote from './../components/Note/CreateNote';
import { Modal } from '@mui/material';
import AddBoxIcon from '@mui/icons-material/AddBox';
import { NoteContext } from './../store';
import { INotes } from '../App';
import { useMemo } from 'react';
import Header from './../components/Header/index';

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
            {/* Модальное окно для редактирования */}
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
                    <Header search={search} setSearch={setSearch} />
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
                                    // Блок где создаеться новая заметка
                                    createNew? <CreateNote close={() => { setCreate(false) }} note={null} /> 
                                    :
                                    <IconButton style={{ fontSize: "12", paddingRight: 12}} onClick={() => { setCreate(true) }} >
                                        <AddBoxIcon color="action" />
                                    </IconButton>
                                }
                            </Paper>
                        </Grid>
                        { 
                            // Вывод карточек, сначала фильтрует, потом выводит результат 
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