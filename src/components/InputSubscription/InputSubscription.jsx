"use client"

import * as React from 'react';
import FormControl from '@mui/joy/FormControl';
import FormLabel from '@mui/joy/FormLabel';
import FormHelperText from '@mui/joy/FormHelperText';
import Input from '@mui/joy/Input';
import Button from '@mui/joy/Button';
import axios from 'axios';

export default function InputSubscription() {
  const [data, setData] = React.useState({
    email: '',
    status: 'initial',
  });

  const handleSubmit = async (event) => {
    event.preventDefault();
    setData((current) => ({ ...current, status: 'loading' }));

    try {
      const response = await axios.post('/api/newsletter', {
        email: data.email,
      });

      if (response.status === 200) {
        setData({ email: '', status: 'sent' });
      } else {
        throw new Error('Failed to subscribe');
      }
    } catch (error) {
      console.error('An error occurred:', error);
      setData((current) => ({ ...current, status: 'failure' }));
    }
  };

  return (
    <form onSubmit={handleSubmit} id="demo">
      <FormControl>
        <FormLabel
          sx={(theme) => ({
            '--FormLabel-color': theme.vars.palette.primary.plainColor,
          })}
        >
          Subscribe to our Newsletter
        </FormLabel>
        <Input
          sx={{ '--Input-decoratorChildHeight': '45px' }}
          placeholder="mail@mui.com"
          type="email"
          required
          value={data.email}
          onChange={(event) =>
            setData({ email: event.target.value, status: 'initial' })
          }
          error={data.status === 'failure'}
          endDecorator={
            <Button
              variant="solid"
              color="primary"
              loading={data.status === 'loading'}
              type="submit"
              sx={{ borderTopLeftRadius: 0, borderBottomLeftRadius: 0 }}
            >
              Subscribe
            </Button>
          }
        />
        {data.status === 'failure' && (
          <FormHelperText
            sx={(theme) => ({ color: theme.vars.palette.danger[400] })}
          >
            Oops! Something went wrong, please try again later.
          </FormHelperText>
        )}
        {data.status === 'sent' && (
          <FormHelperText
            sx={(theme) => ({ color: theme.vars.palette.primary[400] })}
          >
            You are officially subscribed!
          </FormHelperText>
        )}
      </FormControl>
    </form>
  );
}
