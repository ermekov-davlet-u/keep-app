import { Box, Container, Divider, Grid, List, ListItem, ListItemButton, ListItemText, Menu, MenuItem, Typography  } from "@mui/material";
import React, { useId } from "react";

// Сайдбар 
function SideBar() {
    return ( 
        <Box onClick={() => {}} sx={{ textAlign: 'center' }}>
            <Typography variant="h6" >
                Эрмеков Давлет
            </Typography>
            <Divider />
            <List>
                <ListItem disablePadding>
                    <ListItemButton >
                        <ListItemText primary={"Заметки"} />
                    </ListItemButton>
                </ListItem>
                <ListItem disablePadding>
                    <ListItemButton >
                        <ListItemText primary={"Напоминание"} />
                    </ListItemButton>
                </ListItem>
                <ListItem disablePadding>
                    <ListItemButton >
                        <ListItemText primary={"Изменение"} />
                    </ListItemButton>
                </ListItem>
                <ListItem disablePadding>
                    <ListItemButton >
                        <ListItemText primary={"Архив"} />
                    </ListItemButton>
                </ListItem>
            </List>
        </Box>
     );
}

export default SideBar;