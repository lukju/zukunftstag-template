function getQueryParam(name: any){
    name=(new RegExp('[?&]'+encodeURIComponent(name)+'=([^&]*)')).exec(window.location.search)
    return name ? decodeURIComponent(name[1]): undefined;
 }

export const env = {
    owner: getQueryParam("owner") || '<unbekannt>',
    botSecret: getQueryParam("secret")
};