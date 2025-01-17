import * as React from 'react';
import Chip from '@mui/material/Chip';
import Stack from '@mui/material/Stack';

export default function AppChip({label, color, onClick}:{label: React.ReactNode, onClick: () =>void, color: "default" | "primary" | "secondary" | "error" | "info" | "success" | "warning"}) {
    return (
        <Stack direction="row">
            <Chip
                label={label}
                component="a"
                variant="outlined"
                clickable
                onClick={() =>onClick()}
                color={color}
            />
        </Stack>
    );
}
