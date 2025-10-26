-Compare and contrast the types of frontend development you used in your full stack project, including Express HTML, JavaScript, and the single-page application (SPA). 

The front end was built in 2 different ways. The Express side used basic HTML and JS, this worked well for simple pages but required refreshing the browser each time new data was needed. The Angular SPA provided a smoother experience since the SPA could update information on the screen without needing to reload the whole page. 

-Why did the backend use a NoSQL MongoDB database? 

The Backend used Mongo DB because it works well with JS based applications and JSON data. Mongo stores information flexibly and makes it easier to update and scale as the project grows. This helped my system where trip data might change over time and not always fit into a strict structure.  

-How is JSON different from Javascript and how does JSON tie together the frontend and backend development pieces? 

JSON is for data formatting only, and JS is a full programming language. JSON stores information using key-value pairs and follows strict rules that makes it easy for different applications to read and exchange data. In a full stack project JSON is what connects the frontend to the backend. Express (in my case) sends the data in JSON and the Angular SPA receives, displays, and sends updates back in the same format.  

- Provide instances in the full stack process when you refactored code to improve functionality and efficiencies, and name the benefits that come from reusable user interface (UI) components. 

Throughout this project I had to refactor code to improve clarity and reduce any repetition, like moving the API calls into Angular services and cleaning up repeated logic in Express controllers. Reusing UI components were also helpful since in Angular a single component could be used in multiple places without rewriting code.  

-Methods for request and retrieval necessitate various types of API testing of endpoints, in addition to the difficulties of testing with added layers of security. Explain your understanding of methods, endpoints, and security in a full stack application. 

API methods like GET, POST, PUT, and DELETE defined how the frontend communicates with the backend. Each method targets a specific endpoint to either retrieve or modify data in the database. Testing these endpoints was important because it ensures that data is being sent and received. Programs like Postman and browser dev tools help make it easier to test these API calls before connecting them to the UI. I also used JWT tokens for added security and making the endpoints more complex. 

- How has this course helped you in reaching your professional goals? What skills have you learned, developed, or mastered in this course to help you become a more marketable candidate in your career field? 

This project was really insightful, it helped me understand how APIs are integrated safely and how they communicate through the frontend and backend sides. It showed me the importance of carefully picking a suitable tech stack based on the requirements. Since it mimics a real world project it also shows what developers go through when creating similar tasks. I don’t feel like I’ve master anything from this project, but instead have gotten a good baseline for the skills taught throughout this project.   

 
