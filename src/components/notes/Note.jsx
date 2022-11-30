import { useContext, useState } from 'react';

import { Card, CardContent, CardActions, Typography, TextField } from '@mui/material';
import { styled } from '@mui/material/styles';
import { ArchiveOutlined as Archive, DeleteOutlineOutlined as Delete } from '@mui/icons-material';
import EditIcon from '@mui/icons-material/Edit';
import SaveIcon from '@mui/icons-material/Save';
import { DataContext } from '../../context/DataProvider';
import { db } from '../../firebase';
import { doc, deleteDoc, addDoc, query, collection, onSnapshot,updateDoc } from 'firebase/firestore';


const StyledCard = styled(Card)`
    border: 1px solid #e0e0e0;
    border-radius: 8px;
    width: 240px;
    margin: 8px;
    box-shadow: none;
`

const Note = ({ note }) => {

    const { notes, setNotes, setAcrchiveNotes, setDeleteNotes } = useContext(DataContext);
    const [editing, setEditing] = useState(false);
    const [heading, setHeading] = useState(note.heading);
    const [text, setText] = useState(note.text);


    const archiveNote = (note) => {
        const updatedNotes = notes.filter(data => data.id !== note.id);
        var id = note.id;
        const q = query(collection(db, "notes"));
        const unsub = onSnapshot(q, (querySnapshot) => {
            querySnapshot.forEach((val) => {
                if (val.data().id == id) {
                    addDoc(collection(db, "archived"), {
                        id: val.data().id,
                        title: val.data().title,
                        text: val.data().text
                    })
                    deleteDoc(doc(db, "notes", val.id));
                }
            });
        });

        setNotes(updatedNotes);
        setAcrchiveNotes(prevArr => [note, ...prevArr]);
    }

    const deleteNote = (note) => {
        const updatedNotes = notes.filter(data => data.id !== note.id);
        var id = note.id;

        const q = query(collection(db, "notes"));
        const unsub = onSnapshot(q, (querySnapshot) => {
            querySnapshot.forEach((val) => {
                if (val.data().id == id) {
                    addDoc(collection(db, "deleted"), {
                        id: val.data().id,
                        title: val.data().title,
                        text: val.data().text
                    })
                    deleteDoc(doc(db, "notes", val.id));
                }
            });
        });

        setNotes(updatedNotes);
        setDeleteNotes(prevArr => [note, ...prevArr]);
    }

    const updateNote = () =>{
        const updateNotes = [...notes];
        for(let i=0;i<updateNotes.length;i++){
            if(updateNotes[i] == note.id){
                updateNotes.title = heading;
                updateNotes.text = text;
            }
        }
        
        var id = note.id;
        const q = query(collection(db, "notes"));
        const unsub = onSnapshot(q, (querySnapshot) => {
            querySnapshot.forEach((val) => {
                if (val.data().id == id) {
                    updateDoc(doc(db, "notes", val.id), {
                        title: heading,
                        text: text
                    })
                }
            });
        });

        setNotes(updateNotes);
        // setAcrchiveNotes(prevArr => [note, ...prevArr]);
    }

    return (
        <StyledCard>
            <CardContent>
                {/* <Typography>{note.heading}</Typography>
                    <Typography>{note.text}</Typography> */}
                <TextField onChange={e => setHeading(e.target.value)} disabled={!editing} value={heading} id="standard-basic" label="Heading" variant="standard" />
                <TextField onChange={e => setText(e.target.value)} disabled={!editing} value={text} id="standard-basic" label="Text" variant="standard" />
            </CardContent>
            <CardActions>
                {
                    editing ? (
                        <SaveIcon fontSize="small"
                            style={{ marginLeft: 'auto' }}
                            onClick={() => {
                                setEditing(false)
                                updateNote();
                            }} />
                    )
                        :
                        <EditIcon
                            fontSize="small"
                            style={{ marginLeft: 'auto' }}
                            onClick={() => {
                                setEditing(true)
                            }}
                        />
                }
                <Archive
                    fontSize="small"
                    style={{ marginLeft: 'auto' }}
                    onClick={() => archiveNote(note)}
                />
                <Delete
                    fontSize="small"
                    onClick={() => deleteNote(note)}
                />
            </CardActions>
        </StyledCard>
    )
}

export default Note;