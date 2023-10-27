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
    })
      

    function createTable() {     
        var table = document.createElement("table"); 
        table.className = 'w-full'
         
    
        for (var row = 0; row < 26; row++) {
            var dataRow = document.createElement("tr");
            dataRow.className = `grid text-center`  
            dataRow.style.cssText = `grid-template-columns: repeat(26, minmax(0, 1fr))`  
            for (var col = 0; col < 26; col++) { 
                var td = document.createElement("td");  
                td.innerText = String.fromCharCode((row + col) % 26 + 65)
                dataRow.appendChild(td);
            }
            table.appendChild(dataRow);
        }
    
        var tableContainer = document.querySelector(".vigenere_table"); 
    
        console.log(tableContainer)
        tableContainer.innerHTML = ""; // Xóa nội dung cũ nếu có
        tableContainer.appendChild(table);
    }

    createTable()
}) 
 

