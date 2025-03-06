import r2wc from "@r2wc/react-to-web-component";
import SimpleBox from "./SimpleBox.tsx";

const component = r2wc(SimpleBox, { props: {text: "string", variant: "string"} });

customElements.define("simple-box", component);
