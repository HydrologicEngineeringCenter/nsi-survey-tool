import React, { useState, useEffect } from "react";
import { SidebarButton } from "@corpsmap/corpsmap";
import classnames from "../../utils/classnames";

export default () => {
  const title = "Toggle Fullscreen";
  const [fullscreen, setFullscreen] = useState(false);

  const toggleFullscreen = () => {
    setFullscreen(!fullscreen);
  };

  useEffect(() => {
    const el = document.getElementById("corpsmap-root");
    const classes = el.classList;
    if (fullscreen) classes.add("fullscreen");
    if (!fullscreen) classes.remove("fullscreen");
  }, [fullscreen]);

  const iconClass = classnames({
    mdi: true,
    "mdi-fullscreen": !fullscreen,
    "mdi-fullscreen-exit": fullscreen,
  });

  return (
    <SidebarButton
      iconClass={iconClass}
      label={title}
      title={title}
      onClick={toggleFullscreen}
    />
  );
};
