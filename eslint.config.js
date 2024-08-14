import globals from "globals";
import pluginJs from "@eslint/js";


export default [
  {
    languageOptions: { 
      globals: {
        ...globals.browser,
        ...globals.node 
      },
    } ,
    plugins: {
      '@eslint/js': pluginJs,
    },
    rules: {
      "semi": ["error", "always"],
      "no-console": "warn",
      "eqeqeq": ["error", "always"],
      "indent": ["error", 4],
      "no-unused-vars": ["warn"],
    },
  },
  pluginJs.configs.recommended,
];



