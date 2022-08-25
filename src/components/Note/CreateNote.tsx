import { Button, Container, IconButton } from '@mui/material';
import { AppBar, TextField, Typography } from '@mui/material';
import * as React from 'react';
import { useContext } from 'react';
import { useState } from 'react';
import { INotes } from '../../App';
import { NoteContext } from './../../store';
import { useId } from 'react';
import { TextareaAutosize } from '@mui/base';
import { Box } from '@mui/material';
import { useEffect } from 'react';
import { Paper } from '@mui/material';
import PushPinIcon from '@mui/icons-material/PushPin';
import CloseIcon from '@mui/icons-material/Close';
import { useCallback } from 'react';

interface CreateNotePropType {
    note?: INotes | null;
    close: () => void,
    prop?: string
}


function CreateNote( { note, close, prop }: CreateNotePropType ) {

    const { setNotes, createNew, deleteNote } = useContext(NoteContext)

    const [currentNode, setCurrentNode] = useState<INotes>({
        id: useId(),
        title: "",
        content: "",
        date: new Date()
    })
    
    useEffect(() => {
        if( !note ){
            setCurrentNode(createNew())
            return
        }
        setCurrentNode(note)
    }, [])

    useEffect(() => {
        setNotes((state: INotes[]) => {
            return state.map(item => {
                if( item.id === currentNode.id){
                    item = currentNode
                }
                return item
            })
        }) 
    }, [currentNode])

    return ( 
        <>
            <Container style={{ padding: "20px", paddingTop: 0, background: "white", width: "480px", textAlign: "left"}}>
                <Paper style={{height: 48, margin: 0, display: 'flex', justifyContent: 'space-between', boxShadow: "none"}}>
                    <Typography variant="h6" style={{ padding: "8px 0", background: "white", width: "360px" }} onClick={() => {
                        console.log(currentNode)
                    }}> 
                        Завметка
                    </Typography>
                        {
                            (!currentNode.title && !currentNode.content)? 
                            <IconButton  style={{ fontSize: "12", paddingRight: 12}} onClick={() => {
                                close()
                                deleteNote(currentNode.id)}} ><CloseIcon /> </IconButton> : 
                            <IconButton  style={{ fontSize: "12", paddingRight: 12}} onClick={close} ><PushPinIcon /></IconButton>
                        }
                    
                </Paper>
                <form>
                    <TextField
                        style={{ width: "420px", border: "none" }}
                        type="text"
                        value={currentNode.title}
                        label="Заголовок"
                        size="small"
                        variant="outlined"  
                        onInput={(e: any) => {
                            setCurrentNode({
                                ...currentNode,
                                title: e.target.value
                            })
                        }}
                    />
                    <br />
                    <br />  
                    <TextareaAutosize
                        style={{ width: "420px", margin: "5px 0", padding: "8px",}}
                        placeholder="Введите текст заметки"
                        value={currentNode.content}
                        onInput={(e: any) => {
                            setCurrentNode({
                                ...currentNode,
                                content: e.target.value
                            })
                        }}
                    />
                    <TextField
                        type="date"
                        defaultValue="2022-08-24"
                        style={{ margin: "10px 0", width: 280 }}
                        size="small"
                        onChange={e => {
                             setCurrentNode({
                                ...currentNode,
                                date: new Date(e.target.value)
                            })
                        }}
                    />
                </form>
            </Container>
        </>
     );
}

export default CreateNote;