import React from "react";
import { Issue } from "../../domain/issue";

type IssueCardProps = {
    issue: Issue;
};
export const IssueCard = ({ issue }: IssueCardProps) => {
    return <div>{issue.name ?? "no name"}</div>;
};
