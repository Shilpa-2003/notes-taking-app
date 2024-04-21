/*
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { IoIosArrowBack } from 'react-icons/io';
import { v4 as uuid } from 'uuid';
import useCreateDate from '../components/useCreateDate';

const CreateNote = ({ setNotes }) => {
    const [title, setTitle] = useState('');
    const [details, setDetails] = useState('');
    const [ setMediaFile] = useState(null);
    const [mediaUrl, setMediaUrl] = useState('');
    const [mediaType, setMediaType] = useState('');
    const date = useCreateDate();
    const navigate = useNavigate();

    const handleSubmit = (e) => {
        e.preventDefault();

        if (title && details) {
            const note = { id: uuid(), title, details, date, mediaLink: mediaUrl, mediaType };
            setNotes((prevNotes) => [note, ...prevNotes]);
            navigate('/');
        }
    };

    const handleFileChange = (e) => {
        const selectedFile = e.target.files[0];

        if (selectedFile) {
            const reader = new FileReader();
            reader.onload = () => {
                setMediaFile(selectedFile);
                setMediaUrl(reader.result);
                setMediaType(selectedFile.type);
            };
            reader.readAsDataURL(selectedFile);
        }
    };

    return (
        <section>
            <header className="create-note__header">
                <Link to="/" className="btn">
                    <IoIosArrowBack />
                </Link>
                <button className="btn lg primary" onClick={handleSubmit}>
                    Save
                </button>
            </header>
            <form className="create-note__form" onSubmit={handleSubmit}>
                <input
                    type="text"
                    placeholder="Title"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    autoFocus
                />
                <textarea
                    rows="8"
                    placeholder="Note details.."
                    value={details}
                    onChange={(e) => setDetails(e.target.value)}
                ></textarea>
                <div className="file-upload-section">
                    <label htmlFor="fileInput" className="upload-label">
                        Upload Image/Video
                    </label>
                    <input
                        type="file"
                        id="fileInput"
                        accept="image/*,video/*"
                        onChange={handleFileChange}
                        style={{ display: 'none' }}
                    />
                </div>
                {mediaUrl && (
                    <div className="media-preview">
                        {mediaType.startsWith('image/') ? (
                            <img src={mediaUrl} alt={`Image: ${title}`} className="uploaded-media" />
                        ) : mediaType.startsWith('video/') ? (
                            <video controls className="uploaded-media">
                                <source src={mediaUrl} type={mediaType} />
                                Your browser does not support the video tag.
                            </video>
                        ) : null}
                    </div>
                )}
            </form>
        </section>
    );
};

export default CreateNote;
*/

import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { IoIosArrowBack } from 'react-icons/io';
import { v4 as uuid } from 'uuid';
import useCreateDate from '../components/useCreateDate';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css'; // Import Quill styles

const CreateNote = ({ setNotes }) => {
    const [title, setTitle] = useState('');
    const [details, setDetails] = useState('');
    const [mediaFile, setMediaFile] = useState(null);
    const [mediaUrl, setMediaUrl] = useState('');
    const [mediaType, setMediaType] = useState('');
    const date = useCreateDate();
    const navigate = useNavigate();

    const handleSubmit = (e) => {
        e.preventDefault();

        if (title && details) {
            const note = { id: uuid(), title, details, date, mediaLink: mediaUrl, mediaType };
            setNotes((prevNotes) => [note, ...prevNotes]);
            navigate('/');
        }
    };

    const handleFileChange = (e) => {
        const selectedFile = e.target.files[0];

        if (selectedFile) {
            const reader = new FileReader();
            reader.onload = () => {
                setMediaFile(selectedFile);
                setMediaUrl(reader.result);
                setMediaType(selectedFile.type);
            };
            reader.readAsDataURL(selectedFile);
        }
    };

    return (
        <section>
            <header className="create-note__header">
                <Link to="/" className="btn">
                    <IoIosArrowBack />
                </Link>
                <button className="btn lg primary" onClick={handleSubmit}>
                    Save
                </button>
            </header>
            <form className="create-note__form" onSubmit={handleSubmit}>
                <input
                    type="text"
                    placeholder="Title"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    autoFocus
                />
                {/* Replace textarea with ReactQuill rich text editor */}
                <ReactQuill
                    value={details}
                    onChange={setDetails}
                    placeholder="Note details.."
                    modules={CreateNote.modules}
                    formats={CreateNote.formats}
                />
                <div className="file-upload-section">
                    <label htmlFor="fileInput" className="upload-label">
                        Upload Image/Video
                    </label>
                    <input
                        type="file"
                        id="fileInput"
                        accept="image/*,video/*"
                        onChange={handleFileChange}
                        style={{ display: 'none' }}
                    />
                </div>
                {mediaUrl && (
                    <div className="media-preview">
                        {mediaType.startsWith('image/') ? (
                            <img src={mediaUrl} alt={`Image: ${title}`} className="uploaded-media" />
                        ) : mediaType.startsWith('video/') ? (
                            <video controls className="uploaded-media">
                                <source src={mediaUrl} type={mediaType} />
                                Your browser does not support the video tag.
                            </video>
                        ) : null}
                    </div>
                )}
            </form>
        </section>
    );
};

CreateNote.modules = {
    toolbar: [
        [{ header: '1' }, { header: '2' }, { font: [] }],
        [{ size: [] }],
        ['bold', 'italic', 'underline', 'strike', 'blockquote'],
        [{ color: [] }, { background: [] }],
        [{ list: 'ordered' }, { list: 'bullet' }],
        ['link', 'image', 'video'],
        ['clean'],
    ],
};

CreateNote.formats = [
    'header',
    'font',
    'size',
    'bold',
    'italic',
    'underline',
    'strike',
    'blockquote',
    'color',
    'background',
    'list',
    'bullet',
    'link',
    'image',
    'video',
];

export default CreateNote;
