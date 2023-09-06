import React, { useState } from "react";
import BackButton from "../../components/BackButton";
import Spinner from "../../components/Spinner";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";

const DeleteBook = () => {
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();
    const { id } = useParams();

    const handleDeleteBook = () => {
        setLoading(true);
        axios
            .delete(`http://localhost:5555/books/${id}`)
            .then(() => {
                setLoading(false);
                navigate("/");
            })
            .catch((err) => {
                console.log(err);
                setLoading(false);
                alert("Error occurred. Please try again later.");
            });
    };
    return (
        <div className="p-4">
            <BackButton />
            <h1 className="text-3xl my-4">Delete Book</h1>
            {loading ? <Spinner /> : ""}
            <div className="flex flex-col items-center border-2 border-sky-400 rounded-xl w-[600px] p-8 mx-auto">
                <p className="text-xl text-gray-500 mb-4">Are you sure to delete this book?</p>
                <div className="flex justify-center gap-x-4">
                    <button
                        onClick={handleDeleteBook}
                        className="px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600">
                        Yes
                    </button>
                    <button
                        onClick={() => navigate("/")}
                        className="px-4 py-2 bg-gray-500 text-white rounded-md hover:bg-gray-600">
                        No
                    </button>
                </div>
            </div>
        </div>
    );
};

export default DeleteBook;
