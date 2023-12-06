import Home from "./Home";
import React from "react";
import Profile from "./Profile";
import AboutUs from "./AboutUs";

interface Route {
    path: string;
    Component: React.ComponentType;
}

export const Router:Route[] =[
    {
        path:"/",
        Component: Home

    },
    {
        path: "/profile/:id",
        Component: Profile
    },
    {
        path: "/aboutus",
        Component: AboutUs
    }
]