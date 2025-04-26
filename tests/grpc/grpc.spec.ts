import { test, expect } from '@playwright/test';
import { createMember, getMember, updateMember, deleteMember, createGrpcClient } from '../../framework/grpc/grpcclient';
import { startGrpcServer, stopGrpcServer } from '../../framework/grpc/setup';
import getPort from 'get-port';
import * as grpc from '@grpc/grpc-js';

let server: grpc.Server;
let serverPort: number;
let client: any;

const memberData = {
  id: 1,
  name: 'Alice Cooper',
  email: 'alice.cooper@example.com',
};

test.describe('gRPC CRUD Operations', () => {
  test.beforeEach(async () => {
    serverPort = await getPort();            // Get free port
    server = await startGrpcServer(serverPort);  // Start server
    client = createGrpcClient(serverPort);    // Create client connected to that port
  });

  test.afterEach(async () => {
    await stopGrpcServer(server);             // Stop server
  });

  test('gRPC Create Member', async () => {
    const response = await createMember(client, memberData);
    expect(response.success).toBeTruthy();
    expect(response.message).toBe('Member created successfully');
  });

  test('gRPC Get Member', async () => {
    await createMember(client, memberData); // Make sure member exists
    const response = await getMember(client, { id: memberData.id });
    expect(response.id).toBe(memberData.id);
    expect(response.name).toBe(memberData.name);
    expect(response.email).toBe(memberData.email);
  });

  test('gRPC Update Member', async () => {
    await createMember(client, memberData); // Ensure member exists
    const updatedMember = {
      id: 1,
      name: 'Alice Johnson',
      email: 'alice.johnson@example.com',
    };
    const response = await updateMember(client, updatedMember);
    expect(response.success).toBeTruthy();
    expect(response.message).toBe('Member updated successfully');
  });

  test('gRPC Delete Member', async () => {
    await createMember(client, memberData); // Create before deleting
    const response = await deleteMember(client, { id: memberData.id });
    expect(response.success).toBeTruthy();
    expect(response.message).toBe('Member deleted successfully');
  });
});