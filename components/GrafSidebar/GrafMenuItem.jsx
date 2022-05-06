import { ListItemButton, ListItemIcon, ListItemText } from "@mui/material";
import { useContext, useEffect } from "react";
import { GlobalContext } from "../../src/GlobalContext";
import { useRouter } from "next/router";

const GrafMenuItem = ({ title, icon, to = "#" }) => {
  const { drawer } = useContext(GlobalContext);
  const router = useRouter();
  const isActive = router.pathname.includes(to);

  return (
    <ListItemButton
      key={title}
      sx={{
        minHeight: 48,
        justifyContent: drawer ? "initial" : "center",
        px: 2.5,
      }}
      onClick={() => router.push(`/${to}`)}
      selected={isActive}
      disabled={isActive}
    >
      <ListItemIcon
        sx={{
          minWidth: 0,
          mr: drawer ? 3 : "auto",
          justifyContent: "center",
        }}
      >
        {icon}
      </ListItemIcon>
      <ListItemText primary={title} sx={{ opacity: drawer ? 1 : 0 }} />
    </ListItemButton>
  );
};

export default GrafMenuItem;
