import r2wc from "@r2wc/react-to-web-component";
import MuiModal from "../components/mui-modal/MuiModal";

const component = r2wc(MuiModal, { props: {buttonlabel: "string"} });

customElements.define("mui-modal", component);