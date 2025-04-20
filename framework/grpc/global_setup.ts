import { startGrpcServer } from './server'; // import your server start logic

// This will be executed before all tests
export default async function globalSetup() {
    await startGrpcServer();
    // any other setup steps
}
