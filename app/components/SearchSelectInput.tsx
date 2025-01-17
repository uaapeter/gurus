import * as React from 'react';
import TextField from '@mui/material/TextField';
import Stack from '@mui/material/Stack';
import Autocomplete from '@mui/material/Autocomplete';

export default function FreeSolo({ label, products }: { label:string, products:any[] }) {
    return (
        <Stack
            className='p-0 h-4'
        >
            <Autocomplete
                id={label}
                freeSolo
                options={products.map((option) => option.productName)}
                renderInput={(params) => <TextField {...params} label={label} size='small'/>}
            />
            
        </Stack>
    );
}
