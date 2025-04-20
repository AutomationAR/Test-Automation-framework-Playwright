import { test, expect } from '@playwright/test';
import * as grpc from '@grpc/grpc-js';
import * as protoLoader from '@grpc/proto-loader';
import { startGrpcServer, stopGrpcServer } from '../../framework/grpc/setup';

const PROTO_PATH = './test_data/grpc/service.proto';

const packageDefinition = protoLoader.loadSync(PROTO_PATH, {
  keepCase: true,
  longs: String,
  enums: String,
  defaults: true,
  oneofs: true,
});

// Load the gRPC package definition
const grpcObject = grpc.loadPackageDefinition(packageDefinition) as any;

// ✅ FIX: Access constructor correctly
const client = new grpcObject.crudPackage.CrudService(
  'localhost:50051',
  grpc.credentials.createInsecure()
);

// Helper: Wrap gRPC methods in promises
function grpcCall<T>(method: Function, data: any): Promise<T> {
  return new Promise((resolve, reject) => {
    method.call(client, data, (err: grpc.ServiceError | null, res: T) => {
      if (err) reject(err);
      else resolve(res);
    });
  });
}

test.beforeAll(async () => {
  await startGrpcServer();
});

test.afterAll(async () => {
  await stopGrpcServer();
});

test('gRPC Create Member', async () => {
  const member = { id: 1, name: 'Alice Cooper', email: 'alice.cooper@example.com' };
  const response = await grpcCall<{ success: boolean; message: string }>(
    client.createMember,
    member
  );

  expect(response.success).toBe(true);
  expect(response.message).toBe('Member created successfully');
});

test('gRPC Get Member', async () => {
  const response = await grpcCall<{ id: number; name: string; email: string }>(
    client.getMember,
    { id: 1 }
  );

  expect(response.id).toBe(1);
  expect(response.name).toBe('Alice Cooper');
  expect(response.email).toBe('alice.cooper@example.com');
});

test('gRPC Update Member', async () => {
  const updated = { id: 1, name: 'Alice Johnson', email: 'alice.johnson@example.com' };
  const response = await grpcCall<{ success: boolean; message: string }>(
    client.updateMember,
    updated
  );

  expect(response.success).toBe(true);
  expect(response.message).toBe('Member updated successfully');
});

test('gRPC Delete Member', async () => {
  const response = await grpcCall<{ success: boolean; message: string }>(
    client.deleteMember,
    { id: 1 }
  );

  expect(response.success).toBe(true);
  expect(response.message).toBe('Member deleted successfully');
});