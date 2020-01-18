export function urlFormat(url,param)
{
    if(typeof(param) == 'object') {
        for(var key in param)
            url = url.replace(new RegExp("\\{" + key + "\\}", "g"), param[key]);
        return url;
    } else {
        return url;
    }
}