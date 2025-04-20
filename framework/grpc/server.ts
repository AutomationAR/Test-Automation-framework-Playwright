// server.ts
import * as grpc from '@grpc/grpc-js';
import * as protoLoader from '@grpc/proto-loader';

const PROTO_PATH = './test_data/grpc/service.proto';  // Path to your .proto file

// Load the .proto file
const packageDefinition = protoLoader.loadSync(PROTO_PATH, {
  keepCase: true,
  longs: String,
  enums: String,
  defaults: true,
  oneofs: true,
});

const grpcObject = grpc.loadPackageDefinition(packageDefinition) as any;
const crudPackage = grpcObject.crudPackage;
const crudService = crudPackage.CrudService.service;

const members: { id: number; name: string; email: string }[] = [];

// CRUD handlers
const createMember: grpc.handleUnaryCall<any, any> = (call, callback) => {
  const member = call.request;
  members.push(member);
  callback(null, { success: true, message: 'Member created successfully' });
};

const getMember: grpc.handleUnaryCall<any, any> = (call, callback) => {
  const member = members.find((m) => m.id === call.request.id);
  if (member) {
    callback(null, member);
  } else {
    callback({
      code: grpc.status.NOT_FOUND,
      message: 'Member not found',
    });
  }
};

const updateMember: grpc.handleUnaryCall<any, any> = (call, callback) => {
  const updated = call.request;
  const index = members.findIndex((m) => m.id === updated.id);
  if (index !== -1) {
    members[index] = updated;
    callback(null, { success: true, message: 'Member updated successfully' });
  } else {
    callback({
      code: grpc.status.NOT_FOUND,
      message: 'Member not found',
    });
  }
};

const deleteMember: grpc.handleUnaryCall<any, any> = (call, callback) => {
  const index = members.findIndex((m) => m.id === call.request.id);
  if (index !== -1) {
    members.splice(index, 1);
    callback(null, { success: true, message: 'Member deleted successfully' });
  } else {
    callback({
      code: grpc.status.NOT_FOUND,
      message: 'Member not found',
    });
  }
};

// Start the server
export const startGrpcServer = async () => {
  const server = new grpc.Server();
  server.addService(crudService, {
    createMember,
    getMember,
    updateMember,
    deleteMember,
  });

  return new Promise<void>((resolve, reject) => {
    server.bindAsync('127.0.0.1:50051', grpc.ServerCredentials.createInsecure(), (err, port) => {
      if (err) {
        reject(err);
      } else {
        console.log(`🚀 gRPC server running at http://127.0.0.1:${port}`);
        server.start();
        resolve();
      }
    });
  });
};