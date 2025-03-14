import Box from '@mui/material/Box';
import Typography from "@mui/material/Typography";

const VALID_VARIANTS = ["h1", "h2", "h3", "h4", "h5", "h6", "subtitle1", "subtitle2", "body1", "body2", undefined];

type Variant = (typeof VALID_VARIANTS)[number];

interface SimpleBoxProps {
    text?: string;
    variant?: string;
}

export default function SimpleBox({text = "", variant}: SimpleBoxProps) {
    let typographyProps = {};
    if (VALID_VARIANTS.includes(variant as Variant)) {
        typographyProps = {variant: variant as Variant};
    } else {
        console.warn(`Invalid variant "${variant}". Falling back to default of "body1". Valid variants include any of: ${VALID_VARIANTS.join(", ")}`);
    }
    return (
        <Box>
            <Typography {...typographyProps}>{text}</Typography>
        </Box>
    );
}