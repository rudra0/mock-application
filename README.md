### Note: 
This Project is holds only Frontend Part as i have applied for frontend role only in Zania.
Please Review only the Frontend part
Thankyou

# Getting Started with Create React App

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

The page will reload when you make changes.\
You may also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.\

### `npm run build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

### `npm run eject`

If you aren't satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you're on your own.

You don't have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn't feel obligated to use this feature. However we understand that this tool wouldn't be useful if you couldn't customize it when you are ready for it.


### Project Structure

/project-root
  ├── Dockerfile          # Dockerfile for frontend build and server
  ├── docker-compose.yml  # Optional Docker Compose file for easy service management
  ├── /src                # Your React source files
  ├── package.json        # NPM package manager file
  ├── package-lock.json   # Lock file for exact dependencies
  ├── .prettierrc         # Prettier configuration (optional)
  └── ...                 # Other files like README.md, public folder, etc.


### Run the project with Docker
docker-compose up --build

### Technologies Used

React: A JavaScript library for building user interfaces.
Docker: Containerization platform to package and distribute applications.
Nginx: A lightweight HTTP server used to serve the static files from the React app.
Node.js: For building the React app in the Docker build stage.
Prettier: Code formatter to enforce consistent code style.

This project provides a straightforward approach for running a React frontend application within Docker, making the development and deployment pipeline more consistent and reliable. The two-stage build helps optimize the container size and ensures separation between the build and serving phases.


### Approach to Solving Part 1 to Part 4
This section outlines the approach we took to tackle each part of the project.

Part 1: Loading Static JSON Data and Displaying as Cards
Objective: Fetch a static JSON file containing card information and display the data in the form of individual cards.

### Data Loading:
We created a static JSON file that holds card data (e.g., card id, title, and description).
The data was fetched from this JSON file using a useEffect hook within the React component. The fetch API was utilized to retrieve the JSON asynchronously.
Card Display:
A Card component was created to represent each item in the fetched JSON data.
We iterated over the list of items and rendered each one inside a card layout.
Challenges & Solutions:

Async Fetching: We ensured that the component state is updated properly after data retrieval by using useState and useEffect.
Error Handling: Included basic error handling for cases when the data fails to load (e.g., network issues or JSON errors).
Part 2: Adding Drag-and-Drop Functionality
Objective: Allow users to reorder the cards using drag-and-drop.

### Approach:

React DnD:

We integrated the react-dnd library to add drag-and-drop capabilities.
For each Card, we used the useDrag hook to make it draggable and the useDrop hook to define drop targets.
Reordering Cards:

During the drop event, we updated the order of the cards in the state based on where the card was dropped.
The list of cards was re-rendered in the new order, reflecting the user’s action.
Challenges & Solutions:

Maintaining State Consistency: We had to ensure that the card order remained consistent and state updates were properly reflected after each drop.
Visual Feedback: We added subtle visual cues to indicate when a card was being dragged, enhancing the user experience.
Part 3: Adding Placeholders for Images
Objective: Display placeholders for card images until the images are fully loaded.

### Approach:

Image Placeholder Logic:

For each card, we included an image field and added a default placeholder image.
Using the onLoad event for each image, we swapped out the placeholder with the actual image once it finished loading.
Progressive Image Loading:

We ensured that if an image failed to load or took time, the placeholder would remain visible until the image was fully loaded.
Challenges & Solutions:

Handling Slow Connections: The placeholder was crucial for handling slower network speeds, preventing broken image icons from being shown to the user.
Part 4: Handling Card Interactions
Objective: Allow users to interact with each card, such as open the image in modal.

### Conclusion
Each part was designed with modularity and user experience in mind, utilizing React hooks like useState and useEffect, and external libraries like react-dnd for drag-and-drop. With each part, we aimed for incremental complexity, ensuring smooth transitions and interactions within the user interface.
