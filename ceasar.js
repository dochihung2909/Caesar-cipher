function ceasar_encode() {
    var text = document.getElementById("ceasar_text").value.trim();
    var shift = parseInt(document.getElementById("ceasar_shift").value);
    var result = ""; 
    let idArr = []
    let eArr = []
    
    for (var i = 0; i < text.length; i++) {
        var charCode = text.charCodeAt(i);
        if (charCode >= 65 && charCode <= 90) {
            // Mã hoá chữ cái hoa
            result += String.fromCharCode(((charCode - 65 + shift) % 26) + 65);
            idArr.push(charCode - 65)
            eArr.push((charCode - 65 + shift + 26) % 26)
        } else if (charCode >= 97 && charCode <= 122) {
            // Mã hoá chữ cái thường
            result += String.fromCharCode(((charCode - 97 + shift) % 26) + 97); 
            idArr.push(charCode - 97)
            eArr.push((charCode - 97 + shift + 26) % 26)
        } else {
            // Không thay đổi ký tự không phải chữ cái
            result += text[i];
        }
    }
    createTable(text, idArr, eArr, result)
    document.getElementById("ceasar_result").value = result;
}

function ceasar_decode() {
    var text = document.getElementById("ceasar_text").value.trim();
    var shift = parseInt(document.getElementById("ceasar_shift").value);
    var result = "";
    let idArr = []
    let eArr = []
    
    for (var i = 0; i < text.length; i++) {
        var charCode = text.charCodeAt(i);
        if (charCode >= 65 && charCode <= 90) {
            // Giải mã chữ cái hoa
            result += String.fromCharCode(((charCode - 65 - shift + (Math.trunc(shift / 26) + 1)*26) % 26) + 65);
            idArr.push(charCode - 65)
            eArr.push((charCode - 65 - shift + (Math.trunc(shift / 26) + 1)*26) % 26)
        } else if (charCode >= 97 && charCode <= 122) {
            // Giải mã chữ cái thường
            result += String.fromCharCode(((charCode - 97 - shift + (Math.trunc(shift / 26) + 1)*26) % 26) + 97);
            idArr.push(charCode - 97)
            eArr.push((charCode - 97 - shift + (Math.trunc(shift / 26) + 1)*26) % 26)
        } else {
            // Không thay đổi ký tự không phải chữ cái
            result += text[i];
        }
    }
    createTable(text, idArr, eArr, result) 
    document.getElementById("ceasar_result").value = result;
}

function createTable(inputText, idArr, eArr, result) {  
    inputText = inputText.replace(/\s/g, '')
    result = result.replace(/\s/g, '')
    var n = inputText.length; 
    var table = document.createElement("table");
    table.setAttribute('id', 'ceasar_table')
 

    // Tạo header row
    var headerRow = document.createElement("tr");
    headerRow.className = `grid grid-cols-${n + 1} `
    if (n >= 12) {
        headerRow.style.cssText = `grid-template-columns: repeat(${n + 1}, minmax(0, 1fr))`
    }
    for (var i = 0; i <= n; i++) {
        var th = document.createElement("th");
        i == 0 ? th.textContent = 'Ký tự ban đầu' : th.textContent = inputText[i - 1] 
        headerRow.appendChild(th);
    }
    table.appendChild(headerRow);

    const headerArr = ['i', '(i + k) mod N', 'Ký tự mới']
    // Tạo các hàng dữ liệu
    for (var row = 1; row <= 3; row++) {
        var dataRow = document.createElement("tr");
        dataRow.className = `grid grid-cols-${n + 1} text-center`  
        if (n >= 12) {
            dataRow.style.cssText = `grid-template-columns: repeat(${n + 1}, minmax(0, 1fr))`
        }
        for (var col = 0; col <= n; col++) {
            var td = document.createElement("td"); 

            if (col == 0) {
                td.textContent = headerArr[row - 1]; 
            } else if (row == 1) { 
                td.textContent = idArr[col - 1];  
            } else if (row == 2) {  
                td.textContent = eArr[col - 1];   
            } else if (row == 3) {
                td.textContent = result[col - 1];   
            }
            dataRow.appendChild(td);
        }
        table.appendChild(dataRow);
    }

    var tableContainer = document.getElementById("tableContainer");
    tableContainer.innerHTML = ""; // Xóa nội dung cũ nếu có
    tableContainer.appendChild(table);
    tableContainer.insertAdjacentHTML('beforeend', '<button id="copy_ceasar" class="cursor-pointer bg-blue-500 text-white px-4 py-2 rounded-lg mt-4" data-clipboard-target="#ceasar_table">Copy Table</button>')
 

    var clipboard = new ClipboardJS('#copy_ceasar');

    clipboard.on('success', function(e) {
        var button = document.getElementById("copy_ceasar");
            button.classList.add("bg-green-500");
        setTimeout(function() {
            button.classList.remove("bg-green-500");
        }, 1000);
    }); 
}