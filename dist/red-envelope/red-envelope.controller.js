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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.RedEnvelopeController = void 0;
const common_1 = require("@nestjs/common");
const red_envelope_service_1 = require("./red-envelope.service");
const create_red_envelope_dto_1 = require("./dto/create-red-envelope.dto");
let RedEnvelopeController = class RedEnvelopeController {
    redEnvelopeService;
    constructor(redEnvelopeService) {
        this.redEnvelopeService = redEnvelopeService;
    }
    create(createRedEnvelopeDto) {
        return this.redEnvelopeService.create(createRedEnvelopeDto);
    }
    claim(clientIp, socketId, req, requestIp) {
        console.log(`Claim Request - ClientIP: ${clientIp}, RequestIP: ${requestIp}, SocketID: ${socketId}`);
        return this.redEnvelopeService.claim(clientIp, requestIp, socketId);
    }
    getStats() {
        return this.redEnvelopeService.getStats();
    }
};
exports.RedEnvelopeController = RedEnvelopeController;
__decorate([
    (0, common_1.Post)(),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_red_envelope_dto_1.CreateRedEnvelopeDto]),
    __metadata("design:returntype", void 0)
], RedEnvelopeController.prototype, "create", null);
__decorate([
    (0, common_1.Post)('claim'),
    __param(0, (0, common_1.Body)('ip')),
    __param(1, (0, common_1.Body)('socketId')),
    __param(2, (0, common_1.Req)()),
    __param(3, (0, common_1.Ip)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String, Object, String]),
    __metadata("design:returntype", Promise)
], RedEnvelopeController.prototype, "claim", null);
__decorate([
    (0, common_1.Get)('stats'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], RedEnvelopeController.prototype, "getStats", null);
exports.RedEnvelopeController = RedEnvelopeController = __decorate([
    (0, common_1.Controller)('red-envelopes'),
    __metadata("design:paramtypes", [red_envelope_service_1.RedEnvelopeService])
], RedEnvelopeController);
//# sourceMappingURL=red-envelope.controller.js.map