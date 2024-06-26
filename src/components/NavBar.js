import React, { useState, useEffect } from 'react';
import { AppBar, Toolbar, Typography, Button, InputBase } from '@material-ui/core';
import { ShoppingCart } from '@material-ui/icons';
import { Link } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import { searchProducts } from '../Api';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  title: {
    flexGrow: 1,
  },
  search: {
    position: 'relative',
    borderRadius: theme.shape.borderRadius,
    backgroundColor: theme.palette.common.white,
    '&:hover': {
      backgroundColor: theme.palette.grey[200],
    },
    marginRight: theme.spacing(2),
    marginLeft: 0,
    width: '100%',
    [theme.breakpoints.up('sm')]: {
      marginLeft: theme.spacing(3),
      width: 'auto',
    },
  },
  searchInput: {
    padding: theme.spacing(1, 1, 1, 0),
    paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
    transition: theme.transitions.create('width'),
    width: '100%',
    [theme.breakpoints.up('md')]: {
      width: '20ch',
    },
  },
}));

const NavBar = () => {
  const classes = useStyles();
  const history = history();
  const [loggedIn, setLoggedIn] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('all');

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem('user'));
    if (user) {
      setLoggedIn(true);
      setIsAdmin(user.role === 'admin');
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('user');
    setLoggedIn(false);
    setIsAdmin(false);
    history.push('/signin');
  };

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
  };

  const handleSearchSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await searchProducts(searchQuery);
      console.log('Search results:', response.data);
      // Handle the search results as needed
    } catch (error) {
      console.error('Error searching products:', error);
    }
  };

  return (
    <div className={classes.root}>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" className={classes.title}>
            <Link to="/" style={{ color: 'inherit', textDecoration: 'none' }}>
              <ShoppingCart /> upGrad Eshop
            </Link>
          </Typography>
          {loggedIn ? (
            <>
              <form onSubmit={handleSearchSubmit} className={classes.search}>
                <InputBase
                  placeholder="Search…"
                  classes={{
                    input: classes.searchInput,
                  }}
                  value={searchQuery}
                  onChange={handleSearchChange}
                />
              </form>
              <Button color="inherit" component={Link} to="/">
                Home
              </Button>
              {isAdmin && (
                <Button color="inherit" component={Link} to="/add-product">
                  Add Products
                </Button>
              )}
              <Button color="inherit" onClick={handleLogout}>
                Logout
              </Button>
            </>
          ) : (
            <>
              <Button color="inherit" component={Link} to="/signin">
                Login
              </Button>
              <Button color="inherit" component={Link} to="/signup">
                Sign Up
              </Button>
            </>
          )}
        </Toolbar>
      </AppBar>
    </div>
  );
};

export default NavBar;
