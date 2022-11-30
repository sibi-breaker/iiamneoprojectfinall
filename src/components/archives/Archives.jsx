import { useContext, useState } from 'react';

import { Box, Grid } from '@mui/material';
import { styled } from '@mui/material/styles';

import { DataContext } from '../../context/DataProvider';

//components
import Archive from './Archive';

import {db} from '../../firebase';
import {collection, onSnapshot,query,doc} from 'firebase/firestore';

const DrawerHeader = styled('div')(({ theme }) => ({
    ...theme.mixins.toolbar,
}));

const Archives = () => {

    const { deleteNotes, setDeleteNotes } = useContext(DataContext);

    useState(()=>{
        const q=query(collection(db,"archived"));
        const unsub=onSnapshot(q,(querySnapshot)=>{
            let todosArray=[];
            querySnapshot.forEach((doc)=>{
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
                        deleteNotes.map(archive => (
                            <Grid item>
                                <Archive archive={archive} />
                            </Grid>
                        ))
                    }
                </Grid>
            </Box>
        </Box>
    )
}

export default Archives;