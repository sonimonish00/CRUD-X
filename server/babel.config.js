export default {
  presets: [
    [
      "@babel/preset-env",
      {
        targets: {
          node: "current",
        },
      },
    ],
  ],
  plugins: [
    "@babel/plugin-syntax-import-assertions",
    "@babel/plugin-proposal-class-properties",
  ],
};
