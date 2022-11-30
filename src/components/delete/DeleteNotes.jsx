import { useContext,useState } from 'react';

import { Box, Grid } from '@mui/material';
import { styled } from '@mui/material/styles';

import { DataContext } from '../../context/DataProvider';


import {db} from '../../firebase';
import {collection, onSnapshot,query,doc} from 'firebase/firestore';

//components
import DeleteNote from './DeleteNote';

const DrawerHeader = styled('div')(({ theme }) => ({
    ...theme.mixins.toolbar,
}));

const DeleteNotes = () => {

    const { deleteNotes, setDeleteNotes } = useContext(DataContext);

    useState(()=>{
        const q=query(collection(db,"deleted"));
        const unsub=onSnapshot(q,(querySnapshot)=>{
            let todosArray=[];
            querySnapshot.forEach((doc)=>{
                console.log(doc.data());
                todosArray.push({id:doc.data().id,heading:doc.data().title,text:doc.data().text});
            });
            setDeleteNotes(todosArray);
        });
        return ()=>unsub();
    },[]);

    return (
        <Box sx={{ display: 'flex', width: '100%' }}>
            <Box sx={{ p: 3, width: '100%' }}>
                <DrawerHeader />
                <Grid container>
                    {
                        deleteNotes.map(deleteNote => (
                            <Grid item>
                                <DeleteNote deleteNote={deleteNote} />
                            </Grid>
                        ))
                    }
                </Grid>
            </Box>
        </Box>
    )
}

export default DeleteNotes;