import { useState } from 'react';
import PropTypes from 'prop-types';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrashAlt, faStar, faUpload } from '@fortawesome/free-solid-svg-icons';
import axiosConnect from '../../Token/axios.js';
import Images from '../Images/Images.js'; // Assuming Images component is defined in 'src/Images/Images.js'

function ImagesUploader({ addedPhotos, setAddedPhotos }) {
    const [photoLink, setPhotoLink] = useState('');
    const [uploading, setUploading] = useState(false);

    // Function to add image from a link
    async function addImagebyLink(e) {
        e.preventDefault();
        try {
            const { data: filename } = await axiosConnect.post('/upload-by-link', { link: photoLink });
            setAddedPhotos(prev => [...prev, filename]);
            setPhotoLink('');
            alert('Image added successfully!');
        } catch (error) {
            console.error('Error adding image from link:', error);
            alert('Failed to add image from link. Please try again.');
        }
    }

    // Function to upload images from files
    async function uploadImage(e) {
        const files = e.target.files;
        if (files.length === 0) return;

        const formData = new FormData();
        Array.from(files).forEach(file => {
            formData.append('photos', file);
        });

        try {
            setUploading(true);
            const { data: filenames } = await axiosConnect.post('/upload', formData, {
                headers: { 'Content-Type': 'multipart/form-data' }
            });
            setAddedPhotos(prev => [...prev, ...filenames]);
            alert('Images uploaded successfully!');
        } catch (error) {
            console.error('Error uploading images:', error);
            alert('Failed to upload images. Please try again.');
        } finally {
            setUploading(false);
        }
    }

    // Function to remove an image
    function removeImage(e, filename) {
        e.preventDefault();
        setAddedPhotos(prev => prev.filter(photo => photo !== filename));
    }

    // Function to set an image as main
    function setAsMainImage(e, filename) {
        e.preventDefault();
        setAddedPhotos(prev => [filename, ...prev.filter(photo => photo !== filename)]);
    }

    return (
        <div>
            {/* Input for adding image by link */}
            <div className="inp-plus-btn">
                <input
                    type="text"
                    className="form-control inp-bar"
                    placeholder="Enter image URL..."
                    value={photoLink}
                    onChange={e => setPhotoLink(e.target.value)}
                />
                <button className="btn btn-photo-inp" onClick={addImagebyLink}>Add Photo</button>
            </div>

            {/* Gallery of added images */}
            <div className="gallery-img">
                {addedPhotos.length > 0 && addedPhotos.map(link => (
                    <div className="box-img container-img" key={link}>
                        <Images className="image-img" src={link} alt="" />
                        <div className="parent">
                            <button className="btn btn-delete-img" onClick={e => removeImage(e, link)}>
                                <FontAwesomeIcon icon={faTrashAlt} />
                            </button>
                            <button className="btn btn-star-img" onClick={e => setAsMainImage(e, link)}>
                                {link === addedPhotos[0] && <FontAwesomeIcon icon={faStar} />}
                                {link !== addedPhotos[0] && <FontAwesomeIcon icon={faStar} className="empty-star" />}
                            </button>
                        </div>
                    </div>
                ))}
                
                {/* Input for uploading images from files */}
                <label className="btn btn-photo upload-btn">
                    {uploading ? 'Uploading...' : (
                        <>
                            <input
                                type="file"
                                multiple
                                className="visually-hidden cursor-pointer"
                                onChange={uploadImage}
                            />
                            <FontAwesomeIcon icon={faUpload} />&nbsp; Upload
                        </>
                    )}
                </label>
            </div>
        </div>
    );
}

// PropTypes validation
ImagesUploader.propTypes = {
    addedPhotos: PropTypes.array.isRequired,
    setAddedPhotos: PropTypes.func.isRequired,
};

export default ImagesUploader;