let currentView;
document.addEventListener('DOMContentLoaded', function() {
  // Use buttons to toggle between views
  document.querySelector('#inbox').addEventListener('click', () => load_mailbox('inbox'));
  document.querySelector('#sent').addEventListener('click', () => load_mailbox('sent'));
  document.querySelector('#archived').addEventListener('click', () => load_mailbox('archive'));
  document.querySelector('#compose').addEventListener('click', compose_email);

   
  document.querySelector('#compose-form').addEventListener('submit', function(event) {
    event.preventDefault(); 

    
    const recipients = document.querySelector('#compose-recipients').value;
    const subject = document.querySelector('#compose-subject').value;
    const body = document.querySelector('#compose-body').value;
    
    
    fetch('/emails', {
      method: 'POST',
      body: JSON.stringify({
        recipients: recipients,
        subject: subject,
        body: body
      })
    })
    .then(response => response.json())
    .then(result => {
      
      console.log(result);
      
      if (result.message) {
        
        load_mailbox('sent');
      } else {
       
        alert(result.error);
      }
    })
    .catch(error => {
      console.error('Error:', error);
      alert('An error occurred while sending the email.');
    });
  });
  
  
  load_mailbox('inbox');
});


function compose_email(email = null) {

  document.querySelector('#emails-view').style.display = 'none';
  document.querySelector('#emailDetails').style.display = 'none';
  document.querySelector('#compose-view').style.display = 'block';

  if (email ){
  document.querySelector('#compose-recipients').value = `${email.sender}`;
  document.querySelector('#compose-subject').value = `Re: ${email.subject}`;
  document.querySelector('#compose-body').value = `On ${email.timestamp} ${email.sender} wrote: ${email.body}`;
  }

  if(email.subject === undefined){
    document.querySelector('#compose-recipients').value = '';
    document.querySelector('#compose-subject').value = '';
    document.querySelector('#compose-body').value = '';
    }
}


function pageView(page){
    fetch(`/emails/${page}`)
    .then(response => response.json())
    .then(emails => {
      const ulSelector = `${page}UL`;
      const ul = document.querySelector(`#${ulSelector}`);
      ul.innerHTML = '';
      ul.style.gap = '10px;'
      emails.forEach(email => {
        const li = document.createElement('li');
        const leftHandSide = document.createElement('span'); 
        const centerSide = document.createElement('span');
        const rightHandSide = document.createElement('span');

        leftHandSide.textContent = `${email.sender}`;
        centerSide.textContent = `${email.subject}`;
        rightHandSide.textContent = `${email.timestamp}`;

        li.classList.add('emailInfoLi');
        leftHandSide.classList.add('emailInfoList');
        centerSide.classList.add('centerSide');
        rightHandSide.classList.add('rightHandSide');

        li.append(leftHandSide);
        li.append(centerSide);
        li.append(rightHandSide);

        if (email.read){
          li.style.backgroundColor = 'rgb(234, 241, 251)';
        }
        else{
          li.style.backgroundColor = 'white';
        }
       
        li.addEventListener('click', () => viewEmail(email.id))

        ul.append(li);
      })
    })
    .catch(error => console.error('Error:', error)); 
  }


  function archiveButtonViews(email_id, archive){
    if (currentView === 'sent'){
      archive.style.display = 'none';
    }
    
    else if (currentView === 'archive') {
      archive.innerHTML = "unarchive";
      archive.addEventListener('click', () => {
        fetch(`/emails/${email_id}`, {
          method: 'PUT',
          body: JSON.stringify({
              archived: false
          })
        })
        .then(() => load_mailbox('inbox'));
      });
    }

    else if (currentView === 'inbox'){
      archive.addEventListener('click', () => {
        fetch(`/emails/${email_id}`, {
          method: 'PUT',
          body: JSON.stringify({
              archived: true
          })
        })
        .then(() => load_mailbox('inbox'));
      });
    }
  }



 
  function viewEmail(email_id){
  let div = document.querySelector('#emailDetails');

  document.querySelector('#compose-view').style.display = 'none';
  document.querySelector('#emails-view').style.display = 'none';
  div.style.display = 'block';

  fetch(`/emails/${email_id}`)
  .then(response => response.json())
  .then(email => {

  div.innerHTML = `
    <h2 class = "h2Header">${email.subject}</h2>
    <p class = "emailDetailsSingle" >From: ${email.sender}</p>
    <p class = "emailDetailsSingle" >To: ${email.recipients}</p>
    <p class = "emailDetailsSingle" >Timestamp: ${email.timestamp}</p>
    <button class="btn btn-sm btn-outline-primary" id="archiveButton">Archive</button>
    <button class="btn btn-sm btn-outline-primary" id="replyButton">Reply</button>
    <hr>
    <p class = "emailDetailsSingle" id = "emailBody" >${email.body}</p>
  `;

  
  let archive = document.querySelector('#archiveButton');
  let reply = div.querySelector('#replyButton');

  replyButton(email, reply);

  //reply.addEventListener('click', () => {
  //  compose_email(email);
  //  });

  archiveButtonViews(email_id, archive);

  readEmail(email_id);
});
}

function replyButton(email, reply){
  reply.addEventListener('click', () => {
    compose_email(email);
  });
}


function readEmail(email_id){
  fetch(`/emails/${email_id}`, {
    method: 'PUT',
    body: JSON.stringify({
        read: true
    })
  });
}

function load_mailbox(mailbox) {
  currentView = mailbox;
  // Show the mailbox and hide other views
  document.querySelector('#emails-view').style.display = 'block';
  document.querySelector('#compose-view').style.display = 'none';
  document.querySelector('#emailDetails').style.display = 'none';

  document.querySelector('#emails-view').innerHTML = `
  <h2 class = "h2Header">${mailbox.charAt(0).toUpperCase() + mailbox.slice(1)}</h2>
  <ul id="${mailbox}UL"></ul>
`;

  // Show the mailbox name 
  pageView(mailbox);
  }
    