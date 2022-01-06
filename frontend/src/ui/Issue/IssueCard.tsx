import React from "react";
import { Card, Typography, Box, IconButton } from "@mui/material";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import { SxProps } from "@mui/system";
import { Issue } from "../../domain/issue";
import { Column } from "../../domain/column";

type StylesType = {
    container: SxProps;
    header: SxProps & {
        issueName: SxProps;
    };
    content: SxProps & {
        description: SxProps;
    };
};

const styles: StylesType = {
    container: {
        display: "flex",
        flexDirection: "column",
        padding: 1,
    },
    header: {
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        height: "fit-content",
        issueName: {
            fontSize: "1.1rem",
        },
    },
    content: {
        description: {
            fontSize: ".9rem",
            color: "text.secondary",
        },
    },
};

type IssueCardProps = {
    issue: Issue;
    column: Column;
    cardStyles: SxProps;
};

export const IssueCard = ({ issue, column, cardStyles }: IssueCardProps) => {
    const handleEditIssue = () => {
        console.log("edit issue");
    };

    return (
        <Card
            sx={{ ...styles.container, ...cardStyles } as SxProps}
            elevation={2}
        >
            <Box sx={styles.header}>
                <Box>
                    <Typography sx={styles.header.issueName}>
                        {issue.name}
                    </Typography>
                </Box>
                <Box>
                    <IconButton onClick={handleEditIssue}>
                        <MoreHorizIcon />
                    </IconButton>
                </Box>
            </Box>
            <Box sx={styles.content}>
                <Typography sx={styles.content.description}>
                    {issue.description}
                </Typography>
            </Box>
        </Card>
    );
};
