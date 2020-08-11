This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).
## TODO lists
Each To-Do in the list consist of To-Do Label and To-Do Priority.
• User should also be able to perform the CRUD operations over the ToDo List.
• Keyboard accessible to do list. User should be able to use the next and previous arrow to
switch between the To-Do list.
• User should be able to select the multiple To-Dos and able to delete the To-Dos using delete
key.
• Inline Editing of To-Do Item should be supported. User should be able to double click on the
To-Do list item to perform the editing of the existing To-Do Item.

## Architecture
There are 3 components other than root component. Header, AddTodoForm, TodoLists and TodoList.TodoList is the main container which has Header, AddTodoForm, TodoLists as its children components Header consists of the header of the todo list app. AddTodoForm consists of the form to add items in the todo list which takes Priority and List Name. TodoLists lsits all todo items sorted with Priority. 
* User can navigate and switch between todo lists using Back and Next arrow keys. 
* User can delete a to do list using Delete Key. 
* User can select todo lists using checkboxes next to to do list and can delete them using "Delete Selected" action.

## Enhancements that can be done with more time

1. Select all button to select all Todo items in one go. This can be user friendly.
2. Drag and Drop can be implemented so that user can change the Priorities in less clicks than now
3. Todo itmes can have description, relevant attachments, multiple sections to evaluate.
4. Import and Export can be given to import/export todos to/from external file.

## Available Scripts

In the project directory, you can run:
1) npm run start - to start the local server

### `npm start`

Runs the app in the development mode.<br />
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.<br />
You will also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.<br />
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.<br />
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.<br />
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `npm run eject`

**Note: this is a one-way operation. Once you `eject`, you can’t go back!**

If you aren’t satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you’re on your own.

You don’t have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn’t feel obligated to use this feature. However we understand that this tool wouldn’t be useful if you couldn’t customize it when you are ready for it.

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).

### Code Splitting

This section has moved here: https://facebook.github.io/create-react-app/docs/code-splitting

### Analyzing the Bundle Size

This section has moved here: https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size

### Making a Progressive Web App

This section has moved here: https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app

### Advanced Configuration

This section has moved here: https://facebook.github.io/create-react-app/docs/advanced-configuration

### Deployment

This section has moved here: https://facebook.github.io/create-react-app/docs/deployment

### `npm run build` fails to minify

This section has moved here: https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify
