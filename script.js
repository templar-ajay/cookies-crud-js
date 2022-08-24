document.cookie = "workComplete=false ;Max-Age=86400; SameSite=Strict; Secure";

checkCookie()
  .then(() => {
    runScript(true);
  })
  .catch(() => {
    runScript(false);
  });

function getSunday(previousWeeks = 1) {
  return new Date(
    new Date().setDate(
      new Date().getDate() + (7 - new Date().getDay()) - 7 * previousWeeks
    )
  );
}

function checkCookie() {
  return new Promise((resolve, reject) => {
    document.cookie.split(";").some((item) => {
      return item.includes("workComplete=true");
    })
      ? resolve()
      : reject();
  });
}

function runScript(x) {
  x
    ? (console.log(`Wo hoo!! Work is now Complete, you deserve a holiday`),
      console.log("previous Sunday was on ", getSunday().getDate()),
      console.log("this week's Sunday will be on ", getSunday(0).getDate()))
    : console.log(`sorry you don't deserve any dayOff, get back to work`);
}

setTimeout(() => {
  upDateCookie("workComplete", "true");
  checkCookie()
    .then(() => {
      runScript(true);
      setTimeout(() => {
        clearCookie("workComplete");
      }, 5000);
    })
    .catch(() => {
      runScript(false);
    });
}, 10000);

function clearCookie(name) {
  document.cookie = name + `= ;expires=Thu, 01 Jan 1970 00:00:00 UTC;`;
}
function upDateCookie(name, value) {
  document.cookie = `${name}=${value};Max-Age=86400; SameSite=Strict; Secure`;
}
