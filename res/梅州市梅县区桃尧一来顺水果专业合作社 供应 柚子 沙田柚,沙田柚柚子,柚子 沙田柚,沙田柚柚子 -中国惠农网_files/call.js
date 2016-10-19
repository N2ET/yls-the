
function setcall(hnuserid, businessType, businessId) {
    $.ajax({
        type: "POST",
        contentType: "application/x-www-form-urlencoded;charset=UTF-8",
        url: "/call/call/",
        data: { hnuserid: hnuserid, businessType: businessType, businessId: businessId },
        success: function (res) {
            if (res.status == '1') {
                window.location.href = 'tel://89504000';
                mui.toast('400调用成功，请拨打8950400完成询电', 1000);
            }
            else {
                mui.toast(res.message, 1000);
            }
        }
    });
}
