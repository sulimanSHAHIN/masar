
   const addcomment = document.querySelector('.Add-comment');

   addcomment.addEventListener('click', (event) => {

event.preventDefault();
const urlParams = new URLSearchParams(window.location.search);
const lessonId = urlParams.get('id');
const dataId=urlParams.get('data_id');
console.log(dataId);
console.log(lessonId); 
const comment= document.querySelector('#Comment-form').value;



const data = {
    comment
    };
    console.log(localStorage.getItem('token'));
    fetch(`http://127.0.0.1:8000/school/sendComment/${lessonId}/`, {
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
            alert("STUDENT added successfully");
        }
        else{
            alert("STUDENT did'nt added")
        }
    
    })
    .catch(error => {
    console.error(error);
      // Handle any errors that occur during the API request
    });
}
);


function getallsubjects() {

    const urlParams = new URLSearchParams(window.location.search);
        const lessonId = urlParams.get('id');
        const dataId=urlParams.get('data_id');
        console.log(dataId);
        console.log(lessonId); 
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
        if (data[i].id==dataId) {
            for (let j = 0; j < data[i].lessons.length; j++) {
                if (data[i].lessons[j].id==lessonId) {
                    
// const videoPath = "Zoom_Meeting_40-Minutes__2024-06-06_18-16-31.mp4";

                // document.querySelector(".get-video-teacher").setAttribute('src',videoPath);
                document.querySelector(".get-text-teacher").innerHTML=data[i].lessons[j].text;
                document.querySelector(".get-title-teacher").innerHTML=data[i].lessons[j].title;
                // 
                for (let k = 0; k < data[i].lessons[j].comments.length; k++) {
                    const mainDiv = document.createElement('div');
                    mainDiv.className = 'outside-one-comment';
                
                    // Create the first comment section
                    const firstCommentDiv = document.createElement('div');
                    firstCommentDiv.className = 'one-comment';
                
                    const imageCommentDiv = document.createElement('div');
                    imageCommentDiv.className = 'image-comment';
                
                    const commentUsernameDiv = document.createElement('div');
                    commentUsernameDiv.className = 'comment-Username';
                    commentUsernameDiv.textContent =  data[i].lessons[j].comments[k].username;
                
                    firstCommentDiv.appendChild(imageCommentDiv);
                    firstCommentDiv.appendChild(commentUsernameDiv);
                
                    // Create the comment section
                    const commentSectionDiv = document.createElement('div');
                    commentSectionDiv.className = 'comment-section';
                
                    const commentTextDiv = document.createElement('div');
                    commentTextDiv.className = 'comment-text';
                    commentTextDiv.textContent = data[i].lessons[j].comments[k].comment;
                
                    commentSectionDiv.appendChild(commentTextDiv);
                
                    // Create the reply section
                    const replySectionDiv = document.createElement('div');
                    replySectionDiv.className = 'reply-section';
                    if (data[i].lessons[j].comments[k].replays!=null) {
                
                    const replyOutsideCommentDiv = document.createElement('div');
                    replyOutsideCommentDiv.className = 'outside-one-comment';
                
                    const replyCommentDiv = document.createElement('div');
                    replyCommentDiv.className = 'one-comment';
                
                    const replyImageCommentDiv = document.createElement('div');
                    replyImageCommentDiv.className = 'image-comment';
                
                    const replyCommentUsernameDiv = document.createElement('div');
                    replyCommentUsernameDiv.className = 'comment-Username';
                    replyCommentUsernameDiv.textContent = data[i].lessons[j].comments[k].replays.teacher_name;
                
                    replyCommentDiv.appendChild(replyImageCommentDiv);
                    replyCommentDiv.appendChild(replyCommentUsernameDiv);
                
                    const replyCommentSectionDiv = document.createElement('div');
                    replyCommentSectionDiv.className = 'comment-section';
                
                    const replyCommentTextDiv = document.createElement('div');
                    replyCommentTextDiv.className = 'comment-text';
                        
                        replyCommentTextDiv.textContent = data[i].lessons[j].comments[k].replays.replays;
                        
                        replyCommentSectionDiv.appendChild(replyCommentTextDiv);
                        
                        replyOutsideCommentDiv.appendChild(replyCommentDiv);
                        replyOutsideCommentDiv.appendChild(replyCommentSectionDiv);
                        
                        replySectionDiv.appendChild(replyOutsideCommentDiv);
                    }
                    
                    // Append all created elements to the main container div
                    mainDiv.appendChild(firstCommentDiv);
                    mainDiv.appendChild(commentSectionDiv);
                    mainDiv.appendChild(replySectionDiv);
                        
                        // Append the main container div to the body or any other parent element
                        document.querySelector(".view-comment").appendChild(mainDiv);
                    
                }
            } 
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

