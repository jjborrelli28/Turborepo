export const globalStylesObject = {
  body: {
    m: "0",
    p: "0",

    "*": {
      boxSizing: "border-box",
    },
  },

  "a, button, [role='button'], input[type='submit'], input[type='button'], input[type='reset']":
    {
      cursor: "pointer",
    },

  "button:disabled, input:disabled, [aria-disabled='true']": {
    cursor: "not-allowed",
  },
};
