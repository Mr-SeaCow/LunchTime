import React from 'react';
import { Button, Form } from 'semantic-ui-react';
const LoginForm = () => (
  <Form>
    <Form.Field>
      <label>Email Address</label>
      <input placeholder="Email Address" />
    </Form.Field>
    <Form.Field>
      <label>Password</label>
      <input placeholder="Password" />
    </Form.Field>
    <Button type="submit">Submit</Button>
  </Form>
);
export default LoginForm;