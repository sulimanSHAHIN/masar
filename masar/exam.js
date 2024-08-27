//view teacher in select
function getExam() {
    const urlParams = new URLSearchParams(window.location.search);
    const course_id = urlParams.get('id');
    var nombre2;
    var nombre;
    console.log(course_id);
    console.log(document.querySelector(".List-exam"));
    fetch(`http://localhost:8000/school/do_exam/${course_id}/`, {
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
       nombre=data.exams_id;
       nombre2=data.questions.length;
       for (let i = 0; i < data.questions.length; i++) {
        // Create the main container li
        const mainLi = document.createElement('li');
        mainLi.className = 'd-flex justify-content-between mt-2';
        
        // Create the allthing div
        const allthingDiv = document.createElement('div');
        allthingDiv.className = 'allthing col-lg-12 col-md-11 col-sm-12';
        
        // Create the question div
        const questionDiv = document.createElement('div');
        questionDiv.className = 'question';
        questionDiv.style.fontSize = '24px';
        
        const questionP = document.createElement('p');
        questionP.textContent = data.questions[i].question;
        
        questionDiv.appendChild(questionP);
        
        // Create the checking-answer div
        const checkingAnswerDiv = document.createElement('div');
        checkingAnswerDiv.className = 'checking-answer content01 d-flex justify-content-between flex-wrap';
        checkingAnswerDiv.style.fontSize = '18px';
        
        // Create the form-check divs
        const formCheckDivs = [];
        for (let j = 0; j < data.questions[i].options.length; j++) {
            const formCheckDiv = document.createElement('div');
            formCheckDiv.className = 'form-check col-lg-3 col-md-12 col-12 mt-2';
        
            const inputElement = document.createElement('input');
            inputElement.className = 'form-check-input';
            inputElement.type = 'radio';
            inputElement.name = `flexRadioDefault${i+1}`;
            inputElement.id = `flexRadioDefault${j + 1}`;
            inputElement.setAttribute('data-question-id', data.questions[i].id); // Add this line
        
            const labelElement = document.createElement('label');
            labelElement.className = 'form-check-label';
            labelElement.htmlFor = `flexRadioDefault${j + 1}`;
            labelElement.textContent = data.questions[i].options[j];
        
            formCheckDiv.appendChild(inputElement);
            formCheckDiv.appendChild(labelElement);
        
            formCheckDivs.push(formCheckDiv);
        }
        
        // Append the form-check divs to the checking-answer div
        formCheckDivs.forEach(div => checkingAnswerDiv.appendChild(div));
        
        // Append the question div and checking-answer div to the allthing div
        allthingDiv.appendChild(questionDiv);
        allthingDiv.appendChild(checkingAnswerDiv);
        
        // Append the allthing div to the main li
        mainLi.appendChild(allthingDiv);
            
        // Append the main li to the body or any other parent element
        document.querySelector(".List-exam").appendChild(mainLi);
    }
        // /////////////////////////////////////////////////////
        
        const submit = document.querySelector('#upload-exam');

submit.addEventListener('click', (event) => {
        // const formData = new FormData();
        const data={
        };    
    for (let i = 0; i < nombre2; i++) {
        const checkedRadio = document.querySelector(`input[name="flexRadioDefault${1+i}"]:checked`);
        if (checkedRadio) {
            const label = checkedRadio.nextElementSibling;
            data[`${checkedRadio.getAttribute('data-question-id')}`]=label.textContent.trim();
// formData.append(`${checkedRadio.getAttribute('data-question-id')}`, label);
    }
    else{
        data[`${document.querySelector(`input[name="flexRadioDefault${1+i}"]`).getAttribute('data-question-id')}`]=0;

    }
    }
    
    console.log(data);
    const data1={
        "answers":data
    }
    console.log(data1);
event.preventDefault();
    fetch(`http://localhost:8000/school/student_answer/${nombre}/`, {
    method: 'POST',
    headers: {
        'Content-Type': 'application/json',
        'Authorization' : `Bearer ${localStorage.getItem('token')}`
    },
    body:JSON.stringify(data1)
    })
    .then(response => response.json())
    .then(data => {
    console.log(data);
        console.log(data.score);
      // Handle the response from the API
       swal(`your score is ${data.score}` )
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

        // /////////////////////////////////////////////////////

   })
   .catch(error => {
       // Handle any errors that occurred during the request
       console.error('Error fetching data:', error);
   });
   } 
   window.onload=function () {
    getExam();
 };

// add student
