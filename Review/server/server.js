import express from "express";
import React from "react";
import ReactDOMServer from "react-dom/server";
import axios from "axios";
import App from "../src/App";

const app=express();

app.get("/*", async(req, res)=>{
    try{
        const response=await axios.get("https://www.olx.in/api/relevance/v4/search?category=81&facet_limit=1000&relaxedFilters=true&user=010609093561668215&lang=en-IN");
        const data=response.data.data;
        // console.log(data);
        // console.log(data.price.value);
        const{pipe, abort:_abort}=ReactDOMServer.renderToPipeableStream(
            <App data={data}/>,
            {
                bootstrapScripts:["main.js"],
                onShellReady(){
                    res.statusCode=200;
                    res.setHeader("Content-Type", "text/html");
                    pipe(res);
                },
                onShellError(){
                    res.statusCode=500;
                    res.send("<!doctype html><p>Loading...</p>");
                },
            }
        );
    }
    catch(error){
        res.statusCode=500;
        res.send("<!doctype html><p>Error fetching data</p>");
    }
});
app.listen(3002, ()=>{
    console.log("App is running on http://localhost:3002");
});