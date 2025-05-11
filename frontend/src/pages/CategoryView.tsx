import React, {useEffect, useState} from 'react';
import ThreadCard from "../components/ThreadCard";
import axios from "axios";
import {useParams} from "react-router-dom";

interface Thread {
    id: number;
    title: string;
    content: string;
    user_id: number;
    category_id: number;
    created_at: string;
    username: string;
}

const CategoryView = () => {
    const [threads, setThreads] = useState<Thread[]>([]);
    const {categoryName} = useParams();

    useEffect(() => {
        const fetchThreadsByCategory = async () => {
            try {
                const res = await axios.get(`http://localhost:7777/threads/category/${categoryName}`);
                setThreads(res.data);
            } catch (error) {
                console.error("error fetching threads for category");
            }
        }
        fetchThreadsByCategory();
    }, [categoryName]);

    return (
        <div className="category-threads">
            {threads.map((thread) => (
                <ThreadCard key={thread.id} thread={thread}></ThreadCard>
            ))}
        </div>
    );
};

export default CategoryView;