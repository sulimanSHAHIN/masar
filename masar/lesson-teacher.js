// add lesson 
console.log("suliman");
const addNewLesson = document.querySelector('#add-new-lesson');

addNewLesson.addEventListener('click', (event) => {

event.preventDefault();
console.log("suliman12343");

const title = document.querySelector('#lesson-title-add').value;
const text = document.querySelector('#lesson-text-add').value;
const video = document.querySelector('#videoInput').files[0];

// const data = {
//     email,
//     role
//     };


const formData = new FormData();
formData.append('title', title);
formData.append('text', text);
formData.append('video', video);

    console.log(localStorage.getItem('token'));
    const urlParams = new URLSearchParams(window.location.search);
    const id = urlParams.get('id');
    fetch(`http://127.0.0.1:8000/school/addlesson/${id}/`, {
    method: 'POST',
    headers: {
        'Authorization' : `Bearer ${localStorage.getItem('token')}`
    },
    body:formData
    })
    .then(response => response.json())
    .then(data => {
    console.log(data);

      // Handle the response from the API
       swal("lesson added successfully");
       setTimeout(function(){ 
        window.location.href='lesson.html';
        }, 2000);
    })
    .catch(error => {
    console.error(error);
      // Handle any errors that occur during the API request
    });
}
);

//view subject 
function getLesson() {

    const urlParams = new URLSearchParams(window.location.search);
        const id = urlParams.get('id');
        console.log(id);
    fetch(`http://127.0.0.1:8000/school/get_subject_specefic_teacher_id/${localStorage.getItem('id')}`, {
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
            if (data[i].id==id) {
                console.log("is working");
                for (let j = 0; j < data[i].lessons.length; j++) {
                      // Create a new list item element
    const li = document.createElement('li');

    // Create an icon element
    const icon = document.createElement('i');
    icon.className = 'fa fa-trash';
        icon.setAttribute('delete-id',data[i].lessons[j].id);

icon.addEventListener('click', (event) => {
    const deleteId = event.currentTarget.getAttribute('delete-id');
    console.log(deleteId);
    fetch(`http://127.0.0.1:8000/school/deletelesson/${deleteId}/`, {
        method: 'DELETE',
        headers: {
        'Content-Type': 'application/json',
       'Authorization': `Bearer ${localStorage.getItem('token')}`,

        },
    })
        .then(response => {
        if (response.ok) {
            alert('Item deleted successfully');
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
    // Create a text node with the given text
    const textNode = document.createTextNode(data[i].lessons[j].title);

    // Append the icon and text node to the list item
    li.appendChild(icon);
    li.appendChild(textNode);
    li.setAttribute('id',data[i].lessons[j].id);
    li.addEventListener('click', (event) => {
        event.preventDefault();
        const deleteId=li.getAttribute('id');
        // Assuming deleteId and data[i].id are defined
window.location.href = `show-teacher.html?id=${encodeURIComponent(deleteId)}&data_id=${encodeURIComponent(data[i].id)}`;
    
    }
        );
    document.querySelector(".OneLessonTeacher").appendChild(li);
                }
            }
        }
   
   })
   .catch(error => {
       // Handle any errors that occurred during the request
       console.error('Error fetching data:', error);
   });
   } 
   
 window.onload=function () {
    getLesson();
 };