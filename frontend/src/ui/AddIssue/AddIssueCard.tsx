import React, { useState } from "react";
import { Card, Typography, Box, CardActionArea } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import { SxProps } from "@mui/system";
import { issueCardStyles } from "../shared/issueCardStyles";

type StylesType = {
    container: SxProps;
    content: SxProps;
};

const makeStyles = (hovered: boolean): StylesType => {
    const textDecoration = hovered ? "underline" : "none";
    const cursor = hovered ? "pointer" : "inherit";
    return {
        container: {
            display: "flex",
            justifyContent: "center",
            alignContent: "center",
            textAlign: "center",
            marginTop: 1,
        },
        content: {
            padding: 1,
            display: "flex",
            alignSelf: "center",
            textDecoration,
            cursor,
        },
    };
};

type AddIssueProps = {
    handleAdd: () => void;
};

export const AddIssueCard = (props: AddIssueProps) => {
    const [hovered, setHovered] = useState<boolean>(false);
    const styles = makeStyles(hovered);
    return (
        <Card variant="outlined" sx={styles.container}>
            <CardActionArea
                sx={styles.content}
                onMouseEnter={() => setHovered(true)}
                onMouseLeave={() => setHovered(false)}
                onClick={props.handleAdd}
            >
                <AddIcon />
                <Typography
                    onClick={props.handleAdd}
                    sx={{ textDecoration: hovered ? "underlined" : "none" }}
                >
                    Add issue
                </Typography>
            </CardActionArea>
        </Card>
    );
};
