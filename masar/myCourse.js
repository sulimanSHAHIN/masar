function getallsubjects() {

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
       const mainDiv = document.createElement('div');
       mainDiv.className = 'col-lg-4 col-md-6 wow fadeInUp';
       mainDiv.setAttribute('data-wow-delay', '0.5s');
   
       // Create the course item div
       const courseItemDiv = document.createElement('div');
       courseItemDiv.className = 'course-item bg-light';
       courseItemDiv.setAttribute('course_id',data[i].id)
      
       courseItemDiv.addEventListener('click', (event) => {
         const id1 = courseItemDiv.getAttribute('course_id'); 
         window.location.href = `lesson.html?id=${encodeURIComponent(id1)}`; 


      });
       // Create the image container div
      const imageContainerDiv = document.createElement('div');
      imageContainerDiv.className = 'position-relative overflow-hidden';
   
       // Create the image element
      const img = document.createElement('img');
      img.className = 'img-fluid';
      img.src = data[i].avatar;
       img.alt = ''; // Set the alt attribute as needed
   
       // Append the image to the image container div
      imageContainerDiv.appendChild(img);
   
       // Create the text container div
      const textContainerDiv = document.createElement('div');
      textContainerDiv.className = 'text-center p-4 pb-0';
   
       // Create the rating container div
       const ratingContainerDiv = document.createElement('div');
       ratingContainerDiv.className = 'mb-3';
   
       // Create the rating stars
       for (let i = 0; i < 5; i++) {
           const star = document.createElement('small');
           star.className = 'fa fa-star text-primary';
           ratingContainerDiv.appendChild(star);
       }
   
       // Create the rating count
       const ratingCount = document.createElement('small');
       ratingCount.textContent = '(123)';
       ratingContainerDiv.appendChild(ratingCount);
   
       // Create the course title
       const courseTitle = document.createElement('h5');
       courseTitle.className = 'mb-4';
       courseTitle.textContent = data[i].subject_name
       ;
   
       // Append the rating container and course title to the text container div
       textContainerDiv.appendChild(ratingContainerDiv);
       textContainerDiv.appendChild(courseTitle);
   
       // Create the instructor container div
       const instructorContainerDiv = document.createElement('div');
       instructorContainerDiv.className = 'd-flex border-top';
   
       // Create the instructor info
       const instructorInfo = document.createElement('small');
       instructorInfo.className = 'flex-fill text-center border-end py-2';
   
       const instructorIcon = document.createElement('i');
       instructorIcon.className = 'fa fa-user-tie text-primary me-2';
   
       const instructorName = document.createTextNode(data[i].teacher_name);
   
       // Append the instructor icon and name to the instructor info
       instructorInfo.appendChild(instructorIcon);
       instructorInfo.appendChild(instructorName);
   
       // Append the instructor info to the instructor container div
       instructorContainerDiv.appendChild(instructorInfo);
   
       // Append the image container, text container, and instructor container to the course item div
       courseItemDiv.appendChild(imageContainerDiv);
       courseItemDiv.appendChild(textContainerDiv);
       courseItemDiv.appendChild(instructorContainerDiv);
   
       // Append the course item div to the main container div
       mainDiv.appendChild(courseItemDiv);
   
       // Append the main container div to the body or any other parent element
       document.querySelector(".Outside-my-subject").appendChild(mainDiv);
   
       
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