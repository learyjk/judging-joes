import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addNewProduct, fetchProducts } from "./productsSlice";
import { MdDelete } from "react-icons/md";
import {
  deleteObject,
  getDownloadURL,
  ref,
  uploadBytesResumable,
} from "firebase/storage";
import { storage } from "../../firebase.config";
import { selectUser } from "../user/userSlice";

const AddProductForm = () => {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("");
  const [imageUrl, setimageUrl] = useState("");
  const [isImageLoading, setIsImageLoading] = useState(false);
  // const [userId, setUserId] = useState('')
  const [addRequestStatus, setAddRequestStatus] = useState("idle");

  const dispatch = useDispatch();
  const user = useSelector(selectUser);

  //const users = useSelector(state => state.users)

  const onTitleChanged = (e) => setName(e.target.value);
  const onDescriptionChanged = (e) => setDescription(e.target.value);
  const onCategoryChanged = (e) => setCategory(e.target.value);
  //const onAuthorChanged = e => setUserId(e.target.value)

  const canSave =
    [name, description, category].every(Boolean) && addRequestStatus === "idle";

  const onAddProductClicked = async () => {
    if (!user) {
      alert("not logged in!");
      return;
    }
    if (!user.email.includes("leary.keegan")) {
      alert("user not an admin!");
      console.log("user is not an admin");
      return;
    }
    if (canSave) {
      try {
        setAddRequestStatus("pending");
        const numReviews = 0;
        const avgRating = 0;
        await dispatch(
          addNewProduct({
            name,
            description,
            category,
            imageUrl,
            numReviews,
            avgRating,
          })
        );
        alert(`product ${name} added!`);
        setName("");
        setDescription("");
        setCategory("");
        setimageUrl("");
        dispatch(fetchProducts());
      } catch (err) {
        console.error("Failed to save the post: ", err);
      } finally {
        setAddRequestStatus("idle");
      }
    }
  };

  const uploadImage = async (e) => {
    setIsImageLoading(true);
    const imageFile = e.target.files[0];
    console.log(imageFile);
    const storageRef = ref(storage, `images/${Date.now()}-${imageFile.name}`);
    const uploadTask = uploadBytesResumable(storageRef, imageFile);

    uploadTask.on(
      "state_changed",
      (snapshot) => {
        const progress =
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        console.log("Upload is " + progress + "% done");
      },
      (error) => {
        console.log("image uploade error", error);
        setIsImageLoading(false);
      },
      () => {
        // Upload completed successfully, now we can get the download URL
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
          //console.log('File available at', downloadURL);
          setimageUrl(downloadURL);
          setIsImageLoading(false);
        });
      }
    );
  };

  const deleteImage = () => {
    setIsImageLoading(true);
    const deleteRef = ref(storage, imageUrl);
    deleteObject(deleteRef).then(() => {
      setimageUrl("");
      setIsImageLoading(false);
    });
  };

  return (
    <section className="container mt-4 w-full max-w-xl">
      <h2 className="mb-2 text-xl">Add a New Product</h2>
      <p className="mb-4 rounded-lg bg-yellow-200 p-2 text-center text-sm">
        ⚠️ Adding products only available for admins ⚠️
      </p>
      <form className="flex flex-col">
        <label htmlFor="name">Product Name: </label>
        <input
          required
          className="rounded-md border px-2 py-1"
          type="text"
          id="name"
          name="name"
          value={name}
          onChange={onTitleChanged}
        />
        <label htmlFor="category">Category:</label>
        <input
          required
          className="rounded-md border px-2 py-1"
          type="text"
          id="category"
          name="category"
          value={category}
          onChange={onCategoryChanged}
        />
        <label htmlFor="description">Description: </label>
        <textarea
          required
          className="rounded-md border px-2 py-1"
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
                  className="h-60 rounded-md border px-2 py-1"
                  type="file"
                  id="image"
                  name="image"
                  accept="image/*"
                  value={imageUrl}
                  onChange={uploadImage}
                />
              </>
            ) : (
              <div className="relative mt-4 mb-4 h-60 overflow-hidden">
                <img src={imageUrl} className="object-cover" alt="upload" />
                <button
                  className="absolute top-0 right-0 bg-red-600"
                  onClick={deleteImage}
                >
                  <MdDelete className="w-18 h-18 text-red-50" />
                </button>
              </div>
            )}
          </>
        )}

        <button
          className="mt-2 rounded-md bg-red-700 px-2 py-1 text-red-50 hover:bg-red-600"
          type="button"
          onClick={onAddProductClicked}
        >
          Add Product
        </button>
      </form>
    </section>
  );
};

export default AddProductForm;
