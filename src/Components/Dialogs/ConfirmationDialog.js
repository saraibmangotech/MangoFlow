import { CancelOutlined } from '@mui/icons-material';
import { Box, Button, Dialog, IconButton, Typography } from '@mui/material';



import WarningIcon from '@mui/icons-material/Warning';
import { red } from '@mui/material/colors';
function ConfirmationDialog({ open, onClose, message, action, warning }) {

    return (
        <Dialog
            open={open}
            sx={{ '& .MuiDialog-paper': { width: warning ? '50%' : '30%', height: "auto", borderRadius: 2, py: { xs: 2, md: 4 }, px: { xs: 3, md: 6 } } }}
        >
            <IconButton onClick={() => onClose()} sx={{ position: 'absolute', right: 13, top: 13 }}>
                <CancelOutlined />
            </IconButton>
            <Box sx={{ display: 'flex', justifyContent: 'center' }}> {warning && <WarningIcon sx={{ color: red[500], fontSize: '50px !important' }} />}</Box>
            <Box sx={{ textAlign: 'center' }}>
                <Typography variant="h6" sx={{ color: 'black', mt: 1, mb: 1.5 }}>
                    {message}
                </Typography>
                <Box sx={{ mt: 4, display: 'flex', gap: '10px', alignItems: 'center', justifyContent: 'space-evenly' }}>
                    <Button

                        onClick={() => action()}
                        style={{ backgroundColor: red[800],color:'white',textTransform:'capitalize' }}
                    >
                        Yes,Confirm
                    </Button>
                    <Button
                    
                        onClick={() => onClose()}
                        style={{ backgroundColor: '#0b79ef',color:'white',textTransform:'capitalize' }}
                    >
                        No,Cancel
                    </Button>
                </Box>
            </Box>
        </Dialog>
    )
}

export default ConfirmationDialog