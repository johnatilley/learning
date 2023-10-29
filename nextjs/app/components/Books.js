'use client';
import { useState, useEffect } from 'react';
import Link from "next/link";
import LoadingPage from '../loading';
import AddBook from "./AddBook";

const Books = () => {
    const [books, setBooks] = useState(1);
    const [loading, setLoading] = useState(true);
    const [query, setQuery] = useState("");

    const fetchBooks = async () => {
        const res = await fetch("/api/books");
        const books = await res.json();
        setBooks(books);
        setLoading(false);
    }

    useEffect(() => {
        fetchBooks();
    }, []);

    if (loading) { return <LoadingPage /> }

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        const res = await fetch(`/api/books/search?query=${query}`);
        const books = await res.json();
        setBooks(books);
        setLoading(false);
    }

    const deleteBook = async (id) => {
        const res = await fetch(`api/books/${id}`, {
            method: "DELETE"
        });
        fetchBooks();
    }

    return (
        <div>
            <h1>Books</h1>
            <form onSubmit={handleSubmit}>
                <input type="text" placeholder="Search Books..." value={query} onChange={(e) => setQuery(e.target.value)}
                    className="input input-bordered w-full max-w-xs"
                />
                <button type="submit" className="btn btn-primary">Search</button>
            </form>
            <AddBook refreshBooks={fetchBooks} />
            <div className='flex w-100 flex-wrap items-stretch gap-4'>
                {books.map((book) => (
                    <div key={book.id} className="card w-96 bg-slate-900 shadow-xl">
                        <div className="card-body">
                            <figure>
                                <img src={book.img} width="200" height="150" />
                            </figure>
                            <h2 className="card-title">{book.id}</h2>
                            <p>{book.title}</p>
                        </div>
                        <div className='card-body mt-auto'>
                            <div className="card-actions justify-end">
                                <Link href={book.link} className="btn btn-primary">See in Amazon</Link>
                            </div>
                            <button className="btn btn-error"
                                onClick={() => deleteBook(book.id)}>
                                Delete
                            </button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    )
}
export default Books;