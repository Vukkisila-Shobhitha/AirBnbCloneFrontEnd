export const setItemsInLS = (key, value) => {
  if (!key || !value) {
    return console.error('Cannot store in Localstorage');
  }

  const valueToStore =
    typeof value !== 'string' ? JSON.stringify(value) : value;
  localStorage.setItem(key, valueToStore);
};
export function getItemFromLS(key) {
  if (!key) {
      return console.error(`Cannot get value from Localstorage`);
  }
  const temptoken = localStorage.getItem(key);
  return temptoken;
}
export const removeItemFromLS = (key) => {
  if (!key) {
      return console.error(`Cannot remove item from Localstorage`)
  }
  localStorage.removeItem(key)
}
//import { setItemsInLS, getItemFromLS, removeItemFromLS } from './Token/script';

// Example usage
setItemsInLS('token', 'exampleToken123');
const token = getItemFromLS('token');
console.log('Retrieved token:', token);

removeItemFromLS('token');