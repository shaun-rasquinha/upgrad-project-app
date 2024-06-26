import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardMedia, Typography, ToggleButtonGroup, ToggleButton, Select, MenuItem, Button } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { useHistory } from 'react-router-dom';
import { getCategories, getProducts } from '../Api';

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'center',
  },
  card: {
    maxWidth: 345,
    margin: theme.spacing(2),
  },
  media: {
    height: 140,
  },
  toolbar: {
    display: 'flex',
    justifyContent: 'space-between',
    marginBottom: theme.spacing(2),
  },
}));

const Products = () => {
  const classes = useStyles();
  const history = useHistory();
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('');
  const [products, setProducts] = useState([]);
  const [sortOrder, setSortOrder] = useState('default');

  useEffect(() => {
    fetchCategories();
    fetchProducts();
  }, []);

  const fetchCategories = async () => {
    try {
      const response = await getCategories();
      setCategories(response.data);
    } catch (error) {
      console.error('Error fetching categories:', error);
    }
  };

  const fetchProducts = async () => {
    try {
      const response = await getProducts();
      setProducts(response.data);
    } catch (error) {
      console.error('Error fetching products:', error);
    }
  };

  const handleCategoryChange = (event, newCategory) => {
    setSelectedCategory(newCategory);
  };

  const handleSortChange = (event) => {
    setSortOrder(event.target.value);
    sortProducts(event.target.value);
  };

  const sortProducts = (order) => {
    let sortedProducts = [...products];
    if (order === 'priceHighToLow') {
      sortedProducts.sort((a, b) => b.price - a.price);
    } else if (order === 'priceLowToHigh') {
      sortedProducts.sort((a, b) => a.price - b.price);
    } else if (order === 'newest') {
      sortedProducts.sort((a, b) => new Date(b.updatedAt) - new Date(a.updatedAt));
    }
    setProducts(sortedProducts);
  };

  const handleBuy = (id) => {
    history.push(`/products/${id}`);
  };

  return (
    <div>
      <div className={classes.toolbar}>
        <ToggleButtonGroup value={selectedCategory} exclusive onChange={handleCategoryChange}>
          {categories.map((category) => (
            <ToggleButton key={category.id} value={category.name}>
              {category.name}
            </ToggleButton>
          ))}
        </ToggleButtonGroup>
        <Select value={sortOrder} onChange={handleSortChange}>
          <MenuItem value="default">Default</MenuItem>
          <MenuItem value="priceHighToLow">Price High to Low</MenuItem>
          <MenuItem value="priceLowToHigh">Price Low to High</MenuItem>
          <MenuItem value="newest">Newest</MenuItem>
        </Select>
      </div>
      <div className={classes.root}>
        {products
          .filter((product) => !selectedCategory || product.category === selectedCategory)
          .map((product) => (
            <Card key={product.id} className={classes.card}>
              <CardMedia className={classes.media} image={product.imageUrl} title={product.name || 'Product Image'} />
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
                <Button variant="contained" color="primary" onClick={() => handleBuy(product.id)}>
                  Buy
                </Button>
              </CardContent>
            </Card>
          ))}
      </div>
    </div>
  );
};

export default Products;
