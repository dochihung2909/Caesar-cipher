window.addEventListener('DOMContentLoaded', function() {
    this.document.getElementById('vigenere_encode').addEventListener('click',() => {
        let text = document.getElementById('vigenere_text').value.trim().toUpperCase()
        let key = document.getElementById('vigenere_shift').value.trim().toUpperCase()
    
        let textLength = text.replace(/\s/g, '').length
        
        key = key.length < textLength ? key.repeat(textLength/key.length) + key.substring(0, textLength % key.length) : key.substring(0,textLength)
    
        let result = ''  
    
        let keyIndex = 0
        for (let i = 0; i < text.length; i++) {
            let charCode = text.charCodeAt(i) 
            let keyCode = key.charCodeAt(keyIndex)    
    
            if (charCode >= 65 && charCode <= 90) {  
                result += String.fromCharCode((((charCode - 65) + (keyCode - 65)) % 26) + 65); 
                keyIndex++
            } else { 
                result += text[i];
            }
        } 
    
        document.getElementById("vigenere_result").value = result; 
        createTable(text, key, result) 
    }) 
    

    this.document.getElementById('vigenere_decode').addEventListener('click', () => {
        let text = document.getElementById('vigenere_text').value.trim().toUpperCase()
        let key = document.getElementById('vigenere_shift').value.trim().toUpperCase()
     
    
        let textLength = text.replace(/\s/g, '').length
     
        
        key = key.length < textLength ? key.repeat(textLength/key.length) + key.substring(0, textLength % key.length) : key.substring(0,textLength)
     
    
        let result = ''   
        let keyIndex = 0
        for (let i = 0; i < text.length; i++) {
            let charCode = text.charCodeAt(i) 
            let keyCode = key.charCodeAt(keyIndex)    
    
            if (charCode >= 65 && charCode <= 90) {  
                result += String.fromCharCode((((charCode - 65) - (keyCode - 65) + 26) % 26) + 65); 
                keyIndex++
                
            } else { 
                result += text[i];
            }  
        }  
        document.getElementById("vigenere_result").value = result; 
        createTable(text, key, result)
    })
      

    function createTable(inputText, key, result) {     
        var table = document.createElement("table"); 
        table.className = 'w-full'
         
        const headerArr = ['i', 'Ký tự khoá', 'k', '(i + k) mod N', 'Ký tự mới']  

        inputText = inputText.replace(/\s/g, '')
        result = result.replace(/\s/g, '')
        var n = inputText.length; 
        var table = document.createElement("table");

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

        // Tạo các hàng dữ liệu
        for (var row = 1; row <= 5; row++) {
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
                    td.textContent = inputText.charCodeAt(col - 1) - 65;  
                } else if (row == 2) {  
                    td.textContent = key[col - 1];   
                } else if (row == 3) {
                    td.textContent = key.charCodeAt(col - 1) - 65;   
                } else if (row == 4) {
                    td.textContent = result.charCodeAt(col - 1) - 65;    
                } else if (row == 5) {
                    td.textContent = result[col - 1];    
                }
                dataRow.appendChild(td);
            }
            table.appendChild(dataRow);
        }

        var tableContainer = document.querySelector(".vigenere_table"); 
     
        tableContainer.innerHTML = ""; // Xóa nội dung cũ nếu có
        tableContainer.appendChild(table);
    }
 
}) 
 

