'use strict';
window.addEventListener("load", function(){
    fetchAllBooks();
    this.document.querySelector('#searchBtn').addEventListener('click', fetchBook);
    this.document.querySelector('#formSave').addEventListener('click', submitBtn);
});



function fetchAllBooks(){
    let tBody = document.querySelector('tbody');

    fetch('http://127.0.0.1:8080/books')
    .then((response) => response.json())
    .then(function(data){
        for (let index = 0; index < data.length; index++) {
            let json = JSON.stringify(data);
            let test = JSON.parse(json);
            let tTemp = document.createElement('tr');

            for(let i = 0; i < 6; i++){
                let element = document.createElement('td');
                element.append(Object.values(test[index])[i]);
                tTemp.appendChild(element);
            }
  
            tBody.appendChild(tTemp);
            
        }
    });
    
}


function fetchBook(){
    let tBody = document.querySelector('tbody');
    tBody.innerHTML = null;
    let fieldValue = document.querySelector('#searchField').value;
    if(fieldValue == ""){
        fetchAllBooks();
        return;
    }

    let temp = "http://127.0.0.1:8080/books/" + fieldValue;
    fetch(temp)
    .then(function(response){
        if(!response.ok){
            console.log(response.status);
            let errorMsg = document.createElement('p');
            errorMsg.innerHTML = "No results found.";
            tBody.appendChild(errorMsg);
            
        }
        return response.json();
    })
    .then(function(data){
        
        let json = JSON.stringify(data);
        let test = JSON.parse(json);
        let tTemp = document.createElement('tr');

        for(let i = 0; i < 6; i++){
            let element = document.createElement('td');
            element.append(Object.values(test)[i]);
            tTemp.appendChild(element);
        }

        tBody.appendChild(tTemp);

    }).catch(function(error){
        console.log(error);
    })
}

function submitBtn(e){
    var forms = document.querySelectorAll('.needs-validation')

  // Borrowed and modified https://getbootstrap.com/docs/5.1/forms/validation/?
    Array.prototype.slice.call(forms)
    .forEach(function (form) {
        if(!form.hasSubmitListener){
            form.hasSubmitListener = true;
        
            form.addEventListener('submit', function (event) {
                if (!form.checkValidity()) {
                    event.preventDefault();
                    event.stopPropagation();
                }
                if(form.checkValidity()){
                    
                    addBook();
                    form.classList.add('was-validated');
                }
                
            }, false);
    }
    })

    
}

function addBook(e){ 

    let tempTitle = document.querySelector('#inputTitle').value;
    let tempDesc = document.querySelector('#inputDesc').value;
    let tempAuthor = document.querySelector('#inputAuthor').value;
    let tempYear = document.querySelector('#inputYear').value;
    let tempCat = document.querySelector('#inputCat').value;
    let jsonTemp = {"title":tempTitle, "description":tempDesc, "author":tempAuthor, "yearPublished":tempYear, "category":tempCat};

    fetch('http://127.0.0.1:8080/books', {
        method: "POST",
        body: JSON.stringify(jsonTemp),
        headers: {
            "Content-Type": "application/json"
        }
    })
    .then(function(response){
        if(!response.ok){
            throw new Error(response.status);
        }
        else{
            return response.json();
        }
    })
    .then(function(data){

        let json = JSON.stringify(data);
        let test = JSON.parse(json);

    }).catch(function(error){
        console.log(error);
    })
    
}