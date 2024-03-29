import React, { useState } from "react";
import { Card, Typography, Box, IconButton } from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import { SxProps } from "@mui/system";
import { Issue } from "../../domain/issue";
import { Column } from "../../domain/column";
import { useModalService } from "../../services/modalService";
import { EditIssueModal } from "../EditIssue";
import { Project } from "../../domain/project";

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
        marginRight: 1,
        "&:hover": {
            cursor: "move",
        },
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
    project: Project;
    cardStyles: SxProps;
};

export const IssueCard = ({ issue, project, cardStyles }: IssueCardProps) => {
    const [cardElevation, setCardElevation] = useState<number>(0);

    const modalService = useModalService();
    const handleEditIssue = () => {
        modalService.setModal(
            <EditIssueModal issue={issue} projectId={project.id ?? ""} />
        );
    };

    return (
        <Card
            sx={{ ...styles.container, ...cardStyles } as SxProps}
            variant="elevation"
            onMouseOver={() => setCardElevation(2)}
            onMouseOut={() => setCardElevation(0)}
            elevation={cardElevation}
        >
            <Box sx={styles.header}>
                <Box>
                    <Typography sx={styles.header.issueName}>
                        {issue.name}
                    </Typography>
                </Box>
                <Box>
                    <IconButton onClick={handleEditIssue}>
                        <EditIcon sx={{ fontSize: "1.2rem" }} />
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
