function getQueryParam(name: any) {
    name = (new RegExp('[?&]' + encodeURIComponent(name) + '=([^&]*)')).exec(window.location.search)
    return name ? decodeURIComponent(name[1]) : undefined;
}

let botSecret = getQueryParam("secret");
if (botSecret) {
    sessionStorage.setItem("botSecret", botSecret);
    location.reload();
} else {
    botSecret = sessionStorage.getItem("botSecret") || '';
}

export const env = {
    owner: getQueryParam("owner") || '<unbekannt>',
    botSecret: botSecret
};