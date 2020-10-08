doOperation = function(left, right, operation) {
    switch(operation) {
        case "-":
            $("#label").val(parseFloat(left) - parseFloat(right));
            break;
        case "+":
            $("#label").val(parseFloat(left) + parseFloat(right));
            break;
        case "*":
            $("#label").val(parseFloat(left) * parseFloat(right));
            break;
        case "/":
            $("#label").val(parseFloat(left) / parseFloat(right));
            break;
    }
}

$(document).ready(function() {
    /*
        - 45
        + 43
        * 42
        / 47
        = 61, 13
        . 46
        0 48
        9 57

        LEFT - ввод левого операнда
        LEFTDOT - ввод левого операнда с точкой
        RIGHT - ввод правого операнда
        RIGHTDOT - ввод правого операнда с точкой
        TRANS - переходное состояние во время ввода действия
    */

   let left = "";
   let right = "";
   let state = "LEFT";
   let operation = ""

    $(document).keypress(function(eventObject) {
        if (eventObject.which > 47 && eventObject.which < 58) {
            // Цифры
            switch(state) {
                case "LEFT": // Левый операнд
                case "LEFTDOT":
                    if(state == "TRANS") {
                        state = "RIGHT";
                        break;    
                    }

                    left += eventObject.which - 48;
                    $("#label").val(left);
                    break;
                case "RIGHT": // Правый операнд
                case "RIGHTDOT":
                    right += eventObject.which - 48;
                    $("#label").val(right);
                    break;
                case "TRANS": // Переход
                    right += eventObject.which - 48;
                    $("#label").val(right);
                    state = "RIGHT";
                    break;
            }
        } else {
                // Не цифры
                switch(eventObject.which){ // Символы
                    case 45: // Минус
                        if(state != "LEFT" && state != "LEFTDOT") break;
                        operation = "-";
                        $("#label").val("");
                        state = "TRANS"
                        break;
                        case 43: // Плюс
                        if(state != "LEFT" && state != "LEFTDOT") break;
                        operation = "+";
                        $("#label").val("");
                        state = "TRANS"
                        break;
                    case 42: // Умножить
                        if(state != "LEFT" && state != "LEFTDOT") break;
                        operation = "*";
                        $("#label").val("");
                        state = "TRANS"
                        break;
                    case 47: // Разделить
                        if(state != "LEFT" && state != "LEFTDOT") break;
                        operation = "/";
                        $("#label").val("");
                        state = "TRANS"
                        break;
                        case 46: // Точка
                        if(state == "LEFT") {
                            if (left == "") break;
                            state = "LEFTDOT";
                            left += ".";
                            $("#label").val(left);
                        }
    
                        if(state == "RIGHT") {
                            if(right == "") break;
                            state = "RIGHTDOT";
                            right += ".";
                            $("#label").val(left);
                        }
                        break;
                        case 13:
                case 61:
                    if (left == "" || right == "") break;
                    doOperation(left, right, operation);
                    left = "";
                    right = "";
                    state = "LEFT";
                }
        }
    })
})