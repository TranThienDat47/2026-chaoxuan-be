"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.RedEnvelopeGateway = void 0;
const websockets_1 = require("@nestjs/websockets");
const socket_io_1 = require("socket.io");
let RedEnvelopeGateway = class RedEnvelopeGateway {
    server;
    activeConnections = 0;
    handleConnection(client) {
        this.activeConnections++;
        this.broadcastActiveUsers();
        console.log(`Client connected: ${client.id}. Total: ${this.activeConnections}`);
    }
    handleDisconnect(client) {
        this.activeConnections--;
        this.broadcastActiveUsers();
        console.log(`Client disconnected: ${client.id}. Total: ${this.activeConnections}`);
    }
    broadcastActiveUsers() {
        this.server.emit('activeUsers', this.activeConnections);
    }
    notifyEnvelopeUpdate(remaining, indices) {
        this.server.emit('envelopeUpdate', { remaining, indices });
    }
    notifyEnvelopeClaimed(envelopeId) {
        this.server.emit('envelopeClaimed', { envelopeId });
    }
};
exports.RedEnvelopeGateway = RedEnvelopeGateway;
__decorate([
    (0, websockets_1.WebSocketServer)(),
    __metadata("design:type", socket_io_1.Server)
], RedEnvelopeGateway.prototype, "server", void 0);
exports.RedEnvelopeGateway = RedEnvelopeGateway = __decorate([
    (0, websockets_1.WebSocketGateway)({
        cors: {
            origin: '*',
        },
    })
], RedEnvelopeGateway);
//# sourceMappingURL=red-envelope.gateway.js.map