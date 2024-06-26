import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { TextField, Button, Typography, Card, CardContent } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { getProduct, updateProduct } from '../Api';

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    justifyContent: 'center',
    marginTop: theme.spacing(4),
  },
  card: {
    maxWidth: 600,
  },
  input: {
    marginBottom: theme.spacing(2),
  },
}));

const EditProduct = () => {
  const classes = useStyles();
  const { id } = useParams();
  const navigate = useNavigate();
  const [product, setProduct] = useState({
    name: '',
    description: '',
    price: '',
    imageUrl: '',
  });

  useEffect(() => {
    fetchProduct();
  }, [id]);

  const fetchProduct = async () => {
    try {
      const response = await getProduct(id);
      setProduct(response.data);
    } catch (error) {
      console.error('Error fetching product details:', error);
    }
  };

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setProduct({
      ...product,
      [name]: value,
    });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      await updateProduct(id, product);
      navigate('/admin/manage-products'); // Replace with the desired redirect path after update
    } catch (error) {
      console.error('Error updating product:', error);
    }
  };

  return (
    <div className={classes.root}>
      <Card className={classes.card}>
        <CardContent>
          <Typography variant="h5" gutterBottom>
            Edit Product
          </Typography>
          <form onSubmit={handleSubmit}>
            <TextField
              className={classes.input}
              label="Name"
              variant="outlined"
              fullWidth
              name="name"
              value={product.name}
              onChange={handleInputChange}
            />
            <TextField
              className={classes.input}
              label="Description"
              variant="outlined"
              fullWidth
              name="description"
              value={product.description}
              onChange={handleInputChange}
            />
            <TextField
              className={classes.input}
              label="Price"
              variant="outlined"
              fullWidth
              name="price"
              value={product.price}
              onChange={handleInputChange}
            />
            <TextField
              className={classes.input}
              label="Image URL"
              variant="outlined"
              fullWidth
              name="imageUrl"
              value={product.imageUrl}
              onChange={handleInputChange}
            />
            <Button
              type="submit"
              variant="contained"
              color="primary"
            >
              Update Product
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default EditProduct;
