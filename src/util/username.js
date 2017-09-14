let username = window.localStorage.getItem('username');
username = username || null;

function setUsername(name) {
    username = name;
    window.localStorage.setItem('username', username);
  }
function getUsername(){
    return username;
  }

export {setUsername, getUsername};
