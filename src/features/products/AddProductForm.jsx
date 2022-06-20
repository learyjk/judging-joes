import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { addNewProduct, fetchProducts } from './productsSlice';
import { MdDelete } from 'react-icons/md'
import { deleteObject, getDownloadURL, ref, uploadBytesResumable } from 'firebase/storage';
import { storage } from '../../firebase.config';

const AddProductForm = () => {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [category, setCategory] = useState('');
  const [imageUrl, setimageUrl] = useState('');
  const [isImageLoading, setIsImageLoading] = useState(false)
  // const [userId, setUserId] = useState('')
  const [addRequestStatus, setAddRequestStatus] = useState('idle')

  const dispatch = useDispatch();

  //const users = useSelector(state => state.users)

  const onTitleChanged = e => setName(e.target.value)
  const onDescriptionChanged = e => setDescription(e.target.value)
  const onCategoryChanged = e => setCategory(e.target.value)
  //const onAuthorChanged = e => setUserId(e.target.value)

  const canSave =
    [name, description, category].every(Boolean) && addRequestStatus === 'idle'

  const onAddProductClicked = async () => {
    if (canSave) {
      try {
        setAddRequestStatus('pending')
        const numReviews = 0;
        const avgRating = 0;
        await dispatch(addNewProduct({ name, description, category, imageUrl, numReviews, avgRating }))
        setName('')
        setDescription('')
        setCategory('')
        setimageUrl('')
        dispatch(fetchProducts())
      } catch (err) {
        console.error('Failed to save the post: ', err)
      } finally {
        setAddRequestStatus('idle')
      }
    }
  }

  const uploadImage = async (e) => {
    setIsImageLoading(true)
    const imageFile = e.target.files[0]
    console.log(imageFile)
    const storageRef = ref(storage, `images/${Date.now()}-${imageFile.name}`)
    const uploadTask = uploadBytesResumable(storageRef, imageFile)

    uploadTask.on('state_changed', (snapshot) => {
      const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
      console.log('Upload is ' + progress + '% done');
    }, (error) => {
      console.log('image uploade error', error)
      setIsImageLoading(false)
    }, () => {
      // Upload completed successfully, now we can get the download URL
      getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
        //console.log('File available at', downloadURL);
        setimageUrl(downloadURL)
        setIsImageLoading(false)
      });
    })
  }

  const deleteImage = () => {
    setIsImageLoading(true)
    const deleteRef = ref(storage, imageUrl);
    deleteObject(deleteRef).then(() => {
      setimageUrl('')
      setIsImageLoading(false)
    })
  }

  return (
    <section className='container w-full max-w-lg mt-4'>
      <h2 className='mb-2 text-xl'>Add a New Product</h2>
      <form className='flex flex-col'>
        <label htmlFor="name">Product Name: </label>
        <input
          required
          className='border rounded-md px-2 py-1'
          type="text"
          id="name"
          name="name"
          value={name}
          onChange={onTitleChanged}
        />
        <label htmlFor="category">Category:</label>
        <input
          required
          className='border rounded-md px-2 py-1'
          type='text'
          id="category"
          name="category"
          value={category}
          onChange={onCategoryChanged}
        />
        <label htmlFor="description">Description: </label>
        <textarea
          required
          className='border rounded-md px-2 py-1'
          type="textarea"
          id="description"
          name="description"
          value={description}
          onChange={onDescriptionChanged}
        />
        {isImageLoading ? (
          <p>Loading...</p>
        ) : (
          <>
            {!imageUrl ? (
              <>
                <label htmlFor="image">Image: </label>
                <input
                  required
                  className='border rounded-md px-2 py-1'
                  type="file"
                  id="image"
                  name="image"
                  accept="image/*"
                  value={imageUrl}
                  onChange={uploadImage}
                />
              </>
            ) : (
              <div className='relative h-60 mt-4 mb-4 overflow-hidden'>
                <img src={imageUrl} className='object-cover' alt="upload" />
                <button className='absolute top-0 right-0 bg-red-600' onClick={deleteImage}>
                  <MdDelete className='text-white' />
                </button>
              </div>
            )}
          </>

        )}

        <button className='rounded-md px-2 py-1 bg-blue-200 mt-2 hover:bg-blue-300' type="button" onClick={onAddProductClicked}>Add Product</button>
      </form>
    </section>
  );
};

export default AddProductForm;