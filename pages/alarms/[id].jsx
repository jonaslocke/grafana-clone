import { Box, Modal } from "@mui/material";
import { useRouter } from "next/router";
import AlarmsForm from "./_alarmsform";
import AlarmsRoot from "./_alarmsroot";
import CloseIcon from "@mui/icons-material/Close";

const Alarms = () => {
  const router = useRouter();
  const handleClose = () => router.push(`/alarms`);

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
            padding: 3,
            position: "relative",
          }}
        >
          <AlarmsForm close={handleClose} />
          <CloseIcon
            color="error"
            fontSize="small"
            sx={{ position: "absolute", top: 16, right: 16, cursor: "pointer" }}
            onClick={handleClose}
          />
        </Box>
      </Modal>
    </>
  );
};

export default Alarms;
