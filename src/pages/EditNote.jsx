
import React, { useState, useEffect } from 'react';
import { Link, useParams, useNavigate } from 'react-router-dom';
import { IoIosArrowBack } from 'react-icons/io';
import { RiDeleteBin6Line } from 'react-icons/ri';
import useCreateDate from '../components/useCreateDate';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';

const EditNote = ({ notes, setNotes }) => {
    const { id } = useParams();
    const note = notes.find((item) => item.id === id) || { title: '', details: '', mediaLink: '', mediaType: '' };
    const [title, setTitle] = useState(note.title);
    const [details, setDetails] = useState(note.details);
    const [setMediaFile] = useState(null);
    const [mediaUrl, setMediaUrl] = useState(note.mediaLink || ''); // Initialize mediaLink with note's mediaLink
    const [mediaType, setMediaType] = useState(note.mediaType || ''); // Initialize mediaType with note's mediaType
    const date = useCreateDate();
    const navigate = useNavigate();

    useEffect(() => {
        const savedNote = localStorage.getItem(`note_${id}`);
        if (savedNote) {
            const { title, details, mediaLink, mediaType } = JSON.parse(savedNote);
            setTitle(title);
            setDetails(details);
            setMediaUrl(mediaLink || ''); // Initialize mediaUrl with saved mediaLink
            setMediaType(mediaType || ''); // Initialize mediaType with saved mediaType
        }
    }, [id]);

    const handleRemoveMedia = () => {
        setMediaFile(null);
        setMediaUrl('');
        setMediaType('');
    
    };
    const handleDelete = () => {
        if (window.confirm('Are you sure you want to delete?')) {
            const newNotes = notes.filter((item) => item.id !== id);
            setNotes(newNotes);
            localStorage.removeItem(`note_${id}`);
            navigate('/');
        }
    };


    const handleForm = (e) => {
        e.preventDefault();
    
        // Validate required fields (title and details)
        if (!title.trim() || !details.trim()) {
            alert('Please enter a title and details.');
            return;
        }
    
        const updatedNote = { id, title, details, mediaLink: mediaUrl, mediaType, date };
    
        try {
            // Attempt to update notes in localStorage
            const updatedNotes = notes.map((item) => (item.id === id ? updatedNote : item));
            localStorage.setItem(`note_${id}`, JSON.stringify(updatedNote));
            setNotes(updatedNotes);
            navigate('/');
        } catch (error) {
            // Handle localStorage quota exceeded error
            console.error('Failed to update note in localStorage:', error);
            alert('Failed to update note. Please try again later.');
        }
    };
    
    const handleFileUpload = (e) => {
        const selectedFile = e.target.files[0];
        if (selectedFile) {
            const maxFileSize = 1024 * 1024 * 1024; // 1 GB in bytes
            if (selectedFile.size > maxFileSize) {
                alert('File size exceeds the maximum limit (1 GB). Please choose a smaller file.');
                return;
            }
    
            setMediaFile(selectedFile);
            setMediaType(selectedFile.type);
    
            const fileReader = new FileReader();
            fileReader.onload = () => {
                setMediaUrl(fileReader.result);
            };
            fileReader.readAsDataURL(selectedFile);
        }
    };
    

    return (
        <section>
            <header className="create-note__header">
                <Link to="/" className="btn">
                    <IoIosArrowBack />
                </Link>
                <button className="btn lg primary" onClick={handleForm}>
                    Save
                </button>
                <button className="btn danger" onClick={handleDelete}>
                    <RiDeleteBin6Line />
                </button>
            </header>
           
<form className="create-note__form" onSubmit={handleForm}>
                <input
                    type="text"
                    placeholder="Title"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    autoFocus
                />
                <ReactQuill
                    value={details}
                    onChange={setDetails}
                    placeholder="Note details.."
                    modules={EditNote.modules}
                    formats={EditNote.formats}
                />
                <div className="file-upload-section">
                    <label htmlFor="fileInput" className="upload-label">
                        Upload Image/Video
                    </label>
                    <input
                        type="file"
                        id="fileInput"
                        accept="image/*,video/*"
                        onChange={handleFileUpload}
                        style={{ display: 'none' }}
                    />
                </div>

                {mediaUrl && (
                    <div className="media-preview">
                        {mediaType.startsWith('image/') ? (
                            <div className='media-container'>
                            <img src={mediaUrl} alt={`Image: ${title}`} className="uploaded-media" />
                            <button className="remove-media" onClick={handleRemoveMedia}>
                                    X
                                </button>
                                </div >
                        ) : mediaType.startsWith('video/') ? (
                            <div className='media-container'>
                            <video controls className="uploaded-media">
                                <source src={mediaUrl} type={mediaType} />
                                Your browser does not support the video tag.
                            </video>
                            <button className="remove-media" onClick={handleRemoveMedia}>
                                    X
                                </button>
                            </div>
                        ) : (
                            <p className="invalid-media-message"></p>
                        )}
                    </div>
                )}
            </form>
        </section>
    );
};

EditNote.modules = {
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

EditNote.formats = [
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
export default EditNote;


