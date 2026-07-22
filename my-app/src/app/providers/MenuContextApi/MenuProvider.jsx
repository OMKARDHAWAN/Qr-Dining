import React, { createContext, useEffect, useState } from "react";
import axios from "axios";

export const MenuContext = createContext();

export const MenuProvider = ({ children }) => {
    const [menuList, setMenuList] = useState([]);
    const [categories, setCategories] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        // Getting menu data from backend for admin and user pages
        axios.get("https://localhost:44380/api/menu/getallmenu")
            .then((response) => {
                setMenuList(response.data);
            })
            .catch((error) => {
                console.log("Menu loading error", error);
            });

        // Getting category list from backend
        axios.get("https://localhost:44380/api/category/getAllcategories")
            .then((response) => {
                setCategories(response.data);
            })
            .catch((error) => {
                console.log("Category loading error", error);
            })
            .finally(() => {
                setLoading(false);
            });
    }, []);

    const addMenuItem = async (menuData) => {
        try {
            const res = await axios.post("https://localhost:44380/api/menu", menuData);
            setMenuList(prev => [...prev, res.data]);
            return {
                success: true
            };
        }
        catch (err) {
            console.log(err);
            return {
                success: false,
                message: err.response?.data || "Failed to add item"
            };
        }
    };

    // New: Update an existing menu item by ID
    const updateMenuItem = async (id, menuData) => {
        try {
            await axios.put(`https://localhost:44380/api/menu/${id}`, menuData);
            
            // Refresh menu list to get latest updates and image URLs
            const res = await axios.get("https://localhost:44380/api/menu/getallmenu");
            setMenuList(res.data);
            
            return {
                success: true
            };
        } catch (err) {
            console.log(err);
            return {
                success: false,
                message: err.response?.data || "Failed to update item"
            };
        }
    };

    // New: Delete a menu item by ID
    const deleteMenuItem = async (id) => {
        try {
            await axios.delete(`https://localhost:44380/api/menu/${id}`);
            
            // Instantly filter out deleted item from the state
            setMenuList(prev => prev.filter(item => item.id !== id));
            
            return {
                success: true
            };
        } catch (err) {
            console.log(err);
            return {
                success: false,
                message: err.response?.data || "Failed to delete item"
            };
        }
    };

    return (
        <MenuContext.Provider
            value={{
                menuList,
                categories,
                loading,
                addMenuItem,
                updateMenuItem, // Exported to components
                deleteMenuItem  // Exported to components
            }}
        >
            {children}
        </MenuContext.Provider>
    );
};