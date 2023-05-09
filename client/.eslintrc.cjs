module.exports = {
   env: {
      browser: true,
      es2021: true,
   },
   extends: [
      "airbnb",
      "airbnb-typescript",
      "airbnb/hooks",
      "plugin:react/recommended",
      "plugin:@typescript-eslint/recommended",
      "plugin:prettier/recommended",
   ],
   overrides: [],
   parser: "@typescript-eslint/parser",
   parserOptions: {
      ecmaVersion: "latest",
      sourceType: "module",
      project: ["./tsconfig.json", "./tsconfig.node.json"],
      tsconfigRootDir: __dirname,
   },
   plugins: ["react", "@typescript-eslint", "prettier"],
   rules: {
      "react/react-in-jsx-scope": 0,
      "@typescript-eslint/no-use-before-define": 0,
      "jsx-a11y/label-has-associated-control": [
         2,
         {
            labelComponents: ["label"],
            labelAttributes: ["htmlFor"],
            controlComponents: ["input"],
         },
      ],
      "no-nested-ternary": "off",
   },
};
