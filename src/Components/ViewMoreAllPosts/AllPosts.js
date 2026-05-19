
import React, { createContext, useState, useEffect } from "react";
import axios from "axios";

export const AllPostContext = createContext(null);

function ContextAllPost({ children }) {

    const [allPost, setAllPost] = useState([]);

    useEffect(() => {

        axios
            .get("http://localhost:5000/api/products")
            .then((response) => {

                console.log(response.data);

                setAllPost(response.data);

            })
            .catch((error) => {

                console.log(error);

            });

    }, []);

    return (
        <AllPostContext.Provider value={{ allPost, setAllPost }}>
            {children}
        </AllPostContext.Provider>
    );
}

export default ContextAllPost;