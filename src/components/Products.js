import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardMedia, Typography, ToggleButtonGroup, ToggleButton, Select, MenuItem, Button, IconButton, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { useHistory } from 'react-router-dom';
import EditIcon from '@material-ui/icons/Edit';
import DeleteIcon from '@material-ui/icons/Delete';
import { getCategories, getProducts, deleteProduct } from '../Api';
import { useAuth } from '../context/AuthContext';

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
  const { user } = useAuth();
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('');
  const [products, setProducts] = useState([]);
  const [sortOrder, setSortOrder] = useState('default');
  const [open, setOpen] = useState(false);
  const [deleteProductId, setDeleteProductId] = useState(null);

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

  const handleEdit = (id) => {
    history.push(`/edit-product/${id}`);
  };

  const handleDelete = (id) => {
    setDeleteProductId(id);
    setOpen(true);
  };

  const confirmDelete = async () => {
    try {
      await deleteProduct(deleteProductId);
      setProducts(products.filter((product) => product.id !== deleteProductId));
      setOpen(false);
      alert(`Product deleted successfully`);
    } catch (error) {
      console.error('Error deleting product:', error);
    }
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
                {user?.isAdmin && (
                  <>
                    <IconButton color="primary" onClick={() => handleEdit(product.id)}>
                      <EditIcon />
                    </IconButton>
                    <IconButton color="secondary" onClick={() => handleDelete(product.id)}>
                      <DeleteIcon />
                    </IconButton>
                  </>
                )}
              </CardContent>
            </Card>
          ))}
      </div>
      <Dialog open={open} onClose={() => setOpen(false)}>
        <DialogTitle>Confirm Deletion</DialogTitle>
        <DialogContent>
          <DialogContentText>Are you sure you want to delete this product?</DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpen(false)} color="primary">
            Cancel
          </Button>
          <Button onClick={confirmDelete} color="secondary">
            Delete
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default Products;
