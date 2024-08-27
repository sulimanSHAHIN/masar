let registerForm =document.querySelector(".Submit-Login");
registerForm.addEventListener('click', (event) => {

    event.preventDefault();
    const username = document.querySelector('#username').value;
    const password = document.querySelector('#password').value;
    
        const data = {
        username,
        password
        };
        fetch('http://127.0.0.1:8000/school/Login', {
        method: 'POST',
        headers: {
             'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
        })
        .then(response => response.json())
        .then(data => {
          if(data.message=="success")
          {
          console.log(data);
          localStorage.setItem("token",data.access);
          localStorage.setItem('id',data.id)
          if (data.role=="ADMIN") {
        window.location.href = 'admin.html';            
          } 
          if (data.role=="TEACHER") {
            window.location.href = 'Teacher.html';            
              } 
              if (data.role=="STUDENT") {
                window.location.href = 'index.html';      
                return;      
                  } 
          }
          else{
              swal(data.detail)
          }
        })
        .catch(error => {
        console.error(error);
          // Handle any errors that occur during the API request
        });
    }
    );