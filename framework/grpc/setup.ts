import * as grpc from '@grpc/grpc-js';
import * as protoLoader from '@grpc/proto-loader';
import * as path from 'path';

const PROTO_PATH = path.resolve(__dirname, './service.proto');

const packageDefinition = protoLoader.loadSync(PROTO_PATH, {
  keepCase: true,
  longs: String,
  enums: String,
  defaults: true,
  oneofs: true,
});

const grpcObject = grpc.loadPackageDefinition(packageDefinition) as any;
const crudService = grpcObject.crudPackage.CrudService.service;

const members: { id: number; name: string; email: string }[] = [];

const createMember: grpc.handleUnaryCall<any, any> = (call, callback) => {
  const member = call.request;
  if (!member.name || !member.email) {
    callback({
      code: grpc.status.INVALID_ARGUMENT,
      message: 'Name and email are required',
    } as grpc.ServiceError);
    return;
  }
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
    } as grpc.ServiceError);
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
    } as grpc.ServiceError);
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
    } as grpc.ServiceError);
  }
};

// Start server on given port
export const startGrpcServer = async (port: number): Promise<grpc.Server> => {
  const server = new grpc.Server();
  server.addService(crudService, {
    createMember,
    getMember,
    updateMember,
    deleteMember,
  });

  return new Promise((resolve, reject) => {
    server.bindAsync(`127.0.0.1:${port}`, grpc.ServerCredentials.createInsecure(), (err, boundPort) => {
      if (err) {
        reject(err);
      } else {
        console.log(`🚀 gRPC server running at 127.0.0.1:${boundPort}`);
        server.start();
        resolve(server);
      }
    });
  });
};

// Stop given server instance
export const stopGrpcServer = async (server: grpc.Server) => {
  return new Promise<void>((resolve, reject) => {
    server.tryShutdown((err) => {
      if (err) {
        reject(err);
      } else {
        console.log('🛑 gRPC server stopped.');
        resolve();
      }
    });
  });
};