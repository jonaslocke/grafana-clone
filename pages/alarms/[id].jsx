import { Box, Modal } from "@mui/material";
import AlarmsForm from "./_alarmsform";
import AlarmsRoot from "./_alarmsroot";

const Alarms = () => {
  const handleClose = () => console.log(1);

  return (
    <>
      <AlarmsRoot />
      <Modal
        open={true}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Box
          sx={{
            width: 8 / 10,
            bgcolor: "white",
            padding: 4,
          }}
        >
          <AlarmsForm />
        </Box>
      </Modal>
    </>
  );
};

export default Alarms;
