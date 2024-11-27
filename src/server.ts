import { connectToMongoDB } from './mongo-connection';
import { createApp } from './app';

async function startServer() {
  try {
    const app = createApp();
    await connectToMongoDB();

    app.listen(3000, () => {
      console.log('Server is running on http://localhost:3000');
    });
  } catch (error) {
    console.error(error);
    process.exit(1);
  }
}

startServer();
