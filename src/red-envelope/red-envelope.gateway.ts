import {
  WebSocketGateway,
  WebSocketServer,
  OnGatewayConnection,
  OnGatewayDisconnect,
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';

@WebSocketGateway({
  cors: {
    origin: '*', // Allow all origins for simplicity
  },
})
export class RedEnvelopeGateway implements OnGatewayConnection, OnGatewayDisconnect {
  @WebSocketServer()
  server: Server;

  private activeConnections = 0;

  handleConnection(client: Socket) {
    this.activeConnections++;
    this.broadcastActiveUsers();
    console.log(`Client connected: ${client.id}. Total: ${this.activeConnections}`);
  }

  handleDisconnect(client: Socket) {
    this.activeConnections--;
    this.broadcastActiveUsers();
    console.log(`Client disconnected: ${client.id}. Total: ${this.activeConnections}`);
  }

  private broadcastActiveUsers() {
    this.server.emit('activeUsers', this.activeConnections);
  }

  notifyEnvelopeUpdate(remaining: number, indices: number[]) {
    this.server.emit('envelopeUpdate', { remaining, indices });
  }

  notifyEnvelopeClaimed(envelopeId: string) {
      // Optional: helpful if frontend wants to know exactly WHICH one was claimed
      // For now, refreshing the list or count is sufficient
      this.server.emit('envelopeClaimed', { envelopeId });
  }
}
