import React, {useContext, useState} from 'react';
import axios from "axios";
import {AuthContext} from "../context/AuthContext";
import {useNavigate} from "react-router-dom";

interface Category {
    id: number;
    name: string;
}

const NewThread = () => {
    const categories: Category[] = [
        { id: 1, name: "Technology" },
        { id: 2, name: "Science" },
        { id: 3, name: "Gaming" },
        { id: 4, name: "Movies" },
        { id: 5, name: "Music" },
        { id: 6, name: "Pets" }
    ];

    const [formData, setFormData] = useState({
        title: "",
        content: "",
        category: ""
    });
    const {token} = useContext(AuthContext);
    const navigate = useNavigate();

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    }

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        console.log(formData);

        if (!token) {
            alert("musisz byc zalogowany zeby stworzyc watek");
            return;
        }

        try {
            const response = await axios.post("http://localhost:7777/threads", formData, {
                headers: {
                    Authorization: `Bearer ${token}`,
                    "Content-Type": "application/json",
                },
            });

            const selectedCategory = categories.find(
                (cat) => cat.id === Number(formData.category)
            );
            if (selectedCategory) {
                navigate(`/category/${selectedCategory.name}/thread/${response.data.threadId}`);
            } else {
                navigate("/");
            }

            console.log("utworzono watek:", response.data);
        } catch (error) {
            console.error("blad podczas tworzenia watku:", error);
            alert("blad podczas tworzenia watku");
        }
    }

    return (
        <div className="new-thread">
            <form className="new-thread__form" onSubmit={handleSubmit}>
                <h2 className="new-thread__title">New Thread</h2>
                <select
                    name="category"
                    value={formData.category}
                    onChange={handleChange}
                    required
                    className="new-thread__select"
                >
                    <option value="">-- Select a category --</option>
                    {categories.map((cat) => (
                        <option key={cat.id} value={cat.id}>{cat.name}</option>
                    ))}
                </select>
                <input
                    className="new-thread__input"
                    type="text"
                    name="title"
                    placeholder="Thread title"
                    value={formData.title}
                    onChange={handleChange}
                />
                <textarea
                    className="new-thread__input"
                    name="content"
                    placeholder="Content"
                    value={formData.content}
                    onChange={handleChange}
                    rows={5}
                />
                <button className="new-thread__button" type="submit">Create</button>
            </form>
        </div>
    );
};

export default NewThread;