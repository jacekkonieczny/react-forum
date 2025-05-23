import React from 'react';
import {Link} from "react-router-dom";

interface ThreadCardProps {
    thread: {
        id: number;
        title: string;
        content: string;
        user_id: number;
        category_id: number;
        created_at: string;
        username: string;
    };
}

const mapCategoryIdToName = (id: number): string => {
    const categories: {[key: number]: string} = {
        1: "technology",
        2: "science",
        3: "gaming",
        4: "movies",
        5: "music",
        6: "pets"
    };
    return categories[id] || "unknown";
};

const ThreadCard: React.FC<ThreadCardProps> = ({thread}) => {
    return (
        <div className="thread-card">
            <Link className="thread-card__author" to={`/profile/${thread.user_id}`}>
                <img
                    className="thread-card__author-photo"
                    src="https://cdn.pfps.gg/pfps/1907-cat.png"
                    alt="profile picture"
                />
                <span className="thread-card__author-name">{thread.username}</span>
            </Link>
            <Link className="thread-card__content" to={`/category/${mapCategoryIdToName(thread.category_id)}/thread/${thread.id}`}>
                <h3 className="thread-card__content-title">{thread.title}</h3>
                <p className="thread-card__content-description">{thread.content}</p>
            </Link>
        </div>
    );
};

export default ThreadCard;