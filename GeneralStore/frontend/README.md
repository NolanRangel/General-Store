# 2

```
4. react setup with git initialization

    - installed react deleted folders
    - removed .git from the frontend folder
        - ls -la
        - rm -rf .git
    - git init
    - git add .
    - git comit -m "initial commit"

5. header & footer components

    - created header and footer components
    -installed bootstrap through the cli
    - use bootswatch to add a template style ("Lux")
        - download the bootstrap.min.css on Desktop then drag and drop into the src file
        - import it in the index.js


6. HomeScreen Product Listing

    - brought in images and products.js
    - created HomeScreen and HomeScreen.js
    - created PRoduct component and Product.js
    -    created product cards and homescreen layout

7. Rating Component

    -created rating component
    - passed in product ratings and numReviews as props
    - added default yellow through defaltProps
    - added validations through PropTypes

8. installed React Router version 5

    - npm i react-router-dom@5

9. implementing react router

    -installed react-router-bootstrap and imported in Header.js
    - used to wrap the header navlinks within a "bootstrap browser-router link"
    - npm install -S react-router-bootstrap@rr-v4

10. Product details screen

    *****Needs CSS upgrade

    -added product screen



```

# 3

```

12. Serving Products - Back End Routes

    - created Server folder
    - git init in root folder
    - npm install express
    - created data folder within Server and then added products.js into it in order to query that data from the server side
    - got the Server started

13. Fetching Products From React (useEffect)

    -added a useEffect and useState to the HomeScreen
    - added, "proxy": "http://127.0.0.1:5000", into the package.json file in the frontend folder
    -added use Effect to ProductScreen
            - where does match come from?


14. Nodemon & Concurrently Setup

    - npm i nodemon --save-dev
    - npm i concurrently
    - added to scripts in root package.json
        - "client": "npm start --prefix frontend",
            "dev": "concurrently \"npm run server\" \"npm run client\""

    - can now enter npm run dev to start frontend and Server together "concurrently"


15. Environment Variables (.env)

    - npm i dotenv
    - created .env file in root folder
    - added lines 1 and 2
    - make sure .gitignore is updated with .env info so sesnsitive info doesnt get leaked
            -   .env
                .env.local
                .env.development.local
                .env.test.local
                .env.production.local
    - updated server.js with
            - const dotenv = require('dotenv')
            - dotenv.config()
            - const PORT = process.env.PORT || 5000
                app.listen(PORT, () => console.log(`Server running in ${process.env.NODE_ENV} mode on port ${PORT}`));




```

# 4 mongoDB

```

17. MongoDB Atlas & Compass Setup

    - *** database uri or string you connect with for deployment might be diffeerent since im not using the cloud but I downloaded Mongo onto my comp
    - created new workspace in postman 'GeneralStore'



18. Connecting To The Database

    - npm i mongoose in root folder
    - created config folder in Server
    - created mongoose.config.js file and built
    - added mongoose to server


20. Modeling Our Data

    - created model folder in Server
    - created user, order and product models


21. Preparing Sample Data

    - deleted _id from product.js data
    - created user.js in data folder
    - created const user
    - install bcrypt in root folder
    - npm i bcryptjs
    - import bcrypt
    - added hashSync to users passwords
    - added export default at bottom

22. Data Seeder Script

    -create seeder.js at level with server.js in Server
    -had to go back to 16 ES modules because of import issues
    - re did all of the imports to be current ES module syntax
    - seeded db with product.js and users.js
    - npm run data:import , to upload data
    - npm run data:destroy , to destroy data



23. Fetching Products From The Database

    - created productRoutes
        - get all
        - get one


24. Getting Started With Postman

    - checked routes in postman
    - created an enviroment so i can use {{URL}} instead of localhost in postman

25. Custom Error Handling

    - created error handlers and errorMiddleware but am not using it




```

# 5

```

26. An Overview Of Redux

    - component level state and global level state
    - mainly used for global state
    - authenticated user / shopping cart items / orders
    - state is changed through reducers and sent down to components
    - actions are objects that intend to change the state
        - action creators fire off actions- ex



27. Create a Redux Store

    - install in frontend folder
    - added redux dev tools as an extention for the browser

    - npm i react-redux redux-thunk redux-devtools-extension

    - created store.js
    - imported Provider and store.js into index.js and updated the Element



28. Product List Reducer & Action

    - created productReducers.js, productActions.js and productConstants.js



29. Bringing Redux State Into HomeScreen - useDispatch & useSelector

    -updated useEffect on HomeScreen and brought in Dispatch and Selector
    -*** need to read up on redux



30. Message & Loader Components

    - created Message and Loader components and set them in the HomeScreen


31. Product Details Reducer & Action

    - created product detail reducers, actions and constants
    - updated ProductScreen useEffect and HTML


```

# 6.

```

32. Qty Select & Add To Cart Button

    - added qty selection to ProductScreen
    - created CartScreen
    - added CartScreen route to app.js


33. Cart Reducer & Add To Cart Action

    -added cart constants
    - added cart reducers ADD_ITEM
    - using localStorage to save contents of cart
    - updated store.js and brought in localStorage from


34. Add To Cart Functionality

    - 34/35/36 all CartScreen  cartReducer/constant/action




```

# 7 Backend user authentication

```

-37. Clean Up By Using Controllers

    - added controller folder and product file
    - split routes into controllers


38. User Authentication Endpoint

    -



*** Go back to # 45 to try and resolve bad error message on login screen 401




```
