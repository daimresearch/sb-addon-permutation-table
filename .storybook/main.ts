import type { StorybookConfig } from "@storybook/react-vite";
const config: StorybookConfig = {
  stories: ["../src/**/*.mdx", "../src/**/*.stories.@(js|jsx|ts|tsx)"],

  addons: [
    "@storybook/addon-links",
    "@storybook/addon-essentials",
    "@storybook/addon-interactions",
    "./local-preset.js",
  ],

  framework: {
    name: "@storybook/react-vite",
    options: {},
  },
  // NOTE: Since styled from @storybook/theming is not available in the Addon Preview Area after the SB8 update, we inject our own styling inline
  previewHead(config, options) {
    return `
      ${config}
      <style>

        table#permutation-table .--active {
            background-color: rgb(255, 240, 249);
            box-shadow: inset 0px 0px 1px 2px rgb(253, 43, 141);
        }
        table#permutation-table {
          table-layout: fixed;
          text-align: center;
          border-collapse: collapse;
          color: black;
        }

        table#permutation-table .stickyCol {
          box-shadow: inset -1px 0px 0px #000000;
          position: sticky;
          left: 0;
          background-color: white;
          z-index: 2;
          transition: background-color 0.3s;
        }

        table#permutation-table thead tr.outpost {
          border-bottom: solid 1px black;
        }

        table#permutation-table .permutation-inner-table {
          position: relative;
          width: 100%;
        }

        table#permutation-table .permutation-inner-table td,
          table#permutation-table th {
    width: auto;
    min-width: 50px;
    padding: 0.5em;
  }

    table#permutation-table .permutation-inner-table tr {
    display: flex;
    justify-content: space-between;
    gap: 0.5em;
  }

  table#permutation-table [role="component"] {
    padding: 1em;
  }
      </style>
    `;
  },

  docs: {},
};
export default config;
