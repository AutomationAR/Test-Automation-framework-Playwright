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
const CrudServiceClient = grpcObject.crudPackage.CrudService;

// 🔥 create a function to generate a client for a given port
export const createGrpcClient = (port: number) => {
  return new CrudServiceClient(
    `127.0.0.1:${port}`,
    grpc.credentials.createInsecure()
  );
};

// generic helper to wrap gRPC call as Promise
const grpcCall = async <T>(
  method: (request: any, callback: (err: grpc.ServiceError | null, response: T) => void) => void,
  data: any
): Promise<T> => {
  return new Promise((resolve, reject) => {
    method.call(null, data, (err: grpc.ServiceError | null, response: T) => {
      if (err) reject(err);
      else resolve(response);
    });
  });
};

// Specific CRUD helper functions (must pass client explicitly)
export const createMember = async (
  client: any,
  member: { id: number; name: string; email: string }
) => {
  return grpcCall<{ success: boolean; message: string }>(client.createMember.bind(client), member);
};

export const getMember = async (
  client: any,
  request: { id: number }
) => {
  return grpcCall<{ id: number; name: string; email: string }>(client.getMember.bind(client), request);
};

export const updateMember = async (
  client: any,
  member: { id: number; name: string; email: string }
) => {
  return grpcCall<{ success: boolean; message: string }>(client.updateMember.bind(client), member);
};

export const deleteMember = async (
  client: any,
  request: { id: number }
) => {
  return grpcCall<{ success: boolean; message: string }>(client.deleteMember.bind(client), request);
};