import Button from "./button";

const plugin = {
  pluginName: "Fullscreen",
  enabled: true,
  components: [
    {
      component: Button,
      region: "right-sidebar-top",
      sortOrder: 50,
    },
  ],
};

export default plugin;
