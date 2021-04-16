import Commerce from "@chec/commerce.js";

//creating an instance of Commerce.js
export const commerce = new Commerce(process.env.REACT_APP_CHEC_PUBLIC_KEY, true); 