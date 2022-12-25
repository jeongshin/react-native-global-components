module.exports = {
  root: true,
  extends: ["@react-native-community", "prettier"],
  plugins: [
    "@typescript-eslint",
    "react",
    "react-native",
    "react-hooks",
    "prettier",
    "import",
  ],
  rules: {
    "no-console": ["error", { allow: ["warn", "error"] }],
    "prettier/prettier": "error",
    "react-hooks/exhaustive-deps": "off",
    "import/order": [
      "warn",
      {
        groups: ["builtin", "external", ["parent", "sibling"], "index", "type"],
        pathGroups: [
          {
            pattern: "react+(|-native)",
            group: "builtin",
            position: "before",
          },
          {
            pattern: "@**",
            group: "external",
            position: "after",
          },
        ],
        alphabetize: {
          order: "asc",
          caseInsensitive: true,
        },
        pathGroupsExcludedImportTypes: ["builtin"],
      },
    ],
  },
};
