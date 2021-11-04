function getQueryParam(name: any) {
    if (window.location.search) {
        sessionStorage.setItem("queryParams", window.location.search);
        location.search = "";
        location.reload();
    } 
    const queryParams = sessionStorage.getItem("queryParams") || '';
    name = (new RegExp('[?&]' + encodeURIComponent(name) + '=([^&]*)')).exec(queryParams)
    return name ? decodeURIComponent(name[1]) : undefined;
}

export const env = {
    owner: getQueryParam("owner") || '<unbekannt>',
    botSecret: getQueryParam("secret")
};