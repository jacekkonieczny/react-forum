import React from 'react';
import {useParams} from "react-router-dom";

const ThreadView = () => {
    const {id} = useParams<{id: string}>();

    return (
        <div>
            Thread {id} View Page
        </div>
    );
};

export default ThreadView;