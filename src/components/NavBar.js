import React, { useState, useEffect } from 'react';
import { AppBar, Toolbar, Typography, Button, InputBase } from '@material-ui/core';
import { ShoppingCart } from '@material-ui/icons';
import { Link, useHistory } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
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
  const history = useHistory();
  const [loggedIn, setLoggedIn] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);

  useEffect(() => {
    // Check if user is logged in and if they are an admin
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
              <div className={classes.search}>
                <InputBase
                  placeholder="Search…"
                  classes={{
                    input: classes.searchInput,
                  }}
                />
              </div>
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
