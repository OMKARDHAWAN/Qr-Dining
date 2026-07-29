import React, { createContext, useEffect, useState } from "react";
import axios from "axios";

export const MenuContext = createContext();

export const MenuProvider = ({ children }) => {
    const [menuList, setMenuList] = useState([]);
    const [categories, setCategories] = useState([]);
    const [loading, setLoading] = useState(true);

    const getFallbackImageUrl = (name) => {
        const lowercase = (name || "").toLowerCase();
        if (lowercase.includes("butter chicken")) {
            return "https://images.unsplash.com/photo-1603894584373-5ac82b2ae398?w=500";
        }
        if (lowercase.includes("dal makhani")) {
            return "https://images.unsplash.com/photo-1626132647523-66f5bf380027?w=500";
        }
        if (lowercase.includes("masala chai") || lowercase.includes("tea") || lowercase.includes("chai")) {
            return "https://images.unsplash.com/photo-1576092768241-dec231879fc3?w=500";
        }
        if (lowercase.includes("gulab jamun")) {
            return "https://images.unsplash.com/photo-1589301760014-d929f3979dbc?w=500";
        }
        if (lowercase.includes("burger")) {
            return "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=500";
        }
        if (lowercase.includes("paneer")) {
            return "https://images.unsplash.com/photo-1567188040759-fb8a883dc6d8?w=500";
        }
        if (lowercase.includes("dosa")) {
            return "https://images.unsplash.com/photo-1668236543090-82eba5ee5976?w=500";
        }
        if (lowercase.includes("lassi")) {
            return "https://images.unsplash.com/photo-1623065422902-30a2d299bbe4?w=500";
        }
        if (lowercase.includes("samosa")) {
            return "https://images.unsplash.com/photo-1601050690597-df0568f70950?w=500";
        }
        return "https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=500";
    };

    useEffect(() => {
        // Getting menu data from backend for admin and user pages
        axios.get("https://localhost:44380/api/menuitems")
            .then((response) => {
                const normalized = (response.data || []).map(item => {
                    const name = item.itemName !== undefined ? item.itemName : item.ItemName;
                    const rawImg = item.imageUrl !== undefined ? item.imageUrl : item.ImageUrl;
                    return {
                        id: item.id !== undefined ? item.id : item.Id,
                        itemName: name,
                        price: item.price !== undefined ? item.price : item.Price,
                        description: item.description !== undefined ? item.description : item.Description,
                        status: item.status !== undefined ? item.status : item.Status,
                        categoryId: item.categoryId !== undefined ? item.categoryId : item.CategoryId,
                        categoryName: item.categoryName !== undefined ? item.categoryName : item.CategoryName,
                        imageUrl: rawImg ? (rawImg.startsWith("http") ? rawImg : `https://localhost:44380${rawImg}`) : getFallbackImageUrl(name)
                    };
                });
                setMenuList(normalized);
            })
            .catch((error) => {
                console.log("Menu loading error", error);
            });

        // Getting category list from backend
        axios.get("https://localhost:44380/api/categories")
            .then((response) => {
                const normalized = (response.data || []).map(cat => ({
                    id: cat.id !== undefined ? cat.id : cat.Id,
                    categoryName: cat.categoryName !== undefined ? cat.categoryName : cat.CategoryName
                }));
                setCategories(normalized);
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
            const res = await axios.post("https://localhost:44380/api/menuitems", menuData);
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
            await axios.put(`https://localhost:44380/api/menuitems/${id}`, menuData);
            
            // Refresh menu list to get latest updates and image URLs
            const res = await axios.get("https://localhost:44380/api/menuitems");
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
            await axios.delete(`https://localhost:44380/api/menuitems/${id}`);
            
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