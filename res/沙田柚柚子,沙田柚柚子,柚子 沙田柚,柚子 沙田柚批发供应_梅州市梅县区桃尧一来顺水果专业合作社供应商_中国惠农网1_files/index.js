window.im_static_baseUrl = "http://im.cnhnb.com/";
window.im_hunbs_url = "http://im.cnhnb.com/";
window.im_static = "http://img.cnhnb.com/";
window.im_login_url = "https://passport.cnhnb.com/";
 
window.huinongwangStaticUrl = "http://static.cnhnb.com";
document.write("<link href='" + window.im_static_baseUrl + "/css/newim.css' rel='stylesheet' type='text/css' />");
 if (typeof $.dialog == 'undefined') {
    document.write("<script language='javascript' src='" + window.huinongwangStaticUrl + "/4.0/libs/lhgdialog/lhgdialog.min.js?self=true&skin=hn' ></script>");

}
document.write("<script language='javascript' src='" + window.im_static_baseUrl + "/Scripts/require.js' data-main='" + window.im_static_baseUrl + "/Scripts/apps/app.js?v=" + new Date().getTime() + "'></script>");


