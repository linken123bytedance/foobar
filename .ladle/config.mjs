/** @type {import('@ladle/react').UserConfig} */
export default {
  port: 61000,
  outDir: "dist-ladle",
  stories: "src/**/*.stories.{js,jsx,ts,tsx,mdx}",
  expandStoryTree: true,
  addons: {
    a11y: { enabled: true },
    rtl: { enabled: false },
    theme: { enabled: false, defaultState: "dark" },
    mode: { enabled: false },
    width: {
      options: {
        phone: 380,
        tablet: 720,
        large: 1200,
      },
      enabled: true, // the addon can be disabled
      defaultState: 0, // default width in pixels (0 = no viewport is set)
    },
  },
};
