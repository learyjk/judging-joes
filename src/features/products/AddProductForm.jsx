import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { addNewProduct } from './productsSlice';

const AddProductForm = () => {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [category, setCategory] = useState('');
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
        await dispatch(addNewProduct({ name, description, category }))
        setName('')
        setDescription('')
        setCategory('')
      } catch (err) {
        console.error('Failed to save the post: ', err)
      } finally {
        setAddRequestStatus('idle')
      }
    }
  }

  return (
    <section>
      <h2>Add a New Product</h2>
      <form>
        <label htmlFor="name">Product Name: </label>
        <input
          type="text"
          id="name"
          name="name"
          value={name}
          onChange={onTitleChanged}
        />
        <label htmlFor="category">Category:</label>
        <input
          type='text'
          id="category"
          name="category"
          value={category}
          onChange={onCategoryChanged}
        />
        <label htmlFor="description">Description: </label>
        <textarea
          type="textarea"
          id="description"
          name="description"
          value={description}
          onChange={onDescriptionChanged}
        />

        <button type="button" onClick={onAddProductClicked}>Add Product</button>
      </form>
    </section>
  );
};

export default AddProductForm;