export function getQueryVariable(variable) {
  const query = window.location.search.substring(1);
  const vars = query.split("&");
  let result = ''
  vars.forEach(someVar => {
    let pair = someVar.split("=");
    if (pair[0] == variable) result = pair[1];
  });
  return result ? result : false;
}