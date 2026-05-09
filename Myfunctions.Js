// myFunctions.js

// إظهار وإخفاء التفاصيل باستخدام jQuery
function toggleDetails(id, checkbox) {
    if (checkbox.checked) {
        $("#" + id).show();
    } else {
        $("#" + id).hide();
    }
}

// إظهار نموذج الطلب
function showForm() {
    var selected = $("input[name='meal']:checked").length;
    if (selected == 0) {
        alert("يرجى اختيار وجبة واحدة على الأقل!");
        return;
    }
    $("#orderForm").show();
}

// إرسال الطلب مع التحقق
function sendOrder() {
    var name  = $("#name").val();
    var bank  = $("#bank").val();
    var date  = $("#date").val();
    var phone = $("#phone").val();

    // الاسم - اختياري لكن إذا أُدخل يجب أن يكون إنكليزي + فراغ
    if (name != "" && !/^[a-zA-Z]+ [a-zA-Z]+$/.test(name)) {
        alert("الاسم يجب أن يكون بالإنكليزية مع فراغ واحد بين الاسم والكنية");
        return;
    }

    // الحساب - مطلوب وعدد 6 أرقام
    if (!/^\d{6}$/.test(bank)) {
        alert("رقم الحساب مطلوب ويجب أن يكون 6 أرقام");
        return;
    }

    // التاريخ - اختياري
    if (date != "" && !/^\d{4}-\d{2}-\d{2}$/.test(date)) {
        alert("التاريخ يجب أن يكون بالشكل yyyy-mm-dd");
        return;
    }

    // الموبايل - اختياري Syriatel: 09x أو MTN: 09x
    if (phone != "" && !/^(093|094|095|096|098|099)\d{7}$/.test(phone)) {
        alert("رقم الموبايل غير صحيح، يجب أن يكون من Syriatel أو MTN");
        return;
    }

    // جمع الوجبات المختارة
    var msg = "الوجبات المختارة:\n";
    var total = 0;

    $("input[name='meal']:checked").each(function() {
        var parts = $(this).val().split(",");
        msg += parts[0] + " - " + parts[1] + " : " + parts[2] + " ل.س\n";
        total += parseInt(parts[2]);
    });

    var tax    = total * 0.10;
    var net    = total - tax;

    msg += "\nالمجموع: " + total + " ل.س";
    msg += "\nالضريبة 10%: " + tax + " ل.س";
    msg += "\nالصافي: " + net + " ل.س";

    alert(msg);
}