import { Box, Modal } from "@mui/material";

interface CustomModalProps {
    children?: any;
    isModalOpen: boolean;
    onCloseHandler: () => void;
}

export const CustomModal = (props: CustomModalProps) => {
    const { children, isModalOpen, onCloseHandler } = props;

    return (
        <Modal
            open={isModalOpen}
            onClose={onCloseHandler}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
        >
            <Box sx={boxStyle}>
                {children}
            </Box>

        </Modal>
    )
}

const boxStyle = {
    position: 'absolute' as 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
};