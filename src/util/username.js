let username = window.localStorage.getItem('username');
username = username || null;

function setUserName(name) {
  username = name;
  window.localStorage.setItem('username', username);
}
function getUserName() {
  return username;
}

export {setUserName, getUserName};
