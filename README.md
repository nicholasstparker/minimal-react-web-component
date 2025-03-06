# minimal-react-web-component

This repo serves as a template and exmaple for defining react components as custom html elements that you can call in ANY html file. Package deps are set to exact so you know what versions I used. I added a couple 3rd party libraries like material-ui and tanstack query to showcase how well this works with really any setup.

## Prereqs

Node

## Setup

1. Clone thie repo and cd into new directory
2. Run `npm i` in console
3. Run `npm run build` in console
4. Open `index.html` in browser of your choice
5. See your beautiful react components as custom html tags

## customizing
To create your own components, follow this example:
1. Create a folder in the `src/components` directory, like `mui-modal` or `simple-box`
2. Create an `index.ts` file in the new folder
3. Create a new component file, like `MyComponent.tsx` in the new folder as well
4. In the new `index.ts`, add the following code:
  ```
  import r2wc from "@r2wc/react-to-web-component";
  import SimpleBox from "./MyComponent.tsx";
  
  const component = r2wc(MyComponent, { props: {} });
  
  customElements.define("my-component", component);
  ```
5. In `MyComponent.tsx`, follow this example:
  ```
  export default function MyComponent() {
    return (
        <div>
            <h1>My Component</h1>
            <p>Here is some text</p>
        </div>
    );
  }
  ```
6. Run `npm run build`
7. `my-component.js`, along with `react.js` and `react-dom.js` will be generated in the `dist` folder. To add this to an html file, follow this example:
  ```
  <!DOCTYPE html>
  <html lang="en">
  <head>
      <meta charset="UTF-8">
      <title>Web Components</title>
  
      <script src="dist/react.js"></script> <!-- REQUIRED. WE CAN'T RUN REACT WITHOUT REACT -->
      <script src="dist/react-dom.js"></script> <!-- REQUIRED. WE CAN'T RUN REACT WITHOUT REACT-DOM -->
      <script src="dist/my-component.js"></script> <!-- Add the script tag and point it to the new my-component.js script -->
  </head>
  <body>
      <my-component></my-component> <!-- Use your new component! The tag is as defined in the component folders index.ts file under customElements.define("my-component", ...  -->
  </body>
  </html>
  ```
8. Open the html file in a browser and enjoy react as an html tag
