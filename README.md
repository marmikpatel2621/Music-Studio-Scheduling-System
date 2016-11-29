# Music-Studio-Scheduling-System

A hybrid application developed as a part of UMKC Hackathon Spring - 2016. This is the usecase provided by Adknowledge Inc. to create a application for music studio scheduling. 

* **Usecase Statement:**

John, a music producer, owns a studio with multiple recording rooms. He has clients (bands, musicians) who would like to lease the rooms from time to time. Develop an application where a client can book time to record in the studio. The application should be both mobile and desktop browser friendly														
												
*Functional Requirements*

  - The Application should require users to login with their email address and a pre-assigned password. The login page should have a      forgot password option as well.												   
  - Once logged in, users should be presented with calendars showing their current bookings, and calendars for every studio room to book  time from. Every time a booking is made, John needs to be notified by email or a text message.
  - For John, he needs a way to see all the bookings requested and approve/reject them. Once he approves/rejects the

* **Technologies:**

  - Frontend: HTML, CSS, Angular JS
  - Framework: ionic
  - Back-end: REST, J2EE
  - Database: MongoDB (MongoLab)
  
* **Features:**
  - User can create an account and login to the App.
  - Three consecutive failures will allow user to reset password.
  - User can book a studio room and book a time slot using calendar view for a particular date.
  - User can see the booking history.
  - Password and Email can be reset using Account setting.
  - John will be notified by an SMS alert for a successful booking.
  - Admin can see the booking details of each date.
  - User and Admin has ability to logoff.	
