function getallexams() {

    fetch(`http://localhost:8000/school/get_all_exams`, {
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
        // Create the main container element
const oneAchieveDiv = document.createElement('div');
oneAchieveDiv.classList.add('One-achieve', 'd-flex');

// Create the course logo container
const achieveCourseLogoDiv = document.createElement('div');
achieveCourseLogoDiv.classList.add('Achieve-course-logo');

// Create the course logo itself (you'll need to provide the actual logo content)
const courseLogoDiv = document.createElement('div');
courseLogoDiv.classList.add('Course-logo');
// ... add the logo content (image, icon, text, etc.) ...

// Append the logo to the logo container
achieveCourseLogoDiv.appendChild(courseLogoDiv);

// Create the course data container
const achieveCourseDataDiv = document.createElement('div');
achieveCourseDataDiv.classList.add('Achieve-course-data');

// Create the course name and number container
const achieveNameNnomDiv = document.createElement('div');
achieveNameNnomDiv.classList.add('Achieve-nameNnom', 'd-flex');

// Create the course name element
const achieveNameDiv = document.createElement('div');
achieveNameDiv.classList.add('Achieve-name');
achieveNameDiv.textContent = data[i].subject_info.subject_name; // Set the actual course name

// Append the name to the name container
achieveNameNnomDiv.appendChild(achieveNameDiv);

// Create the percent container
const achievePercentDiv = document.createElement('div');
achievePercentDiv.classList.add('Achieve-percent');
// Create the total percent element (you'll need to set the actual value)
const achieveTotalDiv = document.createElement('div');
achieveTotalDiv.classList.add('Achieve-total');

// ... set the total percent value ...

// Create the completed percent element (you'll need to set the actual value)
const achieveDoneDiv = document.createElement('div');
achieveDoneDiv.classList.add('Achieve-done');
achieveDoneDiv.style.width=`${data[i].exam.score}%`;
// ... set the completed percent value ...

// Append the total and done elements to the percent container
achievePercentDiv.appendChild(achieveTotalDiv);
achievePercentDiv.appendChild(achieveDoneDiv);

// Append the name container and percent container to the course data container
achieveCourseDataDiv.appendChild(achieveNameNnomDiv);
achieveCourseDataDiv.appendChild(achievePercentDiv);

// Append the logo container and data container to the main container
oneAchieveDiv.appendChild(achieveCourseLogoDiv);
oneAchieveDiv.appendChild(achieveCourseDataDiv);

// Now you have the 'oneAchieveDiv' ready to be added to your HTML
document.querySelector(".Achieve-container").appendChild(oneAchieveDiv); // Example: Append to the body
      
    }
   
   })
   .catch(error => {
       // Handle any errors that occurred during the request
       console.error('Error fetching data:', error);
   });
   } 
   window.onload=function () {
    getallexams();
 };
