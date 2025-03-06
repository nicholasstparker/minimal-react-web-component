import r2wc from "@r2wc/react-to-web-component";
import SimpleBox from "./SimpleBox";

const component = r2wc(SimpleBox, { props: {text: "string", variant: "string"} });

customElements.define("simple-box", component);