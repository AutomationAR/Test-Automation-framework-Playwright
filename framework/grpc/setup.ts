// tests/grpc/setup.ts
import * as childProcess from 'child_process';

let serverProcess: childProcess.ChildProcess;

export async function startGrpcServer() {
  serverProcess = childProcess.spawn('npx', ['ts-node', 'server.ts'], {
    cwd: './', // adjust path if needed
    stdio: 'inherit',
  });

  // Wait a bit for the server to start
  await new Promise((res) => setTimeout(res, 1000));
}

export async function stopGrpcServer() {
  if (serverProcess) {
    serverProcess.kill();
  }
}