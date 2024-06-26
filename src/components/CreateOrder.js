import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import {
  Stepper, Step, StepLabel, Button, Typography, TextField, Card, CardContent
} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { createOrder, addAddress } from '../Api';

const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
    marginTop: theme.spacing(4),
  },
  button: {
    marginRight: theme.spacing(1),
  },
  card: {
    maxWidth: 600,
    margin: '0 auto',
  },
  input: {
    marginBottom: theme.spacing(2),
  },
}));

const steps = ['Shipping Address', 'Review Order', 'Confirmation'];

const CreateOrder = () => {
  const classes = useStyles();
  const navigate = useNavigate();
  const location = useLocation();
  const { product, quantity } = location.state;
  const [activeStep, setActiveStep] = useState(0);
  const [address, setAddress] = useState({
    street: '',
    city: '',
    state: '',
    zip: '',
  });

  const handleNext = async () => {
    if (activeStep === steps.length - 1) {
      await createOrder({ productId: product.id, quantity });
      navigate('/orders', { state: { message: 'Your order is confirmed.' } });
    } else if (activeStep === 0) {
      await addAddress(address);
    }
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handleAddressChange = (e) => {
    const { name, value } = e.target;
    setAddress((prevAddress) => ({
      ...prevAddress,
      [name]: value,
    }));
  };

  const getStepContent = (step) => {
    switch (step) {
      case 0:
        return (
          <form>
            <TextField
              name="street"
              label="Street"
              value={address.street}
              onChange={handleAddressChange}
              fullWidth
              className={classes.input}
            />
            <TextField
              name="city"
              label="City"
              value={address.city}
              onChange={handleAddressChange}
              fullWidth
              className={classes.input}
            />
            <TextField
              name="state"
              label="State"
              value={address.state}
              onChange={handleAddressChange}
              fullWidth
              className={classes.input}
            />
            <TextField
              name="zip"
              label="ZIP Code"
              value={address.zip}
              onChange={handleAddressChange}
              fullWidth
              className={classes.input}
            />
          </form>
        );
      case 1:
        return (
          <Card className={classes.card}>
            <CardContent>
              <Typography variant="h6">Review Your Order</Typography>
              <Typography variant="body2">{product.name}</Typography>
              <Typography variant="body2">Quantity: {quantity}</Typography>
              <Typography variant="body2">Price: ${product.price}</Typography>
              <Typography variant="body2">Total: ${product.price * quantity}</Typography>
            </CardContent>
          </Card>
        );
      case 2:
        return <Typography>Your order is confirmed.</Typography>;
      default:
        return 'Unknown step';
    }
  };

  return (
    <div className={classes.root}>
      <Stepper activeStep={activeStep} alternativeLabel>
        {steps.map((label) => (
          <Step key={label}>
            <StepLabel>{label}</StepLabel>
          </Step>
        ))}
      </Stepper>
      <div>
        {activeStep === steps.length ? (
          <div>
            <Typography className={classes.instructions}>All steps completed</Typography>
          </div>
        ) : (
          <div>
            {getStepContent(activeStep)}
            <div>
              <Button
                disabled={activeStep === 0}
                onClick={handleBack}
                className={classes.button}
              >
                Back
              </Button>
              <Button
                variant="contained"
                color="primary"
                onClick={handleNext}
                className={classes.button}
              >
                {activeStep === steps.length - 1 ? 'Place Order' : 'Next'}
              </Button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default CreateOrder;
