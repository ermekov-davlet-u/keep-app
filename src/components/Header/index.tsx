import React from 'react';

import { Paper, TextField, Typography } from '@mui/material';


function Header( {search, setSearch}: { search: string, setSearch: (param: string) => void } ) {
    return ( 
        <Paper style={{height: 68, margin: 10, display: 'flex', justifyContent: 'space-between', alignItems: 'center'}}>
            <TextField size="small" value={search} onChange={(e) => {
                setSearch(e.target.value)
            }} type="search"
            id="outlined-basic" label="Поиск" variant="outlined" style={{ margin: 5, width: 420 }} />
            <Typography variant="h6" style={{ margin: 12 }} >
                Заметки
            </Typography>
        </Paper>
     );
}

export default Header;