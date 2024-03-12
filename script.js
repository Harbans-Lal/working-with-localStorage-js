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

let tBody = document.getElementById('tBody');
let userDate = JSON.parse(localStorage.getItem('users'));
function updateUi(){

    console.log(userDate);

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

tBody.addEventListener('click', (e)=>{
    if(e.target.classList.contains('delete')){
        let id  = e.target.getAttribute('id');
        userDate.splice(id,1);

        localStorage.setItem('users',JSON.stringify(userDate));
        updateUi();
    }
})
