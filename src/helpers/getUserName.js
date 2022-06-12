export const getUserName = () => {
  let userName;
  process.argv.slice(2).map(el => {
    userName = el.split('=')[1];
  });
  return userName;
};
