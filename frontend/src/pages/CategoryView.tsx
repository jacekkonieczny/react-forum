import React from 'react';
import {useParams} from "react-router-dom";

const CategoryView = () => {
    const {categoryName} = useParams<{categoryName: string}>();

    return (
        <div>
            Category {categoryName} View Page
        </div>
    );
};

export default CategoryView;