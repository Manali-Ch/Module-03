import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './SuccessStories.css';

const SuccessStories = () => {
    const [stories, setStories] = useState([]);
    const [formData, setFormData] = useState({ name: '', story: '' });

    useEffect(() => {
        axios.get('http://localhost:6000/stories').then((response) => {
            setStories(response.data);
        });
    }, []);

    const handleSubmit = (e) => {
        e.preventDefault();
        axios.post('http://localhost:6000/stories', formData).then(() => {
            setStories([...stories, formData]);
            setFormData({ name: '', story: '' });
        });
    };

    return (
        <div>
            <h1>Success Stories</h1>
            {stories.map((story, index) => (
                <div key={index}>
                    <h3>{story.name}</h3>
                    <p>{story.story}</p>
                </div>
            ))}

            <form onSubmit={handleSubmit}>
                <input
                    type="text"
                    placeholder="Your Name"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    required
                />
                <textarea
                    placeholder="Your Story"
                    value={formData.story}
                    onChange={(e) => setFormData({ ...formData, story: e.target.value })}
                    required
                ></textarea>
                <button type="submit">Submit Story</button>
            </form>
        </div>
    );
};

export default SuccessStories;