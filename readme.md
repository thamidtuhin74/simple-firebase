### Live Link : https://soft-donut-2e2971.netlify.app/
### Live Link : https://simple-firebase-639c3.web.app/

### Firebase Setup 
_____________________

1. go to 'https://console.firebase.google.com/' and create a new project
2. open the opened newly opened firebase project
3. select a platform for your project (ex : ios /android /web) && register app
4. lets create a file 'firebase.init.js' & run 'npm install firebase' in Project Directory
5. then initialize the firebase (some code will be provided) in the 'firebase.init.js' file(Copy & paste)

### Authentication Setup using provider
________________________________________

Step-1:
______

1. go to authentication setion and select 'Sign-in method',
2. select a provider (ex: google , facebook , github etc)
3. then active the provider by give some information then click 'save'

Step-2:
______

4. go to  documentation(https://firebase.google.com/docs) page of firebase
5. then authentication(in build drop-down) 
5. select a platform for your project (ex : ios /android /web)
6. Follow the get started doc (https://firebase.google.com/docs/auth/web/start)
7. then follow the chosen provider doc (ex: google {https://firebase.google.com/docs/auth/web/google-signin} , facebook , github etc)


### github authorization tips 
________________________________

1. go to github account settings > developer setting
2. then create 'new github app'
3. provide some information . (callback link provided by firebase & deactivate webhook(bigener))
4. after creating new github app github will give you 'Client ID' & 'Client secret'
5. use these 'Client ID' & 'Client secret' in firebase provider