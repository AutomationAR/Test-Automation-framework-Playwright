import { test, expect } from '@playwright/test';
import { echoClient } from '../../framework/grpc/client';

test('gRPC: Create (UnaryEcho)', done => {
  echoClient.UnaryEcho({ message: 'Create user' }, (err: any, response: any) => {
    expect(err).toBeNull();
    expect(response.message).toBe('Create user');
    done();
  });
});

test('gRPC: Read (UnaryEcho)', done => {
  echoClient.UnaryEcho({ message: 'Get user info' }, (err: any, response: any) => {
    expect(err).toBeNull();
    expect(response.message).toBe('Get user info');
    done();
  });
});

test('gRPC: Update (UnaryEcho)', done => {
  echoClient.UnaryEcho({ message: 'Update user' }, (err: any, response: any) => {
    expect(err).toBeNull();
    expect(response.message).toBe('Update user');
    done();
  });
});

test('gRPC: Delete (UnaryEcho)', done => {
  echoClient.UnaryEcho({ message: 'Delete user' }, (err: any, response: any) => {
    expect(err).toBeNull();
    expect(response.message).toBe('Delete user');
    done();
  });
});
