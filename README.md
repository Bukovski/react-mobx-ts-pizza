<h1 align="center">
  React Redux TS Pizza<img src="./screenshots/pizza-icon.png" alt="pizza-icon" title="pizza-icon" width="45"/>
</h1>

<p align="center">
    <a href="https://ru.reactjs.org/">
        <img src="./screenshots/icon-react.jpg" alt="react-logo" title="react" width="120"/>
    </a>
    <a href="https://www.typescriptlang.org/">
        <img src="./screenshots/icon-typescript.jpg" alt="type-script-logo" title="type-script" width="120"/>
    </a>
    <a href="https://redux.js.org/">
        <img src="./screenshots/icon-mobx.jpg" alt="mobx-logo" title="mobx" width="120"/>
    </a>
    <a href="https://reactrouter.com/">
        <img src="./screenshots/icon-react-router.jpg" alt="react-router-logo" title="react-router" width="120"/>
    </a>
</p>


## Order pizza in our educational online store.

Link on [figma page](https://www.figma.com/file/wWUnQwvRDWBfPx1v1pCAfO/React-Pizza?node-id=0%3A1) design

🍕[Live page](https://react-pizza-ts.herokuapp.com/)

Educational project. Shop for ordering pizza. There is a sorting by category and a method of making pizza.

I found a [YouTube video course](https://www.youtube.com/playlist?list=PL0FGkDGJQjJFMRmP7wZ771m1Nx-m2_qXq) in which the author did not complete his project, so I decided to finish it. I implemented the idea of the author of the course and posted it on my GitHub page as a sample for those who want to see a version of a fully working application

All data from the pizza cart will be stored in localStorage. Added error handling, the user will see an error message.


## Installation and Running

```sh
git clone git@github.com:Bukovski/redux-ts-pizza.git
cd redux-ts-pizza
npm install
npm run server
npm run start
```


## Routes

- `/` store page
- `/cart` pizza cart
- `404` page not found
 


## Technologies

- [typescript-with-react](https://react-typescript-cheatsheet.netlify.app/docs/basic/setup) for static typing TypeScript, allow you to catch most of the errors before the code is executed. In addition, they significantly improve development processes by adding auto-completion and other features.
- [node-sass](https://github.com/sass/node-sass) module is used to translate the Sass code into CSS code
- [react-router-dom](https://github.com/remix-run/react-router/tree/main/packages/react-router-dom) navigation on project, switching between pages
- [classnames](https://github.com/JedWatson/classnames) for conditionally joining classNames together.
- [axios](https://github.com/axios/axios) is Promise module for client (browser) requests it uses XMLHttpRequests
- [react-content-loader](https://github.com/danilowoz/react-content-loader) component for easily create placeholder loadings [Loader template creator](https://skeletonreact.com/)
- [react-error-boundary](https://github.com/bvaughn/react-error-boundary) catches errors in the wrapped component
- [mobx](https://mobx.js.org/README.html) state management
- [mobx-react](https://github.com/mobxjs/mobx-react) component wrapper for combining React with MobX
- [mobx-persist-store](https://github.com/quarrant/mobx-persist-store) save data from mobx store to localStorage
- load picture for error message from [error-picture](https://icons8.ru/illustrations/web-elements/404-error) 
- [coveralls](https://github.com/nickmerwin/node-coveralls) - coverage reporting of [coveralls.io](https://coveralls.io/) and add a cool coverage button

