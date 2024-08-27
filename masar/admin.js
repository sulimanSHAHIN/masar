
// add student
const addstudent = document.querySelector('#Add-student');

addstudent.addEventListener('click', (event) => {

event.preventDefault();
const email = document.querySelector('#student-email').value;



const role="STUDENT";
const data = {
    email,
    role
    };
    console.log(email);
    console.log(localStorage.getItem('token'));
    fetch(`http://127.0.0.1:8000/school/admin/Adduser`, {
    method: 'POST',
    headers: {
        'Content-Type': 'application/json',
        'Authorization' : `Bearer ${localStorage.getItem('token')}`
    },
    body:JSON.stringify(data)
    })
    .then(response => response.json())
    .then(data => {
    console.log(data);

      // Handle the response from the API
        if (data.message=="User and subjects created successfully.") {
        swal("STUDENT added successfully")
        setTimeout(function(){ 
            location.reload();
            }, 2000);
        }
        else{
            swal("STUDENT did'nt added")
        }
    
    })
    .catch(error => {
    console.error(error);
      // Handle any errors that occur during the API request
    });
}
);


const deleteSubject=document.querySelector("#delete-Subject");

deleteSubject.addEventListener('click', (event) => {
const selectElement = document.querySelector('.Get-all-subjects');
const selectedOption = selectElement.options[selectElement.selectedIndex];
const optionId = selectedOption.getAttribute('option_id');
console.log(optionId);
    fetch(`http://127.0.0.1:8000/school/admin/Adduser/${optionId}/`, {
        method: 'DELETE',
        headers: {
        'Content-Type': 'application/json',
       'Authorization': `Bearer ${localStorage.getItem('token')}`,

        },
    })
        .then(response => {
        if (response.ok) {
            // alert('Item deleted successfully');
           swal("subject deleted successfuly")
            setTimeout(function(){ 
    location.reload();
    }, 2000);
        } else {
            console.error('Error deleting item');
        }
        })
        .catch(error => {
        console.error('Error:', error);
        });
    
    
});

// enroll course to student this f*ck api is not working////////////////////////////////

const Enroll_course= document.querySelector('#Enroll-course');
Enroll_course.addEventListener('click', (event) => {

event.preventDefault();
const user_name = document.querySelector('#Userenroll').value;
    const selectElement = document.querySelector('.Get-all-subjects123');
    const selectedOption = selectElement.options[selectElement.selectedIndex];
    const optionId = selectedOption.getAttribute('option_id');
    console.log(optionId);

const data = {
    user_name
    };
    console.log(user_name);
    fetch(`http://127.0.0.1:8000/school/admin/enrolled/${optionId}/`, {
    method: 'POST',
    headers: {
        'Content-Type': 'application/json',
        'Authorization' : `Bearer ${localStorage.getItem('token')}`
    },
    body:JSON.stringify(data)
    })
    .then(response => response.json())
    .then(data => {
    console.log(data);
    
    })
    .catch(error => {
    console.error(error);
      // Handle any errors that occur during the API request
    });
}
);

// add teacher

const addteacher = document.querySelector('#Add-teacher');

addteacher.addEventListener('click', (event) => {

event.preventDefault();
console.log("it is working");
const email = document.querySelector('#teacher-email').value;
const subject_name = document.querySelector('#add-subject').value;
const avatar = document.querySelector('#add-imagesss').files[0];
const role="TEACHER";

const formData = new FormData();
formData.append('email', email);
formData.append('subject_name', subject_name);
formData.append('role', role);
formData.append('avatar', avatar);

fetch(`http://127.0.0.1:8000/school/admin/Adduser`, {
    method: 'POST',
    headers: {
        // 'Content-Type': 'application/json',
        'Authorization' : `Bearer ${localStorage.getItem('token')}`
    },
    body:formData
    })
    .then(response => response.json())
    .then(data => {
    console.log(data);

      // Handle the response from the API
       if (data.message=="User and subjects created successfully.") {
         swal("added successfully");
         setTimeout(function(){ 
            location.reload();
            }, 2000);
       }
       else{
        swal("did'nt added");
      }
   
    })
    .catch(error => {
    console.error(error);
      // Handle any errors that occur during the API request
    });
}
);
//view teacher in select
function getallteacher() {

 fetch(`http://127.0.0.1:8000/school/admin/getstudent?role=TEACHER`, {
    headers: {
    'Authorization': `Bearer ${localStorage.getItem('token')}`,
    }
    })
 .then(response => {
    if (response.ok) {
    return response.json();
    }
    throw new Error('Network response was not ok.');
 })
 .then(data => {
    // Do something with the response data
    console.log(data);
    for (let i = 0; i < data.length; i++) {
        const option = document.createElement('option');
        option.textContent = data[i].username;
        option.setAttribute('option_id', data[i].id); // Set the 'name' attribute to 'option_id'
        document.querySelector(".Choose-Teacher").appendChild(option);
    }

})
.catch(error => {
    // Handle any errors that occurred during the request
    console.error('Error fetching data:', error);
});
} 

// add subject to teacher //you have to return message
const addSubejct = document.querySelector('#add-subject-to-teacher');

addSubejct.addEventListener('click', (event) => {

event.preventDefault();
console.log("it is working");
const subject_name = document.querySelector('#add-new-subject').value;
const avatar = document.querySelector('#add-new-image1');
const selectElement = document.querySelector('#choose-teacher-new');
const selectedOption = selectElement.options[selectElement.selectedIndex];
const optionId = selectedOption.getAttribute('option_id');
console.log(optionId);

const data={
    subject_name,
    avatar
}
  
    fetch(`http://127.0.0.1:8000/school/admin/add_another_subject_for_teacher/${optionId}/`, {
    method: 'POST',
    headers: {
        'Content-Type': 'application/json',
        'Authorization' : `Bearer ${localStorage.getItem('token')}`
    },
    body:JSON.stringify(data)
    })
    .then(response => response.json())
    .then(data => {
    console.log(data);
        swal("subject added successfully");
      // Handle the response from the API
      setTimeout(function(){ 
        location.reload();
        }, 2000);
    
    })
    .catch(error => {
    console.error(error);
      // Handle any errors that occur during the API request
    });
}
);

// get all student to delete 
function getallstudent() {

    fetch(`http://127.0.0.1:8000/school/admin/getstudent?role=STUDENT`, {
       headers: {
       'Authorization': `Bearer ${localStorage.getItem('token')}`,
       }
       })
    .then(response => {
       if (response.ok) {
       return response.json();
       }
       throw new Error('Network response was not ok.');
    })
    .then(data => {
       // Do something with the response data
       console.log(data);
       for (let i = 0; i < data.length; i++) {
              // Create the main container div
    const mainDiv = document.createElement('div');
    mainDiv.className = 'One-Student';

    // Create the inner container div
    const innerDiv = document.createElement('div');
    innerDiv.className = 'Add-user111 One-studentIn d-flex justify-content-between align-items-center flex-wrap';

    // Create the email container div
    const emailDiv = document.createElement('div');
    emailDiv.className = 'mb-6 Add-subject';
    emailDiv.style.width = '30%';

    const emailContent = document.createElement('div');
    emailContent.className = 'User-Email';
    emailContent.textContent = data[i].email;

    emailDiv.appendChild(emailContent);

    // Create the username container div
    const usernameDiv = document.createElement('div');
    usernameDiv.className = 'mb-6';
    usernameDiv.style.width = '30%';

    const usernameContent = document.createElement('div');
    usernameContent.className = 'User-Username';
    usernameContent.textContent = data[i].username;

    usernameDiv.appendChild(usernameContent);

  
    // Create the buttons container div
    const buttonsDiv = document.createElement('div');
    buttonsDiv.className = 'Buttons11 d-flex justify-content-between w-100 mt-2';

    const deleteButton = document.createElement('button');
    deleteButton.className = 'btn btn-primary Add-User-button Delete-User';
    deleteButton.style.backgroundColor = 'rgb(255, 0, 0)';
    deleteButton.style.width = '7rem';
    deleteButton.style.height = '3rem';
    deleteButton.style.fontSize = '1.3rem';
    deleteButton.style.borderRadius = '1rem';
    deleteButton.textContent = 'Delete';

    buttonsDiv.appendChild(deleteButton);

    // Append all created elements to the inner container div
    innerDiv.appendChild(emailDiv);
    innerDiv.appendChild(usernameDiv);
    innerDiv.appendChild(buttonsDiv);

    // Append the inner container div to the main container div
    mainDiv.appendChild(innerDiv);
    deleteButton.setAttribute('delete-id',data[i].id);
    // /////////////////////////////up////////////////////////////////////////////////////////
 
    deleteButton.addEventListener('click', (event) => {
        const deleteId = event.currentTarget.getAttribute('delete-id'); // Get the id value from the clicked element
        console.log("deleting is");
        console.log(deleteId);
        fetch(`http://127.0.0.1:8000/school/admin/deleteTeacher/${deleteId}/`, {
            method: 'DELETE',
            headers: {
            'Content-Type': 'application/json',
           'Authorization': `Bearer ${localStorage.getItem('token')}`,

            },
        })
            .then(response => {
            if (response.ok) {
                // alert('Item deleted successfully');
               swal("student deleted successfuly")
                setTimeout(function(){ 
        location.reload();
        }, 2000);
            } else {
                console.error('Error deleting item');
            }
            })
            .catch(error => {
            console.error('Error:', error);
            });
        
        
    });
    // /////////////////////////////down////////////////////////////////////////////////////////
    // Append the main container div to the body or any other parent element
    document.querySelector(".Component-AllStudent").appendChild(mainDiv);

    // Append a horizontal rule after the main container div
    const hr = document.createElement('hr');
    document.querySelector(".Component-AllStudent").appendChild(hr);
    

       }
   
   })
   .catch(error => {
       // Handle any errors that occurred during the request
       console.error('Error fetching data:', error);
   });
   } 
   

//    get all teacher to delete
function getallteacherDelete() {

    fetch(`http://127.0.0.1:8000/school/admin/getstudent?role=TEACHER`, {
       headers: {
       'Authorization': `Bearer ${localStorage.getItem('token')}`,
       }
       })
    .then(response => {
       if (response.ok) {
       return response.json();
       }
       throw new Error('Network response was not ok.');
    })
    .then(data => {
       // Do something with the response data
       console.log("data:",data);
       for (let i = 0; i < data.length; i++) {
           // Create the main container div
    const mainDiv = document.createElement('div');
    mainDiv.className = 'One-Student';

    // Create the inner container div
    const innerDiv = document.createElement('div');
    innerDiv.className = 'Add-user111 One-TeacherIn d-flex justify-content-between align-items-center flex-wrap';

    // Create the email container div
    const emailDiv = document.createElement('div');
    emailDiv.className = 'mb-6 Add-subject';
    emailDiv.style.width = '30%';

    const emailContent = document.createElement('div');
    emailContent.className = 'User-Email';
    emailContent.textContent = 'Sulimansuliiamnsuliiman@gmail.com';

    emailDiv.appendChild(emailContent);

    // Create the username container div
    const usernameDiv = document.createElement('div');
    usernameDiv.className = 'mb-6';
    usernameDiv.style.width = '30%';

    const usernameContent = document.createElement('div');
    usernameContent.className = data[i].email;
    usernameContent.textContent = data[i].username;

    usernameDiv.appendChild(usernameContent);

    // Create the buttons container div
    const buttonsDiv = document.createElement('div');
    buttonsDiv.className = 'Buttons11 d-flex justify-content-between mt-2';

    const deleteButton = document.createElement('button');
    deleteButton.className = 'btn btn-primary Add-User-button';
    deleteButton.style.backgroundColor = 'rgb(255, 0, 0)';
    deleteButton.style.width = '9rem';
    deleteButton.style.height = '3rem';
    deleteButton.style.fontSize = '1.3rem';
    deleteButton.style.borderRadius = '1rem';
    deleteButton.textContent = 'Delete';

    buttonsDiv.appendChild(deleteButton);

    // Append all created elements to the inner container div
    innerDiv.appendChild(emailDiv);
    innerDiv.appendChild(usernameDiv);
    innerDiv.appendChild(buttonsDiv);

    // Append the inner container div to the main container div
    mainDiv.appendChild(innerDiv);
    deleteButton.setAttribute('delete-id',data[i].id);
    // /////////////////////////////up////////////////////////////////////////////////////////
 
    deleteButton.addEventListener('click', (event) => {
        const deleteId = event.currentTarget.getAttribute('delete-id'); // Get the id value from the clicked element
        console.log("deleting is");
        console.log(deleteId);
        fetch(`http://127.0.0.1:8000/school/admin/deleteTeacher/${deleteId}/`, {
            method: 'DELETE',
            headers: {
            'Content-Type': 'application/json',
           'Authorization': `Bearer ${localStorage.getItem('token')}`,

            },
        })
            .then(response => {
            if (response.ok) {
                // alert('Item deleted successfully');
               swal("teacher deleted successfuly")
                setTimeout(function(){ 
        location.reload();
        }, 2000);
            } else {
                console.error('Error deleting item');
            }
            })
            .catch(error => {
            console.error('Error:', error);
            });
        
        
    });
    // /////////////////////////////down////////////////////////////////////////////////////////
    
    // Append the main container div to the body or any other parent element
    document.querySelector(".Get-All-Teacher").appendChild(mainDiv);

    // Append a horizontal rule after the main container div
    const hr = document.createElement('hr');
    document.querySelector(".Get-All-Teacher").appendChild(hr);
       }
   
   })
   .catch(error => {
       // Handle any errors that occurred during the request
       console.error('Error fetching data:', error);
   });
   } 
   
//view subject in select
function getallsubjects() {

 fetch(`http://127.0.0.1:8000/school/common/getsubject`, {
    headers: {
    'Authorization': `Bearer ${localStorage.getItem('token')}`,
    }
    })
 .then(response => {
    if (response.ok) {
    return response.json();
    }
    throw new Error('Network response was not ok.');
 })
 .then(data => {
    // Do something with the response data
    console.log(data);
    for (let i = 0; i < data.length; i++) {
        const option = document.createElement('option');
        option.textContent = data[i].subject_name;
        option.setAttribute('option_id', data[i].id); // Set the 'name' attribute to 'option_id'
        document.querySelector(".Update-new-subject").appendChild(option);
    }

})
.catch(error => {
    // Handle any errors that occurred during the request
    console.error('Error fetching data:', error);
});
} 
function getallsubjects() {

    fetch(`http://127.0.0.1:8000/school/common/getsubject`, {
       headers: {
       'Authorization': `Bearer ${localStorage.getItem('token')}`,
       }
       })
    .then(response => {
       if (response.ok) {
       return response.json();
       }
       throw new Error('Network response was not ok.');
    })
    .then(data => {
       // Do something with the response data
       console.log(data);
       for (let i = 0; i < data.length; i++) {
           const option = document.createElement('option');
           option.textContent = data[i].subject_name;
           option.setAttribute('option_id', data[i].id); // Set the 'name' attribute to 'option_id'
           document.querySelector(".Get-all-subjects123").appendChild(option);
       }
   
   })
   .catch(error => {
       // Handle any errors that occurred during the request
       console.error('Error fetching data:', error);
   });
   } 


// view course in delete subject
function getallsubjectstodelete() {

    fetch(`http://127.0.0.1:8000/school/common/getsubject`, {
       headers: {
       'Authorization': `Bearer ${localStorage.getItem('token')}`,
       }
       })
    .then(response => {
       if (response.ok) {
       return response.json();
       }
       throw new Error('Network response was not ok.');
    })
    .then(data => {
       // Do something with the response data
       console.log(data);
       for (let i = 0; i < data.length; i++) {
           const option = document.createElement('option');
           option.textContent = data[i].subject_name;
           option.setAttribute('option_id', data[i].id); // Set the 'name' attribute to 'option_id'
           document.querySelector(".Get-all-subjects").appendChild(option);
       }
   
   })
   .catch(error => {
       // Handle any errors that occurred during the request
       console.error('Error fetching data:', error);
   });
   } 

// loading to the page for all get api
window.onload=function () {
    getallteacher();
    getallstudent();
    getallteacherDelete();
    getallsubjectstodelete();
    getallsubjects();
};
