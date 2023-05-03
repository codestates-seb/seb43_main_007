module.exports = {
   env: { browser: true, es2020: true },
   extends: [
      "airbnb",
      "airbnb-typescript",
      "airbnb/hooks",
      "eslint:recommended",
      "plugin:@typescript-eslint/recommended",
      "plugin:react-hooks/recommended",
      "plugin:prettier/recommended",
   ],
   parser: "@typescript-eslint/parser",
   parserOptions: {
      ecmaVersion: "latest",
      sourceType: "module",
      project: "./tsconfig.json",
      tsconfigRootDir: "client",
   },
   plugins: ["react-refresh", "prettier"],
   rules: {
      "react/react-in-jsx-scope": 0,
      "react-refresh/only-export-components": "warn",
   },
};
