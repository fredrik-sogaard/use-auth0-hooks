import React from "react";
export interface RequireLoginProps {
    path?: string;
}
export default function withLoginRequired<T extends {}>(ChildComponent: React.ComponentType<T>): React.ComponentType<RequireLoginProps & T>;
