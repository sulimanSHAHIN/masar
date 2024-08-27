function getallsubjects() {
    const urlParams = new URLSearchParams(window.location.search);
    const course_id = urlParams.get('id');
    console.log(course_id);
    fetch(`http://127.0.0.1:8000/school/student/getmycources`, {
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
        if (data[i].id==course_id) {
            console.log("suliman");
            for (let j = 0; j < data[i].lessons.length; j++) {
                var listItem = document.createElement('li');

// Create the icon element
var icon = document.createElement('i');
icon.className = "fa fa-arrow-left"; // Set the class name for the icon

// Create the text node
var textNode = document.createTextNode(data[i].lessons[j].title);

// Append the icon and text to the list item
listItem.appendChild(icon);
listItem.appendChild(textNode);

// Assuming you want to append this list item to a specific location in your document,
// let's say a <ul> element with id 'myList'
listItem.setAttribute('id',data[i].lessons[j].id);
    listItem.addEventListener('click', (event) => {
        event.preventDefault();
        const deleteId=listItem.getAttribute('id');
        // Assuming deleteId and data[i].id are defined
window.location.href = `show.html?id=${encodeURIComponent(deleteId)}&data_id=${encodeURIComponent(data[i].id)}`;
    
    }
        );
document.querySelector(".OneLesson").appendChild(listItem);
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
      getallsubjects();
   };

//    
let doExam =document.querySelector(".Do-exam");
doExam.addEventListener('click', (event) => {
    event.preventDefault();
    const urlParams = new URLSearchParams(window.location.search);
    const course_id = urlParams.get('id');
    console.log(course_id);
    window.location.href = `exam.html?id=${encodeURIComponent(course_id)}`; 

        }
    );