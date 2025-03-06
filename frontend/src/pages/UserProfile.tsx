import React from 'react';
import {useParams} from "react-router-dom";

const UserProfile = () => {
    const {id} = useParams<{id: string}>();

    return (
        <div>
            User {id} Profile Page
        </div>
    );
};

export default UserProfile;