import { OnGatewayConnection, OnGatewayDisconnect } from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
export declare class RedEnvelopeGateway implements OnGatewayConnection, OnGatewayDisconnect {
    server: Server;
    private activeConnections;
    handleConnection(client: Socket): void;
    handleDisconnect(client: Socket): void;
    private broadcastActiveUsers;
    notifyEnvelopeUpdate(remaining: number, indices: number[]): void;
    notifyEnvelopeClaimed(envelopeId: string): void;
}
