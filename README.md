# minimal-react-web-component

This repo serves as a template and exmaple for defining react components as custom html elements that you can call in ANY html file. Package deps are set to exact so you know what versions I used. I added a couple 3rd party libraries like material-ui and tanstack query to showcase how well this works with really any setup.

## Prereqs

Node 22 or higher

## Setup

1. Clone this repo and cd into new directory
2. Run `npm i` in console
3. Run `npm run build` in console
4. Open `test-built-web-components.html` in browser of your choice
5. See your beautiful react components as custom html tags

## Making your own web components
NOTE: While you're developing your components, you can run `npm run dev` to see your changes in real time.

To create your own components, follow this example:
1. Create a folder in the `components` directory, like `my-component`
2. Create a `MyComponent.tsx` file in the new folder and build your React component as normal
e.g. In `MyComponent.tsx`, follow this example:
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
3. Create a new file, `my-component.ts` in the `webcomponents` directory
4. In the new `my-component.ts`, add the following code:
  ```
  import r2wc from "@r2wc/react-to-web-component";
  import MyComponent from "../components/my-component/MyComponent";
  
  const component = r2wc(MyComponent, { props: {} });
  
  customElements.define("my-component", component);
  ```
5. In `vite-build.mjs`, add this code somewhere:
  ```
  const myComponentWCConfig = {
    plugins: [],
    entry: path.resolve(__dirname, "./webcomponents/my-component.ts"),
    name: "my-component",
    formats: ["umd"],
  };
  ```
In the `buildLibraries` function near the bottom, add `viteBuild(getConfiguration(myComponentWCConfig, mode))` like:
```
...
  await Promise.all([].concat(
    ...["lite", "full"].map(mode => [
    viteBuild(getConfiguration(myComponentWCConfig, mode))
    ]),
    [viteBuild(getConfiguration(dependenciesConfig, "full"))]
  ));
...
```
6. Run `npm run build`
7. `my-component.full.umd.js` will be generated in the `dist` folder, To add this to an html file, follow this example:
  ```
    <!DOCTYPE html>
    <html lang="en">
    <head>
        <meta charset="UTF-8">
        <title>Web Components</title>
    
        <script src="dist/my-component/my-component.full.umd.js"></script>
    </head>
    <body>
        <my-component></my-component>
    </body>
    </html>
  ```
8. Open the html file in a browser and enjoy react as an html tag
