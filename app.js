function reverseString (str) {
    var charList = str.split('');
    var reversedList = charList.reverse();
    var reversedString = reversedList.join('');
    return reversedString;
}

function isPalindrome(str2) {
    var strCopy = str2;
    if(reverseString(strCopy) == str2) {
        return true;
    }
    else {
        return false;
    }
}

function numberToString(date) {
    var strDate = {day : '', month : '', year : ''}
    if(date.day < 10) {
        strDate.day = '0' + date.day;
    }
    else {
        strDate.day = date.day.toString();
    }
    if(date.month < 10) {
        strDate.month = '0' + date.month;
    }
    else {
        strDate.month = date.month.toString();
    }
    strDate.year = date.month.toString();
    return strDate;
}

function returnAllFormatDates(date) {
    var dateCopy = numberToString(date);
    var ddmmyyyy = dateCopy.day + dateCopy.month + dateCopy.year;
    var mmddyyyy = dateCopy.month + dateCopy.day + dateCopy.year;
    var yyyymmdd = dateCopy.year + dateCopy.month + dateCopy.day;
    var ddmmyy = dateCopy.day + dateCopy.month + dateCopy.year.slice(-2);
    var mmddyy = dateCopy.month + dateCopy.day + dateCopy.year.slice(-2);
    var yymmdd = dateCopy.year.slice(-2) + dateCopy.month + dateCopy.day;

    return [ddmmyyyy, mmddyyyy, yyyymmdd, ddmmyy, mmddyy, yymmdd];
}

function checkPalindromeForAllDateformats(date) {
    var listOfPalindromes = returnAllFormatDates (date);
    var flag = false;

    for(var i = 0; i < listOfPalindromes.length; i++) {
        if(isPalindrome(listOfPalindromes[i])){
            flag = true;
            break;
        }
    }
    return flag;
}

function isLeapYear(year) {
    if(year % 400 == 0) {
        return true;
    }
    if(year % 100 == 0) {
        return false;
    }
    if(year % 4 == 0) {
        return true;
    }
    return false;
}

function getNextDate(date) {
    var day = date.day + 1;
    var month = date.month;
    var year = date.year;
    var daysInMonth = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];

    if(month == 02) {
        if(isLeapYear(year)) {
            if(day > 29) {
                day = 1;
                month++;
            }
        }
        else {
            if (day > 28) {
            day = 1;
            month++;
            }
        }
    }
    else {
        if (day > daysInMonth[month - 1]) {
            day = 1;
            month++;
        }
    }
    if(month > 12) {
        month = 1;
        year++;
    }
    return {
        day : day,
        month : month,
        year : year
    };
}
function nextPalindromeCount(date) {
    var countDays = 0;
    var nextDate = getNextDate(date);
    while(1) {
        countDays++;
        var isPalindrome = checkPalindromeForAllDateformats(nextDate);
        if(isPalindrome) {
            break;
        }
        nextDate = getNextDate(nextDate);
    }
    return [countDays, nextDate];

}


var dateInput = document.querySelector("#input");
var selectButton = document.querySelector("#button");
var outputArea = document.querySelector(".result");

function clickHandler(e) {
    var birthdayString = dateInput.value;

    if(birthdayString != '') {
        var listOfDate = birthdayString.split('-');

        var date = {
            day : Number(listOfDate[2]),
            month : Number(listOfDate[1]),
            year : Number(listOfDate[0])
        };

        var isPalindromeCheck = checkPalindromeForAllDateformats(date);

        if(isPalindromeCheck) {
            outputArea.innerText = "Yayyy, your birthday is a palindrome 🎉🎉🎉";
        }
        else {
            var [countDays, nextDate] = nextPalindromeCount(date);
            outputArea.innerText = "The next palindrome date is " + nextDate.day + "/" + nextDate.month + "/" + nextDate.year+", you missed it by "+ countDays + "days 😥";
        } 
        
    }
}

selectButton.addEventListener("click", clickHandler);