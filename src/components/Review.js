import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Review = ({ movieId }) => {
  const [reviews, setReviews] = useState([]);
  const [selectedReview, setSelectedReview] = useState(null);
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({
    content: '',
    rating: 0,
  });

  const [editFormData, setEditFormData] = useState({
    content: '',
    rating: 0,
  });

  const [showEditForm, setShowEditForm] = useState(false);

  useEffect(() => {
    const fetchReviews = async () => {
      try {
        const response = await axios.get(`http://localhost:8080/api/Movies/${movieId}/reviews`);
        setReviews(response.data);
      } catch (error) {
        console.error(error);
      }
    };
    fetchReviews();
  }, []);

  const handleClick = review => {
    setSelectedReview(review);
  };

  const ReviewsList = () => {
    return (
      <ul>
        {reviews.map(review => (
          <li key={review.id} onClick={() => handleClick(review)}>
            {review.content} ({review.rating})
          </li>
        ))}
      </ul>
    );
  };

  const ReviewDetails = () => {
    return (
      <div>
        <p>{selectedReview.review}</p>
        <p>Rating: {selectedReview.rating}</p>
      </div>
    );
  };

  const handleAddReview = async () => {
    try {
      const newReview = {

content: formData.content,
rating: formData.rating,
};
const response = await axios.post(`http://localhost:8080/api/Movies/${movieId}/reviews`, newReview);
setReviews([...reviews, response.data]);
setShowForm(false);
setFormData({
content: '',
rating: 0,
});
} catch (error) {
console.error(error);
}
};

const handleChange = event => {
const { name, value } = event.target;
setFormData({ ...formData, [name]: value });
};

const AddReviewForm = () => {
return (
<form onSubmit={handleAddReview}>
<div className="form-group">
<label htmlFor="content">Content</label>
<textarea
className="form-control"
id="content"
name="content"
value={formData.content || ''}
onChange={handleChange}
/>
</div>
<div className="form-group">
<label htmlFor="rating">Rating</label>
<input
type="number"
className="form-control"
id="rating"
name="rating"
value={formData.rating || 0}
onChange={handleChange}
/>
</div>
<button type="submit" className="btn btn-primary">
Add Review
</button>
</form>
);
};

const handleEditReview = async () => {
try {
const updatedReview = {
content: editFormData.content,
rating: editFormData.rating,
};
const response = await axios.put(`http://localhost:8080/api/reviews/${selectedReview.id}`,updatedReview);
const updatedReviews = reviews.map((review) => {
if (review.id === selectedReview.id) {
return response.data;
}
return review;
});
setReviews(updatedReviews);
setShowEditForm(false);
setEditFormData({
content: '',
rating: 0,
});
} catch (error) {
console.error(error);
}
};

const EditReviewForm = () => {
return (

<form onSubmit={handleEditReview}>
<div className="form-group">
<label htmlFor="content">Content</label>
<textarea
className="form-control"
id="content"
name="content"
value={editFormData.content || ''}
onChange={(event) => {
const { name, value } = event.target;
setEditFormData({ ...editFormData, [name]: value });
}}
/>
</div>
<div className="form-group">
<label htmlFor="rating">Rating</label>
<input
type="number"
className="form-control"
id="rating"
name="rating"
value={editFormData.rating || 0}
onChange={(event) => {
const { name, value } = event.target;
setEditFormData({ ...editFormData, [name]: value });
}}
/>
</div>
<button type="submit" className="btn btn-primary">
Edit Review
</button>
</form>
);
};
const handleDeleteReview = async () => {
try {
await axios.delete(`http://localhost:8080/api/reviews/${selectedReview.id}`);

const updatedReviews = reviews.filter((review) => review.id !== selectedReview.id);

setReviews(updatedReviews);
setSelectedReview(null);
} catch (error) {
console.error(error);
}
};

return (

<div>
{showForm ? (
<AddReviewForm />
) : (
<button className='btn btn-primary' onClick={() => setShowForm(true)}>Add Review</button>
)}
{showEditForm ? (
<EditReviewForm />
) : (
selectedReview && (
<button className='btn btn-primary' onClick={() => setShowEditForm(true)}>Edit Review</button>
)
)}
{selectedReview && (
<button className='btn btn-primary' onClick={handleDeleteReview}>Delete Review</button>
)}
<ReviewsList />
{selectedReview && <ReviewDetails />}
</div>
);
};
export default Review;