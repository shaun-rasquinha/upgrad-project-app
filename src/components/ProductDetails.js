import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Card, CardContent, CardMedia, Typography, TextField, Button } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { getProduct } from '../Api';

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    justifyContent: 'center',
    marginTop: theme.spacing(4),
  },
  card: {
    maxWidth: 600,
  },
  media: {
    height: 300,
  },
  input: {
    marginTop: theme.spacing(2),
    width: '100px',
  },
}));

const ProductDetails = () => {
  const classes = useStyles();
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [quantity, setQuantity] = useState(1);

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

  const handleQuantityChange = (event) => {
    setQuantity(event.target.value);
  };

  return product ? (
    <div className={classes.root}>
      <Card className={classes.card}>
        <CardMedia
          className={classes.media}
          image={product.imageUrl || 'placeholder.jpg'}
          title={product.name || 'Product Image'}
        />
        <CardContent>
          <Typography variant="h5" component="h2">
            {product.name}
          </Typography>
          <Typography variant="body2" color="textSecondary" component="p">
            {product.description}
          </Typography>
          <Typography variant="h6" component="p">
            ${product.price}
          </Typography>
          <TextField
            className={classes.input}
            type="number"
            label="Quantity"
            value={quantity}
            onChange={handleQuantityChange}
            inputProps={{ min: 1 }}
          />
          <Button variant="contained" color="primary">
            Add to Cart
          </Button>
        </CardContent>
      </Card>
    </div>
  ) : (
    <Typography>Loading...</Typography>
  );
};

export default ProductDetails;
