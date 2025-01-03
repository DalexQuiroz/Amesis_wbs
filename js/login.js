document.addEventListener('DOMContentLoaded', function() {
    const loginForm = document.getElementById('loginForm');
    const errorMessage = document.getElementById('errorMessage');

    loginForm.addEventListener('submit', function(e) {
        e.preventDefault();
        const email = document.getElementById('email').value;
        const password = document.getElementById('password').value;
        const url_users="http://192.168.1.76:8082/usuarios"
        fetch(url_users)
        .then(response =>{
            if (!response.ok){
                throw new Error("Request error for getting the users")
            }
            return response.json()
        })
        .then(data =>{
            const users_list= data
            let wrong_session=0
            const length_users= users_list.length
            users_list.forEach(element => {
                if (element.correo == email && element.password == password){
                    
                    window.location ="index.html"
                }
                else{
                    wrong_session  +=1;
                }
                    
            });
            if(wrong_session== length_users){
                errorMessage.textContent="Email o password incorrectos"
            }
        })
        .catch(error =>{
            console.log("Error with the users request")
        })
    });
})