import { server } from './server';

server.listen(process.env.PORT || 3333, () => {
  console.log(`[SERVER] Running on port ${process.env.PORT || 3333}`);
});
