import React, {useEffect, useState} from 'react';
import ThreadCard from "../components/ThreadCard";
import axios from "axios";

interface Thread {
    id: number;
    title: string;
    content: string;
    user_id: number;
    category_id: number;
    created_at: string;
    username: string;
}

const Home = () => {
    const [threads, setThreads] = useState<Thread[]>([]);

    useEffect(() => {
        const fetchThreads = async () => {
            try {
                const res = await axios.get("http://localhost:7777/threads");
                setThreads(res.data);
            } catch {
                console.error("error fetching threads");
            }
        }
        fetchThreads();
    }, [])

    const handleThreadDelete = (deletedThreadId: number) => {
        setThreads(prevThreads => prevThreads.filter(thread => thread.id !== deletedThreadId));
    };


    return (
        <div className="home">
            {threads.map((thread) => (
                <ThreadCard key={thread.id} thread={thread} onDelete={handleThreadDelete}></ThreadCard>
            ))}
        </div>
    );
};

export default Home;