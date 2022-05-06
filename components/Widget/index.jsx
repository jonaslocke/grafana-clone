import { Grid, Paper, Typography } from "@mui/material";
import { useRouter } from "next/router";

const Widget = ({ text, to = "#", height = 300, empty }) => {
  const router = useRouter();
  const values = {
    border: empty ? "1px dashed black" : "1px solid #444",
    fontSize: empty ? "h3" : "h5",
    text: empty ? "+" : text,
    elevation: empty ? 2 : 4,
  };

  return (
    <Grid item xs={6} onClick={() => (!to ? null : router.push(`/${to}`))}>
      <Paper
        elevation={values.elevation}
        sx={{
          height: height,
          cursor: "pointer",
          display: "grid",
          placeItems: "center",
          border: values.border,
        }}
      >
        <Typography
          variant={values.fontSize}
          noWrap
          component="div"
          sx={{ flexGrow: 1 }}
        >
          {values.text}
        </Typography>
      </Paper>
    </Grid>
  );
};

export default Widget;
