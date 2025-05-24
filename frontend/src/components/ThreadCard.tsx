import React, {useContext} from 'react';
import {Link} from "react-router-dom";
import {faTrash} from "@fortawesome/free-solid-svg-icons";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {AuthContext} from "../context/AuthContext";
import axios from "axios";

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
    onDelete: (threadId: number) => void;
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

const ThreadCard: React.FC<ThreadCardProps> = ({thread, onDelete}) => {
    const {token} = useContext(AuthContext);

    const handleDelete = async () => {
        if (!window.confirm(`czy na pewno chcesz usunac watek "${thread.title}"?`)) {
            return;
        }

        if (!token) {
            alert("blad autoryzacji");
            return;
        }

        try {
            await axios.delete(`http://localhost:7777/threads/${thread.id}`, {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });
            onDelete(thread.id);
        } catch (error: any) {
            console.error("blad podczas usuwania watku:", error);
            if (error.response) {
                alert(`nie udalo sie usunac watku: ${error.response.data.message || error.message}`);
            } else if (error.request) {
                alert("nie udalo sie usunac watku: brak odpowiedzi z serwera");
            } else {
                alert(`nie udalo sie usunac watku: ${error.message}`);
            }
        }
    };


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
            <FontAwesomeIcon className="thread-card__icon" onClick={handleDelete} icon={faTrash} size="lg"/>
        </div>
    );
};

export default ThreadCard;