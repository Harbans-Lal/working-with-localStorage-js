const loginForm = document.querySelector('.login-form');
const signupForm = document.querySelector('.signup-form');

const signUpLink = document.getElementById('signUpLink');
const loginLink = document.getElementById('loginLink');

signUpLink?.addEventListener('click', function(event) {
  event.preventDefault();
  loginForm.style.display = 'none';
  signupForm.style.display = 'block';
});

loginLink?.addEventListener('click', function(event){
    event.preventDefault();
    
    loginForm.style.display = 'block';
    signupForm.style.display = "none";
})
document.getElementById('loginBtn')?.addEventListener("click" , (e)=>{
    e.preventDefault();
    let uName = document.getElementById("uName");
    let passwd = document.getElementById("passwd");
    if(uName.value == "" || passwd.value==""){
        alert("enter all fields")
    }else{
        window.location.href = 'home.html';
    }
  
})

let allUser = JSON.parse(localStorage.getItem('users'))||[];
document.getElementById('signUpBtn')?.addEventListener('click' ,  (e)=>{
    e.preventDefault();

    let name = document.getElementById("upName").value;
    let email  =document.getElementById("email").value;
    let passwd = document.getElementById("password").value;

    let user = {
        name:name,
        email:email,
        passwd:passwd
    }
    allUser.push(user);

    localStorage.setItem("users", JSON.stringify(allUser));

    updateUi();
})

function updateUi(){
    let userDate = JSON.parse(localStorage.getItem('users'));
    console.log(userDate);
    let tBody = document.getElementById('tBody');
    tBody.innerHTML = "";
    userDate.map((data,ind) =>{
        let tr  = document.createElement( 'tr') ;

        let allData = `<td>${data.name}</td>
                        <td> ${data.email}</td>
                        <td>${data.passwd}</td>
                        <td> <a href='#'> Update</a></td>
                        <td> <a href='#'class='delete' id='${ind}'>Delete</a> </td>
                        <td class='uniqueId' style='display:none;'>${ind} </td>`;

        tr.innerHTML = allData;   
         tBody.appendChild(tr);
    })
}

updateUi();

let deleteUser  = document.querySelectorAll('.delete');
deleteUser.forEach(deleteLink => {
    deleteLink.addEventListener('click', (e) => {
        e.preventDefault();
        let currTr = e.target.closest('tr');
        let uniqueId = e.target.getAttribute('id');
        removeUser(uniqueId);
    });
});

function removeUser(id){
    let getallUser = JSON.parse(localStorage.getItem('users')) || [];
    let index = parseInt(id);
    getallUser.splice(index, 1);
    localStorage.setItem('users', JSON.stringify(getallUser));
    updateUi();
}
